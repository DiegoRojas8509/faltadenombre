-- Tabla única del formulario. Ejecutar en Supabase → SQL Editor.

create table if not exists public.responses (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(trim(name)) between 1 and 80),
  created_at timestamptz not null default now()
);

-- RLS encendido y SIN políticas: nadie entra con la llave pública (anon).
-- Solo el service_role (que vive en el servidor de Next) puede insertar y leer.
alter table public.responses enable row level security;

create index if not exists responses_created_at_idx
  on public.responses (created_at desc);
