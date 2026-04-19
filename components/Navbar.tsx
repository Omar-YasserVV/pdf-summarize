'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  CreditCard,
  Settings,
  MessageSquare,
  Sun,
  HelpCircle,
  Bell,
  Menu,
  Home,
  X,
  Send,
  Bot,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { user } from '@/constants/user'
import { cn } from '@/lib/utils'

/** --- AI CHAT MODAL COMPONENT --- **/
function AIChatModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-125 w-87.5 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#38bdf8] p-4 text-white">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-white/20 p-1.5">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm leading-none font-semibold">AI Assistant</h3>
            <p className="mt-1 text-[11px] opacity-90">Ready to help</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="transition-opacity hover:opacity-70"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-white p-4">
        <div className="flex items-start space-x-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#38bdf8] text-white">
            <Bot className="h-5 w-5" />
          </div>
          <div className="relative max-w-[85%] rounded-2xl rounded-tl-none bg-[#1e293b] p-3 text-xs leading-relaxed text-slate-200 shadow-sm">
            <p>
              Hello! I&apos;m your AI assistant. Upload a document and I&apos;ll
              help you understand its content!
            </p>
            <span className="mt-2 block text-[10px] text-slate-500">
              02:35 PM
            </span>
          </div>
        </div>
      </div>

      {/* Footer / Input Area */}
      <div className="border-t border-slate-100 p-4">
        <div className="relative flex items-center gap-2">
          <Input
            placeholder="Ask a question..."
            className="h-10 border-none bg-slate-100 pr-10 text-sm ring-offset-transparent focus-visible:ring-0"
          />
          <Button
            size="icon"
            className="h-8 w-8 shrink-0 rounded-lg bg-[#99f1ff] text-[#0891b2] hover:bg-[#99f1ff]/80"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-[10px] font-medium text-orange-500">
          Upload a document to start chatting
        </p>
      </div>
    </div>
  )
}

/** --- MAIN NAVBAR COMPONENT --- **/
export default function Navbar() {
  const pathname = usePathname()
  const [isAiOpen, setIsAiOpen] = useState(false)

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/subscription', label: 'Subscription', icon: CreditCard },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0f172a]/95 px-4 py-3 text-slate-300 backdrop-blur md:px-6">
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
              className="border-slate-800 bg-[#0f172a] text-slate-300"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-slate-200">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center rounded-md p-3 transition-colors',
                      pathname === link.href
                        ? 'bg-slate-800 text-blue-400'
                        : 'hover:bg-slate-800'
                    )}
                  >
                    <link.icon className="mr-3 h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
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
                      ? 'bg-[#1e3a5f] text-[#6fbce5] hover:bg-[#1e3a5f]/80'
                      : 'hover:bg-slate-800 hover:text-white'
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
          {/* AI Assistant Popover */}
          <Popover open={isAiOpen} onOpenChange={setIsAiOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'cursor-pointer border-slate-700 bg-slate-800/30 px-2 transition-all md:px-4',
                  isAiOpen
                    ? 'border-cyan-500/50 bg-cyan-500/20 text-cyan-400'
                    : 'hover:bg-slate-800 hover:text-white'
                )}
              >
                <MessageSquare className="h-4 w-4 md:mr-2" />
                <span className="hidden sm:inline">AI Assistant</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="end"
              className="w-auto border-none bg-transparent p-0 shadow-none"
              sideOffset={16}
            >
              <AIChatModal onClose={() => setIsAiOpen(false)} />
            </PopoverContent>
          </Popover>

          {/* Utility Icons */}
          <div className="flex items-center space-x-1 text-slate-400">
            <Button
              variant="ghost"
              size="icon"
              className="xs:flex hidden cursor-pointer hover:text-white"
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
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-[#0f172a] bg-red-500"></span>
            </div>
          </div>

          {/* User Profile */}
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
