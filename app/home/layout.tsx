import { ReactNode } from "react";
import "@/styles/global.css";
import Header from "@/components/Header";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserFromCookie(cookies());

  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen home  flex flex-col  h-full">
        <div className=" flex flex-col h-full">
          <div className="p-6">
            <Header user={user} />
          </div>
          <div className="px-6 middle">{children}</div>
          <div className="">
            <Footer />
          </div>
        </div>

        <div id="modal"></div>
        <div id="reviewModal"></div>
      </body>
    </html>
  );
};

export default RootLayout;
