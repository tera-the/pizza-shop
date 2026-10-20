import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

interface SearchParamsToastProps {
    className?: string
}

export const SearchParamsToast: React.FC<SearchParamsToastProps> = ({ className }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('paid')) {
            toastMessage = 'Спасибо за покупку! Информация отправлена на почту'
        } else if (searchParams.has('verified')) {
            toastMessage = 'Аккаунт успешно подтвержден!'
        }

        if (toastMessage) {
            toast.success(toastMessage)
            router.replace('/')
        }
    }, [searchParams, router])
    return null;
};