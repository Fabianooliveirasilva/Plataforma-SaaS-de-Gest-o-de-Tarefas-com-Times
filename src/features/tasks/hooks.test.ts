import { describe, expect, it } from "vitest";
import { sortTasks, useTaskFilters } from "./hooks";
import type { Task } from "./types";

const tasks: Task[] = [
  {
    id: "1",
    title: "Refatorar onboarding",
    description: "Melhorar conversão",
    status: "todo",
    priority: "high",
    assignee: "Ana",
    project: "Produto",
    dueDate: "2026-02-10",
  },
  {
    id: "2",
    title: "Ajustar integrações",
    description: "Supabase + RLS",
    status: "doing",
    priority: "medium",
    assignee: "Rafael",
    project: "Infra",
    dueDate: "2026-02-12",
  },
];

describe("tasks hooks", () => {
  it("filtra por status e texto", () => {
    const filtered = useTaskFilters(tasks, "onboarding", "todo", "all", "all");
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.id).toBe("1");
  });

  it("ordena por prioridade", () => {
    const sorted = sortTasks(tasks, "priority");
    expect(sorted[0]?.priority).toBe("high");
  });
});
