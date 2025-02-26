import { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import Image from "next/image";
import { bakers } from "../constants/bakers";

export default function RightSidebar() {
  const [popup, setPopup] = useState(null);
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopup(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" hidden md:block w-80 bg-white p-4 fixed right-0 top-16 h-[calc(100vh-4rem)] shadow-lg overflow-y-auto z-40">
      <h2 className="text-lg font-semibold mb-4">Followed Artists</h2>

      {/* Scrollable Artist List */}
      <ul className="pr-2">
        {bakers.map((artist) => (
          <li
            key={artist.id}
            className="relative flex items-center justify-between mb-3 p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3 flex-1">
              <Image
                src={artist.image}
                alt={artist.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-sm font-medium flex-1">{artist.name}</span>

              {/* Show Bell Icon Only If New Posts Exist */}
              {artist.newPosts > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopup(popup?.id === artist.id ? null : artist);
                  }}
                  className="relative p-1 hover:text-red-600"
                >
                  <FaBell className="text-lg text-red-500" />
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                    {artist.newPosts}
                  </span>
                </button>
              )}

              {/* Small Popup (Appears Above Bell Icon & Fully Visible) */}
              {popup?.id === artist.id && (
                <div
                  ref={popupRef}
                  className="absolute right-0 top-[-60px] bg-[#673AB7] text-white p-3 rounded-lg shadow-lg text-sm max-w-[200px] z-50"
                >
                  <div className="absolute bottom-[-8px] right-5 border-8 border-transparent border-t-gray-800"></div>
                  <p className="font-medium">
                    {artist.name} added {artist.newPosts} new recipe
                    {artist.newPosts > 1 ? "s" : ""}.
                  </p>
                  <p className="text-xs text-gray-300">
                    Visit their profile to explore more!
                  </p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
