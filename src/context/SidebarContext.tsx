"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SidebarContextType {
  expanded: boolean;
  mobileOpen: boolean;
  hovered: boolean;
  setExpanded: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
  setHovered: (value: boolean) => void;
  toggleExpanded: () => void;
  toggleMobileOpen: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Close mobile sidebar when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen]);

  const toggleExpanded = () => setExpanded(prev => !prev);
  const toggleMobileOpen = () => setMobileOpen(prev => !prev);

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        mobileOpen,
        hovered,
        setExpanded,
        setMobileOpen,
        setHovered,
        toggleExpanded,
        toggleMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext; 