import sql from "@/app/api/utils/sql";

// Update category (admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updates = await request.json();

    const setClauses = [];
    const values = [];
    let paramIndex = 1;

    const allowedFields = [
      "name",
      "slug",
      "description",
      "image_url",
      "display_order",
      "is_active",
    ];

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        setClauses.push(`${field} = $${paramIndex}`);
        values.push(updates[field]);
        paramIndex++;
      }
    }

    if (setClauses.length === 0) {
      return Response.json(
        { error: "No valid fields to update" },
        { status: 400 },
      );
    }

    setClauses.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE categories
      SET ${setClauses.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await sql(query, values);

    if (result.length === 0) {
      return Response.json({ error: "Category not found" }, { status: 404 });
    }

    return Response.json({ category: result[0] });
  } catch (error) {
    console.error("Update category error:", error);
    return Response.json(
      { error: "Failed to update category" },
      { status: 500 },
    );
  }
}

// Delete category (admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      DELETE FROM categories
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return Response.json({ error: "Category not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete category error:", error);
    return Response.json(
      { error: "Failed to delete category" },
      { status: 500 },
    );
  }
}
