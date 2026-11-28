import { projectService } from "@/services/project.service";
import { useAuthStore } from "@/store/auth.user";
import { CreateProjectDto, Project, UpdateProjectDto } from "@/types/project";
import { useEffect, useState } from "react";

export function UseProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();
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

  const addProject = (project: Project) => {
    return setProjects((prev) => [project, ...prev]);
  };

  const updateProject = async (id: string, dto: UpdateProjectDto) => {
    const updated = await projectService.updateProject(id, dto);

    setProjects((prev) =>
      prev.map((item) => (item.id === id ? updated : item)),
    );
    return updated;
  };

  const deleteProject = async (id: string) => {
    await projectService.deleteProject(id);
    setProjects((prev) => prev.filter((item) => item.id !== id));
  };

  const createProject = async (dto: CreateProjectDto) => {
    const project = await projectService.createProject(dto);

    return project;
  };

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
    createProject,
  };
}
