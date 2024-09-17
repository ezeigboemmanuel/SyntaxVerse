import Image from "next/image";
import { Eye, Heart, Share } from "lucide-react";

interface BlogTopProps {
  tags: string[];
  imageUrl: string | undefined;
  authorName: string | undefined;
  likes: number | undefined;
  views: number;
}
const BlogTop = ({ tags, imageUrl, authorName, likes, views}: BlogTopProps) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <Image
            src={
              imageUrl
                ? imageUrl
                : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
            }
            alt="profile_img"
            width={100}
            height={100}
            className="h-12 w-12 rounded-full"
          />
          <div>
            {/* should go to user page */}
            <p className="font-semibold hover:underline md:text-lg">
              {authorName}
            </p>
            <p className="text-gray-500 text-sm md:text-base">Author</p>
          </div>
        </div>

        <div className="flex space-x-3 md:space-x-5 items-center">
          <Share className="h-5 w-5" />
          <div className="flex space-x-1 items-center">
            <Heart className="h-5 w-5" />
            <p>{likes == undefined ? "0" : likes}</p>
          </div>
          <div className="flex space-x-1 items-center">
            <Eye className="h-5 w-5" />
            <p>{views}</p>
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
  );
};

export default BlogTop;
