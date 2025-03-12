"use client";
import React, { useState } from "react";
import { bakers } from "../constants/bakers"; // Assuming bakers data is in bakersData.js

export default function LeaderBoard() {
  const [sortType, setSortType] = useState("score");
  const [selectedCountry, setSelectedCountry] = useState("");

  const sortedBakers = [...bakers]
    .filter((baker) =>
      selectedCountry ? baker.country === selectedCountry : true
    )
    .sort((a, b) =>
      sortType === "score"
        ? b.score - a.score
        : a.country.localeCompare(b.country)
    );

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      {/* Filters at the Top */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="score">Sort by Score</option>
          <option value="country">Sort by Country</option>
        </select>
        <select
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Countries</option>
          {[...new Set(bakers.map((baker) => baker.country))].map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Top 3 Positions */}
      <div className="flex justify-center items-end gap-6 mb-8">
        {/* 2nd Place - Left */}
        <div className="flex flex-col items-center">
          <img
            src={sortedBakers[1].image}
            alt="2nd"
            className="w-20 h-20 rounded-full border-4 border-gray-400"
          />
          <p className="font-semibold">{sortedBakers[1].name}</p>
          <img src={sortedBakers[1].flag} alt="flag" className="w-6 h-4 mt-1" />
          <p className="text-gray-500">{sortedBakers[1].score} pts</p>
        </div>

        {/* 1st Place - Center & Higher */}
        <div className="flex flex-col items-center transform -translate-y-6">
          <img
            src={sortedBakers[0].image}
            alt="1st"
            className="w-24 h-24 rounded-full border-4 border-yellow-500"
          />
          <p className="font-bold text-lg">{sortedBakers[0].name}</p>
          <img src={sortedBakers[0].flag} alt="flag" className="w-6 h-4 mt-1" />
          <p className="text-gray-700 font-semibold">
            {sortedBakers[0].score} pts
          </p>
        </div>

        {/* 3rd Place - Right */}
        <div className="flex flex-col items-center">
          <img
            src={sortedBakers[2].image}
            alt="3rd"
            className="w-20 h-20 rounded-full border-4 border-gray-600"
          />
          <p className="font-semibold">{sortedBakers[2].name}</p>
          <img src={sortedBakers[2].flag} alt="flag" className="w-6 h-4 mt-1" />
          <p className="text-gray-500">{sortedBakers[2].score} pts</p>
        </div>
      </div>

      {/* Remaining List */}
      <div className="bg-gray-100 p-4 rounded-lg">
        {sortedBakers.slice(3).map((baker, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-2 border-b last:border-b-0"
          >
            <img
              src={baker.image}
              alt={baker.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1 text-left">
              <p className="font-medium">{baker.name}</p>
              <div className="flex items-center gap-2">
                <img src={baker.flag} alt={baker.country} className="w-6 h-4" />
                <p className="text-sm text-gray-500">{baker.country}</p>
              </div>
            </div>
            <p className="font-semibold">{baker.score} pts</p>
          </div>
        ))}
      </div>
    </div>
  );
}
