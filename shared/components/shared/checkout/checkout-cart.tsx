import { CartStateItem, getCartItemDetails } from '@/lib';
import { PizzaType, PizzaSize } from '@/shared/constants/pizza';
import React from 'react';
import { CheckoutItem } from '../checkout-item';
import { WhiteBlock } from '../white-block';
import { Skeleton } from '../../ui';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';

interface CheckoutCartProps {
    className?: string;
    items: CartStateItem[];
    onClickUpdateQuantity: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    removeCartItem: (id: number) => void;
    loading?: boolean;
}

export const CheckoutCart: React.FC<CheckoutCartProps> = ({ loading, className, items, onClickUpdateQuantity, removeCartItem }) => {
    return (
        <WhiteBlock title="1. Корзина">
            <div className="flex flex-col gap-7">
                {
                    loading && [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
                }


                {!loading && items.map((item) => (
                    <CheckoutItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        quantity={item.quantity}
                        details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                        price={item.price}
                        onClickRemove={() => removeCartItem(item.id)}
                        disabled={item.disabled}
                        onClickCountButton={type => onClickUpdateQuantity(item.id, item.quantity, type)}
                    />
                ))}
            </div>
        </WhiteBlock>
    );
};