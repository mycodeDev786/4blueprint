"use client";
import { useState } from "react";
import Image from "next/image";
import { bakers } from "../constants/bakers";
import BakerProfileCard from "../components/BakerProfileCard";

export default function List() {
  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl text-center">
      <h1 className="text-3xl font-bold mb-6">Meet Our Bakers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bakers.map((baker) => (
          <BakerProfileCard key={baker.id} baker={baker} />
        ))}
      </div>
    </div>
  );
}
