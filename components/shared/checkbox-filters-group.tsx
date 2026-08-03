'use client';

import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/index';

type Item = FilterChecboxProps;

interface CheckboxFiltersGroupProps {
    title: string;
    items: Item[];
    defaultItems: Item[];
    limit: number;
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
    className?: string
}

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupProps> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Поиск...',
    className,
    onChange,
    defaultValue }) => {

    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue)) : defaultItems.slice(0, limit)

    return (
        <div className={className}>
            <p className='font-bold mb-3'>{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} className='bg-gray-50 border-none' />
                </div>
            )}

            <div className={`flex flex-col gap-4 max-h-96 pr-2 scrollbar ${showAll && "overflow-auto"}`}>

                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        onCheckedChange={(ids) => console.log(ids)}
                        checked={false}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={'border-t border-t-neutral-100 mt-6'}>
                    <button onClick={() => setShowAll(!showAll)} className='text-primary mt-5 cursor-pointer'>
                        {showAll ? '- Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};