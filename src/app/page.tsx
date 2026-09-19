import Image from "next/image";
import { NameForm } from "@/components/NameForm";

/**
 * Único lugar donde se acomoda el formulario sobre el arte.
 * Los valores son % del alto/ancho del lienzo, así que escalan solos
 * en cualquier pantalla. Ajustar cuando lleguen los vectores finales.
 */
const LAYOUT = {
  aspect: "1080 / 1350", // proporción del arte (ancho / alto)
  top: "62%", // dónde empieza el bloque del input
  width: "68%", // ancho del bloque respecto al arte
};

export default function Page() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-neutral-100 p-4">
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
        style={{ aspectRatio: LAYOUT.aspect }}
      >
        {/* Arte vectorizado de fondo — reemplazar por el SVG final */}
        <Image
          src="/art/background.svg"
          alt=""
          fill
          priority
          className="object-cover"
        />

        {/* Capa del formulario */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: LAYOUT.top, width: LAYOUT.width }}
        >
          <NameForm />
        </div>
      </div>
    </main>
  );
}
