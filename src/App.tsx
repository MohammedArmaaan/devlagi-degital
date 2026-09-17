import { useRouter } from '@/hooks/useRouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Brochures from '@/pages/Brochures';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

import MobileBottomBar from '@/components/MobileBottomBar';

function App() {
  const { route, navigate } = useRouter();

  const renderPage = () => {
    switch (route.name) {
      case 'home':
        return <Home navigate={navigate} />;
      case 'services':
        return <Services navigate={navigate} />;
      case 'service':
        return <ServiceDetail slug={route.slug} navigate={navigate} />;
      case 'projects':
        return <Projects navigate={navigate} />;
      case 'project':
        return <ProjectDetail slug={route.slug} navigate={navigate} />;
      case 'products':
        return <Products navigate={navigate} />;
      case 'product':
        return <ProductDetail slug={route.slug} navigate={navigate} />;
      case 'brochures':
        return <Brochures navigate={navigate} />;
      case 'about':
        return <About navigate={navigate} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 pb-20 lg:pb-0 relative">
      <Navbar route={route} navigate={navigate} />
      <main key={route.name + ('slug' in route ? route.slug : '')} className="animate-fade-in">
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
      <MobileBottomBar route={route} navigate={navigate} />
    </div>
  );
}

export default App;
