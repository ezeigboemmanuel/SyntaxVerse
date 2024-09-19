"use client"
import BlogList from "@/components/BlogList";
import Featured from "@/components/Featured";
import Tags from "@/components/Tags";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const blogs = useQuery(api.blogs.getAllBlogs, {});
  if (blogs === undefined) {
    return <p>Loading...</p>;
  }
  return (
      <div className="pb-14 md:pb-20">
        <Tags />
        <Featured />
        <hr className="mx-4 md:mx-7" />
        <BlogList blogs={blogs} />
      </div>
  );
}
