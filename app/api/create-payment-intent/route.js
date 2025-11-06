import { NextResponse } from 'next/server';

function validateAmount(amount) {
  if (typeof amount !== 'number') return false;
  if (!Number.isFinite(amount)) return false;
  if (amount < 50) return false; // minimum $0.50 in USD
  return true;
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const amount = Number(payload?.amount);
  if (!validateAmount(amount)) {
    return NextResponse.json(
      { error: 'Provide an amount in cents greater than or equal to 50.' },
      { status: 400 }
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Set STRIPE_SECRET_KEY in your environment.' },
      { status: 500 }
    );
  }

  const formData = new URLSearchParams();
  formData.append('amount', Math.round(amount).toString());
  formData.append('currency', 'usd');
  formData.append('automatic_payment_methods[enabled]', 'true');

  if (payload?.description) {
    formData.append('description', payload.description);
  }

  const receiptEmail = payload?.receiptEmail?.trim();
  if (receiptEmail) {
    formData.append('receipt_email', receiptEmail);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new Error('Stripe request timed out.')), 10000);

  try {
    const stripeResponse = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData,
      signal: controller.signal
    });

    const responseBody = await stripeResponse.json();

    if (!stripeResponse.ok) {
      const errorMessage = responseBody?.error?.message || 'Unable to create Stripe payment intent.';
      return NextResponse.json({ error: errorMessage }, { status: stripeResponse.status });
    }

    if (!responseBody?.client_secret) {
      return NextResponse.json(
        { error: 'Stripe did not return a client secret.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ clientSecret: responseBody.client_secret });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Stripe request failed.' }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}
