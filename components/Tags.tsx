"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

const Tags = () => {
  const tags = [
    "All Articles",
    "Web Development",
    "UI/UX",
    "Backend Development",
    "APIs",
    "Frontend Development",
  ];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const categoryQuery = category || "All Articles";

  const handleClick = (tag: string) => {
    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          category: tag,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };
  return (
    <div className="pt-4">
      <div>
        {tags.map((tag) => (
          <div
            key={tag}
            onClick={() => handleClick(tag)}
            className={`mr-2 mb-2 px-5 py-1.5 inline-flex text-xs md:text-base rounded-full border border-gray-600 text-gray-600 hover:bg-[#6C40FE] hover:text-white hover:border-white cursor-pointer ${categoryQuery == tag && "bg-[#6C40FE] text-white border-white"}`}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
