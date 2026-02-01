import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// On récupère la clé
const apiKey = process.env.STRIPE_SECRET_KEY;

// On n'initialise Stripe QUE si la clé existe,
// sinon on passe une chaîne vide pour éviter le crash au build
const stripe = new Stripe(apiKey || '', {
    apiVersion: '2024-12-18.acacia' as any,
});

export async function POST(req: Request) {
    // Vérification de sécurité au moment de l'appel API
    if (!apiKey) {
        console.error("STRIPE_SECRET_KEY is missing in environment variables");
        return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
    }

    try {
        const { amount } = await req.json();

        // Validation simple du montant
        if (!amount || amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Donation to Iteka Youth Organization',
                    },
                    unit_amount: Math.round(amount * 100), // Utilisation de Math.round pour éviter les problèmes de flottants
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate`,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error: any) {
        console.error('Stripe error:', error);
        return NextResponse.json({ error: error.message || 'Payment failed' }, { status: 500 });
    }
}