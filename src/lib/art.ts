/**
 * Las cuatro piezas de lettering. Cada una viene recortada a su trazo
 * (sin aire alrededor), así que `width`/`height` son su proporción real
 * y sirven para reservar espacio y evitar saltos de layout.
 *
 * `width` en clases de Tailwind = qué tan grande se ve cada pieza en la
 * columna. Es lo único que hay que tocar para redimensionar.
 */
export const ART = {
  nombre: {
    src: "/art/nombre.png",
    width: 1800,
    height: 439,
    alt: "Ponme un nombre",
    size: "w-full",
  },
  holi: {
    src: "/art/holi.png",
    width: 1800,
    height: 536,
    alt: "Hola, estamos creando una agencia creativa / marketing… sólo di lo que te nazca del cul*",
    size: "w-[72%]",
  },
  como: {
    src: "/art/como.png",
    width: 1800,
    height: 472,
    alt: "Si tuvieras un negocio, ¿cómo le pondrías?",
    size: "w-[78%]",
  },
  gracias: {
    src: "/art/gracias.png",
    width: 1396,
    height: 462,
    alt: "Gracias <3",
    size: "w-[44%]",
  },
} as const;

export type ArtKey = keyof typeof ART;
