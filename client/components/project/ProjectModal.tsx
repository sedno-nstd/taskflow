import { projectService } from "@/services/project.service";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useForm } from "react-hook-form";
import { ProjectFormValue } from "@/schemas/project.schema";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Project | null;
  onSubmitForm: (payload: {
    name: string;
    description?: string;
  }) => Promise<unknown>;
}

export function ProjectModal({
  isOpen,
  onClose: onClose,
  onSubmitForm,
  initialData,
}: CreateProjectModalProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const isEdit = Boolean(initialData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValue>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
    });
  }, [isOpen, initialData, reset]);

  const onSubmit = async (values: ProjectFormValue) => {
    setServerError(null);
    try {
      await onSubmitForm({
        name: values.name,
        description: values.description,
      });
      onClose();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Failed to save project",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-[500px] flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-gray-500">
            Title
          </label>
          <Input placeholder="e.g. Website Redesign" {...register("name")} />
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-gray-500">
            Description
          </label>
          <Input
            placeholder="Optional project details..."
            {...register("description")}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>
        {serverError && (
          <p className="text-xs font-medium text-red-500">{serverError}</p>
        )}
        <div className="flex flex-row gap-3">
          <Button
            className="cursor-pointer max-h-[36px]"
            type="button"
            variant="danger"
            text="cancel"
            onClick={onClose}
          />
          <Button
            className="cursor-pointer max-h-[36px]"
            type="submit"
            variant="primary"
            text={
              isSubmitting
                ? "Saving..."
                : isEdit
                  ? "Save changes"
                  : "Create project"
            }
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
