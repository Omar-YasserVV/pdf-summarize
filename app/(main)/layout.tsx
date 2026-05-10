import BottomNav from '@/components/BottomNav'
import Navbar from '@/components/Navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mb-18">{children}</main>
      <BottomNav />
    </>
  )
}
