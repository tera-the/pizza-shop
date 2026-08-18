'use client';

import { Dialog } from "@/components/ui";
import { DialogContent } from "@/components/ui/dialog";
import { Product } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Title } from "../title";


interface Props {
    product: Product;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();

    const onOpenChange = (open: boolean) => {
        if (!open) {
            router.back();
        }
    };

    return (
        <Dialog open={true} onOpenChange={onOpenChange}>
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}>
                <Title text={product.name} />
            </DialogContent>
        </Dialog>
    );
};