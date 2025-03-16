import Link from "next/link";
import { FaBook, FaBell, FaPlus, FaHeart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

const BottomTab = () => {
  const user = useSelector((state) => state.auth.user);
  const userType = user?.userType;
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#673AB7] text-white flex justify-between items-center px-4 py-2 md:hidden">
      <div className="flex justify-between w-full relative">
        <Link href="/cookbook" className="flex flex-col items-center flex-1">
          <FaBook className="text-xl" />
          <span className="text-xs">Cookbook</span>
        </Link>

        <Link
          href="/notifications"
          className="flex flex-col items-center flex-1"
        >
          <FaBell className="text-xl" />
          <span className="text-xs">Notifications</span>
        </Link>

        {/* Placeholder for the center item to maintain spacing */}
        <div className="flex-1 relative">
          <Link
            href={userType === "baker" ? "/addrecipe" : "/"}
            className="absolute left-1/2 transform -translate-x-1/2 bg-white text-gray-500 p-3 rounded-full shadow-lg -top-5"
          >
            <FaPlus
              className={`text-2xl  ${
                userType === "baker" ? "text-[#673AB7]" : "text-gray-500"
              }`}
            />
          </Link>
        </div>

        <Link
          href="/followed-artists"
          className="flex flex-col items-center flex-1"
        >
          <FaHeart className="text-xl" />
          <span className="text-xs">Artists</span>
        </Link>

        <Link
          href={userType === "artist" ? "/artistProfile" : "/userProfile"}
          className="flex flex-col items-center flex-1"
        >
          <FaUser className="text-xl" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomTab;
