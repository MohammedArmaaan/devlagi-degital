const fs = require('fs');
let content = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf-8');

content = content.replace(
  "import { productsList } from '@/lib/data';",
  "import { productsList } from '@/lib/data';\nimport LeadCaptureModal from '@/components/LeadCaptureModal';"
);

content = content.replace(
  "const [isHovered, setIsHovered] = useState(false);",
  "const [isHovered, setIsHovered] = useState(false);\n  const [showLeadModal, setShowLeadModal] = useState(false);"
);

const oldHandleEnquire =   const handleEnquire = () => {
    if (!product) return;
    const text = \Hi, I am interested in \. Please provide more details.\\n\\nLink: \n\\;
    window.open(\https://wa.me/919023791865?text=\\, '_blank');
  };;

const newHandleEnquire =   const proceedToWhatsApp = () => {
    if (!product) return;
    const text = \Hi, I am interested in \. Please provide more details.\\n\\nLink: \\n\\;
    window.open(\https://wa.me/919023791865?text=\\, '_blank');
  };

  const handleEnquire = () => {
    if (!product) return;
    if (!localStorage.getItem('lead_captured')) {
      setShowLeadModal(true);
    } else {
      proceedToWhatsApp();
    }
  };;

content = content.replace(oldHandleEnquire, newHandleEnquire);

// Now append LeadCaptureModal at the bottom, before closing div.
content = content.replace(
  "    </div>\n  );\n}",
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
      />\n    </div>\n  );\n}
);

fs.writeFileSync('src/pages/ProductDetail.tsx', content);
