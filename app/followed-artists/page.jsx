"use client";
import { useState } from "react";
import Image from "next/image";
import { bakers } from "../constants/bakers";
import BakerProfileCard from "../components/BakerProfileCard";

export default function FollowedArtists() {
  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl text-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bakers.map((baker) => (
          <BakerProfileCard key={baker.id} baker={baker} />
        ))}
      </div>
    </div>
  );
}
