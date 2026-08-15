import { readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs'

const distAssets = new URL('../dist/assets/', import.meta.url).pathname
const dist = new URL('../dist/', import.meta.url).pathname + 'index.html'
let html = readFileSync(dist, 'utf8')

for (const asset of readdirSync(distAssets)) {
  if (!asset.endsWith('.css')) continue
  const css = readFileSync(`${distAssets}${asset}`, 'utf8')
  html = html.replace(
    new RegExp(`<link rel="stylesheet"[^>]*href="[^"]*${asset}"[^>]*/?>`),
    `<style>${css}</style>`,
  )
  rmSync(`${distAssets}${asset}`)
}

writeFileSync(dist, html)
console.log('CSS inliné dans dist/index.html')