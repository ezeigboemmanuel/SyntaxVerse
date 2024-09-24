"use client";

import BlogList from "@/components/BlogList";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";

interface AllBlogsProps {
  id: Id<"users">;
}

const AllBlogs = ({ id }: AllBlogsProps) => {
  const blogsByAuthor = useQuery(api.blogs.getAllBlogsByAuthor, {
    id: id,
  });
  return (
    <div className="">
      <h1 className="font-semibold text-lg md:text-2xl">All articles</h1>

      {blogsByAuthor && <BlogList blogs={blogsByAuthor} />}
    </div>
  );
};

export default AllBlogs;
