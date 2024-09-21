import Image from "next/image";
import Xicon from "@/assets/xicon.svg";
import Facebookicon from "@/assets/facebookicon.svg";
import Instaicon from "@/assets/instaicon.svg";
import Whatsicon from "@/assets/whatsicon.svg";
import { Separator } from "@/components/ui/separator";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

interface AuthorInfoProps {
  name: string | undefined;
  imageUrl: string | undefined;
  authorId: Id<"users"> | undefined;
  bio: string | undefined;
  xLink: string | undefined;
  facebookLink: string | undefined;
  instaLink: string | undefined;
  whatsappLink: string | undefined;
}
const AuthorInfo = ({
  name,
  imageUrl,
  authorId,
  bio,
  facebookLink,
  instaLink,
  whatsappLink,
  xLink,
}: AuthorInfoProps) => {
  return (
    <div className="bg-[#FCFCFE] pt-10 mt-10 -m-4 px-4 md:px-8">
      <h3 className="font-semibold mb-3 text-lg">Written by:</h3>

      <div>
        <div className="flex items-center space-x-2">
          <Image
            src={imageUrl || ""}
            alt="profile_img"
            className="h-12 w-12 rounded-full"
            width={500}
            height={500}
          />
          <div>
            {/* should go to user page */}
            <Link href={`/profile/${authorId}`}>
              <p className="font-semibold hover:underline md:text-lg">{name}</p>
            </Link>
            <p className="text-gray-500 text-sm md:text-base">Author</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm md:text-base mt-3">{bio}</p>
        <div className="flex space-x-2 md:space-x-4 mt-4">
          {xLink && (
            <Link href={xLink as string} target="_blank">
              <Image src={Xicon} alt="X" />
            </Link>
          )}
          {facebookLink && (
            <Link href={facebookLink as string} target="_blank">
              <Image src={Facebookicon} alt="Facebook" />
            </Link>
          )}
          {instaLink && (
            <Link href={instaLink as string} target="_blank">
              <Image src={Instaicon} alt="Instagram" />
            </Link>
          )}
          {whatsappLink && (
            <Link href={whatsappLink as string} target="_blank">
              <Image src={Whatsicon} alt="whatsapp" />
            </Link>
          )}
        </div>
      </div>
      <div className="py-10">
        <Separator />
      </div>
    </div>
  );
};

export default AuthorInfo;
