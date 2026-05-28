import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/achievements")({
  head: () => ({ meta: [{ title: "Conquistas — VetClass Pro" }] }),
  component: () => (
    <div className="px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-10 text-center shadow-card">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-coral text-coral-foreground">
          <Trophy className="h-6 w-6" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold">Conquistas & Ranking</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sistema de gamificação completo chega na próxima fase.</p>
      </div>
    </div>
  ),
});
