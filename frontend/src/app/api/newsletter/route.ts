// app/api/newsletter/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyRecaptcha(token?: string): Promise<boolean> {
    if (!token) return true; // reCAPTCHA optional for newsletter signup
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secret}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score > 0.5;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, recaptchaToken } = body;

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
        if (!isValidRecaptcha) {
            return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
        }

        const destination = process.env.CONTACT_EMAIL || 'hello@itekarwanda.org';

        const { error } = await resend.emails.send({
            from: 'Iteka Newsletter <onboarding@resend.dev>',
            to: [destination],
            replyTo: email,
            subject: 'New newsletter subscriber',
            html: `<p>New newsletter signup: <strong>${email}</strong></p>`,
        });

        if (error) {
            console.error('Resend error (newsletter):', error);
            return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Newsletter signup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
