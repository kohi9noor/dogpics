import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Bottombar from "@/components/bottom-bar";
import { ThemeProvider } from "@/provider/theme-provider";
import { AppProvider } from "@/provider/app-provider";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "dogpics.lol – Relax with Random Dog Pictures",
  description:
    "Take a break and refresh your mind with a curated collection of adorable dog photos. Enjoy endless doggos, perfect for stress relief and a quick smile.",
  keywords: [
    "dogs",
    "dog pictures",
    "cute dogs",
    "doggos",
    "relaxation",
    "stress relief",
    "fun",
    "dogpics.lol",
  ],
  authors: [{ name: "dogpics.lol Team" }],
  openGraph: {
    title: "dogpics.lol – Relax with Random Dog Pictures",
    description:
      "Take a break and refresh your mind with a curated collection of adorable dog photos.",
    url: "https://dogpics.lol",
    siteName: "dogpics.lol",
    images: [
      {
        url: "https://dogpics.lol/og-image.png",
        width: 1200,
        height: 630,
        alt: "dogpics.lol – Cute Dogo Pictures",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dogpics.lol – Relax with Random Dog Pictures",
    description:
      "Take a break and refresh your mind with a curated collection of adorable dog photos.",
    images: ["https://dogpics.lol/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${jetBrainsMono.className} antialiased`}
      >
        <ThemeProvider
          defaultTheme="dark"
          attribute="class"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppProvider>
            <main className="w-full relative min-h-svh bg-background overflow-x-hidden text-foreground flex flex-col">
              {children}
              <Bottombar />
            </main>
          </AppProvider>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
