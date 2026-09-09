import React from "react";
import { Star } from "lucide-react";
import { Image } from "@/components/ui/image";

const REVIEWS = [
  { name: "Aiman R.", tag: "Verified Buyer", rating: 5, text: "The fabric and embroidery are exquisite — felt like wearing heirloom luxury. Fit was perfect.", img: "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/47ea0fc8c_generated_image.png" },
  { name: "Hira K.", tag: "Verified Buyer", rating: 5, text: "Beautiful colours and such soft fabric. Got endless compliments at the wedding.", img: "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/ad9934a0a_generated_image.png" },
  { name: "Sana M.", tag: "Verified Buyer", rating: 4, text: "Lovely co-ord set, stitching was immaculate. Delivery was quick too.", img: "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/cb5de7e19_generated_image.png" },
  { name: "Noor F.", tag: "Verified Buyer", rating: 5, text: "Genuinely premium quality. The gold detailing is subtle and elegant. Will reorder.", img: "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/85b05dc5f_generated_image.png" },
];

export default function CustomerReviews() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16 lg:py-20">
      <div className="text-center mb-10">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-body mb-3">Loved By You</p>
        <h2 className="font-display text-4xl md:text-5xl italic text-[#0C3B2E]">Real Style, Real Stories</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {REVIEWS.map((r) => (
          <div key={r.name} className="bg-white border border-[#0C3B2E]/10 p-5 flex flex-col">
            <div className="aspect-[4/5] mb-4 overflow-hidden bg-[#F9F6F0]">
              <Image src={r.img} alt={r.name} fittingType="fill" className="w-full h-full" />
            </div>
            <div className="flex gap-0.5 mb-2">
              {[...Array(r.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <p className="text-xs font-body text-[#141414]/70 leading-relaxed mb-3 flex-1">"{r.text}"</p>
            <p className="text-sm font-display italic text-[#0C3B2E]">{r.name}</p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#D4AF37] font-body">{r.tag}</p>
          </div>
        ))}
      </div>
    </section>
  );
}