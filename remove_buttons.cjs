const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<motion\.div\s*initial={{ opacity: 0 }}\s*animate={{ opacity: 1 }}\s*transition={{ delay: 0\.5, duration: 1 }}\s*className="pointer-events-auto mt-2 md:mt-6 flex flex-col sm:flex-row gap-3 md:gap-4"\s*>[\s\S]*?<\/motion\.div>/;

if (regex.test(content)) {
  content = content.replace(regex, '');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Buttons removed.");
} else {
  console.log("Could not find the block to remove.");
}

