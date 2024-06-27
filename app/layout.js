import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "澳門出行調查2024",
  description: "澳大創科",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>{children}</body>
    </html>
  );
}
