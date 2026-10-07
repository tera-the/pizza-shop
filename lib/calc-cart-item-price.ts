import { CartItemDTO } from "@/shared/services/dto/cart.dto";

export const calcCartItemPrice = (item: CartItemDTO) => {
    const ingredientsPrice = item.ingredients.reduce((acc, ing) => acc + ing.price, 0);
    return (item.productItem.price + ingredientsPrice) * item.quantity;
}