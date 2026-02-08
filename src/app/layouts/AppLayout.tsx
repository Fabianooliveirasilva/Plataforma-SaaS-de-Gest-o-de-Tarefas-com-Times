import { NavLink, Outlet } from "react-router-dom";
import { useThemeStore } from "../../shared/hooks/useTheme";
import { cn } from "../../shared/utils/cn";
import { useAuthStore } from "../../features/auth/auth.store";
import { Button } from "../../shared/components/Button";

const navigation = [
  { label: "Dashboard", to: "/app" },
  { label: "Times", to: "/app/teams" },
  { label: "Projetos", to: "/app/projects" },
  { label: "Tarefas", to: "/app/tasks" },
];

export function AppLayout() {
  const { theme, toggleTheme } = useThemeStore();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-slate-200 bg-white px-6 py-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-8">
            <h1 className="text-lg font-semibold">TaskFlow SaaS</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Gestão de times e tarefas
            </p>
          </div>
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/app"}
                className={({ isActive }) =>
                  cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Bem-vindo(a)
              </p>
              <p className="text-base font-semibold">
                {user?.name ?? "Visitante"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={toggleTheme}>
                {theme === "dark" ? "Modo claro" : "Modo escuro"}
              </Button>
              <Button variant="outline" onClick={signOut}>
                Sair
              </Button>
            </div>
          </header>
          <main className="bg-slate-50 px-8 py-6 dark:bg-slate-950">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
