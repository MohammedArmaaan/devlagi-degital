const fs = require('fs');
const file = 'src/lib/data.ts';
let content = fs.readFileSync(file, 'utf8');

const oldUrl = 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80';
const newUrl = 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80';

if (content.includes(oldUrl)) {
    content = content.replace(oldUrl, newUrl);
    fs.writeFileSync(file, content);
    console.log('Successfully updated Wall Murals image.');
} else {
    console.log('Could not find the old image URL.');
}

