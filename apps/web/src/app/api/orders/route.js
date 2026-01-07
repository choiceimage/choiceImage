import sql from "@/app/api/utils/sql";

// Get all orders (admin) or track order (customer)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("orderNumber");
    const email = searchParams.get("email");
    const status = searchParams.get("status");

    // Customer order tracking
    if (orderNumber && email) {
      const orders = await sql`
        SELECT 
          o.*,
          json_agg(
            json_build_object(
              'id', oi.id,
              'product_name', oi.product_name,
              'product_price', oi.product_price,
              'quantity', oi.quantity,
              'subtotal', oi.subtotal
            )
          ) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.order_number = ${orderNumber} 
          AND LOWER(o.customer_email) = LOWER(${email})
        GROUP BY o.id
        LIMIT 1
      `;

      if (orders.length === 0) {
        return Response.json({ error: "Order not found" }, { status: 404 });
      }

      // Get tracking history
      const tracking = await sql`
        SELECT * FROM order_tracking
        WHERE order_id = ${orders[0].id}
        ORDER BY created_at DESC
      `;

      // Get payment info
      const payments = await sql`
        SELECT * FROM payments
        WHERE order_id = ${orders[0].id}
        ORDER BY created_at DESC
        LIMIT 1
      `;

      return Response.json({
        order: orders[0],
        tracking,
        payment: payments[0] || null,
      });
    }

    // Admin: Get all orders
    let query = `
      SELECT 
        o.*,
        COUNT(oi.id) as items_count
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (status) {
      query += ` AND o.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    query += ` GROUP BY o.id ORDER BY o.created_at DESC`;

    const orders = await sql(query, params);

    return Response.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// Create new order
export async function POST(request) {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      city,
      postal_code,
      country,
      items,
      payment_method,
    } = await request.json();

    if (
      !customer_name ||
      !customer_email ||
      !shipping_address ||
      !items ||
      items.length === 0
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Calculate total
    let total = 0;
    for (const item of items) {
      total += item.price * item.quantity;
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order and items in transaction
    const result = await sql.transaction(async (txn) => {
      // Create order
      const orders = await txn`
        INSERT INTO orders (
          order_number, customer_name, customer_email, customer_phone,
          shipping_address, city, postal_code, country, total_amount, status
        )
        VALUES (
          ${orderNumber}, ${customer_name}, ${customer_email}, ${customer_phone || null},
          ${shipping_address}, ${city || null}, ${postal_code || null}, 
          ${country || null}, ${total}, 'pending'
        )
        RETURNING *
      `;

      const order = orders[0];

      // Create order items
      for (const item of items) {
        await txn`
          INSERT INTO order_items (
            order_id, product_id, product_name, product_price, quantity, subtotal
          )
          VALUES (
            ${order.id}, ${item.product_id}, ${item.name}, ${item.price},
            ${item.quantity}, ${item.price * item.quantity}
          )
        `;
      }

      // Create payment record
      await txn`
        INSERT INTO payments (order_id, payment_method, amount, status)
        VALUES (${order.id}, ${payment_method || "pending"}, ${total}, 'pending')
      `;

      // Create initial tracking entry
      await txn`
        INSERT INTO order_tracking (order_id, status, notes)
        VALUES (${order.id}, 'pending', 'Order placed successfully')
      `;

      return order;
    });

    return Response.json(
      {
        success: true,
        order: result,
        orderNumber,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create order error:", error);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}
