// src/api/geminiApi.js
export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch("http://localhost:5000/api/analyze", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze resume");
  }

  const data = await response.json();
  return data;
};
