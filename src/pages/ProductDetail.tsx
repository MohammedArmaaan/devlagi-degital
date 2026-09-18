import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { productsList } from '@/lib/data';

type Props = {
  slug: string;
  navigate: (path: string) => void;
};

export default function ProductDetail({ slug, navigate }: Props) {
  const product = productsList.find((p) => p.slug === slug);
  const relatedProducts = productsList.filter((p) => p.category === product?.category && p.slug !== slug).slice(0, 3);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const [isHovered, setIsHovered] = useState(false);
  
  const allImages = product ? [product.image, ...(product.gallery || [])] : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
  }, [slug]);

  const handleEnquire = () => {
    if (!product) return;
    const text = `Hi, I am interested in ${product.title}. Please provide more details.\n\nLink: ${window.location.href}`;
    window.open(`https://wa.me/919023791865?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
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
      <div className="container-luxe max-w-6xl">
        <FadeIn>
          <button onClick={() => navigate('/products')} className="flex items-center gap-2 text-ink-600 hover:text-burgundy-600 transition-colors duration-300 font-sans text-xs tracking-wide-2 uppercase mb-8 group">
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back
          </button>
        </FadeIn>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 mb-16">
          
          {/* Left Column - Images (No Card Background) */}
          <FadeIn>
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex md:flex-col gap-3 overflow-x-auto md:w-20 shrink-0 order-2 md:order-1 custom-scrollbar pb-2 md:pb-0">
                    {allImages.map((img, i) => (
                      <button 
                        key={i} 
                        onClick={() => setSelectedImageIndex(i)}
                        className={`w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden cursor-pointer border transition-all ${selectedImageIndex === i ? 'border-ink-950 p-0.5' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      >
                        <img src={img} alt={`${product.title} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
                {/* Main Image */}
                <div 
                  className="flex-1 bg-[#f4f2ee] overflow-hidden order-1 md:order-2 aspect-[4/5] md:aspect-square relative cursor-crosshair group"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img 
                    src={allImages[selectedImageIndex]} 
                    alt={product.title} 
                    className={`w-full h-full object-cover object-center transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
                  />
                  {isHovered && (
                    <div 
                      className="absolute inset-0 bg-no-repeat transition-transform duration-200"
                      style={{
                        backgroundImage: `url(${allImages[selectedImageIndex]})`,
                        backgroundPosition: backgroundPosition,
                        backgroundSize: '200%' // Zoom factor
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Column - Details */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col pt-4 md:pt-8 md:pr-8">
              <h1 className="heading-3 md:!text-[32px] text-ink-950 uppercase mb-3 leading-snug">
                {product.title} - PREMIUM {product.category.toUpperCase()}
              </h1>
              
              <div className="flex items-center gap-2 mb-6 text-sm">
                <div className="flex text-burgundy-600">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" strokeWidth={0} className="w-3.5 h-3.5" />)}
                </div>
                <span className="text-[#8b867c] text-xs font-sans tracking-wide">(12 Reviews)</span>
              </div>

              <div className="font-serif text-3xl md:text-4xl text-ink-950 mb-2 font-medium">
                Rs. {product.price.toLocaleString('en-IN')}.00
              </div>
              <p className="text-[#8b867c] text-xs mb-8 font-sans tracking-wide">Tax included. Shipping calculated at checkout.</p>

              {/* Action Buttons */}
              <div className="flex flex-col mt-4">
                <button 
                  onClick={handleEnquire}
                  className="w-full h-14 bg-[#25D366] text-white text-[12px] font-sans font-bold tracking-widest uppercase hover:bg-[#128C7E] transition-colors shadow-lg flex items-center justify-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  Enquire via WhatsApp
                </button>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Product Details Card */}
        <FadeIn delay={0.2}>
          <div className="max-w-4xl mx-auto border-t border-ink-200/50 pt-16 md:pt-20 mb-24 relative">
            <h2 className="heading-3 md:!text-2xl text-ink-950 uppercase mb-8 pb-4">
              Product Details
            </h2>
            <h3 className="font-sans font-bold text-ink-950 mb-6 text-sm tracking-wide uppercase text-[#8b867c]">About this item</h3>
            
            <ul className="space-y-4 mb-12 pl-2">
              <li className="flex gap-4 text-[14px] md:text-[15px] text-[#4a4740] leading-relaxed font-sans">
                <div className="w-1.5 h-1.5 rounded-sm bg-burgundy-400 mt-2 shrink-0" />
                <p><strong className="text-ink-950 capitalize">{product.category} blend:</strong> {product.description}</p>
              </li>
              {product.features?.map((f, i) => (
                <li key={i} className="flex gap-4 text-[14px] md:text-[15px] text-[#4a4740] leading-relaxed font-sans">
                  <div className="w-1.5 h-1.5 rounded-sm bg-burgundy-400 mt-2 shrink-0" />
                  <p><strong className="text-ink-950 capitalize">{f.split(' ')[0]}:</strong> {f}</p>
                </li>
              ))}
            </ul>

            {/* Rich Imagery Banners (mockup) */}
            <div className="w-full h-48 md:h-64 bg-ink-950 overflow-hidden relative mb-4 group">
              <img src={product.image} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/50 to-transparent flex items-center p-8 md:p-12">
                <div className="text-white max-w-md">
                  <h4 className="heading-2 md:!text-4xl text-white mb-2">{product.title.split(' ')[0].toUpperCase()}</h4>
                  <p className="text-xs md:text-sm opacity-80 uppercase tracking-widest font-sans">Premium {product.category} Collection</p>
                </div>
              </div>
            </div>
            
            {allImages.length > 1 && (
              <div className="w-full h-32 md:h-40 bg-ink-100 overflow-hidden relative group">
                <img src={allImages[1]} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-ink-950/30 flex items-center justify-center p-8 backdrop-blur-[2px]">
                   <h4 className="heading-3 md:!text-2xl text-white tracking-widest uppercase">Elevate Your Space</h4>
                </div>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <FadeIn>
            <div className="border-t border-ink-200/50 pt-16 md:pt-20">
              <div className="flex items-center justify-between mb-8 md:mb-10">
                <h2 className="heading-3 md:!text-2xl text-ink-950 uppercase tracking-widest">Related Products</h2>
                <button onClick={() => navigate('/products')} className="flex items-center gap-2 text-burgundy-600 font-sans text-xs tracking-wide-2 uppercase hover:text-burgundy-800 transition-colors group">
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
                    <div className="p-4 md:p-6 flex flex-col flex-1 bg-white">
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
