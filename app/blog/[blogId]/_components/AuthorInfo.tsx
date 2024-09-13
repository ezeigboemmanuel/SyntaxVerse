import Image from "next/image";
import AuthorImg from "@/assets/authorimg.jpg";
import Xicon from "@/assets/xicon.svg";
import Facebookicon from "@/assets/facebookicon.svg";
import Instaicon from "@/assets/instaicon.svg";
import Whatsicon from "@/assets/whatsicon.svg";
import { Separator } from "@/components/ui/separator";

const AuthorInfo = () => {
  return (
    <div className="bg-[#FCFCFE] pt-10 mt-10 -m-4 px-4 md:px-8">
      <h3 className="font-semibold mb-3 text-lg">Written by:</h3>

      <div>
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

export default AuthorInfo;
