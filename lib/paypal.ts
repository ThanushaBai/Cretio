interface PayPalItem {
  name: string;
  price: number;
  quantity: number;
}

const generateAccessToken = async (): Promise<string> => {
  try {
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      throw new Error('PayPal credentials are missing. Please check your environment variables.');
    }
    
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64');
    
    console.log(`Requesting PayPal access token from ${process.env.PAYPAL_API_URL}/v1/oauth2/token`);
    
    const response = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`PayPal token request failed with status ${response.status}:`, errorText);
      throw new Error(`Failed to get PayPal access token: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.access_token) {
      console.error('PayPal token response missing access_token:', data);
      throw new Error('PayPal access token not found in response');
    }
    
    return data.access_token;
  } catch (error) {
    console.error('Failed to generate PayPal access token:', error);
    throw error;
  }
};

export const createOrder = async (items: PayPalItem[], currency = 'USD') => {
  const accessToken = await generateAccessToken();
  
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  
  if (parseFloat(totalAmount) <= 0) {
    throw new Error('Total amount must be greater than 0');
  }
  
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
      return_url: `${process.env.NEXT_PUBLIC_URL}/api/paypal/capture`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/api/paypal/cancel`,
      brand_name: 'Cretio',
      user_action: 'PAY_NOW',
      shipping_preference: 'NO_SHIPPING',
    },
  };

  console.log(`Creating PayPal order with payload:`, JSON.stringify(payload, null, 2));

  const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`PayPal create order failed with status ${response.status}:`, errorText);
    throw new Error(`Failed to create PayPal order: ${response.status} ${response.statusText}`);
  }

  const orderData = await response.json();
  console.log('PayPal order created successfully:', orderData.id);
  
  return orderData;
};

export const capturePayment = async (orderId: string) => {
  const accessToken = await generateAccessToken();
  
  console.log(`Capturing payment for order: ${orderId}`);
  
  const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`PayPal capture payment failed with status ${response.status}:`, errorText);
    throw new Error(`Failed to capture PayPal payment: ${response.status} ${response.statusText}`);
  }

  const captureData = await response.json();
  console.log('PayPal payment captured successfully:', captureData.id || orderId);
  
  return captureData;
};