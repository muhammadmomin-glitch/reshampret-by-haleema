import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { secrets } from "base44:runtime";

const OWNER_EMAILS = ["halsad4000@gmail.com", "muhammadmomin189@gmail.com"];

export default async function(req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}));
    // Internal-only: reject any caller that doesn't present the server-side secret.
    // This makes notifyOrder unreachable as a public unauthenticated endpoint.
    const internalSecret = secrets.get("NOTIFY_ORDER_SECRET");
    if (!internalSecret || body?._secret !== internalSecret) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const customer = body?.customer || {};
    const items = body?.items || [];
    const totals = body?.totals || {};
    const orderId = body?.orderId || ("#" + Math.floor(100000 + Math.random() * 900000));

    const fmt = (n: number) => "PKR " + Number(n || 0).toLocaleString();

    const itemRows = items.map((it: any, i: number) => `
      <tr>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center">${i + 1}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee">${it.name || "-"}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-transform:capitalize">${it.color || "-"}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center">${it.size || "-"}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center">${it.qty || 1}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right">${fmt(it.price)}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right;font-weight:600">${fmt((it.price || 0) * (it.qty || 1))}</td>
      </tr>`).join("");

    const subject = `New ROOH E RANG Order ${orderId} — ${customer.name || "Customer"}`;
    const emailBody = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;max-width:680px;margin:0 auto">
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:6px 0"><div style="font-size:22px;letter-spacing:2px;font-weight:700">ROOH E RANG</div><div style="font-size:11px;letter-spacing:3px;color:#8E7356;font-style:italic">e rang — soul of colors</div></td>
            <td style="text-align:right;vertical-align:top"><div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8E7356">Sale Order</div><div style="font-size:16px;font-weight:600">Order #${orderId}</div></td>
          </tr>
        </table>
        <hr style="border:none;border-top:2px solid #141414;margin:8px 0 20px">

        <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:24px">
          <tr>
            <td style="width:50%;vertical-align:top">
              <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8E7356;margin-bottom:6px">Bill To</div>
              <div style="font-weight:600">${customer.name || "-"}</div>
              <div>${customer.email || "-"}</div>
              <div>${customer.phone || "-"}</div>
            </td>
            <td style="width:50%;vertical-align:top">
              <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8E7356;margin-bottom:6px">Ship To</div>
              <div>${customer.address || "-"}</div>
              <div>${customer.city || "-"} ${customer.pincode || ""}</div>
              <div style="margin-top:6px"><span style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8E7356">Payment:</span> ${customer.payment || "-"}</div>
            </td>
          </tr>
        </table>

        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead>
            <tr style="background:#141414;color:#FCF9F6">
              <th style="padding:10px 8px;text-align:center;width:32px">#</th>
              <th style="padding:10px 8px;text-align:left">Item</th>
              <th style="padding:10px 8px;text-align:left">Colour</th>
              <th style="padding:10px 8px;text-align:center">Size</th>
              <th style="padding:10px 8px;text-align:center">Qty</th>
              <th style="padding:10px 8px;text-align:right">Unit Price</th>
              <th style="padding:10px 8px;text-align:right">Amount</th>
            </tr>
          </thead>
          <tbody>${itemRows || `<tr><td colspan="7" style="padding:12px 8px;text-align:center;color:#999">No items</td></tr>`}</tbody>
        </table>

        <table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:16px">
          <tr>
            <td style="width:65%"></td>
            <td style="padding:8px 8px;text-align:left;color:#8E7356">Subtotal</td>
            <td style="padding:8px 8px;text-align:right">${fmt(totals.subtotal)}</td>
          </tr>
          <tr>
            <td></td>
            <td style="padding:8px 8px;text-align:left;color:#8E7356">Shipping</td>
            <td style="padding:8px 8px;text-align:right">${Number(totals.shipping || 0) === 0 ? "Free" : fmt(totals.shipping)}</td>
          </tr>
          <tr style="background:#8E7356;color:#FCF9F6">
            <td></td>
            <td style="padding:12px 8px;text-align:left;font-weight:700;text-transform:uppercase;letter-spacing:1px">Total</td>
            <td style="padding:12px 8px;text-align:right;font-weight:700;font-size:16px">${fmt(totals.total)}</td>
          </tr>
        </table>

        <p style="font-size:11px;color:#8E7356;margin-top:28px;border-top:1px solid #eee;padding-top:12px">This is an automated order notification sent to the store owner. Please process the order at your earliest convenience.</p>
      </div>`;

    const base44 = createClientFromRequest(req);
    await Promise.all(
      OWNER_EMAILS.map((addr) =>
        base44.asServiceRole.integrations.Core.SendEmail({
          to: addr,
          subject,
          body: emailBody,
        })
      )
    );

    return Response.json({ ok: true, orderId });
  } catch (error: any) {
    return Response.json({ error: error?.message || "Failed to send order notification" }, { status: 500 });
  }
}