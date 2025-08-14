import React from "react";
import { Lightbulb, UploadCloud, ScanSearch, FileText } from "lucide-react";
import step from "../assets/step.png";

const AboutUs = () => {
  return (
    <div className="bg-tealblue">
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 relative rounded-tr-[10vw] ">
        <div className="max-w-4xl mx-auto space-y-1">
          {/* Section: About Me */}
          <div className="text-center space-y-4 pb-11">
            <h2 className="text-3xl sm:text-4xl  text-blue-900">
              Why You Need an ATS-Friendly Resume
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              An Applicant Tracking System (ATS) is software that companies use
              to screen resumes. It automatically filters out candidates before
              a human ever sees their application.
            </p>
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-md shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <Lightbulb
                  className="h-6 w-6 text-yellow-500"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-yellow-800">PRO TIP</h3>
                <p className="mt-2 text-base text-yellow-700">
                  On average, **only 15% of resumes** make it past ATS and into
                  the hands of a hiring manager. Your resume must be optimized
                  for both robots and humans.
                </p>
              </div>
            </div>
          </div>

          <div className="w-95 p-10">
            <img
              src={step}
              alt="steps"
              className=" rounded-lg"
            />
          </div>

          <div className="mt-20 space-y-8 text-gray-700">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl  text-blue-900">
              How Our AI Analysis Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Leveraging Google's Gemini AI for Your Resume Success
            </p>
          </div>
          <div className="space-y-10">
            {/* Step 1 Detail */}
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              <span className="font-bold text-gray-900">1. Text Extraction:</span> You upload your resume (PDF, DOCX, etc.), and our system uses a robust library (`pdfjs-dist`) to accurately convert it into plain text.
            </p>
            {/* Step 2 Detail */}
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              <span className="font-bold text-gray-900">2. AI Analysis:</span> This text is securely sent to the **Google Gemini API**, which analyzes it against dozens of ATS criteria, recruiter expectations, and formatting best practices.
            </p>
            {/* Step 3 Detail */}
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              <span className="font-bold text-gray-900">3. Actionable Report:</span> The AI generates a comprehensive report with an overall score, a summary, and specific, actionable solutions to fix problems and highlight your strengths, which is then displayed for you instantly.
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
