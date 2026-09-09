import React from "react";
import { Link } from "react-router-dom";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Image } from "@/components/ui/image";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQty, subtotal, count } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[#141414]/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] bg-[#FCF9F6] shadow-2xl flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#8E7356]/20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#8E7356]" strokeWidth={1.5} />
            <span className="font-display text-xl tracking-[0.2em]">
              YOUR BAG
            </span>
            <span className="text-xs text-[#8E7356] font-body">({count})</span>
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart">
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
            <ShoppingBag className="w-10 h-10 text-[#8E7356]/40" strokeWidth={1} />
            <p className="font-display text-2xl text-[#141414]">Your bag is empty</p>
            <p className="text-sm text-[#8E7356] font-body">
              Begin your journey through the soul of colors.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-2 text-[11px] tracking-[0.2em] uppercase border-b border-[#141414] pb-1 hover:text-[#9E2A2B] hover:border-[#9E2A2B] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4">
                  <div className="w-20 h-28 flex-shrink-0 overflow-hidden bg-[#8E7356]/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fittingType="fill"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <h3 className="font-display text-lg leading-tight text-[#141414]">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-[#8E7356] hover:text-[#9E2A2B] transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className="text-xs text-[#8E7356] font-body mt-1">
                      {item.color} · {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center border border-[#8E7356]/30">
                        <button
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#8E7356]/10 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-sm font-body">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#8E7356]/10 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                      </div>
                      <span className="font-body text-sm text-[#141414]">
                        PKR {(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#8E7356]/20 px-6 py-5 space-y-4 bg-[#FCF9F6]">
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#8E7356] font-body">
                  Subtotal
                </span>
                <span className="font-display text-2xl text-[#141414]">
                  PKR {subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-[#8E7356] font-body">
                Shipping & taxes calculated at checkout. Cash on Delivery available.
              </p>
              <Link
                to="/checkout"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-[#141414] text-[#FCF9F6] py-4 text-center text-[11px] tracking-[0.25em] uppercase font-body hover:bg-[#9E2A2B] transition-colors animate-pulse"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="block w-full text-center text-[11px] tracking-[0.2em] uppercase text-[#8E7356] hover:text-[#141414] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}