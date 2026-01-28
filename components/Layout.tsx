
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const Header: React.FC = () => (
  <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center font-bold text-white shadow-sm">
          <span className="text-sm tracking-tighter">EF</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Equity Forge</span>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-6 text-sm font-medium">
          <span className="text-slate-600 dark:text-slate-400">Find Talent</span>
          <span className="text-slate-600 dark:text-slate-400">Find Investors</span>
        </div>
        <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-8">
          <button className="text-slate-500 hover:text-primary flex items-center">
            <span className="material-symbols-outlined text-[22px]">mail</span>
          </button>
          <button className="text-slate-500 hover:text-primary relative flex items-center">
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          <div className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-1.5 rounded-lg transition-colors border border-transparent">
            <img alt="User profile" className="w-8 h-8 rounded-full border border-slate-200 object-cover" src="https://picsum.photos/seed/jordan/100/100" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Jordan</span>
            <span className="material-symbols-outlined text-lg text-slate-400">expand_more</span>
          </div>
        </div>
      </nav>
    </div>
  </header>
);

export const Footer: React.FC = () => (
  <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Company</h3>
          <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <li><a className="hover:text-primary" href="#">About Us</a></li>
            <li><a className="hover:text-primary" href="#">Careers</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Support</h3>
          <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <li><a className="hover:text-primary" href="#">Contact Us</a></li>
            <li><a className="hover:text-primary" href="#">Privacy</a></li>
            <li><a className="hover:text-primary" href="#">Terms</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Resources</h3>
          <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <li><a className="hover:text-primary" href="#">Startup Directory</a></li>
            <li><a className="hover:text-primary" href="#">Nonprofit Directory</a></li>
            <li><a className="hover:text-primary" href="#">Dynamic Equity 101</a></li>
            <li><a className="hover:text-primary" href="#">Case Studies</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">Newsletter</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Stay updated with the latest in equity management.</p>
          <div className="flex gap-2">
            <input className="flex-grow rounded-lg border-slate-200 dark:bg-slate-800 text-sm focus:ring-primary" placeholder="Your email" type="email" />
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 dark:border-slate-800 pt-8 text-center text-sm text-slate-400">
        © 2025 Equity Forge. All rights reserved.
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<LayoutProps> = ({ children, showHeader = true, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      {showHeader && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};
