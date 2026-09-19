import { Lettering } from "@/components/Lettering";
import { NameForm } from "@/components/NameForm";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[34rem] flex-col justify-center gap-8 px-6 py-14 sm:px-8">
      <h1 className="sr-only">Ponme un nombre</h1>

      {/* 1. El título */}
      <Lettering piece="nombre" priority className="-rotate-[0.6deg]" />

      {/* 2. Input + botón · 3. La pregunta · 4. Las instrucciones
          (y el GRACIAS cuando se envía) */}
      <NameForm />
    </main>
  );
}
