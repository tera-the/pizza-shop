import React from 'react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { cn } from '@/lib/utils';
import * as CartItem from './cart-item-details'
import { getCartItemDetails } from '@/lib';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';

interface CartDrawerItemProps extends CartItemProps {
    onUpdateQuantity?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
    className?: string;
}

export const CartDrawerItem: React.FC<CartDrawerItemProps> = ({ className,
    id,
    imageUrl,
    details,
    name,
    price,
    quantity,
    disabled,
    onUpdateQuantity,
    onClickRemove
}) => {

    return (
        <div className={cn('flex bg-white p-5 gap-6', {
            'pointer-events-none opacity-50': disabled,
        }, className)}>
            <CartItem.Image src={imageUrl} />

            <div className='flex-1'>
                <CartItem.Info details={details} name={name} />

                <hr className='my-3' />

                <div className='flex items-center justify-between'>
                    <CountButton onClick={onUpdateQuantity} value={quantity} />

                    <div className='flex items-center gap-3'>
                        <CartItem.Price value={price} />
                        <Trash2Icon onClick={onClickRemove} className='text-gray-400 cursor-pointer hover:text-gray-600' size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};