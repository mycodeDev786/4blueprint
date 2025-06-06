"use client";

import { useEffect, useState } from "react";
import API_ENDPOINTS from "../utils/api";
import { apiRequest } from "../utils/apiHelper";
import { useSelector } from "react-redux";
import Prompt from "../components/Prompt";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";

export default function AddRecipe() {
  const [recipeType, setRecipeType] = useState("free");
  const [showPrompt, setShowPrompt] = useState(false);
  const [price, setPrice] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [buyerRestriction, setBuyerRestriction] = useState("anyone");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [stepInputs, setStepInputs] = useState([""]);
  const [ingredientInputs, setIngredientInputs] = useState([]);
  const [units, setUnits] = useState([""]); // NEW state for units
  const [combinedIngredients, setCombinedIngredients] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showDraft, setShowDraft] = useState(false);
  const [steps, setSteps] = useState("");
  const [avoid, setAvoid] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [difficultyLevel, setDifficultyLevel] = useState("");

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const clearDraft = () => {
    localStorage.removeItem("recipeDraft");
    alert("Draft cleared!");
    window.location.reload();
  };
  const loadDraft = () => {
    setShowDraft(true);
  };

  const saveDraft = () => {
    const draft = {
      recipeType,
      price,
      buyerRestriction,
      title,
      description,
      ingredients: ingredientInputs,
      units,
      steps: stepInputs,
      avoid,
      mainImage: mainImage ? URL.createObjectURL(mainImage) : null,
      additionalImages: additionalImages.map((img) => URL.createObjectURL(img)),
      currentStep,
    };
    localStorage.setItem("recipeDraft", JSON.stringify(draft));
    alert("Draft saved successfully!");
  };

  useEffect(() => {
    const savedDraft = localStorage.getItem("recipeDraft");
    if (showDraft) {
      setShowDraft(true);
      const draft = JSON.parse(savedDraft);
      setRecipeType(draft.recipeType);
      setPrice(draft.price);
      setBuyerRestriction(draft.buyerRestriction);
      setTitle(draft.title);
      setDescription(draft.description);
      setIngredientInputs(draft.ingredients);
      setUnits(draft.units);
      setStepInputs(draft.steps);
      setAvoid(draft.avoid);
      if (draft.mainImage) {
        setMainImage(draft.mainImage);
      }
      if (draft.additionalImages) {
        setAdditionalImages(
          draft.additionalImages.map((img) => new File([img], "image"))
        );
      }
      setCurrentStep(draft.currentStep || 0);
    }
  }, [showDraft]);

  useEffect(() => {
    const formattedSteps = stepInputs
      .filter((step) => step.trim() !== "")
      .map((step, idx) => ` ${idx + 1}: ${step}`)
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

  const handleDeleteImage = (indexToDelete) => {
    const updatedImages = additionalImages.filter(
      (_, index) => index !== indexToDelete
    );
    setAdditionalImages(updatedImages);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // Convert to array and limit to 3
    setAdditionalImages((prev) => {
      const newImages = [...prev, ...files].slice(0, 3); // Keep only the last 3 images
      return newImages;
    });
  };
  const user_id = useSelector((state) => state.auth.user?.id);

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
      formData.append("difficulty_level", difficultyLevel);
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

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      saveDraft();
      e.preventDefault();
      e.returnValue = ""; // For modern browsers to show confirmation
    };

    const handleRouteChange = () => {
      saveDraft();
    };

    // Add listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    router.events?.on("routeChangeStart", handleRouteChange);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events?.off("routeChangeStart", handleRouteChange);
    };
  }, [
    recipeType,
    price,
    buyerRestriction,
    title,
    description,
    ingredientInputs,
    units,
    stepInputs,
    avoid,
    mainImage,
    additionalImages,
    currentStep,
  ]);

  return (
    <div className="max-w-3xl w-full  mx-auto px-1 py-1 bg-white shadow-md rounded-lg mt-1">
      {/* Fancy Progress Bar */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Progress bar row */}
        <div className="flex items-center justify-between relative">
          {["Step 1", "Step 2", "Step 3", "Step 4", "Review"].map(
            (label, index, array) => {
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center relative z-10"
                >
                  {/* Connecting Line */}
                  {index < array.length - 1 && (
                    <div
                      className={`absolute top-5 w-full h-1 z-0 ${
                        isCompleted ? "bg-purple-500" : "bg-gray-300"
                      }`}
                      style={{ transform: "translateX(50%)", zIndex: -1 }}
                    />
                  )}

                  {/* Step Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm mb-2
              ${
                isCompleted
                  ? "bg-amber-500 text-white"
                  : isActive
                  ? "bg-amber-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }
            `}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs font-medium ${
                      isActive ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            }
          )}
        </div>

        {/* Draft button positioned under Step 4 */}
        <div className="absolute w-1/4 left-[77%] top-[100%]  mt-4 flex justify-center">
          <button
            onClick={loadDraft}
            className="text-red-700 underline  px-4 py-1"
          >
            Draft
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className=" block w-full  mx-0 space-y-4">
        {currentStep === 0 && (
          <>
            <div className="w-full  shadow-md rounded-lg mt-10">
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
                className="w-full h-44 p-5 border rounded-md"
              ></textarea>
            </div>
          </>
        )}

        {/* Step 2 - Ingredients */}
        {currentStep === 1 && (
          <>
            <div className="w-full p-1 bg-white shadow-md rounded-lg mt-10">
              {/* Ingredients Section */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Ingredients <span className="text-red-500">*</span>
                </label>

                {ingredientInputs.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4"
                  >
                    {/* Row for index and ✖ on mobile only */}
                    <div className="flex justify-between sm:hidden">
                      <p className="text-sm font-medium">{index + 1}</p>
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

                    {/* Inputs */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      {/* Index on desktop */}
                      <p className="hidden sm:block text-sm font-medium">
                        {index + 1}
                      </p>

                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleIngredientChange(index, e.target.value)
                        }
                        placeholder={`Ingredient ${index + 1}`}
                        className="flex-1 p-6 border rounded-md text-sm w-full"
                        required
                      />

                      <input
                        type="text"
                        value={units[index] || ""}
                        onChange={(e) =>
                          handleUnitChange(index, e.target.value)
                        }
                        placeholder={`Unit ${index + 1}`}
                        className="p-6 border rounded-md text-sm min-w-[6rem] w-full sm:w-auto"
                      />

                      {/* ✖ on desktop */}
                      {ingredientInputs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredientField(index)}
                          className="hidden sm:inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          ✖
                        </button>
                      )}
                    </div>
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

              <div>
                <label className="block font-medium text-gray-700 mt-4 mb-2">
                  All Ingredients (Preview)
                </label>
                <ul className="list-disc list-inside bg-gray-50 p-4 border rounded-md text-sm">
                  {combinedIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {/* Step 3 - Instructions */}
        {currentStep === 2 && (
          <>
            <div className=" w-full  p-1 bg-white shadow-md rounded-lg mt-10">
              {/* Steps Section */}
              <div>
                <label className=" font-medium text-gray-700 mb-2 flex items-center gap-2">
                  Steps to Prepare <span className="text-red-500">*</span>
                  {/* Icon to show popup */}
                  <button
                    onClick={() => setShowPopup(true)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Info about units"
                  >
                    <FaInfoCircle size={18} />
                  </button>
                </label>
                {stepInputs.map((value, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <textarea
                      value={value}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      placeholder={`Step ${index + 1}`}
                      className="flex-1 p-6 border rounded-md text-sm resize-none"
                      rows={3}
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
                  All Steps (preview)
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
              {/* Popup */}
              {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium text-gray-800">
                        Information
                      </h2>
                      <button
                        onClick={() => setShowPopup(false)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close popup"
                      >
                        ✖
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      It’s best to avoid vague phrases like "fry until golden."
                      Instead, be a bit more specific, like saying "Fry for
                      about 10 minutes until golden." This extra detail can help
                      users connect with your recipes and have a great cooking
                      experience!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Step 4 - Upload Photos */}
        {currentStep === 3 && (
          <>
            <div>
              <label className="block mt-10 text-gray-700 font-medium">
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
                    <div
                      key={index}
                      className="relative inline-block mr-2 mb-2"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-md border"
                      />
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center -mt-1 -mr-1"
                        title="Remove image"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Recipe Type
              </label>
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

            {/* ✅ New Select dropdown after recipe type */}
            <div className="mt-4">
              <label className="block ml-2  text-gray-700 font-medium">
                Select Difficulties level
              </label>
              <select
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
                className="md:w-64 w-full p-2 border rounded-md mt-1"
              >
                <option value="">Select a Difficulty</option>
                <option value="Beginner-friendly">Beginner-friendly</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <div className="p-4 bg-white border rounded mt-12 space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Review Your Recipe
            </h2>

            <div>
              <p>
                <strong>Title:</strong> {title}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>
              <p>
                <strong>Ingredients:</strong>
              </p>
              <ul className="list-disc list-inside">
                {combinedIngredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p>
                <strong>Steps:</strong>
              </p>
              <ol className="list-decimal list-inside whitespace-pre-line">
                {stepInputs.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>

            {avoid && (
              <div>
                <p>
                  <strong>Things to Avoid:</strong> {avoid}
                </p>
              </div>
            )}

            <div>
              <p>
                <strong>Recipe Type:</strong> {recipeType}
              </p>
              {recipeType === "hidden" && (
                <>
                  <p>
                    <strong>Price:</strong> ${price}
                  </p>
                  <p>
                    <strong>Buyer Restriction:</strong> {buyerRestriction}
                  </p>
                </>
              )}
            </div>

            <div>
              <p>
                <strong>Main Image:</strong>
              </p>
              {mainImage && (
                <img
                  src={URL.createObjectURL(mainImage)}
                  alt="Main"
                  className="w-32 h-32 object-cover border rounded"
                />
              )}
            </div>

            {additionalImages.length > 0 && (
              <div>
                <p>
                  <strong>Additional Images:</strong>
                </p>
                <div className="flex gap-2 mt-2">
                  {additionalImages.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Additional ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit Recipe
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Previous
            </button>
          )}
          <button
            type="button"
            onClick={saveDraft}
            className="ml-auto px-6 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
          >
            Save Draft
          </button>
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-6 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
            >
              Next
            </button>
          ) : null}
        </div>
      </form>
      <Prompt
        showPrompt={showPrompt}
        message={" Your Recipe has been added successfully "}
      />
      <Loading isLoading={loading} />
    </div>
  );
}
