"use client";

import { useEffect, useState } from "react";
import API_ENDPOINTS from "../../utils/api";
import { apiRequest } from "../../utils/apiHelper";
import Image from "next/image";

export default function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [image, setImage] = useState(null);
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await apiRequest(API_ENDPOINTS.CATEGORY.GET_ALL);
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim() || !image) return;

    try {
      const formData = new FormData();
      formData.append("name", newCategory);
      formData.append("image", image);

      await apiRequest(API_ENDPOINTS.CATEGORY.CREATE, "POST", formData);

      setNewCategory("");
      setImage(null);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await apiRequest(API_ENDPOINTS.CATEGORY.DELETE(id), "DELETE");
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const addSubcategory = async () => {
    if (!newSubcategory.trim() || !selectedCategory) return;
    try {
      await apiRequest(API_ENDPOINTS.SUBCATEGORY.CREATE, "POST", {
        name: newSubcategory,
        category_id: selectedCategory,
      });
      setNewSubcategory("");
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Categories Section */}
      <div className="bg-white p-5 rounded-lg shadow-lg mb-5">
        <h2 className="text-2xl font-semibold mb-3">Manage Categories</h2>
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="New Category"
            className="border p-2 rounded w-full"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={addCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Display Categories and Subcategories */}
        <ul className="mt-3">
          {categories.map((category) => (
            <li key={category.id} className="border-b p-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{category.name}</span>
                {category.image && (
                  <Image
                    width={12}
                    height={12}
                    src={category.image}
                    alt={category.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
              {/* Subcategories */}
              {category.subcategories.length > 0 && (
                <ul className="ml-5 mt-2">
                  {category.subcategories.map((sub) => (
                    <li key={sub.id} className="text-sm text-gray-600">
                      - {sub.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Subcategories Section */}
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">Manage Subcategories</h2>
        <div className="flex space-x-3">
          <select
            className="border p-2 rounded w-1/3"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="New Subcategory"
            className="border p-2 rounded w-full"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
          />
          <button
            onClick={addSubcategory}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
