import { API_ROUTES } from "@/constants/route";
import { apiFetch } from "@/lib/api";
import { CreateProjectDto, Project, UpdateProjectDto } from "@/types/project";

export const projectService = {
  async getAllProjects() {
    const data = await apiFetch<{ projects: Project[] }>(
      API_ROUTES.PROJECTS.BASE,
    );

    return data.projects || [];
  },

  async getProjectById(id: string) {
    const data = await apiFetch<{ project: Project }>(
      API_ROUTES.PROJECTS.BY_ID(id),
    );

    return data.project;
  },

  async createProject(dto: CreateProjectDto) {
    const data = await apiFetch<{ project: Project }>(
      API_ROUTES.PROJECTS.BASE,
      {
        method: "POST",
        body: JSON.stringify(dto),
      },
    );

    return data.project;
  },

  async deleteProject(id: string) {
    await apiFetch<{ project: Project }>(API_ROUTES.PROJECTS.BY_ID(id), {
      method: "DELETE",
    });
  },

  async updateProject(id: string, dto: UpdateProjectDto) {
    const update = await apiFetch<{ project: Project }>(
      API_ROUTES.PROJECTS.BY_ID(id),
      {
        method: "PATCH",
        body: JSON.stringify(dto),
      },
    );

    return update.project;
  },
};
