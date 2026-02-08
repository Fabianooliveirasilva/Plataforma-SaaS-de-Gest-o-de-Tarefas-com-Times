import { supabase } from "../../shared/services/supabaseClient";
import type { LoginForm, RegisterForm } from "./auth.schema";
import type { User } from "./auth.store";

const DEMO_STORAGE_KEY = "taskflow-demo-accounts";

const baseDemoAccounts = [
  {
    id: "demo-1",
    name: "Ana Paula",
    email: "ana@empresa.com",
    password: "123456",
  },
  {
    id: "demo-2",
    name: "Rafael Lima",
    email: "rafael@empresa.com",
    password: "123456",
  },
  {
    id: "demo-3",
    name: "Marina Souza",
    email: "marina@empresa.com",
    password: "123456",
  },
] satisfies Array<User & { password: string }>;

export const getDemoAccounts = (): Array<User & { password: string }> => {
  try {
    const stored = localStorage.getItem(DEMO_STORAGE_KEY);
    if (!stored) return baseDemoAccounts;
    const parsed = JSON.parse(stored) as Array<User & { password: string }>;
    return parsed.length ? parsed : baseDemoAccounts;
  } catch {
    return baseDemoAccounts;
  }
};

const saveDemoAccounts = (accounts: Array<User & { password: string }>) => {
  try {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(accounts));
  } catch {
    // ignore storage errors
  }
};

export async function signInWithEmail(data: LoginForm): Promise<User> {
  if (!supabase) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const match = getDemoAccounts().find(
      (account) =>
        account.email.toLowerCase() === data.email.toLowerCase() &&
        account.password === data.password,
    );

    if (!match) {
      throw new Error("Use um login demo válido");
    }

    return {
      id: match.id,
      name: match.name,
      email: match.email,
    };
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
    await new Promise((resolve) => setTimeout(resolve, 600));
    const existing = getDemoAccounts();
    const alreadyExists = existing.some(
      (account) => account.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (alreadyExists) {
      throw new Error("E-mail já cadastrado");
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
    } satisfies User & { password: string };

    const next = [newUser, ...existing];
    saveDemoAccounts(next);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
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
