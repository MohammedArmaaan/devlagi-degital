const fs = require('fs');
const files = ['src/pages/Home.tsx', 'src/pages/Collections.tsx', 'src/pages/Products.tsx'];
files.forEach(f => {
  if (fs.existsSync(f)) {
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    lines.forEach((l, i) => {
      if (l.includes('grid-cols')) console.log(`${f}:${i+1}:${l.trim()}`);
    });
  }
});

