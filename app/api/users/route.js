const users = [
    { id: 1, name: "Leanne Graham", email: "Leanne@example.com" },
    { id: 2, name: "Ervin Howell", email: "Ervin@example.com" },
    { id: 3, name: "Clementine Bauch", email: "Clementine@example.com" },
];

export async function GET() {
    return Response.json(users);
}
