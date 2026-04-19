'use client' // Required for usePathname

import { usePathname } from 'next/navigation'
import {
  CreditCard,
  Settings,
  MessageSquare,
  Sun,
  HelpCircle,
  Bell,
  Menu,
  Home,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { user } from '@/constants/user'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/subscription', label: 'Subscription', icon: CreditCard },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-secondary/95 px-4 py-3 text-slate-300 backdrop-blur md:px-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* --- MOBILE NAVIGATION --- */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="border-slate-800 bg-secondary text-slate-300"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-slate-200">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex items-center rounded-md p-3 transition-colors',
                        isActive
                          ? 'bg-slate-800 text-blue-400'
                          : 'hover:bg-slate-800'
                      )}
                    >
                      <link.icon className="mr-3 h-5 w-5" />
                      {link.label}
                    </Link>
                  )
                })}
                {/* Mobile Help Link */}
                <Link
                  href="/help"
                  className={cn(
                    'flex items-center rounded-md p-3 transition-colors',
                    pathname === '/help'
                      ? 'bg-slate-800 text-blue-400'
                      : 'hover:bg-slate-800'
                  )}
                >
                  <HelpCircle className="mr-3 h-5 w-5" />
                  Help Center
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden items-center space-x-2 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'cursor-pointer transition-colors',
                    isActive
                      ? 'bg-[#1e3a5f] text-[#6fbce5] hover:bg-slate-700! hover:text-blue-300'
                      : 'hover:bg-slate-800! hover:text-white'
                  )}
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            )
          })}
        </div>

        {/* --- RIGHT SECTION: Actions & Profile --- */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button
            variant="outline"
            className="cursor-pointer border-slate-700 bg-slate-800/30 px-2 hover:bg-slate-800 hover:text-white md:px-4"
          >
            <MessageSquare className="h-4 w-4 md:mr-2" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Button>

          <div className="flex items-center space-x-1 text-slate-400">
            <Button
              variant="ghost"
              size="icon"
              className="xs:flex cursor-pointer hover:text-white"
            >
              <Sun className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden cursor-pointer hover:text-white sm:flex"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer hover:text-white"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full border-2 border-secondary bg-red-500"></span>
            </div>
          </div>

          <div className="flex items-center space-x-3 border-l border-slate-800 pl-3 md:pl-4">
            <Avatar className="h-8 w-8 border border-blue-500/50 md:h-9 md:w-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-cyan-500 text-white">
                M
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-col items-start leading-none lg:flex">
              <span className="line-clamp-1 text-sm font-medium text-slate-200">
                {user.username}
              </span>
              <span className="line-clamp-1 text-[11px] text-slate-500">
                {user.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
