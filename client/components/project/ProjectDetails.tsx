import { PROJECT_VARIANTS, ProjectVariant } from "@/constants/project-variants";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import { TaskBoard } from "../task/TaskBoard";
import { TaskList } from "../task/TaskList";
import { EmptyState } from "../ui/EmptyState";
import { Button } from "../ui/Button";
import { CreateTaskModal } from "../task/CreateTaskModal";

interface ProjectProps {
  projectId: string;
  title: string;
  description: string;
  tasks: Task[];
}

export function ProjectDetail({
  description,
  title,
  tasks,
  projectId,
}: ProjectProps) {
  const [activeTab, setActiveTab] = useState<ProjectVariant>("board");
  const [openModal, setOpenModal] = useState(false);
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const renderTabContent = () => {
    switch (activeTab) {
      case "board":
        return <TaskBoard tasks={taskList} />;
      case "list":
        return <TaskList tasks={taskList} />;
      case "activity":
        return (
          <EmptyState
            title="No activity yet"
            description="Project history will appear here."
          />
        );
      case "files":
        return (
          <EmptyState
            title="No files uploaded"
            description="Attachments for this project will appear here."
          />
        );
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex min-w-0 flex-row gap-1.5 w-full justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-gray-900 wrap-break-word">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-sm text-gray-500 wrap-break-word line-clamp-3">
              {description}
            </p>
          )}
        </div>
        <Button
          onClick={() => setOpenModal(true)}
          text="+ create task"
          variant="orange"
          className="max-w-[150px] max-h-[40px] cursor-pointer transition-colors"
        />
      </header>

      <nav className="flex items-center gap-2 mt-6" aria-label="Project views">
        {PROJECT_VARIANTS.map((item) => {
          const isActive = item.value === activeTab;
          const Icon = item.icon;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setActiveTab(item.value)}
              className={`flex items-center justify-center gap-2 select-none px-4 py-2.5 text-sm font-medium border-b-2 -mb-px cursor-pointer transition-colors ${
                isActive
                  ? "border-orange-400 text-orange-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex-1 pt-6">{renderTabContent()}</div>
      {openModal && (
        <CreateTaskModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          projectId={projectId}
          onCreated={(newTask) => setTaskList((prev) => [newTask, ...prev])}
        />
      )}
    </div>
  );
}
