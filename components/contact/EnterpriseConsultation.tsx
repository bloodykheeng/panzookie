"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { InlineWidget } from "react-calendly";

export default function EnterpriseConsultation() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const surfaceBg = isDark ? "rgba(255,255,255,0.04)" : "#ffffff";
    const surfaceBorder = isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0";
    const textPrimary = isDark ? "#f8fafc" : "#0f172a";
    const textSecondary = isDark ? "rgba(255,255,255,0.55)" : "#64748b";

    return (
        <div
            className="rounded-3xl overflow-hidden"
            style={{
                background: surfaceBg,
                border: `1px solid ${surfaceBorder}`,
                boxShadow: isDark
                    ? "0 20px 60px rgba(0,0,0,0.4)"
                    : "0 20px 60px rgba(0,0,0,0.07)",
            }}
        >
            {/* Header */}
            <div
                className="px-7 pt-7 pb-5 flex items-center gap-3"
                style={{ borderBottom: `1px solid ${surfaceBorder}` }}
            >
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,180,0,0.15)" }}
                >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--pz-amber)" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-display font-bold text-[18px]" style={{ color: textPrimary }}>
                        Enterprise Consultation
                    </h3>
                    <p className="text-[12px]" style={{ color: textSecondary }}>
                        Book a 30-min strategy call with our network engineers
                    </p>
                </div>
            </div>

            {/* Calendly inline widget */}
            <div className="w-full h-[1000px]"> {/* increased from 700 */}
                <InlineWidget
                    url="https://calendly.com/therealnetworkengineer/30min"
                    styles={{ height: "100%", width: "100%" }}
                    pageSettings={{
                        backgroundColor: isDark ? "0d1117" : "ffffff",
                        hideEventTypeDetails: false,
                        hideLandingPageDetails: false,
                        primaryColor: "ffb400",
                        textColor: isDark ? "f8fafc" : "0f172a",
                    }}
                />
            </div>
        </div>
    );
}