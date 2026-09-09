import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#141414] text-[#FCF9F6] py-20 lg:py-28 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#8E7356] font-body mb-5">We're Here for You</p>
          <h1 className="font-display text-5xl md:text-6xl italic">Get in Touch</h1>
          <p className="text-sm text-[#FCF9F6]/60 font-body mt-5 max-w-md mx-auto">
            Questions about an order, a custom fitting, or simply want to say hello — our care team would love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-5 gap-12">
        {/* Contact details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-display text-3xl italic mb-2">Visit Our Atelier</h2>
            <p className="text-sm text-[#8E7356] font-body">We'd love to welcome you in person.</p>
          </div>
          <div className="space-y-6">
            <Detail icon={MapPin} title="Address">
              12 Heritage Lane, Gulberg III<br />Lahore, Pakistan
            </Detail>
            <Detail icon={Phone} title="Phone">
              <a href="https://wa.me/923220933780" target="_blank" rel="noopener noreferrer" className="hover:text-[#9E2A2B] transition-colors">+92 322 0933780</a>
            </Detail>
            <Detail icon={Mail} title="Email">
              <a href="mailto:care@rooh-e-rang.com" className="hover:text-[#9E2A2B] transition-colors">care@rooh-e-rang.com</a><br />
              <a href="mailto:wholesale@rooh-e-rang.com" className="hover:text-[#9E2A2B] transition-colors">wholesale@rooh-e-rang.com</a>
            </Detail>
            <Detail icon={Clock} title="Hours">
              Monday – Saturday · 10am – 8pm<br />Sunday · By appointment
            </Detail>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#8E7356] font-body mb-3">Follow the Soul</p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="text-[#141414]/70 hover:text-[#9E2A2B] transition-colors"><Instagram className="w-5 h-5" strokeWidth={1.5} /></a>
              <a href="#" aria-label="Facebook" className="text-[#141414]/70 hover:text-[#9E2A2B] transition-colors"><Facebook className="w-5 h-5" strokeWidth={1.5} /></a>
              <a href="#" aria-label="Youtube" className="text-[#141414]/70 hover:text-[#9E2A2B] transition-colors"><Youtube className="w-5 h-5" strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 border border-[#8E7356]/20">
              <div className="w-16 h-16 rounded-full bg-[#4A5D4E] flex items-center justify-center mb-6">
                <Send className="w-7 h-7 text-[#FCF9F6]" strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-3xl italic mb-3">Message Sent</h2>
              <p className="text-sm text-[#8E7356] font-body max-w-sm">
                Thank you, {form.name || "friend"}. We've received your message and will respond within 1–2 business days.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-8 text-[11px] tracking-[0.25em] uppercase border-b border-[#141414] pb-1 hover:text-[#9E2A2B] hover:border-[#9E2A2B] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6 border border-[#8E7356]/20 p-8">
              <h2 className="font-display text-3xl italic">Send a Message</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full mt-1 border-b border-[#8E7356]/30 bg-transparent py-2.5 text-sm font-body outline-none focus:border-[#141414] transition-colors"
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full mt-1 border-b border-[#8E7356]/30 bg-transparent py-2.5 text-sm font-body outline-none focus:border-[#141414] transition-colors"
                  />
                </Field>
              </div>
              <Field label="Subject">
                <input
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full mt-1 border-b border-[#8E7356]/30 bg-transparent py-2.5 text-sm font-body outline-none focus:border-[#141414] transition-colors"
                />
              </Field>
              <Field label="Message">
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full mt-1 border-b border-[#8E7356]/30 bg-transparent py-2.5 text-sm font-body outline-none focus:border-[#141414] transition-colors resize-none"
                />
              </Field>
              <button
                type="submit"
                className="w-full bg-[#141414] text-[#FCF9F6] py-4 text-[11px] tracking-[0.25em] uppercase font-body hover:bg-[#9E2A2B] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" strokeWidth={1.5} /> Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Detail({ icon: Icon, title, children }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 flex-shrink-0 rounded-full border border-[#8E7356]/30 flex items-center justify-center">
        <Icon className="w-4 h-4 text-[#8E7356]" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#8E7356] font-body mb-1">{title}</p>
        <p className="text-sm text-[#141414]/80 font-body leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.2em] uppercase text-[#8E7356] font-body">{label}</span>
      {children}
    </label>
  );
}