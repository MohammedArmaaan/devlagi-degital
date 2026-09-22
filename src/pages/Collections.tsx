import { useEffect } from 'react';
import FadeIn from '@/components/FadeIn';
import { categories } from '@/lib/data';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import AnimatedText from '@/components/AnimatedText';

type Props = {
  navigate: (path: string) => void;
};

export default function Collections({ navigate }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f4f2ee] min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920" 
            alt="Collections"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink-950/60" />
        </div>

        <div className="container-luxe relative z-10">
          <FadeIn>
            <button onClick={() => navigate('/#')} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 font-sans text-xs tracking-wide-2 uppercase mb-8 group">
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </button>
          </FadeIn>

          <FadeIn>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 mb-6 font-sans text-xs tracking-widest uppercase text-white/90 font-semibold">
                <span className="w-8 h-px bg-white/50" />
                Our Range
              </div>
              <h1 className="heading-1 text-white mb-6">
                <AnimatedText text="Collections" />
              </h1>
              <p className="body-text text-white/80 text-lg md:text-xl max-w-2xl">
                Explore our complete range of premium wallpapers, wall panels, and decorative materials designed to elevate any interior space.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container-luxe max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <FadeIn key={cat.slug} delay={i * 0.1}>
                <button
                  onClick={() => navigate(`/category/${cat.slug}`)}
                  className="group w-full text-left relative overflow-hidden rounded-sm shadow-sm hover:shadow-xl transition-all duration-700 bg-white flex flex-col h-full"
                >
                  <div className="aspect-[4/3] relative overflow-hidden w-full">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink-950/20 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-1 text-center relative z-10 bg-white group-hover:-translate-y-1.5 transition-transform duration-500 border-t-2 border-burgundy-600">
                    <h3 className="heading-3 text-ink-950 mb-2">{cat.title}</h3>
                    <p className="body-text text-xs text-ink-600 mb-4 line-clamp-2 flex-1">{cat.description}</p>
                    <span className="inline-flex items-center justify-center gap-1.5 font-sans text-[10px] uppercase tracking-widest font-semibold text-burgundy-600 group-hover:text-burgundy-800 transition-colors mt-auto">
                      View Collection <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

