import { CreateTaskFormValue } from "@/schemas/task.schema";
import { Task } from "@/types/task";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../ui/Modal";
import { taskService } from "@/services/task.service";
import { Button } from "../ui/Button";

interface CreateTaskModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
  onCreated: (task: Task) => void;
}

export function CreateTaskModal({
  isOpen,
  onClose,
  onCreated,
  projectId,
}: CreateTaskModalProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<CreateTaskFormValue>({
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      status: "TODO",
    },
  });

  const onSubmit = async (values: CreateTaskFormValue) => {
    setServerError(null);
    try {
      const newTask = await taskService.createTask({
        projectId,
        ...values,
        description: values.description || undefined,
      });
      onCreated(newTask);
      reset();
      onClose();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Failed to create task",
      );
    }
  };

  if (isOpen) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col gap-4 max-w-[500px] max-h-[400px]"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="e.g. Fix authentication bug"
              className={`w-full rounded-xl border bg-white px-3.5 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 ${
                errors.title
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-200 hover:border-gray-300 focus:border-orange-400"
              }`}
              {...register("title")}
            />
            {errors.title && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="">Description</label>
            <textarea
              rows={3}
              placeholder="Optional details"
              className="border rounded-lg px-2 py-2 border-gray-600 outline-none resize-none"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label htmlFor="">Priority</label>
            <select
              {...register("priority")}
              className="w-full rounded-xl border cursor-pointer border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400"
            >
              <option value="LOW">low</option>
              <option value="MEDIUM">medium</option>
              <option value="HIGH">high</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label htmlFor="">Status</label>
            <select
              {...register("status")}
              className="w-full rounded-xl border cursor-pointer border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400"
            >
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">in progress</option>
              <option value="DONE">done</option>
            </select>
          </div>
          {serverError && <p className="text-xs text-red-500">{serverError}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              text="Cancel"
              onClick={onClose}
              className="cursor-pointer py-1.5 px-3"
            />
            <Button
              type="submit"
              variant="primary"
              text={isSubmitting ? "Creating..." : "Create task"}
              disabled={isSubmitting}
              className="cursor-pointer py-1.5 px-3"
            />
          </div>
        </form>
      </Modal>
    );
  }
}
