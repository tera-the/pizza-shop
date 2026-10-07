import { Ingredient, ProductItem } from '@/lib/generated/prisma/client';
import { cn } from '@/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';

interface ChooseProductFormProps {
    imageUrl: string;
    name: string;
    items: ProductItem[];
    loading?: boolean;
    onSubmit: () => void;
    className?: string;
    price: number;
}

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({ name,
    items,
    imageUrl,
    loading,
    onSubmit,
    className,
    price
}) => {

    return (
        <div className={cn(className, 'flex flex-1 ')}>

            <div className={'flex items-center justify-center flex-1 relative w-full'}>
                <img
                    src={imageUrl}
                    className={'relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'}
                />
            </div>

            <div className='w-[490px] bg-[#f7f6f5] p-7 flex flex-col justify-between'>
                <Title text={name} size='md' className='font-extrabold' />

                <Button
                    loading={loading}
                    onClick={() => onSubmit?.()}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {price} ₽
                </Button>
            </div>
        </div>
    );
};