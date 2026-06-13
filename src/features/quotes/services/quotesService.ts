const API_URL = "http://localhost:3001/api";

const getToken = () => localStorage.getItem("jwt");

export const getQuotes = async () => {
  const res = await fetch(`${API_URL}/quotes`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Failed fetch quotes");
  return res.json();
};

export const updateQuoteStatus = async (id: string, status: string) => {
  await fetch(`${API_URL}/quotes/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  });
};

export const deleteQuote = async (id: string) => {
  await fetch(`${API_URL}/quotes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};