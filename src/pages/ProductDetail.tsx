import { useEffect, useState } from 'react';
import { ArrowLeft, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import EnquiryForm from '@/components/EnquiryForm';
import { productsList } from '@/lib/data';

type Props = {
  slug: string;
  navigate: (path: string) => void;
};

export default function ProductDetail({ slug, navigate }: Props) {
  const product = productsList.find((p) => p.slug === slug);
  const relatedProducts = productsList.filter((p) => p.category === product?.category && p.slug !== slug).slice(0, 3);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const allImages = product ? [product.image, ...(product.gallery || [])] : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
  }, [slug]);

  const handleShare = async () => {
    if (!product) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          text: `Check out this beautiful ${product.title} from Annai Jewellers!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="heading-2 mb-4">Product Not Found</h1>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 md:pt-32 pb-20">
      <div className="container-luxe">
        <FadeIn>
          <button onClick={() => navigate('/products')} className="flex items-center gap-2 text-ink-600 hover:text-burgundy-600 transition-colors duration-300 font-sans text-sm tracking-wide-2 uppercase mb-8 md:mb-12 group">
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Products
          </button>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 md:mb-32">
          {/* Left Column - Images */}
          <div className="flex flex-col gap-4">
            <FadeIn>
              <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-[#f4f2ee]">
                <img src={allImages[selectedImageIndex]} alt={product.title} className="w-full h-full object-cover transition-all duration-300" />
                <button 
                  onClick={handleShare}
                  className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform text-ink-600 hover:text-burgundy-600 z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
              </div>
            </FadeIn>
            
            {allImages.length > 1 && (
              <FadeIn delay={0.1}>
                <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
                  {allImages.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedImageIndex(i)}
                      className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden cursor-pointer border-2 transition-all shadow-sm snap-start ${selectedImageIndex === i ? 'border-blue-500 scale-95 opacity-100' : 'border-transparent hover:border-ink-200 opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`${product.title} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="flex flex-col">
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#f0eee9] text-[#6b665c] px-3 py-1.5 rounded-full font-sans text-xs font-bold tracking-wide uppercase">
                  {product.category}
                </span>
                <span className="text-[#6b665c] font-sans text-xs font-bold tracking-wide uppercase">
                  {product.category} COLLECTION
                </span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl text-ink-950 mb-6 italic leading-tight">
                {product.title}
              </h1>
              
              <div className="font-serif text-3xl md:text-4xl text-ink-950 mb-8 font-medium flex items-baseline gap-2">
                ₹{product.price.toLocaleString('en-IN')} 
                <span className="font-sans text-sm font-semibold tracking-wider text-[#8b867c] uppercase">
                  / PIECE
                </span>
              </div>
              
              <div className="w-full h-px bg-ink-200/40 mb-8" />
              
              {/* Description */}
              <div className="mb-12">
                <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-[#8b867c] mb-3">About this piece</h3>
                <p className="body-text text-[15px] text-[#4a4740] leading-relaxed">
                  {product.description}
                </p>
                {/* Adding feature list if available, blending into description */}
                {product.features && product.features.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-[15px] text-[#4a4740]">
                        <span className="w-1 h-1 rounded-full bg-burgundy-400 block" /> {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-auto">
                <button 
                  onClick={() => {
                    const text = `Hi, I am interested in ${product.title}. Please provide more details.\n\nLink: ${window.location.href}`;
                    window.open(`https://wa.me/919023791865?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="flex-1 bg-[#22c55e] hover:bg-[#1ea34d] text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-2 font-sans font-bold text-sm tracking-wide transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Inquire on WhatsApp
                </button>
              </div>
            </FadeIn>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <FadeIn>
            <div className="border-t border-ink-200/50 pt-16 md:pt-20">
              <div className="flex items-center justify-between mb-8 md:mb-10">
                <h2 className="heading-3">Related Products</h2>
                <button onClick={() => navigate('/products')} className="flex items-center gap-2 text-burgundy-600 font-sans text-xs md:text-sm tracking-wide-2 uppercase group hover:text-burgundy-800 transition-colors">
                  View All <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {relatedProducts.map((relProduct) => (
                  <motion.button
                    key={relProduct.slug}
                    whileHover={{ y: -6 }}
                    onClick={() => navigate(`/products/${relProduct.slug}`)}
                    className="card-luxe group flex flex-col glass-shine text-left"
                  >
                    <div className="aspect-square overflow-hidden relative w-full">
                      <img src={relProduct.image} alt={relProduct.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-3 md:p-6 flex flex-col flex-1">
                      <span className="font-sans text-[10px] md:text-xs tracking-wide-2 uppercase text-burgundy-600 mb-1 md:mb-2 block truncate">{relProduct.category}</span>
                      <h3 className="heading-3 text-sm md:!text-xl mb-2 md:mb-3 group-hover:text-burgundy-700 transition-colors duration-500">{relProduct.title}</h3>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-serif text-base md:text-xl text-ink-950 font-medium">₹{relProduct.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

