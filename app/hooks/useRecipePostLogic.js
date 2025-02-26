import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { bakers } from "../constants/bakers";

export const useRecipePostLogic = (date, bakerId) => {
  const [expanded, setExpanded] = useState(false);
  const [displayDate, setDisplayDate] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const baker = bakers.find((b) => b.id === bakerId);
  const [followers, setFollowers] = useState(baker?.followers || 0);
  const [isFollowed, setIsFollowed] = useState(baker?.isFollowed);

  useEffect(() => {
    const formattedDate = dayjs(date);
    const today = dayjs();
    const yesterday = today.subtract(1, "day");

    if (formattedDate.isSame(today, "day")) {
      setDisplayDate("Today");
    } else if (formattedDate.isSame(yesterday, "day")) {
      setDisplayDate("Yesterday");
    } else {
      setDisplayDate(formattedDate.format("MMM D, YYYY"));
    }
  }, [date]);

  return {
    expanded,
    displayDate,
    isPopupOpen,
    isHidden,
    isWishlisted,
    followers,
    isFollowed,
    setExpanded,
    setIsPopupOpen,
    setIsHidden,
    setIsWishlisted,
    setFollowers,
    setIsFollowed,
  };
};
