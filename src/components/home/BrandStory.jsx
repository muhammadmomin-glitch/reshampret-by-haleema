import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const IMG = "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/f6dd43643_generated_image.png";

export default function BrandStory() {
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="aspect-[4/5] lg:aspect-[5/6] overflow-hidden">
          <Image src={IMG} alt="Artisan at ROOH E RANG" fittingType="fill" className="w-full h-full" />
        </div>
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-body mb-4">Our Craft</p>
          <h2 className="font-display text-4xl md:text-5xl italic text-[#0C3B2E] leading-tight mb-6">
            Soul of Colors, Woven With Heritage
          </h2>
          <p className="text-sm md:text-base font-body text-[#141414]/70 leading-[1.8] mb-5">
            At ROOH E RANG, every thread carries a story. We blend time-honoured craftsmanship with contemporary silhouettes —
            authentic fabrics, hand-finished detailing, and a palette born of culture. Each piece is designed to be lived in,
            loved, and passed on.
          </p>
          <p className="text-sm md:text-base font-body text-[#141414]/70 leading-[1.8] mb-8">
            From the first sketch to the final stitch, our artisans pour generations of skill into every garment —
            keeping the soul of colours alive in modern closets.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-[#0C3B2E] text-white px-8 py-4 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-[#D4AF37] hover:text-[#0C3B2E] transition-colors"
          >
            Discover Our Story <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}