"use client";
import { NAVIGATION } from "@/constants/navidation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathName = usePathname();

  return (
    <aside className="w-full max-w-56 shrink-0 h-full flex py-4 px-2 transition-all duration-200 mt-2">
      <nav className="flex flex-col w-full gap-1 py-4 px-6">
        <span className="text-sm font-light text-gray-800 mb-2">General</span>
        {NAVIGATION.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === pathName;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`pl-4 py-1.5 select-none hover:bg-gray-200 w-full  rounded-lg flex flex-row gap-2 ${isActive ? "text-black bg-gray-50" : "text-gray-600"}`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-md">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
