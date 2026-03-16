"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";
import { PopupModal } from "react-calendly";

const ISSUES = [
    "Routing, BGP, SD-WAN troubleshooting",
    "VPN connectivity and firewall issues",
    "Packet loss, latency, and network design review",
    "Multi-site connectivity & redundancy planning",
    "Security audits & compliance reviews",
];

const PACKAGES = [
    {
        title: "60-Minute Troubleshooting",
        price: "$200",
        desc: "Live remote session with a senior network engineer. Perfect for urgent issues that need immediate resolution.",
        duration: "60 min",
        highlight: false,
    },
    {
        title: "Deep Dive Network Analysis",
        price: "$500",
        desc: "Comprehensive analysis of your network architecture, configurations, and performance with a detailed written report.",
        duration: "3–4 hrs",
        highlight: true,
    },
];

export default function Enterprise() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    return (
        <section
            id="enterprise"
            className="py-20 sm:py-28 relative overflow-hidden"
            style={{
                background: isDark
                    ? "linear-gradient(135deg, #060A16 0%, #001F54 50%, #080C18 100%)"
                    : "linear-gradient(135deg, #001F54 0%, #003285 50%, #001F54 100%)",
            }}
        >
            {/* Subtle grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="mb-14 lg:mb-16"
                >
                    <span
                        className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase mb-3 px-3 py-1.5 rounded-full"
                        style={{
                            color: "var(--pz-amber)",
                            background: "rgba(255,180,0,0.12)",
                            fontFamily: "'Syne', sans-serif",
                        }}
                    >
                        Enterprise Services
                    </span>
                    <h2
                        className="font-display font-extrabold text-white mb-4"
                        style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}
                    >
                        Live Troubleshooting &amp;{" "}
                        <span style={{ color: "var(--pz-amber)" }}>Consulting</span>
                    </h2>
                    <p className="text-[15px] max-w-xl text-white/60">
                        Solve complex networking problems remotely with an experienced network engineer. Senior-level expertise on demand.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Left: common issues */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.55 }}
                    >
                        <h3
                            className="font-display font-bold text-[17px] text-white mb-5 uppercase tracking-wide"
                        >
                            Common Issues We Solve
                        </h3>
                        <ul className="flex flex-col gap-3 mb-8">
                            {ISSUES.map((issue) => (
                                <li key={issue} className="flex items-start gap-3">
                                    <span
                                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                        style={{ background: "rgba(255,180,0,0.15)" }}
                                    >
                                        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="var(--pz-amber)" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span className="text-[14px] text-white/70">{issue}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Enterprise trust signals */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { n: "10+", label: "Years Enterprise Experience" },
                                { n: "99%", label: "Issue Resolution Rate" },
                                { n: "4h", label: "Avg Response Time" },
                                { n: "Global", label: "Remote Coverage" },
                            ].map(({ n, label }) => (
                                <div
                                    key={label}
                                    className="p-4 rounded-xl"
                                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                                >
                                    <p
                                        className="font-display font-extrabold text-[22px] leading-none"
                                        style={{ color: "var(--pz-amber)" }}
                                    >
                                        {n}
                                    </p>
                                    <p className="text-[11px] text-white/50 mt-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: packages */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.55 }}
                        className="flex flex-col gap-5"
                    >
                        {PACKAGES.map((pkg) => (
                            <div
                                key={pkg.title}
                                className="rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: pkg.highlight
                                        ? "linear-gradient(135deg, rgba(255,180,0,0.15), rgba(255,107,53,0.1))"
                                        : "rgba(255,255,255,0.05)",
                                    border: pkg.highlight
                                        ? "2px solid rgba(255,180,0,0.4)"
                                        : "1px solid rgba(255,255,255,0.08)",
                                    boxShadow: pkg.highlight ? "0 8px 40px rgba(255,180,0,0.15)" : "none",
                                }}
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3
                                        className="font-display font-bold text-[18px] text-white"
                                    >
                                        {pkg.title}
                                    </h3>
                                    <span
                                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg flex-shrink-0"
                                        style={{ background: "rgba(255,180,0,0.12)", color: "var(--pz-amber)", fontFamily: "'Syne', sans-serif" }}
                                    >
                                        {pkg.duration}
                                    </span>
                                </div>
                                <p className="text-[13px] text-white/60 mb-5 leading-relaxed">{pkg.desc}</p>
                                <div className="flex items-center justify-between gap-4">
                                    <span
                                        className="font-display font-extrabold text-[28px]"
                                        style={{ color: "var(--pz-amber)" }}
                                    >
                                        {pkg.price}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setIsCalendlyOpen(true)}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105"
                                        style={{
                                            background: pkg.highlight ? "var(--pz-amber)" : "rgba(255,180,0,0.12)",
                                            color: pkg.highlight ? "#000" : "var(--pz-amber)",
                                            fontFamily: "'Syne', sans-serif",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Book a Session
                                    </button>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {isCalendlyOpen && (
                <PopupModal
                    url="https://calendly.com/panzookienetworks/enterprise-consultation"
                    open={true}
                    onModalClose={() => setIsCalendlyOpen(false)}
                    rootElement={document.body}
                />
            )}
        </section>
    );
}