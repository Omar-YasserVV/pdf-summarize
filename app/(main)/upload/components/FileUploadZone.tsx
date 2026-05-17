'use client'

import React, { useRef, useState } from 'react'
import { Upload } from 'lucide-react'

interface FileUploadZoneProps {
  onFileSelect?: (file: File) => void
}

export default function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  // Trigger input field programmatically on component area click
  const handleContainerClick = () => {
    fileInputRef.current?.click()
  }

  // Handle text field raw selection
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect?.(e.target.files[0])
    }
  }

  // Handle file system event frames
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  // Handle raw element drops
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect?.(e.dataTransfer.files[0])
    }
  }

  const acceptedFormats = ['PDF', 'DOCX', 'TXT', 'JPG/PNG']

  return (
    <div className="w-full space-y-4">
      {/* Hidden Native File Input Field */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
        onChange={handleInputChange}
      />

      {/* Main Drag & Drop Zone Canvas */}
      <div
        onClick={handleContainerClick}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`group flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 select-none ${
          isDragActive
            ? 'border-cyan-400 bg-cyan-500/5 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
            : 'border-slate-800/80 bg-secondary hover:border-slate-700 hover:bg-[#0e1527]'
        }`}
      >
        {/* Animated Custom Cyan Upload Box Icon Container */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition-transform group-hover:scale-105 group-active:scale-95">
          <Upload className="h-6 w-6 stroke-[2]" />
        </div>

        {/* Informative Interaction Callouts */}
        <h3 className="mt-5 text-sm font-bold text-white md:text-base">
          Tap to browse or drag file
        </h3>
        <p className="mt-1.5 text-xs font-medium text-slate-400 md:text-sm">
          Supports PDF, Word, TXT, JPG, PNG
        </p>
      </div>

      {/* Footer Meta Box Display Panel */}
      <div className="rounded-2xl border border-slate-800/80 bg-secondary p-5">
        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
          Supported Formats
        </span>

        {/* Badges Container Grid Stack */}
        <div className="mt-3 flex flex-wrap gap-2">
          {acceptedFormats.map((format) => (
            <span
              key={format}
              className="rounded-xl border border-slate-800 bg-[#0f152a] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
            >
              {format}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
