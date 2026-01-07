import sql from "@/app/api/utils/sql";

// Get single order with details (admin only)
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const orders = await sql`
      SELECT * FROM orders
      WHERE id = ${id}
      LIMIT 1
    `;

    if (orders.length === 0) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    const items = await sql`
      SELECT * FROM order_items
      WHERE order_id = ${id}
      ORDER BY id ASC
    `;

    const tracking = await sql`
      SELECT * FROM order_tracking
      WHERE order_id = ${id}
      ORDER BY created_at DESC
    `;

    const payments = await sql`
      SELECT * FROM payments
      WHERE order_id = ${id}
      ORDER BY created_at DESC
    `;

    return Response.json({
      order: orders[0],
      items,
      tracking,
      payments,
    });
  } catch (error) {
    console.error("Get order error:", error);
    return Response.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

// Update order status (admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { status, notes, tracking_location, admin_id } = await request.json();

    if (!status) {
      return Response.json({ error: "Status is required" }, { status: 400 });
    }

    const validStatuses = [
      "pending",
      "paid",
      "processing",
      "shipped",
      "completed",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    // Update order and add tracking in transaction
    const result = await sql.transaction(async (txn) => {
      const orders = await txn`
        UPDATE orders
        SET status = ${status}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;

      if (orders.length === 0) {
        throw new Error("Order not found");
      }

      // Add tracking entry
      await txn`
        INSERT INTO order_tracking (order_id, status, location, notes, updated_by)
        VALUES (${id}, ${status}, ${tracking_location || null}, ${notes || null}, ${admin_id || null})
      `;

      return orders[0];
    });

    return Response.json({ order: result });
  } catch (error) {
    console.error("Update order error:", error);
    return Response.json({ error: "Failed to update order" }, { status: 500 });
  }
}
