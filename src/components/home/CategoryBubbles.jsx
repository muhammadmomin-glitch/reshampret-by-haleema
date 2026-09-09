import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

const BUBBLES = [
  { name: "Co-ord Sets", img: "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/cb5de7e19_generated_image.png", path: "/shop?category=Co-ord Set" },
  { name: "Ready to Wear", img: "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/47ea0fc8c_generated_image.png", path: "/shop?category=Ready to Wear" },
  { name: "Luxury Fits", img: "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/ad9934a0a_generated_image.png", path: "/shop?category=Luxury Fits" },
  { name: "Festival Edit", img: "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/f6dd43643_generated_image.png", path: "/shop?category=Festival Edit" },
  { name: "Modern Closet", img: "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/85b05dc5f_generated_image.png", path: "/shop?category=Modern Closet" },
];

export default function CategoryBubbles() {
  return (
    <section className="bg-white border-b border-[#0C3B2E]/10">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        <div className="flex gap-6 overflow-x-auto justify-start md:justify-center pb-2">
          {BUBBLES.map((b) => (
            <Link key={b.name} to={b.path} className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-[#D4AF37]/40 group-hover:border-[#0C3B2E] transition-colors">
                <Image src={b.img} alt={b.name} fittingType="fill" className="w-full h-full group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-[11px] tracking-[0.12em] uppercase font-body text-[#0C3B2E] group-hover:text-[#D4AF37] transition-colors text-center max-w-[90px] leading-tight">
                {b.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}