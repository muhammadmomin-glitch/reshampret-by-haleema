import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Hand, Award, Globe } from "lucide-react";
import { Image } from "@/components/ui/image";

const STORY_IMG = "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/b33025d17_generated_1a830925.png";
const HERO_IMG = "https://media.base44.com/images/public/6a80ae2fc74b737270b89c54/6fb0818be_generated_affc1c4c.png";

const VALUES = [
  { icon: Hand, title: "Handcrafted Heritage", desc: "Every piece is shaped by master artisans carrying generations of loom knowledge." },
  { icon: Leaf, title: "Conscious Sourcing", desc: "Responsibly sourced fabrics and natural dyes that honor both maker and land." },
  { icon: Award, title: "Uncompromising Quality", desc: "From thread to fold, each garment passes through meticulous quality checks." },
  { icon: Globe, title: "Cultural Legacy", desc: "We curate the soul of South Asian craftsmanship for the modern world." },
];

const TIMELINE = [
  { year: "2019", title: "The First Thread", desc: "ROOH E RANG begins as a small atelier with three artisans and a single loom." },
  { year: "2021", title: "Woven Into Culture", desc: "Our Luxury Lawn collection brings heritage weaves to everyday elegance across Pakistan." },
  { year: "2023", title: "The Festival Edit", desc: "Velvet and zari masterpieces debut, celebrating seasons of joy and ceremony." },
  { year: "2026", title: "Soul of Colors", desc: "Today, over 200 artisans craft for a global community that wears culture with pride." },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMG} alt="ROOH E RANG heritage" fittingType="fill" className="w-full h-full" />
          <div className="absolute inset-0 bg-[#141414]/55" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="text-[#FCF9F6] max-w-2xl">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#FCF9F6]/80 font-body mb-5">Our Story</p>
            <h1 className="font-display text-5xl md:text-6xl italic leading-[1.05]">Soul of Colors</h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 py-20 lg:py-28 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#8E7356] font-body mb-5">The Philosophy</p>
        <h2 className="font-display text-3xl md:text-4xl italic leading-snug mb-8">
          "We do not merely make clothing. We weave the soul of a culture into every thread."
        </h2>
        <p className="text-base text-[#141414]/70 font-body leading-[1.9]">
          ROOH E RANG was born from a simple conviction — that the artistry of the loom deserves a place in the modern wardrobe. We exist at the meeting point of heritage and now, where the patient hands of master artisans meet the discerning eye of the contemporary woman. Each collection is a quiet conversation between past and present, woven in color, finished with soul.
        </p>
      </section>

      {/* Heritage split */}
      <section id="story" className="bg-[#141414] text-[#FCF9F6] py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={STORY_IMG} alt="Artisan hands at the loom" fittingType="fill" className="w-full h-full" />
          </div>
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#8E7356] font-body mb-5">The Craft</p>
            <h2 className="font-display text-4xl md:text-5xl italic leading-[1.1] mb-7">
              From the loom to your wardrobe.
            </h2>
            <p className="text-base text-[#FCF9F6]/70 font-body leading-[1.8] mb-6">
              In a softly lit workshop, artisans work wood and thread into cloth that carries memory. The rhythm of the loom is unhurried by design — because true craftsmanship cannot be rushed. A single ensemble can pass through a dozen hands before it is deemed ready to be worn.
            </p>
            <p className="text-base text-[#FCF9F6]/70 font-body leading-[1.8] mb-9">
              We invest in the people behind every piece: fair wages, nurturing workspaces, and the time-honored techniques passed from one generation to the next.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border-b border-[#FCF9F6] pb-1 text-[11px] tracking-[0.25em] uppercase hover:text-[#8E7356] hover:border-[#8E7356] transition-colors"
            >
              Explore the Collection <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#8E7356] font-body mb-3">What We Stand For</p>
          <h2 className="font-display text-4xl md:text-5xl italic">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((v) => (
            <div key={v.title} className="text-center px-4">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full border border-[#8E7356]/30 flex items-center justify-center">
                <v.icon className="w-6 h-6 text-[#8E7356]" strokeWidth={1.25} />
              </div>
              <h3 className="font-display text-xl mb-2">{v.title}</h3>
              <p className="text-sm text-[#141414]/60 font-body leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#F2EBE0] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#8E7356] font-body mb-3">Our Journey</p>
            <h2 className="font-display text-4xl md:text-5xl italic">The Threads of Time</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-[#8E7356]/30" />
            {TIMELINE.map((t, i) => (
              <div key={t.year} className={`relative flex gap-6 lg:gap-0 mb-12 last:mb-0 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                <div className="hidden lg:block flex-1" />
                <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-1 w-3 h-3 rounded-full bg-[#9E2A2B] border-4 border-[#F2EBE0]" />
                <div className="flex-1 pl-10 lg:pl-0 lg:px-8">
                  <p className="font-display text-3xl italic text-[#9E2A2B] mb-1">{t.year}</p>
                  <h3 className="font-display text-xl mb-2">{t.title}</h3>
                  <p className="text-sm text-[#141414]/70 font-body leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-20 lg:py-28 text-center">
        <h2 className="font-display text-4xl md:text-5xl italic mb-6">Wear the soul of a culture.</h2>
        <p className="text-base text-[#141414]/60 font-body mb-9 max-w-lg mx-auto">
          Discover pieces woven with passion, finished with care, and ready to become part of your story.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[#141414] text-[#FCF9F6] px-8 py-4 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-[#9E2A2B] transition-colors"
        >
          Shop the Collection <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
        </Link>
      </section>
    </div>
  );
}