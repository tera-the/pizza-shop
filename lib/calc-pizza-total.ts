import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "./generated/prisma/client";

/**
 * Функция для подсчета общей стоимости пиццы
    
 * @example calcPizzaTotal(selectedIngredients, items, type, size, ingredients);
 * @param selectedIngredients - тип теста выбранн 
 * @param items - список вариации
 * @param type - тесто пиццы
 * @param size - размер пиццы
 * @param ingredients - цена за ингредиенты
 * 
 * @returns {number} общую стоимость
 */
export const calcPizzaTotal = (selectedIngredients: Set<number>, items: ProductItem[], type: PizzaType, size: PizzaSize, ingredients: Ingredient[]) => {
    const pizzaPrice = items.find(i => i.pizzaType === type && i.size === size)?.price || 0;

    const totalIngredientsPrice = ingredients
        .filter((i) => selectedIngredients.has(i.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);

    return pizzaPrice + totalIngredientsPrice;
}