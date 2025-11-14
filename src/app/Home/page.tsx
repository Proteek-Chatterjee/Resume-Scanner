import Image from "next/image";
import Link from "next/link";

export default function Page2() {
  return (
    <div className="flex flex-col min-h-screen bg-[#eeedf3] relative overflow-hidden">
      {/* Hero + Features (Main content) */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className="flex justify-between items-center mt-16 px-20">
          <div className="max-w-[600px] space-y-6">
            <h1 className="text-3xl font-semibold text-[#1a1a1a]">
              Land Your Dream Job with AI-Powered Resume Optimization
            </h1>
            <p className="text-[#1a1a1a] text-[16px] font-semibold">
              Scan your resume like top ATS systems do, get instant feedback, and
              optimize it with AI to beat the bots & impress recruiters.
            </p>

            <Link href="/ResumeUploader">
              <button className="bg-[#a8dadc] border border-black text-[#1a1a1a] text-lg font-semibold rounded-md px-8 py-3 hover:bg-[#8cced0] transition">
                Scan Resume
              </button>
            </Link>
          </div>

          <div className="flex space-x-6">
            <Image
              src="/Rectangle 2.png"
              alt="Resume Example"
              className="w-[309px] h-[440px] object-cover rounded-md shadow-lg"
              width={309}
              height={400}
            />
            <Image
              src="/Rectangle 3.png"
              alt="Resume Example 2"
              className="w-[261px] h-[372px] object-cover rounded-md shadow-lg"
              width={261}
              height={372}
            />
          </div>
        </div>

        {/* Features Title */}
        <div className="text-3xl font-semibold bg-gradient-to-r from-black to-[#654597] bg-clip-text text-transparent text-center mt-40">
          Features & Benefits
        </div>

        {/* Feature Cards */}
        <div className="flex flex-wrap justify-center gap-10 mt-12 px-10 pb-20">
          {[
            {
              src: "/material-symbols-document-search-outline-rounded0.svg",
              text: "ATS Compatibility Check – Scans resumes against Applicant Tracking Systems to ensure formatting, keywords, and structure are compliant.",
            },
            {
              src: "/group0.svg",
              text: "AI-Powered Resume Score – Gives a detailed score with breakdowns (skills, keywords, formatting, impact).",
            },
            {
              src: "/group1.svg",
              text: "Job Description Matching – Compares your resume with a specific job description to highlight missing skills and keywords.",
            },
            {
              src: "/lsicon-path-filled0.svg",
              text: "Career Path Suggestions – The AI analyzes your skills and recommends other roles you’re qualified for.",
            },
            {
              src: "/group2.svg",
              text: "AI Content Generation – Suggests optimized bullet points, summaries, and cover letters based on your input.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#a8dadc] w-[370px] h-[215px] p-6 rounded-lg relative shadow-md"
            >
              <div className="bg-[#e5d6f2] w-[70px] h-[70px] rounded-full absolute left-1/2 -translate-x-1/2 top-5"></div>
              <Image
                src={item.src}
                alt="Feature Icon"
                width={50}
                height={50}
                className="absolute left-1/2 -translate-x-1/2 top-8"
              />
              <p className="text-[#1a1a1a] text-[16px] font-semibold mt-[85px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer (sticks to bottom) */}
      <footer className="bg-[#a8dadc] w-full py-10 px-12 flex justify-between text-[16px] font-semibold text-black shadow-lg">
        <div>
          Home<br />
          Features <br />
          Reviews <br />
          FAQ <br />
          About Us
        </div>
        <div>
          Privacy Policy<br />
          Terms & Conditions<br />
          Cookie Policy <br />
        </div>
        <div>
          Contact Us
        </div>
      </footer>
    </div>
  );
}
