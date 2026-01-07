import sql from "@/app/api/utils/sql";

// Get reviews for a product
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const approvedOnly = searchParams.get("approved") !== "false";

    let query = `SELECT * FROM reviews WHERE 1=1`;
    const params = [];
    let paramIndex = 1;

    if (productId) {
      query += ` AND product_id = $${paramIndex}`;
      params.push(productId);
      paramIndex++;
    }

    if (approvedOnly) {
      query += ` AND is_approved = true`;
    }

    query += ` ORDER BY created_at DESC`;

    const reviews = await sql(query, params);

    return Response.json({ reviews });
  } catch (error) {
    console.error("Get reviews error:", error);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// Create review
export async function POST(request) {
  try {
    const { product_id, customer_name, customer_email, rating, comment } =
      await request.json();

    if (!product_id || !customer_name || !rating) {
      return Response.json(
        { error: "Product ID, name, and rating are required" },
        { status: 400 },
      );
    }

    if (rating < 1 || rating > 5) {
      return Response.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO reviews (product_id, customer_name, customer_email, rating, comment)
      VALUES (${product_id}, ${customer_name}, ${customer_email || null}, ${rating}, ${comment || null})
      RETURNING *
    `;

    return Response.json({ review: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Create review error:", error);
    return Response.json({ error: "Failed to create review" }, { status: 500 });
  }
}
