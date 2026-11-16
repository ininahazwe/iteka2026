// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { sendMail, escapeHtml } from '@/src/lib/mailer';

// Validation reCAPTCHA
async function verifyRecaptcha(token: string): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secret}&response=${token}`,
    });

    const data = await response.json();
    console.log('reCAPTCHA response:', data);
    return data.success && data.score > 0.5;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message, phone, honeypot, recaptchaToken } = body;

        // Anti-spam honeypot
        if (honeypot) {
            return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
        }

        // Validation des champs
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Vérification reCAPTCHA
        const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
        if (!isValidRecaptcha) {
            return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
        }

        // Envoi de l'email via SMTP
        await sendMail({
            fromName: 'Iteka Contact Form',
            to: process.env.CONTACT_EMAIL || 'contact@itekarwanda.org',
            replyTo: email,
            subject: subject || `New Contact Form Submission from ${name}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Subject:</strong> ${escapeHtml(subject || 'No subject')}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}