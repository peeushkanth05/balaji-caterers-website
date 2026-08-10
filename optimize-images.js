/**
 * Image Optimization Script for Verma Caterers and Events
 * 
 * HOW TO RUN THIS SCRIPT:
 * 1. Ensure Node.js and dependencies are installed (`npm install sharp`).
 * 2. Run: node optimize-images.js
 * 
 * WHAT IT DOES:
 * - Scans public/images and verma-caterers/images directories for JPG and PNG images.
 * - Converts each image to WebP format with quality 80 using Sharp.
 * - Saves converted images into an 'images/webp/' output directory.
 * - Generates an 'image-map.json' mapping original image paths to their WebP counterparts.
 */

const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (err) {
    console.error('Sharp library is required. Run `npm install sharp` first.');
    process.exit(1);
  }

  const targetDirs = [
    path.join(__dirname, 'public', 'images'),
    path.join(__dirname, 'verma-caterers'),
    path.join(__dirname, 'public')
  ];

  const outputWebpDir = path.join(__dirname, 'public', 'images', 'webp');
  if (!fs.existsSync(outputWebpDir)) {
    fs.mkdirSync(outputWebpDir, { recursive: true });
  }

  const imageMap = {};
  let processedCount = 0;

  function findImages(dir) {
    if (!fs.existsSync(dir)) return [];
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        if (!filePath.includes('node_modules') && !filePath.includes('.next') && !filePath.includes('webp')) {
          results = results.concat(findImages(filePath));
        }
      } else {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          results.push(filePath);
        }
      }
    });
    return results;
  }

  const imageFiles = findImages(path.join(__dirname, 'public'));
  console.log(`Found ${imageFiles.length} image files to process...`);

  for (const file of imageFiles) {
    try {
      const filename = path.basename(file, path.extname(file));
      const webpFileName = `${filename}.webp`;
      const outputPath = path.join(outputWebpDir, webpFileName);

      await sharp(file)
        .webp({ quality: 80 })
        .toFile(outputPath);

      const relInput = path.relative(__dirname, file).replace(/\\/g, '/');
      const relOutput = path.relative(__dirname, outputPath).replace(/\\/g, '/');

      imageMap[relInput] = relOutput;
      processedCount++;
      console.log(`[Optimized] ${relInput} -> ${relOutput}`);
    } catch (e) {
      console.error(`[Error] Failed to convert ${file}:`, e.message);
    }
  }

  const mapPath = path.join(outputWebpDir, 'image-map.json');
  fs.writeFileSync(mapPath, JSON.stringify(imageMap, null, 2));
  console.log(`\nDone! Successfully optimized ${processedCount} images. Map saved to ${mapPath}`);
}

optimizeImages().catch(console.error);
