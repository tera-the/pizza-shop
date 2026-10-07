import { create } from "zustand";
import { Api } from "../services/api-client";
import { CartStateItem, getCartDetails } from "@/lib";
import { CreateCartItemValues } from "../services/dto/cart.dto";

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    // Получение товаров из корзины
    fetchCartItems: () => Promise<void>;

    // Обновление кол-ва
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;

    // Запрос на добавление товара в корзину    
    addCartItem: (values: any) => Promise<void>;

    // Запрос на удаление товара из корзины
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    loading: false,
    error: false,
    totalAmount: 0,
    items: [],

    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.getCart();
            set(getCartDetails(data))
        } catch (error) {
            console.log(error);
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },

    updateItemQuantity: async (id, quantity) => {
        try {
            set((state) => ({
                error: false,
                items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item))
            }));
            const data = await Api.cart.updateItemQuantity(id, quantity);
            set(getCartDetails(data))
        } catch (error) {
            console.log(error);
            set({ error: true })
        } finally {
            set((state) => ({
                error: false,
                items: state.items.map((item) => ({ ...item, disabled: false }))
            }));
        }
    },

    addCartItem: async (values) => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.addCartItem(values);
            set(getCartDetails(data))

        } catch (error) {
            console.log(error);
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },

    removeCartItem: async (id) => {
        try {
            set((state) => ({
                loading: true,
                error: false,
                items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item))
            }));
            const data = await Api.cart.removeCartItem(id);
            set(getCartDetails(data))
        } catch (error) {
            console.log(error);
            set({ error: true })
        } finally {
            set((state) => ({
                loading: true,
                error: false,
                items: state.items.map((item) => ({ ...item, disabled: false }))
            }));
        }
    },
}));