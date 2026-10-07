'use client';

import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm, Container, Title } from "@/shared/components/shared";

import { createOrder } from "@/app/actions";
import { CheckoutSidebar } from "@/shared/components/shared/checkout/checkout-sidebar";
import { CheckoutFormSchema, CheckoutFormSchemaTypes } from "@/shared/constants/checkout-form-schema";
import { useCart } from "@/shared/hooks";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

export default function CheckoutPage() {
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

    const onSubmit = async (data: CheckoutFormSchemaTypes) => {
        console.log(data);
        console.log(await createOrder(data));
    };

    const { loading, items, removeCartItem, onClickUpdateQuantity, totalAmount, updateItemQuantity } = useCart();

    return (
        <Container className="mt-13">
            <Title text="Оформление заказа" className="font-extrabold mb-8" size="xl" />

            <FormProvider {...form}>
                <form
                    onSubmit={(e) => {
                        form.handleSubmit(onSubmit);
                    }}
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
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
                        </div>
                    </div>
                </form>

            </FormProvider>

        </Container>
    )
}