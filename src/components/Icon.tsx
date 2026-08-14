import type { SVGProps } from 'react'
import {
  Activity,
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Coffee,
  Cookie,
  Droplets,
  FlaskConical,
  Heart,
  HeartPulse,
  Info,
  Loader2,
  MapPin,
  MapPinOff,
  Menu,
  Phone,
  Scale,
  Search,
  TrendingUp,
  Users,
  X,
  XCircle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Icônes de marques retirées des versions récentes de lucide — conservées en SVG inline.
const brandPaths: Record<string, string> = {
  facebook:
    'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  twitter:
    'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
  instagram:
    'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2a3.9 3.9 0 0 1-.9 1.4c-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4a3.9 3.9 0 0 1-1.4-.9c-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.8.1-1.1.1-1.5.2-1.8.3-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.3-.3.7-.3 1.8-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.5.3 1.8.2.5.4.8.7 1.1.3.3.6.5 1.1.7.3.1.7.3 1.8.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.5-.2 1.8-.3.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.3.3-.7.3-1.8.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.5-.3-1.8a2.9 2.9 0 0 0-.7-1.1c-.3-.3-.6-.5-1.1-.7-.3-.1-.7-.3-1.8-.3-1.3-.1-1.7-.1-4.8-.1Zm0 3.1a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 8.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm6.4-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z',
}

const icons: Record<string, LucideIcon> = {
  activity: Activity,
  'alert-circle': AlertCircle,
  building: Building2,
  calendar: Calendar,
  'check-circle': CheckCircle2,
  'check-circle-2': CheckCircle,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  clipboardCheck: ClipboardCheck,
  clock: Clock,
  coffee: Coffee,
  cookie: Cookie,
  droplets: Droplets,
  flaskConical: FlaskConical,
  heart: Heart,
  'heart-pulse': HeartPulse,
  info: Info,
  'loader-2': Loader2,
  'map-pin': MapPin,
  'map-pin-off': MapPinOff,
  menu: Menu,
  phone: Phone,
  scale: Scale,
  search: Search,
  trendingUp: TrendingUp,
  users: Users,
  x: X,
  'x-circle': XCircle,
}

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: string
  size?: number
}

export function Icon({ name, size = 24, ...props }: IconProps) {
  const Lucide = icons[name]

  if (Lucide) {
    return <Lucide size={size} aria-hidden="true" {...props} />
  }

  const d = brandPaths[name] ?? brandPaths.facebook
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={d} />
    </svg>
  )
}
