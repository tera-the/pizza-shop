'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import React from 'react';

interface CategoriesProps {
    className?: string
}

const cats = [
    { id: 1, name: 'Пиццы' },
    { id: 2, name: 'Комбо' },
    { id: 3, name: 'Закуски' },
    { id: 4, name: 'Коктейли' },
    { id: 5, name: 'Кофе' },
];

export const Categories: React.FC<CategoriesProps> = ({ className }) => {
    const categoryActiveID = useCategoryStore((state) => state.activeId);


    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl mt-4', className)}>
            {cats.map(({ name, id }, index) => (
                <a href={`/#${name}`} key={index} className={cn('flex items-center font-bold h-11 rounded-2xl px-5 ', categoryActiveID === index + 1 && 'bg-white shadow-md shadow-gray-200 text-primary')}>
                    <button className='cursor-pointer hover:text-primary'>{name}</button>
                </a>
            ))}
        </div>
    );
};