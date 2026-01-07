import sql from "@/app/api/utils/sql";

// Approve/update review (admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { is_approved, approved_by } = await request.json();

    const result = await sql`
      UPDATE reviews
      SET 
        is_approved = ${is_approved},
        approved_by = ${approved_by || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json({ error: "Review not found" }, { status: 404 });
    }

    return Response.json({ review: result[0] });
  } catch (error) {
    console.error("Update review error:", error);
    return Response.json({ error: "Failed to update review" }, { status: 500 });
  }
}

// Delete review (admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      DELETE FROM reviews
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return Response.json({ error: "Review not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete review error:", error);
    return Response.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
