import { ReactNode } from "react";
import "@/styles/global.css";
import GlassPane from "@/components/GlassPane";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { getUserFromCookie } from "@/lib/auth";

const AuthRootLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserFromCookie(cookies());
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6">
        <Header user={user} />
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
};

export default AuthRootLayout;
