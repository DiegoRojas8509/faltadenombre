@AGENTS.md

# Ponme un nombre

Formulario de una sola pregunta para nombrar la agencia creativa/marketing.
Una pantalla, un input, ~50 respuestas esperadas.

## Stack
- Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript
- Supabase Postgres para guardar las respuestas
- Deploy en Vercel

## Cómo está armado
El orden en pantalla es: título → input + botón → pregunta → instrucciones.
Todo cabe en una pantalla sin scroll. Al mandar, la pantalla se vacía y queda
únicamente el GRACIAS.

- `src/app/page.tsx` — la columna centrada; el contenido lo pone `NameForm`
- `src/components/NameForm.tsx` — client component; `useActionState` para envío, error y el estado de gracias
- `src/components/Lettering.tsx` — pinta las piezas de lettering; se invierten en modo oscuro
- `src/lib/art.ts` — **el único lugar para redimensionar el lettering** (la clase de `size`)
- `src/app/actions.ts` — server action: valida y escribe en Supabase
- `src/app/error.tsx` — pantalla de rescate cuando la pestaña quedó abierta desde
  antes de un deploy y el server action ya no existe
- `supabase/schema.sql` — tabla `responses`, con RLS encendido y sin políticas

## Decisiones que no son obvias en el código
- **La escritura pasa por el servidor.** RLS sin políticas ⇒ la llave publishable no
  puede tocar la tabla; solo la secret key, que vive en el server action. Evita que
  alguien encuentre la llave pública y llene la tabla de basura.
- **Se usan las llaves nuevas de Supabase** (`sb_publishable_` / `sb_secret_`), no las
  legacy `anon` / `service_role`. La secret key además devuelve 401 si se llama desde
  un navegador, así que una fuga accidental al cliente falla en vez de funcionar.
- **El lettering es PNG con alfa, no SVG.** Vienen recortados a su trazo, así que
  `width`/`height` en `art.ts` son la proporción real y reservan espacio (sin CLS).
  Los originales sin recortar están en `art-originales/`.
- **Tema claro fijo** (`color-scheme: light`). El lettering es tinta negra, así que
  seguir el modo oscuro del navegador obligaría a invertirlo; se decidió que se vea
  igual para todos.
- **La pregunta es el `<label>` del input**, aunque va debajo. `como.png` vive en un
  `<label for="name">`: el `for` los asocia sin importar el orden visual, así que el
  lettering funciona como etiqueta real y no como decoración.

## Variables de entorno
Copiar `.env.local.example` a `.env.local`. En Vercel, las mismas dos en
Project Settings → Environment Variables. `SUPABASE_SECRET_KEY` nunca lleva el
prefijo `NEXT_PUBLIC_`.

## Ver las respuestas
Supabase → Table Editor → `responses`. Exportar a CSV desde ahí.

## Verificado el 2026-09-19
Circuito completo probado contra el Supabase real: conexión, insert desde el
formulario, lectura y borrado. La tabla quedó en 0 filas (se limpiaron las pruebas).

## Pendiente
- [ ] Definir el nombre real del proyecto (hoy el paquete se llama `formulario`)
