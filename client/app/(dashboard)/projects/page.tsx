"use client";
import { CreateProjectModal } from "@/components/project/CreateProjectModal";
import { ProjectList } from "@/components/project/ProjectList";
import { Button } from "@/components/ui/Button";
import { useHasMounted } from "@/hooks/useHasMounted";
import { projectService } from "@/services/project.service";
import { useAuthStore } from "@/store/auth.user";
import { Project } from "@/types/project";
import { FolderPlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const hasMounted = useHasMounted();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) return;

    projectService
      .getAllProjects()
      .then((res) => {
        setProjects(res ?? []);
      })
      .catch((err) => console.error("Failed to load projects", err))
      .finally(() => setLoading(false));
  }, [token]);

  if (!hasMounted || loading) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-gray-400 animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4">
      {projects.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/40 p-8 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
            <FolderPlus className="h-6 w-6" />
          </div>

          <h3 className="text-base font-semibold text-gray-900">
            {`You don't have any projects yet`}
          </h3>
          <p className="mt-1 mb-5 max-w-xs text-sm text-gray-500">
            Create your first project to start organizing tasks and tracking
            progress.
          </p>

          <Button
            className="max-h-10 max-w-30 cursor-pointer transition-colors duration-200"
            variant="secondary"
            text="Create project"
            onClick={() => setIsOpen(true)}
          />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
            <Button
              className="max-w-50 cursor-pointer transition-colors duration-200"
              variant="secondary"
              text="Create project"
              onClick={() => setIsOpen(true)}
            />
          </div>

          <ProjectList projects={projects} />
        </>
      )}

      <CreateProjectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={(newProject) => setProjects((prev) => [newProject, ...prev])}
      />
    </div>
  );
}
