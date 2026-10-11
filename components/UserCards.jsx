
"use client";

import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { useFavorite } from "@/context/FavoriteContext";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserCard({ user }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();

  const favorited = isFavorite(user.id);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleFavorite = () => {
    if (favorited) {
      removeFavorite(user.id);
    } else {
      addFavorite(user);
    }
  };

  return (
    <Card className="group overflow-hidden rounded-2xl border border-violet-100 bg-white text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/70">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#E6E6FA] text-sm font-bold text-violet-800 ring-1 ring-violet-100">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <CardTitle className="truncate text-base font-bold text-slate-900">
              {user.name}
            </CardTitle>

            {favorited ? (
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-rose-600">
                <Heart className="size-3 fill-rose-500 text-rose-500" />
                Favorited
              </span>
            ) : (
              <span className="mt-1 block text-xs text-slate-500">
                User profile
              </span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Email
            </p>
            <p className="break-all text-sm text-slate-700">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Company
            </p>
            <p className="text-sm text-slate-700">
              {user.company?.name || "Tidak ada perusahaan"}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {/* View Profile */}
          <Link
            href={`/users/${user.id}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full rounded-xl border-[#D8D8F5] bg-[#E6E6FA] text-violet-900 transition-colors hover:border-[#C7C7ED] hover:bg-[#D8D8F5] hover:text-violet-950"
            )}
          >
            View Profile
            <ArrowUpRight className="ml-1 size-4" />
          </Link>

          {/* Add / Remove Favorite */}
          <Button
            type="button"
            variant="outline"
            aria-pressed={favorited}
            onClick={handleFavorite}
            className={cn(
              "w-full rounded-xl border transition-colors duration-150",
              favorited
                ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700"
                : "border-[#D8D8F5] bg-[#E6E6FA] text-violet-900 hover:border-[#C7C7ED] hover:bg-[#D8D8F5] hover:text-violet-950"
            )}
          >
            <Heart
              className={cn(
                "mr-1 size-4",
                favorited && "fill-rose-500 text-rose-500"
              )}
            />
            {favorited ? "Remove Favorite" : "Add Favorite"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}