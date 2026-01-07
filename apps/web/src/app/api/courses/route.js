import sql from "@/app/api/utils/sql";

// Get all courses
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") !== "false";
    const level = searchParams.get("level");

    let query = `SELECT * FROM courses WHERE 1=1`;
    const params = [];
    let paramIndex = 1;

    if (activeOnly) {
      query += ` AND is_active = true`;
    }

    if (level) {
      query += ` AND level = $${paramIndex}`;
      params.push(level);
      paramIndex++;
    }

    query += ` ORDER BY created_at DESC`;

    const courses = await sql(query, params);

    return Response.json({ courses });
  } catch (error) {
    console.error("Get courses error:", error);
    return Response.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

// Create course (admin only)
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
      level,
      lessons_count,
    } = await request.json();

    if (!title || !slug || !price) {
      return Response.json(
        { error: "Title, slug, and price are required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO courses (
        title, slug, description, instructor, duration, price,
        image_url, level, lessons_count
      )
      VALUES (
        ${title}, ${slug}, ${description || null}, ${instructor || null},
        ${duration || null}, ${price}, ${image_url || null},
        ${level || null}, ${lessons_count || null}
      )
      RETURNING *
    `;

    return Response.json({ course: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Create course error:", error);
    return Response.json({ error: "Failed to create course" }, { status: 500 });
  }
}
