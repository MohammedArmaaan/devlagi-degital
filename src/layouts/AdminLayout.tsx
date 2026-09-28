import React, { useState, useEffect } from 'react';
import { LogOut, LayoutDashboard, Users, Menu, X, ShieldCheck } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  navigate: (path: string) => void;
  currentRoute: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, navigate, currentRoute }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const token = localStorage.getItem('adminToken');
  // Protect routes
  useEffect(() => {
    if (!token && currentRoute !== 'admin-login') {
      navigate('/admin/login');
    }
  }, [token, currentRoute, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (currentRoute === 'admin-login') {
    return <>{children}</>;
  }

  if (!token) {
    return null; // Prevent rendering the protected design if unauthenticated
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', routeName: 'admin-dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="flex h-screen bg-ink-50 overflow-hidden font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-ink-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-ink-950 text-white transition-transform duration-300 transform shadow-2xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:translate-x-0 flex flex-col`}
      >
        <div className="flex items-center justify-between h-20 px-8 border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy-900/20 to-transparent"></div>
          <div className="relative z-10 flex items-center">
            <ShieldCheck size={28} className="text-gold-400 mr-3" />
            <span className="text-2xl font-serif font-bold text-white tracking-wide">
              Devlagi<span className="text-gold-400 italic">Admin</span>
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/50 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.routeName;
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-5 py-4 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-burgundy-600 text-white shadow-lg shadow-burgundy-900/50 scale-[1.02]' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? "text-gold-100" : ""} />
                <span className="ml-4 font-medium tracking-wide">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-xl">
             <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">System</p>
             <p className="text-sm text-white/80">All services operational.</p>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-ink-100 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="mr-5 text-ink-500 hover:text-burgundy-600 lg:hidden focus:outline-none transition-colors"
            >
              <Menu size={28} />
            </button>
            <h1 className="text-2xl font-serif font-bold text-ink-950 hidden sm:block tracking-wide">
              {navItems.find(i => i.routeName === currentRoute)?.name || 'Admin Panel'}
            </h1>
          </div>

          <div className="flex items-center">
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-ink-600 hover:bg-burgundy-50 hover:text-burgundy-700 transition-colors uppercase tracking-wider"
            >
              <LogOut size={16} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 bg-ink-50">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


