const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processImage() {
  const inputPath = path.resolve(__dirname, '../public/profile.jpg');
  const outputPath = path.resolve(__dirname, '../public/favicon.png');
  const size = 512;
  const r = size / 2;

  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" /></svg>`
  );

  await sharp(inputPath)
    .resize(size, size)
    .composite([{
      input: circleSvg,
      blend: 'dest-in'
    }])
    .png()
    .toFile(outputPath);

  console.log('Successfully created circular favicon.png');
}

processImage().catch(console.error);
