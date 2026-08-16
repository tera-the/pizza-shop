import { Ingredient } from "@/lib/generated/prisma/client"
import { Api } from "@/services/api-client";
import { useEffect, useState } from "react"

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true)
                const response = await Api.ingredients.getAll()
                setIngredients(response);
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchIngredients();
    }, [])

    return { ingredients, loading };
}
