import type { Metadata } from "next";
import "./globals.css";
import { Lato } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopBtn";
import { ConvexProvider } from "@/providers/convex-provider";
import ToastProvider from "@/providers/toast-provider";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
export const metadata: Metadata = {
  title: "SyntaxVerse",
  description:
    "SyntaxVerse is a multi-user blog where different users can write and publish their blogs.",
  openGraph: {
    title: "SyntaxVerse",
    description:
      "SyntaxVerse is a multi-user blog where different users can write and publish their blogs.",
    url: `https://syntaxverse.vercel.app/`,
    siteName: "SyntaxVerse",
    images: [
      {
        url: "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Protest+Guerrilla&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${lato.className} antialiased bg-[#F3F3F5]`}>
        <ToastProvider />
        <ConvexProvider>
          <Navbar />
          <div className="px-3 md:px-6 max-w-[1400px] mx-auto">{children}</div>
          <Footer />
          <BackToTopButton />
        </ConvexProvider>
      </body>
    </html>
  );
}
