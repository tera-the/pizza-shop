import { cn } from '@/lib/utils';
import { title } from 'process';
import React, { ReactNode } from 'react';

interface CheckoutItemDetailsProps {
    className?: string;
    value?: ReactNode;
    title?: ReactNode;
}

export const CheckoutItemDetails: React.FC<CheckoutItemDetailsProps> = ({ className, value, title }) => {
    return (
        <div className={cn('flex my-4', className)}>
            <span className="flex flex-1 text-lg text-neutral-500">
                {title}
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>

            <span className="font-bold text-lg">{value}</span>
        </div>
    );
};