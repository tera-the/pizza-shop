'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui';

type Suggestion = { id: string; text: string; lat?: number; lon?: number };

const API_KEY = process.env.NEXT_PUBLIC_TWOGIS_API_KEY ?? '';

export const AddressInput: React.FC<{ name?: string, onChange?: () => void }> = ({ name = 'address', onChange }) => {
    const {
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const value: string = watch(name) ?? '';
    const [items, setItems] = useState<Suggestion[]>([]);
    const [open, setOpen] = useState(false);
    const skipNext = useRef(false);
    const errorText = errors[name]?.message as string | undefined;

    useEffect(() => {
        if (skipNext.current) {
            skipNext.current = false;
            return;
        }
        if (value.trim().length < 3) {
            setItems([]);
            return;
        }

        const controller = new AbortController();
        const timer = setTimeout(async () => {
            try {
                const url = new URL('https://catalog.api.2gis.com/3.0/suggests');
                url.searchParams.set('q', value);
                url.searchParams.set('suggest_type', 'address');
                url.searchParams.set('fields', 'items.point,items.address');
                url.searchParams.set('sort_point', '69.59,42.32');
                url.searchParams.set('key', API_KEY);

                const res = await fetch(url, { signal: controller.signal });
                const data = await res.json();

                setItems(
                    (data?.result?.items ?? []).map((i: any) => ({
                        id: i.id,
                        text: i.full_name ?? i.address_name ?? i.name,
                        lat: i.point?.lat,
                        lon: i.point?.lon,
                    })),
                );
                setOpen(true);
            } catch {
                /* отмена или ошибка сети: просто без подсказок */
            }
        }, 300);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [value]);

    const select = (item: Suggestion) => {
        skipNext.current = true;
        setValue(name, item.text, { shouldValidate: true });
        setOpen(false);
    };

    return (
        <div className="relative">
            <Input
                className="h-14 text-md pl-5"
                placeholder="Адрес доставки"
                autoComplete="off"
                value={value}
                onChange={onChange}
                onFocus={() => items.length && setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
            />

            {open && items.length > 0 && (
                <ul className="absolute z-20 mt-1 w-full rounded-md border bg-white shadow-lg max-h-64 overflow-auto">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            onMouseDown={() => select(item)}
                            className="cursor-pointer px-4 py-3 text-sm hover:bg-gray-100"
                        >
                            {item.text}
                        </li>
                    ))}
                </ul>
            )}

            {errorText && <p className="mt-2 text-sm pl-3 text-red-500">{errorText}</p>}
        </div>
    );
};