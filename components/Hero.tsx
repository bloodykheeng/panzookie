"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import { PopupModal } from "react-calendly";

export default function Hero() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null);

    function goToContactTab(tab: "contact" | "home" | "enterprise") {
        // Dispatch a custom event that the Contact section listens to
        window.dispatchEvent(new CustomEvent("open-contact-tab", { detail: { tab } }));
        // Then scroll to the section
        const section = document.getElementById("contact");
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[68px]"
            style={{ background: "var(--bg-base)" }}
        >
            {/* Animated gradient background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: isDark
                        ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,180,0,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0,31,84,0.4) 0%, transparent 60%)"
                        : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,180,0,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(189,220,245,0.5) 0%, transparent 60%)",
                }}
            />

            {/* Dot grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(${isDark ? "#fff" : "#000"} 1.5px, transparent 1.5px)`,
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Red Network Globe Lottie — visible on all screen sizes, behind SVG nodes */}
            <div
                className="absolute pointer-events-none top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:left-auto md:right-[-40px] lg:right-[40px] md:translate-x-0"
                style={{
                    width: "clamp(380px, 85vw, 560px)",
                    height: "clamp(380px, 85vw, 560px)",
                    opacity: 0.18,
                    zIndex: 0,
                }}
            >
                <DotLottieReact
                    src="/dotlotties/Red Network Globe.lottie"
                    loop
                    autoplay
                    speed={0.5}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>

            {/* Floating network nodes decoration — sits above the Lottie globe */}
            <div className="absolute top-1/4 left-8 sm:right-16 hidden sm:block pointer-events-none" style={{ zIndex: 1 }}>
                <motion.div
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-[260px] h-[260px] lg:w-[340px] lg:h-[340px] opacity-20"
                >
                    <svg viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <circle cx="170" cy="170" r="130" stroke="var(--pz-amber)" strokeWidth="1" strokeDasharray="8 6" />
                        <circle cx="170" cy="40" r="16" fill="var(--pz-amber)" opacity="0.9" />
                        <circle cx="300" cy="250" r="14" fill="#4FC3F7" opacity="0.9" />
                        <circle cx="50" cy="240" r="16" fill="#81C784" opacity="0.9" />
                        <line x1="170" y1="40" x2="300" y2="250" stroke="var(--pz-amber)" strokeWidth="1.5" opacity="0.5" />
                        <line x1="170" y1="40" x2="50" y2="240" stroke="var(--pz-amber)" strokeWidth="1.5" opacity="0.5" />
                        <line x1="300" y1="250" x2="50" y2="240" stroke="var(--pz-amber)" strokeWidth="1.5" opacity="0.5" />
                        <circle cx="170" cy="170" r="22" fill="var(--pz-amber)" opacity="0.15" />
                        <circle cx="170" cy="170" r="10" fill="var(--pz-amber)" opacity="0.8" />
                    </svg>
                </motion.div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full py-16 sm:py-20">
                <div className="max-w-2xl lg:max-w-3xl">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 mb-6 px-3.5 py-2 rounded-full border"
                        style={{
                            background: isDark ? "rgba(255,180,0,0.08)" : "rgba(255,180,0,0.1)",
                            borderColor: "rgba(255,180,0,0.3)",
                        }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--pz-amber)" }} />
                            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--pz-amber)" }} />
                        </span>
                        <span
                            className="text-[11px] font-bold tracking-[0.18em] uppercase"
                            style={{ color: "var(--pz-amber)", fontFamily: "'Syne', sans-serif" }}
                        >
                            Georgetown & Austin, TX · Remote Worldwide
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.1 }}
                        className="font-display font-extrabold leading-[1.0] mb-5"
                        style={{
                            fontSize: "clamp(2.6rem, 9vw, 5.5rem)",
                            color: "var(--text-primary)",
                        }}
                    >
                        Expert Home &{" "}
                        <span
                            className="relative inline-block"
                            style={{
                                background: "linear-gradient(135deg, var(--pz-amber), #FF6B35)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Business
                        </span>
                        <br />Networking
                    </motion.h1>

                    {/* Sub */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-[15px] sm:text-[17px] leading-relaxed mb-8 max-w-xl"
                        style={{ color: "var(--text-secondary)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}
                    >
                        Reliable Wi-Fi, stable networks, and professional troubleshooting for homes and small businesses — fast, friendly, and hassle-free.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="flex flex-col sm:flex-row gap-3 mb-12"
                    >
                        {/* ── Home Network CTA → scrolls to contact + opens home tab ── */}
                        <button
                            type="button"
                            onClick={() => goToContactTab("home")}
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-[13px] font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{
                                background: "var(--pz-amber)",
                                color: "#000",
                                fontFamily: "'Syne', sans-serif",
                                boxShadow: "0 8px 32px rgba(255,180,0,0.35)",
                                cursor: "pointer",
                            }}
                        >
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Book Your Home Network Service Now
                        </button>

                        <button
                            type="button"
                            // onClick={() => setCalendlyUrl(process.env.NEXT_PUBLIC_CALENDLY_ENTERPRISE_URL!)}
                            onClick={() => goToContactTab("enterprise")}
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-[13px] font-bold tracking-wider uppercase border-2 transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{
                                borderColor: isDark ? "rgba(255,255,255,0.2)" : "var(--pz-navy)",
                                color: isDark ? "var(--text-primary)" : "var(--pz-navy)",
                                fontFamily: "'Syne', sans-serif",
                                background: isDark ? "rgba(255,255,255,0.04)" : "transparent",
                                cursor: "pointer",
                            }}
                        >
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Schedule Your Enterprise Consultation
                        </button>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-6 sm:gap-10"
                    >
                        {[
                            { n: "200+", label: "Networks Installed" },
                            { n: "5★", label: "Average Rating" },
                            { n: "24h", label: "Remote Support" },
                        ].map(({ n, label }) => (
                            <div key={label}>
                                <p
                                    className="font-display font-extrabold text-[28px] sm:text-[34px] leading-none"
                                    style={{ color: "var(--pz-amber)" }}
                                >
                                    {n}
                                </p>
                                <p
                                    className="text-[11px] font-semibold tracking-wide uppercase mt-1"
                                    style={{ color: "var(--text-muted)", fontFamily: "'Syne', sans-serif" }}
                                >
                                    {label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {calendlyUrl && (
                <PopupModal
                    url={calendlyUrl}
                    open={true}
                    onModalClose={() => setCalendlyUrl(null)}
                    rootElement={document.body}
                />
            )}

            {/* Scroll cue */}
            <motion.a
                href="#services"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-colors"
                style={{ color: "var(--text-muted)" }}
            >
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Scroll
                </span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </motion.a>
        </section>
    );
}