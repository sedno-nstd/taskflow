import { CreateTaskFormValue } from "@/schemas/task.schema";
import { Task } from "@/types/task";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
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
          className="w-full h-full flex flex-col gap-4 bg-white rounded-lg shadow-xl p-4 max-w-[500px]"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="">Title</label>
            <input {...register("title")} />
            {errors.title && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 outline-none">
            <label htmlFor="">Description</label>
            <textarea
              rows={3}
              placeholder="Optional details"
              className="border border-gray-600"
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
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400"
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
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400"
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
              className="cursor-pointer h-10"
            />
            <Button
              type="submit"
              variant="primary"
              text={isSubmitting ? "Creating..." : "Create task"}
              disabled={isSubmitting}
              className="cursor-pointer h-10"
            />
          </div>
        </form>
      </Modal>
    );
  }
}
