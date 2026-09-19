"use server";

import { getSupabase } from "@/lib/supabase";

export type SubmitState = { ok: boolean; message: string } | null;

export async function submitName(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const name = String(formData.get("name") ?? "").trim();

  if (name.length < 2) {
    return { ok: false, message: "Escribe tu nombre para continuar." };
  }
  if (name.length > 80) {
    return { ok: false, message: "Ese nombre es demasiado largo." };
  }

  const { error } = await getSupabase().from("responses").insert({ name });

  if (error) {
    console.error("[submitName]", error);
    return { ok: false, message: "No se pudo guardar. Intenta de nuevo." };
  }

  return { ok: true, message: name };
}
