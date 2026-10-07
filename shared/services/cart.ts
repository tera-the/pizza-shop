import { Ingredient } from "@/lib/generated/prisma/client";
import { ApiRoutes } from "./constants";
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";
import { $api } from "./instance";

export const getCart = async (): Promise<CartDTO> => {
    const { data } = await $api.get<CartDTO>(ApiRoutes.CART)
    return data;
}

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    const { data } = await $api.patch<CartDTO>(ApiRoutes.CART + `/${itemId}`, { quantity })
    return data;
}

export const removeCartItem = async (itemId: number): Promise<CartDTO> => {
    const { data } = await $api.delete<CartDTO>(ApiRoutes.CART + `/${itemId}`)
    return data;
}

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    const { data } = await $api.post<CartDTO>(ApiRoutes.CART, values)
    return data;
}