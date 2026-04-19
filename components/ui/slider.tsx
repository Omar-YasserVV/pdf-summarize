'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const initialValue = value || defaultValue || [min]
  const thumbs = Array.isArray(initialValue) ? initialValue : [initialValue]

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-4 w-full grow overflow-hidden rounded-full bg-[#162031]"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-full bg-[#1b778e]"
        />
      </SliderPrimitive.Track>

      {thumbs.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          className={cn(
            'block h-3.5 w-3.5 cursor-pointer rounded-full transition-transform focus:outline-none',
            'bg-[#0b121f]',
            'border-2 border-transparent'
          )}
          style={{
            boxShadow: '0 0 0 1px #1b778e',
          }}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
