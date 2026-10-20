import { useSession } from 'next-auth/react';
import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';

interface ProfileButtonProps {
    onClickSignIn?: () => void;
    onClickProfile?: () => void;
    className?: string
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ className, onClickSignIn, onClickProfile }) => {
    const { data: session } = useSession()


    return (
        <div className={className}>
            {
                !session ? (
                    <Button onClick={onClickSignIn} variant='outline' className='flex items-center gap-1'>
                        <User size={16} />
                        Войти
                    </Button>
                )
                    : (
                        <Button onClick={onClickProfile} variant='secondary' className='flex items-center gap-1'>
                            <CircleUser size={16} />
                            Профиль
                        </Button>
                    )
            }
        </div>
    );
};