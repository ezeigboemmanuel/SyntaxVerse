"use client"
import SetupForm  from "../_components/SetupForm";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const ProfileEditPage = () => {
  const currentUser = useQuery(api.users.getCurrentUser);
  if(!currentUser){
    return <p>Loading...</p>
  }
  return (
    <div className="py-6 md:py-10 max-w-xl mx-auto">
      <h1 className="text-2xl md:text-4xl">Update up your profile</h1>
      <p className="text-gray-700 text-sm md:text-base">
        Update your personal information.
      </p>

      <div className="mt-4">
        <SetupForm currentUser={currentUser} />
      </div>
    </div>
  );
};

export default ProfileEditPage;
