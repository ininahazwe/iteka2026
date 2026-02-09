// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
    points: 3,
    duration: 60 * 60,
});

function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    if (forwarded) return forwarded.split(',')[0].trim();
    return realIp || 'unknown';
}

async function verifyRecaptcha(token: string): Promise<boolean> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        console.error('[DEBUG] reCAPTCHA: SECRET_KEY manquante dans .env');
        return false;
    }

    try {
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
            { method: 'POST' }
        );
        const data = await response.json();
        console.log('[DEBUG] reCAPTCHA response:', data);
        return data.success && data.score > 0.5;
    } catch (error) {
        console.error('[DEBUG] reCAPTCHA: Erreur de fetch:', error);
        return false;
    }
}

function createTransporter() {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIp(request);

        // 1. Rate limiting
        try {
            await rateLimiter.consume(ip);
        } catch {
            console.warn(`[DEBUG] Rate limit atteint pour l'IP: ${ip}`);
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        const body = await request.json();
        const { name, email, subject, message, phone, recaptchaToken, honeypot } = body;

        // 2. Honeypot
        if (honeypot) {
            console.log('[DEBUG] Bot détecté via honeypot');
            return NextResponse.json({ success: true });
        }

        // 3. Validation reCAPTCHA
        if (!recaptchaToken) {
            console.error('[DEBUG] Token reCAPTCHA manquant dans le body');
            return NextResponse.json({ error: 'reCAPTCHA token missing' }, { status: 400 });
        }
        const isHuman = await verifyRecaptcha(recaptchaToken);
        if (!isHuman) {
            return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
        }

        // 4. Envoi vers Strapi
        const strapiToken = process.env.STRAPI_API_TOKEN;
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

        if (!strapiToken || !strapiUrl) {
            console.error('[DEBUG] Config Strapi manquante:', { hasToken: !!strapiToken, hasUrl: !!strapiUrl });
            return NextResponse.json({ error: 'Server config error' }, { status: 500 });
        }

        console.log(`[DEBUG] Tentative d'envoi vers Strapi: ${strapiUrl}/api/contact-messages`);

        const strapiResponse = await fetch(`${strapiUrl}/api/contact-messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${strapiToken}`,
            },
            body: JSON.stringify({
                data: { name, email, subject: subject || 'No subject', message, phone: phone || null },
            }),
        });

        if (!strapiResponse.ok) {
            const errorData = await strapiResponse.json();
            console.error('[DEBUG] Strapi a rejeté la requête:', JSON.stringify(errorData, null, 2));
            return NextResponse.json({ error: 'Failed to save to database' }, { status: 500 });
        }

        // 5. Email (Optionnel - ne bloque pas la réponse)
        const transporter = createTransporter();
        if (transporter) {
            transporter.sendMail({
                from: `"Iteka Website" <${process.env.SMTP_USER}>`,
                to: process.env.CONTACT_EMAIL,
                replyTo: email,
                subject: `New Contact Form: ${subject || 'No subject'}`,
                html: `<p><strong>Name:</strong> ${name}</p><p><strong>Message:</strong> ${message}</p>`,
            }).catch(err => console.error('[DEBUG] Email error (non-bloquante):', err));
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('[DEBUG] Erreur critique API Route:', error.message || error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}