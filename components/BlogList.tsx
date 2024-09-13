import Image1 from "@/assets/apisimage.jpg";
import Image2 from "@/assets/uximage.jpg";
import Image3 from "@/assets/featuredimg.jpg";
import Image from "next/image";
import { Button } from "./ui/button";

const BlogList = () => {
  const blogs = [
    {
      image: Image1,
      tag: "APIs",
      date: "September 12, 2024",
      title: "Understanding APIs: The Backbone of Modern Web Development",
    },
    {
      image: Image2,
      tag: "UI/UX",
      date: "August 23, 2024",
      title: "UI/UX Design: Creating Seamless Digital Experiences",
    },
    {
      image: Image3,
      tag: "Web Development",
      date: "August 14, 2024",
      title:
        "The Essential Guide to Web Development: Building the Digital World",
    },
  ];
  return (
    <div className="pt-6 pb-6 md:pt-10 md:pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 w-full">
        {blogs.map((blog) => (
          <div key={blog.title} className="group cursor-pointer">
            <div>
              <Image src={blog.image} alt="blog_img" className="rounded-xl object-cover object-center h-80" />
            </div>

            <div className="uppercase text-gray-600 flex justify-between items-center text-xs md:text-sm  md:mb-4 mt-4 px-2">
              <div
                className="mr-2 mb-2 rounded-full border border-gray-600 hover:bg-transparent
             text-gray-600 hover:text-gray-600 cursor-default text-xs md:text-sm px-5 py-1.5"
              >
                {blog.tag}
              </div>
              <p>{blog.date}</p>
            </div>

            <h1 className="text-lg md:text-2xl mb-3 md:mb-6 group-hover:underline px-2">
              {blog.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
