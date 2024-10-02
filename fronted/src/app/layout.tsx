import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./GlobalRedux/provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "./Loading";

const inter = Inter({ subsets: ["latin"] });

export const viewport = 'width=device-width, initial-scale=1';

export const metadata: Metadata = {
  title: "Home - YourLab",
  description: "YourLab offers a seamless experience to find and book appointments with top healthcare professionals. ",
  keywords: "doctors, healthcare, book appointment, medical services, specialists, health consultation, telemedicine, medical advice, YourLab doctors, healthcare professionals",
  robots: "index, follow",
  openGraph: {
    title: "YourLab - Find the Best Doctors and Healthcare Services",
    description: "YourLab offers a seamless experience to find and book appointments with top healthcare professionals.",
    url: "https://www.yourlab.in", // Replace with your actual URL
    type: "website",
    siteName: "YourLab",
  },
  twitter:{
    card: "summary_large_image"
  },
  alternates: {
    canonical: "https://www.yourlab.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Loading />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
