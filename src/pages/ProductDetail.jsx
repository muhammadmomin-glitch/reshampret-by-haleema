import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Truck, RefreshCw, ChevronRight, Plus, Minus, MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { trackEvent, productToItem } from "@/lib/analytics";
import { Image } from "@/components/ui/image";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/products/ProductCard";

const COLOR_HEX = {
  Crimson: "#9E2A2B", Emerald: "#4A5D4E", Gold: "#8E7356", Ivory: "#F2EBE0",
  Ochre: "#C8862F", Moss: "#4A5D4E", Umber: "#6E4A2E", Black: "#141414", Cream: "#FCF9F6",
};

const WEIGHT_LABEL = { Light: "Light · Chiffon drape", Medium: "Medium · Everyday comfort", Heavy: "Heavy · Velvet warmth" };

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [eta, setEta] = useState("");

  useEffect(() => {
    setLoading(true);
    base44.entities.Product.get(id)
      .then((p) => {
        setProduct(p);
        setSize(p?.sizes?.[0] || "");
        setColor(p?.colors?.[0] || "");
        setActiveImg(0);
        if (p) {
          trackEvent("view_item", {
            items: [productToItem(p, { color: p.colors?.[0] })],
            value: p.price || 0,
          });
        }
        if (p?.category) {
          base44.entities.Product.filter({ category: p.category }, "-created_date", 5)
            .then((r) => setRelated(r.filter((x) => x.id !== p.id).slice(0, 4)))
            .catch(() => {});
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const calcEta = () => {
    if (!/^\d{4,6}$/.test(pincode)) {
      setEta("Enter a valid pincode");
      return;
    }
    const days = 3 + (pincode.length % 3);
    const d = new Date();
    d.setDate(d.getDate() + days);
    setEta(`Estimated delivery by ${d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}`);
  };

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 aspect-[3/4] bg-[#8E7356]/10 animate-pulse" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-8 bg-[#8E7356]/10 animate-pulse w-3/4" />
            <div className="h-6 bg-[#8E7356]/10 animate-pulse w-1/2" />
            <div className="h-32 bg-[#8E7356]/10 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-32 text-center">
        <h1 className="font-display text-4xl italic mb-4">Piece not found</h1>
        <Link to="/shop" className="text-[11px] tracking-[0.2em] uppercase border-b border-[#141414] pb-1">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isWished = wishlist.includes(product.id);
  const images = product.images || [];

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12 overflow-x-hidden">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#8E7356] font-body mb-8">
        <Link to="/" className="hover:text-[#9E2A2B]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#9E2A2B]">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#141414] truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-6 lg:gap-16">
        {/* Image gallery — long form scroll */}
        <div className="sm:col-span-7">
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-20 h-28 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                    activeImg === i ? "border-[#141414]" : "border-transparent hover:border-[#8E7356]/40"
                  }`}
                >
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fittingType="fill" className="w-full h-full" />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div className="flex-1 aspect-[3/4] overflow-hidden bg-[#8E7356]/10 group relative">
              <Image
                src={images[activeImg]}
                alt={`${product.name} — ${color} ${product.fabric || ""}`}
                fittingType="fill"
                className="w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase font-body px-2.5 py-1 bg-[#141414] text-[#FCF9F6]">
                  {product.badge}
                </span>
              )}
            </div>
          </div>
          {/* Extra detail shots (long-form scroll feel) */}
          {images.length > 1 && (
            <div className="mt-6 space-y-6">
              {images.slice(1).map((img, i) => (
                <div key={i} className="aspect-[4/5] overflow-hidden bg-[#8E7356]/10">
                  <Image src={img} alt={`${product.name} detail ${i + 2}`} fittingType="fill" className="w-full h-full" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order / info */}
        <div className="sm:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8E7356] font-body mb-3">
              {product.category}
            </p>
            <h1 className="font-display text-4xl lg:text-5xl italic leading-tight mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              {product.compareAtPrice ? (
                <>
                  <span className="font-body text-2xl text-[#9E2A2B]">PKR {product.price.toLocaleString()}</span>
                  <span className="font-body text-lg text-[#8E7356] line-through">PKR {product.compareAtPrice.toLocaleString()}</span>
                </>
              ) : (
                <span className="font-body text-2xl">PKR {product.price.toLocaleString()}</span>
              )}
            </div>

            <p className="text-sm text-[#141414]/70 font-body leading-[1.8] mb-8">
              {product.description || "A timeless piece from the ROOH E RANG collection, crafted with passion and woven with culture."}
            </p>

            {/* Fabric weight indicator */}
            {product.fabricWeight && (
              <div className="mb-8 p-4 border border-[#8E7356]/20 bg-[#8E7356]/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#8E7356] font-body">Fabric Weight</span>
                  <span className="text-xs font-body text-[#141414]">{WEIGHT_LABEL[product.fabricWeight]}</span>
                </div>
                <div className="flex gap-1">
                  {["Light", "Medium", "Heavy"].map((w) => (
                    <div
                      key={w}
                      className={`h-1.5 flex-1 ${product.fabricWeight === w ? "bg-[#8E7356]" : "bg-[#8E7356]/20"}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Color */}
            {product.colors?.length > 0 && (
              <div className="mb-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#8E7356] font-body mb-3">
                  Color: <span className="text-[#141414]">{color}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
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

            {/* Size */}
            {product.sizes?.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#8E7356] font-body">Size</p>
                  {product.sizeChartImage && (
                    <a
                      href={product.sizeChartImage}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] tracking-[0.15em] uppercase text-[#141414] hover:text-[#9E2A2B] transition-colors"
                    >
                      Size Chart
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-[52px] h-12 px-3 text-sm font-body border transition-colors ${
                        size === s
                          ? "border-[#141414] bg-[#141414] text-[#FCF9F6]"
                          : "border-[#8E7356]/30 hover:border-[#141414]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {product.sizeChartImage && (
                  <div className="mt-4 border border-[#8E7356]/20 overflow-hidden">
                    <Image
                      src={product.sizeChartImage}
                      alt="Size chart"
                      fittingType="fit"
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Qty + Add */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-[#8E7356]/30">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-[#8E7356]/10" aria-label="Decrease">
                  <Minus className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <span className="w-12 text-center font-body">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-[#8E7356]/10" aria-label="Increase">
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
              <button
                onClick={() => addToCart(product, { size, color, qty })}
                className="flex-1 bg-[#141414] text-[#FCF9F6] h-12 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-[#9E2A2B] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.5} /> Add to Bag
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-12 h-12 border border-[#8E7356]/30 flex items-center justify-center hover:border-[#9E2A2B] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWished ? "fill-[#9E2A2B] text-[#9E2A2B]" : ""}`} strokeWidth={1.5} />
              </button>
            </div>
            <button
              onClick={() => {
                addToCart(product, { size, color, qty });
                navigate("/checkout");
              }}
              className="w-full border border-[#141414] text-[#141414] h-12 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-[#141414] hover:text-[#FCF9F6] transition-colors mb-3"
            >
              Buy It Now
            </button>
            <a
              href={`https://wa.me/923220933780?text=${encodeURIComponent(`Hi ROOH E RANG, I'd like to order: ${product.name} (Size: ${size || "N/A"}, Colour: ${color || "N/A"}, Qty: ${qty}) — PKR ${(product.price * qty).toLocaleString()}`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#25D366] text-white h-12 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-[#1da851] transition-colors flex items-center justify-center gap-2 mb-8"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> Order via WhatsApp
            </a>

            {/* Delivery calculator */}
            <div className="border-t border-[#8E7356]/20 pt-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <Truck className="w-4 h-4 text-[#8E7356] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-xs font-body text-[#141414] mb-1">Delivery Estimate</p>
                  <p className="text-xs text-[#8E7356] font-body">Enter pincode to check delivery date & COD availability.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Pincode"
                  maxLength={6}
                  className="flex-1 border border-[#8E7356]/30 px-3 h-10 text-sm font-body outline-none focus:border-[#141414]"
                />
                <button onClick={calcEta} className="px-4 h-10 bg-[#8E7356] text-[#FCF9F6] text-[11px] tracking-[0.2em] uppercase font-body hover:bg-[#141414] transition-colors">
                  Check
                </button>
              </div>
              {eta && <p className="text-xs font-body text-[#4A5D4E] mt-2">{eta}</p>}
            </div>

            {/* Assurances */}
            <div className="space-y-3 text-xs font-body text-[#141414]/70">
              <div className="flex items-center gap-3"><RefreshCw className="w-4 h-4 text-[#8E7356]" strokeWidth={1.5} /> 7-day easy exchange & returns</div>
              <div className="flex items-center gap-3"><Truck className="w-4 h-4 text-[#8E7356]" strokeWidth={1.5} /> Free express shipping over PKR 8,000</div>
              <div className="flex items-center gap-3"><ShoppingBag className="w-4 h-4 text-[#8E7356]" strokeWidth={1.5} /> Cash on Delivery available</div>
            </div>

            {/* Fabric care */}
            {product.fabricCare && (
              <div className="mt-6 pt-6 border-t border-[#8E7356]/20">
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#8E7356] font-body mb-2">Fabric Care</p>
                <p className="text-xs text-[#141414]/70 font-body leading-relaxed">{product.fabricCare}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl md:text-4xl italic text-center mb-12">You May Also Love</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}