import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia' as any,
});

export async function POST(req: Request) {
    try {
        const { amount } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Donation to Iteka Youth Organization',
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate`,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error('Stripe error:', error);
        return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
    }
}