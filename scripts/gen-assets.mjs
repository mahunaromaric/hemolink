import { mkdirSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import sharp from 'sharp'

const publicDir = new URL('../public/', import.meta.url).pathname

const ogCardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="drop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#E8485E"/>
      <stop offset="1" stop-color="#A50F24"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#FBF4F1"/>
  <circle cx="1030" cy="110" r="280" fill="#E3EEEC"/>
  <circle cx="120" cy="560" r="300" fill="#FDEBEE"/>
  <g transform="translate(270 240) scale(4.2)">
    <path d="M32 10C32 10 18 26 18 38a14 14 0 0 0 28 0C46 26 32 10 32 10Z" fill="url(#drop)"/>
    <circle cx="41" cy="40" r="5" fill="white" fill-opacity="0.4"/>
  </g>
  <text x="270" y="470" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-weight="700" font-size="74" fill="#221416">HemoLink</text>
  <text x="270" y="525" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-weight="600" font-size="27" letter-spacing="2" fill="#12414A">DON DE SANG AU BÉNIN</text>
  <text x="650" y="250" font-family="DejaVu Serif, serif" font-weight="600" font-size="54" fill="#221416">Un geste de dix minutes.</text>
  <text x="650" y="330" font-family="DejaVu Serif, serif" font-weight="700" font-size="54" fill="#C8102E">Trois vies sauvées.</text>
  <text x="650" y="405" font-family="DejaVu Sans, sans-serif" font-size="25" fill="#6B5652">Trouvez un centre de don proche de vous et</text>
  <text x="650" y="440" font-family="DejaVu Sans, sans-serif" font-size="25" fill="#6B5652">testez votre éligibilité en moins d'une minute.</text>
  <rect x="650" y="500" width="430" height="3" rx="1.5" fill="#E7D9D2"/>
  <text x="650" y="545" font-family="DejaVu Sans, sans-serif" font-weight="600" font-size="24" fill="#12414A">hemolink-nu.vercel.app</text>
  <rect width="1200" height="14" fill="#C8102E"/>
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