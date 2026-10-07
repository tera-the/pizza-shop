'use client';

import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input, Skeleton } from '../ui/index';

type Item = FilterChecboxProps;

interface CheckboxFiltersGroupProps {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    className?: string;
    loading?: boolean;
    selected?: Set<string>;
    name?: string;
    useOrdering?: boolean;
}

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupProps> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Поиск...',
    className,
    loading,
    selected,
    onClickCheckbox,
    defaultValue,
    name,
    useOrdering = false }) => {

    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollPositionRef = useRef(0);

    const baseList = defaultItems || items;

    const handleCheckboxChange = (value: string) => {
        if (scrollContainerRef.current) {
            scrollPositionRef.current = scrollContainerRef.current.scrollTop;
        }
        onClickCheckbox?.(value);
    };

    const sortBySelected = useCallback(
        (arr: Item[]) => {
            if (!selected || selected.size === 0) return arr;
            return [...arr].sort((a, b) => {
                const aSel = selected.has(a.value);
                const bSel = selected.has(b.value);
                return aSel === bSel ? 0 : aSel ? -1 : 1;
            });
        },
        [selected]
    );

    const sortedItems = useMemo(() => sortBySelected(items), [items, sortBySelected]);

    const sortedBase = useMemo(() => sortBySelected(baseList), [baseList, sortBySelected]);

    const list = useMemo(() => {
        if (showAll) {
            const source = useOrdering ? sortedItems : items;
            return source.filter((item) =>
                item.text.toLowerCase().includes(searchValue.toLowerCase())
            );
        }
        const source = useOrdering ? sortedBase : baseList;
        return source.slice(0, limit);
    }, [showAll, useOrdering, sortedItems, items, searchValue, sortedBase, baseList, limit]);

    useLayoutEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollPositionRef.current;
        }
    }, [list]);

    if (loading) {
        return (
            <div className={className}>
                <p className='font-bold mb-3'>{title}</p>

                {...Array(limit).fill(0).map((_, index) => (
                    <Skeleton key={index} className='h-6 rounded-[8px] mb-4 ' />
                ))}

                <Skeleton className='h-6 rounded-[8px] mb-4 w-28' />
            </div>
        )
    }

    return (
        <div className={className}>
            <p className='font-bold mb-3'>{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} className='bg-gray-50 border-none' />
                </div>
            )}

            <div ref={scrollContainerRef} className={`flex flex-col gap-4 max-h-96 pr-2 scrollbar ${showAll && "overflow-auto"}`}>

                {list.map((item) => (
                    <FilterCheckbox
                        key={item.value}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        onCheckedChange={() => handleCheckboxChange(item.value)}
                        checked={selected?.has(item.value)}
                        name={name}
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