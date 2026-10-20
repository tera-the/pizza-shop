'use client';

import React, { InputHTMLAttributes, useState } from 'react';
import { RequiredSymbol } from '../required-symbol';
import { Input } from '../../ui';
import { ErrorText } from '../error-text';
import { ClearButton } from '../clear-button';
import { Controller, useFormContext } from 'react-hook-form';
import { IMaskMixin } from 'react-imask';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib';

const MaskedInput = IMaskMixin(({ inputRef, ...props }: any) => (
    <Input {...props} ref={inputRef} />
));

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    name: string;
    label?: string;
    required?: boolean;
    mask?: any;       // строка или массив масок
    dispatch?: any;   // функция выбора маски для динамических масок
}

export const FormInput: React.FC<FormInputProps> = ({ className,
    name,
    label,
    required,
    mask,
    dispatch,
    type,
    ...props }) => {
    const {
        register,
        formState: { errors },
        watch,
        control,
        setValue,
    } = useFormContext();

    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onHandleClear = () => {
        setValue(name, '', { shouldValidate: true });
    };

    return (
        <div className={className}>
            {label && (
                <p className='font-medium mb-2 pl-4'>
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className='relative'>
                {mask ? (
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <MaskedInput
                                {...props}
                                className="h-14 text-md pl-5"
                                mask={mask}
                                {...(dispatch ? { dispatch } : {})}
                                value={field.value ?? ''}
                                inputRef={field.ref}
                                onBlur={field.onBlur}
                                onAccept={(val: string) => field.onChange(val)}
                            />
                        )}
                    />
                ) : (
                    <Input
                        className={cn('h-14 text-md pl-5', isPassword && 'pr-20')}
                        type={inputType}
                        {...register(name)}
                        {...props}
                    />
                )}

                {isPassword && (
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                        className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}

                {value && <ClearButton onClick={onHandleClear} />}
            </div>

            {errorText && <ErrorText text={errorText} className='mt-2' />}
        </div>
    );
};