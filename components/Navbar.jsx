
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useFavorites } from "@/context/FavoriteContext";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { name, submitted } = useUser();

  const displayName =
    submitted && name?.trim() ? name : "Nurvita";

  const { favorites } = useFavorites();
  const pathname = usePathname();

  const favoriteCount = favorites.length;

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4">
      <nav className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-white/40 bg-gradient-to-r from-[#315CB5] to-[#9DB8F2] px-5 py-3 shadow-lg shadow-black/20 backdrop-blur-xl">

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 rounded-full px-3 py-2 text-base font-bold tracking-tight text-[#172554] transition hover:bg-white/30"
        >
          MyWebsite
        </Link>

        {/* Menu navigasi */}
        <div className="hidden items-center gap-2 text-sm sm:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full border border-white/70 px-4 py-2 text-[#172554] transition-all duration-200 hover:border-[#635BFF] hover:bg-white/60",
                  isActive &&
                    "border-[#635BFF] bg-[#635BFF] font-semibold text-white shadow-md hover:bg-[#5148E5]"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Favorites */}
          <Link
            href="/favorites"
            className={cn(
              "flex items-center gap-1.5 rounded-full border border-white/70 px-4 py-2 text-[#172554] transition-all duration-200 hover:border-[#635BFF] hover:bg-white/60",
              pathname?.startsWith("/favorites") &&
                "border-[#635BFF] bg-[#635BFF] font-semibold text-white shadow-md hover:bg-[#5148E5]"
            )}
          >
            <span>♥</span>
            <span>Favorites</span>

            <span
              className={cn(
                "ml-1 flex min-w-6 items-center justify-center rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[#315CB5]",
                pathname?.startsWith("/favorites") &&
                  "bg-white text-[#635BFF]"
              )}
            >
              {favoriteCount}
            </span>
          </Link>
        </div>

        {/* Sapaan user */}
        <span className="rounded-full border border-white/60 bg-white/20 px-4 py-2 text-sm font-medium text-[#172554]">
          Hi, {displayName} 👋
        </span>

        {/* Tombol Contact */}
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ size: "sm" }),
            "shrink-0 rounded-full bg-[#635BFF] px-5 text-white hover:bg-[#5148E5]"
          )}
        >
          Get in touch
        </Link>
      </nav>
    </header>
  );
}