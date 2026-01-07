import sql from "@/app/api/utils/sql";
import argon2 from "argon2";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return Response.json(
        { error: "Username and password are required" },
        { status: 400 },
      );
    }

    // Get admin by username
    const admins = await sql`
      SELECT id, username, email, password_hash, full_name
      FROM admins
      WHERE username = ${username}
      LIMIT 1
    `;

    if (admins.length === 0) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const admin = admins[0];

    // Verify password
    const isValid = await argon2.verify(admin.password_hash, password);

    if (!isValid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create simple JWT-like token (base64 encoded admin info)
    const token = Buffer.from(
      JSON.stringify({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }),
    ).toString("base64");

    return Response.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
