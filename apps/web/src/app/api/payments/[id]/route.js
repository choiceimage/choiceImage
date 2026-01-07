import sql from "@/app/api/utils/sql";

// Update payment status (admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { status, transaction_id, verified_by, notes } = await request.json();

    if (!status) {
      return Response.json({ error: "Status is required" }, { status: 400 });
    }

    const validStatuses = ["pending", "completed", "failed", "refunded"];
    if (!validStatuses.includes(status)) {
      return Response.json(
        { error: "Invalid payment status" },
        { status: 400 },
      );
    }

    const result = await sql`
      UPDATE payments
      SET 
        status = ${status},
        transaction_id = ${transaction_id || null},
        verified_by = ${verified_by || null},
        notes = ${notes || null},
        payment_date = ${status === "completed" ? new Date() : null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json({ error: "Payment not found" }, { status: 404 });
    }

    // If payment is completed, update order status to paid
    if (status === "completed") {
      const payment = result[0];
      await sql`
        UPDATE orders
        SET status = 'paid', updated_at = CURRENT_TIMESTAMP
        WHERE id = ${payment.order_id}
      `;

      // Add tracking entry
      await sql`
        INSERT INTO order_tracking (order_id, status, notes, updated_by)
        VALUES (${payment.order_id}, 'paid', 'Payment verified and confirmed', ${verified_by || null})
      `;
    }

    return Response.json({ payment: result[0] });
  } catch (error) {
    console.error("Update payment error:", error);
    return Response.json(
      { error: "Failed to update payment" },
      { status: 500 },
    );
  }
}
