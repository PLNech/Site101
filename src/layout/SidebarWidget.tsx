import React from "react";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";

type SidebarWidgetProps = {
  title: string;
  description: string;
  btnHref: string;
  btnText: string;
};

const SidebarWidget: React.FC<SidebarWidgetProps> = ({
  title,
  description,
  btnHref,
  btnText,
}) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div
      className={`widget-alert relative hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 sm:flex ${
        isExpanded || isHovered || isMobileOpen ? "flex-col" : "hidden"
      }`}
    >
      <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
        {title}
      </h4>
      <p className="mt-2 text-xs font-normal text-gray-500 dark:text-gray-500">
        {description}
      </p>
      <Link
        href={btnHref}
        className="mt-3 inline-flex h-10 min-w-20 items-center justify-center rounded-lg bg-brand-500 px-3 text-center text-xs font-medium text-white hover:bg-brand-600"
      >
        {btnText}
      </Link>
    </div>
  );
};

export default SidebarWidget; 