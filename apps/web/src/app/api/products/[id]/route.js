import sql from "@/app/api/utils/sql";

// Get single product
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const products = await sql`
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ${id} AND p.is_active = true
      LIMIT 1
    `;

    if (products.length === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ product: products[0] });
  } catch (error) {
    console.error("Get product error:", error);
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// Update product (admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updates = await request.json();

    const setClauses = [];
    const values = [];
    let paramIndex = 1;

    const allowedFields = [
      "category_id",
      "name",
      "slug",
      "description",
      "price",
      "sale_price",
      "image_url",
      "gallery_images",
      "stock_quantity",
      "is_featured",
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
      UPDATE products
      SET ${setClauses.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await sql(query, values);

    if (result.length === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ product: result[0] });
  } catch (error) {
    console.error("Update product error:", error);
    return Response.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

// Delete product (admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete product error:", error);
    return Response.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
