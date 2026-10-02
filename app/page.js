"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Palette,
  Sparkles,
  Users2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import UserCard from "@/components/UserCards";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Fast, scalable web applications built with modern tooling and clean architecture.",
  },
  {
    icon: Palette,
    title: "UI Development",
    description:
      "Clean, responsive interfaces that feel intuitive on every screen size.",
  },
  {
    icon: Users2,
    title: "Consulting",
    description:
      "Practical guidance to help you plan and ship your next digital project.",
  },
];

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data user");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.slice(0, 3));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFF] text-[#172554]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EDEBFF] via-[#F8F7FF] to-[#EAF3FF]">
        <div className="absolute inset-0 bg-grid bg-radial-fade" />
        <div className="absolute top-1/2 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="animate-blob absolute top-24 left-10 -z-10 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="animate-blob absolute top-40 right-10 -z-10 h-64 w-64 rounded-full bg-purple-500/20 blur-[100px] [animation-delay:4s]" />

        <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
          <div className="animate-fade-up mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-foreground/5 px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="size-3.5" />
              Welcome to EduPuan
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-[#172554] md:text-6xl">
              Build something meaningful
              <span className="text-[#635BFF]"> with technology.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We help individuals and businesses build modern, simple, and
              useful digital experiences.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/services"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full px-6 shadow-lg shadow-primary/20"
                )}
              >
                Explore Services
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full px-6"
                )}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED USERS */}
      <section className="mx-auto max-w-6xl bg-[#F8FAFF] px-6 py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#172554] md:text-3xl">
              Featured Users
            </h2>

            <p className="mt-3 text-[#475569]">
              Meet some of the users in our community.
            </p>
          </div>

          <Link
            href="/users"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full"
            )}
          >
            View All Users
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>

        {loading ? (
          <p className="mt-8 text-center text-muted-foreground">
            Loading users...
          </p>
        ) : users.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-muted-foreground">
            Users could not be loaded. Please try again later.
          </p>
        )}
      </section>

      {/* WHAT WE DO */}
      <section className="mx-auto max-w-6xl bg-[#EAF3FF] px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#172554] md:text-3xl">
            What we do
          </h2>

          <p className="mt-3 text-muted-foreground">
            A small set of things we focus on, done well.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="group border border-white/10 bg-foreground/[0.03] transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/20"
            >
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="size-5" />
                </div>

                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl bg-[#F8FAFF] px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-[#1E40AF] px-8 py-14 text-center">
          <div className="bg-grid bg-radial-fade absolute inset-0 opacity-30" />

          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Have a project in mind?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Let&apos;s talk about what you&apos;re building and how we can
              help.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-[#1E40AF] transition-colors hover:bg-[#EDEBFF]"
            >
              Get in touch
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}