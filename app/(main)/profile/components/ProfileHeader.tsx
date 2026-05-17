'use client'

import { Settings } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { user } from '@/constants/user'

export default function ProfileHeader() {
  return (
    <div className="flex w-full justify-between bg-transparent py-3">
      {/* Left Side: Profile info wrapper */}
      <div className="flex items-center gap-4">
        {/* Dynamic Gradient Avatar */}
        <Avatar className="h-20 w-20 border-0 select-none">
          <AvatarFallback className="bg-linear-to-tr from-sky-400 to-blue-600 text-xl font-bold text-white">
            {user.username.slice(0, 1)}
          </AvatarFallback>
        </Avatar>

        {/* Identity Metadata Stack */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl leading-none font-medium tracking-tight text-white">
            {user.username.split(' ')[0]}
          </h2>
          <p className="text-sm leading-none text-slate-300">{user.email}</p>

          {/* Subscription Tier Badge */}
          <div className="mt-1 self-start rounded-full bg-primary/15 px-2.5 py-0.5 text-[12px] font-medium tracking-wide text-primary">
            Free Plan
          </div>
        </div>
      </div>

      {/* Right Side: Options Core Control Trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="h-11 w-11 cursor-pointer rounded-xl border border-slate-800/80 bg-[#0f1323] text-slate-400 transition-all hover:bg-slate-900 hover:text-white"
      >
        <Settings className="h-6! w-6!" />
      </Button>
    </div>
  )
}
