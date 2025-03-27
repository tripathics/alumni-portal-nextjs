import type { Metadata } from "next";
import { Open_Sans, Libre_Baskerville, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SessionContextProvider } from "@/state/session";
import { QueryProvider } from "@/config/query.config";
import { Toast } from "@/config/toast.config";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to NITAP Alumni Association",
  description: "NITAP ALumni Association",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${ibmPlexMono.variable} ${libreBaskerville.variable} antialiased`}
      >
        <QueryProvider>
          <SessionContextProvider>
            <Toast />
            <div id="root">{children}</div>
          </SessionContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
