export async function GET() {
  return Response.json({
    name: "Nur Vita Sari",
    role: "peserta bootcamp",
    favoriteTech: [
      "Next.js",
      "React",
      "Tailwind CSS",
    ],
  });
}