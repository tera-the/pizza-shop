'use client';

import { ProductWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ProductForm } from "../product-form";


interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'p-0 bg-white overflow-hidden min-h-[600px] max-w-[1100px] w-full',
                    className,
                )}>

                <ProductForm product={product} onSubmit={() => router.back()} />

            </DialogContent>
        </Dialog>
    );
};