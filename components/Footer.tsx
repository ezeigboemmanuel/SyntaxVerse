import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#262626] max-w-[1400px] mx-auto rounded-t-2xl md:rounded-t-3xl text-gray-300 p-5 pt-10 md:pt-20 md:px-16">
      <div className="flex flex-col md:flex-row pb-8 md:pb-16 md:space-x-28 lg:space-x-52 md:justify-between lg:px-10">
        <div className="mb-8 basis-1/2">
          <p className="font-bold text-xl text-white font-mono mb-2">Ztheta</p>
          <p className="md:text-lg">
            Ztheta is a collaborative platform where users can create and share
            tech blogs, offering insights on the latest trends, tools, and
            innovations in the tech industry.
          </p>
        </div>
        <div>
          <div>
            <p className="mb-3">OUR NEWSLETTER</p>
            <h2 className="text-gray-100 text-2xl md:text-3xl lg:text-4xl">
              JOIN 2M+ Techies For Weekly Updates and Insights
            </h2>
          </div>

          <div className="mt-4 md:mt-6">
            <form className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-3 ps-4 text-sm text-gray-300 border border-gray-500 rounded-full bg-transparent"
                  placeholder="Enter your email"
                  required
                />
                <button
                  type="submit"
                  className="text-white rounded-full absolute end-[5px] bottom-[5px] px-5 bg-[#6C40FE] hover:bg-[#6134f3] font-medium text-sm py-2"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <hr className="mt-6 mb-6 border-gray-600" />

      <div className="w-full max-w-screen-xl mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="mb-4">
            <Link
              href="/"
              className="font-semibold font-serif text-xl md:text-2xl"
            >
              SyntaxVerse
            </Link>
            <span className="text-xs">
              {" "}
              by{" "}
              <Link
                href="https://zgboportfolio.vercel.app"
                target="_blank"
                className="hover:underline"
              >
                Emmanuel Ezeigbo
              </Link>
            </span>
          </div>

          <ul className="flex flex-wrap items-center text-sm font-medium text-gray-200 mb-0">
            <li>
              <Link
                href="/"
                className="hover:underline font-[500] me-2 md:me-6"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:underline font-[500] me-2 md:me-6"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/ezeigbo-emmanuel-88393a202/"
                target="_blank"
                className="hover:underline font-[500] me-2 md:me-6"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="https://x.com/zgbocode"
                target="_blank"
                className="hover:underline font-[500] me-2 md:me-6"
              >
                Twitter/X
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
