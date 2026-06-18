'use client'

import { Sun, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'

export default function Navbar() {
  const user = useAuthStore((state) => state.user)

  return (
    <nav className="sticky top-0 z-50 container m-auto bg-background px-4 py-5">
      <div className="flex items-center justify-between">
        {/* Left Side: Profile & Welcome */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h1 className="text-base font-bold text-white md:text-lg">
              Welcome back,{' '}
              <span className="capitalize">{user?.name?.split(' ')[0] || 'User'}</span>
            </h1>
            <p className="text-xs text-slate-400 md:text-sm">
              What would you like to summarize today?
            </p>
          </div>
        </div>

        {/* Right Side: Utilities */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-full border-gray-800 bg-[#0f1323] text-slate-300 hover:bg-slate-900! hover:text-white"
          >
            {/*161a29*/}
            <Sun className="h-5! w-5!" />
          </Button>

          <div className="relative">
            <Link href="/notifications">
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 cursor-pointer rounded-lg bg-[#0f1323] text-slate-300 hover:bg-slate-900! hover:text-white"
              >
                <Bell className="h-6! w-6! text-[#94a3b8]" />
              </Button>
            </Link>
            {/* Notification Dot */}
            <span className="absolute top-1 right-1.75 h-2 w-2 rounded-full bg-sky-400 ring-2 ring-[#020617]" />
          </div>
        </div>
      </div>
    </nav>
  )
}
