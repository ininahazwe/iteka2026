// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiter: 3 requêtes par IP par heure
const rateLimiter = new RateLimiterMemory({
    points: 3,
    duration: 60 * 60, // 1 heure
});

// Helper pour obtenir l'IP du client
function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');

    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    if (realIp) {
        return realIp;
    }

    return 'unknown';
}

// Vérification reCAPTCHA
async function verifyRecaptcha(token: string): Promise<boolean> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
        console.error('RECAPTCHA_SECRET_KEY not configured');
        return false;
    }

    try {
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
            { method: 'POST' }
        );

        const data = await response.json();

        // Score > 0.5 = probablement humain
        return data.success && data.score > 0.5;
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return false;
    }
}

// Configuration SMTP (uniquement si configuré)
function createTransporter() {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        return null;
    }

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

        // 1. Rate limiting par IP
        try {
            await rateLimiter.consume(ip);
        } catch {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { name, email, subject, message, phone, recaptchaToken, honeypot } = body;

        // 2. Honeypot check (champ caché)
        if (honeypot) {
            console.log('Bot detected via honeypot');
            return NextResponse.json({ success: true }); // Fake success pour le bot
        }

        // 3. Validation des champs
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validation email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Validation longueur
        if (name.length > 100 || message.length > 2000) {
            return NextResponse.json(
                { error: 'Input too long' },
                { status: 400 }
            );
        }

        // 4. Vérification reCAPTCHA
        if (!recaptchaToken) {
            return NextResponse.json(
                { error: 'reCAPTCHA validation failed' },
                { status: 400 }
            );
        }

        const isHuman = await verifyRecaptcha(recaptchaToken);
        if (!isHuman) {
            console.log('reCAPTCHA failed for IP:', ip);
            return NextResponse.json(
                { error: 'reCAPTCHA validation failed' },
                { status: 400 }
            );
        }

        // 5. Sauvegarder dans Strapi
        const strapiToken = process.env.STRAPI_API_TOKEN;

        if (!strapiToken) {
            console.error('STRAPI_API_TOKEN not configured');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const strapiResponse = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-messages`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${strapiToken}`,
                },
                body: JSON.stringify({
                    data: {
                        name,
                        email,
                        subject: subject || 'No subject',
                        message,
                        phone: phone || null,
                    },
                }),
            }
        );

        if (!strapiResponse.ok) {
            const errorData = await strapiResponse.json();
            console.error('Strapi error:', errorData);
            throw new Error('Failed to save to Strapi');
        }

        // 6. Envoyer email de notification (optionnel)
        const transporter = createTransporter();

        if (transporter) {
            try {
                await transporter.sendMail({
                    from: `"Iteka Website" <${process.env.SMTP_USER}>`,
                    to: process.env.CONTACT_EMAIL,
                    replyTo: email,
                    subject: `New Contact Form: ${subject || 'No subject'}`,
                    html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Sent from Iteka Website Contact Form</small></p>
          `,
                });
                console.log('Email notification sent successfully');
            } catch (emailError) {
                console.error('Failed to send email notification:', emailError);
                // Continue quand même - le message est sauvegardé dans Strapi
            }
        } else {
            console.warn('SMTP not configured - email notification skipped');
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