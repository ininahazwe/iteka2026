// app/api/newsletter/route.ts
import { NextResponse } from 'next/server';
import { sendMail, escapeHtml } from '@/src/lib/mailer';

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

        await sendMail({
            fromName: 'Iteka Newsletter',
            to: destination,
            replyTo: email,
            subject: 'New newsletter subscriber',
            html: `<p>New newsletter signup: <strong>${escapeHtml(email)}</strong></p>`,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Newsletter signup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
