"use client";
import { NAVIGATION } from "@/constants/navidation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathName = usePathname();

  return (
    <aside className="w-full max-w-56 shrink-0 h-full flex py-4 px-2 transition-all duration-200 mt-2">
      <nav className="flex flex-col w-full gap-1 py-4 px-6">
        <span className="text-sm font-medium text-gray-800 mb-2">General</span>
        {NAVIGATION.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathName === "/"
              : pathName === item.href || pathName.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium select-none transition-all duration-150 ${
                isActive
                  ? "bg-white text-gray-900 shadow-xs ring-1 ring-gray-200/70"
                  : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 transition-colors ${
                  isActive
                    ? "text-orange-500"
                    : "text-gray-400 group-hover:text-gray-700"
                }`}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
