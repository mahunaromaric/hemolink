import { mkdirSync, readFileSync } from 'node:fs'
import sharp from 'sharp'

const publicDir = new URL('../public/', import.meta.url).pathname

async function main() {
  mkdirSync(publicDir, { recursive: true })

  const favicon = readFileSync(`${publicDir}favicon.svg`)

  const rasterize = (size, file) =>
    sharp(favicon).resize(size, size).png().toFile(`${publicDir}${file}`)

  await rasterize(180, 'apple-touch-icon.png')
  await rasterize(192, 'icon-192.png')
  await rasterize(512, 'icon-512.png')

  console.log('assets générés : apple-touch-icon.png, icon-192.png, icon-512.png')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})