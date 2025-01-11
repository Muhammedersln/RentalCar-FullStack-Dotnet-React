import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RentCar - Araç Kiralama Platformu",
  description: "En uygun fiyatlarla araç kiralama hizmeti",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-surface pt-6">
            {children}
          </main>
        </AuthProvider>
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500">
              © 2024 RentCar. Tüm hakları saklıdır.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
