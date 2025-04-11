"use client";
import React from 'react';
import Link from "next/link";
import UserDropdown from "@/components/header/UserDropdown";
import NotificationDropdown from "@/components/header/NotificationDropdown";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 flex items-center justify-between px-6 sm:px-10 border-b border-border h-16">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="font-mono text-white font-bold">101</span>
          </div>
          <h1 className="font-bold text-xl">École 101</h1>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <NotificationDropdown />
        </div>
        <UserDropdown />
      </div>
    </header>
  );
} 