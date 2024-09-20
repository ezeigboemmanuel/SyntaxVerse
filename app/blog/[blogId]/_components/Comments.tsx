"use client";

import Image from "next/image";
import AuthorImg from "@/assets/authorimg.jpg";
import { ChevronDown, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SignInButton, useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CommentList from "./CommentList";

interface CommentsProps {
  userId: Id<"users"> | undefined;
  blogId: Id<"blogs">;
}

const Comments = ({ userId, blogId }: CommentsProps) => {
  const { user } = useUser();

  const storeComments = useMutation(api.comments.storeComments);
  const updateComment = useMutation(api.comments.updateComment);
  const comments = useQuery(api.comments.getAllComments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState<Id<"comments">>();

  const handleComments = async () => {
    setLoading(true);
    if (!userId) {
      return;
    }
    if (!comment) {
      toast.error("Please input a comment.");
      return;
    }
    await storeComments({
      userId,
      blogId,
      comment,
    })
      .then(() => {
        toast.success("Comment submitted successfully.");
        setComment("");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong.");
      });
  };

  const handleEditComment = async (id: Id<"comments">) => {
    setLoading(true);
    if (!id || !userId) {
      return;
    }

    if (!comment) {
      toast.error("Please input a comment.");
      return;
    }

    await updateComment({
      id,
      comment,
      blogId,
      userId,
    })
      .then(() => {
        toast.success("Comment updated successfully.");
        setComment("");
        setEdit(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong.");
      });
  };
  return (
    <div>
      <h1 className="font-semibold text-lg mb-3 md:hidden">
        Comments (
        {comments?.filter((comment) => blogId === comment.blogId).length || "0"}
        )
      </h1>
      <div className="flex flex-col md:flex-row justify-between w-full md:space-x-6">
        <div className="flex basis-1/2 bg-white flex-col w-full border shadow-lg p-4 max-w-lg rounded-lg">
          <textarea
            placeholder="What are your thoughts?"
            className="bg-transparent focus:outline-none resize-none"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex w-full mt-2 justify-end">
            {user ? (
              !edit ? (
                <Button
                  onClick={handleComments}
                  disabled={loading}
                  className="rounded-full py-1.5 px-5 bg-[#6C40FE] hover:bg-[#6134f3]"
                >
                  Post comment
                </Button>
              ) : (
                <Button
                  onClick={() => handleEditComment(id as Id<"comments">)}
                  disabled={loading}
                  className="rounded-full py-1.5 px-5 bg-[#6C40FE] hover:bg-[#6134f3]"
                >
                  Edit Comment
                </Button>
              )
            ) : (
              <SignInButton>
                <Button className="rounded-full py-1.5 px-5 bg-[#6C40FE] hover:bg-[#6134f3]">
                  Post comment
                </Button>
              </SignInButton>
            )}
          </div>
        </div>

        <div className="basis-1/2 mt-8 md:mt-0">
          <h1 className="font-semibold text-lg mb-3 hidden md:inline-block">
            Comments (
            {comments?.filter((comment) => blogId === comment.blogId).length ||
              "0"}
            )
          </h1>
          {comments &&
            comments
              ?.filter((comment) => blogId === comment.blogId) // Step 1: Filter matching comments
              .slice(0, 1) // Step 2: Select only the first one
              .map((comment) => (
                <div>
                  <div className="flex items-center justify-between w-full space-x-2">
                    <div className="flex space-x-2">
                      <Image
                        src={comment.commentCreator?.imageUrl || ""}
                        width={500}
                        height={500}
                        alt="profile_img"
                        className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                      />
                      <div>
                        {/* should go to user page */}
                        <Link href={`/profile/${comment.commentCreator._id}`}>
                          <p className="font-semibold hover:underline text-sm md:text-base">
                            {comment.commentCreator?.name}
                          </p>
                        </Link>
                        <p className="text-gray-500 text-xs md:text-sm">
                          {new Date(comment._creationTime).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    {/* {userId == comment.userId && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={handleEdit}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        // onClick={() => handleDelete(id)}
                        className="text-red-500"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )} */}
                  </div>

                  <p className="mt-2 text-gray-800 text-sm md:text-base">
                    {comment.comment}
                  </p>
                </div>
              ))}

          {comments && comments.length > 0 && (
            <CommentList
              currentBlogId={blogId}
              setComment={setComment}
              setEdit={setEdit}
              setId={setId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
