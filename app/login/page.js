import { login, signup } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FAF9FF] via-[#F4F3FF] to-[#ECEBFF] text-[#192B62]">

      <div className="relative z-10 mx-auto max-w-md px-6 py-20">

        {/* Judul */}
        <div className="text-center">
          <p className="text-sm font-semibold text-[#6C63FF]">
            Account
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#192B62] md:text-5xl">
            Welcome Back
          </h1>

          <p className="mt-4 text-[#6676A3]">
            Login untuk melihat daftar favorite kamu, atau buat akun baru.
          </p>
        </div>

        {/* Card Login */}
        <Card className="mt-10 rounded-3xl border border-white/80 bg-white/45 shadow-[0_20px_60px_rgba(108,99,255,0.12)] backdrop-blur-xl">
          <CardContent className="p-6">

            <form className="space-y-4">

              {/* Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-[#192B62]"
                >
                  Name
                </label>

                <Input
                  id="name"
                  name="name"
                  placeholder="Nama kamu (untuk Sign Up)"
                  className="rounded-full border-[#C9C6FF] bg-white/60 text-[#192B62] placeholder:text-[#8D96BA] focus-visible:ring-[#6C63FF]"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[#192B62]"
                >
                  Email
                </label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="rounded-full border-[#C9C6FF] bg-white/60 text-[#192B62] placeholder:text-[#8D96BA] focus-visible:ring-[#6C63FF]"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#192B62]"
                >
                  Password
                </label>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimal 6 karakter"
                  required
                  className="rounded-full border-[#C9C6FF] bg-white/60 text-[#192B62] placeholder:text-[#8D96BA] focus-visible:ring-[#6C63FF]"
                />
              </div>

              {/* Tombol */}
              <div className="grid grid-cols-2 gap-3 pt-2">

                <Button
                  type="submit"
                  formAction={login}
                  className="rounded-full bg-gradient-to-r from-[#756BFF] to-[#6257F5] text-white shadow-md shadow-[#6C63FF]/20 hover:from-[#665CF5] hover:to-[#5549E8]"
                >
                  Login
                </Button>

                <Button
                  type="submit"
                  formAction={signup}
                  variant="outline"
                  className="rounded-full border-[#9E99FF] bg-white/40 text-[#6C63FF] hover:bg-[#F0EEFF]"
                >
                  Sign Up
                </Button>

              </div>

            </form>

          </CardContent>
        </Card>
      </div>
    </section>
  );
}