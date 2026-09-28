const fs = require('fs');
let content = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf-8');

// 1. Add imports
content = content.replace(
  "import { productsList } from '@/lib/data';",
  "import { productsList } from '@/lib/data';\nimport LeadCaptureModal from '@/components/LeadCaptureModal';"
);

// 2. Add state
content = content.replace(
  "const [isHovered, setIsHovered] = useState(false);",
  "const [isHovered, setIsHovered] = useState(false);\n  const [showLeadModal, setShowLeadModal] = useState(false);"
);

// 3. Replace handleEnquire
const oldHandleEnquire = "  const handleEnquire = () => {\n" +
"    if (!product) return;\n" +
"    const text = `Hi, I am interested in ${product.title}. Please provide more details.\\n\\nLink: \\n${window.location.href}`;\n" +
"    window.open(`https://wa.me/919023791865?text=${encodeURIComponent(text)}`, '_blank');\n" +
"  };";

// Try a regex replace just in case formatting is slightly off
const newHandleEnquire = `  const proceedToWhatsApp = () => {
    if (!product) return;
    const text = \`Hi, I am interested in \${product.title}. Please provide more details.\\n\\nLink: \\n\${window.location.href}\`;
    window.open(\`https://wa.me/919023791865?text=\${encodeURIComponent(text)}\`, '_blank');
  };

  const handleEnquire = () => {
    if (!product) return;
    if (!localStorage.getItem('lead_captured')) {
      setShowLeadModal(true);
    } else {
      proceedToWhatsApp();
    }
  };`;

content = content.replace(/  const handleEnquire = \(\) => \{[\s\S]*?  \};/, newHandleEnquire);

// 4. Inject modal before the final div
const modalComponent = `
      <LeadCaptureModal 
        isOpen={showLeadModal} 
        onClose={() => setShowLeadModal(false)}
        onSuccess={() => {
          setShowLeadModal(false);
          proceedToWhatsApp();
        }}
        title="Quick Inquiry"
        description={\`Please enter your details to inquire about \${product?.title}.\`}
        source="whatsapp_inquiry"
        productInterest={product?.title}
      />
    </div>
  );
}`;

content = content.replace(/    <\/div>\s*<\/FadeIn>\s*<\/div>\s*<\/section>\s*<\/div>\s*\);\s*\}/, "    </div>\n      </FadeIn>\n    </div>\n    </section>\n" + modalComponent);
fs.writeFileSync('src/pages/ProductDetail.tsx', content);
