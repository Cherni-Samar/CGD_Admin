const API_URL = "http://localhost:3001/api";

export const getGallery = async () => {
  const res = await fetch(`${API_URL}/gallery`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
    },
  });
  return res.json();
};

export const uploadGallery = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetch(`${API_URL}/gallery/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
    },
    body: formData,
  });
};

export const deleteImage = async (id: string) => {
  return fetch(`${API_URL}/gallery/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
    },
  });
};

export const updateImageType = async (id: string, type: "before" | "after") => {
  return fetch(`${API_URL}/gallery/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type }),
  });
};