import { PROJECT_VARIANTS, ProjectVariant } from "@/constants/project-variants";
import { useState } from "react";

interface ProjectProps {
  title: string;
  description: string;
}

export function ProjectDetail({ description, title }: ProjectProps) {
  const [activeTab, setActiveTab] = useState<ProjectVariant>("board");
  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex min-w-0 flex-col gap-1.5">
        <h1 className="text-3xl font-semibold text-gray-900 wrap-break-word">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-sm text-gray-500 wrap-break-word line-clamp-3">
            {description}
          </p>
        )}
      </header>

      <nav className="flex items-center gap-2 mt-6" aria-label="Project views">
        {PROJECT_VARIANTS.map((item) => {
          const isActive = item.value === activeTab;
          const Icon = item.icon;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setActiveTab(item.value)}
              className={`flex items-center justify-center gap-2 select-none px-4 py-2.5 text-sm font-medium border-b-2 -mb-px cursor-pointer transition-colors ${
                isActive
                  ? "border-orange-400 text-orange-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
