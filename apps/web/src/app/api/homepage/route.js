import sql from "@/app/api/utils/sql";

// Get homepage content
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionType = searchParams.get("section");

    let query = `SELECT * FROM homepage_content WHERE is_active = true`;
    const params = [];
    let paramIndex = 1;

    if (sectionType) {
      query += ` AND section_type = $${paramIndex}`;
      params.push(sectionType);
      paramIndex++;
    }

    query += ` ORDER BY display_order ASC, created_at DESC`;

    const content = await sql(query, params);

    return Response.json({ content });
  } catch (error) {
    console.error("Get homepage content error:", error);
    return Response.json(
      { error: "Failed to fetch homepage content" },
      { status: 500 },
    );
  }
}

// Create homepage content (admin only)
export async function POST(request) {
  try {
    const {
      section_type,
      title,
      subtitle,
      image_url,
      link_url,
      button_text,
      display_order,
    } = await request.json();

    if (!section_type) {
      return Response.json(
        { error: "Section type is required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO homepage_content (
        section_type, title, subtitle, image_url, link_url, button_text, display_order
      )
      VALUES (
        ${section_type}, ${title || null}, ${subtitle || null}, ${image_url || null},
        ${link_url || null}, ${button_text || null}, ${display_order || 0}
      )
      RETURNING *
    `;

    return Response.json({ content: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Create homepage content error:", error);
    return Response.json(
      { error: "Failed to create homepage content" },
      { status: 500 },
    );
  }
}
