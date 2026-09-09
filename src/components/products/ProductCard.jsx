import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useCart } from "@/context/CartContext";
import QuickViewModal from "@/components/products/QuickViewModal";

const BADGE_STYLES = {
  Bestseller: "bg-[#0C3B2E] text-white",
  New: "bg-[#D4AF37] text-[#0C3B2E]",
  "Limited Edition": "bg-[#141414] text-white",
  Sale: "bg-[#9E2A2B] text-white",
};

export default function ProductCard({ product, className = "" }) {
  const { wishlist, toggleWishlist } = useCart();
  const isWished = wishlist.includes(product.id);
  const [quickView, setQuickView] = useState(false);
  const hasAlt = !!product.images?.[1];
  const soldOut = product.inStock === false;

  return (
    <div className={`group relative ${className}`}>
      <div className="relative overflow-hidden bg-[#F9F6F0] aspect-[3/4] border border-[#0C3B2E]/10">
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
          <Image
            src={product.images?.[0]}
            alt={`${product.name} — ${product.colors?.[0] || ""} ${product.fabric || ""}`}
            fittingType="fill"
            className={`w-full h-full transition duration-700 ${hasAlt ? "group-hover:opacity-0" : "group-hover:scale-105"} ${soldOut ? "opacity-60 grayscale" : ""}`}
          />
          {hasAlt && (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              <Image
                src={product.images[1]}
                alt=""
                fittingType="fill"
                className="w-full h-full group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}
        </Link>

        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase font-body px-2.5 py-1 ${
              BADGE_STYLES[product.badge] || "bg-[#0C3B2E] text-white"
            }`}
          >
            {product.badge}
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 ${isWished ? "fill-[#0C3B2E] text-[#0C3B2E]" : "text-[#0C3B2E]"}`}
            strokeWidth={1.5}
          />
        </button>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <button
            onClick={() => setQuickView(true)}
            className="w-full bg-[#0C3B2E]/90 backdrop-blur-sm text-white py-3.5 text-[10px] tracking-[0.25em] uppercase font-body hover:bg-[#D4AF37] hover:text-[#0C3B2E] transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
            Quick Add
          </button>
        </div>
      </div>

      <div className="pt-3 text-center bg-white">
        <div className="flex items-center justify-center gap-2 mb-1">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-body">{product.category}</p>
          <span
            className={`text-[8px] tracking-[0.15em] uppercase font-body px-1.5 py-0.5 ${
              soldOut ? "bg-[#9E2A2B]/10 text-[#9E2A2B]" : "bg-[#0C3B2E]/10 text-[#0C3B2E]"
            }`}
          >
            {soldOut ? "Sold Out" : "In Stock"}
          </span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg leading-tight text-[#0C3B2E] hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
        </Link>
        {/* Color swatches */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {(product.colors || []).slice(0, 4).map((c) => (
            <span
              key={c}
              className="w-2.5 h-2.5 rounded-full border border-[#0C3B2E]/20"
              style={{ backgroundColor: colorHex(c) }}
              title={c}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          {product.compareAtPrice ? (
            <>
              <span className="font-body text-sm text-[#0C3B2E]">PKR {product.price.toLocaleString()}</span>
              <span className="font-body text-xs text-[#141414]/40 line-through">PKR {product.compareAtPrice.toLocaleString()}</span>
            </>
          ) : (
            <span className="font-body text-sm text-[#0C3B2E]">PKR {product.price.toLocaleString()}</span>
          )}
        </div>
      </div>
      <QuickViewModal product={product} open={quickView} onClose={() => setQuickView(false)} />
    </div>
  );
}

function colorHex(name) {
  const map = {
    Crimson: "#9E2A2B",
    Emerald: "#4A5D4E",
    Gold: "#8E7356",
    Ivory: "#F2EBE0",
    Ochre: "#C8862F",
    Moss: "#4A5D4E",
    Cinnabar: "#9E2A2B",
    Umber: "#6E4A2E",
    Black: "#141414",
    Cream: "#FCF9F6",
  };
  return map[name] || "#8E7356";
}