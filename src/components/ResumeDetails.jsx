// src/components/ResumeDetails.jsx

import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const ResumeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const uploadedFile = location.state?.file;

  const [pageImageUrl, setPageImageUrl] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderFirstPageAsImage = async () => {
      if (!uploadedFile) return;

      const fileType = uploadedFile.type;
      if (fileType !== "application/pdf") return;

      const reader = new FileReader();

      reader.onload = async function () {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;

        const imageUrl = canvas.toDataURL();
        setPageImageUrl(imageUrl);
      };

      reader.readAsArrayBuffer(uploadedFile);
    };

    renderFirstPageAsImage();
  }, [uploadedFile]);

  if (!result) {
    return (
      <div className="p-6 text-center">
        <p>No result found. Please go back and upload your resume again.</p>
        <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Top Horizontal Banner */}
      <div className="w-full bg-gradient-to-br from-blue-950 to-tealblue text-white py-8 px-4 text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold">You’re almost there!</h1>
        <p className="text-sm md:text-base mt-2">We’ll help you enhance your resume and impress hiring managers.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 px-4 pb-10 max-w-7xl mx-auto">
        {/* Resume Score */}
        <div className="w-full md:w-[20%] bg-gray-100 rounded shadow min-h-[300px]">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-center md:text-left">Resume Score</h2>
          </div>
          <div className="p-4">
            <p className="text-3xl font-semibold text-green-600 mt-2 text-center md:text-left">{result.score}/ 100</p>
            <h3 className="text-lg font-bold mb-2 text-center md:text-left">Problems Found:</h3>
            <ul className="list-disc list-inside text-red-600 space-y-1">
              {result.problems?.length > 0 ? (
                result.problems.map((problem, index) => <li key={index}>{problem}</li>)
              ) : (
                <li className="text-center md:text-left">No major issues detected</li>
              )}
            </ul>
          </div>
        </div>

        {/* AI Feedback Summary */}
        <div className="w-full md:w-[30%] bg-white rounded shadow min-h-[300px] overflow-auto">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-center md:text-left">AI Feedback Summary</h2>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1 text-center md:text-left">Summary</h3>
            <p className="mb-4 text-sm md:text-base text-center md:text-left">{result.summary}</p>

            <h3 className="text-lg font-semibold mb-1 text-center md:text-left">Solutions</h3>
            <ul className="list-disc list-inside mb-4 text-sm md:text-base text-center md:text-left">
              {result.solutions?.length > 0 ? (
                result.solutions.map((tip, index) => <li key={index}>{tip}</li>)
              ) : (
                <li>No suggestions found</li>
              )}
            </ul>

            <h3 className="text-lg font-semibold mb-1 text-center md:text-left">Highlights</h3>
            <ul className="list-disc list-inside text-sm md:text-base text-center md:text-left">
              {result.highlights?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="w-full md:w-[50%] bg-white rounded shadow min-h-[300px] overflow-auto">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-center md:text-left">Resume Preview</h2>
          </div>
          <div className="p-4">
            {pageImageUrl ? (
              <img src={pageImageUrl} alt="Resume First Page" className="w-full h-auto border" />
            ) : (
              <p className="text-gray-500 text-center">Loading preview...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDetails;