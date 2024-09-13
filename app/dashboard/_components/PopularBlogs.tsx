import BlogList from "@/components/BlogList";
import React from "react";

const PopularBlogs = () => {
  return (
    <div className="mt-6">
      <h1 className="font-semibold text-lg md:text-2xl">Popular articles</h1>

      <BlogList />
    </div>
  );
};

export default PopularBlogs;
