const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3307/api";
const STORAGE_URL = NEXT_PUBLIC_API_BASE_URL_STORAGE || "http://localhost:3307";
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
};

export default API_ENDPOINTS;
