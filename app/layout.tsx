import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/shared/providers/app-providers";

export const metadata: Metadata = {
  title: {
    default: "BuddyScript — Social Feed",
    template: "%s | BuddyScript",
  },
  description:
    "A social feed application to connect, share, and engage with your community.",
  keywords: [
    "social feed",
    "buddyscript",
    "social network",
    "posts",
    "community",
  ],
  authors: [{ name: "Asiful Islam" }],
  icons: {
    icon: "/images/logo-copy.svg",
  },
  openGraph: {
    title: "BuddyScript — Social Feed",
    description: "Connect, share, and engage with your community.",
    type: "website",
    locale: "en_US",
    siteName: "BuddyScript",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
