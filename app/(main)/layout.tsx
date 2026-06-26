import BottomNav from '@/components/BottomNav'
import FloatingAIButton from '@/components/FloatingAIButton'
import Navbar from '@/components/Navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <FloatingAIButton />
      <main className="container mx-auto mb-18">{children}</main>
      <BottomNav />
    </>
  )
}
