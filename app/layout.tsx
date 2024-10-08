import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const Glancyr500 = localFont({
  src: "./fonts/glancyr500.ttf",
  variable: "--font-glancyr",
  weight: "100 900",
});

const Glancyr700 = localFont({
  src: "./fonts/glancyr700.ttf",
  variable: "--font-glancyr700",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pandora",
  description: "Generate your own web3 wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Glancyr500.variable} ${Glancyr700.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
