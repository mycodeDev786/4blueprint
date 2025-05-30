"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import BakerProfileCard from "../components/BakerProfileCard";

import { useSelector } from "react-redux";
import API_ENDPOINTS from "../utils/api";
import Loading from "../components/Loading";

export default function FollowedArtists() {
  const [bakers, setBakers] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchBakers = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          API_ENDPOINTS.FOLLOWERS.GET_FOLLOWED_BAKERS_WITH_NOTIFICATIONS(
            user?.id
          )
        );
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
  }, [user?.id]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl text-center">
      <Loading isLoading={loading} />
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bakers.map((baker) => (
          <BakerProfileCard key={baker.baker_id} baker={baker} />
        ))}
      </div>
    </div>
  );
}
