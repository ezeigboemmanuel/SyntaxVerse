"use client";
import BlogList from "@/components/BlogList";
import Featured from "@/components/Featured";
import Tags from "@/components/Tags";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const searchQuery = search || "";
  const category = searchParams.get("category");
  const categoryQuery = category || "";
  const blogs = useQuery(api.blogs.getAllBlogs, {
    search: searchQuery,
    category: categoryQuery,
  });

  if (blogs === undefined) {
    return <p>Loading...</p>;
  }
  return (
    <div className="pb-14 md:pb-20">
      <Tags />
      <Featured blogs={blogs} />
      <hr className="mx-4 md:mx-7" />
      <BlogList blogs={blogs} />
    </div>
  );
}
