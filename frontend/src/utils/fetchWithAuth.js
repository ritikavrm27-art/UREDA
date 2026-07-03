import BASE_URL from "../config";

export const fetchWithAuth = async (
  url,
  options = {},
  navigate
) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (response.status === 401) {
    alert("Session expired. Please login again.");
    navigate("/login");
    throw new Error("Session Expired");
  }

  return response;
};