// src/lib/mailer.ts
// Envoi d'emails via SMTP (nodemailer). Le transporteur est créé à l'appel,
// jamais au chargement du module : le build n'a donc besoin d'aucun secret.
import nodemailer from 'nodemailer';

export function escapeHtml(value: unknown): string {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export async function sendMail(opts: {
    fromName: string;
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
}) {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) {
        throw new Error('SMTP is not configured (SMTP_HOST, SMTP_USER, SMTP_PASS)');
    }

    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // 465 = TLS direct ; 587 = STARTTLS
        auth: { user, pass },
    });

    return transporter.sendMail({
        from: `"${opts.fromName}" <${process.env.SMTP_FROM || user}>`,
        to: opts.to,
        replyTo: opts.replyTo,
        subject: opts.subject,
        html: opts.html,
    });
}
