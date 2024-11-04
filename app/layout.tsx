import { Metadata, type Viewport } from "next";
import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
// import Wave from "./[lang]/components/Wave";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer, { FooterProps } from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { LanguageProvider } from "@/components/LanguageContext";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  icons: siteConfig.icons,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const headersList = await headers();
  const lang = headersList.get("x-lang") || "en";

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen antialiased flex flex-col",
          "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <SiteHeader />
              <main className="flex-grow flex items-center justify-center">
                {children}
              </main>
              <ServiceWorkerRegistration />
              <ToastContainer />
              <Toaster />
              <Footer lang={lang} />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
