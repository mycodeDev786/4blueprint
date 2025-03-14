const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3307/api";

const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
    SIGNIN: `${BASE_URL}/auth/signin`,
    GENERATE_OTP: `${BASE_URL}/auth/generate-otp`,
    VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
  },
  USER: {
    PROFILE: `${BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${BASE_URL}/user/update-profile`,
  },
};

export default API_ENDPOINTS;
