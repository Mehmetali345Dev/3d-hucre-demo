import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from 'next'
 
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mikro",
  description: "Değişik bir hücre uygulaması",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className=" scrollbar-thumb-sienna-200 scrollbar-track-sienna-300">
      
      <body className={inter.className}>
        <div className="w-full  flex flex-col min-h-screen bg-sienna-100 text-black">
          {children}
        </div>
      </body>
    </html>
  );
}
