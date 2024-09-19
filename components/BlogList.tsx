"use client";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

interface BlogListProps {
  blogs: {
    imageUrl: string;
    _id: Id<"blogs">;
    _creationTime: number;
    likes?: number | undefined;
    storageId: Id<"_storage">;
    format: string;
    userId: Id<"users">;
    title: string;
    article: string;
    views: number;
    categories: string[];
  }[];
}
const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <div className="pt-6 pb-6 md:pt-10 md:pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 w-full">
        {blogs.map((blog) => (
          <Link key={blog.title} href={`/blog/${blog._id}`}>
            <div className="group cursor-pointer">
              <div>
                <AspectRatio ratio={16 / 12}>
                  <Image
                    src={blog.imageUrl}
                    fill
                    alt="blog_img"
                    className="rounded-xl object-cover object-center h-80"
                  />
                </AspectRatio>
              </div>

              <div className="uppercase text-gray-600 flex justify-between items-center text-xs md:text-sm  md:mb-4 mt-4 px-2">
                <div
                  className="mr-2 mb-2 rounded-full border border-gray-600 hover:bg-transparent
             text-gray-600 hover:text-gray-600 cursor-default text-xs md:text-sm px-5 py-1.5"
                >
                  {blog.categories[0]}
                </div>
                <p>
                  {new Date(blog._creationTime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <h1 className="text-lg md:text-2xl mb-3 md:mb-6 group-hover:underline px-2">
                {blog.title}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
