
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { randomBytes } from 'crypto';

// Force the route to be configured for the Node.js runtime
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
        return NextResponse.json({ error: 'Razorpay API keys are not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment variables.' }, { status: 500 });
    }
    
    // Initialize Razorpay client inside the request handler
    const razorpay = new Razorpay({
        key_id,
        key_secret,
    });

    const { amount } = await req.json();

    if (!amount || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${randomBytes(16).toString('hex')}`
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ order }, { status: 200 });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
