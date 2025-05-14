"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import ArtistProfileCard from "../components/ArtistProfileCard";
import API_ENDPOINTS from "../utils/api";

export default function VerifiedBakers() {
  const [bakers, setBakers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBakers = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_ENDPOINTS.BAKER.GET_ALL);
        const data = await res.json();
        console.log(data);
        setBakers(data);
      } catch (error) {
        console.error("Error fetching bakers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBakers();
  }, []);

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
