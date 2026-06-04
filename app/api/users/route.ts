let users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        status: "inactive",
    },
];

export async function GET() {
    return Response.json(users);
}

export async function POST(req: Request) {
    const body = await req.json();

    const newUser = {
        id: Date.now(),
        ...body,
    };

    users.push(newUser);

    return Response.json(newUser);
}

export async function PUT(req: Request) {
    const body = await req.json();

    users = users.map((u) =>
        u.id === body.id ? { ...u, ...body } : u
    );

    return Response.json({ success: true });
}

export async function DELETE(req: Request) {
    const { id } = await req.json();

    users = users.filter((u) => u.id !== id);

    return Response.json({ success: true });
}