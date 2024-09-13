import React from "react";
import StatsCard from "./_components/StatsCard";
import BlogList from "@/components/BlogList";
import PopularBlogs from "./_components/PopularBlogs";

const DashboardPage = () => {
  return (
    <div className="py-10">
      <StatsCard />

      <PopularBlogs />
    </div>
  );
};

export default DashboardPage;
