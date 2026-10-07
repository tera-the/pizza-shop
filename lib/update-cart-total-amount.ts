import { prisma } from "@/prisma/prisma-client"
import { calcCartItemPrice } from "./calc-cart-item-price"

const cartIncludeItems = {
    items: {
        orderBy: { createdAt: 'desc' as const },
        include: {
            productItem: {
                include: {
                    product: true
                }
            },
            ingredients: true
        }
    }
};

export const updateCartTotalAmount = async (token: string) => {
    const userCart = await prisma.cart.findFirst({
        where: { token },
        include: cartIncludeItems
    })

    if (!userCart) {
        return;
    }

    const totalAmount = userCart.items.reduce((acc: number, item) => {
        return acc + calcCartItemPrice(item)
    }, 0)

    await prisma.cart.update({
        where: { id: userCart.id },
        data: { totalAmount }
    })

    return { ...userCart, totalAmount }
}