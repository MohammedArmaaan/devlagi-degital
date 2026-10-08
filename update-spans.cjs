const fs = require('fs');

let home = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// For Home.tsx, replace span: "md:col-span-2" with span: "col-span-2"
home = home.replace(/span: "md:col-span-2"/g, 'span: "col-span-2"');
home = home.replace(/span: "md:col-span-1"/g, 'span: "col-span-1"');

fs.writeFileSync('src/pages/Home.tsx', home);

let collections = fs.readFileSync('src/pages/Collections.tsx', 'utf8');

// For Collections.tsx, replace "md:col-span-2" and "md:col-span-1"
collections = collections.replace(/className=\{isWide \? "md:col-span-2" : "md:col-span-1"\}/g, 'className={isWide ? "col-span-2" : "col-span-1"}');

fs.writeFileSync('src/pages/Collections.tsx', collections);

console.log("Updated spans for mobile masonry layout");

