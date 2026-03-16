"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";
import { PopupModal } from "react-calendly";

const BOOKING_OPTIONS = [
    {
        icon: (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        title: "Book Home Network Service",
        desc: "Schedule your home Wi-Fi or full network setup appointment",
        href: "https://calendly.com/panzookienetworks/home-network-service",
        primary: true,
    },
    {
        icon: (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        title: "Enterprise Consultation",
        desc: "Schedule your live troubleshooting or deep-dive analysis session",
        href: "https://calendly.com/panzookienetworks/enterprise-consultation",
        primary: false,
    },
    {
        icon: (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
        title: "Subscribe to Maintenance",
        desc: "Choose a recurring support plan and keep your network healthy",
        href: "https://calendly.com/panzookienetworks/maintenance-subscription",
        primary: false,
    },
];

export default function Contact() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null);

    return (
        <section
            id="contact"
            className="py-20 sm:py-28 relative overflow-hidden"
            style={{ background: isDark ? "var(--bg-subtle)" : "var(--pz-sky)" }}
        >
            {/* Glow accent */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse, rgba(255,180,0,0.12) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-14"
                >
                    <span
                        className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase mb-3 px-3 py-1.5 rounded-full"
                        style={{
                            color: "var(--pz-amber)",
                            background: isDark ? "rgba(255,180,0,0.1)" : "rgba(255,180,0,0.12)",
                            fontFamily: "'Syne', sans-serif",
                        }}
                    >
                        Get In Touch
                    </span>
                    <h2
                        className="font-display font-extrabold mb-4"
                        style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", color: "var(--text-primary)" }}
                    >
                        Ready to Fix Your Network?
                    </h2>
                    <p className="text-[15px] max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
                        Book directly using Calendly, or reach out via email. We respond quickly.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-5 mb-12">
                    {BOOKING_OPTIONS.map((opt, i) => (
                        <motion.button
                            key={opt.title}
                            type="button"
                            onClick={() => setCalendlyUrl(opt.href)}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: i * 0.12, duration: 0.5 }}
                            className="flex flex-col p-6 sm:p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                            style={{
                                background: opt.primary
                                    ? "var(--pz-amber)"
                                    : "var(--bg-surface)",
                                border: opt.primary
                                    ? "none"
                                    : "1px solid var(--border-color)",
                                boxShadow: opt.primary
                                    ? "0 12px 48px rgba(255,180,0,0.35)"
                                    : "var(--card-shadow)",
                                cursor: "pointer",
                            }}
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                                style={{
                                    background: opt.primary ? "rgba(0,0,0,0.12)" : isDark ? "rgba(255,180,0,0.1)" : "rgba(255,180,0,0.12)",
                                    color: opt.primary ? "#000" : "var(--pz-amber)",
                                }}
                            >
                                {opt.icon}
                            </div>
                            <h3
                                className="font-display font-bold text-[16px] mb-2"
                                style={{ color: opt.primary ? "#000" : "var(--text-primary)" }}
                            >
                                {opt.title}
                            </h3>
                            <p
                                className="text-[13px] leading-relaxed flex-1 mb-4"
                                style={{ color: opt.primary ? "rgba(0,0,0,0.65)" : "var(--text-secondary)" }}
                            >
                                {opt.desc}
                            </p>
                            <div
                                className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase"
                                style={{
                                    color: opt.primary ? "#000" : "var(--pz-amber)",
                                    fontFamily: "'Syne', sans-serif",
                                }}
                            >
                                Schedule Now
                                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {calendlyUrl && (
                    <PopupModal
                        url={calendlyUrl}
                        open={true}
                        onModalClose={() => setCalendlyUrl(null)}
                        rootElement={document.body}
                    />
                )}

                {/* Direct contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-8 px-6 rounded-2xl"
                    style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-color)",
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: isDark ? "rgba(255,180,0,0.1)" : "rgba(255,180,0,0.12)" }}
                        >
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--pz-amber)" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: "var(--text-muted)", fontFamily: "'Syne', sans-serif" }}>
                                Email
                            </p>
                            <a
                                href="mailto:hello@panzookienetworks.com"
                                className="text-[14px] font-semibold transition-colors hover:opacity-80"
                                style={{ color: "var(--pz-amber)" }}
                            >
                                hello@panzookienetworks.com
                            </a>
                        </div>
                    </div>

                    <div className="hidden sm:block w-px h-10" style={{ background: "var(--border-color)" }} />

                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: isDark ? "rgba(255,180,0,0.1)" : "rgba(255,180,0,0.12)" }}
                        >
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--pz-amber)" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: "var(--text-muted)", fontFamily: "'Syne', sans-serif" }}>
                                Phone
                            </p>
                            <p className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>
                                Available on request
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}