import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
  onDelete: (id: string) => Promise<void> | void;
  onEdit: (project: Project) => void;
}

export function ProjectList({ onDelete, onEdit, projects }: ProjectListProps) {
  return (
    <div className="flex flex-col w-full h-full gap-3">
      {projects.map((item) => (
        <ProjectCard
          key={item.id}
          description={item.description || ""}
          onDelete={() => onDelete(item.id)}
          onEdit={() => onEdit(item)}
          id={item.id}
          name={item.name}
        />
      ))}
    </div>
  );
}
