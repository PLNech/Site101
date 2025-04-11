import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { StudentProvider } from "./contexts/StudentContext";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "101 Vitry | École de programmation",
  description: "Formation intensive aux métiers du numérique",
  icons: {
    icon: '/favicon.ico',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-gradient-to-br from-background to-background-dark text-foreground selection:bg-primary selection:text-white`}
      >
        <StudentProvider>
          <article className="max-w-full overflow-x-auto">
            <div className="relative min-h-screen flex flex-col">
              {children}
            </div>
          </article>
        </StudentProvider>
      </body>
    </html>
  );
}