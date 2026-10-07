import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Pizza | Корзина',
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      DASHBOARD HEADER
      <body>{children}</body>
    </html>
  )
}
