export async function apiRequest(
  endpoint,
  method = "GET",
  data = null,
  token = null
) {
  const options = { method, headers: {} };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (data) {
    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(endpoint, options);
    const result = await response.json();

    console.log("API Response:", result); // Debugging line

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}
