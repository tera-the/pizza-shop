'use client';

import { registerUser } from '@/app/actions';
import { Button } from '@/shared/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TFormRegisterValues, registerFormSchema } from './schemas';
import { FormInput } from '../../../form-components';

interface Props {
    onClose?: VoidFunction;
    onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await registerUser({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            });

            toast.error('Регистрация успешна 📝. Подтвердите свою почту', {
                icon: '✅',
            });

            onClose?.();
        } catch (error) {
            return toast.error('Неверный E-Mail или пароль', {
                icon: '❌',
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" label="E-Mail" placeholder='Ваш E-Mail..' required />
                <FormInput name="fullName" label="Полное имя" placeholder='Ваше полное имя' required />
                <FormInput name="password" label="Пароль" type="password" placeholder='Введите пароль' required />
                <FormInput name="confirmPassword" label="Подтвердите пароль" placeholder='Повторите пароль' type="password" required />

                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    );
};