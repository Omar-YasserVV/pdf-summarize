import Image from 'next/image'
import Link from 'next/link'
import { User, Mail, Lock, ArrowLeft, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignUp() {
  return (
    <div className="flex min-h-screen w-full bg-[#0a0f1e]">
      {/* Left Column: Registration Form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-6">
          {/* Logo Section */}
          <div className="flex flex-col items-center text-center">
            <div className="relative my-5">
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
            <h2 className="font-medium text-slate-200">Create your account</h2>
            <p className="mt-1 text-sm text-slate-500">
              Start summarizing documents with AI
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-8 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-100">Sign Up</h3>
              <p className="text-xs text-slate-400">
                Create a new account to get started
              </p>
            </div>

            <form className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs text-slate-400">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="h-11 border-slate-800 bg-[#0f172a] pl-10 text-sm text-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs text-slate-400">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    className="h-11 border-slate-800 bg-[#0f172a] pl-10 text-sm text-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs text-slate-400">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••"
                    className="h-11 border-slate-800 bg-[#0f172a] pl-10 text-sm text-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm" className="text-xs text-slate-400">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="••••••"
                    className="h-11 border-slate-800 bg-[#0f172a] pl-10 text-sm text-slate-200"
                  />
                </div>
              </div>

              <div className="py-2">
                <p className="text-[11px] leading-relaxed text-slate-400">
                  I agree to the{' '}
                  <Link href="#" className="text-cyan-500 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-cyan-500 hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              <Button className="h-11 w-full rounded-xl bg-cyan-400 font-bold text-slate-900 hover:bg-cyan-500">
                Create Account
              </Button>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="h-11 w-full cursor-pointer text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
            </form>
          </div>

          {/* Bottom Alert */}
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <p className="text-center text-[11px] text-cyan-400">
              No credit card required. Access all features and upgrade anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Social Proof Showcase */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 z-0 bg-[#0d8ca1]/90">
          <Image
            src="/background.jpg"
            alt="User reading"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col items-start justify-center p-20 text-white">
          <div className="max-w-md space-y-8">
            <h1 className="text-5xl leading-tight font-bold">
              Join thousands of users
            </h1>
            <p className="text-lg leading-relaxed text-white/90">
              Save hours of reading time with AI-powered document summarization.
              Perfect for students, researchers, and professionals.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 pt-10">
              <div className="space-y-1">
                <div className="text-3xl font-bold">100K+</div>
                <div className="text-[10px] font-medium tracking-wider text-white/70 uppercase">
                  Documents processed
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-[10px] font-medium tracking-wider text-white/70 uppercase">
                  Active users
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-3xl font-bold">
                  4.9 <Star className="ml-1 h-5 w-5 fill-white" />
                </div>
                <div className="text-[10px] font-medium tracking-wider text-white/70 uppercase">
                  User rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
