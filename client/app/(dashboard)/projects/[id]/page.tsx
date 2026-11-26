"use client";
import { ProjectDetail } from "@/components/project/ProjectDetails";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageLoader } from "@/components/ui/PageLoader";
import { projectService } from "@/services/project.service";
import { useAuthStore } from "@/store/auth.user";
import { Project } from "@/types/project";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ProjectPageContent() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !id) return;

    projectService
      .getProjectById(id as string)
      .then(setProject)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token, id]);

  if (loading) return <PageLoader />;
  if (!project) return <EmptyState title="Project not found" />;

  return (
    <ProjectDetail
      description={project.description as string}
      title={project.name}
    />
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse text-gray-600 text-lg">Loading...</div>
      }
    >
      <ProjectPageContent />
    </Suspense>
  );
}
