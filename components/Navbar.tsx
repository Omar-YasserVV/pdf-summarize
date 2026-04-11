import {
  LayoutDashboard,
  CreditCard,
  Settings,
  MessageSquare,
  Sun,
  HelpCircle,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-slate-800 bg-[#0a1224] px-6 py-3 text-slate-300">
      {/* Left Section: Navigation Links */}
      <div className="flex items-center space-x-2">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="bg-slate-800/50 text-blue-400 hover:bg-slate-800 hover:text-blue-300"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>

        <Link href="/subscription">
          <Button
            variant="ghost"
            className="hover:bg-slate-800 hover:text-white"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Subscription
          </Button>
        </Link>

        <Link href="/settings">
          <Button
            variant="ghost"
            className="hover:bg-slate-800 hover:text-white"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center space-x-4">
        {/* AI Assistant Button */}
        <Button
          variant="outline"
          className="border-slate-700 bg-slate-800/30 hover:bg-slate-800 hover:text-white"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          AI Assistant
        </Button>

        {/* Utility Icons */}
        <div className="flex items-center space-x-1 text-slate-400">
          <Button variant="ghost" size="icon" className="hover:text-white">
            <Sun className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-white">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" className="hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            {/* Notification Dot */}
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-[#0a1224] bg-red-500"></span>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center space-x-3 border-l border-slate-800 pl-4">
          <Avatar className="h-9 w-9 border border-blue-500/50">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-cyan-500 text-white">
              M
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start leading-none">
            <span className="text-sm font-medium text-slate-200">
              mohammedhossam@gmail.com
            </span>
            <span className="text-[11px] text-slate-500">
              mohammedhossam@gmail.com
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
