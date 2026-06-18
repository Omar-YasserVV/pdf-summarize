"use client";

import React, { useState } from 'react'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useChangePasswordMutation } from '@/hooks/useAuth'

export default function SecuritySettings() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const changePasswordMutation = useChangePasswordMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)
    setSuccessMessage(null)

    if (!oldPassword || !newPassword || !confirmPassword) {
      setValidationError('All fields are required.')
      return
    }

    if (newPassword !== confirmPassword) {
      setValidationError('New passwords do not match.')
      return
    }

    if (newPassword.length < 6) {
      setValidationError('New password must be at least 6 characters.')
      return
    }

    changePasswordMutation.mutate(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          setSuccessMessage('Password updated successfully.')
          setOldPassword('')
          setNewPassword('')
          setConfirmPassword('')
        },
      }
    )
  }

  const displayError =
    validationError ||
    (changePasswordMutation.isError ? changePasswordMutation.error.message : null)

  return (
    <div className="w-full space-y-6">
      <div className="space-y-6 rounded-3xl border border-slate-800 bg-[#161b2c] p-8 shadow-2xl">
        {/* Header Section */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-100">
            Security Settings
          </h2>
          <p className="text-sm text-slate-400">
            Change your password to secure your account
          </p>
        </div>

        {/* Error message */}
        {displayError && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
            {displayError}
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-400">
            {successMessage}
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="oldPassword" className="text-slate-300">
              Current Password
            </Label>
            <div className="relative">
              <Lock className="absolute top-4 left-3 h-4 w-4 text-slate-500" />
              <Input
                id="oldPassword"
                type="password"
                required
                disabled={changePasswordMutation.isPending}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••"
                className="h-12 border-slate-800 bg-[#0f172a] pl-10 text-slate-200 focus:border-cyan-500 focus:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-slate-300">
              New Password
            </Label>
            <div className="relative">
              <Lock className="absolute top-4 left-3 h-4 w-4 text-slate-500" />
              <Input
                id="newPassword"
                type="password"
                required
                disabled={changePasswordMutation.isPending}
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
              <Lock className="absolute top-4 left-3 h-4 w-4 text-slate-500" />
              <Input
                id="confirmPassword"
                type="password"
                required
                disabled={changePasswordMutation.isPending}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••"
                className="h-12 border-slate-800 bg-[#0f172a] pl-10 text-slate-200 focus:border-cyan-500 focus:ring-0"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={changePasswordMutation.isPending}
              className="h-12 cursor-pointer rounded-xl bg-cyan-400 px-8 font-bold text-slate-900 hover:bg-cyan-500 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {changePasswordMutation.isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"></span>
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
