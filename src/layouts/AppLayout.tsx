import React, { ReactNode } from "react";
import AppHeader from "./AppHeader";

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <AppHeader />
      <div className="h-full lg:mx-auto mx-4 mb-10">{children}</div>
    </div>
  );
}

export default AppLayout;
