import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { trackEvent, productToItem } from "@/lib/analytics";
import ProductCard from "@/components/products/ProductCard";

const CATEGORIES = ["Co-ord Set", "Ready to Wear", "Luxury Fits", "Festival Edit", "Modern Closet"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];
const COLORS = ["Crimson", "Emerald", "Gold", "Ivory", "Ochre", "Moss", "Umber", "Black"];
const FABRICS = ["Silk", "Velvet", "Lawn", "Chiffon", "Cotton", "Organza"];
const COLOR_HEX = {
  Crimson: "#9E2A2B", Emerald: "#4A5D4E", Gold: "#8E7356", Ivory: "#F2EBE0",
  Ochre: "#C8862F", Moss: "#4A5D4E", Umber: "#6E4A2E", Black: "#141414",
};

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState("featured");

  const selectedCategory = params.get("category") || "";
  const saleOnly = params.get("sale") === "true";
  const badgeFilter = params.get("badge") || "";
  const q = params.get("q") || "";

  const [localFilters, setLocalFilters] = useState({
    sizes: [],
    colors: [],
    fabrics: [],
    priceMax: 20000,
    inStockOnly: false,
  });

  useEffect(() => {
    base44.entities.Product.list("-created_date", 200)
      .then(setAllProducts)
      .catch(() => setAllProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...allProducts];
    if (selectedCategory) list = list.filter((p) => p.category === selectedCategory);
    if (saleOnly) list = list.filter((p) => p.compareAtPrice);
    if (badgeFilter) list = list.filter((p) => p.badge === badgeFilter);
    if (q) {
      const lq = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(lq) ||
          p.category?.toLowerCase().includes(lq) ||
          p.fabric?.toLowerCase().includes(lq)
      );
    }
    if (localFilters.sizes.length)
      list = list.filter((p) => p.sizes?.some((s) => localFilters.sizes.includes(s)));
    if (localFilters.colors.length)
      list = list.filter((p) => p.colors?.some((c) => localFilters.colors.includes(c)));
    if (localFilters.fabrics.length)
      list = list.filter((p) => localFilters.fabrics.includes(p.fabric));
    list = list.filter((p) => p.price <= localFilters.priceMax);
    if (localFilters.inStockOnly) list = list.filter((p) => p.inStock !== false);

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "new") list.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    return list;
  }, [allProducts, selectedCategory, saleOnly, badgeFilter, q, localFilters, sort]);

  const toggleArray = (key, value) => {
    setLocalFilters((f) => {
      const arr = f[key];
      return {
        ...f,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const clearAll = () => {
    setLocalFilters({ sizes: [], colors: [], fabrics: [], priceMax: 20000, inStockOnly: false });
    setParams({});
  };

  const heading = saleOnly
    ? "Sale"
    : badgeFilter === "New"
    ? "New Arrivals"
    : selectedCategory || "All Collections";

  useEffect(() => {
    if (loading || filtered.length === 0) return;
    trackEvent("view_item_list", {
      item_list_name: heading,
      items: filtered.slice(0, 20).map((p) => productToItem(p)),
    });
  }, [filtered, loading, heading]);

  const FilterPanel = () => (
    <div className="space-y-8">
      <FilterGroup title="Category">
        {CATEGORIES.map((c) => (
          <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === c}
              onChange={() => setParams(c === selectedCategory ? {} : { category: c })}
              className="accent-[#9E2A2B]"
            />
            <span className="text-sm font-body text-[#141414]/80 group-hover:text-[#9E2A2B] transition-colors">{c}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleArray("sizes", s)}
              className={`min-w-[44px] h-11 px-2 text-xs font-body border transition-colors ${
                localFilters.sizes.includes(s)
                  ? "border-[#141414] bg-[#141414] text-[#FCF9F6]"
                  : "border-[#8E7356]/30 hover:border-[#141414]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2.5">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => toggleArray("colors", c)}
              className={`w-9 h-9 rounded-full border-2 transition-all ${
                localFilters.colors.includes(c) ? "border-[#141414] scale-110" : "border-[#8E7356]/30"
              }`}
              style={{ backgroundColor: COLOR_HEX[c] }}
              aria-label={c}
              title={c}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Fabric">
        <div className="space-y-2">
          {FABRICS.map((f) => (
            <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={localFilters.fabrics.includes(f)}
                onChange={() => toggleArray("fabrics", f)}
                className="accent-[#9E2A2B]"
              />
              <span className="text-sm font-body text-[#141414]/80 group-hover:text-[#9E2A2B] transition-colors">{f}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={`Price · PKR ${localFilters.priceMax.toLocaleString()}`}>
        <input
          type="range"
          min={1000}
          max={20000}
          step={500}
          value={localFilters.priceMax}
          onChange={(e) => setLocalFilters((f) => ({ ...f, priceMax: Number(e.target.value) }))}
          className="w-full accent-[#9E2A2B]"
        />
      </FilterGroup>

      <FilterGroup title="Availability">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={localFilters.inStockOnly}
            onChange={(e) => setLocalFilters((f) => ({ ...f, inStockOnly: e.target.checked }))}
            className="accent-[#9E2A2B]"
          />
          <span className="text-sm font-body text-[#141414]/80">In stock only</span>
        </label>
      </FilterGroup>

      <button
        onClick={clearAll}
        className="text-[11px] tracking-[0.2em] uppercase text-[#8E7356] hover:text-[#9E2A2B] transition-colors border-b border-[#8E7356]/30 pb-1"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#8E7356] font-body mb-3">
          The Collection
        </p>
        <h1 className="font-display text-4xl md:text-6xl italic">{heading}</h1>
        <p className="text-sm text-[#8E7356] font-body mt-3">{filtered.length} pieces</p>
      </div>

      <div className="flex gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="sticky top-28">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="w-4 h-4 text-[#8E7356]" strokeWidth={1.5} />
              <h2 className="text-[11px] tracking-[0.25em] uppercase font-body">Refine</h2>
            </div>
            <FilterPanel />
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#8E7356]/20">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-body"
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} /> Filters
            </button>
            <div className="hidden lg:block text-xs text-[#8E7356] font-body">
              Showing {filtered.length} of {allProducts.length}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8E7356] font-body hidden sm:inline">
                Sort
              </span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-transparent border border-[#8E7356]/30 pl-3 pr-8 py-2 text-xs font-body text-[#141414] cursor-pointer focus:border-[#141414] outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="new">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#8E7356]" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-[#8E7356]/10 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-3xl italic text-[#8E7356] mb-2">No pieces found</p>
              <p className="text-sm text-[#8E7356] font-body">Try adjusting your filters.</p>
              <button onClick={clearAll} className="mt-6 text-[11px] tracking-[0.2em] uppercase border-b border-[#141414] pb-1">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-[#141414]/40 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-[#FCF9F6] p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl italic">Refine</h2>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-8 w-full bg-[#141414] text-[#FCF9F6] py-3.5 text-[11px] tracking-[0.25em] uppercase"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-[#8E7356]/15 pb-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full mb-3"
      >
        <h3 className="text-[11px] tracking-[0.2em] uppercase font-body text-[#141414]">{title}</h3>
        <ChevronDown className={`w-3.5 h-3.5 text-[#8E7356] transition-transform ${open ? "" : "-rotate-90"}`} strokeWidth={1.5} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}