import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Image } from "@/components/ui/image";
import CategoryBubbles from "@/components/home/CategoryBubbles";
import PromoGrid from "@/components/home/PromoGrid";
import ProductTabs from "@/components/home/ProductTabs";
import BrandStory from "@/components/home/BrandStory";
import CustomerReviews from "@/components/home/CustomerReviews";
import InstagramFeed from "@/components/home/InstagramFeed";

const HERO_IMG = "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/8282bbae0_generated_image.png";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG}
            alt="ROOH E RANG luxury heritage apparel"
            fittingType="fill"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3B2E]/45 via-[#0C3B2E]/15 to-transparent" />
        </div>
        <div className="relative h-full max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center">
          <div className="max-w-xl text-white">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#D4AF37] font-body mb-5">
              The New Collection · Autumn ’26
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5vw] leading-[1.05] italic mb-6">
              Embrace the<br />Palette of<br />Elegance
            </h1>
            <p className="text-sm md:text-base text-white/85 font-body max-w-md mb-9 leading-relaxed">
              Where every outfit carries a touch of colour, culture, and your unique style.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="bg-[#D4AF37] text-[#0C3B2E] px-8 py-4 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-white transition-colors flex items-center gap-2"
              >
                Explore Collection <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                to="/shop?badge=New"
                className="border border-white/70 text-white px-8 py-4 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-white hover:text-[#0C3B2E] transition-colors"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[9px] tracking-[0.3em] uppercase font-body">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5" strokeWidth={1.5} />
        </div>
      </section>

      <CategoryBubbles />
      <PromoGrid />
      <ProductTabs />
      <BrandStory />
      <CustomerReviews />
      <InstagramFeed />

      <section className="bg-[#0C3B2E] text-white py-5 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-12">
              {["Cash on Delivery", "Handcrafted Heritage", "7-Day Easy Exchange", "Worldwide Delivery"].map((t) => (
                <span key={t} className="text-[11px] tracking-[0.3em] uppercase font-body flex items-center gap-12">
                  {t} <span className="text-[#D4AF37]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}