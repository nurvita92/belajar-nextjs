import Link from "next/link";

export default async function ErrorPage({ searchParams }) {
  const { message } = await searchParams;

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FAF9FF] via-[#F4F3FF] to-[#ECEBFF] px-4 py-24 text-[#192B62]">
      <div className="mx-auto max-w-md text-center">
        <div className="rounded-3xl border border-white/80 bg-white/60 p-8 shadow-[0_20px_60px_rgba(108,99,255,0.12)] backdrop-blur-xl">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#F0EEFF] text-3xl">
            !
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#192B62]">
            Terjadi kesalahan
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#6676A3]">
            {message ?? "Email atau password salah."}
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#756BFF] to-[#6257F5] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#6C63FF]/20 transition hover:from-[#665CF5] hover:to-[#5549E8]"
          >
            Kembali ke Login
          </Link>
        </div>
      </div>
    </section>
  );
}