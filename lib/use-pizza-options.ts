'use client';

import { Variant } from "@/shared/components/shared/group-variants";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { ProductItem } from "./generated/prisma/client";
import { getAvailablePizzaSizes } from "./get-available-pizza-sizes";

interface ReturnProps {
    size: PizzaSize,
    type: PizzaType,
    setSize: (size: PizzaSize) => void;
    setType: (size: PizzaType) => void;
    selectedIngredients: Set<number>;
    editIngredients: (id: number) => void;
    availableSizes: Variant[];
    currentItemId?: number;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(30);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, { toggle: editIngredients }] = useSet(new Set<number>([]));

    const availableSizes = getAvailablePizzaSizes(type, items);

    const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

    useEffect(() => {
        const isAvailableSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled);
        const availableSize = availableSizes?.find((item) => !item.disabled);

        if (availableSize && !isAvailableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type, availableSizes, size, setSize]);

    return {
        size,
        type,
        selectedIngredients,
        setSize,
        setType,
        editIngredients,
        availableSizes,
        currentItemId
    }
}