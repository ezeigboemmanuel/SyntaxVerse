import Image from "next/image";
import AuthorImg from "@/assets/authorimg.jpg";
import Xicon from "@/assets/xicon.svg";
import Facebookicon from "@/assets/facebookicon.svg";
import Instaicon from "@/assets/instaicon.svg";
import Whatsicon from "@/assets/whatsicon.svg";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";

const ProfileInfo = () => {
  return (
    <div className="pt-10 -m-4 px-4 md:px-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-5">Your Profile</h1>
      <div className="bg-[#FCFCFE] p-4 md:p-8 shadow-sm rounded-sm max-w-4xl">
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
          <div>
            <Pencil className="w-5 h-5 stroke-[#6C40FE] cursor-pointer" />
          </div>
        </div>
        <p className="text-gray-700 text-sm md:text-base mt-3">
          I am a skilled UI Developer with experience in creating responsive,
          user-friendly interfaces using technologies like HTML, CSS,
          JavaScript, React, and Tailwind CSS.
        </p>
        <div className="flex space-x-2 md:space-x-4 mt-4">
          <p>
            <Image src={Xicon} alt="X" />
          </p>
          <p>
            <Image src={Facebookicon} alt="Facebook" />
          </p>
          <p>
            <Image src={Instaicon} alt="Instagram" />
          </p>
          <p>
            <Image src={Whatsicon} alt="whatsapp" />
          </p>
        </div>
      </div>
      <div className="py-10">
        <Separator />
      </div>
    </div>
  );
};

export default ProfileInfo;
