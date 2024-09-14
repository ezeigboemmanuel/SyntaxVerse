import Image from "next/image";
import FeaturedImg from "@/assets/featuredimg.jpg";
import { MoveRight } from "lucide-react";

const Featured = () => {
  return (
    <div className="mt-6 mb-6 md:mt-10 md:mb-10 bg-[#FCFCFE] rounded-xl group flex flex-col md:flex-row cursor-pointer">
      <div className="w-full md:h-[450px]">
        <Image src={FeaturedImg} alt="featured Image" className="rounded-t-xl md:rounded-l-xl md:rounded-tr-none object-cover object-center max-h-[380px] md:max-h-[450px]"/>
      </div>
      <div className="p-3 md:p-10 flex flex-col md:min-h-[450px]">
        <div className="uppercase text-gray-600 flex justify-between text-sm md:text-base mb-2 md:mb-4">
          <p>August 14, 2024</p>
          <p>5 min read</p>
        </div>
        <h1 className="text-2xl md:text-4xl mb-3 md:mb-6 group-hover:underline">
          The Essential Guide to Web Development: Building the Digital World
        </h1>
        <div className="flex-grow">
          <div
            className="mr-2 mb-2 rounded-full border border-gray-600 hover:bg-transparent
             text-gray-600 hover:text-gray-600 cursor-default px-5 py-1.5 inline-flex text-sm md:text-base"
          >
            Web Development
          </div>
        </div>

        <div className="flex text-gray-600 mt-4 items-center text-sm md:text-base">
            <p className="mr-2">Read Now</p>
            <MoveRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
