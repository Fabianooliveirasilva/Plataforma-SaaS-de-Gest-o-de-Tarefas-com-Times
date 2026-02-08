export type TaskStatus = "todo" | "doing" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  project: string;
  dueDate: string;
};

export type CreateTaskInput = Omit<Task, "id">;
export type UpdateTaskInput = Partial<Omit<Task, "id">> & { id: string };
