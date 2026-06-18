"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Mail, Lock, ArrowLeft, Key, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} from '@/hooks/useAuth'

export default function ForgotPassword() {
  const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [validationError, setValidationError] = useState<string | null>(null)
  const [resendSuccess, setResendSuccess] = useState(false)

  const forgotPasswordMutation = useForgotPasswordMutation()
  const verifyOtpMutation = useVerifyOtpMutation()
  const resetPasswordMutation = useResetPasswordMutation()

  // Support direct link password reset via query params (e.g. /forgot-password?email=...&token=...)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const emailParam = params.get('email')
      const tokenParam = params.get('token')
      if (emailParam && tokenParam) {
        setEmail(emailParam)
        setToken(tokenParam)
        setStep(3)
      }
    }
  }, [])

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)
    if (!email) {
      setValidationError('Please enter your email address.')
      return
    }

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setStep(2)
        },
      }
    )
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)
    if (!token) {
      setValidationError('Please enter the verification code.')
      return
    }

    verifyOtpMutation.mutate(
      { email, token },
      {
        onSuccess: () => {
          setStep(3)
        },
      }
    )
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)

    if (!newPassword || !confirmPassword) {
      setValidationError('Please fill in all fields.')
      return
    }

    if (newPassword !== confirmPassword) {
      setValidationError('Passwords do not match.')
      return
    }

    if (newPassword.length < 6) {
      setValidationError('Password must be at least 6 characters long.')
      return
    }

    resetPasswordMutation.mutate(
      { email, token, newPassword },
      {
        onSuccess: () => {
          setStep(4)
        },
      }
    )
  }

  const handleResendCode = () => {
    setResendSuccess(false)
    setValidationError(null)
    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setResendSuccess(true)
          setTimeout(() => setResendSuccess(false), 5000)
        },
      }
    )
  }

  // Get loading and error states based on current step
  const getStates = () => {
    switch (step) {
      case 1:
        return {
          isLoading: forgotPasswordMutation.isPending,
          error: forgotPasswordMutation.isError ? forgotPasswordMutation.error.message : null,
        }
      case 2:
        return {
          isLoading: verifyOtpMutation.isPending,
          error: verifyOtpMutation.isError ? verifyOtpMutation.error.message : null,
        }
      case 3:
        return {
          isLoading: resetPasswordMutation.isPending,
          error: resetPasswordMutation.isError ? resetPasswordMutation.error.message : null,
        }
      default:
        return { isLoading: false, error: null }
    }
  }

  const { isLoading, error } = getStates()
  const displayError = validationError || error

  return (
    <div className="flex min-h-screen w-full bg-[#0a0f1e]">
      {/* Left Column: Password Recovery Form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center text-center">
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
            <h2 className="font-medium text-slate-200 mt-2">Password Recovery</h2>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-8 shadow-2xl">
            {/* Visual Header depending on step */}
            {step === 1 && (
              <div className="mb-6 space-y-1">
                <h3 className="text-xl font-semibold text-slate-100">Forgot Password</h3>
                <p className="text-sm text-slate-400">
                  Enter your email to receive a password reset code
                </p>
              </div>
            )}
            {step === 2 && (
              <div className="mb-6 space-y-1">
                <h3 className="text-xl font-semibold text-slate-100">Verify Reset Code</h3>
                <p className="text-sm text-slate-400">
                  Enter the verification code sent to <strong className="text-cyan-400">{email}</strong>
                </p>
              </div>
            )}
            {step === 3 && (
              <div className="mb-6 space-y-1">
                <h3 className="text-xl font-semibold text-slate-100">Reset Password</h3>
                <p className="text-sm text-slate-400">
                  Choose a secure new password for your account
                </p>
              </div>
            )}

            {/* Error Message */}
            {displayError && (
              <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
                {displayError}
              </div>
            )}

            {/* Success message during resend */}
            {resendSuccess && (
              <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-400">
                Verification code resent successfully!
              </div>
            )}

            {/* STEP 1: Email Form */}
            {step === 1 && (
              <form onSubmit={handleSendCode} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      required
                      disabled={isLoading}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="h-12 border-slate-800 bg-[#0f172a] pl-10 text-slate-200 focus:border-cyan-500 focus:ring-0"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-xl bg-cyan-400 font-bold text-slate-900 hover:bg-cyan-500 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"></span>
                      Sending Code...
                    </>
                  ) : (
                    'Send Reset Code'
                  )}
                </Button>

                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    type="button"
                    disabled={isLoading}
                    className="h-12 w-full cursor-pointer text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 mt-2"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </Link>
              </form>
            )}

            {/* STEP 2: Verify OTP Form */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="token" className="text-slate-300">
                    Verification Code
                  </Label>
                  <div className="relative">
                    <Key className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="token"
                      type="text"
                      required
                      disabled={isLoading}
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Enter verification code"
                      className="h-12 border-slate-800 bg-[#0f172a] pl-10 text-slate-200 focus:border-cyan-500 focus:ring-0 tracking-widest text-center text-lg font-bold"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-xl bg-cyan-400 font-bold text-slate-900 hover:bg-cyan-500 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"></span>
                      Verifying...
                    </>
                  ) : (
                    'Verify Code'
                  )}
                </Button>

                <div className="flex flex-col gap-2 mt-2">
                  <Button
                    variant="ghost"
                    type="button"
                    disabled={isLoading || forgotPasswordMutation.isPending}
                    onClick={handleResendCode}
                    className="h-12 w-full cursor-pointer text-cyan-400 hover:bg-slate-800/50 hover:text-cyan-300"
                  >
                    {forgotPasswordMutation.isPending ? 'Resending...' : 'Resend Code'}
                  </Button>

                  <Button
                    variant="ghost"
                    type="button"
                    disabled={isLoading}
                    onClick={() => setStep(1)}
                    className="h-12 w-full cursor-pointer text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Change Email
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 3: Reset Password Form */}
            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-slate-300">
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="newPassword"
                      type="password"
                      required
                      disabled={isLoading}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••"
                      className="h-12 border-slate-800 bg-[#0f172a] pl-10 text-slate-200 focus:border-cyan-500 focus:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-300">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      disabled={isLoading}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••"
                      className="h-12 border-slate-800 bg-[#0f172a] pl-10 text-slate-200 focus:border-cyan-500 focus:ring-0"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-xl bg-cyan-400 font-bold text-slate-900 hover:bg-cyan-500 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"></span>
                      Resetting Password...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>
            )}

            {/* STEP 4: Success Screen */}
            {step === 4 && (
              <div className="flex flex-col items-center text-center py-4 space-y-6">
                <div className="rounded-full bg-emerald-500/10 p-4 border border-emerald-500/20 text-emerald-400 animate-bounce">
                  <CheckCircle2 className="h-16 w-16" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-100">Password Reset Complete</h3>
                  <p className="text-sm text-slate-400 max-w-sm">
                    Your password has been successfully updated. You can now use your new password to sign in.
                  </p>
                </div>

                <Link href="/sign-in" className="w-full">
                  <Button className="h-12 w-full rounded-xl bg-cyan-400 font-bold text-slate-900 hover:bg-cyan-500 cursor-pointer">
                    Go to Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Information Showcase */}
      <div className="relative hidden w-1/2 lg:block">
        {/* Background Image with Cyan Overlay */}
        <div className="absolute inset-0 z-0 bg-[#0d8ca1]/80">
          <Image
            src="/background.jpg"
            alt="Workspace"
            fill
            className="object-cover opacity-50 mix-blend-overlay"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex h-full flex-col items-start justify-center p-16 text-white">
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl leading-tight font-bold">
              Secure Document Analyzer
            </h1>
            <p className="text-lg text-white/80">
              Recover your password securely. EL Kholasa uses state-of-the-art encryption standard procedures to protect your documents and identity.
            </p>

            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-2">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="font-medium">Secure OTP verification</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-2">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="font-medium">Encrypted password reset</span>
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
