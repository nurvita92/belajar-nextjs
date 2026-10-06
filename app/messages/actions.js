"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function deleteMessageAction(formData) {
  const id = formData.get("id");

  if (!id) {
    return;
  }

  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/messages");
}