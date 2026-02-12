// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation reCAPTCHA
async function verifyRecaptcha(token: string): Promise<boolean> {
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

        // Envoyer l'email via Resend
        const { data, error } = await resend.emails.send({
            from: 'Iteka Contact Form <onboarding@resend.dev>', // Email par défaut Resend
            to: ['yves.cri@gmail.com'], // Votre email de destination
            replyTo: email,
            subject: subject || `New Contact Form Submission from ${name}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        // Optionnel : Enregistrer dans Strapi
        try {
            await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
                body: JSON.stringify({
                    data: { name, email, subject, message, phone, is_read: false }
                }),
            });
        } catch (err) {
            console.error('Strapi save error:', err);
            // Continuer même si Strapi échoue
        }

        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}