import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function TextInputSection() {
  return (
    <div className="w-full space-y-2 p-6 text-slate-200">
      {/* Input Label */}
      <Label
        htmlFor="text-input"
        className="text-sm font-semibold tracking-wide text-slate-200"
      >
        Paste or type your text
      </Label>

      {/* Main Textarea Field */}
      <Textarea
        id="text-input"
        placeholder="Enter the text you want to summarize..."
        className="min-h-[160px] resize-none border-slate-800 bg-secondary! px-4 py-3 text-slate-300 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-slate-700"
      />

      {/* Helper / Info Banner Box */}
      <div className="flex h-12 items-center rounded-md border border-slate-800/60 bg-secondary! px-4 text-xs text-slate-400 sm:text-sm">
        You can paste text from any source. Minimum 100 words recommended for
        best results.
      </div>
    </div>
  )
}
