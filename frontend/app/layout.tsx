import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"

export const metadata = {
  title: 'TimeSeller - 경험 마켓플레이스',
  description: '경험을 1:1로 거래하는 프리미엄 마켓플레이스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
} 