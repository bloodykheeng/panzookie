"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

const REASONS = [
    {
        icon: (
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        title: "Senior Engineer Experience",
        desc: "Real enterprise-grade expertise with SD-WAN, BGP, and complex multi-site deployments behind every solution.",
    },
    {
        icon: (
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: "Real-World Troubleshooting",
        desc: "Hands-on experience solving the complex, frustrating problems that generic IT support simply can't handle.",
    },
    {
        icon: (
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        title: "Home & Business Focus",
        desc: "Whether it's a family home or a small business office, solutions are tailored precisely to your needs and budget.",
    },
    {
        icon: (
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "Fast & Reliable Service",
        desc: "Quick turnaround, clear communication, and professional solutions that actually stick — no guesswork.",
    },
];

const SERVICE_AREA = [
    "Georgetown, TX",
    "Round Rock, TX",
    "North Austin, TX",
    "Remote — Worldwide",
];

export default function WhyUs() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section
            id="why"
            className="py-20 sm:py-28"
            style={{ background: "var(--bg-base)" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                    >
                        <span
                            className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase mb-3 px-3 py-1.5 rounded-full"
                            style={{
                                color: "var(--pz-amber)",
                                background: isDark ? "rgba(255,180,0,0.1)" : "rgba(255,180,0,0.12)",
                                fontFamily: "'Syne', sans-serif",
                            }}
                        >
                            Why Choose Us
                        </span>
                        <h2
                            className="font-display font-extrabold mb-4"
                            style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", color: "var(--text-primary)" }}
                        >
                            Expertise You Can{" "}
                            <span style={{ color: "var(--pz-amber)" }}>Count On</span>,
                            <br />With a Friendly Touch
                        </h2>
                        <p className="text-[15px] leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                            Unlike big ISPs and generic IT companies, Panzookie Networks is personal. Every job is handled with enterprise precision and genuine care for your satisfaction.
                        </p>

                        {/* Service area */}
                        <div
                            className="rounded-2xl p-5 sm:p-6"
                            style={{
                                background: "var(--bg-surface)",
                                border: "1px solid var(--border-color)",
                                boxShadow: "var(--card-shadow)",
                            }}
                        >
                            <h4
                                className="font-display font-bold text-[13px] tracking-widest uppercase mb-4"
                                style={{ color: "var(--text-muted)" }}
                            >
                                Service Area
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                                {SERVICE_AREA.map((area) => (
                                    <div key={area} className="flex items-center gap-2">
                                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="var(--pz-amber)" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                                            {area}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: reason cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {REASONS.map((r, i) => (
                            <motion.div
                                key={r.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: i * 0.12, duration: 0.5 }}
                                className="p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                                style={{
                                    background: "var(--bg-surface)",
                                    border: "1px solid var(--border-color)",
                                    boxShadow: "var(--card-shadow)",
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:scale-110"
                                    style={{
                                        background: isDark ? "rgba(255,180,0,0.1)" : "rgba(255,180,0,0.12)",
                                        color: "var(--pz-amber)",
                                    }}
                                >
                                    {r.icon}
                                </div>
                                <h3
                                    className="font-display font-bold text-[15px] mb-2"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {r.title}
                                </h3>
                                <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                    {r.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}