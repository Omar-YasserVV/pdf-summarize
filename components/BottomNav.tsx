'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, History, Bookmark, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BottomNav() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/history', label: 'History', icon: History },
    { href: '/notifications', label: 'Saved', icon: Bookmark },
    { href: '/profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-slate-800 bg-secondary pt-3 pb-6 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-around px-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center gap-1 transition-all duration-300',
                isActive
                  ? 'text-sky-400'
                  : 'text-slate-500 hover:text-slate-300'
              )}
            >
              <div className="relative">
                <link.icon
                  className={cn(
                    'h-6 w-6',
                    isActive && 'drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                  )}
                />
                {/* Underglow Effect for active icon */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_12px_2px_rgba(56,189,248,0.6)]" />
                )}
              </div>
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
