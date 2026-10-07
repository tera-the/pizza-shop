import { useEffect } from "react";
import { useCartStore } from "../store";
import { CartStateItem } from "@/lib";
import { CreateCartItemValues } from "../services/dto/cart.dto";

type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    addCartItem: (values: CreateCartItemValues) => void;
    onClickUpdateQuantity: (id: number, quantity: number, type: 'plus' | 'minus') => void;
};

export const useCart = (): ReturnProps => {
    const cartState = useCartStore((state => state));

    useEffect(() => {
        cartState.fetchCartItems();
    }, []);


    const onClickUpdateQuantity = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newValue = type === 'plus' ? quantity + 1 : quantity - 1;
        cartState.updateItemQuantity(id, newValue);
    }

    return { ...cartState, onClickUpdateQuantity };
};