"use client";
import { useParams } from "next/navigation";
import AuthorInfo from "./AuthorInfo";
import BlogTop from "./BlogTop";
import Comments from "./Comments";
import Content from "./Content";
import MoreFromAuthor from "./MoreFromAuthor";
import Recommended from "./Recommended";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const SinglePageBlog = () => {
  const params = useParams();
  const blog = useQuery(api.blogs.getSingleBlog, {
    id: params.blogId as Id<"blogs">,
  });

  if(blog == undefined){
    return <p>Loading...</p>
  }
  return (
    <div className="max-w-5xl mx-auto">
      <BlogTop authorName={blog.author?.name} imageUrl={blog.author?.imageUrl} likes={blog.likes} tags={blog.categories} views={blog.views} />

      {/* Content */}
      <Content />

      {/* Comment */}
      <Comments />

      {/* Author info */}
      <AuthorInfo />
      <Separator />
      <MoreFromAuthor />
      <Recommended />
    </div>
  );
};

export default SinglePageBlog;
