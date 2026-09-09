import React from "react";
import { X } from "lucide-react";
import { Image } from "@/components/ui/image";

const DEFAULT_SIZES = [
  { size: "XS", bust: 32, waist: 26, hip: 34, shoulder: 14 },
  { size: "S", bust: 34, waist: 28, hip: 36, shoulder: 14.5 },
  { size: "M", bust: 36, waist: 30, hip: 38, shoulder: 15 },
  { size: "L", bust: 38, waist: 32, hip: 40, shoulder: 15.5 },
  { size: "XL", bust: 40, waist: 34, hip: 42, shoulder: 16 },
  { size: "XXL", bust: 42, waist: 36, hip: 44, shoulder: 16.5 },
];

export default function SizeChartModal({ open, onClose, sizeChart, sizeChartImage }) {
  if (!open) return null;
  const rows = (sizeChart && sizeChart.length ? sizeChart : DEFAULT_SIZES).filter(
    (s) => s && s.size
  );
  const hasLength = rows.some((s) => s.length != null);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#141414]/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#FCF9F6] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8E7356] font-body">
              Fit Guide
            </p>
            <h2 className="font-display text-3xl italic">Size Chart</h2>
          </div>
          <button onClick={onClose} aria-label="Close size chart">
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
        {sizeChartImage && (
          <div className="mb-6 w-full overflow-hidden border border-[#8E7356]/20">
            <Image
              src={sizeChartImage}
              alt="Size chart guide"
              fittingType="fit"
              className="w-full h-auto"
            />
          </div>
        )}
        <p className="text-sm text-[#8E7356] font-body mb-5">
          All measurements in inches. For best fit, measure yourself and compare to the chart below.
        </p>
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-[#8E7356]/30">
              <th className="text-left py-3 text-[11px] tracking-[0.15em] uppercase text-[#8E7356]">Size</th>
              <th className="text-left py-3 text-[11px] tracking-[0.15em] uppercase text-[#8E7356]">Bust</th>
              <th className="text-left py-3 text-[11px] tracking-[0.15em] uppercase text-[#8E7356]">Waist</th>
              <th className="text-left py-3 text-[11px] tracking-[0.15em] uppercase text-[#8E7356]">Hip</th>
              <th className="text-left py-3 text-[11px] tracking-[0.15em] uppercase text-[#8E7356]">Shoulder</th>
              {hasLength && <th className="text-left py-3 text-[11px] tracking-[0.15em] uppercase text-[#8E7356]">Length</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.size} className="border-b border-[#8E7356]/15 hover:bg-[#8E7356]/5">
                <td className="py-3 font-display text-lg">{s.size}</td>
                <td className="py-3 text-[#141414]/80">{s.bust != null ? `${s.bust}"` : "—"}</td>
                <td className="py-3 text-[#141414]/80">{s.waist != null ? `${s.waist}"` : "—"}</td>
                <td className="py-3 text-[#141414]/80">{s.hip != null ? `${s.hip}"` : "—"}</td>
                <td className="py-3 text-[#141414]/80">{s.shoulder != null ? `${s.shoulder}"` : "—"}</td>
                {hasLength && <td className="py-3 text-[#141414]/80">{s.length != null ? `${s.length}"` : "—"}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-[#8E7356] font-body mt-6">
          Unstitched pieces are tailored to your exact measurements. Book a complimentary fitting at checkout.
        </p>
      </div>
    </div>
  );
}