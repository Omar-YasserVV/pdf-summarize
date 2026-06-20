"use client";

import React, { useRef, useState, useEffect } from 'react'
import {
  Camera,
  RefreshCw,
  X,
  Image as ImageIcon,
  Loader2,
  Check,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CameraScannerProps {
  onCaptureComplete: (file: File) => void
  onCancel: () => void
}

export default function CameraScanner({ onCaptureComplete, onCancel }: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Capture states
  const [capturedFile, setCapturedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Start the camera stream
  const startCamera = async (mode: 'user' | 'environment') => {
    setIsLoading(true)
    setError(null)
    
    // Stop any existing tracks
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      }
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(mediaStream)
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err: any) {
      console.error('Camera access error:', err)
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError(
          'Camera permission denied. Please enable camera permissions in your browser settings to scan documents, or browse an image from your device.'
        )
      } else {
        setError(
          'Could not access your camera. Please verify it is connected and not in use by another application, or select an image from your device.'
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Effect to initialize camera on mount and when facing mode changes
  useEffect(() => {
    if (!previewUrl) {
      startCamera(facingMode)
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [facingMode, previewUrl])

  // Stop camera helper
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }

  // Toggle front/rear camera
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'))
  }

  // Capture photograph from current video frame
  const handleCapture = () => {
    if (!videoRef.current) return

    const video = videoRef.current
    const canvas = document.createElement('canvas')
    
    // Use actual dimensions of the video stream
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Apply mirroring if using front camera
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `scanned_doc_${Date.now()}.jpg`, { type: 'image/jpeg' })
          const url = URL.createObjectURL(file)
          
          setCapturedFile(file)
          setPreviewUrl(url)
          stopCamera()
        } else {
          setError('Failed to process image capture.')
        }
      },
      'image/jpeg',
      0.9
    )
  }

  // Discard preview and start camera again
  const handleRetake = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setCapturedFile(null)
    setPreviewUrl(null)
    setIsLoading(true)
  }

  // Accept previewed photo
  const handleUsePhoto = () => {
    if (capturedFile) {
      onCaptureComplete(capturedFile)
    }
  }

  // Fallback device browsing
  const triggerFileBrowser = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      onCaptureComplete(file)
    }
  }

  return (
    <div className="w-full rounded-3xl border border-slate-800 bg-[#161b2c] p-6 space-y-6 shadow-2xl overflow-hidden relative">
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 0.8; }
          100% { top: 0%; opacity: 0.8; }
        }
        .scanner-line {
          animation: scan 4s linear infinite;
        }
      `}</style>

      {/* Hidden input for local browsing fallback */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-cyan-400">
          <Camera className="h-5 w-5" />
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            {previewUrl ? 'Review Captured Document' : 'Scan Document'}
          </h4>
        </div>
        <Button
          type="button"
          onClick={onCancel}
          variant="ghost"
          className="h-8 w-8 p-0 text-slate-400 hover:bg-slate-800 hover:text-white rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Main View Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-800 bg-black flex items-center justify-center">
        {error ? (
          /* Error State UI */
          <div className="p-6 text-center space-y-4 max-w-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{error}</p>
            <div className="flex flex-col gap-2 pt-2">
              <Button
                type="button"
                onClick={triggerFileBrowser}
                className="bg-cyan-400 text-slate-900 font-bold hover:bg-cyan-500 rounded-xl text-xs py-2 px-4 cursor-pointer"
              >
                <ImageIcon className="h-4 w-4 mr-2 inline" />
                Browse Device Images
              </Button>
              <Button
                type="button"
                onClick={() => startCamera(facingMode)}
                variant="outline"
                className="border-slate-800 bg-transparent text-slate-300 hover:bg-slate-800 rounded-xl text-xs py-2 px-4"
              >
                <RefreshCw className="h-3 w-3 mr-2 inline" />
                Retry Camera
              </Button>
            </div>
          </div>
        ) : previewUrl ? (
          /* Captured Preview UI */
          <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
            <img
              src={previewUrl}
              alt="Captured Scan Preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : (
          /* Live Camera Stream UI */
          <div className="relative w-full h-full flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
                <span className="text-xs text-slate-400">Starting camera stream...</span>
              </div>
            )}
            
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
            />

            {/* Glowing Scan Rect & Laser Effect Overlay */}
            {!isLoading && (
              <>
                {/* Scanner Target Box */}
                <div className="absolute inset-8 border border-dashed border-cyan-400/30 rounded-xl pointer-events-none">
                  {/* Top Left corner */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400"></div>
                  {/* Top Right corner */}
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400"></div>
                  {/* Bottom Left corner */}
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400"></div>
                  {/* Bottom Right corner */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400"></div>
                </div>

                {/* Animated Horizontal Laser Scan Line */}
                <div className="absolute left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22d3ee] pointer-events-none scanner-line"></div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action Controls Bar */}
      <div className="flex items-center justify-between px-1">
        {previewUrl ? (
          /* Capture Review Controls */
          <>
            <Button
              type="button"
              onClick={handleRetake}
              variant="outline"
              className="border-slate-800 bg-[#0f172a] text-slate-300 hover:bg-slate-800 rounded-xl font-bold text-xs h-10 px-3 sm:px-4 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Retake</span>
            </Button>
            
            <Button
              type="button"
              onClick={handleUsePhoto}
              className="bg-cyan-400 text-slate-900 font-bold hover:bg-cyan-500 rounded-xl text-xs h-10 px-4 sm:px-6 cursor-pointer shadow-lg shadow-cyan-500/10"
            >
              <Check className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Use Photo</span>
            </Button>
          </>
        ) : (
          /* Live Stream Controls */
          <>
            <Button
              type="button"
              onClick={triggerFileBrowser}
              variant="outline"
              className="border-slate-800 bg-[#0f172a] text-slate-300 hover:bg-slate-800 rounded-xl font-bold text-xs h-10 px-3 sm:px-4 cursor-pointer"
              disabled={isLoading || !!error}
            >
              <ImageIcon className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Browse</span>
            </Button>

            <button
              type="button"
              onClick={handleCapture}
              disabled={isLoading || !!error}
              className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full border-4 border-slate-700 bg-white hover:bg-slate-100 flex items-center justify-center transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${
                isLoading || !!error ? '' : 'cursor-pointer'
              }`}
              title="Capture Scan"
            >
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-slate-300 bg-white" />
            </button>

            <Button
              type="button"
              onClick={toggleFacingMode}
              variant="outline"
              className="border-slate-800 bg-[#0f172a] text-slate-300 hover:bg-slate-800 rounded-xl font-bold text-xs h-10 px-3 sm:px-4 cursor-pointer"
              disabled={isLoading || !!error}
            >
              <RefreshCw className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Switch</span>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
