const fs = require('fs');
const file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = '{/* Grid */}';
const endStr = '{/* Services preview - Professional Edition */}';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  let gridContent = content.substring(startIndex, endIndex);
  
  gridContent = gridContent.replace(/rounded-2xl/g, '');
  gridContent = gridContent.replace(/rounded-xl/g, '');
  gridContent = gridContent.replace(/rounded-full/g, '');

  content = content.substring(0, startIndex) + gridContent + content.substring(endIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log("Successfully patched!");
} else {
  console.log("Could not find boundaries.");
}
