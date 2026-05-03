"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { PopupModal } from "react-calendly";

export default function MobileCTA() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [visible, setVisible] = useState(false);
    const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

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
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="mobile-cta"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-4 pb-safe-bottom"
                    style={{
                        paddingBottom: "max(env(safe-area-inset-bottom, 0px), 16px)",
                    }}
                >
                    <div
                        className="flex gap-2.5 p-3 rounded-2xl shadow-2xl"
                        style={{
                            background: isDark ? "rgba(15,22,41,0.97)" : "rgba(255,255,255,0.97)",
                            border: "1px solid var(--border-color)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 -4px 30px rgba(0,0,0,0.15)",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => goToContactTab("home")}
                            className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all active:scale-95"
                            style={{
                                background: "var(--pz-amber)",
                                color: "#000",
                                fontFamily: "'Syne', sans-serif",
                                cursor: "pointer",
                            }}
                        >
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home Service
                        </button>
                        <button
                            type="button"
                            // onClick={() => setCalendlyUrl(process.env.NEXT_PUBLIC_CALENDLY_ENTERPRISE_URL!)}
                            onClick={() => goToContactTab("enterprise")}
                            className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl text-[11px] font-bold tracking-wider uppercase border-2 transition-all active:scale-95"
                            style={{
                                borderColor: isDark ? "rgba(255,255,255,0.15)" : "var(--pz-navy)",
                                color: isDark ? "var(--text-primary)" : "var(--pz-navy)",
                                fontFamily: "'Syne', sans-serif",
                                cursor: "pointer",
                            }}
                        >
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Enterprise
                        </button>
                    </div>
                </motion.div>
            )}
            {calendlyUrl && (
                <PopupModal
                    key="calendly-modal"
                    url={calendlyUrl}
                    open={true}
                    onModalClose={() => setCalendlyUrl(null)}
                    rootElement={document.body}
                // pageSettings={{
                //     backgroundColor: "0f1629", // dark navy background
                //     primaryColor: "F5C518",    // your gold accent
                //     textColor: "ffffff",
                //     hideEventTypeDetails: false,
                //     hideLandingPageDetails: false,
                // }}
                />
            )}
        </AnimatePresence>
    );
}