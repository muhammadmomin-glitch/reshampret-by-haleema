import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { secrets } from "base44:runtime";

// Public, validated gateway for placing an order. It bounds and validates the
// payload, then invokes the secret-gated notifyOrder function server-to-server.
// notifyOrder itself cannot be invoked by unauthenticated external callers.
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const c = body.customer || {};
    const missing = ["name", "email", "phone", "address", "city", "pincode"].find((k) => !c[k]);
    if (missing) {
      return Response.json({ error: "Missing customer details" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!/^[0-9]{4,15}$/.test(String(c.phone).replace(/\D/g, ""))) {
      return Response.json({ error: "Invalid phone" }, { status: 400 });
    }

    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0 || items.length > 50) {
      return Response.json({ error: "Invalid order items" }, { status: 400 });
    }
    for (const it of items) {
      if (
        typeof it.price !== "number" ||
        typeof it.qty !== "number" ||
        it.qty < 1 || it.qty > 99
      ) {
        return Response.json({ error: "Invalid item" }, { status: 400 });
      }
    }

    const totals = body.totals || {};
    if (typeof totals.total !== "number" || totals.total < 0) {
      return Response.json({ error: "Invalid totals" }, { status: 400 });
    }

    const secret = secrets.get("NOTIFY_ORDER_SECRET");
    if (!secret) {
      return Response.json({ error: "Notification service not configured" }, { status: 503 });
    }

    const orderId = body.orderId || ("#" + Math.floor(100000 + Math.random() * 900000));
    await base44.functions.invoke("notifyOrder", {
      customer: c,
      items,
      totals,
      orderId,
      _secret: secret,
    });

    return Response.json({ ok: true, orderId });
  } catch (error: any) {
    return Response.json({ error: error?.message || "Failed to submit order" }, { status: 500 });
  }
}