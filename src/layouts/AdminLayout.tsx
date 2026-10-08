import { apiClient } from '@/lib/axios';
import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  LayoutDashboard, 
  Users, 
  Menu, 
  X, 
  ShieldCheck, 
  Phone,
  ChevronDown,
  ChevronRight,
  Package,
  Grid,
  List, BookOpen, Folder,
  Box, Image,
  MessageSquare,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  navigate: (path: string) => void;
  currentRoute: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, navigate, currentRoute }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [leadsMenuOpen, setLeadsMenuOpen] = useState(false);
  const [contentMenuOpen, setContentMenuOpen] = useState(false);
  
  const token = localStorage.getItem('adminToken');
  
  // Auto-open product menu if we're on a product management route
  useEffect(() => {
    if (currentRoute === 'admin-categories' || currentRoute === 'admin-subcategories' || currentRoute === 'admin-products') {
      setProductMenuOpen(true);
    }
    if (currentRoute === 'admin-visitors' || currentRoute === 'admin-inquiries' || currentRoute === 'admin-whatsapp') {
      setLeadsMenuOpen(true);
    }
    if (currentRoute === 'admin-banners' || currentRoute === 'admin-services' || currentRoute === 'admin-brochures' || currentRoute === 'admin-projects') {
      setContentMenuOpen(true);
    }
  }, [currentRoute]);

  // Protect routes
  useEffect(() => {
    if (!token && currentRoute !== 'admin-login') {
      navigate('/admin/login');
    }
  }, [token, currentRoute, navigate]);

  const handleLogout = async () => {
    try {
      await apiClient.post('/admin/logout');
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  if (currentRoute === 'admin-login') {
    return <>{children}</>;
  }

  if (!token) {
    return null; 
  }

  const isProductActive = currentRoute === 'admin-categories' || currentRoute === 'admin-subcategories' || currentRoute === 'admin-products';

  const routeTitles: Record<string, string> = {
    'admin-dashboard': 'Dashboard',
    'admin-visitors': 'Visitors',
    'admin-inquiries': 'Inquiries',
        'admin-banners': 'Banners',
    'admin-services': 'Services',
    'admin-whatsapp': 'WhatsApp Settings',
    'admin-categories': 'Categories',
    'admin-subcategories': 'Sub-Categories',
    'admin-products': 'Products',
  };

  const getPageTitle = () => routeTitles[currentRoute] || 'Admin Panel';

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-transform duration-300 transform shadow-xl lg:shadow-none lg:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static`}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <ShieldCheck size={18} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Devlagi<span className="text-indigo-600 font-medium">Admin</span>
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600 focus:outline-none">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
            
            <button
              onClick={() => { navigate('/admin'); setSidebarOpen(false); }}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'admin-dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <LayoutDashboard size={18} className={currentRoute === 'admin-dashboard' ? 'text-indigo-600' : 'text-slate-400'} />
              <span className="ml-3">Dashboard</span>
            </button>

            {/* Lead Management Dropdown */}
            <div>
              <button
                onClick={() => setLeadsMenuOpen(!leadsMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <div className="flex items-center">
                  <Users size={18} className="text-slate-400" />
                  <span className="ml-3">Lead Management</span>
                </div>
                {leadsMenuOpen ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
              </button>
              
              {leadsMenuOpen && (
                <div className="mt-1 space-y-1 pl-11 pr-2">
                  <button
                    onClick={() => { navigate('/admin/visitors'); setSidebarOpen(false); }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'admin-visitors' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    Visitors
                  </button>
                  <button
                    onClick={() => { navigate('/admin/inquiries'); setSidebarOpen(false); }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'admin-inquiries' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    Inquiries
                  </button>
                  <button
                    onClick={() => { navigate('/admin/whatsapp'); setSidebarOpen(false); }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'admin-whatsapp' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    WhatsApp
                  </button>
                </div>
              )}
            </div>

            {/* Content Management Dropdown */}
            <div>
              <button
                onClick={() => setContentMenuOpen(!contentMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <div className="flex items-center">
                  <Grid size={18} className="text-slate-400" />
                  <span className="ml-3">Content Management</span>
                </div>
                {contentMenuOpen ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
              </button>
              
              {contentMenuOpen && (
                <div className="mt-1 space-y-1 pl-11 pr-2">
                  <button
                    onClick={() => { navigate('/admin/banners'); setSidebarOpen(false); }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'admin-banners' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    Banners
                  </button>
                  <button
                    onClick={() => { navigate('/admin/services'); setSidebarOpen(false); }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'admin-services' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    Services
                  </button>
                  <button
                    onClick={() => { navigate('/admin/brochures'); setSidebarOpen(false); }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'admin-brochures' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    Brochures
                  </button>
                  <button
                    onClick={() => { navigate('/admin/projects'); setSidebarOpen(false); }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'admin-projects' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    Projects
                  </button>
                </div>
              )}
            </div>

            {/* Product Management Dropdown */}
            <div>
              <button
                onClick={() => setProductMenuOpen(!productMenuOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isProductActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <div className="flex items-center">
                  <Package size={18} className={isProductActive ? 'text-indigo-600' : 'text-slate-400'} />
                  <span className="ml-3">Product Management</span>
                </div>
                {productMenuOpen ? (
                  <ChevronDown size={16} className={isProductActive ? 'text-indigo-600' : 'text-slate-400'} />
                ) : (
                  <ChevronRight size={16} className={isProductActive ? 'text-indigo-600' : 'text-slate-400'} />
                )}
              </button>
              
              {productMenuOpen && (
                <div className="mt-1 space-y-1 pl-11 pr-2">
                  <button
                    onClick={() => { navigate('/admin/categories'); setSidebarOpen(false); }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'admin-categories' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    Categories
                  </button>
                  <button
                    onClick={() => { navigate('/admin/subcategories'); setSidebarOpen(false); }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'admin-subcategories' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    Sub-Categories
                  </button>
                  <button
                    onClick={() => { navigate('/admin/products'); setSidebarOpen(false); }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentRoute === 'admin-products' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    Products
                  </button>
                </div>
              )}
            </div>

          </nav>

        {/* Footer Area */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors border border-transparent hover:border-red-100"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-8 bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 -ml-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md lg:hidden focus:outline-none transition-colors"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight truncate">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full text-green-700 text-xs font-semibold tracking-wide">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               System Active
             </div>
             
             <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
               A
             </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full animate-fade-in pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
