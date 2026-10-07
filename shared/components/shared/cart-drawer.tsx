'use client';

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getCartItemDetails, getItemsWord, } from '@/lib';
import { cn } from '@/lib/utils';
import empty_box from '@/public/empty-box.png';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { useCart } from '@/shared/hooks';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { Button } from '../ui';
import { CartDrawerItem } from './cart-drawer-item';
import { Title } from './title';


export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { items, removeCartItem, totalAmount, onClickUpdateQuantity, updateItemQuantity } = useCart();


    const SheetTriggerWithAsChild = SheetTrigger as React.ComponentType<React.PropsWithChildren<{ asChild?: boolean }>>;

    return (
        <Sheet>
            <SheetTriggerWithAsChild asChild>{children}</SheetTriggerWithAsChild>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
                    {totalAmount > 0 && (
                        <SheetHeader>
                            <SheetTitle>
                                В корзине <span className='font-bold'>
                                    {items.length} {getItemsWord(items.length)}
                                </span>
                            </SheetTitle>
                        </SheetHeader>
                    )}

                    {/* Empty State */}

                    {!totalAmount && (
                        <div className="flex flex-col items-center justify-center mx-auto">
                            <Image src={empty_box} alt='Empty cart' width={120} height={120} />
                            <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
                            <p className="text-center text-neutral-500 mb-5">
                                Добавьте хотя бы одну пиццу, чтобы совершить заказ
                            </p>

                            <SheetClose>
                                <Button className="w-56 h-12 text-base" size="lg">
                                    <ArrowLeft className="w-5 mr-2" />
                                    Вернуться назад
                                </Button>
                            </SheetClose>
                        </div>
                    )}


                    {/* Items */}

                    {totalAmount > 0 && (
                        <Fragment>
                            <div className='mt-5 overflow-auto scrollbar flex-1'>

                                {
                                    items.map((item) => (
                                        <div className='mb-2' key={item.id}>
                                            <CartDrawerItem
                                                id={item.id}
                                                name={item.name}
                                                imageUrl={item.imageUrl}
                                                quantity={item.quantity}
                                                details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                                                price={item.price}
                                                onUpdateQuantity={type => onClickUpdateQuantity(item.id, item.quantity, type)}
                                                onClickRemove={() => removeCartItem(item.id)}
                                                disabled={item.disabled}
                                            />
                                        </div>
                                    ))
                                }

                            </div>

                            <SheetFooter className='-my-6 bg-white p-8'>
                                <div className="w-full">
                                    <div className="flex mb-4">
                                        <span className="flex flex-1 text-lg text-neutral-500">
                                            Итого
                                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                        </span>

                                        <span className="font-bold text-lg">{totalAmount} ₽</span>
                                    </div>

                                    <Link href="/checkout">
                                        <Button
                                            // onClick={() => setRedirecting(true)}
                                            // loading={redirecting}
                                            type="submit"
                                            className="w-full h-12 text-base">
                                            Оформить заказ
                                            <ArrowRight className="w-5 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </SheetFooter>
                        </Fragment>
                    )}


                </div>
            </SheetContent>
        </Sheet >
    );
};