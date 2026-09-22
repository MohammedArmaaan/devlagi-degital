import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import { categories } from '@/lib/data';

type Props = {
  slug: string;
  navigate: (path: string) => void;
};

export default function CategoryDetail({ slug, navigate }: Props) {
  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="heading-2 mb-4">Category Not Found</h1>
          <button onClick={() => navigate('/#')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f2ee] min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={category.image} 
            alt={category.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink-950/60" />
        </div>

        <div className="container-luxe relative z-10 text-center">
          <FadeIn>
            <button onClick={() => navigate('/collections')} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 font-sans text-xs tracking-wide-2 uppercase mb-8 group">
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Collections
            </button>
          </FadeIn>

          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <h1 className="heading-1 text-white mb-6">{category.title}</h1>
              <p className="body-text text-white/80 text-lg md:text-xl">
                {category.description}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-luxe max-w-6xl mx-auto">

        {category.subcategories && category.subcategories.length > 0 ? (
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {category.subcategories.map((sub) => (
                <div 
                  key={sub.id}
                  onClick={() => navigate(`/products`)}
                  className="group cursor-pointer bg-white overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={sub.image} 
                      alt={sub.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink-950/20 group-hover:bg-ink-950/10 transition-colors" />
                  </div>
                  <div className="p-4 md:p-6 text-center">
                    <h3 className="heading-3 !text-sm md:!text-xl text-ink-950 mb-2">{sub.title}</h3>
                    <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-burgundy-600 font-semibold group-hover:text-burgundy-800 transition-colors">
                      View Products →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.2}>
             <div className="text-center py-20">
               <p className="text-ink-600 font-sans">No subcategories found.</p>
               <button onClick={() => navigate('/products')} className="btn-primary mt-6">
                 View All Products
               </button>
             </div>
          </FadeIn>
        )}
        </div>
      </section>
    </div>
  );
}

