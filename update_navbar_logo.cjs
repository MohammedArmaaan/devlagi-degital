const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'Navbar.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add isBannerTop before return
content = content.replace(
  /return\s*\(\s*<>\s*<motion\.header/g,
  `const isBannerTop = !scrolled && hasBanner;\n\n  return (\n    <>\n      <motion.header`
);

// Add background to the logo container
const logoRegex = /<div className="relative flex items-center justify-start">\s*<img src="\/Logo4\.png"/;
const newLogoDiv = `<div className={\`relative flex items-center justify-start transition-all duration-500 \${isBannerTop ? 'bg-white/95 px-4 py-1.5 rounded-md shadow-lg' : ''}\`}>\n                          <img src="/Logo4.png"`;
content = content.replace(logoRegex, newLogoDiv);

// Remove the inner declaration inside map to avoid redeclaration error
content = content.replace(/const isBannerTop = !scrolled && hasBanner;\s*const active/g, 'const active');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Navbar updated for logo visibility.');

