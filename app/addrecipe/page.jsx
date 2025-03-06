"use client";

import { useState } from "react";

export default function AddRecipe() {
  const [recipeType, setRecipeType] = useState("free");
  const [price, setPrice] = useState("");
  const [buyerRestriction, setBuyerRestriction] = useState("anyone");

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold  text-center text-[#673AB7] mb-4">
        Add Recipe
      </h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            What is the name of your creation?{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Please provide a brief introduction{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            required
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            List of ingredients <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            required
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Steps to prepare <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            required
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Things to avoid (optional)
          </label>
          <textarea className="w-full p-2 border rounded-md"></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Upload primary photo <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="file"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Upload additional photos (Optional, max 3)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Recipe Type</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="free"
                checked={recipeType === "free"}
                onChange={() => setRecipeType("free")}
                className="mr-2"
              />
              Free Recipe
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="hidden"
                checked={recipeType === "hidden"}
                onChange={() => setRecipeType("hidden")}
                className="mr-2"
              />
              Hidden Recipe
            </label>
          </div>
        </div>

        {recipeType === "hidden" && (
          <div className="space-y-4 p-4 border rounded-md bg-gray-50">
            <div>
              <label className="block text-gray-700 font-medium">
                How much are you selling this recipe for?
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                To whom do you want to sell?
              </label>
              <select
                value={buyerRestriction}
                onChange={(e) => setBuyerRestriction(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="anyone">Anyone</option>
                <option value="non-national">
                  Anyone who does not share my nationality
                </option>
              </select>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#673AB7] text-white p-2 rounded-md hover:bg-[#673AB7]"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}
