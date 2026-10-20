import { PaymentCallbackData } from "@/@types/yookassa";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { sendEmail } from "@/lib/send-email";
import { prisma } from "@/prisma/prisma-client";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { NextRequest, NextResponse } from "next/server";
import { OrderSuccessTemplate } from "@/shared/components/shared/email-templates/order-success";
import { OrderCancelledTemplate } from "@/shared/components/shared/email-templates/order-cancelled";

export async function POST(req: NextRequest) {
    console.log("[Checkout Callback] hit");

    try {
        const body = (await req.json() as PaymentCallbackData);
        const status = body.object.status;

        if (status !== 'succeeded' && status !== 'canceled') {
            return NextResponse.json({ ok: true })
        }

        const order = await prisma.order.findUnique({
            where: {
                id: Number(body.object.metadata.order_id)
            },
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }

        if (
            order.status === OrderStatus.SUCCEEDED ||
            order.status === OrderStatus.CANCELLED
        ) {
            return NextResponse.json({ ok: true });
        }

        const isSucceeded = body.object.status === 'succeeded';

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED
            }
        });

        const items = JSON.parse(order.items as string) as CartItemDTO[];

        try {
            await sendEmail(
                order.email,
                `Aldiyar / ${isSucceeded ? "Ваш заказ успешно оформлен!" : "Заказ отменен!"}`,
                isSucceeded
                    ? OrderSuccessTemplate({ items, orderId: order.id })
                    : OrderCancelledTemplate({ orderId: order.id }),
            );
        } catch (emailError) {
            console.error("[Checkout Callback] Email error:", emailError);
        }
    } catch (error) {
        console.log('[Checkout Callback] Error:', error);

        return NextResponse.json({ error: "Server error" })
    }
}