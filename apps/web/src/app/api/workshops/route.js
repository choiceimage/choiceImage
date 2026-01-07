import sql from "@/app/api/utils/sql";

// Get all workshops
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") !== "false";

    let query = `SELECT * FROM workshops WHERE 1=1`;
    const params = [];

    if (activeOnly) {
      query += ` AND is_active = true`;
    }

    query += ` ORDER BY schedule_date ASC NULLS LAST, created_at DESC`;

    const workshops = await sql(query, params);

    return Response.json({ workshops });
  } catch (error) {
    console.error("Get workshops error:", error);
    return Response.json(
      { error: "Failed to fetch workshops" },
      { status: 500 },
    );
  }
}

// Create workshop (admin only)
export async function POST(request) {
  try {
    const {
      title,
      slug,
      description,
      instructor,
      duration,
      price,
      image_url,
      schedule_date,
      location,
      max_participants,
    } = await request.json();

    if (!title || !slug || !price) {
      return Response.json(
        { error: "Title, slug, and price are required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO workshops (
        title, slug, description, instructor, duration, price,
        image_url, schedule_date, location, max_participants
      )
      VALUES (
        ${title}, ${slug}, ${description || null}, ${instructor || null},
        ${duration || null}, ${price}, ${image_url || null},
        ${schedule_date || null}, ${location || null}, ${max_participants || null}
      )
      RETURNING *
    `;

    return Response.json({ workshop: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Create workshop error:", error);
    return Response.json(
      { error: "Failed to create workshop" },
      { status: 500 },
    );
  }
}
