import type { Task } from "./types";

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Mapear jornada do usuário",
    description: "Entrevistas e insights principais",
    status: "todo",
    priority: "high",
    assignee: "Ana Paula",
    project: "Plataforma SaaS",
    dueDate: "2026-02-15",
  },
  {
    id: "task-2",
    title: "Configurar RLS no Supabase",
    description: "Políticas para equipes e projetos",
    status: "doing",
    priority: "medium",
    assignee: "Rafael Lima",
    project: "Infra Dados",
    dueDate: "2026-02-18",
  },
  {
    id: "task-3",
    title: "UI de filtros avançados",
    description: "Busca, status e prioridade",
    status: "done",
    priority: "low",
    assignee: "Marina Souza",
    project: "Plataforma SaaS",
    dueDate: "2026-02-10",
  },
];
