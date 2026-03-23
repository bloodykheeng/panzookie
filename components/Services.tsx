"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";
import { PopupModal } from "react-calendly";

const SERVICES = [
    {
        icon: (
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        ),
        title: "Network Health Check",
        price: "$99",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_NETWORK_HEALTH!,
        desc: "Quick evaluation of your home network, including Wi-Fi coverage, speed testing, and optimization recommendations.",
        badge: "Most Popular",
        highlight: false,
    },
    {
        icon: (
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
        ),
        title: "Wi-Fi Optimization",
        price: "$350",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WIFI_OPTIMIZATION!,
        desc: "Improve coverage, eliminate dead zones, and boost streaming and gaming performance across your entire home.",
        badge: null,
        highlight: true,
    },
    {
        icon: (
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
        ),
        title: "Full Home Network Setup",
        price: "$1,200+",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL_SETUP!,
        desc: "Professional installation with wired/wireless integration, VLAN setup, secure configuration, and smart home optimization.",
        badge: "Complete Solution",
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

export default function Services() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

    function goToContactTab(tab: "contact" | "home" | "enterprise") {
        // Dispatch a custom event that the Contact section listens to
        window.dispatchEvent(new CustomEvent("open-contact-tab", { detail: { tab } }));
        // Then scroll to the section
        const section = document.getElementById("contact");
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    async function handleBuy(priceId: string, serviceName: string) {
        setLoadingPriceId(priceId);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId, serviceName }),
            });
            const data = await res.json();
            console.log("🚀 ~ handleBuy ~ data:", data)
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(`Something went wrong. Please try again. ${data.error}`);
            }
        } catch (error) {
            alert(`Something went wrong. Please try again. ${error ?? ''}`);
        } finally {
            setLoadingPriceId(null);
        }
    }

    return (
        <section id="services" className="py-20 sm:py-28" style={{ background: "var(--bg-base)" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-14 sm:mb-18"
                >
                    <span
                        className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase mb-3 px-3 py-1.5 rounded-full"
                        style={{
                            color: "var(--pz-amber)",
                            background: isDark ? "rgba(255,180,0,0.1)" : "rgba(255,180,0,0.12)",
                            fontFamily: "'Syne', sans-serif",
                        }}
                    >
                        Home Services
                    </span>
                    <h2
                        className="font-display font-extrabold mb-4"
                        style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", color: "var(--text-primary)" }}
                    >
                        Optimized Wi-Fi &amp;{" "}
                        <span style={{ color: "var(--pz-amber)" }}>Home Network</span> Services
                    </h2>
                    <p className="text-[15px] max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
                        From a quick health check to a complete whole-home setup — tailored for homeowners, remote workers, and smart home enthusiasts.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    {SERVICES.map((s, i) => {
                        const isLoading = loadingPriceId === s.priceId;
                        return (
                            <motion.div
                                key={s.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false }}
                                variants={fadeUp}
                                className="relative flex flex-col rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 group"
                                style={{
                                    background: s.highlight
                                        ? isDark
                                            ? "linear-gradient(135deg, rgba(255,180,0,0.12), rgba(0,31,84,0.4))"
                                            : "linear-gradient(135deg, rgba(255,180,0,0.15), rgba(235,245,255,0.9))"
                                        : "var(--bg-surface)",
                                    border: s.highlight
                                        ? "2px solid rgba(255,180,0,0.4)"
                                        : "1px solid var(--border-color)",
                                    boxShadow: s.highlight ? "0 8px 40px rgba(255,180,0,0.15)" : "var(--card-shadow)",
                                }}
                            >
                                {s.badge && (
                                    <span
                                        className="absolute -top-3 left-6 px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full"
                                        style={{
                                            background: s.highlight ? "var(--pz-amber)" : "var(--pz-navy)",
                                            color: s.highlight ? "#000" : "#fff",
                                            fontFamily: "'Syne', sans-serif",
                                        }}
                                    >
                                        {s.badge}
                                    </span>
                                )}
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                                    style={{
                                        background: isDark ? "rgba(255,180,0,0.1)" : "rgba(255,180,0,0.12)",
                                        color: "var(--pz-amber)",
                                    }}
                                >
                                    {s.icon}
                                </div>
                                <h3 className="font-display font-bold text-[18px] mb-2" style={{ color: "var(--text-primary)" }}>
                                    {s.title}
                                </h3>
                                <p className="text-[13px] leading-relaxed flex-1 mb-5" style={{ color: "var(--text-secondary)" }}>
                                    {s.desc}
                                </p>

                                <div className="flex items-center justify-between gap-3 mb-3">
                                    <span className="font-display font-extrabold text-[24px]" style={{ color: "var(--pz-amber)" }}>
                                        {s.price}
                                    </span>
                                    {/* Pay Now via Stripe */}
                                    <button
                                        type="button"
                                        onClick={() => handleBuy(s.priceId, s.title)}
                                        disabled={isLoading}
                                        className="px-4 py-2 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1.5"
                                        style={{
                                            background: s.highlight ? "var(--pz-amber)" : isDark ? "rgba(255,180,0,0.12)" : "rgba(255,180,0,0.1)",
                                            color: s.highlight ? "#000" : "var(--pz-amber)",
                                            fontFamily: "'Syne', sans-serif",
                                            cursor: isLoading ? "not-allowed" : "pointer",
                                        }}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                                                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                                                </svg>
                                                Processing…
                                            </>
                                        ) : (
                                            <>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                                    <line x1="1" y1="10" x2="23" y2="10" />
                                                </svg>
                                                Pay Now
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Book Consultation (Calendly) */}
                                <button
                                    type="button"
                                    // onClick={() => setIsCalendlyOpen(true)}
                                    onClick={() => goToContactTab("contact")}
                                    className="w-full py-2 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all duration-200 hover:opacity-80"
                                    style={{
                                        border: "1px solid var(--border-color)",
                                        color: "var(--text-secondary)",
                                        fontFamily: "'Syne', sans-serif",
                                        background: "transparent",
                                        cursor: "pointer",
                                    }}
                                >
                                    Book Consultation
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center"
                >
                    <button
                        type="button"
                        // onClick={() => setIsCalendlyOpen(true)}
                        onClick={() => goToContactTab("home")}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[13px] font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                            background: "var(--pz-amber)",
                            color: "#000",
                            fontFamily: "'Syne', sans-serif",
                            boxShadow: "0 8px 32px rgba(255,180,0,0.3)",
                            cursor: "pointer",
                        }}
                    >
                        Book Your Home Service
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </motion.div>
            </div>

            {isCalendlyOpen && (
                <PopupModal
                    url="https://calendly.com/panzookienetworks/home-network-service"
                    open={true}
                    onModalClose={() => setIsCalendlyOpen(false)}
                    rootElement={document.body}
                />
            )}
        </section>
    );
}