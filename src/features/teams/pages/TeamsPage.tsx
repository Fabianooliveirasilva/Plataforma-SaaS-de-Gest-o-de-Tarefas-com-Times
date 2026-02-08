import { useMemo, useState } from "react";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";
import { PageHeader } from "../../../shared/components/PageHeader";
import { Card } from "../../../shared/components/Card";
import { EmptyState } from "../../../shared/components/EmptyState";
import type { Team } from "../types";

const initialTeams: Team[] = [
  {
    id: "t1",
    name: "Produto",
    description: "Squad focado em entrega de valor",
    members: 8,
  },
  {
    id: "t2",
    name: "Engenharia",
    description: "Core platform e integrações",
    members: 12,
  },
];

export function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const canCreate = name.trim().length > 2;

  const summary = useMemo(
    () => ({
      total: teams.length,
      members: teams.reduce((acc, team) => acc + team.members, 0),
    }),
    [teams],
  );

  const handleCreate = () => {
    if (!canCreate) return;
    setTeams((prev) => [
      {
        id: crypto.randomUUID(),
        name,
        description: description || "Novo time criado agora",
        members: 1,
      },
      ...prev,
    ]);
    setName("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Times"
        subtitle={`Você gerencia ${summary.total} times com ${summary.members} pessoas.`}
      />
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <Card
            title="Novo time"
            helper="Convide pessoas e compartilhe projetos"
          >
            <div className="mt-4 space-y-3">
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nome do time"
              />
              <Input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descrição rápida"
              />
              <Button onClick={handleCreate} disabled={!canCreate}>
                Criar time
              </Button>
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          {teams.length === 0 ? (
            <EmptyState
              title="Sem times"
              description="Crie o primeiro time para começar."
            />
          ) : (
            teams.map((team) => (
              <Card
                key={team.id}
                title={team.name}
                helper={`${team.members} membros`}
              >
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {team.description}
                </p>
                <Button className="mt-4" variant="outline">
                  Convidar por e-mail
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
