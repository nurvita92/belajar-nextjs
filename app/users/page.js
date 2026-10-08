
"use client";

import { useEffect, useState } from "react";
import { Search, Users, LoaderCircle } from "lucide-react";
import UserCard from "@/components/UserCards";
import { Input } from "@/components/ui/input";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
  "https://jsonplaceholder.typicode.com/users"
);

        if (!response.ok) {
          throw new Error("Gagal mengambil data users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-800">
            <Users className="size-4" />
            User Directory
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Our Users
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Explore user information, discover their profiles,
            and save your favorite users in one place.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search name, email, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 rounded-xl border-slate-200 bg-white pl-10 text-slate-800 shadow-sm"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-20 text-slate-600">
            <LoaderCircle className="size-6 animate-spin" />
            Loading users...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Users */}
        {!loading && !error && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {filteredUsers.length}
                </span>{" "}
                of {users.length} users
              </p>
            </div>

            {filteredUsers.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
                <p className="font-semibold text-slate-800">
                  No users found
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try another name, email, or company.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}