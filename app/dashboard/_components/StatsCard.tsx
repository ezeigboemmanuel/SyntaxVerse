import React from "react";

const StatsCard = () => {
  return (
    <div>
      <h1 className="uppercase text-2xl md:text-4xl font-bold">Your Stats</h1>

      <div className="mt-7">
        <div className="grid grid-cols-1 md:grid-cols-3 bg-[#FCFCFE] rounded-lg shadow-md p-6">
          <div className="border-b md:border-r md:border-b-0 pb-2 md:pb-0 md:pr-2">
            <h3 className="text-gray-700 text-[16px] font-semibold text-left">
              Total Articles
            </h3>

            <h3 className=" text-[24px] font-bold text-left mt-4">5</h3>
          </div>

          <div className="pt-3 pb-3 md:pb-0 md:pt-0 md:pl-6">
            <h3 className="text-gray-700 text-[16px] font-semibold text-left">
              Total Reads
            </h3>

            <h3 className="text-[24px] font-bold text-left mt-4">34</h3>
          </div>

          <div className="border-t md:border-l md:border-t-0 pt-3 md:pt-0 md:pl-6">
            <h3 className="text-gray-700 text-[16px] font-semibold text-left">
              Total Likes
            </h3>

            <h3 className=" text-[24px] font-bold text-left mt-4">16</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
