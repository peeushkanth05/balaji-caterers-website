const fs = require('fs');
const path = require('path');

const directoryPath = '.';
const files = fs.readdirSync(directoryPath);

files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html' && file !== 'index_debug.html' && file !== 'index_utf8.html' && file !== 'privacy-policy.html' && file !== 'terms-of-service.html') {
        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Remove h1 and h3 from decor-hero-content
        const originalContent = content;
        content = content.replace(/<div class="decor-hero-content">[\s\S]*?<\/div>/g, '<div class="decor-hero-content"></div>');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Cleaned up hero in: ${file}`);
        }
    }
});
