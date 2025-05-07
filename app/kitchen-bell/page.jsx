"use client";
import { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import Image from "next/image";
import { useSelector } from "react-redux";
import API_ENDPOINTS from "../utils/api";

export default function Notifications() {
  const [popup, setPopup] = useState(null);
  const popupRef = useRef(null);
  const [bakers, setBakers] = useState([]);
  const user = useSelector((state) => state.auth.user);

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

  useEffect(() => {
    const fetchBakers = async () => {
      //setLoading(true);
      try {
        const res = await fetch(
          API_ENDPOINTS.FOLLOWERS.GET_FOLLOWED_BAKERS_WITH_NOTIFICATIONS(
            user?.id
          )
        );
        const data = await res.json();
        setBakers(data);
      } catch (error) {
        console.error("Error fetching bakers:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchBakers();
  }, [user?.id]);

  return (
    <div className="flex w-full md:max-w-screen-2xl  justify-center h-screen">
      <div className=" md:block  w-full md:max-w-screen-sm flex shadow-lg ">
        {/* Scrollable Artist List */}

        {/* Scrollable Artist List */}
        <ul className="pr-2 w-full px-4 ">
          {bakers.length > 0 ? (
            bakers.map((artist) => (
              <li
                key={artist.baker_id} // or artist.id based on your API response
                className="relative flex items-center justify-between mb-3 p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <Image
                    src={`${API_ENDPOINTS.STORAGE_URL}${artist.profile_image}`}
                    alt={artist.baker_name} // Alt text for the profile image
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium flex-1">
                    {artist.baker_name}
                  </span>

                  {/* Show Bell Icon Only If New Posts Exist */}
                  {artist.new_recipe_count > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPopup(
                          popup?.baker_id === artist.baker_id ? null : artist
                        );
                      }}
                      className="relative p-1 hover:text-red-600"
                    >
                      <FaBell className="text-lg text-red-500" />
                      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                        {artist.new_recipe_count}
                      </span>
                    </button>
                  )}

                  {/* Small Popup (Appears Above Bell Icon & Fully Visible) */}
                  {popup?.baker_id === artist.baker_id && (
                    <div
                      ref={popupRef}
                      className="absolute right-0 top-[-60px] bg-[#673AB7] text-white p-3 rounded-lg shadow-lg text-sm max-w-[200px] z-50"
                    >
                      <div className="absolute bottom-[-8px] right-5 border-8 border-transparent border-t-gray-800"></div>
                      <p className="font-medium">
                        {artist.baker_name} added {artist.new_recipe_count} new
                        recipe
                        {artist.new_recipe_count > 1 ? "s" : ""}.
                      </p>
                      <p className="text-xs text-gray-300">
                        Visit their profile to explore more!
                      </p>
                    </div>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500 py-4">
              No notifications were received at this time{" "}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
