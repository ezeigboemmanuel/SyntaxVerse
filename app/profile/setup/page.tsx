"use client";
import { useQuery } from "convex/react";
import SetupForm from "../[profileId]/_components/SetupForm";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const ProfileSetupPage = () => {
  const currentUser = useQuery(api.users.getCurrentUser);
  const { isSignedIn, user } = useUser();
  const router = useRouter()
  useEffect(() => {
    if(!isSignedIn || !user){
      router.push("/")
    }
    if (currentUser) {
      router.push(`/profile/${currentUser?._id}`)
    }
  }, [currentUser, isSignedIn, user]);
  return (
    <div className="py-6 md:py-10 max-w-xl mx-auto">
      <h1 className="text-2xl md:text-4xl">Let's set up your profile</h1>
      <p className="text-gray-700 text-sm md:text-base">
        Tell us more about yourself
      </p>

      <div className="mt-4">
        <SetupForm currentUser={undefined} />
      </div>
    </div>
  );
};

export default ProfileSetupPage;
