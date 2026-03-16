import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { cookies } from "next/headers";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Panzookie Networks – Expert Home & Business Networking",
  description:
    "Reliable Wi-Fi, stable networks, and professional troubleshooting for homes and small businesses. Serving Georgetown TX, Round Rock TX, Austin TX, and remote clients worldwide.",
  keywords: [
    "Home Network Setup",
    "Wi-Fi Optimization",
    "Network Engineer",
    "Georgetown TX",
    "Austin TX",
    "SD-WAN",
    "BGP Troubleshooting",
    "Panzookie Networks",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultTheme = cookieStore.get("theme");

  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">
        <ThemeProvider defaultTheme={defaultTheme?.value}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}