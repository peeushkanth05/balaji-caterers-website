const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext) || filePath.endsWith('.webp')) return;
  const webpPath = filePath.substring(0, filePath.length - ext.length) + '.webp';

  try {
    const inputSize = fs.statSync(filePath).size;
    await sharp(filePath).webp({ quality: 80 }).toFile(webpPath);
    const outputSize = fs.statSync(webpPath).size;
    console.log(`Converted: ${path.relative(process.cwd(), filePath)} -> ${path.relative(process.cwd(), webpPath)} (${Math.round(inputSize/1024)}KB -> ${Math.round(outputSize/1024)}KB)`);
  } catch (e) {
    console.error(`Failed: ${filePath}`, e.message);
  }
}

async function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const p = path.join(dir, item);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      if (!p.includes('node_modules') && !p.includes('.next')) {
        await walkDir(p);
      }
    } else {
      await processFile(p);
    }
  }
}

walkDir(path.join(process.cwd(), 'public')).then(() => console.log('Done image optimization!'));
