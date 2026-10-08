"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      setMessage("Password minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setPassword("");
    setConfirmPassword("");
    setMessage("Password berhasil diperbarui! 🎉");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FAF9FF] via-[#F4F3FF] to-[#ECEBFF] px-6 py-16 text-[#192B62]">
      <section className="mx-auto max-w-xl">
        <Link
  href="/account"
  className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DDD9FF] bg-white/70 px-4 py-2 text-sm font-medium text-[#6C63FF] shadow-sm transition hover:bg-[#F0EEFF]"
>
  ← Kembali ke Akun
</Link>
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#6C63FF]">
            SECURITY
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Ubah Kata Sandi
          </h1>

          <p className="mt-2 text-[#6676A3]">
            Buat kata sandi baru untuk menjaga keamanan akunmu.
          </p>
        </div>

        <div className="rounded-3xl border border-white/80 bg-white/60 p-8 shadow-[0_20px_60px_rgba(108,99,255,0.12)] backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-[#192B62]">
                Kata Sandi Baru
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi baru"
                className="mt-2 w-full rounded-2xl border border-[#DDD9FF] bg-white/80 px-4 py-3 outline-none transition focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#192B62]">
                Konfirmasi Kata Sandi
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Masukkan kembali kata sandi"
                className="mt-2 w-full rounded-2xl border border-[#DDD9FF] bg-white/80 px-4 py-3 outline-none transition focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20"
              />
            </div>

            {message && (
              <div className="rounded-2xl bg-[#F0EEFF] px-4 py-3 text-sm text-[#6C63FF]">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-[#756BFF] to-[#6257F5] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#6C63FF]/20 transition hover:from-[#665CF5] hover:to-[#5549E8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan Kata Sandi"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}