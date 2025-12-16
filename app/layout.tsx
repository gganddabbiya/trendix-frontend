import { Inter } from "next/font/google";
import "./globals.css";
import Aoscompo from "../utils/aos";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
const font = Inter({ subsets: ["latin"] });

import { getCurrentUser } from "./utils/server-auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" data-scroll-behavior="smooth" >
      <body className={`${font.className} `}>
        <AuthProvider initialUser={user}>
          <Aoscompo>
            <Header />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
          </Aoscompo>
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  );
}
