
"use client";
import { submitContactForm } from "./actions";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";


const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@mywebsite.com" },
  { icon: MapPin, label: "Location", value: "Jakarta, Indonesia" },
  { icon: MessageCircle, label: "Response time", value: "Within 1-2 days" },
];

export default function Contact() {
  const {
    name,
    email,
    message,
    submitted,
    setName,
    setEmail,
    setMessage,
    setSubmitted,
  } = useUser();

  async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", message);

  const result = await submitContactForm(formData);

  if (result.success) {
    setSubmitted(true);
  } else {
    alert(result.error);
  }
}

  return (
    <section className="min-h-screen bg-[#F8FAFF] text-[#172554]">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">
            Contact
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Let&apos;s talk
          </h1>

          <p className="mt-4 text-muted-foreground">
            Have a project or question in mind? Send us a message and
            we&apos;ll get back to you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-5">
          {/* CONTACT INFORMATION */}
          <div className="space-y-4 md:col-span-2">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <Card
                key={label}
                className="border border-gray-200 bg-white text-[#172554] shadow-sm"
              >
                <CardContent className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      {label}
                    </p>

                    <p className="text-sm font-medium">
                      {value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FORM */}
          <Card className="border border-gray-200 bg-white text-[#172554] shadow-sm md:col-span-3">
            <CardContent className="space-y-6">

              {submitted ? (
                <div className="flex min-h-64 flex-col items-center justify-center text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <span className="text-3xl">✓</span>
                  </div>

                  <p className="text-xl font-bold">
                    Message sent!
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Thanks for reaching out — we&apos;ll reply soon.
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-6 rounded-full"
                    onClick={() => setSubmitted(false)}
                  >
                    Edit message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-sm font-semibold"
                      >
                        Name
                      </label>

                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        value={name}
                        onChange={(event) =>
                          setName(event.target.value)
                        }
                        className="text-gray-900"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold"
                      >
                        Email
                      </label>

                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
                        className="text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Tell us about your project..."
                      value={message}
                      onChange={(event) =>
                        setMessage(event.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full"
                  >
                    Send message
                  </Button>
                </form>
              )}

              {/* LIVE PREVIEW: ONE BIG BOX */}
              <div className="rounded-xl border-2 border-[#172554] bg-white p-5 text-[#172554] shadow-sm">
                <h3 className="mb-4 border-b border-gray-200 pb-3 text-lg font-bold">
                  Your Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold">
                      Name:
                    </p>
                    <p className="mt-1 min-h-6 break-words text-sm text-gray-600">
                      {name || "Belum diisi"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Email:
                    </p>
                    <p className="mt-1 min-h-6 break-words text-sm text-gray-600">
                      {email || "Belum diisi"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Message:
                    </p>
                    <p className="mt-1 min-h-6 whitespace-pre-wrap break-words text-sm text-gray-600">
                      {message || "Belum diisi"}
                    </p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}