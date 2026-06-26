import { Bookmark } from 'lucide-react'

interface SavedItemsProps {
  itemsCount?: number // Allows you to pass data later if needed
}

export default function SavedItems({ itemsCount = 0 }: SavedItemsProps) {
  return (
    <section className="mt-5 w-full space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-2 px-1">
        <Bookmark className="h-5 w-5 fill-none stroke-[2.5] text-cyan-400" />
        <h2 className="text-lg font-bold text-foreground">Saved Items</h2>
      </div>

      {/* Content Container */}
      {itemsCount === 0 ? (
        /* Empty State View */
        <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-border bg-card shadow-sm px-6 py-10 text-center">
          {/* Inner Icon Circle */}
          <div className="mb-5 flex h-22 w-22 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground">
            <Bookmark className="h-10 w-10 stroke-2" />
          </div>

          {/* Messaging */}
          <h3 className="text-base font-medium text-foreground">
            You haven&apos;t saved any summaries yet
          </h3>
          <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
            Star your favorite summaries to find them easily
          </p>
        </div>
      ) : (
        /* Render list mapping here when you have data */
        <div className="grid gap-3">{/* Saved item cards go here */}</div>
      )}
    </section>
  )
}
