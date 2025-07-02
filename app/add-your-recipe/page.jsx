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
  const [preparationMethod, setPreparationMethod] = useState("");
  const [convertedIngredients, setConvertedIngredients] = useState([]);
  const [stepImages, setStepImages] = useState([]);
  const [fullVideo, setFullVideo] = useState(null);

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

  const handleStepImageUpload = (index, file) => {
    const newImages = [...stepImages];
    newImages[index] = {
      file,
      previewUrl: URL.createObjectURL(file),
    };
    setStepImages(newImages);
  };

  const convertIngredient = async (input) => {
    try {
      const res = await fetch(API_ENDPOINTS.RECIPE.CONVERT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      console.log(data);
      return data.result || "Conversion failed";
    } catch (err) {
      console.error("Conversion error:", err);
      return "Error converting";
    }
  };

  useEffect(() => {
    const convertAll = async () => {
      const conversions = await Promise.all(
        ingredientInputs.map((input) => convertIngredient(input))
      );
      setConvertedIngredients(conversions);
    };

    convertAll();
  }, [ingredientInputs]);

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

    if (
      !title ||
      !description ||
      !ingredients ||
      stepInputs.length === 0 ||
      !mainImage
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    console.log({
      user_id,
      title,
      description,
      ingredients,
      convertedIngredients,
      avoid,
      stepInputs,
      stepImages,
      mainImage,
      recipeType,
      price,
      buyerRestriction,
      difficultyLevel,
    });

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("category_name", "1");
    formData.append("subcategory_name", "1");
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    formData.append("combinedIngredients", convertedIngredients);
    formData.append("avoid_tips", avoid);
    formData.append("mainImage", mainImage);
    formData.append("recipe_type", recipeType);
    formData.append("price", recipeType === "hidden" ? price : 0);
    formData.append("buyer_restriction", buyerRestriction);
    formData.append("difficulty_level", difficultyLevel);

    // Step-by-step with optional images
    const formattedSteps = stepInputs.map((stepText, i) => ({
      text: stepText,
      imageIndex: stepImages[i] ? i : null,
    }));
    formData.append("steps", JSON.stringify(formattedSteps));

    // Upload step images
    stepImages.forEach((img) => {
      formData.append("stepImages", img);
    });

    // Upload additional images
    additionalImages.forEach((img) => {
      formData.append("additionalImages", img);
    });

    // Upload full video if available
    if (fullVideo) {
      formData.append("fullVideo", fullVideo);
    }

    try {
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
            <div className="w-full shadow-md rounded-lg mt-10">
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

            <div className="mt-6">
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

            <div className="mt-6">
              <label className="block text-gray-700 font-medium mb-2">
                How will you add steps of Preparation of your creation?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="preparationMethod"
                    value="pictures"
                    checked={preparationMethod === "pictures"}
                    onChange={(e) => setPreparationMethod(e.target.value)}
                  />
                  <span>Step by step pictures</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="preparationMethod"
                    value="video"
                    checked={preparationMethod === "video"}
                    onChange={(e) => setPreparationMethod(e.target.value)}
                  />
                  <span>Full video</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="preparationMethod"
                    value="both"
                    checked={preparationMethod === "both"}
                    onChange={(e) => setPreparationMethod(e.target.value)}
                  />
                  <span>Both step by step pictures and full video</span>
                </label>
              </div>
            </div>
          </>
        )}

        {/* Step 2 - Ingredients */}
        {currentStep === 1 && (
          <>
            <div className="w-full py-4 px-1  shadow-md rounded-lg mt-10">
              {/* Ingredients Section */}
              <div>
                <label className="block font-medium text-gray-700 mb-4 text-lg">
                  Ingredients <span className="text-red-500">*</span>
                </label>

                {ingredientInputs.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center w-full gap-2 px-4 py-3 rounded-md "
                  >
                    {/* Reorder Icon (static visual) */}
                    <div className="text-gray-400 cursor-default">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 9h8M8 15h8"
                        />
                      </svg>
                    </div>

                    {/* Index (hidden on mobile) */}

                    <textarea
                      value={value}
                      onChange={(e) => {
                        handleIngredientChange(index, e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      placeholder={`Ingredient ${index + 1}`}
                      className="w-full p-2 rounded-md text-sm resize-none outline-none focus:ring-0 focus:border-transparent"
                      rows={1}
                      required
                    />

                    {/* ✖ Remove Button */}
                    {ingredientInputs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredientField(index)}
                        className="text-red-500 hover:text-red-700 text-lg"
                        title="Remove"
                      >
                        ✖
                      </button>
                    )}
                  </div>
                ))}

                {/* Add Ingredient Button */}
                <button
                  type="button"
                  onClick={addIngredientField}
                  className="mt-2 flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  <span className="text-lg mr-1">+</span> Add Ingredient
                </button>
              </div>

              {/* Original Preview */}
              <div className="mt-6">
                <label className="block font-medium text-gray-700 mb-2">
                  Original Ingredients Preview
                </label>
                <ul className="list-disc list-inside bg-gray-50 p-4 border rounded-md text-sm">
                  {ingredientInputs.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              {/* Converted Preview */}
              <div className="mt-4">
                <label className="block font-medium text-gray-700 mb-2">
                  Converted Ingredients Preview
                </label>
                <ul className="list-disc list-inside bg-gray-50 p-4 border rounded-md text-sm">
                  {convertedIngredients.map((converted, index) => (
                    <li key={index}>{converted}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {/* Step 3 - Instructions */}
        {currentStep === 2 && (
          <>
            {/* Conditionally Render Step-by-Step UI */}

            {preparationMethod === "video" && (
              <div className="w-full p-1 bg-white shadow-md rounded-lg mt-10">
                <div>
                  <label className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    Steps to Prepare <span className="text-red-500">*</span>
                    <button
                      onClick={() => setShowPopup(true)}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Info about units"
                    >
                      <FaInfoCircle size={18} />
                    </button>
                  </label>

                  {stepInputs.map((value, index) => (
                    <div key={index} className="w-full px-4 py-3 rounded-md">
                      {/* Flex row for step text input + remove button */}
                      <div className="flex items-center gap-2 w-full">
                        {/* Static reorder icon */}
                        <div className="text-gray-400 cursor-default">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 9h8M8 15h8"
                            />
                          </svg>
                        </div>

                        {/* Step text input */}
                        <textarea
                          value={value}
                          onChange={(e) => {
                            handleStepChange(index, e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                          }}
                          placeholder={`Step ${index + 1}`}
                          className="w-full p-2 rounded-md text-sm resize-none outline-none focus:ring-0 focus:border-transparent"
                          rows={1}
                          required
                        />

                        {/* Remove button */}
                        {stepInputs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeStepField(index)}
                            className="text-red-500 hover:text-red-700 text-lg"
                            title="Remove"
                          >
                            ✖
                          </button>
                        )}
                      </div>

                      {/* File upload (below the flex row) */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleStepImageUpload(index, e.target.files[0])
                        }
                        className="mt-2 text-sm"
                      />
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

                <div>
                  <label className="block font-medium text-gray-700 mt-4 mb-2">
                    All Steps (preview)
                  </label>
                  <textarea
                    required
                    value={steps}
                    readOnly
                    className="w-full p-2 border py-4 h-40 rounded-md text-sm"
                    placeholder="Saved steps will appear here..."
                  ></textarea>
                </div>
              </div>
            )}

            {(preparationMethod === "pictures" ||
              preparationMethod === "both") && (
              <div className="w-full p-1 bg-white shadow-md rounded-lg mt-10">
                <div>
                  <label className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    Steps to Prepare <span className="text-red-500">*</span>
                    <button
                      onClick={() => setShowPopup(true)}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Info about units"
                    >
                      <FaInfoCircle size={18} />
                    </button>
                  </label>

                  {stepInputs.map((value, index) => (
                    <div key={index} className="w-full px-4 py-3 rounded-md">
                      {/* Flex row for step text input + remove button */}
                      <div className="flex items-center gap-2 w-full">
                        {/* Static reorder icon */}
                        <div className="text-gray-400 cursor-default">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 9h8M8 15h8"
                            />
                          </svg>
                        </div>

                        {/* Step text input */}
                        <textarea
                          value={value}
                          onChange={(e) => {
                            handleStepChange(index, e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                          }}
                          placeholder={`Step ${index + 1}`}
                          className="w-full p-2 rounded-md text-sm resize-none outline-none focus:ring-0 focus:border-transparent"
                          rows={1}
                          required
                        />

                        {/* Remove button */}
                        {stepInputs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeStepField(index)}
                            className="text-red-500 hover:text-red-700 text-lg"
                            title="Remove"
                          >
                            ✖
                          </button>
                        )}
                      </div>

                      {/* File upload (below the flex row) */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleStepImageUpload(index, e.target.files[0])
                        }
                        className="mt-2 text-sm"
                      />
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

                <div className="mt-6">
                  <label className="block font-medium text-gray-700 mb-2">
                    All Steps (Preview)
                  </label>

                  <div className="w-full p-4 border rounded-md bg-gray-50 space-y-4 max-h-96 overflow-y-auto">
                    {stepInputs.map((stepText, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 bg-white p-3 rounded shadow-sm"
                      >
                        {/* Step Image Preview */}
                        {stepImages[index]?.previewUrl && (
                          <img
                            src={stepImages[index].previewUrl}
                            alt={`Step ${index + 1}`}
                            className="w-24 h-24 object-cover rounded border"
                          />
                        )}

                        {/* Step Text */}
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">
                            Step {index + 1}
                          </p>
                          <p className="text-sm text-gray-600 whitespace-pre-line">
                            {stepText}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Full Video Upload */}
            {(preparationMethod === "video" ||
              preparationMethod === "both") && (
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Full Video <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoUpload(e.target.files[0])}
                  className="block w-full text-sm"
                />
              </div>
            )}

            {/* Optional Section */}
            <div className="mt-6">
              <label className="block text-gray-700 font-medium">
                Things to avoid (optional)
              </label>
              <textarea
                value={avoid}
                onChange={(e) => setAvoid(e.target.value)}
                className="w-full p-2 border rounded-md"
              ></textarea>
            </div>

            {/* Info Popup */}
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
                    Avoid vague phrases like "fry until golden." Instead, use
                    details such as "Fry for about 10 minutes until golden
                    brown." This helps users follow your recipe accurately.
                  </p>
                </div>
              </div>
            )}
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
