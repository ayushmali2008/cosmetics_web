const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiCall = async (endpoint, options = {}) => {
  try {
    const isFormData =
      typeof FormData !== "undefined" && options.body instanceof FormData;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...getAuthHeaders(),
        ...options.headers,
      },
    });

    const text = await response.text();
    const parsedBody = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const message =
        parsedBody?.message ||
        parsedBody?.error ||
        (response.status === 404 && "Resource not found") ||
        (response.status === 401 && "Unauthorized access") ||
        (response.status === 500 && "Server error. Please try again later.") ||
        `HTTP error! status: ${response.status}`;

      throw new Error(message);
    }

    return parsedBody;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error("Network error. Please check your connection.");
    }

    throw error;
  }
};

export const get = (endpoint) => {
  return apiCall(endpoint, { method: "GET" });
};

export const post = (endpoint, data) => {
  return apiCall(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const postForm = (endpoint, formData) => {
  return apiCall(endpoint, {
    method: "POST",
    body: formData,
  });
};

export const put = (endpoint, data) => {
  return apiCall(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const putForm = (endpoint, formData) => {
  return apiCall(endpoint, {
    method: "PUT",
    body: formData,
  });
};

export const patch = (endpoint, data = {}) => {
  return apiCall(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const del = (endpoint) => {
  return apiCall(endpoint, { method: "DELETE" });
};
