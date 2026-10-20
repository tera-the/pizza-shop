import * as React from 'react';

interface VerificationUserTemplateProps {
    code: string;
    userName?: string;
}

const PRIMARY = '#fe5f00'; // подставьте основной цвет сайта
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export function VerificationUserTemplate({ code, userName }: VerificationUserTemplateProps) {
    const verifyUrl = `${BASE_URL}/api/auth/verify?code=${encodeURIComponent(code)}`;

    return (
        <table
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            role="presentation"
            style={{ backgroundColor: '#f4f4f7', padding: '40px 16px', fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
            <tbody>
                <tr>
                    <td align="center">
                        <table
                            width="100%"
                            cellPadding={0}
                            cellSpacing={0}
                            role="presentation"
                            style={{
                                maxWidth: 480,
                                backgroundColor: '#ffffff',
                                borderRadius: 16,
                                overflow: 'hidden',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                            }}
                        >
                            <tbody>
                                {/* Шапка */}
                                <tr>
                                    <td align="center" style={{ backgroundColor: PRIMARY, padding: '28px 24px' }}>
                                        <span style={{ fontSize: 26, fontWeight: 800, color: '#ffffff', letterSpacing: 0.5 }}>
                                            🍕 Aldiyar
                                        </span>
                                    </td>
                                </tr>

                                {/* Текст */}
                                <tr>
                                    <td align="center" style={{ padding: '40px 32px 8px' }}>
                                        <h1 style={{ margin: 0, fontSize: 24, color: '#1a1a1a' }}>Подтвердите почту</h1>
                                        <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: '22px', color: '#6b7280' }}>
                                            {userName ? `${userName}, нажмите` : 'Нажмите'} на кнопку ниже, чтобы
                                            подтвердить свой аккаунт и завершить регистрацию.
                                        </p>
                                    </td>
                                </tr>

                                {/* Кнопка */}
                                <tr>
                                    <td align="center" style={{ padding: '24px 32px 8px' }}>
                                        <a
                                            href={verifyUrl}
                                            target="_blank"
                                            style={{
                                                display: 'inline-block',
                                                padding: '16px 40px',
                                                borderRadius: 12,
                                                backgroundColor: PRIMARY,
                                                color: '#ffffff',
                                                fontSize: 16,
                                                fontWeight: 700,
                                                textDecoration: 'none',
                                            }}
                                        >
                                            Подтвердить аккаунт
                                        </a>
                                    </td>
                                </tr>

                                {/* Запасная ссылка */}
                                <tr>
                                    <td align="center" style={{ padding: '16px 32px 8px' }}>
                                        <p style={{ margin: 0, fontSize: 12, lineHeight: '18px', color: '#9ca3af' }}>
                                            Если кнопка не работает, скопируйте ссылку в браузер:
                                        </p>
                                        <a
                                            href={verifyUrl}
                                            style={{ fontSize: 12, color: PRIMARY, wordBreak: 'break-all' }}
                                        >
                                            {verifyUrl}
                                        </a>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" style={{ padding: '8px 32px 40px' }}>
                                        <p style={{ margin: 0, fontSize: 13, color: '#9ca3af' }}>
                                            Ссылка действует 10 минут.
                                        </p>
                                    </td>
                                </tr>

                                {/* Подвал */}
                                <tr>
                                    <td
                                        align="center"
                                        style={{ backgroundColor: '#fafafa', padding: '20px 32px', borderTop: '1px solid #eee' }}
                                    >
                                        <p style={{ margin: 0, fontSize: 12, lineHeight: '18px', color: '#9ca3af' }}>
                                            Если вы не регистрировались на NextPizza, просто проигнорируйте письмо.
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}