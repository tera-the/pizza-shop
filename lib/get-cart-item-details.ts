import { mapPizzaType, PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Ingredient } from "./generated/prisma/client";
import { CartStateItem } from "./get-cart-details";


export const getCartItemDetails = (
    ingredients: CartStateItem['ingredients'],
    pizzaType?: PizzaType | null,
    pizzaSize?: PizzaSize | null,
) => {
    const details = [];

    if (pizzaType && pizzaSize) {
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName}, ${pizzaSize}см`)
    }

    if (ingredients?.length) {
        details.push(...ingredients.map((i) => i.name))
    }

    return details.join(`, `);
}