"use client"
import React, { useState } from "react";

const Tags = () => {
  const [active, setActive] = useState("All Articles")
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
          <div key={tag} onClick={() => setActive(tag)} className={`mr-2 mb-2 px-5 py-1.5 inline-flex text-xs md:text-base rounded-full border border-gray-600 text-gray-600 hover:bg-[#6C40FE] hover:text-white hover:border-white cursor-pointer ${active == tag && "bg-[#6C40FE] text-white border-white"}`}>{tag}</div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
