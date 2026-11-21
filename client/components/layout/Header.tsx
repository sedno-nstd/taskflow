"use client";

import { useState } from "react";
import { LogoIcon } from "../icons/LogoIcon";
import { Input } from "../ui/Input";
import { Search } from "lucide-react";

export function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="w-full h-20 flex items-center justify-between px-10">
      <div className="flex gap-2">
        <LogoIcon />
        <span className="text-xl text-black font-medium">Taskflow</span>
      </div>
      <div className="w-96">
        <Input
          className="h-10 text-black"
          leftIcon={<Search className="h-10 w-6" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div>asd</div>
    </header>
  );
}
