"use client";
import React from "react";
import Link from "next/link";

interface DropdownItemProps {
  children: React.ReactNode;
  tag?: "a" | "button";
  href?: string;
  className?: string;
  onItemClick?: () => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  tag = "button",
  href = "#",
  className = "",
  onItemClick,
}) => {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  if (tag === "a") {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}; 