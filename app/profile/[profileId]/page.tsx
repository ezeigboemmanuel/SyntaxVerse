import React from "react";
import ProfileInfo from "../_components/ProfileInfo";
import AllBlogs from "../_components/AllBlogs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

const ProfilePage = async ({
  params,
}: {
  params: { profileId: Id<"users"> };
}) => {
  const user = await fetchQuery(api.users.getUserById, {
    id: params.profileId,
  });

  if(!user){
    return <p>No user found</p>
  }
  return (
    <div>
      <ProfileInfo
        key={user._id}
        _id={user._id}
        imageUrl={user.imageUrl}
        name={user.name}
        bio={user.bio}
        facebookLink={user.facebookLink}
        instaLink={user.instaLink}
        whatsappLink={user.whatsappLink}
        xLink={user.xLink}
      />

      {/* <AllBlogs /> */}
    </div>
  );
};

export default ProfilePage;
