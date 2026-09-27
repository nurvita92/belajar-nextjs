
"use client";

import Link from "next/link";

import { useFavorites } from "@/context/FavoriteContext";
import UserCard from "@/components/UserCards";


export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <main className="min-h-screen bg-[#F8FAFF] text-[#172554]">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">

        {/* Header halaman */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-primary">
            YOUR COLLECTION
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            My Favorites ♥
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            All the users you have saved in one place.
          </p>
        </div>

        {/* Jika belum ada Favourite */}
        {favorites.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-foreground/20 bg-foreground/[0.02] px-6 text-center">

            <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10 text-3xl text-primary">
              ♡
            </div>

            <h2 className="text-xl font-semibold">
              No favorites yet
            </h2>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              You haven&apos;t added any users to your
              favorites yet. Explore users and save
              the ones you like.
            </p>

            <Link
           href="/users"
           className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
>
             Explore Users
           </Link>

          </div>
        ) : (

          /* Jika sudah ada Favourite */
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {favorites.length}{" "}
                {favorites.length === 1
                  ? "user"
                  : "users"}{" "}
                saved
              </p>

              <Link
                href="/users"
                className="text-sm font-medium text-primary hover:underline"
              >
                Explore more →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                />
              ))}
            </div>
          </>
        )}

      </section>
    </main>
  );
}