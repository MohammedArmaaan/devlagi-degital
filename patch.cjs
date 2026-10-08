const fs = require('fs');

const content = fs.readFileSync('./src/pages/Home.tsx', 'utf8');

const target = `              <button className="btn-outline group !px-6 !py-3 flex items-center gap-2 text-xs border-ink-900 text-ink-900 transition-colors opacity-0 pointer-events-none">
                {/* Hidden button to keep layout consistent with reference */}
              </button>`;

const replacement = `              <button 
                onClick={() => navigate('/collections')}
                className="bg-ink-950 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-ink-900 transition-colors flex items-center gap-2"
              >
                View all <ArrowRight className="w-4 h-4" />
              </button>`;

const newContent = content.replace(target, replacement);

if (newContent !== content) {
    fs.writeFileSync('./src/pages/Home.tsx', newContent);
    console.log("Success");
} else {
    console.log("Target string not found in Home.tsx. Trying regex fallback...");
    // Fallback using regex to ignore line endings
    const targetRegex = /<button className="btn-outline group !px-6 !py-3 flex items-center gap-2 text-xs border-ink-900 text-ink-900 transition-colors opacity-0 pointer-events-none">[\s\S]*?<\/button>/;
    const newContentRegex = content.replace(targetRegex, replacement.trim());
    if (newContentRegex !== content) {
        fs.writeFileSync('./src/pages/Home.tsx', newContentRegex);
        console.log("Success with regex");
    } else {
        console.log("Failed even with regex");
    }
}
