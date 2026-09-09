import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV = [
  { label: "Home", path: "/" },
  { label: "New Arrivals", path: "/shop?badge=New" },
  { label: "Festival Edit", path: "/shop?category=Festival Edit" },
  { label: "Ready to Wear", path: "/shop?category=Ready to Wear" },
  { label: "Collections", path: "/shop" },
  { label: "Sale", path: "/shop?sale=true" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const { count, setIsOpen, wishlist } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#FCF9F6]/90 backdrop-blur-md border-b border-[#8E7356]/20"
          : "bg-[#FCF9F6]/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="h-16 lg:h-20 flex items-center justify-between gap-4">
          {/* Left: mobile menu + desktop nav */}
          <div className="flex items-center gap-6 flex-1">
            <button
              className="lg:hidden text-[#141414]"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <nav className="hidden lg:flex items-center gap-6">
              {NAV.slice(0, 5).map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-[11px] tracking-[0.18em] uppercase font-body text-[#141414]/80 hover:text-[#9E2A2B] transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#9E2A2B] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: Logo */}
          <Link to="/" className="flex-shrink-0 text-center">
            <div className="font-display text-2xl lg:text-3xl tracking-[0.3em] text-[#141414] leading-none">
              ROOH
            </div>
            <div className="font-display italic text-[10px] lg:text-xs tracking-[0.4em] text-[#8E7356] mt-0.5">
              e rang
            </div>
          </Link>

          {/* Right: nav + icons */}
          <div className="flex items-center gap-5 flex-1 justify-end">
            <nav className="hidden lg:flex items-center gap-6">
              {NAV.slice(5).map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-[11px] tracking-[0.18em] uppercase font-body text-[#141414]/80 hover:text-[#9E2A2B] transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#9E2A2B] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen((s) => !s)}
                className="text-[#141414] hover:text-[#9E2A2B] transition-colors"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
              <Link
                to="/shop"
                className="text-[#141414] hover:text-[#9E2A2B] transition-colors hidden sm:block"
                aria-label="Currency"
              >
                <span className="text-[11px] tracking-[0.15em] font-body">PKR</span>
              </Link>
              <Link
                to="/shop"
                className="relative text-[#141414] hover:text-[#9E2A2B] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#9E2A2B] text-[#FCF9F6] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="relative text-[#141414] hover:text-[#9E2A2B] transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#4A5D4E] text-[#FCF9F6] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4 border-t border-[#8E7356]/20 pt-4">
            <form onSubmit={submitSearch} className="flex items-center gap-3">
              <Search className="w-4 h-4 text-[#8E7356]" strokeWidth={1.5} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the soul of colors…"
                className="flex-1 bg-transparent border-none outline-none font-display text-lg italic text-[#141414] placeholder:text-[#8E7356]/60"
              />
              <button type="button" onClick={() => setSearchOpen(false)}>
                <X className="w-4 h-4 text-[#8E7356]" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full w-full max-w-sm bg-white shadow-2xl animate-[slideInLeft_0.3s_ease-out] flex flex-col">
            <div className="h-16 flex items-center justify-between px-4 border-b border-[#8E7356]/20 bg-white">
              <span className="font-display text-xl tracking-[0.3em] text-[#141414]">MENU</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="w-5 h-5 text-[#141414]" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-1 bg-white flex-1">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl text-[#141414] py-3 border-b border-[#8E7356]/15"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}