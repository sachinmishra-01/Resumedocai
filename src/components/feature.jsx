import React from "react";
import {
  Settings2,
  SpellCheck,
  User,
  Target,
  Lightbulb,
  LayoutTemplate,
  Ruler,
  Phone,
  CheckSquare,
} from "lucide-react";

const features = [
  {
    icon: <Settings2 className="w-8 h-8 text-red-500" />,
    title: "Customization",
    description:
      "Input a job title to extract essential skills, keywords, and certifications to include on your resume, which helps show hiring managers you are an excellent fit for the role.",
  },
  {
    icon: <SpellCheck className="w-8 h-8 text-blue-500" />,
    title: "Spelling and Grammar",
    description:
      "Your resume must be free of spelling and grammar errors. Our resume score checker catches any mistakes that you may have missed.",
  },
  {
    icon: <User className="w-8 h-8 text-yellow-500" />,
    title: "Summary Statement",
    description:
      "A summary statement at the top of your resume is a great opportunity to grab the hiring manager’s attention with a brief snapshot of your top skills and qualifications.",
  },
  {
    icon: <Target className="w-8 h-8 text-blue-500" />,
    title: "Measurable Results",
    description:
      "Your resume should include measurable accomplishments that demonstrate concrete achievements from your past roles and set you apart from the competition.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    title: "Word Choice",
    description:
      "Effective resumes use action verbs to make a powerful impact. Omit personal pronouns, filler words, and colloquial language from your resume.",
  },
  {
    icon: <LayoutTemplate className="w-8 h-8 text-red-500" />,
    title: "Formatting",
    description:
      "Your resume format should be polished and visually appealing for hiring managers and optimized for accurate ATS parsing.",
  },
  {
    icon: <Ruler className="w-8 h-8 text-yellow-500" />,
    title: "Optimal Length",
    description:
      "Aim for one page or around 1,100 characters. This length allows employers to scan for essential information without weeding through unnecessary details.",
  },
  {
    icon: <Phone className="w-8 h-8 text-blue-500" />,
    title: "Contact Information",
    description:
      "Your contact information needs to be displayed on your resume to make it easy for employers to get in touch. Include at least two methods of contact.",
  },
  {
    icon: <CheckSquare className="w-8 h-8 text-green-500" />,
    title: "Comprehensiveness",
    description:
      "A comprehensive resume includes contact information, a summary or objective statement, relevant skills, and a professional history.",
  },
];

const Features = () => {
  return (
    <div className="bg-customBlue">
        {/* <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 relative rounded-tr-[10vw] "> */}
      <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 relative rounded-br-[10vw]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl  text-blue-900">
              What Our ATS Resume Scanner Checks
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Our resume grader scans your existing or freshly built resume for
              the following criteria and provides feedback on optimizing it for
              both ATS and human readers.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-gray-100 rounded-full p-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-4 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* </div> */}
    </div>
  );
};

export default Features;
