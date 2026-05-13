import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FloatingAIButton() {
  return (
    <Link
      href="/ai" // Change this to your actual AI page route
      className={cn(
        'fixed right-6 bottom-24 z-50 flex h-14 w-14 items-center justify-center rounded-full',
        'bg-[#38bdf8] text-white transition-all duration-300',
        'shadow-[0_0_20px_rgba(56,189,248,0.6)]', // The specific glow from the photo
        'hover:scale-110 hover:bg-[#7dd3fc] active:scale-95',
        'md:right-10 md:bottom-28' // Adjusts position on larger screens
      )}
    >
      <MessageCircle className="h-7 w-7 fill-none stroke-[2.5]" />

      {/* Subtle outer pulse effect */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-sky-400/30 duration-2000" />
    </Link>
  )
}
