import Link from "next/link";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  await connection();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#FAF9FF] via-[#F4F3FF] to-[#ECEBFF] px-6 py-20">
        <div className="mx-auto max-w-xl rounded-3xl bg-white/70 p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-[#192B62]">
            Kamu belum login
          </h1>
        </div>
      </main>
    );
  }

  const name = user.user_metadata?.name || "User";
  const email = user.email || "";

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FAF9FF] via-[#F4F3FF] to-[#ECEBFF] px-6 py-16 text-[#192B62]">
      <section className="mx-auto max-w-2xl">
        <Link
  href="/"
  className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DDD9FF] bg-white/70 px-4 py-2 text-sm font-medium text-[#6C63FF] shadow-sm transition hover:bg-[#F0EEFF]"
>
  ← Kembali ke Home
</Link>
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#6C63FF]">
            MY ACCOUNT
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Profil Pengguna
          </h1>

          <p className="mt-2 text-[#6676A3]">
            Informasi akun yang sedang kamu gunakan.
          </p>
        </div>

        <div className="rounded-3xl border border-white/80 bg-white/60 p-8 shadow-[0_20px_60px_rgba(108,99,255,0.12)] backdrop-blur-xl">
          {/* HEADER PROFILE */}
          <div className="flex items-center gap-5 border-b border-[#E5E2FF] pb-6">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#EAE8FF] text-2xl font-bold text-[#6C63FF]">
              {name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {name}
              </h2>

              <p className="text-sm text-[#6676A3]">
                Akun aktif
              </p>
            </div>
          </div>

          {/* ACCOUNT INFORMATION */}
          <div className="mt-6 space-y-5">
            {/* NAME */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8A86B3]">
                Nama Pengguna
              </p>

              <p className="mt-2 rounded-2xl border border-[#DDD9FF] bg-white/70 px-4 py-3 font-medium shadow-sm">
                {name}
              </p>
            </div>

            {/* EMAIL */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8A86B3]">
                Email
              </p>

              <p className="mt-2 rounded-2xl border border-[#DDD9FF] bg-white/70 px-4 py-3 font-medium shadow-sm">
                {email}
              </p>
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8A86B3]">
                  Kata Sandi
                </p>

                <span className="rounded-full bg-[#EAE8FF] px-3 py-1 text-[11px] font-semibold text-[#6C63FF]">
                  🔒 Aman
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between rounded-2xl border border-[#DDD9FF] bg-white/70 px-4 py-4 shadow-sm">
                <div>
                  <p className="text-lg font-semibold tracking-[0.35em] text-[#192B62]">
                    ••••••••
                  </p>

                  <p className="mt-1 text-xs text-[#8A86B3]">
                    Password kamu tersimpan dengan aman
                  </p>
                </div>

                <div className="flex size-10 items-center justify-center rounded-full bg-[#F0EEFF] text-lg">
                  🔐
                </div>
              </div>

              {/* CHANGE PASSWORD BUTTON */}
              <Link
  href="/account/password"
  className="mt-3 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#756BFF] to-[#6257F5] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#6C63FF]/20 transition hover:from-[#665CF5] hover:to-[#5549E8]"
>
  Ubah Kata Sandi
</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}