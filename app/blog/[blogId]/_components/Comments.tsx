import Image from "next/image";
import AuthorImg from "@/assets/authorimg.jpg";
import { ChevronDown, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Comments = () => {
  return (
    <div>
      <h1 className="font-semibold text-lg mb-3 md:hidden">Comments (32)</h1>
      <div className="flex flex-col md:flex-row justify-between w-full md:space-x-6">
        <div className="flex basis-1/2 flex-col w-full border shadow-lg p-4 max-w-lg rounded-lg">
          <textarea
            placeholder="What are your thoughts?"
            className="bg-transparent focus:outline-none resize-none"
            rows={5}
          />
          <div className="flex w-full mt-2 justify-end">
            <Button className="rounded-full py-1.5 px-5 bg-[#6C40FE] hover:bg-[#6134f3]">
              Post comment
            </Button>
          </div>
        </div>

        <div className="basis-1/2 mt-8 md:mt-0">
          <h1 className="font-semibold text-lg mb-3 hidden md:inline-block">
            Comments (32)
          </h1>
          <div className="flex items-center justify-between w-full space-x-2">
            <div className="flex space-x-2">
              <Image
                src={AuthorImg}
                alt="profile_img"
                className="h-8 w-8 md:h-10 md:w-10 rounded-full"
              />
              <div>
                {/* should go to user page */}
                <p className="font-semibold hover:underline text-sm md:text-base">
                  Ria Donalds
                </p>
                <p className="text-gray-500 text-xs md:text-sm">10 May, 2024</p>
              </div>
            </div>
            <div>
              <Ellipsis />
            </div>
          </div>

          <p className="mt-2 text-gray-800 text-sm md:text-base">
            I appreciate your effort and I'll love to ship in that UI/UX
            embodies the blah blah blah.
          </p>

          <Drawer>
            <DrawerTrigger>
              <div className="flex space-x-1 items-center cursor-pointer mt-3 font-semibold ">
                <p>View all comments</p>
                <ChevronDown className="w-5 h-5" />
              </div>
            </DrawerTrigger>
            <DrawerContent className="bg-[#FCFCFE] px-1">
              <DrawerHeader>
                <DrawerTitle className="mb-4 mx-auto">
                  Comments (32)
                </DrawerTitle>
              </DrawerHeader>
              <div className="max-h-[50vh] px-4 overflow-y-scroll max-w-2xl mx-auto">
                <div className="flex items-center justify-between w-full space-x-2">
                  <div className="flex space-x-2">
                    <Image
                      src={AuthorImg}
                      alt="profile_img"
                      className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                    />
                    <div>
                      {/* should go to user page */}
                      <p className="font-semibold hover:underline text-sm md:text-base">
                        Ria Donalds
                      </p>
                      <p className="text-gray-500 text-xs md:text-sm">
                        10 May, 2024
                      </p>
                    </div>
                  </div>
                  <div>
                    <Ellipsis />
                  </div>
                </div>

                <p className="mt-2 text-gray-800 text-sm md:text-base">
                  I appreciate your effort and I'll love to ship in that UI/UX
                  embodies the blah blah blah.
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Comments;
