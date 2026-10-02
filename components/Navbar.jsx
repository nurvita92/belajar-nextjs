"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useFavorites } from "@/context/FavoriteContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { name, submitted } = useUser();
  const { favorites } = useFavorites();
  const pathname = usePathname();

  const displayName =
    submitted && name?.trim() ? name : "Nurvitasari";

  const favoriteCount = favorites.length;

  return (
    <header className="sticky top-3 z-50 mx-auto w-full max-w-7xl px-4">
      <nav className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/20 bg-gradient-to-r from-[#6478B5] via-[#7486C2] to-[#6478B5] px-5 py-4 shadow-lg shadow-[#6478B5]/20">

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-white transition hover:text-white/75"
        >
          EduPuan<span className="text-white/50">.</span>
        </Link>

        {/* Menu navigasi */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b-2 py-1 text-sm font-medium transition ${
                  isActive
                    ? "border-white text-white"
                    : "border-transparent text-white/75 hover:border-white/40 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Favorites */}
          <Link
            href="/favorites"
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
              pathname?.startsWith("/favorites")
                ? "bg-white text-[#6478B5] shadow-sm"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <span>♥</span>
            <span>Favorites</span>

            <span
              className={`flex h-5 min-w-5 items-center justify-center rounded px-1 text-xs font-bold ${
                pathname?.startsWith("/favorites")
                  ? "bg-[#E8ECFF] text-[#6478B5]"
                  : "bg-white text-[#6478B5]"
              }`}
            >
              {favoriteCount}
            </span>
          </Link>
        </div>

        {/* Sapaan user */}
        <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-xs font-bold text-[#6478B5]">
            {displayName.trim().charAt(0).toUpperCase()}
          </span>

          <span className="text-sm font-medium text-white/90">
            Hi, {displayName}
          </span>
        </div>

        {/* Tombol Get in touch */}
        <Link
          href="/contact"
          className="shrink-0 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-[#6478B5] shadow-sm transition hover:bg-[#F0F2FF]"
        >
          Get in touch
        </Link>

      </nav>
    </header>
  );
}