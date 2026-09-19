import Image from "next/image";
import { ART, type ArtKey } from "@/lib/art";

export function Lettering({
  piece,
  size,
  className = "",
  priority = false,
}: {
  piece: ArtKey;
  /** Ancho alterno; si no se pasa, usa el de `art.ts` */
  size?: string;
  className?: string;
  priority?: boolean;
}) {
  const art = ART[piece];

  return (
    <Image
      src={art.src}
      alt={art.alt}
      width={art.width}
      height={art.height}
      priority={priority}
      sizes="(max-width: 640px) 100vw, 900px"
      className={`mx-auto h-auto ${size ?? art.size} ${className}`}
    />
  );
}
