export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    // --- THIS IS THE UPDATED LINE ---
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/analyze`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to analyze resume");
    }

    const rawText = await response.text();
    const cleanedText = rawText.replace(/```json\n?|\n?```/g, "");
    return JSON.parse(cleanedText);
    
  } catch (error) {
    console.error("Error in analyzeResume API call:", error);
    throw error;
  }
};