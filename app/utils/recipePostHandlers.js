export const handleFollow = (setFollowers, setIsFollowed) => {
  setFollowers((prev) => prev + 1);
  setIsFollowed((prev) => !prev);
};

export const handleHide = (setIsHidden) => {
  setIsHidden(true);
};

export const handleBuyNow = (dispatch, recipe) => {
  dispatch(addToCart({ ...recipe, quantity: 1 }));
};

export const handleWishlist = (setIsWishlisted) => {
  setIsWishlisted((prev) => !prev);
};

export const handleShare = (title) => {
  if (navigator.share) {
    navigator
      .share({
        title,
        text: `Check out this recipe: ${title}!`,
        url: window.location.href,
      })
      .catch(console.error);
  } else {
    alert("Sharing is not supported in your browser.");
  }
};

export const handleReport = () => {
  alert("Report submitted! Thank you for your feedback.");
};

export const handleFlagClick = (setIsPopupOpen) => {
  setIsPopupOpen(true);
};

export const getRatingLabel = (rating) => {
  if (rating > 90) return "Excellent";
  if (rating > 80) return "Very Good";
  if (rating > 70) return "Good";
  if (rating > 60) return "Best";
  if (rating > 50) return "Satisfactory";
  return "Poor";
};

export const closePopup = (setIsPopupOpen) => {
  setIsPopupOpen(false);
};

export const renderStars = (rating) => {
  return "★".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "☆" : "");
};
