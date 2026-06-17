  'use client'

  import { ArrowRight, X, ChevronDown } from 'lucide-react'
  import PricingModal from './Modal/PricingModal'
  import { useState, useRef } from 'react'

  export default function UpgradePremium() {
    const [isOpened, setIsOpened] = useState(false)
    const [showScrollIndicator, setShowScrollIndicator] = useState(true)
    const modalBodyRef = useRef<HTMLDivElement>(null)

    // Helper function to close modal and reset scroll indicator simultaneously
    const handleCloseModal = () => {
      setIsOpened(false)
      setShowScrollIndicator(true) // Set it cleanly in the same event loop
    }

    const handleScroll = () => {
      if (modalBodyRef.current) {
        if (modalBodyRef.current.scrollTop > 50) {
          setShowScrollIndicator(false)
        } else {
          setShowScrollIndicator(true)
        }
      }
    }

    return (
      <>
        <div className="w-full rounded-2xl border border-primary/50 bg-primary/10 p-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
          <div className="space-y-1.5">
            <h3 className="text-base font-bold tracking-tight text-white md:text-lg">
              Upgrade to Premium
            </h3>
            <p className="max-w-md text-xs leading-relaxed text-slate-400 md:text-sm">
              Unlock unlimited summaries, advanced AI features, and priority
              support.
            </p>
          </div>

          <button
            className="mt-5 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-[#2ec8f4] py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all hover:bg-[#22d3ee] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] active:scale-[0.98]"
            onClick={() => setIsOpened(true)}
          >
            <span>Upgrade Now</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>

        {isOpened && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            {/* backdrop click uses handler */}
            <div className="absolute inset-0" onClick={handleCloseModal} />

            <div className="relative z-10 flex h-[90vh] w-full max-w-2xl animate-in flex-col duration-200 fade-in-0 zoom-in-95">
              {/* close button uses handler */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-30 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div
                ref={modalBodyRef}
                onScroll={handleScroll}
                className="custom-scrollbar relative h-full overflow-y-auto rounded-2xl"
              >
                {/* Pass the new handler down if PricingModal needs to close itself */}
                <PricingModal setIsOpened={handleCloseModal} />
              </div>

              <div
                className={`pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 transition-all duration-300 ${
                  showScrollIndicator
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
              >
                <span className="text-[10px] font-bold tracking-widest text-[#2ec8f4] uppercase drop-shadow-[0_0_10px_rgba(46,200,244,0.5)]">
                  Scroll to explore
                </span>
                <div className="flex flex-col items-center">
                  <ChevronDown className="h-4 w-4 animate-bounce text-[#2ec8f4] duration-1000" />
                  <div className="h-8 w-[2px] rounded-full bg-gradient-to-b from-[#2ec8f4] to-transparent shadow-[0_0_8px_rgba(46,200,244,0.5)]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
