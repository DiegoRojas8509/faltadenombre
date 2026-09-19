"use client";

import { useActionState } from "react";
import { Lettering } from "@/components/Lettering";
import { submitName, type SubmitState } from "@/app/actions";

export function NameForm() {
  const [state, action, pending] = useActionState<SubmitState, FormData>(
    submitName,
    null,
  );

  if (state?.ok) {
    return (
      <div
        className="flex flex-col items-center gap-4 pt-2"
        role="status"
        aria-live="polite"
      >
        <Lettering piece="gracias" />
        <p className="font-mono text-sm uppercase tracking-widest opacity-60">
          Quedó anotado: {state.message}
        </p>
      </div>
    );
  }

  const error = state && !state.ok ? state.message : null;

  return (
    <form action={action} className="flex flex-col gap-4">
      {/* La pregunta manuscrita ES el label del input */}
      <label htmlFor="name" className="block cursor-pointer">
        <Lettering piece="como" />
      </label>

      <input
        id="name"
        name="name"
        type="text"
        required
        maxLength={80}
        autoComplete="off"
        autoCapitalize="words"
        enterKeyHint="send"
        disabled={pending}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "name-error" : undefined}
        className="w-full -rotate-[0.4deg] border-[3px] border-current bg-transparent px-4 py-3 font-mono text-lg outline-none placeholder:opacity-35 focus-visible:ring-4 focus-visible:ring-current/25 disabled:opacity-50"
        placeholder="escribe aquí…"
      />

      {error ? (
        <p
          id="name-error"
          role="alert"
          className="font-mono text-sm uppercase tracking-wide"
        >
          ↑ {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="min-h-[52px] rotate-[0.5deg] bg-ink px-6 py-3 font-mono text-base font-bold uppercase tracking-[0.2em] text-paper transition-transform duration-150 ease-out hover:-rotate-[0.5deg] active:scale-[0.98] disabled:opacity-50 dark:bg-paper dark:text-ink"
      >
        {pending ? "Mandando…" : "Mandar"}
      </button>
    </form>
  );
}
