import { ReactNode } from "react";
import { Resend } from 'resend';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, template: ReactNode) {

    const html = await render(template as React.ReactElement)

    try {
        const { data, error } = await resend.emails.send({
            from: 'Aldiyar <onboarding@resend.dev>',
            to,
            subject,
            html
        });

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.log('[SEND_EMAIL] error', error);
        throw error;
    }
}