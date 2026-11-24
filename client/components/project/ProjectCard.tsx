import { APP_ROUTES } from "@/constants/route";
import { Project } from "@/types/project";
import Link from "next/link";

type ProjectCardProps = Pick<Project, "id" | "name" | "description">;

export function ProjectCard({ id, name, description }: ProjectCardProps) {
  return (
    <Link
      href={`${APP_ROUTES.NAVIGATION.PROJECTS}/${id}`}
      className="block w-full rounded-xl border border-gray-200/80 bg-white p-4 transition-colors duration-200 hover:border-orange-300"
    >
      <div className="flex flex-col">
        <span className="text-lg font-medium text-gray-900">{name}</span>
        {description && (
          <span className="mt-1 text-sm text-gray-500">{description}</span>
        )}
      </div>
    </Link>
  );
}
