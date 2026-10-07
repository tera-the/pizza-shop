import { Header } from "@/shared/components/shared"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Pizza | Корзина',
}

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen bg-[#F4F1EE]">
            <Header hasSearch={false} hasCart={false} className="border-b-gray-300 py-5"/>
            {children}
        </main>
    )
}
