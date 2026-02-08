import { useEffect, useState } from "react";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";
import { PageHeader } from "../../../shared/components/PageHeader";
import { Card } from "../../../shared/components/Card";
import { Badge } from "../../../shared/components/Badge";
import type { Project } from "../types";

const initialProjects: Project[] = [
  {
    id: "p1",
    name: "Plataforma SaaS",
    description: "Nova experiência de onboarding",
    team: "Produto",
    progress: 62,
  },
  {
    id: "p2",
    name: "Infra Dados",
    description: "Observabilidade e métricas",
    team: "Engenharia",
    progress: 48,
  },
];

const STORAGE_KEY = "taskflow-projects";

const loadProjects = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialProjects;
    const parsed = JSON.parse(stored) as Project[];
    return parsed.length ? parsed : initialProjects;
  } catch {
    return initialProjects;
  }
};

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // ignore storage errors
    }
  }, [projects]);

  const canCreate = name.trim().length > 2;

  const handleCreate = () => {
    if (!canCreate) return;
    setProjects((prev) => [
      {
        id: crypto.randomUUID(),
        name,
        description: "Projeto criado recentemente",
        team: team || "Produto",
        progress: 0,
      },
      ...prev,
    ]);
    setName("");
    setTeam("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projetos"
        subtitle="Centralize iniciativas por time e status."
      />
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card title="Novo projeto" helper="Crie e organize entregas">
          <div className="mt-4 space-y-3">
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nome do projeto"
            />
            <Input
              value={team}
              onChange={(event) => setTeam(event.target.value)}
              placeholder="Time responsável"
            />
            <Button onClick={handleCreate} disabled={!canCreate}>
              Criar projeto
            </Button>
          </div>
        </Card>
        <div className="space-y-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              title={project.name}
              helper={project.description}
            >
              <div className="mt-4 flex items-center justify-between">
                <Badge label={project.team} />
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {project.progress}% concluído
                </span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-slate-900 dark:bg-slate-200"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
