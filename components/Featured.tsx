import Image from "next/image";
import FeaturedImg from "@/assets/featuredimg.jpg";
import { MoveRight } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";

interface FeaturedProps {
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

const Featured = ({ blogs }: FeaturedProps) => {
  const title = "UI/UX Design: Creating Seamless Digital Experiences";
  const featured = blogs.filter(
    (blog) => blog.title.toLowerCase() === title.toLowerCase()
  );

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200; // Average words per minute
    const textLength = content.split(/\s+/).length; // Split by spaces to count words
    const readingTime = Math.ceil(textLength / wordsPerMinute); // Calculate and round up to the next minute
    return readingTime;
  };

  if (featured.length === 0) {
    return;
  }
  return (
    <>
      {featured.map((item) => {
        const readingTime = calculateReadingTime(item.article);
        return (
          <Link key={item._id} href={`/blog/${item._id}`}>
            <div className="mt-6 mb-6 md:mt-10 md:mb-10 bg-[#FCFCFE] rounded-xl group flex flex-col md:flex-row cursor-pointer">
              <div className="w-full max-w-2xl md:h-[450px]">
                <AspectRatio ratio={16 / 14}>
                  <Image
                    src={item.imageUrl}
                    alt="featured Image"
                    fill
                    className="rounded-t-xl md:rounded-l-xl md:rounded-tr-none object-cover object-center max-h-[380px] md:max-h-[450px]"
                  />
                </AspectRatio>
              </div>
              <div className="p-3 md:p-10 flex flex-col w-full md:min-h-[450px]">
                <div className="uppercase text-gray-600 flex justify-between text-sm md:text-base mb-2 md:mb-4">
                  <p>
                    {new Date(item._creationTime).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>{readingTime} min read</p>
                </div>
                <h1 className="text-2xl md:text-4xl mb-3 md:mb-6 group-hover:underline">
                  {item.title}
                </h1>
                <div className="flex-grow">
                  <div
                    className="mr-2 mb-2 rounded-full border border-gray-600 hover:bg-transparent
             text-gray-600 hover:text-gray-600 cursor-default px-5 py-1.5 inline-flex text-sm md:text-base"
                  >
                    {item.categories[0]}
                  </div>
                </div>

                <div className="flex text-gray-600 mt-4 items-center text-sm md:text-base">
                  <p className="mr-2">Read Now</p>
                  <MoveRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default Featured;
