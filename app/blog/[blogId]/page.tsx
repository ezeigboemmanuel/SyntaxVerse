import Image from "next/image";
import AuthorImg from "@/assets/authorimg.jpg";
import { Heart, Share } from "lucide-react";

const BlogPage = () => {
  const tags = ["UI/UX", "Web Design", "Art"];
  return (
    <div className="pt-6">
      {/* Left side */}
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

        <div>
          <div>
            <h1></h1>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div></div>
    </div>
  );
};

export default BlogPage;
