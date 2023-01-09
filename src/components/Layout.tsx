import React, { FC } from "react";

import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full bg-[#a1a1aa] dark:bg-gray-900 flex flex-col overflow-auto">
      <Navbar />
      <div className="h-full overflow-auto p-3">{children}</div>
    </div>
  );
};

export default Layout;
