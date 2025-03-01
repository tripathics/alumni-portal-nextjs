import type { Metadata } from "next";
import { Open_Sans, Libre_Baskerville, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import cx from "classnames";
import { SessionContextProvider } from "@/state/session";
import { QueryProvider } from "@/state/query.config";
import { Toast } from "@/state/session/toast.config";

const openSans = Open_Sans({
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const libreBaskerville = Libre_Baskerville({
  display: "swap",
  weight: ["400", "700"],
  subsets: ["latin"],
});
const ibmPlexMono = IBM_Plex_Mono({
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
    <html
      lang="en"
      className={cx(
        openSans.className,
        libreBaskerville.className,
        ibmPlexMono.className
      )}
    >
      <body>
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
