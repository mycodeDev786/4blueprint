"use client";

import { useEffect, useState } from "react";
import API_ENDPOINTS from "../utils/api";
import { apiRequest } from "../utils/apiHelper";
import { useSelector } from "react-redux";
import Prompt from "../components/Prompt";
import Loading from "../components/Loading";

export default function AddRecipe() {
  const [recipeType, setRecipeType] = useState("free");
  const [showPrompt, setShowPrompt] = useState(false);
  const [price, setPrice] = useState("");
  const [buyerRestriction, setBuyerRestriction] = useState("anyone");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [stepInputs, setStepInputs] = useState([""]);
  const [ingredientInputs, setIngredientInputs] = useState([]);
  const [units, setUnits] = useState([""]); // NEW state for units
  const [combinedIngredients, setCombinedIngredients] = useState([]);

  const [steps, setSteps] = useState("");
  const [avoid, setAvoid] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const formattedSteps = stepInputs
      .filter((step) => step.trim() !== "")
      .map((step, idx) => `Step ${idx + 1}: ${step}`)
      .join("\n");
    setSteps(formattedSteps);
  }, [stepInputs]);

  const handleStepChange = (index, value) => {
    const updated = [...stepInputs];
    updated[index] = value;
    setStepInputs(updated);
  };

  const addStepField = () => {
    setStepInputs([...stepInputs, ""]);
  };

  const removeStepField = (index) => {
    const updated = stepInputs.filter((_, i) => i !== index);
    setStepInputs(updated);
  };

  useEffect(() => {
    const cleaned = ingredientInputs.filter((i) => i.trim() !== "");
    setIngredients(cleaned.join(", ")); // your original live preview

    // Optional: for backend use
    const combined = ingredientInputs.map((ing, i) => {
      const unit = units[i]?.trim();
      return unit ? `${ing.trim()} (${unit})` : ing.trim();
    });
    setCombinedIngredients(combined);
  }, [ingredientInputs, units]);
  const handleIngredientChange = (index, value) => {
    const updated = [...ingredientInputs];
    updated[index] = value;
    setIngredientInputs(updated);
  };

  const handleUnitChange = (index, value) => {
    const updated = [...units];
    updated[index] = value;
    setUnits(updated);
  };
  const addIngredientField = () => {
    setIngredientInputs([...ingredientInputs, ""]);
    setUnits([...units, ""]);
  };
  const removeIngredientField = (index) => {
    setIngredientInputs(ingredientInputs.filter((_, i) => i !== index));
    setUnits(units.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // Convert to array and limit to 3
    setAdditionalImages((prev) => {
      const newImages = [...prev, ...files].slice(0, 3); // Keep only the last 3 images
      return newImages;
    });
  };
  const user_id = useSelector((state) => state.auth.user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !ingredients || !steps || !mainImage) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("user_id", user_id); // Replace with actual user ID
    formData.append("category_name", "1"); // Replace with actual category ID
    formData.append("subcategory_name", "1"); // Replace with actual subcategory ID
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    formData.append("combinedIngredients", combinedIngredients);
    formData.append("avoid_tips", avoid);
    formData.append("mainImage", mainImage);
    formData.append("steps", steps);
    formData.append("recipe_type", recipeType);
    formData.append("price", recipeType === "hidden" ? price : 0);
    formData.append("buyer_restriction", buyerRestriction),
      additionalImages.forEach((file, index) => {
        formData.append(`additionalImages`, file);
      });

    try {
      // Replace with actual token
      const response = await apiRequest(
        API_ENDPOINTS.RECIPE.CREATE,
        "POST",
        formData
      );
      setLoading(false);
      setShowPrompt(true);
      setTimeout(() => {
        setShowPrompt(false);
      }, 2500);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting recipe:", error);
      alert("Failed to submit recipe.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center text-[#673AB7] mb-4">
        Add Recipe
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            What is the name of your creation?{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Please provide a brief introduction{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <div className="space-y-4">
          {/* Ingredients Section */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Ingredients <span className="text-red-500">*</span>
            </label>
            {ingredientInputs.map((value, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2"
              >
                <p className="text-sm font-medium">{index + 1}</p>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  placeholder={`Ingredient ${index + 1}`}
                  className="flex-1 p-2 border rounded-md text-sm w-full"
                  required
                />
                <input
                  type="text"
                  value={units[index] || ""}
                  onChange={(e) => handleUnitChange(index, e.target.value)}
                  placeholder={`Unit ${index + 1}`}
                  className="p-2 border rounded-md text-sm min-w-[6rem] w-full sm:w-auto"
                />
                {ingredientInputs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredientField(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    ✖
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addIngredientField}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm"
            >
              + Add Ingredient
            </button>
          </div>

          {/* Live-updated textarea */}
          <div>
            <label className="block font-medium text-gray-700 mt-4 mb-2">
              All Ingredients
            </label>
            <textarea
              required
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-2 border py-4 h-40 rounded-md text-sm"
              readOnly
              placeholder="Saved ingredients will appear here..."
            ></textarea>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          {/* Steps Section */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Steps to Prepare <span className="text-red-500">*</span>
            </label>
            {stepInputs.map((value, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  className="flex-1 p-2 border rounded-md text-sm"
                  required
                />
                {stepInputs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStepField(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    ✖
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addStepField}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm"
            >
              + Add Step
            </button>
          </div>

          {/* Live-updated steps textarea */}
          <div>
            <label className="block font-medium text-gray-700 mt-4 mb-2">
              All Steps (read-only)
            </label>
            <textarea
              required
              value={steps}
              readOnly
              onChange={(e) => setSteps(e.target.value)}
              className="w-full p-2 border py-4 h-40 rounded-md text-sm"
              placeholder="Saved steps will appear here..."
            ></textarea>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Things to avoid (optional)
          </label>
          <textarea
            value={avoid}
            onChange={(e) => setAvoid(e.target.value)}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Upload primary photo <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            required
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files[0])}
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
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-md"
          />
          <div className="mt-4 flex gap-2">
            {additionalImages.length > 0 &&
              additionalImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md border"
                />
              ))}
          </div>
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
              <div className="flex items-center w-full border rounded-md overflow-hidden">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 outline-none"
                />
                <span className="px-3 bg-gray-100 text-gray-600 border-l">
                  USD
                </span>
              </div>
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
          className="w-full bg-[#673AB7] text-white p-2 rounded-md hover:bg-[#5A2EA6]"
        >
          Submit Recipe
        </button>
      </form>
      <Prompt
        showPrompt={showPrompt}
        message={" Your Recipe has been added successfully "}
      />
      <Loading isLoading={loading} />
    </div>
  );
}
