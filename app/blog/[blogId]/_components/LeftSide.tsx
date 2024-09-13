import Image from "next/image";
import AuthorImg from "@/assets/authorimg.jpg";
import BlogImg from "@/assets/uximage.jpg";
import { Heart, MessageCircle, Share } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const LeftSide = () => {
  const tags = ["UI/UX", "Web Design", "Art"];
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <Image
              src={AuthorImg}
              alt="profile_img"
              className="h-12 w-12 rounded-full"
            />
            <div>
              {/* should go to user page */}
              <p className="font-semibold hover:underline md:text-lg">
                Ria Donalds
              </p>
              <p className="text-gray-500 text-sm md:text-base">Author</p>
            </div>
          </div>

          <div className="flex space-x-3 md:space-x-5 items-center">
            <Share className="h-5 w-5" />
            <div className="flex space-x-1 items-center">
              <Heart className="h-5 w-5" />
              <p>23</p>
            </div>
          </div>
        </div>
        <div>
          {tags.map((tag) => (
            <div
              key={tag}
              className="mr-2 bg-gray-800 text-gray-200 text-xs md:text-sm inline-flex items-center px-5 py-1.5 rounded-full"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}

      <div className="py-5">
        <div className="flex md:items-center justify-between flex-col md:flex-row md:space-x-4">
          <h1 className="uppercase text-2xl md:text-4xl font-bold">
            UI/UX Design: Creating Seamless Digital Experiences
          </h1>
          <div className="flex items-center text-gray-700 mt-2 md:mt-0 text-sm md:text-base">
            <MessageCircle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            <p className="text-nowrap">(32 comments)</p>
          </div>
        </div>

        <div className="mt-3">
          <AspectRatio ratio={16 / 7.5}>
            <Image
              src={BlogImg}
              alt="blog_img"
              className="object-cover object-center w-full h-full"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
