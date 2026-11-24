import { PROJECT_VARIANTS, ProjectVariant } from "@/constants/project-variants";
import { useState } from "react";

interface ProjectProps {
  title: string;
  description: string;
}

export function ProjectCard({ description, title }: ProjectProps) {
  const [activeTab, setActiveTab] = useState<ProjectVariant>("board");
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-xl">{title}</h1>
      <span className="text-lg text-gray-500">{description}</span>

      {PROJECT_VARIANTS.map((item) => {
        const currentTab = item.value;
        const Icon = item.icon;

        return (
          <button
            key={item.value}
            className={`${activeTab ? "text-orange-400" : "text-gray-500"}`}
            onClick={() => setActiveTab(item.value)}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
