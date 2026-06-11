const { Jimp } = require('jimp')
const path = require('path')

const images = [
  { src: '../public/assets/050db655-1b2e-4201-89bf-3ecf5be6c089.JPG', out: '../public/assets/jersey-front.png' },
  { src: '../public/assets/PHOTO-2026-06-09-15-38-30.jpg',             out: '../public/assets/jersey-side.png' },
  { src: '../public/assets/2438f948-9daa-41a8-b8ae-a228004bccdc.JPG', out: '../public/assets/jersey-back.png' },
]

function getPixelRGB(data, idx) {
  return { r: data[idx], g: data[idx + 1], b: data[idx + 2] }
}

function colorDiff(a, b) {
  return Math.abs(a.r - b.r) + Math.abs(a.g - b.g) + Math.abs(a.b - b.b)
}

function floodFill(data, width, height, startX, startY, tolerance, visited) {
  const stack = [[startX, startY]]
  const seedIdx = (startY * width + startX) * 4
  const bgColor = getPixelRGB(data, seedIdx)

  while (stack.length > 0) {
    const [x, y] = stack.pop()
    if (x < 0 || x >= width || y < 0 || y >= height) continue
    const key = y * width + x
    if (visited.has(key)) continue

    const idx = key * 4
    const pixel = getPixelRGB(data, idx)
    if (colorDiff(pixel, bgColor) > tolerance) continue

    visited.add(key)
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
  }
}

async function removeBg(srcPath, outPath, tolerance = 40) {
  console.log(`Processing: ${path.basename(srcPath)}`)
  const img = await Jimp.read(srcPath)
  const { width, height, data } = img.bitmap

  const visited = new Set()

  // Seed from corners and edge midpoints
  const seeds = [
    [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
    [Math.floor(width / 2), 0], [Math.floor(width / 2), height - 1],
    [0, Math.floor(height / 2)], [width - 1, Math.floor(height / 2)],
    [Math.floor(width / 4), 0], [Math.floor(3 * width / 4), 0],
    [Math.floor(width / 4), height - 1], [Math.floor(3 * width / 4), height - 1],
  ]
  for (const [sx, sy] of seeds) {
    floodFill(data, width, height, sx, sy, tolerance, visited)
  }

  // Make background transparent
  for (const key of visited) {
    const idx = key * 4
    data[idx + 3] = 0
  }

  // Feather: soften boundary pixels (neighbours of bg)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const key = y * width + x
      if (visited.has(key)) continue
      const idx = key * 4
      if (data[idx + 3] === 0) continue

      let adjBg = 0
      const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue
        if (visited.has(ny * width + nx)) adjBg++
      }
      if (adjBg > 0) data[idx + 3] = 180
    }
  }

  await img.write(outPath)
  console.log(`  ✓ Saved: ${path.basename(outPath)} (${width}×${height})`)
}

;(async () => {
  for (const { src, out } of images) {
    await removeBg(
      path.resolve(__dirname, src),
      path.resolve(__dirname, out),
      42
    )
  }
  console.log('\n✅ Done!')
})()
