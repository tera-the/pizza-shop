'use client';

const defaultItems = [
    { text: 'Сырный соус', value: 'sauce-cheese' },
    { text: 'Томатный соус', value: 'sauce-tomato' },
    { text: 'Моцарелла', value: 'cheese-mozzarella' },
    { text: 'Пепперони', value: 'meat-pepperoni' },
    { text: 'Острый халапеньо', value: 'veg-jalapeno' },
];

const items = [
    // --- СОУСЫ ---
    { text: 'Сырный соус', value: 'sauce-cheese' },
    { text: 'Фирменный томатный', value: 'sauce-tomato' },
    { text: 'Чесночный соус', value: 'sauce-garlic' },
    { text: 'Соус Барбекю', value: 'sauce-bbq' },
    { text: 'Ранч', value: 'sauce-ranch' },
    { text: 'Острый соус Шрирача', value: 'sauce-sriracha' },
    { text: 'Кисло-сладкий соус', value: 'sauce-sweet-sour' },

    // --- СЫРЫ ---
    { text: 'Моцарелла', value: 'cheese-mozzarella' },
    { text: 'Сыр Пармезан', value: 'cheese-parmesan' },
    { text: 'Сыр Чеддер', value: 'cheese-cheddar' },
    { text: 'Сыр с плесенью (Блю Чиз)', value: 'cheese-blue' },

    // --- МЯСО И ПТИЦА ---
    { text: 'Пепперони', value: 'meat-pepperoni' },
    { text: 'Острая говядина', value: 'meat-beef' },
    { text: 'Ветчина', value: 'meat-ham' },
    { text: 'Сочная куриная грудка', value: 'meat-chicken' },
    { text: 'Пикантная колбаса', value: 'meat-sausage' },
    { text: 'Бекон', value: 'meat-bacon' },

    { text: 'Свежие шампиньоны', value: 'veg-mushrooms' },
    { text: 'Сладкий перец', value: 'veg-bell-pepper' },
    { text: 'Красный лук', value: 'veg-red-onion' },
    { text: 'Маслины', value: 'veg-olives' },
    { text: 'Сочные томаты', value: 'veg-tomatoes' },
    { text: 'Острый халапеньо', value: 'veg-jalapeno' },
    { text: 'Маринованные огурчики', value: 'veg-pickles' },
    { text: 'Ананасы', value: 'veg-pineapple' },
];

import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';

interface FiltersProps {
    className?: string
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {
    return (
        <div className={className}>
            <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

            {/* Верхние чекбоксы */}
            <div className='flex flex-col gap-4'>
                <FilterCheckbox text="Можно собирать" value="1" />
                <FilterCheckbox text="Новинки" value="2" />
            </div>

            {/* Фильтр цен */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        value={String(555)}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={1000}
                        placeholder="1000"
                        value={String(555)}
                    />
                </div>

                <RangeSlider
                    min={1000}
                    max={5000}
                    step={10}
                // value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
                // onValueChange={updatePrices}
                />
            </div>

            {/* Фильтр ингредиентов */}
            <CheckboxFiltersGroup
                title='Ингредиенты'
                className='mt-5'
                limit={6}
                defaultItems={defaultItems}
                items={items}
            />
        </div>
    );
};