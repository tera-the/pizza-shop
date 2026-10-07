'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import React from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface ProductFormProps {
    product: ProductWithRelations;
    onSubmit?: () => void;
    className?: string
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit: _onSubmit, className }) => {
    const addCartItem = useCartStore(state => state.addCartItem);
    const loading = useCartStore(state => state.loading);
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(product.items[0].pizzaType);


    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;

            await addCartItem({
                productItemId: itemId,
                ingredients
            });

            toast.success(`${product.name} добавлен(-а) в корзину`)

            _onSubmit?.();
        } catch (error) {
            console.log(error);
            toast.error('Не удалось добавить пиццу в корзину')
        }
    }


    if (isPizzaForm) {
        return <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onSubmit}
            loading={loading}
        />
    } else {
        return <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            onSubmit={onSubmit}
            price={firstItem.price}
            loading={loading}
        />
    }
};