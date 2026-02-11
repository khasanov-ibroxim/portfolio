const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../assets');
const outputDir = path.join(__dirname, '../public/optimized');

// Output directory yaratish
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Rasmlarni optimize qilish
async function optimizeImages(dir, baseDir = '') {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Rekursiv ravishda papkalarni ko'rib chiqish
            await optimizeImages(filePath, path.join(baseDir, file));
        } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
            const relativePath = path.join(baseDir, file);
            const outputPath = path.join(outputDir, relativePath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
            const outputFolder = path.dirname(outputPath);

            // Output papkasini yaratish
            if (!fs.existsSync(outputFolder)) {
                fs.mkdirSync(outputFolder, { recursive: true });
            }

            try {
                await sharp(filePath)
                    .webp({ quality: 80 })
                    .resize(1920, null, {
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .toFile(outputPath);

                console.log(`✅ Optimized: ${relativePath}`);
            } catch (error) {
                console.error(`❌ Error optimizing ${relativePath}:`, error.message);
            }
        }
    }
}

console.log('🚀 Starting image optimization...');
optimizeImages(inputDir)
    .then(() => {
        console.log('✨ All images optimized!');
    })
    .catch((error) => {
        console.error('❌ Optimization failed:', error);
        process.exit(1);
    });