import { ReactNode } from "react";
import "@/styles/global.css";
import Header from "@/components/Header";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen home p-6 flex flex-col">
        <div>
          <Header />
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
