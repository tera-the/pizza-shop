'use server';

import { sendEmail } from "@/lib/send-email";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { CheckoutFormSchemaTypes } from "@/shared/constants/checkout-form-schema";
import { cookies } from "next/headers";
import { createPayment } from "@/lib";
import { getUserSession } from "@/lib/get-user-session";
import { Prisma } from "@/lib/generated/prisma/client";
import { hashSync } from "bcryptjs";
import { VerificationUserTemplate } from "@/shared/components/shared/email-templates/verification-user";

export async function createOrder(data: CheckoutFormSchemaTypes) {
    try {
        const cookieStore = cookies();
        const cartToken = (await cookieStore).get('cartToken')?.value;

        if (!cartToken) {
            throw new Error("Cart token not found");
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken
            }
        });

        if (!userCart) {
            throw new Error('Cart not found')
        }

        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty')
        }

        const order = await prisma.order.create({
            data: {
                fullName: data.firstName + ' ' + data.lastName,
                address: data.address,
                email: data.email,
                items: JSON.stringify(userCart.items),
                phone: data.phone,
                status: OrderStatus.PENDING,
                token: cartToken,
                totalAmount: userCart.totalAmount,
                comment: data.comment
            }
        });

        await prisma.cart.update({
            where: {
                id: userCart.id
            },
            data: {
                totalAmount: 0
            }
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        })

        const paymentData = await createPayment({ amount: userCart.totalAmount, orderId: order.id, description: "Оплата заказа #" + order.id });

        if (!paymentData) {
            throw new Error('Payment data not found')
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id
            }
        })

        const paymentUrl = paymentData.confirmation.confirmation_url;

        await sendEmail(data.email,
            'Aldiyar / Оплатите заказ #' + order.id,
            PayOrderTemplate({
                orderId: order.id,
                paymentUrl,
                totalAmount: order.totalAmount
            }))

        return paymentUrl;
    } catch (error) {
        console.error('[createOrder] error', error);
        throw error;
    }
}

export async function getProfile() {
    const session = await getUserSession();
    if (!session) return null;

    const user = await prisma.user.findUnique({
        where: { id: Number(session.id) },
        select: { id: true, fullName: true, email: true }
    })

    return user;
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('Пользователь не найден');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: Number(currentUser.id)
            }
        })

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : user?.password
            }
        });
    } catch (error) {
        console.log('Error [UPDATE_USER]', error)
        throw error;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error('Почта не подтверждена');
            }

            throw new Error('Пользователь уже существует');
        }

        const createdUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
            },
        });

        await sendEmail(createdUser.email, 'Aldiyar / Подтверждение аккаунта', VerificationUserTemplate({ code, userName: createdUser.fullName }))
    } catch (error) {
        console.log('Error [CREATE_USER]', error)
        throw error;
    }
}