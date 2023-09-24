import Header from "@/components/Header";
import Providers from "@/components/Providers";
import ToasterContainer from "@/components/ToasterContainer";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={cn(
            "grid min-h-screen grid-rows-[auto_1fr] bg-slate-200 font-sans text-gray-700",
            fontSans.variable,
          )}
        >
          <Header />
          {children}
          <ToasterContainer />
        </body>
      </html>
    </Providers>
  );
}
