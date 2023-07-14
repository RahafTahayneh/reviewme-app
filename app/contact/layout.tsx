import { ReactNode } from "react";
import "@/styles/global.css";
import Header from "@/components/Header";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";

const RootContactLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserFromCookie(cookies());

  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen home  flex flex-col">
        <div className="p-6">
          <Header user={user} />
        </div>
        <div className="h-full w-full p-6">{children}</div>
        <div>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootContactLayout;
