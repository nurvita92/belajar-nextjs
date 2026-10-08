import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deleteMessageAction } from "./actions";

export default async function MessagesPage() {
  await connection();

  const supabase = await createClient();

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#FAF9FF] via-[#F4F3FF] to-[#ECEBFF] text-[#192B62] px-6 py-20">
        <section className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold">Pesan Masuk</h1>
          <p className="mt-8 text-red-600">
            Gagal memuat pesan: {error.message}
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FAF9FF] via-[#F4F3FF] to-[#ECEBFF] text-[#192B62]">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl font-bold">Pesan Masuk</h1>

        <div className="mt-8 space-y-4">
          {messages.length === 0 ? (
            <p className="text-[#6676A3]">Belum ada pesan masuk.</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-[#C9C6FF] bg-white/60 p-5 shadow-sm backdrop-blur-sm"
              >
                <div>
                  <p className="font-medium text-[#192B62]">
                    {msg.name} — {msg.email}
                  </p>

                  <p className="mt-1 text-sm text-[#6676A3]">
                    {msg.message}
                  </p>
                </div>

                <form action={deleteMessageAction}>
                  <input
                    type="hidden"
                    name="id"
                    value={msg.id}
                  />

                  <button
                    type="submit"
                    className="rounded-full border border-red-300 px-4 py-1.5 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    Hapus
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}