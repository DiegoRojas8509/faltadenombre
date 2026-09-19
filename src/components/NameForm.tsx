"use client";

import { useActionState } from "react";
import { Lettering } from "@/components/Lettering";
import { submitName, type SubmitState } from "@/app/actions";

export function NameForm() {
  const [state, action, pending] = useActionState<SubmitState, FormData>(
    submitName,
    null,
  );

  const error = state && !state.ok ? state.message : null;

  return (
    <form action={action} className="flex flex-col gap-7">
      {/* 2. El input y su botón. Al enviar, este bloque —y solo este— se
          convierte en la confirmación; el GRACIAS de abajo ya está puesto. */}
      {state?.ok ? (
        <p
          role="status"
          aria-live="polite"
          className="py-4 text-center font-mono text-sm uppercase tracking-widest"
        >
          Quedó anotado: {state.message}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
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
            className="min-h-[52px] rotate-[0.5deg] bg-ink px-6 py-3 font-mono text-base font-bold uppercase tracking-[0.2em] text-paper transition-transform duration-150 ease-out hover:-rotate-[0.5deg] active:scale-[0.98] disabled:opacity-50"
          >
            {pending ? "Mandando…" : "Mandar"}
          </button>
        </div>
      )}

      {/* 3. La pregunta. Va debajo, pero sigue siendo el label del input:
          el `for` los asocia sin importar el orden visual. */}
      <label htmlFor="name" className="block cursor-pointer">
        <Lettering piece="como" />
      </label>

      {/* 4. Las instrucciones */}
      <Lettering piece="holi" className="rotate-[0.3deg]" />

      {/* 5. El cierre de la nota */}
      <Lettering piece="gracias" className="-rotate-[0.4deg]" />
    </form>
  );
}
