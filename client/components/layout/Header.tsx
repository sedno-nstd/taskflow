"use client";
import { useState } from "react";
import { LogoIcon } from "../icons/LogoIcon";
import { Input } from "../ui/Input";
import { Search } from "lucide-react";
import { UserMenu } from "../auth/UserMenu";
import { usePathname } from "next/navigation";
import { APP_ROUTES } from "@/constants/route";
import Link from "next/link";

export function Header() {
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const isAuthPage =
    pathname === (`${APP_ROUTES.LOGIN}` || `${APP_ROUTES.REGISTER}`);

  return (
    <header className="w-full h-20 flex items-center justify-between px-10">
      <Link href={APP_ROUTES.HOME} className="flex items-center gap-2">
        <LogoIcon />
        <span className="text-xl font-medium">Taskflow</span>
      </Link>

      {!isAuthPage && (
        <div className="w-96">
          <Input
            className="h-10"
            leftIcon={<Search className="h-4 w-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>
      )}

      <UserMenu />
    </header>
  );
}
