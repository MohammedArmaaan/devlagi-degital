const fs = require('fs');
let data = fs.readFileSync('src/lib/data.ts', 'utf-8');

// The original pexels links often look like https://images.pexels.com/...
// Let's replace them with reliable picsum.photos or unsplash source URLs.
// Since picsum is easiest for random placeholders:
data = data.replace(/https:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.jpeg\?[^'"]+/g, () => {
    const randomId = Math.floor(Math.random() * 1000);
    return \https://picsum.photos/seed/\/800/600\;
});

fs.writeFileSync('src/lib/data.ts', data);
