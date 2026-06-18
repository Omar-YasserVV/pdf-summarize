"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Mail, Lock, Sparkles, FileText, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useLoginMutation } from '@/hooks/useAuth'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const loginMutation = useLoginMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    loginMutation.mutate({ email, password })
  }

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
            <div className="relative mt-5">
              <div className="flex h-25! w-75! flex-col items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={1000}
                  height={1000}
                  className="object-contain"
                />
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

            {/* Error Message */}
            {loginMutation.isError && (
              <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
                {loginMutation.error.message || 'Invalid email or password. Please try again.'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    required
                    disabled={loginMutation.isPending}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="h-12 border-slate-800 bg-[#0f172a] pl-10 text-slate-200 focus:border-cyan-500 focus:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    required
                    disabled={loginMutation.isPending}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="h-12 border-slate-800 bg-[#0f172a] pl-10 text-slate-200 focus:border-cyan-500 focus:ring-0"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(checked) => setRemember(!!checked)}
                    disabled={loginMutation.isPending}
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

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="h-12 w-full rounded-xl bg-cyan-400 font-bold text-slate-900 hover:bg-cyan-500 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loginMutation.isPending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"></span>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-cyan-500 hover:underline">
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
            src="/background.jpg" // Use a high-quality desk/office photo
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

