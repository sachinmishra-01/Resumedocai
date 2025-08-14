export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

 
  const token = localStorage.getItem('token');
  const headers = {};
  // Add the Authorization header only if a token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: headers,
      body: formData,
    });

    if (!response.ok) {
      // Try to get a more specific error message from the backend
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to analyze resume");
    }

    // 4. Handle the response as text to clean it before parsing (more robust)
    const rawText = await response.text();
    const cleanedText = rawText.replace(/```json\n?|\n?```/g, "");
    return JSON.parse(cleanedText);
    
  } catch (error) {
    console.error("Error in analyzeResume API call:", error);
    throw error; // Re-throw the error so the component can see it
  }
};