import type { SVGProps } from 'react'
import {
  AlertCircle,
  Baby,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Droplets,
  GlassWater,
  Heart,
  HeartPulse,
  HelpCircle,
  Hourglass,
  Info,
  ListOrdered,
  MapPin,
  Menu,
  Phone,
  Plus,
  RotateCcw,
  Search,
  TrendingUp,
  TriangleAlert,
  Users,
  Utensils,
  X,
  XCircle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  'alert-circle': AlertCircle,
  'alert-triangle': TriangleAlert,
  baby: Baby,
  'check-circle': CheckCircle2,
  chevronRight: ChevronRight,
  clipboardCheck: ClipboardCheck,
  clock: Clock,
  droplets: Droplets,
  'glass-water': GlassWater,
  heart: Heart,
  'heart-pulse': HeartPulse,
  'help-circle': HelpCircle,
  hourglass: Hourglass,
  info: Info,
  list: ListOrdered,
  'map-pin': MapPin,
  menu: Menu,
  phone: Phone,
  plus: Plus,
  'rotate-ccw': RotateCcw,
  search: Search,
  trendingUp: TrendingUp,
  users: Users,
  utensils: Utensils,
  x: X,
  'x-circle': XCircle,
}

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: string
  size?: number
}

export function Icon({ name, size = 24, ...props }: IconProps) {
  const Lucide = icons[name]

  if (!Lucide) return null

  return <Lucide size={size} aria-hidden="true" {...props} />
}