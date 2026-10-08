const fs = require('fs');
const path = require('path');

const directory = 'src/pages';
const files = fs.readdirSync(directory);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let changed = false;
    if (content.includes('bg-[#f4f2ee]')) {
      content = content.replace(/bg-\[#f4f2ee\]/g, 'bg-ink-50');
      changed = true;
    }
    if (content.includes('bg-[#f7f7f7]')) {
      content = content.replace(/bg-\[#f7f7f7\]/g, 'bg-ink-100');
      changed = true;
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(\Updated \\);
    }
  }
});
