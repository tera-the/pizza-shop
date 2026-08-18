import { Product } from "@/lib/generated/prisma/client"
import { $api } from "./instance"
import { ApiRoutes } from "./constants";

export const search = async (query: string): Promise<Product[]> => {
    const { data } = await $api.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } })

    return data;
}