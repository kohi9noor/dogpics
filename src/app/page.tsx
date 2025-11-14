import ImageNumberCounter from "@/components/image-number-counter";
import ImageViewer from "@/components/image-viewer";
import Sidebar from "@/components/side-bar";
import React from "react";

const Page = () => {
  return (
    <div className="w-full min-h-screen relative flex items-center justify-center">
      <ImageViewer />
      <ImageNumberCounter />
      <Sidebar />
    </div>
  );
};

export default Page;
