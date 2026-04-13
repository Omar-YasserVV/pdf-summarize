import { User, Mail, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import SettingsProfileTaps from './SettingsProfileTaps'
import { user } from '@/constants/user'

export default function ProfileSettings() {
  return (
    <div className="w-full space-y-6">
      {/* Navigation Tabs */}
      <SettingsProfileTaps />

      {/* Main Content Card */}
      <div className="space-y-6 rounded-3xl border border-slate-800 bg-[#161b2c] p-8">
        {/* Header Section */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-100">
            Profile Information
          </h2>
          <p className="text-sm text-slate-400">
            Update your account profile information
          </p>
        </div>

        {/* Photo Upload Section */}
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-slate-800">
            <AvatarImage src="" />
            <AvatarFallback className="bg-slate-800 text-2xl font-bold text-slate-400">
              {user.username.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="border-slate-700 bg-[#1c223a] text-slate-200 hover:bg-slate-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
            <p className="text-xs text-slate-500">
              JPG, PNG or GIF. Max size 2MB.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-300">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute top-4 left-3 h-4 w-4 text-slate-500" />
              <Input
                id="fullName"
                defaultValue="mohammed hassan"
                className="h-12 border-slate-800 bg-[#0f172a] pl-10 text-slate-200 focus:border-cyan-500 focus:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email Address
            </Label>
            <div className="relative flex">
              <Mail className="absolute top-4 left-3 h-4 w-4 text-slate-500" />
              <Input
                id="email"
                defaultValue="mohammedhassan@gmail.com"
                className="h-12 border-slate-800 bg-[#0f172a] pl-10 text-slate-200 focus:border-cyan-500 focus:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Account Status Info Box */}
        <div className="space-y-4 rounded-2xl border border-slate-800/50 bg-[#1e293b] p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">
              Account Role
            </span>
            <Badge
              variant="secondary"
              className="border-none bg-slate-800 text-slate-400"
            >
              Basic
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">
              Subscription Status
            </span>
            <Badge className="border-none bg-cyan-500/20 px-4 text-cyan-400">
              trial
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">
              Member Since
            </span>
            <span className="text-sm font-medium text-slate-200">
              February 6, 2026
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
