import { Package, Percent, TrainTrack, ArrowRight } from 'lucide-react';
import { CheckoutItemDetails } from '../checkout-item-details';
import { WhiteBlock } from '../white-block';
import { useCart } from '@/shared/hooks';
import { Button, Skeleton } from '../../ui';

interface CheckoutSidebarProps {
    className?: string;
    totalAmount: number;
    loading?: boolean;
}

export const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({ className, loading, totalAmount }) => {
    const TAX_RATE = Number(process.env.NEXT_PUBLIC_TAX_RATE ?? 0.1);
    const DELIVERY_RATE = Number(process.env.NEXT_PUBLIC_DELIVERY_RATE ?? 0.1);

    const taxes = Math.round(totalAmount * TAX_RATE);
    const delivery = totalAmount ? Math.round(totalAmount * DELIVERY_RATE) : 0;
    const total = totalAmount + taxes + delivery;

    return (
        <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                {
                    loading ? <Skeleton className='h-11 w-48 rounded-[4px]' /> : <span className="h-11 text-[34px] font-extrabold">{total} ₸</span>
                }

                <CheckoutItemDetails
                    title={
                        <div className="flex items-center">
                            <Package size={18} className="mr-2 text-gray-400" />
                            Стоимость корзины:
                        </div>
                    }
                    value={loading ? <Skeleton className='h-6 w-14 rounded-[4px]' /> : `${totalAmount} ₸`}
                />

                <CheckoutItemDetails
                    title={
                        <div className="flex items-center">
                            <Percent size={18} className="mr-2 text-gray-400" />
                            Налоги (10%):
                        </div>
                    }
                    value={loading ? <Skeleton className='h-6 w-14 rounded-[4px]' /> : `${taxes} ₸`}
                />

                <CheckoutItemDetails
                    title={
                        <div className="flex items-center">
                            <TrainTrack size={18} className="mr-2 text-gray-400" />
                            Доставка (10%):
                        </div>
                    }
                    value={loading ? <Skeleton className='h-6 w-14 rounded-[4px]' /> : `${delivery} ₸`}
                />

                <Button
                    type="submit"
                    className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                </Button>
            </div>
        </WhiteBlock>
    );
};