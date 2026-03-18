import type { Metadata } from "next";
import { Hanken_Grotesk, STIX_Two_Text, Plus_Jakarta_Sans } from 'next/font/google';
import HireMeButton from '@/app/components/HireMeButton';
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const stixTwoText = STIX_Two_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-navbar",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`sroll-smooth ${stixTwoText.variable} ${plusJakartaSans.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.theme;
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e) {}
          })();
        `}} />
      </head>
      <body
        className={`${hankenGrotesk.className} antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        {children}
        <div className="fixed top-5 right-5 z-50 hidden md:block">
          <HireMeButton size="md" href="#contact" />
        </div>
      </body>
    </html>
  );
}
