import sql from "@/app/api/utils/sql";

// Get all categories
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") !== "false";

    let query = `
      SELECT * FROM categories
      WHERE 1=1
    `;
    const params = [];

    if (activeOnly) {
      query += ` AND is_active = true`;
    }

    query += ` ORDER BY display_order ASC, name ASC`;

    const categories = await sql(query, params);

    return Response.json({ categories });
  } catch (error) {
    console.error("Get categories error:", error);
    return Response.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

// Create category (admin only)
export async function POST(request) {
  try {
    const { name, slug, description, image_url, display_order } =
      await request.json();

    if (!name || !slug) {
      return Response.json(
        { error: "Name and slug are required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO categories (name, slug, description, image_url, display_order)
      VALUES (${name}, ${slug}, ${description || null}, ${image_url || null}, ${display_order || 0})
      RETURNING *
    `;

    return Response.json({ category: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Create category error:", error);
    return Response.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}
