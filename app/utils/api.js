const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3307/api";
const STORAGE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL_STORAGE || "http://localhost:3307";
const API_ENDPOINTS = {
  STORAGE_URL,
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
    SIGNIN: `${BASE_URL}/auth/signin`,
    GENERATE_OTP: `${BASE_URL}/auth/generate-otp`,
    VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
    CHECK_VERIFICATION: `${BASE_URL}/auth/check-verification`,
    UPDATE_USER_VERIFICATION: `${BASE_URL}/auth/update-user-verification`,
    FACE_ID_VERIFICATION: `${BASE_URL}/auth/verify`,
    GET_VERIFICATION_DATA: `${BASE_URL}/auth/verifications`, // Get all verification data
    GET_STATUS: (userId) => `${BASE_URL}/auth/verification-status/${userId}`, //
    UPDATE_VERIFICATION_STATUS: `${BASE_URL}/auth/update-verification-status`, // Update verification status (pending -> approved/rejected)
  },
  USER: {
    PROFILE: `${BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${BASE_URL}/user/update-profile`,
  },
  CATEGORY: {
    GET_ALL: `${BASE_URL}/categories`, // Get all categories
    GET_BY_ID: (id) => `${BASE_URL}/categories/${id}`, // Get category by ID
    CREATE: `${BASE_URL}/categories`, // Create a new category
    UPDATE: (id) => `${BASE_URL}/categories/${id}`, // Update category by ID
    DELETE: (id) => `${BASE_URL}/categories/${id}`, // Delete category by ID
  },
  SUBCATEGORY: {
    CREATE: `${BASE_URL}/categories/subcategory`, // Create a subcategory
  },

  RECIPE: {
    CREATE: `${BASE_URL}/recipes`, // Create a new recipe
    GET: `${BASE_URL}/recipes`,
    GET_BY_ID: (id) => `${BASE_URL}/recipes/${id}`,
    GETALL: `${BASE_URL}/recipes/all`,
  },
  BAKER: {
    CREATE: `${BASE_URL}/bakers`, // Create a new baker
    GET_ALL: `${BASE_URL}/bakers`, // Get all bakers
    GET_BY_ID: (id) => `${BASE_URL}/bakers/${id}`, // Get baker by ID
    UPDATE: (id) => `${BASE_URL}/bakers/${id}`, // Update baker
    DELETE: (id) => `${BASE_URL}/bakers/${id}`, // Delete baker
    UPDATE_PROFILE_IMAGE: (user_id) =>
      `${BASE_URL}/bakers/${user_id}/profile-image`,
  },
  FOLLOWERS: {
    FOLLOW: `${BASE_URL}/followers/follow`, // Follow a baker
    UNFOLLOW: `${BASE_URL}/followers/unfollow`, // Unfollow a baker
    GET_FOLLOWERS: (bakerId) => `${BASE_URL}/followers/${bakerId}`, // Get followers of a baker
    GET_COUNT_BY_USER: (userId) =>
      `${BASE_URL}/followers/count/by-user/${userId}`, // Get follower count for a user
    IS_FOLLOWING: (bakerId, followerId) =>
      `${BASE_URL}/followers/is-following/${bakerId}/${followerId}`, // Check if a user follows a baker
    GET_FOLLOWED_BAKERS_WITH_NOTIFICATIONS: (userId) =>
      `${BASE_URL}/followers/follower-notifications/${userId}`,
  },
};

export default API_ENDPOINTS;
