import Link from "next/link";
import { FaBook, FaBell, FaPlus, FaHeart, FaUser } from "react-icons/fa";

const BottomTab = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#673AB7] text-white flex justify-between items-center px-4 py-2 md:hidden">
      <Link href="/cookbook" className="flex flex-col items-center">
        <FaBook className="text-xl" />
        <span className="text-xs">Cookbook</span>
      </Link>

      <Link href="/notifications" className="flex flex-col items-center">
        <FaBell className="text-xl" />
        <span className="text-xs">Notifications</span>
      </Link>

      <Link
        href="/add-recipe"
        className="bg-green-500 text-white p-3 rounded-full shadow-lg -mt-6"
      >
        <FaPlus className="text-2xl" />
      </Link>

      <Link href="/followed-artists" className="flex flex-col items-center">
        <FaHeart className="text-xl" />
        <span className="text-xs">Artists</span>
      </Link>

      <Link href="/profile" className="flex flex-col items-center">
        <FaUser className="text-xl" />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
};

export default BottomTab;
