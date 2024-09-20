"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthorImg from "@/assets/authorimg.jpg";
import { ChevronDown, Ellipsis } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

interface CommentListProps {
  currentBlogId: Id<"blogs">;
  setComment: (value: string) => void;
  setEdit: (value: boolean) => void;
  setId: (value: Id<"comments">) => void;
}

interface handleEditProps {
  comment: string;
  id: Id<"comments">;
}
const CommentList = ({
  currentBlogId,
  setComment,
  setEdit,
  setId,
}: CommentListProps) => {
  const comments = useQuery(api.comments.getAllComments);
  const currentUser = useQuery(api.users.getCurrentUser);
  const deleteComment = useMutation(api.comments.deleteComment);
  const [open, setOpen] = useState(false);
  if (!comments) {
    return;
  }

  const handleEdit = ({ comment, id }: handleEditProps) => {
    setOpen(false);
    setComment(comment);
    setEdit(true);
    setId(id);
  };

  const handleDelete = (id: Id<"comments">) => {
    deleteComment({ id: id }).then(() => {
      toast.success("Comment deleted successfully.");
    });
  };
  return (
    <div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <div className="flex space-x-1 items-center cursor-pointer mt-3 font-semibold ">
              <p>View all comments</p>
              <ChevronDown className="w-5 h-5" />
            </div>
          </SheetTrigger>
          <SheetContent className="bg-[#FCFCFE] pl-3 pr-0 text-left">
            <SheetHeader>
              <SheetTitle className="mb-4">
                {" "}
                Comments (
                {comments?.filter((comment) => currentBlogId === comment.blogId)
                  .length || "0"}
                )
              </SheetTitle>
              <div className="overflow-y-scroll max-h-[90vh] pb-5 pr-2">
                {comments
                  ?.filter((comment) => currentBlogId === comment.blogId)
                  .map((comment) => (
                    <div key={comment._id} className="max-w-2xl mx-auto w-full py-3 px-2 text-left">
                      <div className="flex items-center justify-between w-full space-x-2">
                        <div className="flex space-x-2">
                          <Image
                            src={comment.commentCreator.imageUrl || ""}
                            width={500}
                            height={500}
                            alt="profile_img"
                            className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                          />
                          <div>
                            {/* should go to user page */}
                            <Link
                              href={`/profile/${comment.commentCreator._id}`}
                            >
                              <p className="font-semibold hover:underline text-sm md:text-base">
                                {comment.commentCreator.name}
                              </p>
                            </Link>
                            <p className="text-gray-500 text-xs md:text-sm">
                              {new Date(
                                comment._creationTime
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div>
                          {currentUser?._id === comment.commentCreator._id && (
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <Ellipsis className="h-4 w-4 md:h-5 md:w-5" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleEdit({
                                      comment: comment.comment,
                                      id: comment._id,
                                    })
                                  }
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(comment._id)}
                                  className="text-red-500"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>

                      <p className="mt-2 text-gray-800 text-left text-sm md:text-base">
                        {comment.comment}
                      </p>
                    </div>
                  ))}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
    </div>
  );
};

export default CommentList;
