import { NameForm } from "@/components/NameForm";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[34rem] flex-col justify-center px-6 py-14 sm:px-8">
      <h1 className="sr-only">Ponme un nombre</h1>

      {/* Título, input, pregunta e instrucciones — y solo el GRACIAS al mandar */}
      <NameForm />
    </main>
  );
}
