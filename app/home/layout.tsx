import { ReactNode } from "react";
import "@/styles/global.css";
import Header from "@/components/Header";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserFromCookie(cookies());

  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen home p-6 flex flex-col">
        <div>
          <Header user={user} />
        </div>
        <div>{children}</div>
        <div id="modal"></div>
      </body>
    </html>
  );
};

export default RootLayout;
