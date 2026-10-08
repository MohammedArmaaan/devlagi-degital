const fs = require('fs');
const file = 'src/lib/data.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace broken image 1031302 with 1571463 (Wall Murals)
content = content.replace(/1031302/g, '1571463');

// Replace broken image 2364070 with 1090638 (Canvas Frames)
content = content.replace(/2364070/g, '1090638');

fs.writeFileSync(file, content);
console.log('Fixed broken images');

