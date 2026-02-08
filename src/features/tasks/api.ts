import type { CreateTaskInput, Task, UpdateTaskInput } from "./types";
import { mockTasks } from "./mock";

let tasks = [...mockTasks];

const delay = (time = 600) =>
  new Promise((resolve) => setTimeout(resolve, time));

export async function fetchTasks(): Promise<Task[]> {
  await delay(500);
  return [...tasks];
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  await delay(400);
  const newTask: Task = { id: crypto.randomUUID(), ...input };
  tasks = [newTask, ...tasks];
  return newTask;
}

export async function updateTask(input: UpdateTaskInput): Promise<Task> {
  await delay(400);
  const index = tasks.findIndex((task) => task.id === input.id);
  if (index === -1) {
    throw new Error("Tarefa não encontrada");
  }
  const updated = { ...tasks[index], ...input };
  tasks[index] = updated;
  return updated;
}

export async function deleteTask(id: string): Promise<void> {
  await delay(350);
  tasks = tasks.filter((task) => task.id !== id);
}
