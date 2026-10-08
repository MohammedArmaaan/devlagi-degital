import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Star, Download } from 'lucide-react';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { genericProducts } from '@/lib/data';

type Props = {
  slug: string;
  navigate: (path: string) => void;
};

export default function ProductDetail({ slug, navigate }: Props) {
  const product = genericProducts.find((p) => p.slug === slug);
  const relatedProducts = genericProducts.filter((p) => p.slug !== slug).slice(0, 3);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const [isHovered, setIsHovered] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [modalAction, setModalAction] = useState<() => void>(() => {});
  const [modalContext, setModalContext] = useState({ title: '', description: '', source: '' });
  
  const allImages = product ? [product.image, ...(product.gallery || [])] : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
  }, [slug, product]);

  const proceedToWhatsApp = () => {
    if (!product) return;
    const text = `Hi, I am interested in ${product.title}. Please provide more details.\n\nLink: \n${window.location.href}`;
    window.open(`https://wa.me/919023791865?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleEnquire = () => {
    if (!product) return;
    proceedToWhatsApp();
  };

  const executeAction = (context: any, actionFn: () => void) => {
    const capturedTime = localStorage.getItem('lead_captured_time');
    if (capturedTime && (Date.now() - parseInt(capturedTime, 10)) < 604800000) {
      actionFn();
    } else {
      setModalContext(context);
      setModalAction(() => actionFn);
      setShowLeadModal(true);
    }
  };

  const handleDownloadBrochure = () => {
    if (!product) return;
    executeAction({
      title: "Download Brochure",
      description: "",
      source: "download_brochure"
    }, () => {
      alert("Downloading brochure...");
      // Add actual download logic here
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-ink-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="heading-2 mb-4">Product Not Found</h1>
          <button onClick={() => navigate('/products')} className="px-8 py-3 bg-ink-900 text-white rounded-full font-sans text-xs tracking-widest uppercase hover:bg-burgundy-700 transition-colors">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ink-50 min-h-screen pt-24 md:pt-32 pb-20">
      <LeadCaptureModal 
        isOpen={showLeadModal} 
        onClose={() => setShowLeadModal(false)} 
        onSuccess={modalAction} 
        title={modalContext.title} 
        description={modalContext.description} 
        source={modalContext.source}
        productInterest={product?.title}
      />
      
      <div className="container-luxe max-w-6xl px-4 md:px-8 mx-auto">
        <FadeIn>
          <button onClick={() => navigate('/products')} className="flex items-center gap-2 text-ink-600 hover:text-burgundy-600 transition-colors duration-300 font-sans text-[10px] tracking-widest uppercase mb-8 md:mb-12 group">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Products
          </button>
        </FadeIn>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-20 lg:mb-32 items-center">
          
          {/* Image Side */}
          <FadeIn className="w-full lg:w-1/2">
            <div className="relative group">
              <div 
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-sm relative cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img 
                  src={allImages[selectedImageIndex]} 
                  alt={product.title} 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
                />
                {isHovered && (
                  <div 
                    className="absolute inset-0 bg-no-repeat transition-transform duration-200"
                    style={{
                      backgroundImage: `url(${allImages[selectedImageIndex]})`,
                      backgroundPosition: backgroundPosition,
                      backgroundSize: '200%' 
                    }}
                  />
                )}
              </div>
              

            </div>
          </FadeIn>

          {/* Text Side */}
          <FadeIn delay={0.2} className="w-full lg:w-1/2">
            <div className="flex flex-col">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-burgundy-600 font-bold mb-4 block flex items-center gap-2">
                <span className="w-8 h-px bg-burgundy-600" />
                Premium {product.category}
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ink-950 mb-6 leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="flex text-burgundy-600">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" strokeWidth={0} className="w-4 h-4" />)}
                </div>
                <span className="text-ink-500 text-xs font-sans tracking-wide uppercase">Top Rated</span>
              </div>

              <p className="text-ink-600 text-base md:text-lg mb-10 leading-relaxed font-sans max-w-lg">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10 text-sm font-sans text-ink-800">
                {product.features?.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-burgundy-500 rounded-full" />
                    {f}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleEnquire}
                  className="flex-1 bg-[#25D366] text-white py-4 px-6 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase hover:bg-[#128C7E] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  Enquire Now
                </button>
                <button 
                  onClick={handleDownloadBrochure}
                  className="flex-1 border border-ink-900 text-ink-900 py-4 px-6 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase hover:bg-ink-900 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Brochure
                </button>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Feature / Banner Area */}
        <FadeIn delay={0.3}>
          <div className="w-full h-64 md:h-80 relative overflow-hidden mb-24 lg:mb-32">
            <img src={allImages[1] || allImages[0]} alt="Showcase" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-ink-950/40 flex items-center justify-center p-8 text-center">
              <div>
                <h3 className="text-3xl md:text-5xl font-serif text-white mb-4">Elevate Your Decor</h3>
                <p className="text-white/80 font-sans text-sm md:text-base max-w-md mx-auto uppercase tracking-widest">
                  Experience the pinnacle of design and quality
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Other Products */}
        {relatedProducts.length > 0 && (
          <FadeIn>
            <div className="pt-10 border-t border-ink-200">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                <h2 className="text-2xl md:text-3xl font-serif text-ink-950">Other Products</h2>
                <button onClick={() => navigate('/products')} className="flex items-center gap-2 text-burgundy-600 font-sans text-[10px] tracking-widest uppercase hover:text-burgundy-800 transition-colors group">
                  View All Products <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
                {relatedProducts.map((relProduct) => (
                  <motion.div
                    key={relProduct.slug}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/products/${relProduct.slug}`)}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="w-full aspect-[4/3] overflow-hidden mb-4 relative">
                      <img src={relProduct.image} alt={relProduct.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-ink-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="font-sans text-[10px] tracking-widest uppercase text-burgundy-600 mb-2 block">{relProduct.category}</span>
                    <h3 className="text-base md:text-xl font-serif text-ink-950 group-hover:text-burgundy-700 transition-colors">{relProduct.title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
