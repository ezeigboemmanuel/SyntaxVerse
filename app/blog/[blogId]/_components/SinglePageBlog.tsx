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
  const blogsByAuthor = useQuery(api.blogs.getAllBlogsByAuthor, {
    id: blog?.userId,
  });
  const currentUser = useQuery(api.users.getCurrentUser);

  if (blog == undefined) {
    return <p>Loading...</p>;
  }
  return (
    <div className="max-w-5xl mx-auto">
      <BlogTop
        authorName={blog.author?.name}
        imageUrl={blog.author?.imageUrl}
        likes={blog.likes}
        tags={blog.categories}
        views={blog.views}
        userId={currentUser?._id}
        authorId={blog.author._id}
        blogId={blog._id}
      />

      {/* Content */}
      <Content
        blogId={blog._id}
        title={blog.title}
        article={blog.article}
        imageUrl={blog.imageUrl}
        likes={blog.likes}
      />

      {/* Comment */}
      <Comments userId={currentUser?._id} blogId={blog._id} />

      {/* Author info */}
      <AuthorInfo
        name={blog.author?.name}
        imageUrl={blog.author?.imageUrl}
        authorId={blog.author._id}
        bio={blog.author.bio}
        xLink={blog.author.xLink}
        facebookLink={blog.author.facebookLink}
        instaLink={blog.author.instaLink}
        whatsappLink={blog.author.whatsappLink}
      />
      <Separator />
      {blogsByAuthor && <MoreFromAuthor blogs={blogsByAuthor} />}
      <Recommended />
    </div>
  );
};

export default SinglePageBlog;
