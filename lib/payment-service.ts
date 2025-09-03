import { v4 as uuidv4 } from 'uuid';

// Types for payment processing
export interface CardDetails {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  createdAt: Date;
  updatedAt: Date;
  paymentMethod: 'card' | 'paypal';
  cardDetails?: Partial<CardDetails>;
  customerId?: string;
  metadata?: Record<string, any>;
}

// Mock database for payment intents
const paymentIntents: PaymentIntent[] = [];

/**
 * Creates a payment intent with the provided details
 */
export async function createPaymentIntent(
  amount: number,
  currency: string = 'usd',
  metadata: Record<string, any> = {}
): Promise<PaymentIntent> {
  const paymentIntent: PaymentIntent = {
    id: `pi_${uuidv4().replace(/-/g, '')}`,
    amount,
    currency,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
    paymentMethod: 'card',
    metadata
  };

  paymentIntents.push(paymentIntent);
  return paymentIntent;
}

/**
 * Process a card payment
 * In a real app, this would communicate with a payment processor like Stripe
 */
export async function processCardPayment(
  paymentIntentId: string,
  cardDetails: CardDetails
): Promise<PaymentIntent> {
  // Find the payment intent
  const paymentIntent = paymentIntents.find(pi => pi.id === paymentIntentId);
  if (!paymentIntent) {
    throw new Error(`Payment intent ${paymentIntentId} not found`);
  }

  // Update the payment intent
  paymentIntent.status = 'processing';
  paymentIntent.updatedAt = new Date();
  paymentIntent.paymentMethod = 'card';
  
  // Store a masked version of the card details for security
  paymentIntent.cardDetails = {
    cardNumber: `**** **** **** ${cardDetails.cardNumber.slice(-4)}`,
    cardholderName: cardDetails.cardholderName,
    expiryDate: cardDetails.expiryDate,
  };

  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Validate card details (basic validation for demo)
  const isValid = validateCardDetails(cardDetails);

  if (isValid) {
    paymentIntent.status = 'succeeded';
  } else {
    paymentIntent.status = 'failed';
  }

  paymentIntent.updatedAt = new Date();
  return paymentIntent;
}

/**
 * Process a PayPal payment
 */
export async function processPayPalPayment(
  paymentIntentId: string,
  paypalDetails: { paypalEmail: string }
): Promise<PaymentIntent> {
  // Find the payment intent
  const paymentIntent = paymentIntents.find(pi => pi.id === paymentIntentId);
  if (!paymentIntent) {
    throw new Error(`Payment intent ${paymentIntentId} not found`);
  }

  // Update the payment intent
  paymentIntent.status = 'processing';
  paymentIntent.updatedAt = new Date();
  paymentIntent.paymentMethod = 'paypal';
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Always succeed for demo purposes
  paymentIntent.status = 'succeeded';
  paymentIntent.updatedAt = new Date();
  
  return paymentIntent;
}

/**
 * Get a payment intent by ID
 */
export async function getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent | null> {
  return paymentIntents.find(pi => pi.id === paymentIntentId) || null;
}

/**
 * Get all payment intents
 */
export async function getAllPaymentIntents(): Promise<PaymentIntent[]> {
  return [...paymentIntents];
}

/**
 * Basic validation for card details
 */
function validateCardDetails(cardDetails: CardDetails): boolean {
  // Check if card number is valid (Luhn algorithm)
  const isCardNumberValid = validateCardNumber(cardDetails.cardNumber);
  
  // Check if expiry date is valid and not expired
  const isExpiryValid = validateExpiryDate(cardDetails.expiryDate);
  
  // Check if CVV is valid (3-4 digits)
  const isCvvValid = /^\d{3,4}$/.test(cardDetails.cvv);
  
  return isCardNumberValid && isExpiryValid && isCvvValid;
}

/**
 * Validate card number using Luhn algorithm
 */
function validateCardNumber(cardNumber: string): boolean {
  // Remove spaces and non-digit characters
  const digits = cardNumber.replace(/\D/g, '');
  
  // Check if card number has valid length
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  
  // Loop through digits from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
}

/**
 * Validate expiry date
 */
function validateExpiryDate(expiryDate: string): boolean {
  // Format should be MM/YY or MM/YYYY
  const parts = expiryDate.split('/');
  if (parts.length !== 2) {
    return false;
  }
  
  const month = parseInt(parts[0], 10);
  let year = parseInt(parts[1], 10);
  
  // Adjust year if it's in YY format
  if (year < 100) {
    year += 2000;
  }
  
  // Check if month is valid
  if (month < 1 || month > 12) {
    return false;
  }
  
  // Check if date is in the future
  const now = new Date();
  const expiryDateObj = new Date(year, month);
  
  return expiryDateObj > now;
}