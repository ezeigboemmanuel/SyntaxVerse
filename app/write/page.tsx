import { Button } from "@/components/ui/button";
import React from "react";

const WritePage = () => {
  return (
    <div className="bg-[#FCFCFE] p-5 md:p-10 lg:p-16 pt-8 -mx-3 md:-mx-6">
      <div>
        <input
          className="bg-transparent border-none text-2xl md:text-4xl font-bold outline-none active:outline-none"
          placeholder="Enter your title"
        />
        <div className="flex w-full mt-4">
          <Button className="rounded-full md:text-base py-1.5 px-5 bg-[#6C40FE] hover:bg-[#6134f3]">
            Post article
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WritePage;
