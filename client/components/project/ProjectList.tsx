import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects: projects }: ProjectListProps) {
  return (
    <div className="flex flex-col w-full h-full gap-3">
      {projects.map((item) => (
        <ProjectCard
          key={item.id}
          description={item.description}
          id={item.id}
          name={item.name}
        />
      ))}
    </div>
  );
}
