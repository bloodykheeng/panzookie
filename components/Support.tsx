"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { PopupModal } from "react-calendly";

const PLANS = [
    {
        name: "Basic",
        price: 25,
        period: "month",
        color: "#4FC3F7",
        features: [
            "Remote troubleshooting",
            "Monthly router/firmware checks",
            "Email & phone support",
        ],
        cta: "Subscribe — Basic",
        highlight: false,
    },
    {
        name: "Premium",
        price: 75,
        period: "month",
        color: "#FFB400",
        features: [
            "Quarterly in-home Wi-Fi optimization",
            "Network security monitoring",
            "Smart home device support",
            "Unlimited remote support",
        ],
        cta: "Subscribe — Premium",
        highlight: true,
    },
    {
        name: "Elite",
        price: 150,
        period: "month",
        color: "#81C784",
        features: [
            "Annual full network audit",
            "Mesh system optimization",
            "VLAN/device segmentation for home office",
            "Emergency on-call support",
        ],
        cta: "Subscribe — Elite",
        highlight: false,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.55, ease: "easeOut" as const },
    }),
};

export default function Support() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    return (
        <section
            id="support"
            className="py-20 sm:py-28"
            style={{ background: isDark ? "var(--bg-subtle)" : "var(--pz-sky)" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

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
                            color: "var(--pz-blue)",
                            background: "rgba(42,127,191,0.12)",
                            fontFamily: "'Syne', sans-serif",
                        }}
                    >
                        Maintenance Plans
                    </span>
                    <h2
                        className="font-display font-extrabold mb-4"
                        style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", color: "var(--text-primary)" }}
                    >
                        Keep Your Home Network{" "}
                        <span style={{ color: "var(--pz-amber)" }}>Running Smoothly</span>
                    </h2>
                    <p className="text-[15px] max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
                        Ongoing support and monitoring so your network is always fast, secure, and reliable.
                    </p>
                </motion.div>

                {/* Plans */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false }}
                            variants={fadeUp}
                            className="relative flex flex-col rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1"
                            style={{
                                background: plan.highlight
                                    ? isDark
                                        ? "linear-gradient(145deg, rgba(255,180,0,0.14), rgba(0,31,84,0.5))"
                                        : "linear-gradient(145deg, rgba(255,180,0,0.18), rgba(255,255,255,0.95))"
                                    : "var(--bg-surface)",
                                border: plan.highlight
                                    ? `2px solid ${plan.color}55`
                                    : "1px solid var(--border-color)",
                                boxShadow: plan.highlight
                                    ? `0 12px 48px ${plan.color}25`
                                    : "var(--card-shadow)",
                            }}
                        >
                            {plan.highlight && (
                                <div
                                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                                    style={{ background: plan.color, color: "#000", fontFamily: "'Syne', sans-serif" }}
                                >
                                    Best Value
                                </div>
                            )}

                            {/* Plan name */}
                            <div className="flex items-center gap-2 mb-4">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ background: plan.color }}
                                />
                                <span
                                    className="font-display font-bold text-[15px] tracking-wide uppercase"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {plan.name}
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <span
                                    className="font-display font-extrabold"
                                    style={{ fontSize: "clamp(2.2rem, 7vw, 3rem)", color: plan.color, lineHeight: 1 }}
                                >
                                    ${plan.price}
                                </span>
                                <span className="text-[13px] ml-1" style={{ color: "var(--text-muted)" }}>
                                    /{plan.period}
                                </span>
                            </div>

                            {/* Features */}
                            <ul className="flex flex-col gap-3 flex-1 mb-8">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5">
                                        <span
                                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                            style={{ background: `${plan.color}20` }}
                                        >
                                            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke={plan.color} strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
                                            {f}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                onClick={() => setIsCalendlyOpen(true)}
                                className="w-full flex items-center justify-center py-3.5 rounded-xl text-[12px] font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95"
                                style={{
                                    background: plan.highlight ? plan.color : "transparent",
                                    color: plan.highlight ? "#000" : plan.color,
                                    border: plan.highlight ? "none" : `2px solid ${plan.color}50`,
                                    fontFamily: "'Syne', sans-serif",
                                    cursor: "pointer",
                                }}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {isCalendlyOpen && (
                <PopupModal
                    url="https://calendly.com/panzookienetworks/maintenance-subscription"
                    open={true}
                    onModalClose={() => setIsCalendlyOpen(false)}
                    rootElement={document.body}
                />
            )}
        </section>
    );
}