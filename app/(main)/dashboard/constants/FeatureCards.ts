// constants/FeatureCards.ts
import { Upload, LinkIcon, Scan } from 'lucide-react'

export const features = [
  {
    id: 'upload',
    title: 'Upload File',
    description: 'PDF, Word, or Text files',
    icon: Upload,
    href: '/upload?tab=files', // 👈 Updated
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    hoverRing: 'hover:ring-cyan-500/50',
  },
  {
    id: 'link',
    title: 'Paste Link',
    description: 'Summarize YouTube or Articles',
    icon: LinkIcon,
    href: '/upload?tab=link', // 👈 Updated
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    hoverRing: 'hover:ring-blue-500/50',
  },
  {
    id: 'scan',
    title: 'Scan Image',
    description: 'Extract text from photos',
    icon: Scan,
    href: '/upload?tab=files', // 👈 Updated (or 'files' if preferred)
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    hoverRing: 'hover:ring-purple-500/50',
  },
]
