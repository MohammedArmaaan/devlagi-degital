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
"    const text = Hi, I am interested in . Please provide more details.\\n\\nLink: \n" +
";\n" +
"    window.open(https://wa.me/919023791865?text=, '_blank');\n" +
"  };";

const newHandleEnquire = "  const proceedToWhatsApp = () => {\n" +
"    if (!product) return;\n" +
"    const text = Hi, I am interested in . Please provide more details.\\n\\nLink: \\n;\n" +
"    window.open(https://wa.me/919023791865?text=, '_blank');\n" +
"  };\n\n" +
"  const handleEnquire = () => {\n" +
"    if (!product) return;\n" +
"    if (!localStorage.getItem('lead_captured')) {\n" +
"      setShowLeadModal(true);\n" +
"    } else {\n" +
"      proceedToWhatsApp();\n" +
"    }\n" +
"  };";

content = content.replace(oldHandleEnquire, newHandleEnquire);

// 4. Inject modal before the final div
const modalComponent = 
      <LeadCaptureModal 
        isOpen={showLeadModal} 
        onClose={() => setShowLeadModal(false)}
        onSuccess={() => {
          setShowLeadModal(false);
          proceedToWhatsApp();
        }}
        title="Quick Inquiry"
        description={\Please enter your details to inquire about \.\}
        source="whatsapp_inquiry"
        productInterest={product?.title}
      />
    </div>
  );
};

content = content.replace("    </div>\n  );\n}", modalComponent);
content = content.replace("    </div>\r\n  );\r\n}", modalComponent);

fs.writeFileSync('src/pages/ProductDetail.tsx', content);
