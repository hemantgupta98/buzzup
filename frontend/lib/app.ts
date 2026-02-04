const API = "http://localhost:5000/api";


export const api = async (url: string, method = "GET", body?:unknown) => {
  const token = localStorage.getItem("token");
  const res = await fetch(API + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
};
