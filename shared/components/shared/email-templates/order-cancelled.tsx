import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import * as React from 'react';

interface OrderCancelledTemplateProps {
    orderId: number;
}

export function OrderCancelledTemplate({ orderId }: OrderCancelledTemplateProps) {
    return (
        <div>
            <h1>Заказ отменён {':('}</h1>

            <p>Ваш заказ #{orderId} был отменен.. Но всегда ждём вас в магазине опять!</p>
        </div>
    );
}