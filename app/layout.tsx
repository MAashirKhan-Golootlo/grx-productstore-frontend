import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/redux";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "ProductStore",
  description: "Your one-stop shop for everything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col">
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
