import React from "react";
import ProfileInfo from "../_components/ProfileInfo";
import AllBlogs from "../_components/AllBlogs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export async function generateMetadata({ params }: { params: { profileId: Id<"users"> } }) {
  const user = await fetchQuery(api.users.getUserById, {
    id: params.profileId,
  });

  return {
    metadataBase: new URL("https://syntaxverse.vercel.app"),
    title: user?.name || "SyntaxVerse",
    description: user?.bio || "SyntaxVerse is a multi-user blog where different users can write and publish their blogs.",
    openGraph: {
      title: user?.name || "SyntaxVerse",
      description: user?.bio || "SyntaxVerse is a multi-user blog where different users can write and publish their blogs.",
      url: `https://syntaxverse.vercel.app/profile/${user?._id}`,
      siteName: "SyntaxVerse",
      images: [
        {
          url: user?.imageUrl,
        },
      ],
    },
  };
}

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

      <AllBlogs id={user._id} />
    </div>
  );
};

export default ProfilePage;
