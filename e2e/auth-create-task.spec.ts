import { test, expect } from "@playwright/test";

test("login e criar tarefa", async ({ page }) => {
  await page.goto("/auth/login");
  await page.getByPlaceholder("voce@empresa.com").fill("ana@empresa.com");
  await page.getByPlaceholder("••••••").fill("123456");
  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page.getByText("Bem-vindo(a)")).toBeVisible();

  await page.getByRole("link", { name: "Tarefas" }).click();
  await page.getByPlaceholder("Nova tarefa").fill("Testar fluxo E2E");
  await page.getByRole("button", { name: "Adicionar" }).click();

  await expect(page.getByText("Testar fluxo E2E")).toBeVisible();
});
