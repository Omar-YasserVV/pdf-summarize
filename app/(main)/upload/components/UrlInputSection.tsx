import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function UrlInputSection() {
  return (
    <div className="w-full space-y-2 p-6 text-slate-200">
      {/* Input Label */}
      <Label
        htmlFor="url-input"
        className="text-sm font-semibold tracking-wide text-slate-200"
      >
        Enter URL
      </Label>

      {/* Main Input Field */}
      <Input
        id="url-input"
        type="url"
        placeholder="https://example.com/article"
        className="h-12 border-slate-800 bg-secondary! px-4 text-slate-300 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-slate-700"
      />

      {/* Helper / Info Banner Box */}
      <div className="flex h-12 items-center rounded-md border border-slate-800/60 bg-secondary! px-4 text-xs text-slate-400 sm:text-sm">
        Paste any article, blog post, or web page URL. We&apos;ll extract and
        summarize the content for you.
      </div>
    </div>
  )
}
