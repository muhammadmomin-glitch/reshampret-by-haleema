import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const PROMOS = [
  { title: "Co-ord Sets", tag: "3-Piece Suits", img: "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/cb5de7e19_generated_image.png", path: "/shop?category=Co-ord Set" },
  { title: "Luxury Fits", tag: "Printed Lawn", img: "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/ad9934a0a_generated_image.png", path: "/shop?category=Luxury Fits" },
  { title: "Festival Edit", tag: "Stoles & Accessories", img: "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/f6dd43643_generated_image.png", path: "/shop?category=Festival Edit" },
];

export default function PromoGrid() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16 lg:py-20">
      <div className="text-center mb-10">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-body mb-3">Signature Collections</p>
        <h2 className="font-display text-4xl md:text-5xl italic text-[#0C3B2E]">Shop the Edit</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {PROMOS.map((p) => (
          <Link key={p.title} to={p.path} className="group relative overflow-hidden aspect-[4/5]">
            <Image src={p.img} alt={p.title} fittingType="fill" className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E]/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-body mb-1">{p.tag}</p>
              <h3 className="font-display text-2xl lg:text-3xl italic mb-2">{p.title}</h3>
              <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase border-b border-white/60 pb-1 group-hover:gap-3 transition-all">
                Discover <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}