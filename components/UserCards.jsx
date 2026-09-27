
"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useFavorites } from "@/context/FavoriteContext";

export default function UserCard({ user }) {
  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  const favorite = isFavorite(user.id);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(user.id);
    } else {
      addFavorite(user);
    }
  };

  return (
    <Card
      className={`border-2 border-black shadow-md transition-all duration-300 ${
        favorite
          ? "bg-[#EEE9FF] text-[#312E81]"
          : "bg-[#1E40AF] text-white"
      }`}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
              favorite
                ? "bg-[#D8CCFF] text-[#312E81]"
                : "bg-white/20 text-white"
            }`}
          >
            {initials}
          </div>

          <CardTitle
            className={
              favorite ? "text-[#312E81]" : "text-white"
            }
          >
            {user.name}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <p
          className={`text-sm ${
            favorite ? "text-[#4C438A]" : "text-white"
          }`}
        >
          {user.email}
        </p>

        <p
          className={`mt-1 text-sm ${
            favorite ? "text-[#4C438A]" : "text-white"
          }`}
        >
          {user.company.name}
        </p>

        <Button
          className="mt-4 w-full rounded-full border-0 bg-[#635BFF] text-white hover:bg-[#5148E5]"
        >
          View Profile
        </Button>

        <Button
          type="button"
          variant="outline"
          className={`mt-2 w-full rounded-full transition-all duration-300 ${
            favorite
              ? "border-[#635BFF] bg-[#635BFF] text-white hover:bg-[#5148E5]"
              : "border-[#FCE7F3] bg-[#FCE7F3] text-[#BE185D] hover:bg-[#FBCFE8]"
          }`}
          onClick={handleFavorite}
        >
          {favorite
            ? "♥ Remove from Favourite"
            : "♡ Add to Favourite"}
        </Button>
      </CardContent>
    </Card>
  );
}