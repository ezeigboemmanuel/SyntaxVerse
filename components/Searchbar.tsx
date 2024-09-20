"use client";

import { usePathname, useRouter} from "next/navigation";
import queryString from "query-string";

const Searchbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          search: e.target.value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };
  return (
    <div className="w-full mx-auto pl-1 md:pl-8">
      <form className="w-full">
        <div className="w-full flex justify-center items-center space-x-2">
          <div className="relative w-full mr-1 md:mr-4">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full max-w-[500px] px-3 py-2 ps-10 text-sm text-gray-900 border-gray-300 border-b bg-transparent outline-none active:outline-none"
              placeholder="Search Syntaxverse"
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
