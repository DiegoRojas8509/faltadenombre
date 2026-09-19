"use client";

import { useActionState } from "react";
import { submitName, type SubmitState } from "@/app/actions";

export function NameForm() {
  const [state, action, pending] = useActionState<SubmitState, FormData>(
    submitName,
    null,
  );

  if (state?.ok) {
    return (
      <p className="text-center text-lg font-medium text-neutral-900">
        Gracias, {state.message}.
      </p>
    );
  }

  return (
    <form action={action} className="flex w-full flex-col gap-3">
      <label htmlFor="name" className="sr-only">
        Tu nombre
      </label>

      <input
        id="name"
        name="name"
        type="text"
        required
        maxLength={80}
        autoComplete="name"
        placeholder="Tu nombre"
        disabled={pending}
        className="w-full rounded-full border border-neutral-300 bg-white/95 px-5 py-3 text-center text-base text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/15 disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-neutral-900 px-5 py-3 text-base font-medium text-white transition hover:bg-neutral-800 active:scale-[0.99] disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar"}
      </button>

      {state && !state.ok ? (
        <p role="alert" className="text-center text-sm text-red-600">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
