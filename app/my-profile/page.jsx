"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { assets } from "@/assets/assets";
import Image from "next/image";
import ArtistProfile from "../artistProfile/page";
export default function userProfile() {
  const user = useSelector((state) => state.auth.user);
  const userType = user?.userType;
  return userType === "baker" ? (
    <>
      {" "}
      <ArtistProfile />
    </>
  ) : (
    <div className="max-w-4xl px-0 sm:px-6 md:px-12 lg:px-16 xl:px-24 space-y-6">
      {/* Artist Section */}

      <div className="relative h-64 rounded-xl overflow-hidden">
        {/* Background Image */}
        <Image
          src={assets.user_icon}
          alt="Artist background"
          fill
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Content Container - Pushed to bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-white">
          {/* Title and Verified Icon - Side by Side */}
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">Taylor Swift</h1>
            {/* <svg
           xmlns="http://www.w3.org/2000/svg"
           className="h-4 w-4 text-blue-400"
           viewBox="0 0 24 24"
           fill="currentColor"
         >
           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
         </svg> */}
          </div>
        </div>
      </div>

      {/* user Section */}
      <div className="mt-6 mx-4 md:mx-0 p-4 md:p-6 bg-white shadow-lg rounded-xl transition-all duration-200 hover:shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-gray-700">
          <div className="space-y-2">
            <p className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <span className="font-medium text-gray-600 text-sm md:text-base">
                Email:
              </span>
              <span className="text-gray-900 text-sm md:text-base break-all">
                Admin@gmail.com
              </span>
            </p>
            <p className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <span className="font-medium text-gray-600 text-sm md:text-base">
                Mobile:
              </span>
              <span className="text-gray-900 text-sm md:text-base">
                +12345667
              </span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <span className="font-medium text-gray-600 text-sm md:text-base">
                Country:
              </span>
              <span className="text-gray-900 text-sm md:text-base">USA</span>
            </p>
            <p className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <span className="font-medium text-gray-600 text-sm md:text-base">
                Wallet Balance:
              </span>
              <span className="text-green-600 font-semibold text-sm md:text-base">
                $25
              </span>
            </p>
          </div>
        </div>

        <button className="mt-5 md:mt-6 w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 md:py-3.5 px-4 md:px-6 rounded-lg md:rounded-xl font-semibold  text-xs md:text-base hover:from-purple-700 hover:to-purple-800 transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          Change Account to Artist
        </button>
      </div>
    </div>
  );
}
