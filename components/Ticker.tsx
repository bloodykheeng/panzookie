"use client";

import { useTheme } from "@/providers/ThemeProvider";

const ITEMS = [
    "Wi-Fi Optimization",
    "Network Security",
    "Mesh Setup",
    "VPN Configuration",
    "Firewall Management",
    "BGP Troubleshooting",
    "SD-WAN Solutions",
    "Remote Support",
    "Smart Home Networks",
    "VLAN Setup",
];

export default function Ticker() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className="relative overflow-hidden py-3 border-y"
            style={{
                background: isDark ? "var(--pz-navy)" : "var(--pz-navy)",
                borderColor: "rgba(255,255,255,0.06)",
            }}
        >
            <div className="flex animate-ticker whitespace-nowrap">
                {[...ITEMS, ...ITEMS].map((item, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center gap-3 px-6 text-[11px] font-bold tracking-[0.2em] uppercase flex-shrink-0"
                        style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Syne', sans-serif" }}
                    >
                        <span style={{ color: "var(--pz-amber)" }}>◆</span>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}