"use client";

import { useEffect, useState } from "react";
import { Search, Users, LoaderCircle, Sparkles } from "lucide-react";
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
        setError(err.message || "Terjadi kesalahan");
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
    <main className="min-h-screen bg-[#E6E6FA] px-5 py-12 text-slate-800 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white via-[#F8F5FF] to-[#DCD0FF] p-7 shadow-sm sm:p-12">
          <div className="absolute -right-10 -top-10 size-48 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="absolute -bottom-16 right-1/4 size-40 rounded-full bg-purple-200/40 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700">
              <Sparkles className="size-4" />
              Welcome to Our Community
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Discover Our{" "}
              <span className="text-violet-600">Users.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Explore user profiles, discover new connections, and find
              your favorite people in one place.
            </p>

          
          </div>

          <div className="relative z-10 mt-8 flex items-center gap-3 text-sm font-medium text-violet-700 sm:absolute sm:bottom-8 sm:right-10 sm:mt-0">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Users className="size-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">
                {users.length || (loading ? "..." : "0")}
              </p>
              <p className="text-slate-500">Community members</p>
            </div>
          </div>
        </section>

        {/* User Directory */}
        <section id="user-directory" className="scroll-mt-8">
          <div className="mb-7">
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-violet-700">
              <Users className="size-4" />
              USER DIRECTORY
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Meet the Community
            </h2>

            <p className="mt-2 text-slate-600">
              Find and explore profiles from our user community.
            </p>
          </div>

          {/* Search */}
          <div className="mb-7 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-violet-400" />
              <Input
                type="text"
                placeholder="Search name, email, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 rounded-xl border-violet-100 bg-white/90 pl-10 text-slate-800 shadow-sm placeholder:text-slate-400 focus-visible:ring-violet-400"
              />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-white bg-white/70 py-20 text-violet-700">
              <LoaderCircle className="size-6 animate-spin" />
              Loading users...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-white p-6 text-center text-red-700">
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
              <div className="mb-5 flex items-center justify-between rounded-xl border border-white/80 bg-white/60 px-4 py-3">
                <p className="text-sm text-slate-600">
                  Showing{" "}
                  <span className="font-bold text-violet-700">
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
                <div className="rounded-2xl border border-white bg-white/80 p-12 text-center shadow-sm">
                  <Search className="mx-auto size-10 text-violet-400" />
                  <p className="mt-4 font-semibold text-slate-800">
                    No users found
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Try another name, email, or company.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}