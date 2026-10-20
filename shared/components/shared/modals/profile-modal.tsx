'use client';

import { getProfile } from '@/app/actions';
import { cn } from '@/lib';
import { Dialog, DialogContent } from '@/shared/components/ui';
import { useEffect, useState } from 'react';
import { ProfileError } from '../profile-error';
import { ProfileForm } from '../profile-form';
import { ProfileLoader } from '../profile-loader';
import { Profile } from './auth-modals/forms/schemas';

interface ProfileModalProps {
    className?: string;
    isOpened: boolean;
    onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ className, isOpened, onClose }) => {
    const [profile, setProfile] = useState<Profile>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpened) return;

        setLoading(true)
        getProfile()
            .then(setProfile)
            .finally(() => setLoading(false))
    }, [isOpened])

    return (
        <Dialog open={isOpened} onOpenChange={(open) => !open && onClose()}>
            <DialogContent
                className={cn('p-0 bg-white overflow-hidden max-w-[800px] h-[600px] w-full', className)}
            >
                {loading ?
                    <ProfileLoader />
                    : !profile ? (
                        <ProfileError className='h-full' onClose={onClose} />
                    ) : (
                        <ProfileForm data={profile} className='h-full' />
                    )}
            </DialogContent>
        </Dialog>
    );
};