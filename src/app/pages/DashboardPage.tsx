import { Card } from "../../shared/components/Card";
import { PageHeader } from "../../shared/components/PageHeader";
import { useTasksSummary } from "../../features/tasks/useTasksSummary";

export function DashboardPage() {
  const summary = useTasksSummary();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Visão geral"
        subtitle="Acompanhe o ritmo do time em tempo real."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          title="Tarefas pendentes"
          value={summary.todo}
          helper="Pendentes hoje"
        />
        <Card
          title="Em andamento"
          value={summary.doing}
          helper="Time trabalhando"
        />
        <Card title="Concluídas" value={summary.done} helper="Últimos 7 dias" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card
          title="Produtividade do time"
          value={`${summary.velocity}%`}
          helper="Baseado em entregas da semana"
          className="min-h-[180px]"
        />
        <Card
          title="Risco de atraso"
          value={`${summary.risk}%`}
          helper="Tarefas críticas e alta prioridade"
          className="min-h-[180px]"
        />
      </div>
    </div>
  );
}
