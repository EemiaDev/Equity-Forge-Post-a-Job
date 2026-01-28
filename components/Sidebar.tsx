
import React from 'react';
import { Screen } from '../types';

interface SidebarProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, setScreen }) => {
  const navItems = [
    { id: 'dashboard' as Screen, label: 'Home', icon: 'home' },
    { id: 'jobs' as Screen, label: 'Jobs', icon: 'work' },
    { id: 'team' as Screen, label: 'Team', icon: 'group' },
    { id: 'reports' as Screen, label: 'Reports', icon: 'monitoring' },
    { id: 'messages' as Screen, label: 'Messages', icon: 'chat' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 sticky top-24 self-start">
      <div className="mb-8 flex items-center space-x-3 px-2">
        <div className="w-10 h-10 bg-[#10b981] rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-white font-extrabold text-xl leading-none">C</span>
        </div>
        <div>
          <h3 className="font-bold text-sm">Consigo</h3>
          <p className="text-xs text-gray-500 truncate w-32">Curated lifestyle pro...</p>
        </div>
      </div>
      
      <button className="w-full bg-primary text-white py-2.5 px-4 rounded font-medium text-sm mb-8 hover:bg-blue-700 transition-colors shadow-sm">
        Edit Page
      </button>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded font-medium transition-colors ${
              currentScreen === item.id 
              ? 'text-primary bg-blue-50 dark:bg-blue-900/20' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        <div className="pt-8">
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded font-medium transition-colors">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span>Settings</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};
