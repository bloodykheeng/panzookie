"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";

const contactSchema = z.object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().optional(),
    subject: z.string().min(3, "Subject is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function fieldClass(hasError: boolean, isDark: boolean) {
    return [
        "w-full px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 outline-none border-2",
        hasError
            ? "border-red-500 bg-red-500/5"
            : isDark
                ? "border-white/10 bg-white/5 focus:border-[var(--pz-amber)] hover:border-white/20"
                : "border-slate-200 bg-white focus:border-[var(--pz-amber)] hover:border-slate-300",
        isDark ? "text-white placeholder:text-white/30" : "text-slate-800 placeholder:text-slate-400",
    ].join(" ");
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

const SUBJECTS = [
    "General Enquiry",
    "Get a Quote",
    "Partnership / Reseller",
    "Billing Question",
    "Other",
];

export default function ContactForm() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
    const formRef = useRef<HTMLFormElement>(null);

    const surfaceBg = isDark ? "rgba(255,255,255,0.04)" : "#ffffff";
    const surfaceBorder = isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0";
    const textPrimary = isDark ? "#f8fafc" : "#0f172a";
    const textSecondary = isDark ? "rgba(255,255,255,0.55)" : "#64748b";

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    async function onSubmit(data: ContactFormValues) {
        setSubmitState("sending");
        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
                {
                    from_name: data.name,
                    from_email: data.email,
                    phone: data.phone || "Not provided",
                    subject: data.subject,
                    message: data.message,
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

    return (
        <div
            className="rounded-3xl p-7 sm:p-9"
            style={{
                background: surfaceBg,
                border: `1px solid ${surfaceBorder}`,
                boxShadow: isDark ? "0 20px 60px rgba(0,0,0,0.4)" : "0 20px 60px rgba(0,0,0,0.07)",
            }}
        >
            {/* Card header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,180,0,0.15)" }}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--pz-amber)" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-display font-bold text-[18px]" style={{ color: textPrimary }}>Send Us a Message</h3>
                    <p className="text-[12px]" style={{ color: textSecondary }}>We'll get back to you within the hour</p>
                </div>
            </div>

            {submitState === "success" ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(34,197,94,0.15)" }}>
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h4 className="font-display font-bold text-[22px]" style={{ color: textPrimary }}>Message Sent!</h4>
                    <p className="text-[14px] max-w-xs" style={{ color: textSecondary }}>
                        We've received your message and will be in touch shortly.
                    </p>
                    <button
                        type="button"
                        onClick={() => setSubmitState("idle")}
                        className="mt-2 text-[13px] font-bold underline underline-offset-4"
                        style={{ color: "var(--pz-amber)" }}
                    >
                        Send another message
                    </button>
                </motion.div>
            ) : (
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

                    {/* Name + Email */}
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
                    </div>

                    {/* Phone + Subject */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <input
                                {...register("phone")}
                                type="tel"
                                placeholder="Phone (Optional)"
                                className={fieldClass(false, isDark)}
                                style={{ color: textPrimary }}
                            />
                        </div>
                        <div>
                            <select
                                {...register("subject")}
                                className={fieldClass(!!errors.subject, isDark)}
                                style={{ color: watch("subject") ? textPrimary : (isDark ? "rgba(255,255,255,0.3)" : "#94a3b8") }}
                            >
                                <option value="" disabled hidden>Subject *</option>
                                {SUBJECTS.map((s) => (
                                    <option key={s} value={s} style={{ color: "#0f172a" }}>{s}</option>
                                ))}
                            </select>
                            <FieldError msg={errors.subject?.message} />
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <textarea
                            {...register("message")}
                            placeholder="Your message *"
                            rows={5}
                            className={fieldClass(!!errors.message, isDark) + " resize-none"}
                            style={{ color: textPrimary }}
                        />
                        <FieldError msg={errors.message?.message} />
                    </div>

                    {submitState === "error" && (
                        <div
                            className="px-4 py-3 rounded-xl text-[13px] font-medium"
                            style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.25)" }}
                        >
                            Something went wrong. Please try again or email us at{" "}
                            <a href="mailto:therealnetworkengineer@gmail.com" style={{ color: "#ef4444", fontWeight: 700 }}>therealnetworkengineer@gmail.com</a>
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
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </>
                        )}
                    </motion.button>

                    <p className="text-center text-[11px]" style={{ color: textSecondary }}>
                        Messages go to{" "}
                        <span style={{ color: "var(--pz-amber)", fontWeight: 600 }}>therealnetworkengineer@gmail.com</span>
                        {" "}— we reply within the hour.
                    </p>
                </form>
            )}
        </div>
    );
}