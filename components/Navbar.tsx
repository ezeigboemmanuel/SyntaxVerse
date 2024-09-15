"use client";
import { Button } from "./ui/button";
import {
  ChartColumnBig,
  Settings,
  SquarePen,
  User,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Searchbar from "./Searchbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const currentUser = useQuery(api.users.getCurrentUser);
  const router = useRouter();
  useEffect(() => {
    const userSetup = async () => {
      if (currentUser === undefined) {
        return;
      }
      if (isSignedIn && user) {
        // Check if signed in
        if (currentUser) {
          return;
        } else {
          // Go to profile setup
          router.push("/profile/setup");
        }
      }
    };

    userSetup();
  }, [isSignedIn, user, currentUser]);

  return (
    <div className="flex justify-between items-center max-w-[1400px] mx-auto px-3 md:px-6 py-4 md:py-6 border-b shadow-sm">
      <div className="flex items-center space-x-3 w-full">
        <Link href="/">
          <label className="font-semibold cursor-pointer hidden md:inline-block">
            <span className="text-[#6C40FE]">S</span>yntax
            <span className="text-[#6C40FE]">V</span>erse
          </label>
          <label className="md:hidden font-semibold">
            <span className="text-[#6C40FE]">S</span>V
          </label>
        </Link>
        <div className="w-full">
          <Searchbar />
        </div>
      </div>

      <section className="flex justify-between">
        <div className="flex items-center space-x-2 md:space-x-4">
          {currentUser ? (
            <div className="hidden md:flex space-x-4 w-full text-gray-800">
              <Link href="/dashboard">
                <p className="hidden md:inline-block hover:underline ml-3">
                  Dashboard
                </p>
              </Link>
              <Link href={`/profile/${currentUser?._id}`}>
                <p className="hidden md:inline-block hover:underline">
                  Profile
                </p>
              </Link>
              <SignOutButton>
                <p className="hidden md:inline-block hover:underline text-nowrap">
                  Log out
                </p>
              </SignOutButton>
            </div>
          ) : (
            <></>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger>
              {user ? (
                <Settings className="stroke-[1.5] md:hidden h-5 w-5" />
              ) : (
                <></>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-gray-900 bg-[#FCFCFE]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard">
                <DropdownMenuItem>
                  <ChartColumnBig className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <SignOutButton>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            {user ? (
              <Link href="/write">
                <Button className="rounded-full hidden md:flex">
                  Write <SquarePen className="ml-2 stroke-[1.5] w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <SignInButton>
                <Button className="rounded-full hidden md:flex">
                  Sign in to write{" "}
                  <SquarePen className="ml-2 stroke-[1.5] w-5 h-5" />
                </Button>
              </SignInButton>
            )}

            {user ? (
              <Link href="/write">
                <SquarePen className="ml-1 stroke-[1.5] md:hidden h-5 w-5" />
              </Link>
            ) : (
              <SignInButton>
                <div className="rounded-full flex items-center text-xs py-1.5 px-4 bg-black text-nowrap text-white md:hidden">
                  Sign in to write{" "}
                  <SquarePen className="ml-2 stroke-[1.5] w-4 h-4" />
                </div>
              </SignInButton>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
