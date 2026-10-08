const fs = require('fs');

let navbar = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const target = `<div className="hidden xl:flex items-center gap-6 shrink-0">
              <a
                href={\`tel:\${whatsappNo.replace('+', '')}\`}
                className={\`flex items-center gap-2 transition-colors duration-500 font-sans text-sm whitespace-nowrap \${
                  !scrolled && hasBanner ? 'text-white/90 hover:text-white' : 'text-ink-800 hover:text-burgundy-700'
                }\`}
              >
                <Phone className="w-4 h-4" />
                <span>{whatsappNo}</span>
              </a>
              <button`;

const replacement = `<div className="hidden xl:flex items-center gap-6 shrink-0">
              <button`;

if (navbar.includes(target)) {
    fs.writeFileSync('src/components/Navbar.tsx', navbar.replace(target, replacement));
    console.log("Success exact");
} else {
    // Regex fallback
    const targetRegex = /<a\s+href=\{`tel:\$\{whatsappNo[^>]+>\s*<Phone[^>]+>\s*<span>\{whatsappNo\}<\/span>\s*<\/a>/;
    if (targetRegex.test(navbar)) {
        fs.writeFileSync('src/components/Navbar.tsx', navbar.replace(targetRegex, ''));
        console.log("Success regex");
    } else {
        console.log("Failed to find target block");
    }
}

