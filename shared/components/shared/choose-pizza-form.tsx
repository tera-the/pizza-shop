import { calcPizzaTotal, usePizzaOptions } from '@/lib';
import { Ingredient, ProductItem } from '@/lib/generated/prisma/client';
import { cn } from '@/lib/utils';
import { mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { IngredientItem } from './index';
import { PizzaImage } from './pizza-image';
import { Title } from './title';


interface ChooseProductFormProps {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    loading?: boolean;
    onSubmit: (itemId: number, ingredients: number[]) => void;
    className?: string;
}

export const ChoosePizzaForm: React.FC<ChooseProductFormProps> = ({ name,
    items,
    imageUrl,
    ingredients,
    loading,
    onSubmit,
    className, }) => {


    const { currentItemId, size, type, selectedIngredients, availableSizes, editIngredients, setSize, setType } = usePizzaOptions(items);

    const textDetails = `${size} см, ${mapPizzaType[type].toLocaleLowerCase()} пицца`;
    const totalPrice = calcPizzaTotal(selectedIngredients, items, type, size, ingredients);


    const handleClickAdd = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients));
        }
    }

    return (
        <div className={cn(className, 'flex flex-1')}>

            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className='w-[490px] bg-[#f7f6f5] p-7'>
                <Title text={name} size='md' className='font-extrabold mb-1' />

                <p className='text-gray-400'>{textDetails}</p>

                <div className='flex flex-col gap-5 mt-5'>
                    <GroupVariants value={String(size)} onClick={v => setSize(Number(v) as PizzaSize)} items={availableSizes} />

                    <GroupVariants value={String(type)} onClick={v => setType(Number(v) as PizzaType)} items={pizzaTypes} />
                </div>

                <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
                    <div className='grid grid-cols-3 gap-3'>
                        {ingredients.map((ing) => (
                            <IngredientItem imageUrl={ing.imageUrl} price={ing.price} key={ing.id} name={ing.name} onClick={() => editIngredients(ing.id)} active={selectedIngredients.has(ing.id)}
                            />
                        ))}
                    </div>
                </div>


                <Button
                    loading={loading}
                    onClick={handleClickAdd}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};