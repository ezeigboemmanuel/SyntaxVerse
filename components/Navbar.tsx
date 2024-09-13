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

const Navbar = () => {
  return (
    <div className="flex justify-between items-center max-w-[1400px] mx-auto px-3 md:px-6 py-4 md:py-6 border-b shadow-sm">
      <div className="flex items-center space-x-3 w-full">
        <Link href="/">
          <label className="font-semibold cursor-pointer">Ztheta</label>
        </Link>
        <div className="w-full">
          <Searchbar />
        </div>
      </div>

      <section className="flex justify-between">
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden md:flex space-x-4 w-full text-gray-800">
            <Link href="/dashboard">
              <p className="hidden md:inline-block hover:underline ml-3">
                Dashboard
              </p>
            </Link>
            <Link href="/profile">
              <p className="hidden md:inline-block hover:underline">Profile</p>
            </Link>
            <Link href="/">
              <p className="hidden md:inline-block hover:underline text-nowrap">
                Log out
              </p>
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Settings className="stroke-[1.5] md:hidden h-5 w-5" />
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
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <Button className="rounded-full hidden md:flex">
              Sign in to write{" "}
              <SquarePen className="ml-2 stroke-[1.5] w-5 h-5" />
            </Button>

            <SquarePen className="ml-1 stroke-[1.5] md:hidden h-5 w-5" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
