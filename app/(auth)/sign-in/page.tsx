import Image from 'next/image'
import Link from 'next/link'
import { Mail, Lock, Sparkles, FileText, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export default function SignIn() {
  return (
    <div className="flex min-h-screen w-full bg-[#0a0f1e]">
      {/* Left Column: Login Form */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-2 text-xs font-medium tracking-widest text-slate-500 uppercase">
              Welcome back
            </div>
            <div className="relative h-24 w-48">
              {/* Replace with your actual logo asset */}
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="text-3xl font-bold text-cyan-400">
                  EL KHOLASA
                </div>
                <div className="text-[10px] text-slate-400">
                  SIP THE KNOWLEDGE . SKIP THE PAGES
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-8 shadow-2xl">
            <div className="mb-6 space-y-1">
              <h2 className="text-xl font-semibold text-slate-100">Sign In</h2>
              <p className="text-sm text-slate-400">
                Enter your credentials to access your account
              </p>
            </div>

            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    className="h-12 border-slate-800 bg-[#0f172a] pl-10 text-slate-200 focus:border-cyan-500 focus:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" dir="rtl" className="text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••"
                    className="h-12 border-slate-800 bg-[#0f172a] pl-10 text-slate-200 focus:border-cyan-500 focus:ring-0"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    className="border-slate-700 data-[state=checked]:bg-cyan-500"
                  />
                  <label
                    htmlFor="remember"
                    className="cursor-pointer text-sm text-slate-400"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-cyan-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button className="h-12 w-full rounded-xl bg-cyan-400 font-bold text-slate-900 hover:bg-cyan-500">
                Sign In
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Don't have an account?{' '}
              <Link href="#" className="text-cyan-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Feature Showcase */}
      <div className="relative hidden w-1/2 lg:block">
        {/* Background Image with Cyan Overlay */}
        <div className="absolute inset-0 z-0 bg-[#0d8ca1]/80">
          <Image
            src="/workspace-bg.jpg" // Use a high-quality desk/office photo
            alt="Workspace"
            fill
            className="object-cover opacity-50 mix-blend-overlay"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex h-full flex-col items-start justify-center p-16 text-white">
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl leading-tight font-bold">
              Summarize Documents with AI
            </h1>
            <p className="text-lg text-white/80">
              Transform lengthy documents into concise summaries in seconds.
              Upload PDFs, Word docs, PowerPoint presentations, and more.
            </p>

            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-2">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="font-medium">AI-powered summaries</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-2">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="font-medium">
                  Support for multiple file formats
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-2">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="font-medium">Interactive AI chatbot</span>
              </li>
            </ul>
          </div>

          {/* Bottom Branding Bar */}
          <div className="absolute right-16 bottom-8 left-16 h-1 rounded-full bg-cyan-300/50" />
        </div>
      </div>
    </div>
  )
}
