import { existsSync, readFileSync } from 'node:fs'

const DEFAULT_SITE_URL = 'https://hemolink-ten.vercel.app'

function parseEnvFile() {
  const path = new URL('../.env.production', import.meta.url).pathname
  if (!existsSync(path)) return null
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^\s*VITE_SITE_URL\s*=\s*(.+?)\s*$/)
    if (m) return m[1].trim().replace(/^["']|["']$/g, '')
  }
  return null
}

export function getSiteUrl() {
  const url = process.env.VITE_SITE_URL || parseEnvFile() || DEFAULT_SITE_URL
  return url.replace(/\/+$/, '')
}