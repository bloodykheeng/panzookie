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

    function goToContactTab(tab: "contact" | "home" | "enterprise") {
        // Dispatch a custom event that the Contact section listens to
        window.dispatchEvent(new CustomEvent("open-contact-tab", { detail: { tab } }));
        // Then scroll to the section
        const section = document.getElementById("contact");
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    // ── Theme tokens ──────────────────────────────────────────────────────────
    const sectionBg = isDark ? "linear-gradient(135deg, #060A16 0%, #001F54 50%, #080C18 100%)" : "var(--pz-sky, #f0f6ff)";
    const textPrimary = isDark ? "#ffffff" : "#0f172a";
    const textSecondary = isDark ? "rgba(255,255,255,0.60)" : "#475569";
    const textMuted = isDark ? "rgba(255,255,255,0.40)" : "#94a3b8";
    const cardBg = isDark ? "rgba(255,255,255,0.05)" : "#ffffff";
    const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0";
    const cardHighBg = isDark
        ? "linear-gradient(135deg, rgba(255,180,0,0.15), rgba(255,107,53,0.10))"
        : "linear-gradient(135deg, rgba(255,180,0,0.08), rgba(255,140,0,0.04))";
    const cardHighBorder = isDark ? "rgba(255,180,0,0.4)" : "rgba(255,180,0,0.5)";
    const statBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,180,0,0.06)";
    const statBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,180,0,0.15)";
    const gridOpacity = isDark ? 0.04 : 0.035;
    const gridColor = isDark ? "rgba(255,255,255,0.8)" : "rgba(100,116,139,0.5)";

    return (
        <section
            id="enterprise"
            className="py-20 sm:py-28 relative overflow-hidden"
            style={{ background: sectionBg }}
        >
            {/* Subtle grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: gridOpacity,
                    backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Ambient glow — only meaningful in dark mode */}
            {isDark && (
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse, rgba(255,180,0,0.08) 0%, transparent 70%)",
                    }}
                />
            )}

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
                            background: isDark ? "rgba(255,180,0,0.12)" : "rgba(255,180,0,0.12)",
                            fontFamily: "'Syne', sans-serif",
                        }}
                    >
                        Enterprise Services
                    </span>
                    <h2
                        className="font-display font-extrabold mb-4"
                        style={{
                            fontSize: "clamp(1.9rem, 5vw, 3rem)",
                            color: textPrimary,
                        }}
                    >
                        Live Troubleshooting &amp;{" "}
                        <span style={{ color: "var(--pz-amber)" }}>Consulting</span>
                    </h2>
                    <p className="text-[15px] max-w-xl" style={{ color: textSecondary }}>
                        Solve complex networking problems remotely with an experienced network engineer. Senior-level expertise on demand.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* Left: common issues + stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.55 }}
                    >
                        <h3
                            className="font-display font-bold text-[17px] mb-5 uppercase tracking-wide"
                            style={{ color: textPrimary }}
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
                                    <span className="text-[14px]" style={{ color: textSecondary }}>{issue}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Stats */}
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
                                    style={{
                                        background: statBg,
                                        border: `1px solid ${statBorder}`,
                                    }}
                                >
                                    <p
                                        className="font-display font-extrabold text-[22px] leading-none"
                                        style={{ color: "var(--pz-amber)" }}
                                    >
                                        {n}
                                    </p>
                                    <p
                                        className="text-[11px] mt-1"
                                        style={{ color: textMuted, fontFamily: "'Syne', sans-serif" }}
                                    >
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
                                    background: pkg.highlight ? cardHighBg : cardBg,
                                    border: `${pkg.highlight ? "2px" : "1px"} solid ${pkg.highlight ? cardHighBorder : cardBorder}`,
                                    boxShadow: pkg.highlight
                                        ? isDark
                                            ? "0 8px 40px rgba(255,180,0,0.15)"
                                            : "0 8px 32px rgba(255,180,0,0.12)"
                                        : isDark
                                            ? "none"
                                            : "0 2px 12px rgba(0,0,0,0.05)",
                                }}
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3
                                        className="font-display font-bold text-[18px]"
                                        style={{ color: textPrimary }}
                                    >
                                        {pkg.title}
                                    </h3>
                                    <span
                                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg flex-shrink-0"
                                        style={{
                                            background: "rgba(255,180,0,0.12)",
                                            color: "var(--pz-amber)",
                                            fontFamily: "'Syne', sans-serif",
                                        }}
                                    >
                                        {pkg.duration}
                                    </span>
                                </div>
                                <p
                                    className="text-[13px] mb-5 leading-relaxed"
                                    style={{ color: textSecondary }}
                                >
                                    {pkg.desc}
                                </p>
                                <div className="flex items-center justify-between gap-4">
                                    <span
                                        className="font-display font-extrabold text-[28px]"
                                        style={{ color: "var(--pz-amber)" }}
                                    >
                                        {pkg.price}
                                    </span>
                                    <button
                                        type="button"
                                        // onClick={() => setIsCalendlyOpen(true)}
                                        onClick={() => goToContactTab("enterprise")}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105"
                                        style={{
                                            background: pkg.highlight ? "var(--pz-amber)" : isDark ? "rgba(255,180,0,0.12)" : "rgba(255,180,0,0.10)",
                                            color: pkg.highlight ? "#000" : "var(--pz-amber)",
                                            fontFamily: "'Syne', sans-serif",
                                            cursor: "pointer",
                                            border: pkg.highlight ? "none" : `1px solid rgba(255,180,0,0.25)`,
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