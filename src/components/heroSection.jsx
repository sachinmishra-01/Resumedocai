// src/components/heroSection.jsx

import { analyzeResume } from "../api/geminiApi";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/HeroSection.png";

const HeroSection = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const handleDelete = () => {
    setUploadedFile(null);
  };

  const handleNavigate = async () => {
    if (!uploadedFile) {
      console.log("HeroSection: No file uploaded, cannot analyze.");
      return;
    }

    setIsLoading(true); // Set loading to true when analysis starts
    console.log("HeroSection: Attempting to analyze file:", uploadedFile.name);

    try {
      const result = await analyzeResume(uploadedFile);

      console.log("HeroSection: API call completed from frontend.");
      console.log("HeroSection: API result received in frontend:", result);

      if (!result) {
        console.error("HeroSection: API result is empty or undefined in frontend, preventing navigation.");
        return;
      }

      console.log("HeroSection: Attempting to navigate to /resume-details with result.");
      navigate("/resume-details", {
        state: {
          result,
          file: uploadedFile,
        },
      });
      console.log("HeroSection: Navigation call made (may not appear if navigation is immediate).");

    } catch (error) {
      console.error("HeroSection: Failed to analyze resume or navigate in frontend:", error);
      // Optionally, display a user-friendly error message to the user here
    } finally {
      setIsLoading(false); // Set loading to false once the process is complete (success or error)
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    disabled: !!uploadedFile || isLoading, // Disable dropzone if file is present OR if loading
  });

  return (
    <>
      {/* NEW: The Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div> {/* The CSS spinner */}
          <p>Bhai  ruk ja sabar kar le bas thoda tame lagega </p>
          <p className="text-sm mt-2">This might take a few moments...</p>
        </div>
      )}

      {/* Main Hero Section Content */}
      <section
        id="home"
        className="bg-gradient-to-br from-blue-950 to-tealblue text-white py-16 md:py-20 shadow-inner rounded-bl-[10vw]"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 text-left">
            {/* Left Side */}
            <div className="md:w-7/12 w-full space-y-6 ml-4 md:ml-8 lg:ml-12">
              <h1 className="text-3xl md:text-6xl font-bold leading-tight">
                Free ATS Resume <br /> Checker
              </h1>

              <p className="text-base md:text-lg">
                Boost your chances of getting hired with our free ATS Resume
                Checker. Instantly scan your resume against 30+ hiring criteria
                and get real-time tips to improve your score — right from your
                desktop or mobile.
              </p>

              {/* Drag and Drop Box */}
              <div
                {...getRootProps()}
                className={`border-dashed border-2 border-gray-400 rounded-xl px-6 py-8 bg-[#1a3050] text-white flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left ${
                  uploadedFile || isLoading // Disable when file is present OR loading
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer"
                }`}
              >
                <input {...getInputProps()} disabled={!!uploadedFile || isLoading} /> {/* Disable input too */}

                {/* Left Side - 50% */}
                <div className="md:basis-[50%] space-y-4">
                  <button
                    onClick={handleNavigate}
                    className={`${
                      uploadedFile
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-[#02818C] hover:bg-[#026e78]"
                    } text-white font-bold py-3 px-8 rounded-full text-lg transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} // Add styles for loading state (e.g., reduced opacity, no hover)
                    disabled={!uploadedFile || isLoading} // Disable the button while loading or no file
                  >
                    {uploadedFile ? "Check your score" : "Upload your resume"}
                  </button>
                  <p className="text-sm text-gray-200">
                    We can read:{" "}
                    <span className="font-semibold">
                      DOC, DOCX, PDF, HTML, RTF, TXT
                    </span>
                  </p>
                  {/* Removed the inline loading message here */}
                </div>

                {/* Right Side - 40% */}
                <div className="md:basis-[40%] w-full text-base font-semibold">
                  {uploadedFile ? (
                    <div className="bg-white border border-dotted border-black text-black px-4 py-2 rounded-md w-full">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold truncate">
                            {uploadedFile.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {(uploadedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <button
                          onClick={handleDelete}
                          className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          disabled={isLoading} // Disable delete button while loading
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : isDragActive ? (
                    <p className="text-blue-200">Drop your resume here...</p>
                  ) : (
                    <>
                      Drop to upload your resume or choose a file.
                      <br />
                      Max <span className="font-semibold">5MB</span> file size.
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="md:w-5/12 w-full flex justify-center">
              <img
                src={heroImage}
                alt="Hero"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;