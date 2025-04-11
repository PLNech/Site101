'use client';

import React, { FC, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';

// Icons
import { 
  Home, 
  Settings, 
  Users, 
  FileText, 
  Menu, 
  ChevronRight 
} from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: <Home className="w-5 h-5" />,
  },
  {
    name: 'Users',
    href: '/users',
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

const Sidebar: FC = () => {
  const { 
    expanded, 
    mobileOpen, 
    hovered, 
    setHovered, 
    toggleExpanded, 
    toggleMobileOpen 
  } = useSidebar();
  
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileOpen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node)) {
        toggleMobileOpen();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen, toggleMobileOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={toggleMobileOpen}
        />
      )}

      {/* Mobile Toggle Button */}
      <button 
        className="fixed top-4 left-4 z-30 lg:hidden"
        onClick={toggleMobileOpen}
        aria-label="Toggle Sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidebar fixed top-0 left-0 h-full z-30 bg-white shadow-lg transition-all duration-300 ease-in-out
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                    ${expanded || hovered ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">
              S
            </div>
            {(expanded || hovered) && (
              <span className="font-semibold text-lg">Site101</span>
            )}
          </Link>
          
          <button 
            onClick={toggleExpanded}
            className="hidden lg:flex items-center justify-center w-6 h-6 rounded-md hover:bg-gray-100"
            aria-label="Toggle Sidebar"
          >
            <ChevronRight className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="mt-6 px-2">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`menu-item flex items-center px-3 py-2 rounded-md transition-all
                                ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    {(expanded || hovered) && (
                      <span className="ml-3 menu-text">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar; 