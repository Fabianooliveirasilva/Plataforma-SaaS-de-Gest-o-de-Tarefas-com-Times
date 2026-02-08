import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginSchema, type LoginForm } from "../auth.schema";
import { getDemoAccounts, signInWithEmail } from "../auth.api";
import { useAuthStore } from "../auth.store";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";

export function LoginPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const isDemoMode =
    !import.meta.env.VITE_SUPABASE_URL ||
    !import.meta.env.VITE_SUPABASE_ANON_KEY;
  const [demoAccounts, setDemoAccounts] = useState(getDemoAccounts());

  useEffect(() => {
    if (isDemoMode) {
      setDemoAccounts(getDemoAccounts());
    }
  }, [isDemoMode]);

  const handleDemoLogin = async (email: string, password: string) => {
    try {
      setErrorMessage(null);
      const user = await signInWithEmail({ email, password });
      signIn(user);
      toast.success("Login realizado com sucesso!");
      navigate("/app");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao entrar";
      setErrorMessage(message);
      setError("root", { type: "server", message });
      toast.error(message);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMessage(null);
      const user = await signInWithEmail(data);
      signIn(user);
      toast.success("Login realizado com sucesso!");
      navigate("/app");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao entrar";
      setErrorMessage(message);
      setError("root", { type: "server", message });
      toast.error(message);
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Bem-vindo(a) de volta</h2>
        <p className="mt-1 text-sm text-slate-400">
          Acesse sua conta para continuar.
        </p>
      </div>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">E-mail</label>
          <Input
            type="email"
            placeholder="voce@empresa.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-rose-400">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">Senha</label>
          <Input
            type="password"
            placeholder="••••••"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-rose-400">{errors.password.message}</p>
          )}
        </div>
        {errorMessage && (
          <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
            {errorMessage}
          </div>
        )}
        {errors.root?.message && !errorMessage && (
          <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
            {errors.root.message}
          </div>
        )}
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
      {isDemoMode && (
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
          <p className="text-sm font-semibold text-slate-200">
            Modo demo ativo
          </p>
          <p className="text-xs text-slate-400">
            Use uma das contas abaixo para entrar.
          </p>
          <div className="grid gap-2">
            {demoAccounts.map((account) => (
              <button
                key={account.id}
                type="button"
                className="flex items-center justify-between rounded-lg border border-slate-800 px-3 py-2 text-left text-xs text-slate-200 hover:bg-slate-900"
                onClick={() => {
                  setValue("email", account.email, { shouldValidate: true });
                  setValue("password", account.password, {
                    shouldValidate: true,
                  });
                  handleDemoLogin(account.email, account.password);
                }}
              >
                <span>
                  {account.name} · {account.email}
                </span>
                <span className="text-slate-500">123456</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <p className="text-sm text-slate-400">
        Não possui conta?{" "}
        <Link className="font-semibold text-white" to="/auth/register">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
