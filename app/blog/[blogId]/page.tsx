import Image from "next/image";
import AuthorImg from "@/assets/authorimg.jpg";
import { Heart, Share } from "lucide-react";

const BlogPage = () => {
  const tags = ["UI/UX", "Web Design", "Art"];
  return (
    <div className="pt-6">
      {/* Left side */}
      <div>
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Image
                src={AuthorImg}
                alt="profile_img"
                className="h-14 w-14 rounded-full"
              />
              <div>
                {/* should go to user page */}
                <p className="font-semibold text-lg hover:underline">
                  Ria Donalds
                </p>
                <p className="text-gray-500">Author</p>
              </div>
            </div>

            <div className="flex space-x-3 items-center">
              <Share />
              <div className="flex space-x-1 items-center">
                <Heart />
                <p className="text-lg">23</p>
              </div>
            </div>
          </div>
          <div>
            {tags.map((tag) => (
              <div
                key={tag}
                className="mr-2 bg-gray-800 text-gray-200 text-sm inline-flex items-center px-5 py-1.5 rounded-full"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div></div>
    </div>
  );
};

export default BlogPage;
