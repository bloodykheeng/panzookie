"use client";

import { useTheme } from "@/providers/ThemeProvider";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Footer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <footer
            className="py-10 border-t"
            style={{
                background: isDark ? "var(--bg-surface)" : "var(--pz-navy)",
                borderColor: isDark ? "var(--border-color)" : "rgba(255,255,255,0.08)",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                                src="/logos/panzookie-icon.png"
                                alt="Panzookie Networks"
                                width={36}
                                height={36}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-display font-extrabold text-[15px] text-white">
                                Panzookie <span style={{ color: "var(--pz-amber)" }}>Networks</span>
                            </p>
                            <p className="text-[11px] text-white/40">
                                Expert Home & Business Networking
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {["#services", "#support", "#enterprise", "#why", "#contact"].map((href) => (
                            <a
                                key={href}
                                href={href}
                                className="text-[12px] font-semibold tracking-wide uppercase transition-colors hover:opacity-100 opacity-50 text-white"
                                style={{ fontFamily: "'Syne', sans-serif" }}
                            >
                                {href.replace("#", "")}
                            </a>
                        ))}
                    </nav>

                    {/* Copyright */}
                    <p className="text-[11px] text-white/35 text-center sm:text-right">
                        © {new Date().getFullYear()} Panzookie Networks.<br />All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}