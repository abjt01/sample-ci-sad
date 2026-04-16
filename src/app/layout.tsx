import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lunn — Ship without fear",
    template: "%s | Lunn",
  },
  description:
    "Lunn gives your team a single place to manage feature flags, staged rollouts, and environment configs. Ship faster. Roll back in seconds.",
  openGraph: {
    title: "Lunn — Ship without fear",
    description:
      "Feature flags, staged rollouts, and environment configs in one place.",
    url: "https://lunn.dev",
    siteName: "Lunn",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lunn — Ship without fear",
    description: "Feature flags and staged rollouts for modern teams.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans">{children}</body>
    </html>
  );
}
