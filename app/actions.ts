'use server';

import { OrderStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormSchemaTypes } from "@/shared/constants/checkout-form-schema";

export async function createOrder(data: CheckoutFormSchemaTypes) {
    const token = '123';

    await prisma.order.create({
        data: {
            fullName: data.firstName + ' ' + data.lastName,
            address: data.address,
            email: data.email,
            phone: data.phone,
            totalAmount: 1500,
            token,
            status: OrderStatus.PENDING,
            comment: data.comment,
            items: []
        },
    })
    return 'qweqwe'
}