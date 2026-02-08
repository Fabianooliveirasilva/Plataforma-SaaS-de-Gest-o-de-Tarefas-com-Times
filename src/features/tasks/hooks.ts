import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, fetchTasks, updateTask } from "./api";
import type { Task } from "./types";

const TASKS_QUERY_KEY = ["tasks"];

export function useTasksQuery() {
  return useQuery({ queryKey: TASKS_QUERY_KEY, queryFn: fetchTasks });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY_KEY });
      const previous = queryClient.getQueryData<Task[]>(TASKS_QUERY_KEY);

      if (previous) {
        queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, [
          { id: `temp-${Date.now()}`, ...newTask },
          ...previous,
        ]);
      }

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(TASKS_QUERY_KEY, context.previous);
      }
    },
    onSuccess: (created) => {
      queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (current) => {
        const filtered = (current ?? []).filter(
          (task) => !task.id.startsWith("temp-"),
        );
        return [created, ...filtered];
      });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY_KEY });
      const previous = queryClient.getQueryData<Task[]>(TASKS_QUERY_KEY);

      if (previous) {
        queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (current) =>
          (current ?? []).map((task) =>
            task.id === updated.id ? { ...task, ...updated } : task,
          ),
        );
      }

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(TASKS_QUERY_KEY, context.previous);
      }
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY_KEY });
      const previous = queryClient.getQueryData<Task[]>(TASKS_QUERY_KEY);

      if (previous) {
        queryClient.setQueryData<Task[]>(TASKS_QUERY_KEY, (current) =>
          (current ?? []).filter((task) => task.id !== id),
        );
      }

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(TASKS_QUERY_KEY, context.previous);
      }
    },
  });
}

export function useTaskFilters(
  tasks: Task[],
  search: string,
  status: string,
  priority: string,
  assignee: string,
) {
  const normalized = search.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch = normalized
      ? task.title.toLowerCase().includes(normalized) ||
        task.description.toLowerCase().includes(normalized)
      : true;
    const matchesStatus = status === "all" ? true : task.status === status;
    const matchesPriority =
      priority === "all" ? true : task.priority === priority;
    const matchesAssignee =
      assignee === "all" ? true : task.assignee === assignee;
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });
}

export function sortTasks(tasks: Task[], sortBy: string) {
  const list = [...tasks];
  if (sortBy === "priority") {
    const order: Record<string, number> = { high: 0, medium: 1, low: 2 };
    return list.sort((a, b) => order[a.priority] - order[b.priority]);
  }
  if (sortBy === "dueDate") {
    return list.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }
  return list;
}
