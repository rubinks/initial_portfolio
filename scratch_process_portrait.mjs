import fs from 'fs';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';

const jpegData = fs.readFileSync('public/assets/rubinraj_original.jpg');
const rawData = jpeg.decode(jpegData, { useTArray: true });
const { width, height, data } = rawData;

// Create background mask using BFS flood fill from edges
const isBg = new Uint8Array(width * height);
const queue = [];

function isWhite(x, y) {
  const idx = (y * width + x) * 4;
  const r = data[idx];
  const g = data[idx + 1];
  const b = data[idx + 2];
  // Pure background is extremely bright white: r > 246, g > 246, b > 246
  return r >= 246 && g >= 246 && b >= 246;
}

// Push all outer border pixels that are white
for (let x = 0; x < width; x++) {
  if (isWhite(x, 0)) {
    isBg[x] = 1;
    queue.push(x, 0);
  }
}
for (let y = 0; y < height; y++) {
  if (isWhite(0, y) && !isBg[y * width]) {
    isBg[y * width] = 1;
    queue.push(0, y);
  }
  if (isWhite(width - 1, y) && !isBg[y * width + width - 1]) {
    isBg[y * width + width - 1] = 1;
    queue.push(width - 1, y);
  }
}

let head = 0;
while (head < queue.length) {
  const cx = queue[head++];
  const cy = queue[head++];

  // Check 4 neighbors
  const neighbors = [
    [cx + 1, cy],
    [cx - 1, cy],
    [cx, cy + 1],
    [cx, cy - 1]
  ];

  for (const [nx, ny] of neighbors) {
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const nIdx = ny * width + nx;
      if (!isBg[nIdx] && isWhite(nx, ny)) {
        isBg[nIdx] = 1;
        queue.push(nx, ny);
      }
    }
  }
}

console.log('Flood fill finished. Background pixels marked:', head / 2);

// Create transparent PNG with edge feathering
const png = new PNG({ width, height });

// Create distance field or blur mask for anti-aliased edge
const alphaMask = new Float32Array(width * height);
for (let i = 0; i < width * height; i++) {
  alphaMask[i] = isBg[i] ? 0 : 1;
}

// Smooth edges slightly (3x3 box blur on alpha)
const smoothedAlpha = new Float32Array(width * height);
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const idx = y * width + x;
    if (alphaMask[idx] === 0) {
      smoothedAlpha[idx] = 0;
      continue;
    }
    let sum = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        sum += alphaMask[(y + dy) * width + (x + dx)];
      }
    }
    smoothedAlpha[idx] = sum / 9;
  }
}

// Generate Color Transparent PNG
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    const pIdx = idx * 4;
    const a = smoothedAlpha[idx];

    png.data[pIdx] = data[pIdx];
    png.data[pIdx + 1] = data[pIdx + 1];
    png.data[pIdx + 2] = data[pIdx + 2];
    png.data[pIdx + 3] = Math.round(a * 255);
  }
}

const buffer = PNG.sync.write(png);
fs.writeFileSync('public/assets/rubinraj_portrait_nobg.png', buffer);
console.log('Saved public/assets/rubinraj_portrait_nobg.png');

// Also create Cinematic Monochrome / Desaturated Version (matching reference image)
const pngCinematic = new PNG({ width, height });
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    const pIdx = idx * 4;
    const a = smoothedAlpha[idx];

    if (a < 0.05) {
      pngCinematic.data[pIdx] = 0;
      pngCinematic.data[pIdx + 1] = 0;
      pngCinematic.data[pIdx + 2] = 0;
      pngCinematic.data[pIdx + 3] = 0;
      continue;
    }

    const r = data[pIdx];
    const g = data[pIdx + 1];
    const b = data[pIdx + 2];
    // Luminance
    let lum = 0.299 * r + 0.587 * g + 0.114 * b;
    // Boost contrast like reference image
    lum = (lum - 128) * 1.35 + 128;
    lum = Math.max(0, Math.min(255, lum));

    // Subtle cool electric tint in highlights
    const tintB = Math.min(255, lum * 1.08 + 8);
    const tintR = Math.max(0, lum * 0.94);
    const tintG = Math.max(0, lum * 0.98);

    // Fade bottom to transparent for seamless blend into hero section
    let fade = 1.0;
    if (y > height * 0.75) {
      fade = 1.0 - (y - height * 0.75) / (height * 0.25);
    }

    pngCinematic.data[pIdx] = Math.round(tintR);
    pngCinematic.data[pIdx + 1] = Math.round(tintG);
    pngCinematic.data[pIdx + 2] = Math.round(tintB);
    pngCinematic.data[pIdx + 3] = Math.round(a * fade * 255);
  }
}

const bufferCinematic = PNG.sync.write(pngCinematic);
fs.writeFileSync('public/assets/rubinraj_cinematic.png', bufferCinematic);
console.log('Saved public/assets/rubinraj_cinematic.png');
