import React, { FC } from "react";

import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen bg-[#a1a1aa] flex flex-col overflow-auto">
      <Navbar />
      <div className="h-full overflow-auto p-3">{children}</div>
    </div>
  );
};

export default Layout;
