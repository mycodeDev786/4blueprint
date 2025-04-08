"use client";
import { assets } from "@/assets/assets";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import API_ENDPOINTS from "../utils/api";
import { apiRequest } from "../utils/apiHelper";

const ArtistProfile = () => {
  const [loading, setLoading] = useState(true);
  const [baker, setBaker] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const Data = await apiRequest(API_ENDPOINTS.RECIPE.GET_BY_ID(user.id));
        setRecipes(Data);
        console.log(Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user.id) fetchRecipes();
  }, [user.id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const bakerData = await apiRequest(
          API_ENDPOINTS.BAKER.GET_BY_ID(user.id)
        );
        setBaker(bakerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user.id) fetchData();
  }, [user.id]);

  const handleProfileClick = () => {
    console.log(user.id);
    setIsPopupOpen(true);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      await apiRequest(
        API_ENDPOINTS.BAKER.UPDATE_PROFILE_IMAGE(user.id),
        "POST",
        formData
      );

      setIsPopupOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setSelectedFile(null);
  };

  if (loading) return <p>Loading...</p>;
  if (!baker || !user) return <p>Error loading data</p>;

  return (
    <div className="max-w-md md:max-w-3xl mx-2 rounded-xl justify-center shadow-lg overflow-hidden p-2 ">
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

      {isPopupOpen && (
        <div
          className=" top-14 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleCancel} // Close popup when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside popup
          >
            <h2 className="text-lg font-semibold mb-4">
              Change Profile Picture
            </h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsPopupOpen(false)} // Close when clicking "Cancel"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSubmit(); // Submit the file
                  setIsPopupOpen(false); // Close popup after submitting
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistProfile;
