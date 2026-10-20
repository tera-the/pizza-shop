'use client';

import { Button, Dialog, DialogContent } from "@/shared/components/ui"
import { signIn } from "next-auth/react";
import { useState } from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

interface AuthModalProps {
    className?: string;
    isOpened: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ className, isOpened, onClose }) => {
    const [type, setType] = useState<'login' | 'register'>('login')

    const handleClose = () => {
        onClose();
    }

    const onSwitchType = () => {
        setType(type === 'login' ? 'register' : 'login');
    }

    return (
        <Dialog open={isOpened} onOpenChange={handleClose}>
            <DialogContent className='w-[450px] bg-white p-10'>

                {
                    type === 'login' ? (
                        <LoginForm />
                    ) : (
                        <RegisterForm />
                    )
                }

                <hr />

                <div className="flex gap-2">
                    {/* GitHub */}
                    <Button
                        variant="secondary"
                        onClick={() =>
                            signIn('github', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        type="button"
                        className="gap-2 h-12 p-2 flex-1">
                        <img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" />
                        GitHub
                    </Button>

                    {/* Google */}
                    <Button
                        variant="secondary"
                        onClick={() =>
                            signIn('google', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        type="button"
                        className="gap-2 h-12 p-2 flex-1">
                        <img
                            className="w-6 h-6"
                            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                        />
                        Google
                    </Button>
                </div>

                <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
                    {type !== 'login' ? 'Войти' : 'Регистрация'}
                </Button>

            </DialogContent>
        </Dialog>
    );
}; 