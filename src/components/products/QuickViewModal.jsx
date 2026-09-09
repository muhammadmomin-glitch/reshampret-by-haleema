import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ShoppingBag, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useCart } from "@/context/CartContext";

const COLOR_HEX = {
  Crimson: "#9E2A2B", Emerald: "#4A5D4E", Gold: "#8E7356", Ivory: "#F2EBE0",
  Ochre: "#C8862F", Moss: "#4A5D4E", Cinnabar: "#9E2A2B", Umber: "#6E4A2E",
  Black: "#141414", Cream: "#FCF9F6",
};

export default function QuickViewModal({ product, open, onClose }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (open && product) {
      setSize(product.sizes?.[0] || "");
      setColor(product.colors?.[0] || "");
      setQty(1);
    }
  }, [open, product]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#141414]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#FCF9F6] w-full max-w-3xl max-h-[90vh] overflow-y-auto grid sm:grid-cols-2 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-[#FCF9F6]/80 hover:bg-[#141414] hover:text-[#FCF9F6] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <div className="aspect-[3/4] sm:aspect-auto bg-[#8E7356]/10">
          <Image src={product.images?.[0]} alt={product.name} fittingType="fill" className="w-full h-full" />
        </div>

        <div className="p-6 lg:p-8 flex flex-col">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8E7356] font-body mb-2">{product.category}</p>
          <h2 className="font-display text-2xl lg:text-3xl italic leading-tight mb-3">{product.name}</h2>

          <div className="flex items-center gap-3 mb-4">
            {product.compareAtPrice ? (
              <>
                <span className="font-body text-xl text-[#9E2A2B]">PKR {product.price.toLocaleString()}</span>
                <span className="font-body text-sm text-[#8E7356] line-through">PKR {product.compareAtPrice.toLocaleString()}</span>
              </>
            ) : (
              <span className="font-body text-xl">PKR {product.price.toLocaleString()}</span>
            )}
          </div>

          <p className="text-sm text-[#141414]/70 font-body leading-relaxed mb-5 line-clamp-4">
            {product.description || "A timeless piece from the ROOH E RANG collection, crafted with passion and woven with culture."}
          </p>

          {product.colors?.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8E7356] font-body mb-2">
                Color: <span className="text-[#141414]">{color}</span>
              </p>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      color === c ? "border-[#141414] scale-110" : "border-[#8E7356]/30"
                    }`}
                    style={{ backgroundColor: COLOR_HEX[c] || "#8E7356" }}
                    aria-label={c}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mb-5">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8E7356] font-body mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-[44px] h-10 px-3 text-xs font-body border transition-colors ${
                      size === s
                        ? "border-[#141414] bg-[#141414] text-[#FCF9F6]"
                        : "border-[#8E7356]/30 hover:border-[#141414]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center border border-[#8E7356]/30">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#8E7356]/10" aria-label="Decrease">−</button>
              <span className="w-10 text-center font-body text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-[#8E7356]/10" aria-label="Increase">+</button>
            </div>
            <button
              onClick={() => { addToCart(product, { size, color, qty }); onClose(); }}
              className="flex-1 bg-[#141414] text-[#FCF9F6] h-10 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-[#9E2A2B] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={1.5} /> Add to Bag
            </button>
          </div>

          <Link
            to={`/product/${product.id}`}
            onClick={onClose}
            className="mt-auto inline-flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase border-b border-[#141414] pb-1 self-start hover:text-[#9E2A2B] hover:border-[#9E2A2B] transition-colors"
          >
            View Full Details <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}