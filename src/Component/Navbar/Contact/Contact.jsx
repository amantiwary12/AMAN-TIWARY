import React, { useState, useEffect } from "react";

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "amantiwary2505@gmail.com",
    href: "mailto:amantiwary2505@gmail.com",
  },
  {
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+91 98353 83246",
    href: "https://wa.me/919835383246",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Location",
    value: "Bhopal, Madhya Pradesh · India",
    href: null,
  },
];

const socials = [
  { label: "GitHub",    href: "https://github.com/amantiwary12",               abbr: "GH" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/aman_tiwary12/",    abbr: "LI" },
  { label: "YouTube",   href: "https://www.youtube.com/@amantiwary12",          abbr: "YT" },
  { label: "Instagram", href: "https://www.instagram.com/amantiwary_12/",       abbr: "IG" },
];

const EMPTY = { name: "", email: "", subject: "", message: "" };

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  color: "var(--text)",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s",
};

const ContactPage = () => {
  const [form, setForm]         = useState(EMPTY);
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const whatsappMessage =
      `Hi Aman! 👋 I just filled your contact form.\n\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*Subject:* ${form.subject}\n\n` +
      `*Message:*\n${form.message}`;

    window.open(
      `https://wa.me/919835383246?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setSent(true);
    setLoading(false);
    setForm(EMPTY);
    setTimeout(() => setSent(false), 5000);
  };

  const focusStyle = (e) => (e.currentTarget.style.borderColor = "rgba(238,91,46,0.6)");
  const blurStyle  = (e) => (e.currentTarget.style.borderColor = "var(--border)");

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }} className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <header className="mb-16 reveal">
          <span className="section-label">Contact</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3">
            Get In <span className="g-text">Touch</span>
          </h1>
          <p className="mt-4 max-w-lg text-base" style={{ color: "var(--muted)" }}>
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </header>

        {/* ── Info cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {contactInfo.map((c, i) => {
            const inner = (
              <div
                className="card reveal p-6 h-full flex items-start gap-4"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(238,91,46,0.12)", color: "#e0b464" }}
                >
                  {c.icon}
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--muted)" }}>
                    {c.label}
                  </p>
                  <p className="text-sm font-medium text-white">{c.value}</p>
                </div>
              </div>
            );
            return c.href ? (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="block">
                {inner}
              </a>
            ) : (
              <div key={c.label}>{inner}</div>
            );
          })}
        </div>

        {/* ── Form + sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2 reveal">
            <div
              className="rounded-2xl p-8"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <h2 className="text-xl font-bold text-white mb-1">Send a Message</h2>
              <p className="text-sm mb-7" style={{ color: "var(--muted)" }}>
                Fill out the form — it opens WhatsApp with your message ready to send.
              </p>

              {sent && (
                <div
                  className="flex items-center gap-2 p-4 rounded-xl mb-6 text-sm"
                  style={{
                    background: "rgba(52,211,153,0.08)",
                    border: "1px solid rgba(52,211,153,0.2)",
                    color: "#34d399",
                  }}
                >
                  ✅ Redirecting to WhatsApp — just hit send there and I'll get back to you soon!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      style={inputStyle}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project inquiry / Collaboration"
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project..."
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center"
                  style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 reveal reveal-delay-2">
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919835383246"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl p-6 transition-all duration-300"
              style={{
                background: "rgba(34,197,94,0.06)",
                border: "1px solid rgba(34,197,94,0.15)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.35)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.15)")}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm"
                  style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80" }}
                >
                  💬
                </span>
                <div>
                  <p className="text-sm font-bold text-white">Chat on WhatsApp</p>
                  <p className="text-xs" style={{ color: "#4ade80" }}>Usually replies in minutes</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                Prefer a quick chat? Message me directly on WhatsApp.
              </p>
            </a>

            {/* Social links */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <h3 className="text-sm font-bold text-white mb-4">Find Me Online</h3>
              <div className="space-y-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-colors text-sm"
                    style={{ background: "var(--surface-2)", color: "var(--muted)", border: "1px solid var(--border)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#e0b464"; e.currentTarget.style.borderColor = "rgba(238,91,46,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                  >
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ background: "rgba(238,91,46,0.12)", color: "#e0b464" }}
                    >
                      {s.abbr}
                    </span>
                    {s.label}
                    <svg className="ml-auto w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold text-white">Availability</h3>
              </div>
              <div className="space-y-2 text-xs" style={{ color: "var(--muted)" }}>
                <div className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span style={{ color: "#e0b464" }}>9 AM – 6 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span style={{ color: "#e0b464" }}>10 AM – 2 PM IST</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>Sunday</span>
                  <span className="text-right" style={{ color: "#e0b464" }}>
                    😴 Officially off — but for a cool project, my laptop mysteriously opens itself 💻✨
                  </span>
                </div>
                <div className="pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  Avg. response time: within 24 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
