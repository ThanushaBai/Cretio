import { NextResponse } from "next/server";
import { createPaymentIntent, processCardPayment, processPayPalPayment, getAllPaymentIntents } from "@/lib/payment-service";
import { logAudit } from "@/lib/audit-logger";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency, paymentMethod, cardDetails, paypalDetails, metadata } = body;

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!paymentMethod || (paymentMethod !== "card" && paymentMethod !== "paypal")) {
      return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
    }

    // Create a payment intent
    const paymentIntent = await createPaymentIntent(amount, currency || "usd", metadata || {});

    // Process the payment based on the payment method
    let processedPayment;
    if (paymentMethod === "card") {
      if (!cardDetails) {
        return NextResponse.json({ error: "Card details are required" }, { status: 400 });
      }
      processedPayment = await processCardPayment(paymentIntent.id, cardDetails);
    } else if (paymentMethod === "paypal") {
      if (!paypalDetails) {
        return NextResponse.json({ error: "PayPal details are required" }, { status: 400 });
      }
      processedPayment = await processPayPalPayment(paymentIntent.id, paypalDetails);
    }

    // Log the payment activity
    await logAudit(
      "system",
      "system@example.com",
      "create",
      "payment",
      paymentIntent.id,
      `Processed ${paymentMethod} payment for ${currency || "usd"} ${amount}`,
      null,
      { status: processedPayment?.status }
    );

    return NextResponse.json({ 
      success: processedPayment?.status === "succeeded",
      paymentIntent: processedPayment 
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // This would typically be protected by authentication
    const paymentIntents = await getAllPaymentIntents();
    return NextResponse.json({ paymentIntents });
  } catch (error) {
    console.error("Error fetching payment intents:", error);
    return NextResponse.json({ error: "Failed to fetch payment intents" }, { status: 500 });
  }
}