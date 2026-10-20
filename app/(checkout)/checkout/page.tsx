'use client';

import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm, Container, Title } from "@/shared/components/shared";

import { createOrder, getProfile } from "@/app/actions";
import { CheckoutSidebar } from "@/shared/components/shared/checkout/checkout-sidebar";
import { CheckoutFormSchema, CheckoutFormSchemaTypes } from "@/shared/constants/checkout-form-schema";
import { useCart } from "@/shared/hooks";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
    const { loading, items, removeCartItem, onClickUpdateQuantity, totalAmount, updateItemQuantity } = useCart();
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<CheckoutFormSchemaTypes>({
        resolver: zodResolver(CheckoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        },
    })

    useEffect(() => {
        async function fillData() {
            const user = await getProfile();

            if (!user) return;

            const [firstName, ...rest] = (user.fullName ?? '').trim().split(' ');

            form.setValue('email', user.email);
            form.setValue('firstName', firstName ?? '');
            form.setValue('lastName', rest.join(' '));
        }

        fillData();
    }, [form])

    const onSubmit = async (data: CheckoutFormSchemaTypes) => {
        try {
            setSubmitting(true);
            const url = await createOrder(data);
            console.log(url);
            toast.success('Заказ успешно оформлен! Переход на оплату..')

            if (url) {
                location.href = url;
            }
        } catch (e) {
            console.log(e);
            toast.error('Не удалось создать заказ')
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="mt-13">
            <Title text="Оформление заказа" className="font-extrabold mb-8" size="xl" />

            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="flex gap-10">
                        {/* Левая часть */}
                        <div className="flex-col flex gap-10 flex-1 mb-20">
                            <CheckoutCart items={items} onClickUpdateQuantity={onClickUpdateQuantity} removeCartItem={removeCartItem} loading={loading} />
                            <CheckoutPersonalForm />
                            <CheckoutAddressForm />
                        </div>

                        {/* Правая часть */}
                        <div className=" w-[450px]">
                            <CheckoutSidebar submitting={submitting} totalAmount={totalAmount} loading={loading} />
                        </div>
                    </div>
                </form>

            </FormProvider>

        </Container>
    )
}