"use client";
import { useParams } from "next/navigation";
import AuthorInfo from "./AuthorInfo";
import BlogTop from "./BlogTop";
import Comments from "./Comments";
import Content from "./Content";
import MoreFromAuthor from "./MoreFromAuthor";
import Recommended from "./Recommended";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

const SinglePageBlog = () => {
  const params = useParams();
  const blog = useQuery(api.blogs.getSingleBlog, {
    id: params.blogId as Id<"blogs">,
  });
  const blogsByAuthor = useQuery(api.blogs.getAllBlogsByAuthor, {
    id: blog?.userId,
  });

  const recommendedBlogs = useQuery(api.blogs.getRecommendedBlogs, {
    category: blog?.categories[0],
  });
  const currentUser = useQuery(api.users.getCurrentUser);
  const incrementViewCount = useMutation(api.blogs.incrementViewCount);
  const [hasViewed, setHasViewed] = useState(false); // Flag to track if the view has been incremented
  useEffect(() => {
    const increaseView = async () => {
      // Check if the blog has already been viewed
      const viewedBlogs = JSON.parse(
        localStorage.getItem("viewedBlogs") || "[]"
      );

      if (!viewedBlogs.includes(params.blogId) && !hasViewed) {
        await incrementViewCount({ blogId: params.blogId as Id<"blogs"> });

        // Add the blogId to viewedBlogs and update localStorage
        viewedBlogs.push(params.blogId);
        localStorage.setItem("viewedBlogs", JSON.stringify(viewedBlogs));

        // Set the flag to true to prevent future increments
        setHasViewed(true);
      }
    };

    increaseView();
  }, [params, hasViewed]); // Run this effect only when blogId changes

  if (blog == undefined) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <HashLoader color="#6C40FE" />
      </div>
    );
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
        title={blog.title}
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
      {blogsByAuthor && <MoreFromAuthor blogs={blogsByAuthor.slice(0, 3)} />}
      {recommendedBlogs && <Recommended blogs={recommendedBlogs.slice(0, 3)} />}
    </div>
  );
};

export default SinglePageBlog;
