import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-tealblue">
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 relative rounded-r-[10vw] ">

      <div className="max-w-4xl mx-auto space-y-1">

        {/* Section: About Me */}
 <div className="w-full bg-white py-12 px-6 sm:px-12 text-center">
  <h2 className="text-4xl sm:text-5xl font-extrabold inline-block  px-4 py-2 rounded">
    Why you should use an ATS resume checker
  </h2>

  <ul className="mt-10 space-y-6 text-left text-lg max-w-4xl mx-auto text-blue-900 list-disc list-inside">
    <li>
      The reality of today’s digitized hiring process is that job seekers must optimize their resumes for human readers and automated screening software.
    </li>
    <li>
      Our ATS scanner gives job seekers the feedback they need to craft an{" "}
      <a href="#" className="font-semibold underline hover:text-blue-900">
        ATS-friendly resume
      </a>{" "}
      that lands interviews.
    </li>
    <li>
      Using a resume builder helps you craft a top-performing resume that passes ATS screening and wows hiring managers.
    </li>
  </ul>
</div>




       <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-8 sm:p-10 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-blue-900 sm:text-5xl">
              How This Website Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Leveraging AI for Your Resume Success
            </p>
          </div>
          <div className="space-y-8 text-gray-700">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Resume</h3>
                <p className="text-lg leading-relaxed">
                  You simply upload your resume in a common format like PDF, DOCX, or TXT. Our system is designed to handle various document types to ensure accessibility.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">AI-Powered Analysis</h3>
                <p className="text-lg leading-relaxed">
                  Once uploaded, our backend processes your document. For PDFs, we use a robust text extraction library (`pdfjs-dist`) to convert your resume into plain text. This text is then securely sent to the **Google Gemini API**.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Instant, Actionable Feedback</h3>
                <p className="text-lg leading-relaxed">
                  The Gemini AI model analyzes your resume against key ATS (Applicant Tracking System) criteria, common recruiter expectations, and best practices. It then generates a comprehensive report including:
                </p>
                <ul className="list-disc list-inside mt-2 text-base leading-relaxed space-y-1">
                  <li>An overall **Score** out of 10.</li>
                  <li>A concise **Summary** of strengths and weaknesses.</li>
                  <li>Specific **Problems** identified in your resume.</li>
                  <li>Actionable **Solutions** to address each problem.</li>
                  <li>Key **Highlights** that make your resume stand out.</li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">View Your Detailed Report</h3>
                <p className="text-lg leading-relaxed">
                  The generated analysis is immediately displayed on a dedicated "Resume Details" page, allowing you to review your score, feedback, and a preview of your uploaded resume, all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
};

export default AboutUs;