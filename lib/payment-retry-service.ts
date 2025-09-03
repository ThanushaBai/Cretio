export interface RetryConfig {
  maxAttempts: number
  delayMs: number
  backoffMultiplier: number
  maxDelayMs: number
}

export interface PaymentRetryAttempt {
  id: string
  paymentId: string
  attempt: number
  timestamp: Date
  status: "pending" | "success" | "failed"
  error?: string
  nextRetryAt?: Date
}

class PaymentRetryService {
  private static instance: PaymentRetryService
  private retryAttempts: Map<string, PaymentRetryAttempt[]> = new Map()
  private retryTimeouts: Map<string, NodeJS.Timeout> = new Map()

  private defaultConfig: RetryConfig = {
    maxAttempts: 3,
    delayMs: 5000, // 5 seconds
    backoffMultiplier: 2,
    maxDelayMs: 300000, // 5 minutes
  }

  static getInstance(): PaymentRetryService {
    if (!PaymentRetryService.instance) {
      PaymentRetryService.instance = new PaymentRetryService()
    }
    return PaymentRetryService.instance
  }

  // Schedule a payment retry
  scheduleRetry(paymentId: string, retryFunction: () => Promise<boolean>, config: Partial<RetryConfig> = {}) {
    const finalConfig = { ...this.defaultConfig, ...config }
    const attempts = this.retryAttempts.get(paymentId) || []

    if (attempts.length >= finalConfig.maxAttempts) {
      console.log(`Max retry attempts reached for payment ${paymentId}`)
      return false
    }

    const attemptNumber = attempts.length + 1
    const delay = Math.min(
      finalConfig.delayMs * Math.pow(finalConfig.backoffMultiplier, attemptNumber - 1),
      finalConfig.maxDelayMs,
    )

    const attempt: PaymentRetryAttempt = {
      id: `retry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      paymentId,
      attempt: attemptNumber,
      timestamp: new Date(),
      status: "pending",
      nextRetryAt: new Date(Date.now() + delay),
    }

    attempts.push(attempt)
    this.retryAttempts.set(paymentId, attempts)

    console.log(`Scheduling retry ${attemptNumber} for payment ${paymentId} in ${delay}ms`)

    const timeout = setTimeout(async () => {
      try {
        attempt.status = "pending"
        const success = await retryFunction()

        if (success) {
          attempt.status = "success"
          console.log(`Payment retry successful for ${paymentId}`)
          this.clearRetries(paymentId)
        } else {
          attempt.status = "failed"
          attempt.error = "Payment retry failed"

          // Schedule next retry if we haven't reached max attempts
          if (attemptNumber < finalConfig.maxAttempts) {
            this.scheduleRetry(paymentId, retryFunction, config)
          } else {
            console.log(`All retry attempts failed for payment ${paymentId}`)
            this.handleMaxRetriesReached(paymentId)
          }
        }
      } catch (error) {
        attempt.status = "failed"
        attempt.error = error instanceof Error ? error.message : "Unknown error"
        console.error(`Payment retry error for ${paymentId}:`, error)

        if (attemptNumber < finalConfig.maxAttempts) {
          this.scheduleRetry(paymentId, retryFunction, config)
        } else {
          this.handleMaxRetriesReached(paymentId)
        }
      }
    }, delay)

    this.retryTimeouts.set(paymentId, timeout)
    return true
  }

  // Clear all retries for a payment
  clearRetries(paymentId: string) {
    const timeout = this.retryTimeouts.get(paymentId)
    if (timeout) {
      clearTimeout(timeout)
      this.retryTimeouts.delete(paymentId)
    }
    this.retryAttempts.delete(paymentId)
  }

  // Get retry attempts for a payment
  getRetryAttempts(paymentId: string): PaymentRetryAttempt[] {
    return this.retryAttempts.get(paymentId) || []
  }

  // Handle when max retries are reached
  private handleMaxRetriesReached(paymentId: string) {
    console.log(`Max retries reached for payment ${paymentId}`)

    // Here you would typically:
    // 1. Send notification to user about payment failure
    // 2. Update subscription status
    // 3. Log the failure for manual review
    // 4. Possibly suspend the account

    this.clearRetries(paymentId)
  }

  // Get all pending retries
  getPendingRetries(): { paymentId: string; attempts: PaymentRetryAttempt[] }[] {
    const pending = []
    for (const [paymentId, attempts] of this.retryAttempts.entries()) {
      const pendingAttempts = attempts.filter((a) => a.status === "pending")
      if (pendingAttempts.length > 0) {
        pending.push({ paymentId, attempts: pendingAttempts })
      }
    }
    return pending
  }
}

export const paymentRetryService = PaymentRetryService.getInstance()
