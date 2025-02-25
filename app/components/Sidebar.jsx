import { useState } from "react";
import Link from "next/link";
import {
  FaBook,
  FaUser,
  FaBell,
  FaHeart,
  FaCog,
  FaWallet,
  FaPlus,
} from "react-icons/fa";

const Sidebar = ({ isArtist }) => {
  return (
    <aside className="w-64 h-[calc(100vh-4rem)] text-purple-700 border-r border-gray-300 fixed left-0 top-16 bottom-16 p-6 bg-white shadow-lg z-40">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <ul className="space-y-4 ">
        <li>
          <Link
            href="/"
            className="flex items-center space-x-3 hover:text-gray-300"
          >
            <FaBook /> <span>My Cookbook</span>
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className="flex items-center space-x-3 hover:text-gray-300"
          >
            <FaUser /> <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link
            href="/notifications"
            className="flex items-center space-x-3 hover:text-gray-300"
          >
            <FaBell /> <span>Notification</span>
          </Link>
        </li>
        <li>
          <Link
            href="/followed-artists"
            className="flex items-center space-x-3 hover:text-gray-300"
          >
            <FaHeart /> <span>Followed Artist</span>
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="flex items-center space-x-3 hover:text-gray-300"
          >
            <FaCog /> <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link
            href="/wallet"
            className="flex items-center space-x-3 hover:text-gray-300"
          >
            <FaWallet /> <span>Wallet</span>
          </Link>
        </li>
      </ul>

      {isArtist && (
        <button className="mt-6 w-full bg-[#673AB7] hover:bg-green-600 text-white flex items-center justify-center space-x-2 py-2 rounded">
          <FaPlus />
          <span>Add Recipe</span>
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
