
"use client";

import { Heart, ArrowUpRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { useFavorites } from "@/context/FavoriteContext";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserCard({ user }) {
  const { addFavorite, removeFavorite, isFavorite } =
    useFavorites();

  const favorited = isFavorite(user.id);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {/* Initials */}
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-700 ring-1 ring-slate-200">
            {initials}
          </div>

          {/* Name and status */}
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

      {/* Content */}
      <CardContent className="pt-0">
        {/* User information */}
        <div className="space-y-2">
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

        {/* Buttons */}
        <div className="mt-5 flex flex-col gap-2">
          {/* View Profile - top */}
          <a
            href={`https://jsonplaceholder.typicode.com/users/${user.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full rounded-md border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            View Profile
            <ArrowUpRight className="ml-1 size-4" />
          </a>

          {/* Favourite - bottom */}
          <Button
            variant="outline"
            aria-pressed={favorited}
            onClick={() =>
              favorited
                ? removeFavorite(user.id)
                : addFavorite(user)
            }
            className={cn(
              "w-full rounded-md transition-colors",
              favorited
                ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700"
                : "border-slate-300 bg-slate-900 text-white hover:bg-slate-700 hover:text-white"
            )}
          >
            <Heart
              className={cn(
                "mr-1 size-4",
                favorited && "fill-rose-500 text-rose-500"
              )}
            />
            {favorited
              ? "Remove Favourite"
              : "Add Favourite"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}