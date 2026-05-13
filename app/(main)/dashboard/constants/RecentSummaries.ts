import { SummaryType } from '../../../../components/SummaryItem'

export const recentData = [
  {
    id: 1,
    title: 'Q3 Market Analysis Report.pdf',
    timestamp: 'Yesterday, 02:45 AM',
    language: 'BOTH' as const,
    type: 'file' as SummaryType,
    isFavorite: true,
  },
  {
    id: 2,
    title: 'The Future of Generative AI is Here...',
    timestamp: 'Yesterday, 11:23 PM',
    language: 'EN' as const,
    type: 'link' as SummaryType,
    isFavorite: false,
  },
  {
    id: 3,
    title: 'Meeting Notes Whiteboard.jpg',
    timestamp: 'Jan 3, 2026',
    language: 'AR' as const,
    type: 'image' as SummaryType,
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Annual Report 2025.docx',
    timestamp: 'Jan 2, 2026',
    language: 'EN' as const,
    type: 'file' as SummaryType,
    isFavorite: true,
  },
  {
    id: 5,
    title: 'Research Paper on Climate Change',
    timestamp: 'Jan 1, 2026',
    language: 'BOTH' as const,
    type: 'link' as SummaryType,
    isFavorite: false,
  },
]
