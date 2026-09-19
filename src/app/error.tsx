"use client";

/**
 * Red de seguridad para cuando la pestaña lleva abierta desde antes de un
 * deploy: la página vieja le habla a un servidor nuevo, el envío falla con
 * "An unexpected response was received from the server" y sin esto el botón
 * se quedaría muerto sin explicación.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[34rem] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-sm uppercase leading-relaxed tracking-widest">
        Se cayó algo.
        <br />
        Recarga la página y vuelve a mandarlo.
      </p>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="min-h-[52px] rotate-[0.5deg] bg-ink px-6 py-3 font-mono text-base font-bold uppercase tracking-[0.2em] text-paper transition-transform duration-150 ease-out hover:-rotate-[0.5deg] active:scale-[0.98]"
      >
        Recargar
      </button>

      <button
        type="button"
        onClick={reset}
        className="font-mono text-xs uppercase tracking-widest underline underline-offset-4 opacity-55"
      >
        o intentar de nuevo sin recargar
      </button>
    </main>
  );
}
