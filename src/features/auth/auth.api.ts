import { supabase } from "../../shared/services/supabaseClient";
import type { LoginForm, RegisterForm } from "./auth.schema";
import type { User } from "./auth.store";

const mockUser: User = {
  id: "local-user",
  name: "Equipe Produto",
  email: "produto@taskflow.com",
};

export async function signInWithEmail(data: LoginForm): Promise<User> {
  if (!supabase) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { ...mockUser, email: data.email };
  }

  const { data: session, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error || !session.user) {
    throw new Error(error?.message ?? "Falha no login");
  }

  return {
    id: session.user.id,
    name: session.user.user_metadata?.name ?? "Usuário",
    email: session.user.email ?? data.email,
  };
}

export async function signUpWithEmail(data: RegisterForm): Promise<User> {
  if (!supabase) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { ...mockUser, name: data.name, email: data.email };
  }

  const { data: session, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { name: data.name },
    },
  });

  if (error || !session.user) {
    throw new Error(error?.message ?? "Falha no cadastro");
  }

  return {
    id: session.user.id,
    name: data.name,
    email: data.email,
  };
}
