import { useEffect, useRef } from "react";
import { Filters } from "./use-filters";
import qs from 'qs';
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter();
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const params = {
            ...filters.prices,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients),
        };

        const query = qs.stringify(params, { arrayFormat: 'comma' });

        router.push(`?${query}`, { scroll: false });
    }, [
        filters.prices.priceFrom,
        filters.prices.priceTo,
        Array.from(filters.pizzaTypes).join(','),
        Array.from(filters.sizes).join(','),
        Array.from(filters.selectedIngredients).join(','),
    ]);
};