const fs = require('fs');
const file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace bg-[#f4f2ee] with bg-ink-50 to match the new cool plum/lavender theme
content = content.replace(/bg-\[#f4f2ee\]/g, 'bg-ink-50');

// Replace bg-[#f7f7f7] with bg-ink-100 to maintain subtle contrast where needed
content = content.replace(/bg-\[#f7f7f7\]/g, 'bg-ink-100');

fs.writeFileSync(file, content, 'utf8');
console.log("Successfully updated background colors in Home.tsx");
