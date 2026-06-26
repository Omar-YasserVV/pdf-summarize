import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface SettingsProfileTapsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

function SettingsProfileTaps({ activeTab, onTabChange }: SettingsProfileTapsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="flex h-13! w-full items-center gap-1 rounded-full border border-border bg-card p-1">
        <TabsTrigger
          value="profile"
          className="flex-1 cursor-pointer rounded-full px-4 py-3 text-base font-medium text-muted-foreground transition-all data-[state=active]:bg-secondary data-[state=active]:text-foreground max-md:text-xs md:text-lg"
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="flex-1 cursor-pointer rounded-full px-4 py-3 text-base font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:bg-secondary data-[state=active]:text-foreground max-md:text-xs md:text-lg"
        >
          Security
        </TabsTrigger>
        <TabsTrigger
          value="billing"
          className="flex-1 cursor-pointer rounded-full px-4 py-3 text-base font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:bg-secondary data-[state=active]:text-foreground max-md:text-xs md:text-lg"
        >
          Billing
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="flex-1 cursor-pointer rounded-full px-4 py-3 text-base font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:bg-secondary data-[state=active]:text-foreground max-md:text-xs md:text-lg"
        >
          Notifications
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default SettingsProfileTaps
