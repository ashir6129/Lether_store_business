import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vergeleather.com"),
  title: "VERGE — Premium Leather Outerwear & Handcrafted Products",
  description:
    "Full-grain leather moto jackets, apparel, and artisan accessories, handcrafted for the long haul. Built to last a lifetime.",
  keywords: "leather jacket, moto jacket, café racer, full-grain leather, apparel, handcrafted leather",
  openGraph: {
    title: "VERGE Studio",
    description: "Premium handcrafted leather outerwear and apparel.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body style={{ background: "var(--bg)", color: "var(--heading)" }}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main style={{ minHeight: "80vh" }}>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
