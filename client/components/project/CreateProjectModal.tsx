import { projectService } from "@/services/project.service";
import { Project } from "@/types/project";
import { FormEvent, useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (project: Project) => void;
}

interface FormState {
  name: string;
  description: string;
}

export function CreateProjectModal({
  isOpen,
  onClose: onClose,
  onSuccess,
}: CreateProjectModalProps) {
  const [form, setForm] = useState<Pick<Project, "name" | "description">>({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreatePorject = async (e: FormEvent) => {
    e.preventDefault();

    if (!form?.name.trim()) {
      setError("Name is required");
    }

    setError("");
    setIsLoading(true);
    try {
      const createdProject = await projectService.createProject({
        projectName: form.name.trim(),
        description: form.description.trim() || undefined,
      });

      onSuccess(createdProject);
      setForm({ name: "", description: "" });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <form
        onSubmit={handleCreatePorject}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-[500px] flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl"
      >
        <Input
          value={form.name}
          onChange={(e) => handleField("name", e.target.value)}
        />
        <Input
          value={form.description || undefined}
          onChange={(e) => handleField("description", e.target.value)}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}

        <div className="flex flex-row gap-3 h-full max-h-[40px]">
          <Button
            type="submit"
            variant="danger"
            text="cancel"
            onClick={onClose}
          />
          <Button
            type="submit"
            variant="primary"
            text={isLoading ? "Creating..." : "Create"}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
}
