
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
  UserRound,
} from "lucide-react";

export default function UserDetailPage() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
          throw new Error("User tidak ditemukan");
        }

        const data = await response.json();

        if (!data.id) {
          throw new Error("User tidak ditemukan");
        }

        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) getUser();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading profile...</p>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-5">
        <h1 className="text-2xl font-bold text-slate-900">
          User not found
        </h1>
        <Link
          href="/users"
          className="text-sky-700 underline"
        >
          Back to Users
        </Link>
      </main>
    );
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/users"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft className="size-4" />
          Back to Users
        </Link>

        {/* Profile header */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-2xl font-bold text-sky-800">
              {initials}
            </div>

            <div>
              <p className="mb-1 text-sm font-medium text-sky-700">
                User Profile
              </p>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {user.name}
              </h1>
              <p className="mt-1 text-slate-500">
                @{user.username}
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
              <UserRound className="size-5 text-sky-700" />
              Contact Information
            </h2>

            <div className="space-y-5">
              <div className="flex gap-3">
                <Mail className="mt-1 size-5 shrink-0 text-slate-400" />
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="break-all text-sm font-medium text-slate-800">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-1 size-5 shrink-0 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="text-sm font-medium text-slate-800">
                    {user.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Globe className="mt-1 size-5 shrink-0 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Website</p>
                  <p className="text-sm font-medium text-slate-800">
                    {user.website}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
              <MapPin className="size-5 text-sky-700" />
              Address
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500">Street</p>
                <p className="text-sm font-medium text-slate-800">
                  {user.address.street}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Suite</p>
                <p className="text-sm font-medium text-slate-800">
                  {user.address.suite}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">City</p>
                <p className="text-sm font-medium text-slate-800">
                  {user.address.city}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Zip Code</p>
                <p className="text-sm font-medium text-slate-800">
                  {user.address.zipcode}
                </p>
              </div>
            </div>
          </section>

          {/* Company */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Building2 className="size-5 text-sky-700" />
              Company Information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs text-slate-500">
                  Company Name
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {user.company.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Catch Phrase
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {user.company.catchPhrase}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs text-slate-500">
                  Business
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {user.company.bs}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}