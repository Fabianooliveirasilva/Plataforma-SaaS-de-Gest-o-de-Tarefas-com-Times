import { useMemo } from "react";
import { useTasksQuery } from "./hooks";

export function useTasksSummary() {
  const { data } = useTasksQuery();

  return useMemo(() => {
    const tasks = data ?? [];
    const todo = tasks.filter((task) => task.status === "todo").length;
    const doing = tasks.filter((task) => task.status === "doing").length;
    const done = tasks.filter((task) => task.status === "done").length;

    return {
      todo,
      doing,
      done,
      velocity: tasks.length
        ? Math.min(100, Math.round((done / tasks.length) * 100))
        : 0,
      risk: tasks.length
        ? Math.min(100, Math.round((todo / tasks.length) * 100))
        : 0,
    };
  }, [data]);
}
