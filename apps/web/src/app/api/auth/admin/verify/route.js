export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return Response.json({ error: "Token is required" }, { status: 400 });
    }

    // Decode token
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());

    // Check expiration
    if (decoded.exp < Date.now()) {
      return Response.json({ error: "Token expired" }, { status: 401 });
    }

    return Response.json({
      success: true,
      admin: {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
      },
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}
