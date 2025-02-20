"use client";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold">Search Results</h1>
      <p className="text-gray-600 mt-2">Showing results for: <strong>{query}</strong></p>
      {/* 🔥 TODO: Fetch and display search results */}
    </div>
  );
}
