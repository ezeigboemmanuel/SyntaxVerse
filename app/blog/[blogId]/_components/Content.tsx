"use client";

import Image from "next/image";
import BlogImg from "@/assets/uximage.jpg";
import { Heart, MessageCircle, Share } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import MarkdownDisplay from "@/components/MarkdownDisplay";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface ContentProps {
  blogId: Id<"blogs">;
  title: string;
  imageUrl: string;
  article: string;
  likes: number | undefined;
}

const Content = ({ title, imageUrl, article, likes, blogId }: ContentProps) => {
  const comments = useQuery(api.comments.getAllComments);
  return (
    <div className="py-5">
      <div className="flex md:items-center justify-between flex-col md:flex-row md:space-x-4">
        <h1 className="uppercase text-2xl md:text-4xl font-bold">{title}</h1>
        <div className="flex items-center text-gray-700 mt-2 md:mt-0 text-sm md:text-base">
          <MessageCircle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
          <p className="text-nowrap">
            (
            {comments?.filter((comment) => blogId === comment.blogId).length ||
              "0"}{" "}
            comments)
          </p>
        </div>
      </div>

      <div className="mt-3">
        <AspectRatio ratio={16 / 7.5}>
          <Image
            fill
            src={imageUrl}
            alt="blog_img"
            className="object-cover object-center w-full h-full"
          />
        </AspectRatio>
      </div>

      <div className="py-3">
        <MarkdownDisplay>{article}</MarkdownDisplay>

        <div className="py-3 flex justify-between items-center text-gray-700">
          <div className="flex items-center text-gray-700 mt-2 md:mt-0 text-sm md:text-base">
            <MessageCircle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            <p className="text-nowrap">
              (
              {comments?.filter((comment) => blogId === comment.blogId)
                .length || "0"}{" "}
              comments)
            </p>
          </div>
          <div className="flex space-x-3 md:space-x-5 items-center">
            <Share className="h-5 w-5" />
            <div className="flex space-x-1 items-center">
              <Heart className="h-5 w-5" />
              <p>{likes == undefined ? "0" : likes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
