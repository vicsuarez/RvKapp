const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const svgPath = path.join(__dirname, '../assets/images/gold-coin.svg');
const imagesDir = path.join(__dirname, '../assets/images');

// Icon sizes and names
const icons = [
  { name: 'icon.png', size: 1024 },
  { name: 'adaptive-icon.png', size: 1024 },
  { name: 'favicon.png', size: 48 },
  { name: 'splash-icon.png', size: 1024 }
];

// Check if SVG exists
if (!fs.existsSync(svgPath)) {
  console.error('SVG file not found:', svgPath);
  process.exit(1);
}

// Convert SVG to PNG for each icon
icons.forEach(icon => {
  const outputPath = path.join(imagesDir, icon.name);
  try {
    // Using npx sharp to convert SVG to PNG
    const command = `npx sharp-cli --input=${svgPath} --output=${outputPath} resize ${icon.size} ${icon.size}`;
    console.log(`Generating ${icon.name}...`);
    execSync(command);
    console.log(`Created ${icon.name}`);
  } catch (error) {
    console.error(`Error generating ${icon.name}:`, error.message);
  }
});

console.log('Icon generation complete!'); 