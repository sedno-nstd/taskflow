import { APP_ROUTES } from "@/constants/route";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/Button";

interface ProjectCardProps {
  id: string;
  name: string;
  description?: string;
  onDelete: () => Promise<void> | void;
  onEdit: () => void;
}

export function ProjectCard({
  id,
  name,
  description,
  onDelete,
  onEdit,
}: ProjectCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete();
    } finally {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="group flex w-full items-center justify-between gap-4 rounded-xl border border-gray-200/80 bg-white p-4 transition-colors duration-200 hover:border-orange-300">
      <Link
        href={`${APP_ROUTES.NAVIGATION.PROJECTS}/${id}`}
        className="flex min-w-0 flex-1 flex-col"
      >
        <span className="truncate text-lg font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
          {name}
        </span>
        {description && (
          <span className="mt-1 truncate text-sm text-gray-500">
            {description}
          </span>
        )}
      </Link>

      <div className="flex shrink-0 items-center gap-2">
        {confirmDelete ? (
          <>
            <Button
              type="button"
              variant="secondary"
              text="Cancel"
              disabled={isDeleting}
              onClick={() => setConfirmDelete(false)}
              className="cursor-pointer px-3 py-1.5 text-sm transition-colors"
            />
            <Button
              type="button"
              variant="danger"
              text={isDeleting ? "Deleting..." : "Delete"}
              disabled={isDeleting}
              onClick={handleConfirmDelete}
              className="cursor-pointer px-3 py-1.5 text-sm transition-colors"
            />
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onEdit}
              aria-label="Edit project"
              className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              aria-label="Delete project"
              className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
