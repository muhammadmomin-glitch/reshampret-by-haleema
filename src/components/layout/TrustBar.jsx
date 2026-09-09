import React from "react";
import { Truck, RefreshCw, ShieldCheck } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Express Shipping", desc: "Fast, careful delivery nationwide & worldwide" },
  { icon: RefreshCw, title: "Easy 7-Day Returns", desc: "Hassle-free exchanges within 7 days" },
  { icon: ShieldCheck, title: "100% Authentic Quality", desc: "Handcrafted heritage you can trust" },
];

export default function TrustBar() {
  return (
    <section className="bg-[#FCF9F6] border-y border-[#8E7356]/15">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {ITEMS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full border border-[#8E7356]/30 flex items-center justify-center text-[#4A5D4E] flex-shrink-0">
              <Icon className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-display text-lg leading-tight text-[#141414]">{title}</p>
              <p className="text-xs text-[#141414]/60 font-body">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}