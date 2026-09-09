import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer id="contact" className="bg-[#141414] text-[#FCF9F6]">
      {/* Newsletter */}
      <div className="border-b border-[#FCF9F6]/10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16 lg:py-20 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#8E7356] font-body mb-4">
            Welcome Offer
          </p>
          <h2 className="font-display text-3xl lg:text-5xl italic mb-3">
            Get 10% Off Your First Order
          </h2>
          <p className="text-sm text-[#FCF9F6]/60 font-body max-w-xl mx-auto mb-8">
            Join the ROOH E RANG circle for early access to new collections, private sales, and an exclusive 10% off your first order.
          </p>
          {subscribed ? (
            <p className="font-display text-2xl italic text-[#4A5D4E]">
              Welcome to the family. Watch your inbox.
            </p>
          ) : (
            <form onSubmit={subscribe} className="max-w-md mx-auto flex border-b border-[#FCF9F6]/30 focus-within:border-[#8E7356] transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent py-3 px-2 outline-none font-body text-sm placeholder:text-[#FCF9F6]/40"
              />
              <button
                type="submit"
                className="text-[11px] tracking-[0.25em] uppercase font-body px-4 hover:text-[#8E7356] transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-2xl tracking-[0.3em] mb-2">ROOH</div>
          <div className="font-display italic text-xs tracking-[0.4em] text-[#8E7356] mb-4">
            e rang
          </div>
          <p className="text-sm text-[#FCF9F6]/50 font-body leading-relaxed max-w-xs">
            Soul of Colors. Crafted with passion, woven with culture — timeless artistry into everyday fashion.
          </p>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#8E7356] font-body mb-4">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-sm text-[#FCF9F6]/70 font-body">
            <li><Link to="/shop" className="hover:text-[#FCF9F6] transition-colors">Track Order</Link></li>
            <li><Link to="/shop" className="hover:text-[#FCF9F6] transition-colors">Shipping Policy</Link></li>
            <li><Link to="/shop" className="hover:text-[#FCF9F6] transition-colors">Exchange & Returns</Link></li>
            <li><Link to="/shop" className="hover:text-[#FCF9F6] transition-colors">Size Guide</Link></li>
            <li><Link to="/shop" className="hover:text-[#FCF9F6] transition-colors">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#8E7356] font-body mb-4">
            Explore
          </h4>
          <ul className="space-y-2.5 text-sm text-[#FCF9F6]/70 font-body">
            <li><Link to="/shop?category=Unstitched" className="hover:text-[#FCF9F6] transition-colors">Unstitched</Link></li>
            <li><Link to="/shop?category=Ready to Wear" className="hover:text-[#FCF9F6] transition-colors">Ready to Wear</Link></li>
            <li><Link to="/shop?category=Luxury Lawn" className="hover:text-[#FCF9F6] transition-colors">Luxury Lawn</Link></li>
            <li><Link to="/shop?category=Festival Edit" className="hover:text-[#FCF9F6] transition-colors">Festival Edit</Link></li>
            <li><Link to="/shop?sale=true" className="hover:text-[#FCF9F6] transition-colors">Sale</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#8E7356] font-body mb-4">
            Connect
          </h4>
          <div className="flex gap-4 mb-6">
            <a href="https://instagram.com/rooh_e_rang__" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#FCF9F6]/70 hover:text-[#FCF9F6] transition-colors"><Instagram className="w-4 h-4" strokeWidth={1.5} /></a>
            <a href="#" aria-label="Facebook" className="text-[#FCF9F6]/70 hover:text-[#FCF9F6] transition-colors"><Facebook className="w-4 h-4" strokeWidth={1.5} /></a>
            <a href="#" aria-label="Youtube" className="text-[#FCF9F6]/70 hover:text-[#FCF9F6] transition-colors"><Youtube className="w-4 h-4" strokeWidth={1.5} /></a>
            <a href="#" aria-label="Email" className="text-[#FCF9F6]/70 hover:text-[#FCF9F6] transition-colors"><Mail className="w-4 h-4" strokeWidth={1.5} /></a>
          </div>
          <p className="text-xs text-[#FCF9F6]/50 font-body">
            care@rooh-e-rang.com<br />
            <a href="https://wa.me/923220933780" target="_blank" rel="noopener noreferrer" className="hover:text-[#FCF9F6] transition-colors">+92 322 0933780</a>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#FCF9F6]/10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#FCF9F6]/40 font-body tracking-wide">
            © {new Date().getFullYear()} ROOH E RANG. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[10px] tracking-[0.15em] uppercase text-[#FCF9F6]/50 font-body">
            <span className="border border-[#FCF9F6]/20 px-2 py-1">VISA</span>
            <span className="border border-[#FCF9F6]/20 px-2 py-1">Mastercard</span>
            <span className="border border-[#FCF9F6]/20 px-2 py-1">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}