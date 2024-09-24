"use client";
import Write from "@/components/Write";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const EditBlogPage = () => {
  const params = useParams();
  const router = useRouter();
  const blog = useQuery(api.blogs.getSingleBlog, {
    id: params.blogId as Id<"blogs">,
  });
  const currentUser = useQuery(api.users.getCurrentUser);
  const { user } = useUser();

  if (!user) {
    router.push("/");
    return;
  }
  if (!blog || !currentUser) {
    return <p>Loading...</p>;
  }

  if (blog.author._id !== currentUser._id) {
    router.back();
  }
  return (
    <div className="max-w-4xl mx-auto">
      <Write
        blogId={blog._id}
        fmrImageUrl={blog.imageUrl}
        categories={blog.categories}
        title={blog.title}
        article={blog.article}
        fmrStorageId={blog.storageId}
      />
    </div>
  );
};

export default EditBlogPage;
