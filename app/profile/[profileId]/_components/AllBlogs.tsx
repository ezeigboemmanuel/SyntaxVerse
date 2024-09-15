import BlogList from "@/components/BlogList";
import React from "react";

const AllBlogs = () => {
  return (
    <div className="">
      <h1 className="font-semibold text-lg md:text-2xl">All articles</h1>

      <BlogList />
    </div>
  );
};

export default AllBlogs;
