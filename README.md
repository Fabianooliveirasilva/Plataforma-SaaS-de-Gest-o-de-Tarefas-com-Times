# Plataforma SaaS de Gestão de Tarefas com Times

Uma aplicação web no estilo Jira/ClickUp com escopo controlado, focada em produtividade, colaboração e segurança.

## Visão do produto

- Centralizar times, projetos e tarefas em um único painel.
- Garantir controle de acesso por time/projeto.
- Entregar experiência fluida com estados vazios, skeletons e feedback instantâneo.

## Decisões técnicas

- **React + TypeScript + Vite** para velocidade e tipagem forte.
- **Tailwind CSS** para UI consistente e responsiva.
- **TanStack Query** para cache, sincronização e optimistic updates.
- **React Hook Form + Zod** para validação robusta de formulários.
- **Zustand** para estado global simples (tema e sessão).
- **Supabase** para Auth, DB e RLS sem backend complexo.

## Arquitetura

- **Separação por features** em `src/features/*` para escalabilidade.
- **Camada shared** em `src/shared/*` para componentes reutilizáveis e serviços.
- **App layer** em `src/app/*` concentrando roteamento, providers e layout.

### Estrutura de pastas

```
src/
 ├─ app/
 ├─ features/
 │   ├─ auth/
 │   ├─ teams/
 │   ├─ projects/
 │   └─ tasks/
 ├─ shared/
 │   ├─ components/
 │   ├─ hooks/
 │   ├─ services/
 │   └─ utils/
 └─ styles/
```

## Auth e segurança

- Fluxos de **login/cadastro** com validação Zod.
- **Proteção de rotas** via `RequireAuth`.
- **Sessão persistente** com Zustand + `persist`.
- Integração planejada com **Supabase Auth** e **RLS** para políticas de segurança.

## Como rodar localmente

1. Instale dependências:
   - `npm install`
2. Rode o projeto:
   - `npm run dev`

### Variáveis de ambiente

Crie um `.env` na raiz:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Testes

- Unitários: `npm run test:unit`
- E2E: `npm run test:e2e`

## Roadmap futuro

- Integração completa com Supabase (DB, Storage e convites).
- Uploads de anexos em tarefas.
- Quadro kanban com drag & drop.
- Notificações em tempo real.
- Métricas avançadas por time/projeto.
