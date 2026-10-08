"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteMessageAction(formData) {
  const supabase = await createClient();
  const id = Number(formData.get("id"));

  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/messages");
  return { success: true };
}
