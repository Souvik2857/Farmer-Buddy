import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Farmer Buddy",
  description:
    "A corps disease prevention tool to help farmers to do farming more easily",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionWrapper>
          <Navbar></Navbar>
          <div className="md:min-h-[82.5vh] bg-[#FFF1A6] max-sm:min-h-[85vh]">{children}</div>
          <Footer></Footer>
        </SessionWrapper>
      </body>
    </html>
  );
}
