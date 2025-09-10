import "./globals.css";
import { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CustomScrollbar from "@/components/CustomScrollbar";
import { AnimationProvider } from "@/components/AnimationContext";
import SoulsBackgroundWrapper from "@/components/SoulsBackgroundWrapper";

export const metadata = {
  title: {
    template: "%s - Souls D20",
    default: "Souls D20"
  },
  description: "A complete tabletop roleplaying system inspired by Elden Ring and Soulsborne games. Build unique characters, master strategic combat, and explore a living world six years in the making.",
  keywords: ["tabletop RPG", "TTRPG", "Souls D20", "Dark Souls", "Elden Ring", "roleplaying", "D20 system", "fantasy RPG"],
  authors: [{ name: "Souls D20 Team" }],
  creator: "Souls D20 Team",
  publisher: "Souls D20",
  icons: {
    icon: '/favicon-32x32.png'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://soulsd20.com',
    title: 'Souls D20 - Complete Tabletop RPG System',
    description: 'A complete tabletop roleplaying system inspired by Elden Ring and Soulsborne games. Build unique characters, master strategic combat, and explore a living world six years in the making.',
    siteName: 'Souls D20',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Souls D20 - Tabletop Roleplaying System',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Souls D20 - Complete Tabletop RPG System',
    description: 'A complete tabletop roleplaying system inspired by Elden Ring and Soulsborne games.',
    images: ['/og-image.png'],
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AnimationProvider>
          <SoulsBackgroundWrapper />
          <div className="relative z-10">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <CustomScrollbar />
        </AnimationProvider>
      </body>
    </html>
  );
}
