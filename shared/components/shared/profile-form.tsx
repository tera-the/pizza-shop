'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { signOut } from 'next-auth/react';
import { LogOut, Mail, User as UserIcon, KeyRound } from 'lucide-react';
import { cn } from '@/lib';
import { Button, Input } from '@/shared/components/ui';
import { profileFormSchema, registerFormSchema } from './modals/auth-modals/forms/schemas';
import type { User } from '@/lib/generated/prisma/client';
import { updateUserInfo } from '@/app/actions';
import toast from 'react-hot-toast';
import z from 'zod';
import { useRouter } from 'next/navigation';

interface ProfileFormProps {
    className?: string;
    data: {
        fullName: string;
        id: number;
        email: string;
    }
}

const Field: React.FC<{
    label: string;
    icon: React.ReactNode;
    error?: string;
    children: React.ReactNode;
}> = ({ label, icon, error, children }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
            {children}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
);

type FormValues = z.infer<typeof profileFormSchema>;

export const ProfileForm: React.FC<ProfileFormProps> = ({ className, data }) => {
    const { reset, register, formState: { errors, isSubmitting }, handleSubmit } = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            fullName: data.fullName,
            email: data.email,
            password: '',
            confirmPassword: '',
        },
    });

    const router = useRouter();

    const onSubmit = async (values: FormValues) => {
        try {
            await updateUserInfo({
                email: values.email,
                fullName: values.fullName,
                ...(values.password ? { password: values.password } : {}),
            });

            toast.success('Данные обновлены 📝', {
                icon: '✅',
            });

            router.refresh()

            reset({ fullName: values.fullName, email: values.email, password: '', confirmPassword: '' });
        } catch (error) {
            return toast.error('Ошибка при обновлении данных', {
                icon: '❌',
            });
        }
    };

    const initials = data.fullName
        ?.split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <div className={cn('grid md:grid-cols-[320px_1fr] min-h-[600px]', className)}>
            <aside className="flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-primary/10 to-primary/5 p-8 text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-4xl font-extrabold text-white shadow-lg shadow-primary/30 pointer-events-none select-none">
                    {initials}
                </div>

                <div>
                    <h2 className="text-2xl font-extrabold">{data.fullName}</h2>
                    <p className="text-sm text-gray-500">{data.email}</p>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="mt-4 gap-2"
                    onClick={() => signOut({ callbackUrl: '/' })}
                >
                    <LogOut size={16} />
                    Выйти из аккаунта
                </Button>
            </aside>

            {/* Форма */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-8 p-8 md:p-12">
                <div>
                    <h3 className="text-2xl font-extrabold">Личные данные</h3>
                    <p className="text-gray-400">Измените имя, почту или пароль</p>
                </div>

                <div className="grid gap-5">
                    <Field label="Полное имя" icon={<UserIcon size={18} />} error={errors.fullName?.message}>
                        <Input {...register('fullName')} placeholder="Имя" className="h-12 pl-11" />
                    </Field>

                    <Field label="E-Mail" icon={<Mail size={18} />} error={errors.email?.message}>
                        <Input {...register('email')} type="email" placeholder="mail@example.com" className="h-12 pl-11" />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Новый пароль" icon={<KeyRound size={18} />} error={errors.password?.message}>
                            <Input {...register('password')} type="password" placeholder="••••••••" className="h-12 pl-11" />
                        </Field>

                        <Field label="Повторите пароль" icon={<KeyRound size={18} />} error={errors.confirmPassword?.message}>
                            <Input {...register('confirmPassword')} type="password" placeholder="••••••••" className="h-12 pl-11" />
                        </Field>
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                    <Button type="reset" variant="secondary" size="lg" className="px-8 flex-1">
                        Сбросить
                    </Button>
                    <Button type="submit" size="lg" className="px-8 flex-1" disabled={isSubmitting}>
                        {isSubmitting ? 'Сохраняем...' : 'Сохранить изменения'}
                    </Button>
                </div>
            </form>
        </div>
    );
};