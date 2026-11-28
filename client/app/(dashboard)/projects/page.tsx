"use client";
import { ProjectModal } from "@/components/project/ProjectModal";
import { ProjectList } from "@/components/project/ProjectList";
import { Button } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/PageLoader";
import { useHasMounted } from "@/hooks/useHasMounted";
import { UseProjects } from "@/hooks/useProjects";
import { FolderPlus } from "lucide-react";
import { useState } from "react";
import { Project } from "@/types/project";

export default function Home() {
  const hasMounted = useHasMounted();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
    createProject,
  } = UseProjects();

  if (!hasMounted || loading) {
    return <PageLoader text="Loading..." />;
  }

  const handleCloseModal = () => {
    setIsCreateOpen(false);
    setEditingProject(null);
  };

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
            className="cursor-pointer max-w-[180px] px-4 py-2 text-sm transition-colors duration-200"
            variant="orange"
            text="+ Create project"
            onClick={() => setIsCreateOpen(true)}
          />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
            <Button
              className="cursor-pointer  max-w-[180px]  px-4 py-2 text-sm transition-colors duration-200"
              variant="orange"
              text="+ Create project"
              onClick={() => setIsCreateOpen(true)}
            />
          </div>

          <ProjectList
            projects={projects}
            onDelete={deleteProject}
            onEdit={(project) => setEditingProject(project)}
          />
        </>
      )}

      <ProjectModal
        isOpen={isCreateOpen || Boolean(editingProject)}
        onClose={handleCloseModal}
        initialData={editingProject}
        onSubmitForm={async (payload) => {
          if (editingProject) {
            await updateProject(editingProject.id, payload);
          } else {
            await createProject(payload);
          }
        }}
      />
    </div>
  );
}
