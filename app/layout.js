import { Poppins } from "next/font/google";
import "./globals.css";
import "primeicons/primeicons.css";
import { AuthProvider } from "@/Providers/AuthProvider";
import { ThemeProvider } from "./Providers/ThemeProvider";
import ToasterProvider from "@/Providers/ToasterProvider";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Generated by create next app",
};

export const dynamic = "no-store";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white dark:bg-[#1e0f24]`}>
        <div className="dark:bg-[#1e0f24] dark:text-white">
          <AuthProvider>
            <ToasterProvider />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              storageKey="discord"
            >
              {children}
            </ThemeProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
