"use client";
import React from "react";
import StatsCard from "./_components/StatsCard";
import PopularBlogs from "./_components/PopularBlogs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import HashLoader from "react-spinners/HashLoader";

const DashboardPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const currentUser = useQuery(api.users.getCurrentUser);
  if (!user) {
    router.push("/");
    return;
  }

  const blogsByAuthor = useQuery(api.blogs.getAllBlogsByAuthor, {
    id: currentUser?._id,
  });

  if (!blogsByAuthor) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <HashLoader color="#6C40FE" />
      </div>
    );
  }
  return (
    <div className="py-10">
      <StatsCard
        totalArticles={blogsByAuthor?.length}
        totalReads={blogsByAuthor.reduce((sum, blog) => sum + blog.views, 0)}
        totalLikes={blogsByAuthor.reduce(
          (sum, blog) => sum + (blog.likes ? blog.likes.length : 0),
          0
        )}
      />

      {blogsByAuthor && <PopularBlogs blogs={blogsByAuthor} />}
    </div>
  );
};

export default DashboardPage;
