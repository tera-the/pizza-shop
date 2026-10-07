import { Ingredient } from "@/lib/generated/prisma/client"
import { $api } from "./instance"
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Ingredient[]> => {
    const { data } = await $api.get<Ingredient[]>(ApiRoutes.INGREDIENTS)

    return data;
}