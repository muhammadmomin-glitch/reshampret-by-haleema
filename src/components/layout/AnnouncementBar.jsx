import React from "react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#0C3B2E] text-white overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee py-2">
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex items-center">
            <span className="text-[11px] tracking-[0.25em] uppercase font-body px-8">Free Nationwide Shipping on Orders Above PKR 8,000</span>
            <span className="text-[#D4AF37]">✦</span>
            <span className="text-[11px] tracking-[0.25em] uppercase font-body px-8">Cash On Delivery Available</span>
            <span className="text-[#D4AF37]">✦</span>
            <span className="text-[11px] tracking-[0.25em] uppercase font-body px-8">10% Off Your First Order</span>
            <span className="text-[#D4AF37]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}