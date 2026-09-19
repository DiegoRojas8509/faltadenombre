"use server";

import { getSupabase } from "@/lib/supabase";

export type SubmitState = { ok: boolean; message: string } | null;

export async function submitName(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const name = String(formData.get("name") ?? "").trim();

  if (name.length < 2) {
    return { ok: false, message: "Escribe algo, aunque sea una palabra" };
  }
  if (name.length > 80) {
    return { ok: false, message: "Se pasó de largo, córtale tantito" };
  }

  try {
    const { error } = await getSupabase().from("responses").insert({ name });
    if (error) throw error;
  } catch (err) {
    // Llaves mal puestas, tabla inexistente o Supabase caído: el visitante
    // ve un mensaje normal y el detalle queda en los logs del servidor.
    console.error("[submitName]", err);
    return { ok: false, message: "No se pudo guardar, inténtalo otra vez" };
  }

  return { ok: true, message: name };
}
