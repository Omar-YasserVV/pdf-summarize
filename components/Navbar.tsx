'use client'

import React from 'react'
import { Sun, Moon, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const user = useAuthStore((state) => state.user)
  const { resolvedTheme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 container m-auto bg-background px-4 py-5">
      <div className="flex items-center justify-between">
        {/* Left Side: Profile & Welcome */}
        <div className="flex items-center gap-3">
          {pathname === '/dashboard' ? (
            <div className="flex flex-col text-left">
              <h1 className="text-base font-bold text-foreground md:text-lg">
                Welcome back,{' '}
                <span className="capitalize">{user?.name?.split(' ')[0] || 'User'}</span>
              </h1>
              <p className="text-xs text-muted-foreground md:text-sm">
                What would you like to summarize today?
              </p>
            </div>
          ) : (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-extrabold text-lg text-primary hover:opacity-90 transition-opacity select-none"
            >
              <span className="text-xl">✨</span>
              <span>EL Kholasa</span>
            </Link>
          )}
        </div>

        {/* Right Side: Utilities */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="h-11 w-11 rounded-full border border-border bg-secondary text-slate-700 dark:text-slate-300 hover:bg-muted dark:hover:bg-slate-900! hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            {mounted && resolvedTheme === 'dark' ? (
              <Sun className="h-5! w-5!" />
            ) : (
              <Moon className="h-5! w-5!" />
            )}
          </Button>

          <div className="relative">
            <Link href="/notifications">
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 cursor-pointer rounded-lg border border-border bg-secondary text-slate-700 dark:text-slate-300 hover:bg-muted dark:hover:bg-slate-900! hover:text-slate-900 dark:hover:text-white"
              >
                <Bell className="h-6! w-6! text-slate-500 dark:text-[#94a3b8]" />
              </Button>
            </Link>
            {/* Notification Dot */}
            <span className="absolute top-1 right-1.75 h-2 w-2 rounded-full bg-sky-400 ring-2 ring-background" />
          </div>
        </div>
      </div>
    </nav>
  )
}
