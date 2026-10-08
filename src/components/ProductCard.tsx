import { MessageCircle } from 'lucide-react';
import TiltCard from './TiltCard';
import { useLeadGatekeeper } from '@/contexts/LeadContext';

export interface ProductCardProps {
  product: any;
  onNavigate: (slug: string) => void;
  onEnquire: (e: React.MouseEvent, product: any) => void;
  delay?: number;
}

export default function ProductCard({ product, onNavigate, onEnquire, delay = 0 }: ProductCardProps) {
  const { requireLead } = useLeadGatekeeper();
  let imageUrl = product.thumbnail_image_url || product.thumbnail_image || product.image_url || product.image || '';
  if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
    imageUrl = 'https://devlajidigital.com/backend/storage/app/public/' + imageUrl;
  }
  const title = product.product_name || product.title || '';
  const price = product.sell_price || product.mrp || 0;
  const categoryName = product.category?.category_name || product.category_name || 'Latest';
  const slug = product.slug || product.id;

  return (
    <TiltCard intensity={2} className="h-full">
      <div 
        role="button"
        tabIndex={0}
        onClick={() => requireLead(() => onNavigate(slug), { title: 'View Product Details', description: 'Please share your details to view this product.', source: 'product_detail', productInterest: title })}
        className="group relative w-full aspect-[4/5] overflow-hidden rounded-none bg-ink-100 cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500"
      >
        {/* Background Image */}
        <img 
          src={imageUrl} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
        />

        {/* Overlay dark gradient for text legibility in normal state */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-0" />

        {/* New Badge */}
        {product.is_new && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-burgundy-600 text-white px-2 py-0.5 md:px-2.5 md:py-1 rounded-none z-10 shadow-sm">
            <span className="font-sans text-[8px] md:text-[9px] tracking-[0.2em] uppercase font-bold">New</span>
          </div>
        )}

        {/* Normal State Text (visible when NOT hovered) */}
        <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex flex-col justify-end transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:-translate-y-4">
          <span className="text-[8px] md:text-[10px] uppercase text-white/80 tracking-widest font-bold mb-1 line-clamp-1">{categoryName}</span>
          <h3 className="text-white font-serif text-sm md:text-lg leading-snug line-clamp-2 shadow-sm">{title}</h3>
        </div>

        {/* Hover State White Box */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-none p-3 md:p-5 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.25,1,0.5,1] flex flex-col">
          <span className="text-[8px] md:text-[10px] uppercase text-ink-500 tracking-widest font-bold mb-1 line-clamp-1">{categoryName}</span>
          <h3 className="text-ink-950 font-serif text-sm md:text-lg leading-snug line-clamp-2 mb-2 md:mb-3">{title}</h3>
          
          <div className="flex flex-col gap-2 md:gap-3">
            {price > 0 && (
              <span className="font-bold text-ink-950 text-xs md:text-base">?{price.toLocaleString('en-IN')}</span>
            )}
            <div className="flex gap-1.5 md:gap-2">
              
              <button 
                onClick={(e) => { e.stopPropagation(); onEnquire(e, product); }} 
                className="flex-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] text-white rounded-none py-1.5 md:py-2 text-[8px] md:text-[9px] font-bold tracking-widest transition-all flex items-center justify-center gap-1 md:gap-1.5 shadow-sm hover:shadow-md"
              >
                <MessageCircle className="w-3 h-3 md:w-3.5 md:h-3.5"/> INQUIRE
              </button>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}


