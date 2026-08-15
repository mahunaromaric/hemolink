import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import puppeteer from 'puppeteer-core'
import sharp from 'sharp'

const PORT = 4173
const PREVIEW_URL = `http://localhost:${PORT}`
const CHROME = '/usr/bin/google-chrome'
const VITE = new URL('../node_modules/vite/bin/vite.js', import.meta.url).pathname
const OUT = new URL('../public/og-image.png', import.meta.url).pathname

const run = (cmd, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'ignore' })
    child.on('error', reject)
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} → code ${code}`)),
    )
  })

const waitForServer = async () => {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(PREVIEW_URL)
      if (res.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error(`serveur preview indisponible sur ${PREVIEW_URL}`)
}

await run('npm', ['run', 'build'])

const preview = spawn(process.execPath, [VITE, 'preview', '--port', String(PORT), '--strictPort'], {
  stdio: 'ignore',
})

try {
  await waitForServer()

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 })
  await page.goto(PREVIEW_URL, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 2600))

  const hero = await page.$('#home-hero')
  if (!hero) throw new Error('section #home-hero introuvable')
  const shot = await hero.screenshot({ type: 'png' })

  const png = await sharp(shot)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9 })
    .toBuffer()
  writeFileSync(OUT, png)

  const meta = await sharp(png).metadata()
  console.log(`og-image.png capturé : ${meta.width}×${meta.height}, ${(png.length / 1024).toFixed(0)} Ko`)
  await browser.close()
} finally {
  preview.kill('SIGTERM')
}