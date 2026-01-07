import sql from "@/app/api/utils/sql";

// Get all products with optional filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "created_at";
    const order = searchParams.get("order") || "DESC";

    let query = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true
    `;
    const params = [];
    let paramIndex = 1;

    if (categoryId) {
      query += ` AND p.category_id = $${paramIndex}`;
      params.push(categoryId);
      paramIndex++;
    }

    if (featured === "true") {
      query += ` AND p.is_featured = true`;
    }

    if (search) {
      query += ` AND (LOWER(p.name) LIKE LOWER($${paramIndex}) OR LOWER(p.description) LIKE LOWER($${paramIndex}))`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    // Validate sort column
    const validSorts = ["created_at", "price", "name"];
    const sortColumn = validSorts.includes(sort) ? sort : "created_at";
    const sortOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

    query += ` ORDER BY p.${sortColumn} ${sortOrder}`;

    const products = await sql(query, params);

    return Response.json({ products });
  } catch (error) {
    console.error("Get products error:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// Create new product (admin only)
export async function POST(request) {
  try {
    const {
      category_id,
      name,
      slug,
      description,
      price,
      sale_price,
      image_url,
      gallery_images,
      stock_quantity,
      is_featured,
    } = await request.json();

    if (!name || !slug || !price) {
      return Response.json(
        { error: "Name, slug, and price are required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO products (
        category_id, name, slug, description, price, sale_price,
        image_url, gallery_images, stock_quantity, is_featured
      )
      VALUES (
        ${category_id || null}, ${name}, ${slug}, ${description || null},
        ${price}, ${sale_price || null}, ${image_url || null},
        ${gallery_images || []}, ${stock_quantity || 0}, ${is_featured || false}
      )
      RETURNING *
    `;

    return Response.json({ product: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return Response.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
