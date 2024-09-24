import React from "react";

interface StatsCardProps{
  totalArticles: number;
  totalReads: number;
  totalLikes: number;
}
const StatsCard = ({totalArticles, totalReads, totalLikes}: StatsCardProps) => {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold">Your Stats</h1>

      <div className="mt-7">
        <div className="grid grid-cols-1 md:grid-cols-3 bg-[#FCFCFE] rounded-lg shadow-sm p-6">
          <div className="border-b md:border-r md:border-b-0 pb-2 md:pb-0 md:pr-2">
            <h3 className="text-gray-700 text-left">
              Total Articles
            </h3>

            <h3 className=" text-[24px] font-bold text-left mt-4">{totalArticles}</h3>
          </div>

          <div className="pt-3 pb-3 md:pb-0 md:pt-0 md:pl-6">
            <h3 className="text-gray-700 text-left">
              Total Reads
            </h3>

            <h3 className="text-[24px] font-bold text-left mt-4">{totalReads}</h3>
          </div>

          <div className="border-t md:border-l md:border-t-0 pt-3 md:pt-0 md:pl-6">
            <h3 className="text-gray-700 text-left">
              Total Likes
            </h3>

            <h3 className=" text-[24px] font-bold text-left mt-4">{totalLikes}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
