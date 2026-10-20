'use client';

import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Container } from './container';
import { AuthModal, CartButton, ProfileButton } from './index';
import { SearchInput } from './search-input';
import { ProfileModal } from './modals/profile-modal';
import { SearchParamsToast } from './search-params-toast';

interface HeaderProps {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string
}

export const Header: React.FC<HeaderProps> = ({ className, hasSearch = true, hasCart = true }) => {
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [openProfileModal, setOpenProfileModal] = useState(false);

    return (
        <header className={cn('border border-b', className)}>

            <Suspense fallback={null}>
                <SearchParamsToast />
            </Suspense>

            <Container className='flex items-center justify-between py-8'>

                {/* Левая часть */}
                <Link href='/'>
                    <div className='flex items-center gap-4'>
                        <Image src={"/logo.png"} alt='Logo' width={35} height={35} />
                        <div suppressHydrationWarning>
                            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                            <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>

                {hasSearch && (
                    <div className='mx-10 flex-1'>
                        <SearchInput />
                    </div>
                )}

                {/* Правая часть */}
                <div className="flex items-center gap-3">
                    <AuthModal isOpened={openAuthModal} onClose={() => setOpenAuthModal(false)} />

                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} onClickProfile={() => setOpenProfileModal(true)} />

                    <ProfileModal isOpened={openProfileModal} onClose={() => setOpenProfileModal(false)} />

                    {hasCart && (
                        <CartButton />
                    )}
                </div>

            </Container>
        </header >
    );
};