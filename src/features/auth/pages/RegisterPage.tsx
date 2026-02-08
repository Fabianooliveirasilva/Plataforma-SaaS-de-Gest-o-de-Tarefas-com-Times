import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerSchema, type RegisterForm } from "../auth.schema";
import { signUpWithEmail } from "../auth.api";
import { useAuthStore } from "../auth.store";
import { Button } from "../../../shared/components/Button";
import { Input } from "../../../shared/components/Input";

export function RegisterPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const user = await signUpWithEmail(data);
      signIn(user);
      toast.success("Conta criada com sucesso!");
      navigate("/app");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao cadastrar");
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Criar conta</h2>
        <p className="mt-1 text-sm text-slate-400">
          Vamos configurar seu workspace em minutos.
        </p>
      </div>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">Nome</label>
          <Input placeholder="Seu nome" {...register("name")} />
          {errors.name && (
            <p className="text-xs text-rose-400">{errors.name.message}</p>
          )}
        </div>
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
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar conta"}
        </Button>
      </form>
      <p className="text-sm text-slate-400">
        Já possui conta?{" "}
        <Link className="font-semibold text-white" to="/auth/login">
          Fazer login
        </Link>
      </p>
    </div>
  );
}
