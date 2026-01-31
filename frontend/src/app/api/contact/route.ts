import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        // Sauvegarder dans Strapi
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-messages`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: { name, email, subject, message }
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to save message');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}