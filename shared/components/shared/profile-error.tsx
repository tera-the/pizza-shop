import { cn } from '@/lib';
import { LockKeyhole } from 'lucide-react';
import React from 'react';
import { Button } from '../ui';

interface ProfileErrorProps {
    className?: string;
    onClose: () => void;
}

export const ProfileError: React.FC<ProfileErrorProps> = ({ className, onClose }) => {
    return (
        <div className={cn('flex flex-col items-center justify-center text-center gap-5 py-16 px-6 h-full', className)}>
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
                <LockKeyhole size={36} className="text-primary" />
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-extrabold">Вы не вошли в аккаунт</h2>
                <p className="text-gray-400 max-w-sm">
                    Войдите или зарегистрируйтесь, чтобы увидеть свой профиль и историю заказов
                </p>
            </div>

            <Button size="lg" className="px-8" onClick={onClose}>
                Закрыть окно
            </Button>
        </div>
    );
};