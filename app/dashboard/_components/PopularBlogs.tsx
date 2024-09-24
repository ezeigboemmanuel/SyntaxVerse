import BlogList from "@/components/BlogList";
import { Id } from "@/convex/_generated/dataModel";
import React from "react";

interface PopularBlogProps {
  blogs:
    | {
        imageUrl: string;
        _id: Id<"blogs">;
        _creationTime: number;
        likes?: string[] | undefined;
        storageId: Id<"_storage">;
        format: string;
        userId: Id<"users">;
        title: string;
        article: string;
        views: number;
        categories: string[];
      }[];
}
const PopularBlogs = ({blogs}: PopularBlogProps) => {
  return (
    <div className="mt-6">
      <h1 className="font-semibold text-lg md:text-2xl">Popular articles</h1>

      <BlogList blogs={blogs} />
    </div>
  );
};

export default PopularBlogs;
