import React from "react";
import { Instagram } from "lucide-react";
import { Image } from "@/components/ui/image";

const FEED_IMAGES = [
  "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/8282bbae0_generated_image.png",
  "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/cb5de7e19_generated_image.png",
  "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/47ea0fc8c_generated_image.png",
  "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/f6dd43643_generated_image.png",
  "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/85b05dc5f_generated_image.png",
  "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/ad9934a0a_generated_image.png",
];

const INSTAGRAM_URL = "https://instagram.com/rooh_e_rang__";

export default function InstagramFeed() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-28 text-center">
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[#8E7356] hover:text-[#9E2A2B] transition-colors mb-4"
      >
        <Instagram className="w-5 h-5" strokeWidth={1.5} />
        <span className="text-[11px] tracking-[0.3em] uppercase font-body">@rooh_e_rang__</span>
      </a>
      <h2 className="font-display text-4xl md:text-5xl italic mb-3">Follow the Soul of Colors</h2>
      <p className="text-sm text-[#8E7356] font-body max-w-md mx-auto mb-12">
        Behind-the-loom moments, new arrivals, and styling inspiration — straight from our feed.
      </p>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
        {FEED_IMAGES.map((img, i) => (
          <a
            key={i}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={img}
              alt="ROOH E RANG on Instagram"
              fittingType="fill"
              className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#141414]/0 group-hover:bg-[#141414]/40 transition-colors flex items-center justify-center">
              <Instagram
                className="w-6 h-6 text-[#FCF9F6] opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={1.5}
              />
            </div>
          </a>
        ))}
      </div>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 bg-[#141414] text-[#FCF9F6] px-8 py-4 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-[#9E2A2B] transition-colors"
      >
        <Instagram className="w-4 h-4" strokeWidth={1.5} />
        Follow @rooh_e_rang__
      </a>
    </section>
  );
}