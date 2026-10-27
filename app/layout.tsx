import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import NavigationTransitions from './components/NavigationTransitions';

const hankenGrotesk = localFont({
  src: "./fonts/hanken-grotesk.woff2",
  display: "swap",
  weight: "400 700",
});

const stixTwoText = localFont({
  src: "./fonts/stix-two-text.woff2",
  display: "swap",
  weight: "400 700",
  variable: "--font-source-sans",
});

const handwriting = localFont({
  src: "./fonts/caveat.woff2",
  display: "swap",
  weight: "500 600",
  variable: "--font-hand",
});

const roundedHandwriting = localFont({
  src: "./fonts/patrick-hand.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-hand-round",
});

const plusJakartaSans = localFont({
  src: "./fonts/plus-jakarta-sans.woff2",
  display: "swap",
  weight: "400 700",
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
    <html lang="en" suppressHydrationWarning className={`sroll-smooth overflow-x-hidden ${stixTwoText.variable} ${plusJakartaSans.variable} ${handwriting.variable} ${roundedHandwriting.variable}`}>
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
