'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardFileUploadZone() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        ['.pptx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 25 * 1024 * 1024, // 25MB
    maxFiles: 5,
  })

  return (
    <div className="mx-auto w-full rounded-3xl border border-slate-800 bg-[#1e2336] p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-100">
          Upload Documents
        </h2>
        <p className="text-sm text-slate-400">
          Upload PDF, Word, PowerPoint, or image files to get started
        </p>
      </div>

      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all ${
          isDragActive
            ? 'border-cyan-400 bg-cyan-400/5'
            : 'border-slate-700 bg-[#161b2c] hover:bg-[#1c223a]'
        }`}
      >
        <input {...getInputProps()} />

        {/* Upload Icon Circle */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/50">
          <Upload className="h-8 w-8 text-cyan-400" />
        </div>

        {/* Text Content */}
        <div className="space-y-2 text-center">
          <p className="text-lg font-medium text-slate-200">
            Drop your files here
          </p>
          <p className="text-sm text-slate-400">
            or click to browse from your computer
          </p>
        </div>

        {/* Choose Files Button */}
        <Button
          className="mt-6 cursor-pointer rounded-xl bg-cyan-400 px-8 font-semibold text-slate-900 hover:bg-cyan-500"
          onClick={(e) => {
            e.stopPropagation()
            open()
          }}
        >
          Choose Files
        </Button>

        {/* Footer Info */}
        <div className="mt-8 space-y-1 text-center">
          <p className="text-[12px] text-slate-500">
            Supported formats: PDF, Word, PowerPoint, Images (JPG, PNG)
          </p>
          <p className="text-[12px] text-slate-500">
            Maximum file size: 25 MB • Up to 5 files at once
          </p>
        </div>
      </div>
    </div>
  )
}
