import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

function SettingsProfileTaps() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="flex h-13! w-full items-center gap-1 rounded-full border border-slate-800 bg-[#1e293b] p-1">
        <TabsTrigger
          value="profile"
          className="flex-1 cursor-pointer rounded-full px-4 py-3 text-base font-medium text-slate-400 transition-all data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100 max-md:text-xs md:text-lg"
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="flex-1 cursor-pointer rounded-full px-4 py-3 text-base font-medium text-slate-400 transition-all hover:text-slate-200 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100 max-md:text-xs md:text-lg"
        >
          Security
        </TabsTrigger>
        <TabsTrigger
          value="billing"
          className="flex-1 cursor-pointer rounded-full px-4 py-3 text-base font-medium text-slate-400 transition-all hover:text-slate-200 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100 max-md:text-xs md:text-lg"
        >
          Billing
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="flex-1 cursor-pointer rounded-full px-4 py-3 text-base font-medium text-slate-400 transition-all hover:text-slate-200 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100 max-md:text-xs md:text-lg"
        >
          Notifications
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default SettingsProfileTaps
