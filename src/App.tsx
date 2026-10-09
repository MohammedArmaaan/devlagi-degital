import React, { Component, ErrorInfo, ReactNode } from "react";

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", background: "white", color: "red", zIndex: 9999, position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
import { useRouter } from '@/hooks/useRouter';

// Public Layout Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import CookieBanner from '@/components/CookieBanner';

// Public Pages
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
import Collections from '@/pages/Collections';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Returns from '@/pages/Returns';
import CookiesPolicy from '@/pages/CookiesPolicy';


// Admin Layout & Pages
import AdminLayout from '@/layouts/AdminLayout';
import AdminLogin from '@/pages/admin/Login';
import AdminDashboard from '@/pages/admin/Dashboard';

function App() {
  const { route, navigate } = useRouter();

  const isAdminRoute = route.name.startsWith('admin');

  const renderPublicPage = () => {
    switch (route.name) {
      case 'home':
        return <Home   navigate={navigate} />;
      case 'services':
        return <Services   navigate={navigate} />;
      case 'service':
        return <ServiceDetail slug={route.slug}   navigate={navigate} />;
      case 'projects':
        return <Projects   navigate={navigate} />;
      case 'project':
        return <ProjectDetail slug={route.slug}   navigate={navigate} />;
      case 'products':
        return <Products   navigate={navigate} />;
      case 'product':
        return <ProductDetail slug={route.slug}   navigate={navigate} />;
      case 'collections':
        return <Collections navigate={navigate} />;
      case 'brochures':
        return <Brochures   navigate={navigate} />;
      case 'about':
        return <About   navigate={navigate} />;
      case 'contact':
        return <Contact />;
      case 'privacy':
        return <Privacy />;
      case 'terms':
        return <Terms />;
      case 'returns':
        return <Returns />;
      case 'cookies':
        return <CookiesPolicy />;
      
      default:
        return <Home   navigate={navigate} />;
    }
  };

  const renderAdminPage = () => {
    switch (route.name) {
      case 'admin-login':
        return <AdminLogin navigate={navigate} />;
      case 'admin-dashboard':
        return <AdminDashboard />;

      default:
        return <AdminDashboard />;
    }
  };

  // If it's an admin route, completely bypass the public layout


  // If it's an admin route, completely bypass the public layout
  if (isAdminRoute) {
    return (
      <AdminLayout currentRoute={route.name} navigate={navigate}>
        {renderAdminPage()}
      </AdminLayout>
    );
  }

  // Otherwise, render standard public layout
  return (
    <div className="min-h-screen bg-ink-50 pb-20 lg:pb-0 relative">
      <Navbar route={route} navigate={navigate} />
      <main key={route.name + ('slug' in route ? route.slug : '')} className="animate-fade-in">
        {renderPublicPage()}
      </main>
      <Footer navigate={navigate} />
      <MobileBottomBar route={route} navigate={navigate} />
      <CookieBanner />
    </div>
  );
}

export default App;









