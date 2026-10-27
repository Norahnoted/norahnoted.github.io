import type { Metadata } from "next";
import { Hanken_Grotesk, STIX_Two_Text, Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import "./globals.css";
import NavigationTransitions from './components/NavigationTransitions';

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const stixTwoText = STIX_Two_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
});

const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-hand",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-navbar",
});

export const metadata: Metadata = {
  title: "Norah Zhou — Product Designer",
  description:
    "Product designer in Toronto working across UX research, service design, business analysis, and web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`sroll-smooth overflow-x-hidden ${stixTwoText.variable} ${plusJakartaSans.variable} ${handwriting.variable}`}>
      <head>
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
        <NavigationTransitions>{children}</NavigationTransitions>
      </body>
    </html>
  );
}
