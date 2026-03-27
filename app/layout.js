import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/app/components/ThemeProvider";
import SiteBroadcastListener from "@/app/components/SiteBroadcastListener";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Advaya 2k26",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cyberpunk">
      <body>
        <ThemeProvider>
          <SiteBroadcastListener />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
