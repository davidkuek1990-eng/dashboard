export async function POST(req: Request) {
    const { email, password } = await req.json();

    const users = [
        {
            "id": 1,
            "email": "test@test.com",
            "password": "123456",
            "name": "Admin User",
            "role": "admin"
        }
    ];

    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) {
        return Response.json(
            { message: "Invalid credentials" },
            { status: 401 }
        );
    }

    return Response.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
}