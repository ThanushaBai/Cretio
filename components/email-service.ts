// Email service utility for sending emails and notifications
import { useToast } from "@/components/ui/use-toast"

// Create a toast function that can be used outside of React components
let toastFn: any = null;
export function setToastFunction(fn: any) {
  toastFn = fn;
}

type EmailOptions = {
  to: string
  subject: string
  body: string
  from?: string
  cc?: string[]
  bcc?: string[]
  attachments?: Array<{ name: string; content: string }>
}

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; message: string }> {
  // In a real application, this would connect to your email service provider
  // like SendGrid, Mailgun, AWS SES, etc.

  try {
    // Simulate API call to email service
    console.log("Sending email:", options)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, we'll just return success
    // In production, you would integrate with a real email API
    return {
      success: true,
      message: `Email sent successfully to ${options.to}`,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send email",
    }
  }
}

// Function to send notification emails
export async function sendNotificationEmail(userEmail: string, subject: string, message: string): Promise<void> {
  try {
    const result = await sendEmail({
      to: userEmail,
      subject: subject,
      body: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #4f46e5;">Cretio CRM Notification</h2>
          <p>${message}</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="font-size: 12px; color: #666;">This is an automated notification from Cretio CRM. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    })

    if (result.success) {
      if (toastFn) {
        toastFn({
          title: "Notification Sent",
          description: `Notification email sent to ${userEmail}`,
        });
      }
    } else {
      if (toastFn) {
        toastFn({
          title: "Notification Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    }
  } catch (error) {
    console.error("Error sending notification:", error)
    if (toastFn) {
      toastFn({
        title: "Notification Error",
        description: "Failed to send notification email",
        variant: "destructive",
      });
    }
  }
}

