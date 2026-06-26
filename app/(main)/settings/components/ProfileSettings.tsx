import { User as UserIcon, Mail, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/store/useAuthStore'

export default function ProfileSettings() {
  const storeUser = useAuthStore((state) => state.user)
  const user = storeUser || { name: 'Guest', email: '', role: 'User' }

  return (
    <div className="w-full space-y-6">
      {/* Main Content Card */}
      <div className="space-y-6 rounded-3xl border border-border bg-card p-8">
        {/* Header Section */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Profile Information
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Update your account profile information
          </p>
        </div>

        {/* Photo Upload Section */}
        <div className="flex items-center gap-6">
          <div className="space-y-3">
            <Button
              variant="outline"
              className="border-border bg-background text-slate-700 dark:text-slate-200 hover:bg-muted"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
            <p className="text-xs text-slate-505 dark:text-slate-500">
              JPG, PNG or GIF. Max size 2MB.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-700 dark:text-slate-300">
              Full Name
            </Label>
            <div className="relative">
              <UserIcon className="absolute top-4 left-3 h-4 w-4 text-slate-500" />
              <Input
                id="fullName"
                defaultValue={user.name || ''}
                className="h-12 border-border bg-background pl-10 text-foreground focus:border-cyan-500 focus:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
              Email Address
            </Label>
            <div className="relative flex">
              <Mail className="absolute top-4 left-3 h-4 w-4 text-slate-500" />
              <Input
                id="email"
                defaultValue={user.email || ''}
                className="h-12 border-border bg-background pl-10 text-foreground focus:border-cyan-500 focus:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Account Status Info Box */}
        <div className="space-y-4 rounded-2xl border border-border bg-secondary p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-550 dark:text-slate-400">
              Account Role
            </span>
            <Badge
              variant="secondary"
              className="border-none bg-muted text-muted-foreground capitalize"
            >
              {user.role || 'Basic'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-550 dark:text-slate-400">
              Subscription Status
            </span>
            <Badge className="border-none bg-cyan-500/20 px-4 text-cyan-400">
              Trial
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-555 dark:text-slate-400">
              Member Since
            </span>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
              June 18, 2026
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div>
          <Button className="h-12 cursor-pointer rounded-xl bg-cyan-400 px-8 font-bold text-slate-900 hover:bg-cyan-500">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
