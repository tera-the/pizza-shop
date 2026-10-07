'use client';

import React, { InputHTMLAttributes } from 'react';
import { RequiredSymbol } from '../required-symbol';
import { Input } from '../../ui';
import { ErrorText } from '../error-text';
import { ClearButton } from '../clear-button';
import { Controller, useFormContext } from 'react-hook-form';
import { IMaskMixin } from 'react-imask';

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
    ...props }) => {
    const {
        register,
        formState: { errors },
        watch,
        control,
        setValue
    } = useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onHandleClear = () => {
        setValue(name, '', { shouldValidate: true })
    }

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
                    <Input className="h-14 text-md pl-5" {...register(name)} {...props} />
                )}

                {value && <ClearButton onClick={onHandleClear} />}
            </div>

            {errorText && <ErrorText text={errorText} className='mt-2' />}
        </div>
    );
};