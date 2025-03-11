import { assets } from "@/assets/assets";
import Image from "next/image";
import recipes from "../constants/recipes";

const ArtistProfile = () => {
  return (
    <div className="max-w-md md:max-w-6xl mx-2  rounded-xl shadow-lg overflow-hidden p-2">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>

          {/* Description below the title and icon with limited width */}
          <div className="mt-1 text-xs max-w-[70%]">
            <p>
              Energetic beats and catchy tunes define this vibrant music genre
            </p>
          </div>

          {/* Purple Badge positioned at bottom-right */}
          <div className="absolute right-4 bottom-4 bg-purple-600 p-2 rounded-lg text-center w-16">
            <span className="text-lg font-bold uppercase block">#10</span>
            <span className="text-[10px] uppercase mt-1 block">
              In the world
            </span>
          </div>
        </div>
      </div>

      {/* New Release Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">New Recipes</h3>
        <div className="mt-4 space-y-4">
          {recipes.map((album, index) => (
            <div key={index} className="flex items-center gap-4">
              <Image
                src={album.image}
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
    </div>
  );
};

export default ArtistProfile;
