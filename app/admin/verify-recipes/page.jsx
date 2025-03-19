"use client";
import API_ENDPOINTS from "@/app/utils/api";
import { useEffect, useState } from "react";

export default function RecipesVerify() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedSubcategories, setSelectedSubcategories] = useState({});

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.RECIPE.GET);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.CATEGORY.GET_ALL);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchRecipes();
    fetchCategories();
  }, []);

  const handleUpdateCategory = async (recipeId) => {
    try {
      const res = await fetch(`${API_ENDPOINTS.RECIPE.GET}/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe_id: recipeId,
          category_name: selectedCategories[recipeId],
          subcategory_name: selectedSubcategories[recipeId],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update category");

      console.log("Category updated successfully:", data);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleCategoryChange = (recipeId, categoryName) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [recipeId]: categoryName,
    }));
    setSelectedSubcategories((prev) => ({
      ...prev,
      [recipeId]: "",
    }));
  };

  const handleSubcategoryChange = (recipeId, subcategoryName) => {
    setSelectedSubcategories((prev) => ({
      ...prev,
      [recipeId]: subcategoryName,
    }));
  };

  const handleUpdate = async (recipeId) => {
    await handleUpdateCategory(recipeId);
  };

  const handleDelete = async (recipeId) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const res = await fetch(`${API_ENDPOINTS.RECIPE.DELETE}/${recipeId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete recipe");

      setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading recipes...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => {
          const selectedCategoryId =
            selectedCategories[recipe.id] || recipe.category_name;
          const availableSubcategories =
            categories.find((cat) => cat.name == selectedCategoryId)
              ?.subcategories || [];

          return (
            <div key={recipe.id} className="bg-white shadow-md rounded-lg p-4">
              {recipe.mainImage && (
                <img
                  src={`${API_ENDPOINTS.STORAGE_URL}${recipe.mainImage}`}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <h2 className="text-xl font-semibold mt-4">{recipe.title}</h2>
              <p className="text-gray-600 mt-2">{recipe.description}</p>
              <p className="mt-2">
                <strong>Category:</strong>
                <select
                  className="ml-2 border p-1 rounded"
                  value={selectedCategoryId}
                  onChange={(e) =>
                    handleCategoryChange(recipe.id, e.target.value)
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </p>
              <p className="mt-2">
                <strong>Subcategory:</strong>
                <select
                  className="ml-2 border p-1 rounded"
                  value={
                    selectedSubcategories[recipe.id] || recipe.subcategory_name
                  }
                  onChange={(e) =>
                    handleSubcategoryChange(recipe.id, e.target.value)
                  }
                  disabled={!selectedCategoryId}
                >
                  <option value="">Select Subcategory</option>
                  {availableSubcategories.map((sub) => (
                    <option key={sub.name} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </p>

              <p className="mt-2">
                <strong>Recipe Type:</strong> {recipe.recipe_type}
              </p>
              <p className="mt-2">
                <strong>Price:</strong> ${recipe.price}
              </p>
              <p className="mt-2">
                <strong>Buyer Restriction:</strong> {recipe.buyer_restriction}
              </p>
              <h3 className="font-semibold mt-4">Ingredients:</h3>
              <p className="text-gray-700">{recipe.ingredients}</p>
              <h3 className="font-semibold mt-4">Steps:</h3>
              <p className="text-gray-700">{recipe.steps}</p>
              <h3 className="font-semibold mt-4">Avoid Tips:</h3>
              <p className="text-gray-700">{recipe.avoid_tips}</p>
              {recipe.additionalImages.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold">Additional Images:</h3>
                  <div className="flex gap-2 mt-2">
                    {recipe.additionalImages.map((img, index) => (
                      <img
                        key={index}
                        src={`${API_ENDPOINTS.STORAGE_URL}${img}`}
                        alt={`Recipe ${index}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleUpdate(recipe.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
