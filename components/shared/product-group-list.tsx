'use client';

import React, { useEffect, useRef } from 'react';
import { Title } from './title';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';

interface ProductGroupListProps {
    className?: string
    title: string;
    items: any[];
    listClassName?: string;
    categoryId: number;
}

export const ProductGroupList: React.FC<ProductGroupListProps> = ({
    className,
    title,
    items,
    listClassName,
    categoryId
}) => {

    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

    const intersectionRef = useRef<HTMLDivElement>(null);

    const intersection = useIntersection(intersectionRef as React.RefObject<HTMLDivElement>, {
        threshold: 0.4,
    });

    useEffect(() => {

        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId)
        }

    }, [categoryId, intersection?.isIntersecting, title])

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size='lg' className='font-extrabold mb-5' />

            <div className={cn('grid grid-cols-3 gap-12', listClassName)}>
                {items.map((product, i) => (
                    <ProductCard
                        key={i}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        // ingredients={product.ingredients}
                        price={product.items[0].price}
                    />
                ))}
            </div>
        </div>
    );
};