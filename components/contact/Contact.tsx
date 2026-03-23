"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { useState, useEffect } from "react";
import ContactForm from "@/components/contact/ContactForm";
import HomeNetworkForm from "@/components/contact/HomeNetworkForm";
import EnterpriseConsultation from "@/components/contact/EnterpriseConsultation";

type Tab = "contact" | "home" | "enterprise";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
        id: "contact",
        label: "Contact Us",
        icon: (
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
    },
    {
        id: "home",
        label: "Home Network",
        icon: (
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        id: "enterprise",
        label: "Enterprise",
        icon: (
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
    },
];

export default function Contact() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeTab, setActiveTab] = useState<Tab>("contact");

    // ── Listen for deep-link events from Hero (or any other section) ──────────
    useEffect(() => {
        function handleOpenTab(e: Event) {
            const tab = (e as CustomEvent<{ tab: Tab }>).detail?.tab;
            if (tab) setActiveTab(tab);
        }
        window.addEventListener("open-contact-tab", handleOpenTab);
        return () => window.removeEventListener("open-contact-tab", handleOpenTab);
    }, []);

    const surfaceBg = isDark ? "rgba(255,255,255,0.04)" : "#ffffff";
    const surfaceBorder = isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0";
    const textPrimary = isDark ? "#f8fafc" : "#0f172a";
    const textSecondary = isDark ? "rgba(255,255,255,0.55)" : "#64748b";
    const subtleBg = isDark ? "#0d1117" : "#f0f6ff";

    return (
        <section
            id="contact"
            className="py-20 sm:py-28 relative overflow-hidden"
            style={{ background: subtleBg }}
        >
            {/* ── Background decoration ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px]"
                    style={{ background: "radial-gradient(ellipse, rgba(255,180,0,0.10) 0%, transparent 68%)" }}
                />
                <div
                    className="absolute bottom-0 right-0 w-[400px] h-[400px]"
                    style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)" }}
                />
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.045)"} />
                        </pattern>
                        <filter id="blur-sm"><feGaussianBlur stdDeviation="0.6" /></filter>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dot-grid)" />
                    <circle cx="-60" cy="120" r="280" fill="none" stroke={isDark ? "rgba(255,180,0,0.06)" : "rgba(255,180,0,0.1)"} strokeWidth="1" />
                    <circle cx="-60" cy="120" r="200" fill="none" stroke={isDark ? "rgba(255,180,0,0.04)" : "rgba(255,180,0,0.07)"} strokeWidth="1" />
                    <g stroke={isDark ? "rgba(255,180,0,0.07)" : "rgba(255,180,0,0.10)"} strokeWidth="1" fill="none" filter="url(#blur-sm)">
                        <line x1="0" y1="60" x2="18%" y2="60" />
                        <line x1="18%" y1="60" x2="18%" y2="140" />
                        <line x1="18%" y1="140" x2="28%" y2="140" />
                        <circle cx="18%" cy="60" r="2.5" fill={isDark ? "rgba(255,180,0,0.15)" : "rgba(255,180,0,0.2)"} stroke="none" />
                        <circle cx="18%" cy="140" r="2.5" fill={isDark ? "rgba(255,180,0,0.15)" : "rgba(255,180,0,0.2)"} stroke="none" />
                    </g>
                    <circle cx="12%" cy="35%" r="3" fill={isDark ? "rgba(255,180,0,0.08)" : "rgba(255,180,0,0.12)"} />
                    <circle cx="12%" cy="35%" r="6" fill="none" stroke={isDark ? "rgba(255,180,0,0.05)" : "rgba(255,180,0,0.08)"} strokeWidth="1" />
                    <circle cx="88%" cy="28%" r="3" fill={isDark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.1)"} />
                    <circle cx="88%" cy="28%" r="6" fill="none" stroke={isDark ? "rgba(59,130,246,0.04)" : "rgba(59,130,246,0.07)"} strokeWidth="1" />
                </svg>
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-12"
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
                        style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", color: textPrimary }}
                    >
                        Ready to Fix Your Network?
                    </h2>
                    <p className="text-[15px] max-w-xl mx-auto" style={{ color: textSecondary }}>
                        Send us a message, request a home visit, or book an enterprise call.
                    </p>
                </motion.div>

                {/* ── 3-tab switcher ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="flex rounded-2xl p-1.5 mb-8 mx-auto"
                    style={{
                        background: isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0",
                        maxWidth: "480px",
                    }}
                >
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-[12px] font-bold transition-all duration-300 cursor-pointer"
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                background: activeTab === tab.id ? "var(--pz-amber)" : "transparent",
                                color: activeTab === tab.id ? "#000" : textSecondary,
                                boxShadow: activeTab === tab.id ? "0 4px 20px rgba(255,180,0,0.35)" : "none",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab.icon}
                            <span className="hidden sm:inline">{tab.label}</span>
                            <span className="sm:hidden">
                                {tab.id === "contact" ? "Contact" : tab.id === "home" ? "Home" : "Enterprise"}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* ── Animated panel ── */}
                <AnimatePresence mode="wait">
                    {activeTab === "contact" && (
                        <motion.div
                            key="contact"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.35 }}
                        >
                            <ContactForm />
                        </motion.div>
                    )}
                    {activeTab === "home" && (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.35 }}
                        >
                            <HomeNetworkForm />
                        </motion.div>
                    )}
                    {activeTab === "enterprise" && (
                        <motion.div
                            key="enterprise"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.35 }}
                        >
                            <EnterpriseConsultation />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Trust bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-7 px-6 rounded-2xl"
                    style={{ background: surfaceBg, border: `1px solid ${surfaceBorder}` }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: isDark ? "rgba(255,180,0,0.1)" : "rgba(255,180,0,0.12)" }}>
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--pz-amber)" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: textSecondary, fontFamily: "'Syne', sans-serif" }}>Email</p>
                            <a href="mailto:hello@panzookienetworks.com" className="text-[14px] font-semibold transition-colors hover:opacity-80" style={{ color: "var(--pz-amber)" }}>
                                hello@panzookienetworks.com
                            </a>
                        </div>
                    </div>

                    <div className="hidden sm:block w-px h-10" style={{ background: surfaceBorder }} />

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: isDark ? "rgba(255,180,0,0.1)" : "rgba(255,180,0,0.12)" }}>
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--pz-amber)" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: textSecondary, fontFamily: "'Syne', sans-serif" }}>Phone</p>
                            <p className="text-[14px] font-semibold" style={{ color: textPrimary }}>Available on request</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}