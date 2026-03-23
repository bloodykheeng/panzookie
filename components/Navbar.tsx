"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import Image from "next/image";

const NAV_LINKS = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Support", href: "#support" },
    { label: "Enterprise", href: "#enterprise" },
    { label: "Why Us", href: "#why" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("Home");


    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
        const observers: IntersectionObserver[] = [];
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting)
                        setActive(NAV_LINKS.find((l) => l.href === `#${id}`)?.label ?? "");
                },
                { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: scrolled
                        ? isDark
                            ? "rgba(8,12,24,0.92)"
                            : "rgba(255,255,255,0.92)"
                        : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled
                        ? `1px solid var(--border-color)`
                        : "1px solid transparent",
                    boxShadow: scrolled ? "var(--card-shadow)" : "none",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-[68px] flex items-center justify-between">
                    {/* Logo */}
                    <a href="#hero" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/logos/panzookie-icon.png"
                                alt="Panzookie Networks"
                                width={36}
                                height={36}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span
                                className="font-display font-extrabold text-[15px] tracking-tight"
                                style={{ color: "var(--text-primary)" }}
                            >
                                Panzookie
                            </span>
                            <span
                                className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                                style={{ color: "var(--pz-amber)" }}
                            >
                                Networks
                            </span>
                        </div>
                    </a>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-0.5">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setActive(link.label)}
                                className="relative px-3.5 py-2 text-[12px] font-semibold tracking-wide uppercase transition-colors duration-200"
                                style={{
                                    color:
                                        active === link.label
                                            ? "var(--pz-amber)"
                                            : "var(--text-secondary)",
                                    fontFamily: "'Syne', sans-serif",
                                    letterSpacing: "0.08em",
                                }}
                            >
                                {link.label}
                                {active === link.label && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                        style={{ background: "var(--pz-amber)" }}
                                    />
                                )}
                            </a>
                        ))}
                    </nav>

                    {/* Right controls */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        <button
                            onClick={() => setTheme(isDark ? "light" : "dark")}
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                            style={{
                                background: "var(--bg-subtle)",
                                color: "var(--text-secondary)",
                            }}
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                                </svg>
                            )}
                        </button>

                        {/* CTA */}
                        <a
                            href="#contact"
                            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-bold tracking-widest uppercase rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{
                                background: "var(--pz-amber)",
                                color: "#000",
                                fontFamily: "'Syne', sans-serif",
                            }}
                        >
                            Book Now
                        </a>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden w-9 h-9 flex items-center justify-center"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {menuOpen ? (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            ) : (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                                    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-40 pt-[68px] flex flex-col"
                        style={{ background: "var(--bg-base)" }}
                    >
                        <nav className="flex flex-col px-6 pt-8 gap-1">
                            {NAV_LINKS.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    onClick={() => { setActive(link.label); setMenuOpen(false); }}
                                    className="py-4 text-[26px] font-extrabold border-b flex items-center justify-between"
                                    style={{
                                        fontFamily: "'Syne', sans-serif",
                                        color: active === link.label ? "var(--pz-amber)" : "var(--text-primary)",
                                        borderColor: "var(--border-color)",
                                    }}
                                >
                                    {link.label}
                                    {active === link.label && (
                                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--pz-amber)" }} />
                                    )}
                                </motion.a>
                            ))}
                        </nav>
                        <div className="px-6 pt-8 flex flex-col gap-3">
                            <a
                                href="#contact"
                                onClick={() => setMenuOpen(false)}
                                className="w-full flex items-center justify-center py-4 text-[13px] font-bold tracking-widest uppercase rounded-xl"
                                style={{ background: "var(--pz-amber)", color: "#000", fontFamily: "'Syne', sans-serif" }}
                            >
                                Book a Service
                            </a>
                            <a
                                href="#enterprise"
                                onClick={() => setMenuOpen(false)}
                                className="w-full flex items-center justify-center py-4 text-[13px] font-bold tracking-widest uppercase rounded-xl border"
                                style={{
                                    borderColor: "var(--pz-navy)",
                                    color: isDark ? "var(--text-primary)" : "var(--pz-navy)",
                                    fontFamily: "'Syne', sans-serif",
                                }}
                            >
                                Enterprise Consultation
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}