"use client"

import React, { useState } from "react"
import { Settings2, Sparkles } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

const focusAreas = [
  "Key Points",
  "Methodology",
  "Results",
  "Conclusions",
  "Background",
  "Statistics",
]

export default function DashboardSummarySettings() {
  const [length, setLength] = useState([50]) // 0=Short, 50=Medium, 100=Long
  const [selectedFocus, setSelectedFocus] = useState("Key Points")

  return (
    <div className="w-full rounded-3xl border border-slate-800 bg-[#1e2336] p-6 text-slate-200">
      {/* Header */}
      <div className="mb-1 flex items-center gap-2">
        <Settings2 className="h-5 w-5 text-cyan-400" />
        <h2 className="text-lg font-semibold text-slate-100">
          Summary Settings
        </h2>
      </div>
      <p className="mb-8 text-sm text-slate-400">
        Customize how your document is summarized
      </p>

      {/* Summary Length Section */}
      <div className="mb-8 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Summary Length</span>
          <Badge className="border-none bg-cyan-400/20 px-3 text-cyan-400 hover:bg-cyan-400/30">
            {length[0] <= 33 ? "Short" : length[0] <= 66 ? "Medium" : "Long"}
          </Badge>
        </div>

        <Slider
          value={length}
          onValueChange={setLength}
          max={100}
          step={50}
          className="py-4"
        />

        <div className="flex justify-between text-[11px] font-bold tracking-wider text-slate-500 uppercase">
          <span>Short</span>
          <span>Medium</span>
          <span>Long</span>
        </div>

        {/* Card Selectors */}
        <div className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Short", desc: "1-2 paragraphs", val: 0 },
            { label: "Medium", desc: "3-5 paragraphs", val: 50 },
            { label: "Long", desc: "5+ paragraphs", val: 100 },
          ].map((item) => (
            <div
              key={item.label}
              onClick={() => setLength([item.val])}
              className={`cursor-pointer rounded-xl border p-3 transition-all ${
                length[0] === item.val
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "border-slate-800 bg-[#161b2c] text-slate-500"
              }`}
            >
              <p className="text-xs font-bold">{item.label}</p>
              <p className="text-[10px] leading-tight opacity-70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Areas */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-medium">Focus Areas (Optional)</h3>
        <div className="flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <Badge
              key={area}
              variant="outline"
              onClick={() => setSelectedFocus(area)}
              className={`cursor-pointer rounded-full border-slate-700 px-4 py-1 transition-colors ${
                selectedFocus === area
                  ? "border-cyan-400 bg-cyan-400 text-slate-900"
                  : "bg-slate-800/40 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {area}
            </Badge>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className="mb-8 space-y-4">
        <h3 className="text-sm font-medium">Additional Options</h3>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="bullets"
            className="border-slate-600 data-[state=checked]:bg-cyan-500"
          />
          <label
            htmlFor="bullets"
            className="cursor-pointer text-sm text-slate-400"
          >
            Include bullet-point key takeaways
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="conclusion"
            className="border-slate-600 data-[state=checked]:bg-cyan-500"
          />
          <label
            htmlFor="conclusion"
            className="cursor-pointer text-sm text-slate-400"
          >
            Include conclusion section
          </label>
        </div>
      </div>

      {/* Action Button */}
      <Button className="mb-4 h-12 w-full rounded-xl bg-[#1a6b7e] font-semibold text-white hover:bg-[#155a6a]">
        <Sparkles className="mr-2 h-4 w-4" />
        Generate AI Summary
      </Button>

      <p className="text-center text-xs font-medium text-orange-500/80">
        Please upload a document first
      </p>
    </div>
  )
}
