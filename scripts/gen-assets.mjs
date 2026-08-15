import { mkdirSync, readFileSync } from 'node:fs'
import sharp from 'sharp'
import { getSiteUrl } from './site-url.mjs'

const publicDir = new URL('../public/', import.meta.url).pathname
const siteLabel = getSiteUrl().replace(/^https?:\/\//, '')

const ogCardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FBF4F1"/>
  <g transform="translate(1120 90) scale(6)">
    <path d="M0 -12 C7 2 13 8 13 15 A13 13 0 1 1 -13 15 C -13 8 -7 2 0 -12 Z" fill="#C8102E" fill-opacity="0.06"/>
  </g>
  <g transform="translate(560 560) scale(4)">
    <path d="M0 -12 C7 2 13 8 13 15 A13 13 0 1 1 -13 15 C -13 8 -7 2 0 -12 Z" fill="#12414A" fill-opacity="0.05"/>
  </g>

  <rect x="0" y="0" width="480" height="630" fill="#12414A"/>
  <g transform="translate(240 150) scale(2.8)">
    <path d="M0 -12 C7 2 13 8 13 15 A13 13 0 1 1 -13 15 C -13 8 -7 2 0 -12 Z" fill="#FFFFFF"/>
    <ellipse cx="5" cy="4" rx="4.5" ry="6" fill="#FFFFFF" fill-opacity="0.4"/>
  </g>
  <text x="240" y="272" text-anchor="middle" font-family="'DejaVu Sans', sans-serif" font-weight="700" font-size="64" fill="#FFFFFF">HemoLink</text>
  <text x="240" y="322" text-anchor="middle" font-family="'DejaVu Sans Mono', monospace" font-weight="600" font-size="19" letter-spacing="5" fill="#A7C4C9">DON DE SANG AU BÉNIN</text>

  <text x="520" y="240" font-family="'DejaVu Sans', sans-serif" font-weight="600" font-size="56" fill="#221416">Un geste de dix minutes.</text>
  <text x="520" y="305" font-family="'DejaVu Sans', sans-serif" font-weight="700" font-size="56" fill="#C8102E">Trois vies sauvées.</text>
  <text x="520" y="365" font-family="'DejaVu Sans', sans-serif" font-size="25" fill="#6B5652">Trouvez un centre proche de vous et testez</text>
  <text x="520" y="400" font-family="'DejaVu Sans', sans-serif" font-size="25" fill="#6B5652">votre éligibilité en moins d'une minute.</text>

  <rect x="520" y="445" width="300" height="56" rx="28" fill="#C8102E"/>
  <text x="670" y="480" text-anchor="middle" font-family="'DejaVu Sans', sans-serif" font-weight="700" font-size="21" fill="#FFFFFF">Tester mon éligibilité</text>

  <rect x="520" y="540" width="560" height="2" rx="1" fill="#E7D9D2"/>
  <text x="520" y="572" font-family="'DejaVu Sans', sans-serif" font-weight="600" font-size="20" fill="#12414A">${siteLabel}</text>

  <rect x="0" y="616" width="1200" height="14" fill="#C8102E"/>
</svg>
`

async function main() {
  mkdirSync(publicDir, { recursive: true })

  await sharp(Buffer.from(ogCardSvg))
    .resize(1200, 630)
    .png()
    .toFile(`${publicDir}og-image.png`)

  const favicon = readFileSync(`${publicDir}favicon.svg`)

  const rasterize = (size, file) =>
    sharp(favicon).resize(size, size).png().toFile(`${publicDir}${file}`)

  await rasterize(180, 'apple-touch-icon.png')
  await rasterize(192, 'icon-192.png')
  await rasterize(512, 'icon-512.png')

  console.log('assets générés : og-image.png, apple-touch-icon.png, icon-192.png, icon-512.png')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})