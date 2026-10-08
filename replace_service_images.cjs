const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'src', 'lib', 'data.ts');
let content = fs.readFileSync(dataFilePath, 'utf8');

// Replace B2B image
content = content.replace(
  /slug:\s*'b2b-dealership-programs'[\s\S]*?image:\s*'[^']+'/,
  match => match.replace(/image:\s*'[^']+'/, "image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80'")
);

// Replace OEM image
content = content.replace(
  /slug:\s*'direct-primary-manufacturing-oem'[\s\S]*?image:\s*'[^']+'/,
  match => match.replace(/image:\s*'[^']+'/, "image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'")
);

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log("Images replaced successfully.");

