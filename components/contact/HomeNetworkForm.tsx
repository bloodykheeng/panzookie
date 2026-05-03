"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";

// ─── Zod schema ─────────────────────────────────────────────────────────────
const homeSchema = z.object({
    name: z.string().min(2, "Full name is required"),
    email: z.email("Enter a valid email address"),
    phone: z.string().optional(),
    homeSize: z.string().min(1, "Please select your home size"),
    floors: z.string().min(1, "Please select number of floors"),
    issues: z.array(z.string()).min(1, "Select at least one issue"),
    issueDescription: z.string().optional(),
    ethernetCables: z.enum(["yes", "no", "notsure"], {
        error: "Please select an option",
    }),
    maintenance: z.enum(["yes", "maybe", "no"], {
        error: "Please select an option",
    }),
    visitBefore: z.boolean().optional(),
    visitDescription: z.string().optional(),
});

type HomeFormValues = z.infer<typeof homeSchema>;

const ISSUE_OPTIONS = [
    { id: "slow_wifi", label: "Slow Wi-Fi" },
    { id: "dead_zones", label: "Dead Zones" },
    { id: "smart_home", label: "Smart Home Issues" },
    { id: "wfh", label: "Work-from-Home Problems" },
    { id: "new_setup", label: "New Setup" },
];

const HOME_SIZES = [
    "Studio / Bedsitter",
    "1–2 Bedrooms",
    "3–4 Bedrooms",
    "5+ Bedrooms",
    "Apartment Complex",
];

const FLOORS_OPTIONS = ["1 Floor", "2 Floors", "3 Floors", "4+ Floors"];

// ─── Shared field styles ─────────────────────────────────────────────────────
function fieldClass(hasError: boolean, isDark: boolean) {
    return [
        "w-full px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 outline-none",
        "border-2",
        hasError
            ? "border-red-500 bg-red-500/5"
            : isDark
                ? "border-white/10 bg-white/5 focus:border-[var(--pz-amber)] hover:border-white/20"
                : "border-slate-200 bg-white focus:border-[var(--pz-amber)] hover:border-slate-300",
        isDark ? "text-white placeholder:text-white/30" : "text-slate-800 placeholder:text-slate-400",
    ]
        .filter(Boolean)
        .join(" ");
}

function FieldError({ msg }: { msg?: string }) {
    if (!msg) return null;
    return (
        <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-[12px] text-red-500 font-medium flex items-center gap-1"
        >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {msg}
        </motion.p>
    );
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function HomeNetworkForm() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
    const formRef = useRef<HTMLFormElement>(null);

    const surfaceBorder = isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0";
    const textPrimary = isDark ? "#f8fafc" : "#0f172a";
    const textSecondary = isDark ? "rgba(255,255,255,0.55)" : "#64748b";

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset,
    } = useForm<HomeFormValues>({
        resolver: zodResolver(homeSchema),
        defaultValues: { issues: [], visitBefore: false },
    });

    const watchedIssues = watch("issues");
    const watchedVisitBefore = watch("visitBefore");
    const watchedEthernet = watch("ethernetCables");
    const watchedMaintenance = watch("maintenance");

    function toggleIssue(id: string) {
        const current = watchedIssues ?? [];
        if (current.includes(id)) {
            setValue("issues", current.filter((i) => i !== id), { shouldValidate: true });
        } else {
            setValue("issues", [...current, id], { shouldValidate: true });
        }
    }

    async function onSubmit(data: HomeFormValues) {
        setSubmitState("sending");
        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_HOME_TEMPLATE_ID!,
                {
                    from_name: data.name,
                    from_email: data.email,
                    phone: data.phone || "Not provided",
                    home_size: data.homeSize,
                    floors: data.floors,
                    issues: data.issues.join(", "),
                    issue_description: data.issueDescription || "—",
                    ethernet_cables: data.ethernetCables,
                    maintenance: data.maintenance,
                    visit_before: data.visitBefore ? "Yes" : "No",
                    visit_description: data.visitDescription || "—",
                    to_email: "therealnetworkengineer@gmail.com",
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
            setSubmitState("success");
            reset();
        } catch {
            setSubmitState("error");
        }
    }

    const surfaceBg = isDark ? "rgba(255,255,255,0.04)" : "#ffffff";

    return (
        <div
            className="rounded-3xl p-7 sm:p-9"
            style={{
                background: surfaceBg,
                border: `1px solid ${surfaceBorder}`,
                boxShadow: isDark
                    ? "0 20px 60px rgba(0,0,0,0.4)"
                    : "0 20px 60px rgba(0,0,0,0.07)",
            }}
        >
            {/* Card header */}
            <div className="flex items-center gap-3 mb-8">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,180,0,0.15)" }}
                >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--pz-amber)" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-display font-bold text-[18px]" style={{ color: textPrimary }}>
                        Home Network Service
                    </h3>
                    <p className="text-[12px]" style={{ color: textSecondary }}>
                        For Homes &amp; Residences
                    </p>
                </div>
            </div>

            {submitState === "success" ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(34,197,94,0.15)" }}
                    >
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h4 className="font-display font-bold text-[22px]" style={{ color: textPrimary }}>
                        Request Sent!
                    </h4>
                    <p className="text-[14px] max-w-xs" style={{ color: textSecondary }}>
                        We've received your request and will get back to you within the hour.
                    </p>
                    <button
                        type="button"
                        onClick={() => setSubmitState("idle")}
                        className="mt-2 text-[13px] font-bold underline underline-offset-4"
                        style={{ color: "var(--pz-amber)" }}
                    >
                        Submit another request
                    </button>
                </motion.div>
            ) : (
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">

                    {/* 1. Your Information */}
                    <fieldset>
                        <legend
                            className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2"
                            style={{ color: "var(--pz-amber)", fontFamily: "'Syne', sans-serif" }}
                        >
                            <span
                                className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black"
                                style={{ background: "var(--pz-amber)", color: "#000" }}
                            >1</span>
                            Your Information
                        </legend>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <input
                                    {...register("name")}
                                    placeholder="Full Name *"
                                    className={fieldClass(!!errors.name, isDark)}
                                    style={{ color: textPrimary }}
                                />
                                <FieldError msg={errors.name?.message} />
                            </div>
                            <div>
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="Email Address *"
                                    className={fieldClass(!!errors.email, isDark)}
                                    style={{ color: textPrimary }}
                                />
                                <FieldError msg={errors.email?.message} />
                            </div>
                            <div className="sm:col-span-2">
                                <input
                                    {...register("phone")}
                                    type="tel"
                                    placeholder="Phone (Optional)"
                                    className={fieldClass(false, isDark)}
                                    style={{ color: textPrimary }}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <div className="h-px" style={{ background: surfaceBorder }} />

                    {/* 2. About Your Home */}
                    <fieldset>
                        <legend
                            className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2"
                            style={{ color: "var(--pz-amber)", fontFamily: "'Syne', sans-serif" }}
                        >
                            <span
                                className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black"
                                style={{ background: "var(--pz-amber)", color: "#000" }}
                            >2</span>
                            Tell Us About Your Home
                        </legend>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <select
                                    {...register("homeSize")}
                                    className={fieldClass(!!errors.homeSize, isDark)}
                                    style={{ color: watch("homeSize") ? textPrimary : (isDark ? "rgba(255,255,255,0.3)" : "#94a3b8") }}
                                >
                                    <option value="" disabled hidden>Home Size *</option>
                                    {HOME_SIZES.map((s) => (
                                        <option key={s} value={s} style={{ color: "#0f172a" }}>{s}</option>
                                    ))}
                                </select>
                                <FieldError msg={errors.homeSize?.message} />
                            </div>
                            <div>
                                <select
                                    {...register("floors")}
                                    className={fieldClass(!!errors.floors, isDark)}
                                    style={{ color: watch("floors") ? textPrimary : (isDark ? "rgba(255,255,255,0.3)" : "#94a3b8") }}
                                >
                                    <option value="" disabled hidden>Number of Floors *</option>
                                    {FLOORS_OPTIONS.map((f) => (
                                        <option key={f} value={f} style={{ color: "#0f172a" }}>{f}</option>
                                    ))}
                                </select>
                                <FieldError msg={errors.floors?.message} />
                            </div>
                        </div>
                    </fieldset>

                    <div className="h-px" style={{ background: surfaceBorder }} />

                    {/* 3. Issues */}
                    <fieldset>
                        <legend
                            className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2"
                            style={{ color: "var(--pz-amber)", fontFamily: "'Syne', sans-serif" }}
                        >
                            <span
                                className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black"
                                style={{ background: "var(--pz-amber)", color: "#000" }}
                            >3</span>
                            What's the Issue? *
                        </legend>
                        <div className="flex flex-wrap gap-2.5 mb-3">
                            {ISSUE_OPTIONS.map((opt) => {
                                const active = (watchedIssues ?? []).includes(opt.id);
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => toggleIssue(opt.id)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200"
                                        style={{
                                            background: active ? "var(--pz-amber)" : isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                                            color: active ? "#000" : textSecondary,
                                            border: `2px solid ${active ? "var(--pz-amber)" : errors.issues ? "#ef4444" : "transparent"}`,
                                            transform: active ? "scale(1.02)" : "scale(1)",
                                        }}
                                    >
                                        {active && (
                                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                        <FieldError msg={errors.issues?.message} />
                        <textarea
                            {...register("issueDescription")}
                            placeholder="Describe the issue in detail (optional)..."
                            rows={3}
                            className={fieldClass(false, isDark) + " resize-none mt-3"}
                            style={{ color: textPrimary }}
                        />
                    </fieldset>

                    <div className="h-px" style={{ background: surfaceBorder }} />

                    {/* 4. Ethernet */}
                    <fieldset>
                        <legend
                            className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2"
                            style={{ color: "var(--pz-amber)", fontFamily: "'Syne', sans-serif" }}
                        >
                            <span
                                className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black"
                                style={{ background: "var(--pz-amber)", color: "#000" }}
                            >4</span>
                            Can We Run Ethernet Cables? *
                        </legend>
                        <div className="flex gap-3 flex-wrap">
                            {[
                                { value: "yes", label: "Yes" },
                                { value: "no", label: "No" },
                                { value: "notsure", label: "Not Sure" },
                            ].map((opt) => {
                                const active = watchedEthernet === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setValue("ethernetCables", opt.value as "yes" | "no" | "notsure", { shouldValidate: true })}
                                        className="px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200"
                                        style={{
                                            background: active ? "var(--pz-amber)" : isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                                            color: active ? "#000" : textSecondary,
                                            border: `2px solid ${active ? "var(--pz-amber)" : errors.ethernetCables ? "#ef4444" : "transparent"}`,
                                        }}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                        <FieldError msg={errors.ethernetCables?.message} />
                    </fieldset>

                    <div className="h-px" style={{ background: surfaceBorder }} />

                    {/* 5. Maintenance */}
                    <fieldset>
                        <legend
                            className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2"
                            style={{ color: "var(--pz-amber)", fontFamily: "'Syne', sans-serif" }}
                        >
                            <span
                                className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black"
                                style={{ background: "var(--pz-amber)", color: "#000" }}
                            >5</span>
                            Interested in Ongoing Maintenance? *
                        </legend>
                        <div className="flex gap-3 flex-wrap">
                            {[
                                { value: "yes", label: "Yes 👋" },
                                { value: "maybe", label: "Maybe" },
                                { value: "no", label: "No" },
                            ].map((opt) => {
                                const active = watchedMaintenance === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setValue("maintenance", opt.value as "yes" | "maybe" | "no", { shouldValidate: true })}
                                        className="px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200"
                                        style={{
                                            background: active ? "var(--pz-amber)" : isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                                            color: active ? "#000" : textSecondary,
                                            border: `2px solid ${active ? "var(--pz-amber)" : errors.maintenance ? "#ef4444" : "transparent"}`,
                                        }}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                        <FieldError msg={errors.maintenance?.message} />
                    </fieldset>

                    <div className="h-px" style={{ background: surfaceBorder }} />

                    {/* 6. Visit before */}
                    <fieldset>
                        <legend
                            className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2"
                            style={{ color: "var(--pz-amber)", fontFamily: "'Syne', sans-serif" }}
                        >
                            <span
                                className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black"
                                style={{ background: "var(--pz-amber)", color: "#000" }}
                            >6</span>
                            Would You Like Us to Assess First?
                        </legend>
                        <div className="flex items-center gap-3 mb-3">
                            <button
                                type="button"
                                role="checkbox"
                                aria-checked={watchedVisitBefore}
                                onClick={() => setValue("visitBefore", !watchedVisitBefore)}
                                className="w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 flex-shrink-0"
                                style={{
                                    background: watchedVisitBefore ? "var(--pz-amber)" : "transparent",
                                    border: `2px solid ${watchedVisitBefore ? "var(--pz-amber)" : isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1"}`,
                                }}
                            >
                                {watchedVisitBefore && (
                                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#000" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                            <span className="text-[14px] font-medium" style={{ color: textPrimary }}>
                                Yes 👋 — please assess before starting work
                            </span>
                        </div>
                        <AnimatePresence>
                            {watchedVisitBefore && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <textarea
                                        {...register("visitDescription")}
                                        placeholder="Anything we should know before the visit..."
                                        rows={2}
                                        className={fieldClass(false, isDark) + " resize-none"}
                                        style={{ color: textPrimary }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </fieldset>

                    {/* Submit error */}
                    {submitState === "error" && (
                        <div className="px-4 py-3 rounded-xl text-[13px] font-medium flex flex-col items-center gap-2"
                            style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.25)" }}>
                            <p>Something went wrong. Please try again or email us directly.</p>
                            <a
                                href={`mailto:therealnetworkengineer@gmail.com?subject=Home Network Request&body=${encodeURIComponent(
                                    `Name: ${watch("name") || ""}\nEmail: ${watch("email") || ""}\nPhone: ${watch("phone") || ""}\nHome Size: ${watch("homeSize") || ""}\nFloors: ${watch("floors") || ""}\nIssues: ${watchedIssues.join(", ")}\nIssue Description: ${watch("issueDescription") || "—"}\nEthernet: ${watchedEthernet || ""}\nMaintenance: ${watchedMaintenance || ""}\nVisit Before: ${watchedVisitBefore ? "Yes" : "No"}\nVisit Description: ${watch("visitDescription") || "—"}`
                                )}`}
                                className="mt-2 px-4 py-2 rounded-xl font-semibold text-black bg-amber-400 hover:bg-amber-500 transition-colors"
                            >
                                Email Us Directly
                            </a>
                        </div>
                    )}

                    <motion.button
                        type="submit"
                        disabled={submitState === "sending"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer"
                        style={{
                            background: submitState === "sending" ? "rgba(255,180,0,0.5)" : "var(--pz-amber)",
                            color: "#000",
                            boxShadow: "0 8px 32px rgba(255,180,0,0.35)",
                            fontFamily: "'Syne', sans-serif",
                            letterSpacing: "0.04em",
                        }}
                    >
                        {submitState === "sending" ? (
                            <>
                                <svg className="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Sending Request...
                            </>
                        ) : (
                            <>
                                Get My Network Fixed
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </>
                        )}
                    </motion.button>

                    <p className="text-center text-[11px]" style={{ color: textSecondary }}>
                        Your request is sent directly to{" "}
                        <span style={{ color: "var(--pz-amber)", fontWeight: 600 }}>therealnetworkengineer@gmail.com</span>
                        {" "}— we reply within the hour.
                    </p>
                </form>
            )}
        </div>
    );
}