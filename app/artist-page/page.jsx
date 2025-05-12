"use client";
import { assets } from "@/assets/assets";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import API_ENDPOINTS from "../utils/api";
import { apiRequest } from "../utils/apiHelper";
import { useSearchParams } from "next/navigation";
import Loading from "../components/Loading";

const ArtistProfile = () => {
  const [loading, setLoading] = useState(true);
  const [baker, setBaker] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const Data = await apiRequest(API_ENDPOINTS.RECIPE.GET_BY_ID(id));
        setRecipes(Data);
        console.log(Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchRecipes();
  }, [id]);

  useEffect(() => {
    if (!user?.id) return; // Ensure user is logged in

    apiRequest(
      `${API_ENDPOINTS.FOLLOWERS.IS_FOLLOWING(id, user.id)}`,
      "GET",
      null
    )
      .then((response) => {
        setIsFollowed(response.isFollowing);
      })
      .catch((error) => {
        console.error("Error checking follow status:", error);
      })
      .finally(() => {});
  }, [id, user?.id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const bakerData = await apiRequest(API_ENDPOINTS.BAKER.GET_BY_ID(id));
        setBaker(bakerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  const handleFollowToggle = async () => {
    setIsFollowed((prev) => !prev);
    if (isFollowed) {
      try {
        // Dummy API call, replace with actual follow/unfollow API logic
        await apiRequest(`${API_ENDPOINTS.FOLLOWERS.UNFOLLOW}`, "POST", {
          baker_id: id,
          follower_id: user.id,
        });
      } catch (error) {
        console.error("Failed to toggle follow status:", error);
      }
    } else {
      setIsFollowed((prev) => !prev);
      try {
        // Follow API call
        await apiRequest(`${API_ENDPOINTS.FOLLOWERS.FOLLOW}`, "POST", {
          baker_id: id,
          follower_id: user.id,
        });
      } catch (error) {
        console.error("Error toggling follow status:", error);
      }
    }
  };

  const handleProfileClick = () => {
    setIsPopupOpen(true);
  };

  if (!baker) return <p>Error loading data</p>;

  return (
    <div className="max-w-md md:max-w-3xl mx-2 rounded-xl justify-center shadow-lg overflow-hidden p-2 ">
      <Loading isLoading={loading} />
      <div
        onClick={handleProfileClick}
        className="relative h-64 rounded-xl overflow-hidden"
      >
        <Image
          src={`${API_ENDPOINTS.STORAGE_URL}${baker.profile_image}`} // Remove the extra slash here
          alt="Artist background"
          fill
          className="cursor-pointer"
          style={{ objectFit: "contain" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-white">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">{user?.name}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className="mt-1 text-xs max-w-[70%]">
            <p>
              Energetic beats and catchy tunes define this vibrant music genre
            </p>
          </div>
          <div className="absolute right-4 bottom-4 bg-purple-600 p-2 rounded-lg text-center w-16">
            <span className="text-lg font-bold uppercase block">#10</span>
            <span className="text-[10px] uppercase mt-1 block">
              In the world
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">New Recipes</h3>
        <div className="mt-4 space-y-4">
          {recipes.map((album, index) => (
            <div key={index} className="flex items-center gap-4">
              <Image
                src={`${API_ENDPOINTS.STORAGE_URL}${album.mainImage}`}
                alt={album.title}
                width={50}
                height={50}
                className="rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium">{album.title}</h4>
                <p className="text-gray-500 text-sm">Recipe</p>
              </div>
              <button className="text-gray-500">⋮</button>
            </div>
          ))}
        </div>
      </div>
      {/* Follow/Unfollow Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleFollowToggle}
          className={`px-6 py-2 text-white font-semibold rounded-md ${
            isFollowed ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default ArtistProfile;
