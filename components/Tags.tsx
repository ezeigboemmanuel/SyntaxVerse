import React from "react";
import { Button } from "./ui/button";

const Tags = () => {
  const tags = [
    "All Articles",
    "Web Development",
    "UI/UX",
    "Backend Development",
    "APIs",
    "Frontend Development",
  ];
  return (
    <div className="pt-4">
      <div>
        {tags.map((tag) => (
          <Button key={tag} variant="outline" className="mr-2 mb-2 rounded-full border border-gray-600 text-gray-600 hover:bg-[#6C40FE] hover:text-white hover:border-white">{tag}</Button>
        ))}
      </div>
    </div>
  );
};

export default Tags;
