import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-12 lg:flex-row lg:gap-10">
        <div className="max-w-md space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            TaskFlow
          </p>
          <h1 className="text-3xl font-semibold">
            Gestão de tarefas com foco em times modernos.
          </h1>
          <p className="text-sm text-slate-400">
            Conecte pessoas, projetos e tarefas em um único painel com métricas
            rápidas e colaboração em tempo real.
          </p>
        </div>
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-soft">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
