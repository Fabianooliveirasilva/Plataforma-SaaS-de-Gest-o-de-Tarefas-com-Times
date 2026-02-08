import { useMemo, useState } from "react";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";
import { PageHeader } from "../../../shared/components/PageHeader";
import { Badge } from "../../../shared/components/Badge";
import { Skeleton } from "../../../shared/components/Skeleton";
import { EmptyState } from "../../../shared/components/EmptyState";
import {
  useCreateTask,
  useDeleteTask,
  useTasksQuery,
  useUpdateTask,
  useTaskFilters,
  sortTasks,
} from "../hooks";
import type { TaskPriority, TaskStatus } from "../types";
import { toast } from "sonner";

const priorities: { value: TaskPriority; label: string }[] = [
  { value: "low", label: "Baixa" },
  { value: "medium", label: "Média" },
  { value: "high", label: "Alta" },
];

export function TasksPage() {
  const { data, isLoading } = useTasksQuery();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [createPriority, setCreatePriority] = useState<TaskPriority>("medium");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sortBy, setSortBy] = useState("priority");

  const tasks = data ?? [];
  const assignees = useMemo(
    () => Array.from(new Set(tasks.map((task) => task.assignee))),
    [tasks],
  );

  const filtered = sortTasks(
    useTaskFilters(tasks, search, status, priority, assigneeFilter),
    sortBy,
  );

  const canCreate = title.trim().length > 3;

  const handleCreate = async () => {
    if (!canCreate) return;
    await createTask.mutateAsync({
      title,
      description: "Nova tarefa criada via painel rápido",
      status: "todo",
      priority: createPriority,
      assignee: assignee || "Time Produto",
      project: "Plataforma SaaS",
      dueDate: "2026-02-28",
    });
    toast.success("Tarefa criada com sucesso");
    setTitle("");
    setCreatePriority("medium");
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    await updateTask.mutateAsync({ id: taskId, status: newStatus });
    toast.message("Status atualizado");
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask.mutateAsync(taskId);
    toast.success("Tarefa removida");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tarefas"
        subtitle="Gerencie fluxo, prioridades e responsáveis."
      />

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-3">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Nova tarefa"
          />
          <select
            value={createPriority}
            onChange={(event) =>
              setCreatePriority(event.target.value as TaskPriority)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {priorities.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <Input
            value={assignee}
            onChange={(event) => setAssignee(event.target.value)}
            placeholder="Responsável"
          />
          <Button
            onClick={handleCreate}
            disabled={!canCreate || createTask.isPending}
          >
            {createTask.isPending ? "Salvando..." : "Adicionar"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-5">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar tarefas"
          />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="all">Todos os status</option>
            <option value="todo">A fazer</option>
            <option value="doing">Em andamento</option>
            <option value="done">Concluído</option>
          </select>
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="all">Todas prioridades</option>
            {priorities.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="priority">Ordenar por prioridade</option>
            <option value="dueDate">Ordenar por prazo</option>
          </select>
          <select
            value={assigneeFilter}
            onChange={(event) => setAssigneeFilter(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="all">Todos responsáveis</option>
            {assignees.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Nenhuma tarefa"
          description="Crie uma nova tarefa ou ajuste os filtros."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <div
              key={task.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold">{task.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {task.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      label={task.status}
                      variant={
                        task.status === "done"
                          ? "success"
                          : task.status === "doing"
                            ? "warning"
                            : "default"
                      }
                    />
                    <Badge
                      label={`Prioridade ${task.priority}`}
                      variant={
                        task.priority === "high"
                          ? "danger"
                          : task.priority === "medium"
                            ? "warning"
                            : "default"
                      }
                    />
                    <Badge label={task.assignee} />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={task.status}
                    onChange={(event) =>
                      handleStatusChange(
                        task.id,
                        event.target.value as TaskStatus,
                      )
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  >
                    <option value="todo">A fazer</option>
                    <option value="doing">Em andamento</option>
                    <option value="done">Concluído</option>
                  </select>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(task.id)}
                  >
                    Remover
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
