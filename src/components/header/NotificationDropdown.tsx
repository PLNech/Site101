"use client";
import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="dropdown-toggle flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.034 4.05261C8.08 3.38047 9.282 3 10.5 3C13.531 3 16 5.46897 16 8.5V9.50388C16 9.81517 16.062 10.129 16.17 10.4189L16.92 12.6706C17.428 14.1977 16.401 15.9973 14.8 16.1965L13 16.4283V17C13 18.6569 11.657 20 10 20C8.343 20 7 18.6569 7 17V16.4283L5.2 16.1965C3.599 15.9973 2.572 14.1977 3.08 12.6706L3.83 10.4189C3.938 10.129 4 9.81517 4 9.50388V8.5C4 6.99001 4.59 5.62236 5.536 4.62455C5.517 4.55321 5.5 4.48072 5.5 4.42365V3.53876C5.5 3.15299 5.809 2.84232 6.195 2.84232C6.581 2.84232 6.89 3.15299 6.89 3.53876V4.42365C6.89 4.47065 6.875 4.5159 6.864 4.56192C6.919 4.39178 6.978 4.22373 7.034 4.05261ZM5.5 8.5V9.50388C5.5 10.0232 5.601 10.5388 5.789 11.0236L6.54 13.2753C6.66 13.6563 7.069 13.9212 7.46 13.8713L10 13.5624L12.54 13.8713C12.931 13.9232 13.34 13.6563 13.46 13.2753L14.211 11.0236C14.399 10.5388 14.5 10.0232 14.5 9.50388V8.5C14.5 6.294 12.706 4.5 10.5 4.5C8.294 4.5 6.5 6.294 6.5 8.5H5.5ZM10 18.5C9.172 18.5 8.5 17.828 8.5 17V16.8783L9.46 17.025C9.64 17.0571 9.82 17.0732 10 17.0732C10.18 17.0732 10.36 17.0571 10.54 17.025L11.5 16.8783V17C11.5 17.828 10.828 18.5 10 18.5Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[10px] flex w-[320px] flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <span className="rounded-full bg-primary/10 py-0.5 px-2 text-xs font-medium text-primary">3 nouvelles</span>
        </div>
        
        <div className="space-y-3 max-h-[350px] overflow-y-auto">
          <div className="flex gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-primary/10 text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Nouveau cours disponible</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Frontend Development with React</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Il y a 5 minutes</p>
            </div>
          </div>
          
          <div className="flex gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-secondary/10 text-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11L12 14L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H12V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Évaluation notée</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Algorithmes Fondamentaux - 16/20</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Hier</p>
            </div>
          </div>
          
          <div className="flex gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-accent/10 text-accent">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Rappel</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Rendu du projet prévu pour demain</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Il y a 2 jours</p>
            </div>
          </div>
        </div>
        
        <button className="mt-3 w-full rounded-lg text-center py-2 text-sm font-medium text-primary hover:bg-primary/5">
          Voir toutes les notifications
        </button>
      </Dropdown>
    </div>
  );
};

export default NotificationDropdown;