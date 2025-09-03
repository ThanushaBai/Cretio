// lib/paypal.js
const generateAccessToken = async () => {
  try {
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64');
    
    const response = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Failed to generate PayPal access token:', error);
    throw error;
  }
};

// Create a PayPal order
export const createOrder = async (items, currency = 'USD') => {
  const accessToken = await generateAccessToken();
  
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  
  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: totalAmount,
          breakdown: {
            item_total: {
              currency_code: currency,
              value: totalAmount,
            },
          },
        },
        items: items.map(item => {
          // Ensure price is a valid number
          const price = typeof item.price === 'number' ? item.price : 0;
          // Ensure quantity is a valid number
          const quantity = typeof item.quantity === 'number' ? item.quantity : 1;

          return {
            name: item.name || 'Product',
            unit_amount: {
              currency_code: currency,
              value: price.toFixed(2),
            },
            quantity: quantity.toString(),
          };
        }),
      },
    ],
    application_context: {
      return_url: `${process.env.NEXT_PUBLIC_API_URL}/api/paypal/capture`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/api/paypal/cancel`,
    },
  };

  const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  return response.json();
};

// Capture payment for an order
export const capturePayment = async (orderId) => {
  const accessToken = await generateAccessToken();
  
  const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
};