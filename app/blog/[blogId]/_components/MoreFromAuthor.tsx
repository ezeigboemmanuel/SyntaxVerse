import BlogList from "@/components/BlogList";
import { Separator } from "@/components/ui/separator";
import React from "react";

const MoreFromAuthor = () => {
  return (
    <div className="pt-6 bg-[#FCFCFE] -m-4 px-4 md:px-8">
      <h1 className="font-semibold text-lg md:text-2xl">
        More from Ria Donalds
      </h1>

      {/* <BlogList /> */}

      <div className="py-10">
        <Separator />
      </div>
    </div>
  );
};

export default MoreFromAuthor;
