import { useEffect } from 'react';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 md:mb-32">
          <div className="lg:col-span-7">
            <FadeIn>
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="aspect-[4/3] w-full rounded-sm overflow-hidden bg-ink-100 relative">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  {product.isNewArrival && (
                    <div className="absolute top-4 right-4 bg-burgundy-600 text-white px-3 py-1.5 rounded-sm">
                      <span className="font-sans text-xs tracking-wide-2 uppercase">New</span>
                    </div>
                  )}
                </div>
                {product.gallery && product.gallery.length > 1 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {product.gallery.map((img, i) => (
                      <div key={i} className="aspect-square rounded-sm overflow-hidden bg-ink-100">
                        <img src={img} alt={`${product.title} gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5">
            <FadeIn delay={0.2}>
              <div className="sticky top-32">
                <span className="font-sans text-xs tracking-wide-2 uppercase text-burgundy-600 mb-3 block">{product.category}</span>
                <h1 className="heading-2 mb-4">{product.title}</h1>
                <div className="font-serif text-3xl text-ink-950 mb-6 font-medium">₹{product.price.toLocaleString('en-IN')} <span className="text-sm text-ink-500 font-sans font-normal">(Base price / roll or sq.ft)</span></div>
                
                <div className="gold-divider-left mb-6" />
                
                <p className="body-text text-lg mb-8">{product.description}</p>

                <div className="bg-grain rounded-sm p-6 mb-8 border border-ink-200/50">
                  <h3 className="font-sans text-sm tracking-wide-2 uppercase text-ink-900 mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-ink-700">
                        <div className="w-5 h-5 rounded-full bg-gold-400/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-gold-600" />
                        </div>
                        <span className="body-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-sm p-6 border border-ink-200/50 shadow-sm">
                  <h3 className="heading-4 mb-4">Interested in this product?</h3>
                  <p className="body-text text-sm mb-6">Leave your details and our team will get back to you with a customized quote based on your measurements.</p>
                  <EnquiryForm defaultService={product.title} compact />
                </div>
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

