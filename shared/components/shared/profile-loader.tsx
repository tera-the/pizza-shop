// shared/components/shared/profile-loader.tsx
import React from 'react';
import { cn } from '@/lib';

export const ProfileLoader: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('flex h-full w-full flex-col items-center justify-center gap-6', className)}>
        <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full border-4 border-primary/15" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
            <div className="absolute inset-3 animate-pulse rounded-full bg-primary/10" />
        </div>

        <p className="animate-pulse text-sm font-medium text-gray-400">Загружаем профиль...</p>
    </div>
);