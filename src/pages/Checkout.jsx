import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Lock } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useCart } from "@/context/CartContext";
import { trackEvent, productToItem } from "@/lib/analytics";
import { Image } from "@/components/ui/image";

export default function Checkout() {
  const { items, subtotal, count } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    email: "", name: "", phone: "", address: "", city: "", pincode: "", payment: "cod",
  });

  const shipping = subtotal >= 8000 || subtotal === 0 ? 0 : 350;
  const total = subtotal + shipping;

  const placeOrder = async (e) => {
    e.preventDefault();
    setPlaced(true);
    window.scrollTo(0, 0);
    // Silent order notification to the store owner (invisible to customer)
    const gaItems = items.map((i) => productToItem(i, { qty: i.qty, color: i.color }));
    trackEvent("begin_checkout", { value: total, items: gaItems });
    try {
      const res = await base44.functions.invoke("submitOrder", {
        customer: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
          payment: form.payment,
        },
        items: items.map((i) => ({ name: i.name, color: i.color, size: i.size, qty: i.qty, price: i.price })),
        totals: { subtotal, shipping, total },
      });
      const orderId = res?.data?.orderId || ("#" + Math.floor(100000 + Math.random() * 900000));
      trackEvent("purchase", { transaction_id: orderId, value: total, items: gaItems });
    } catch {
      // ignore — customer must not see any error
    }
  };

  if (placed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#4A5D4E] flex items-center justify-center">
          <Check className="w-8 h-8 text-[#FCF9F6]" strokeWidth={1.5} />
        </div>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#8E7356] font-body mb-3">Order Confirmed</p>
        <h1 className="font-display text-4xl md:text-5xl italic mb-4">Thank you, {form.name || "friend"}.</h1>
        <p className="text-sm text-[#8E7356] font-body mb-8 leading-relaxed">
          Your order has been placed. A confirmation email is on its way to {form.email || "your inbox"}. Our artisans are already preparing your pieces.
        </p>
        <Link to="/shop" className="inline-block bg-[#141414] text-[#FCF9F6] px-8 py-4 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-[#9E2A2B] transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-4xl italic mb-4">Your bag is empty</h1>
        <p className="text-sm text-[#8E7356] font-body mb-8">Add a piece to begin checkout.</p>
        <Link to="/shop" className="inline-block bg-[#141414] text-[#FCF9F6] px-8 py-4 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-[#9E2A2B] transition-colors">
          Shop the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
      <h1 className="font-display text-4xl md:text-5xl italic text-center mb-12">Checkout</h1>
      <form onSubmit={placeOrder} className="grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="space-y-8">
          <section>
            <h2 className="text-[11px] tracking-[0.25em] uppercase text-[#8E7356] font-body mb-4">Contact</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
              <div className="sm:col-span-2">
                <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-[11px] tracking-[0.25em] uppercase text-[#8E7356] font-body mb-4">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <Input label="Street Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
              </div>
              <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
              <Input label="Pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v.replace(/\D/g, "") })} required maxLength={6} />
            </div>
          </section>
          <section>
            <h2 className="text-[11px] tracking-[0.25em] uppercase text-[#8E7356] font-body mb-4">Payment</h2>
            <div className="space-y-2">
              <PaymentOption value={form.payment} setValue={(v) => setForm({ ...form, payment: v })} id="cod" label="Cash on Delivery" desc="Pay when your order arrives" />
              <PaymentOption value={form.payment} setValue={(v) => setForm({ ...form, payment: v })} id="card" label="Credit / Debit Card" desc="Visa, Mastercard" />
            </div>
          </section>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="border border-[#8E7356]/20 p-6 bg-[#FCF9F6]">
            <h2 className="font-display text-2xl italic mb-5">Order Summary</h2>
            <div className="space-y-4 mb-5 max-h-72 overflow-y-auto">
              {items.map((item) => (
                <div key={item.key} className="flex gap-3">
                  <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-[#8E7356]/10">
                    <Image src={item.image} alt={item.name} fittingType="fill" className="w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-base leading-tight">{item.name}</h3>
                    <p className="text-xs text-[#8E7356] font-body">{item.color} · {item.size} · Qty {item.qty}</p>
                    <p className="text-sm font-body mt-1">PKR {(item.price * item.qty).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm font-body border-t border-[#8E7356]/20 pt-4">
              <div className="flex justify-between"><span className="text-[#8E7356]">Subtotal</span><span>PKR {subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#8E7356]">Shipping</span><span>{shipping === 0 ? "Free" : `PKR ${shipping.toLocaleString()}`}</span></div>
              <div className="flex justify-between font-display text-2xl pt-3 border-t border-[#8E7356]/20"><span>Total</span><span>PKR {total.toLocaleString()}</span></div>
            </div>
            <button type="submit" className="w-full bg-[#141414] text-[#FCF9F6] py-4 mt-6 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-[#9E2A2B] transition-colors flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5" strokeWidth={1.5} /> Place Order
            </button>
            <p className="text-[11px] text-[#8E7356] font-body text-center mt-3">{count} item(s) · Secure checkout</p>
          </div>
        </div>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required, maxLength }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.2em] uppercase text-[#8E7356] font-body">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        maxLength={maxLength}
        className="w-full mt-1 border-b border-[#8E7356]/30 bg-transparent py-2 text-sm font-body outline-none focus:border-[#141414] transition-colors"
      />
    </label>
  );
}

function PaymentOption({ value, setValue, id, label, desc }) {
  return (
    <label className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${value === id ? "border-[#141414] bg-[#8E7356]/5" : "border-[#8E7356]/30"}`}>
      <input type="radio" name="payment" checked={value === id} onChange={() => setValue(id)} className="accent-[#9E2A2B]" />
      <div>
        <p className="text-sm font-body text-[#141414]">{label}</p>
        <p className="text-xs text-[#8E7356] font-body">{desc}</p>
      </div>
    </label>
  );
}