import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = './src/assets/images';
const QUALITY = 90;

// Only convert these large PNGs (skip JPGs - they're already small)
const TARGETS = [
  'site_guramo.png',
  'site_ikigai.png',
  'site_futuremodern.png',
  'site_yamaha.png',
  'site_wirausahain.png',
  'site_laserreach.png',
  'mockup_yamaha.png',
  'mockup_wirausahain.png',
  'mockup_ikigai.png',
  'mockup_futuremodern.png',
  'mockup_guramo.png',
  'mockup_laserreach.png',
];

console.log(`\n🔄 Converting PNGs to WebP at quality ${QUALITY}...\n`);

let totalSaved = 0;

for (const filename of TARGETS) {
  const inputPath = join(IMAGES_DIR, filename);
  const outputName = basename(filename, extname(filename)) + '.webp';
  const outputPath = join(IMAGES_DIR, outputName);

  try {
    const inputMeta = await sharp(inputPath).metadata();
    const inputStats = (await import('fs')).statSync(inputPath);
    const inputSizeKB = (inputStats.size / 1024).toFixed(0);

    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputStats = (await import('fs')).statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(0);
    const saved = ((1 - outputStats.size / inputStats.size) * 100).toFixed(0);
    totalSaved += inputStats.size - outputStats.size;

    console.log(`✅ ${filename}`);
    console.log(`   ${inputSizeKB} KB → ${outputSizeKB} KB (${saved}% smaller)\n`);

    // Remove the original PNG
    await unlink(inputPath);
  } catch (err) {
    console.error(`❌ Failed to convert ${filename}:`, err.message);
  }
}

const totalSavedMB = (totalSaved / 1024 / 1024).toFixed(1);
console.log(`\n🎉 Done! Total space saved: ${totalSavedMB} MB`);
