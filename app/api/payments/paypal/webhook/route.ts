import { type NextRequest, NextResponse } from "next/server"

const PAYPAL_WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_API_URL = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com"

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64")

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

async function verifyPayPalWebhook(headers: any, body: string) {
  const accessToken = await getPayPalAccessToken()

  const verificationData = {
    auth_algo: headers["paypal-auth-algo"],
    cert_id: headers["paypal-cert-id"],
    transmission_id: headers["paypal-transmission-id"],
    transmission_sig: headers["paypal-transmission-sig"],
    transmission_time: headers["paypal-transmission-time"],
    webhook_id: PAYPAL_WEBHOOK_ID,
    webhook_event: JSON.parse(body),
  }

  const response = await fetch(`${PAYPAL_API_URL}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(verificationData),
  })

  const result = await response.json()
  return result.verification_status === "SUCCESS"
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headers = Object.fromEntries(request.headers.entries());

    // Verify webhook signature
    const isValid = await verifyPayPalWebhook(headers, body);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const event = JSON.parse(body);
    console.log("PayPal Webhook Event:", event.event_type);

    // Handle different webhook events
    switch (event.event_type) {
      case "BILLING.SUBSCRIPTION.ACTIVATED":
        await handleSubscriptionActivated(event);
        break;
      case "BILLING.SUBSCRIPTION.CANCELLED":
        await handleSubscriptionCancelled(event);
        break;
      case "BILLING.SUBSCRIPTION.SUSPENDED":
        await handleSubscriptionSuspended(event);
        break;
      case "PAYMENT.SALE.COMPLETED":
        await handlePaymentCompleted(event);
        break;
      case "PAYMENT.SALE.DENIED":
        await handlePaymentFailed(event);
        break;
      default:
        console.log(`Unhandled webhook event: ${event.event_type}`);
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("PayPal webhook error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

async function handleSubscriptionActivated(event: any) {
  const subscriptionId = event.resource.id
  console.log(`Subscription activated: ${subscriptionId}`)

  // Update database with subscription status
  // Send notification to user
  // Update billing records
}

async function handleSubscriptionCancelled(event: any) {
  const subscriptionId = event.resource.id
  console.log(`Subscription cancelled: ${subscriptionId}`)

  // Update database with cancellation
  // Send cancellation email
  // Update user access
}

async function handleSubscriptionSuspended(event: any) {
  const subscriptionId = event.resource.id
  console.log(`Subscription suspended: ${subscriptionId}`)

  // Update database with suspension
  // Send suspension notice
  // Restrict user access
}

async function handlePaymentCompleted(event: any) {
  const paymentId = event.resource.id
  const amount = event.resource.amount.total
  console.log(`Payment completed: ${paymentId} for ${amount}`)

  // Update payment records
  // Send payment confirmation
  // Update subscription billing
}

async function handlePaymentFailed(event: any) {
  const paymentId = event.resource.id
  console.log(`Payment failed: ${paymentId}`)

  // Update payment records
  // Send payment failure notice
  // Handle retry logic
}
