import Jimp from 'jimp'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const images = [
  { src: '../public/assets/050db655-1b2e-4201-89bf-3ecf5be6c089.JPG', out: '../public/assets/jersey-front.png' },
  { src: '../public/assets/PHOTO-2026-06-09-15-38-30.jpg',              out: '../public/assets/jersey-side.png' },
  { src: '../public/assets/2438f948-9daa-41a8-b8ae-a228004bccdc.JPG',  out: '../public/assets/jersey-back.png' },
]

// Flood-fill from corners to mark background pixels
function floodFill(img, x, y, tolerance, visited) {
  const width = img.bitmap.width
  const height = img.bitmap.height
  const stack = [[x, y]]
  const bgColor = Jimp.intToRGBA(img.getPixelColor(x, y))

  while (stack.length) {
    const [cx, cy] = stack.pop()
    if (cx < 0 || cx >= width || cy < 0 || cy >= height) continue
    const key = cy * width + cx
    if (visited.has(key)) continue

    const pixel = Jimp.intToRGBA(img.getPixelColor(cx, cy))
    const diff = Math.abs(pixel.r - bgColor.r) + Math.abs(pixel.g - bgColor.g) + Math.abs(pixel.b - bgColor.b)
    if (diff > tolerance) continue

    visited.add(key)
    stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1])
  }
}

async function removeBg(srcPath, outPath, tolerance = 35) {
  console.log(`Processing: ${path.basename(srcPath)}`)
  const img = await Jimp.read(srcPath)
  const width = img.bitmap.width
  const height = img.bitmap.height

  const visited = new Set()

  // Flood fill from all 4 corners + edge midpoints
  const seeds = [
    [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
    [Math.floor(width / 2), 0], [Math.floor(width / 2), height - 1],
    [0, Math.floor(height / 2)], [width - 1, Math.floor(height / 2)],
  ]
  for (const [sx, sy] of seeds) floodFill(img, sx, sy, tolerance, visited)

  // Make background pixels transparent
  img.scan(0, 0, width, height, function (x, y, idx) {
    const key = y * width + x
    if (visited.has(key)) {
      this.bitmap.data[idx + 3] = 0 // alpha = 0
    }
  })

  // Optional: feather edges slightly — scan transparent pixels next to opaque
  const data = Buffer.from(img.bitmap.data)
  img.scan(0, 0, width, height, function (x, y, idx) {
    if (this.bitmap.data[idx + 3] === 0) return
    // Check 8 neighbours
    const neighbours = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[-1,1],[1,1]]
    let hasBg = false
    for (const [dx, dy] of neighbours) {
      const nx = x + dx, ny = y + dy
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue
      const nKey = ny * width + nx
      if (visited.has(nKey)) { hasBg = true; break }
    }
    if (hasBg) {
      // Soften the edge pixel slightly
      this.bitmap.data[idx + 3] = 200
    }
  })

  await img.writeAsync(outPath)
  console.log(`  ✓ Saved: ${path.basename(outPath)} (${width}×${height})`)
}

for (const { src, out } of images) {
  const srcAbs = path.resolve(__dirname, src)
  const outAbs = path.resolve(__dirname, out)
  await removeBg(srcAbs, outAbs, 40)
}

console.log('\n✅ All done!')
