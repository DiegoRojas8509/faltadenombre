import Image from "next/image";
import { ART, type ArtKey } from "@/lib/art";

/**
 * El lettering es tinta negra sobre fondo transparente, así que en modo
 * oscuro se invierte a blanco en lugar de desaparecer.
 */
export function Lettering({
  piece,
  className = "",
  priority = false,
}: {
  piece: ArtKey;
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
      sizes="(max-width: 640px) 100vw, 560px"
      className={`h-auto ${art.size} dark:invert ${className}`}
    />
  );
}
