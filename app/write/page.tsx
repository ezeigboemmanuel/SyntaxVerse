"use client"
import Write from "@/components/Write";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const WritePage = () => {
  const {user} = useUser();
  const router = useRouter();
  if(!user){
    router.push("/");
    return;
  }
  return (
    <div className="max-w-4xl mx-auto">
      <Write />
    </div>
  );
};

export default WritePage;
