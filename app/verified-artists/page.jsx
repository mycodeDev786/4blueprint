"use client";
import { useState } from "react";
import Image from "next/image";
import { bakers } from "../constants/bakers";
import ArtistProfileCard from "../components/ArtistProfileCard";

export default function VerifiedBakers() {
  return (
    <div className=" bg-white shadow-lg rounded-2xl text-center">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {bakers.map((baker) => (
          <ArtistProfileCard key={baker.id} artist={baker} />
        ))}
      </div>
    </div>
  );
}
