import { Button } from '@/components/ui/button'

export default function DangerZone() {
  return (
    <div className="mt-8 mb-5 w-full">
      <div className="rounded-3xl border border-red-900/50 bg-secondary p-8 shadow-xl">
        {/* Section Header */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-red-500">Danger Zone</h3>
          <p className="text-sm text-slate-400">
            Irreversible actions that affect your account
          </p>
        </div>

        {/* Delete Account Action Row */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-medium text-slate-100">
              Delete Account
            </h4>
            <p className="text-sm text-slate-500">
              Permanently delete your account and all associated data
            </p>
          </div>

          <Button
            variant="destructive"
            className="h-12 shrink-0 cursor-pointer rounded-xl border border-red-500 bg-red-500/70! px-8 font-semibold text-white shadow-red-500/20 transition-all hover:bg-red-500 hover:shadow-lg"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
