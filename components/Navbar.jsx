"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useFavorite } from "@/context/FavoriteContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Contact" },
  { href: "/favorites", label: "Favorites" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoggedIn } = useAuth();
  const { favorites } = useFavorite();

  // Ambil nama dari email user
  const userName = user?.email
    ? user.email.split("@")[0]
    : "User";

  // Bikin nama jadi lebih rapi
  const displayName =
    userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-4xl px-4">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-lg backdrop-blur-xl">

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-sm font-bold tracking-tight text-slate-900"
        >
          EduPuan
        </Link>

        {/* Menu */}
        <div className="hidden items-center gap-1 text-sm text-slate-600 sm:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            const label =
              link.href === "/favorites"
                ? `Favorites (${favorites.length})`
                : link.label;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-900",
                  isActive && "bg-slate-100 text-slate-900"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Login / User */}
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700">
              Hi, {displayName} 👋
            </span>

            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "outline",
                  }),
                  "rounded-full"
                )}
              >
                Logout
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/login"
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full"
            )}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}