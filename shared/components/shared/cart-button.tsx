'use client';

import React from 'react';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';

interface CartButtonProps {
    className?: string
}

export const CartButton: React.FC<CartButtonProps> = ({ className }) => {
    const [totalAmount, items, loading] = useCartStore(
        useShallow((state) => [state.totalAmount, state.items, state.loading])
    );

    return (
        <CartDrawer>
            <div>
                <Button loading={loading} className={cn('group relative', { 'w-[105px]': loading }, className)}>
                    <b>{totalAmount} ₸</b>
                    <span className='h-full w-[2px] bg-white/30 mx-3'></span>
                    <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
                        <ShoppingCart size={16} className='relative' strokeWidth={2} />
                        <b>{items.length}</b>
                    </div>
                    <ArrowRight
                        size={20}
                        className="absolute right-5 transition duration-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-.5"
                    />
                </Button>
            </div>
        </CartDrawer>
    );
};