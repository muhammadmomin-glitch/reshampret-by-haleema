import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ProductCard from "@/components/products/ProductCard";

const TABS = [
  { key: "new", label: "New Arrivals", filter: (p) => p.badge === "New" },
  { key: "best", label: "Best Sellers", filter: (p) => p.badge === "Bestseller" },
  { key: "offers", label: "Special Offers", filter: (p) => !!p.compareAtPrice },
];

export default function ProductTabs() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState("new");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Product.list("-created_date", 30)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const tab = TABS.find((t) => t.key === active);
  const list = products.filter(tab.filter).slice(0, 8);

  return (
    <section className="bg-[#F9F6F0] py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-body mb-3">Curated For You</p>
          <h2 className="font-display text-4xl md:text-5xl italic text-[#0C3B2E] mb-6">Shop by Mood</h2>
        </div>
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-6 py-2.5 text-[11px] tracking-[0.2em] uppercase font-body border transition-colors ${
                active === t.key
                  ? "bg-[#0C3B2E] text-white border-[#0C3B2E]"
                  : "bg-transparent text-[#0C3B2E] border-[#0C3B2E]/30 hover:border-[#0C3B2E]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white animate-pulse" />
            ))}
          </div>
        ) : list.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm font-body text-[#0C3B2E]/60 py-10">
            No pieces in this edit yet — check back soon.
          </p>
        )}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-body text-[#0C3B2E] border-b border-[#0C3B2E] pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
          >
            View All Products <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}