import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleCloseModal = (e: KeyboardEvent) => {
      if (e.key === "esc") onClose();
    };

    window.addEventListener("keydown", handleCloseModal);

    return () => window.removeEventListener("keydown", handleCloseModal);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-full flex flex-col items-center justify-center backdrop-blur-xs">
      <div className="mb-4 flex items-center justify-between gap-4">
        {title ? (
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        ) : (
          <div />
        )}
        <div
          className="w-fit items-start justify-end  cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            type="button"
            aria-label="Close modal"
            className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
