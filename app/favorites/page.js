"use client";

import Link from "next/link";

import { useFavorite } from "@/context/FavoriteContext";
import UserCard from "@/components/UserCards";

export default function FavoritesPage() {
  const { favorites } = useFavorite();
  const favoriteCount = favorites.length;

  return (
    <main className="min-h-screen bg-[#F8F7FF] text-[#192B62]">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-[#6C63FF]">
            YOUR COLLECTION
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            My Favorites User ♥
          </h1>

          <p className="mt-2 text-sm text-[#6676A3]">
            All the users you have saved in one place.
          </p>
        </div>

        {/* Belum ada favorite */}
        {favoriteCount === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#C9C6FF] bg-white/50 px-6 text-center shadow-sm">
            <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-[#EAE8FF] text-3xl text-[#6C63FF]">
              ♡
            </div>

            <h2 className="text-xl font-semibold text-[#192B62]">
              No favorites yet
            </h2>

            <p className="mt-2 max-w-sm text-sm text-[#6676A3]">
              You haven&apos;t added any users to your favorites yet.
              Explore users and save the ones you like.
            </p>

            <Link
              href="/users"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[#6C63FF] px-6 text-sm font-medium text-white transition-colors hover:bg-[#5B52E8]"
            >
              Explore Users
            </Link>
          </div>
        ) : (
          /* Sudah ada favorite */
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-[#6676A3]">
                {favoriteCount} {favoriteCount === 1 ? "user" : "users"} added
                this session
              </p>

              <Link
                href="/users"
                className="text-sm font-medium text-[#6C63FF] hover:underline"
              >
                Explore more →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((favorite) => {
                const u = favorite.user ?? favorite.app_users;

                return (
                  <UserCard
                    key={favorite.user_id ?? u.id}
                    user={{
                      id: u.id,
                      name: u.name,
                      email: u.email,
                      company: u.company ?? { name: u.company_name },
                    }}
                  />
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}