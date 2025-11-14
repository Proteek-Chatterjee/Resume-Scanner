"use client";
import React, { useEffect, useState } from "react";
import StepProgress from "../components/StepProgress";

export default function AlternateProfilesPage() {
  const [profiles, setProfiles] = useState<
    { job_title: string; match: number }[]
  >([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem("alternate_profiles");
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          // Filter out parsing error entries
          const clean = parsed.filter(
            (p) => !p.job_title.toLowerCase().includes("error")
          );
          setProfiles(clean);
        }
      }
    } catch (e) {
      console.error("Error parsing alternate profiles:", e);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f6f2ff] overflow-hidden p-8">
      {/* ---- Step Progress ---- */}
      <div className="absolute top-0 left-0 w-full z-30">
        <StepProgress />
      </div>

      {/* ---- Header ---- */}
      <div className="mt-32 text-center">
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-4">
          Alternate Career Paths
        </h1>
        <p className="text-lg font-medium text-gray-700">
          Based on your resume, here are 5 alternate job roles that match your
          skills and experience.
        </p>
      </div>

      {/* ---- Table ---- */}
      <div className="mx-auto mt-12 w-full max-w-3xl bg-white rounded-xl shadow-xl p-6">
        {profiles && profiles.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#a8dadc] text-[#1a1a1a] text-left">
                <th className="px-6 py-3 text-lg font-semibold rounded-tl-lg">#</th>
                <th className="px-6 py-3 text-lg font-semibold">Job Title</th>
                <th className="px-6 py-3 text-lg font-semibold rounded-tr-lg">
                  Match %
                </th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-[#f0f7f8] transition"
                >
                  <td className="px-6 py-3 text-gray-800 font-semibold">
                    {i + 1}
                  </td>
                  <td className="px-6 py-3 text-gray-800 font-semibold">
                    {p.job_title}
                  </td>
                  <td
                    className={`px-6 py-3 font-bold ${
                      p.match >= 80
                        ? "text-green-600"
                        : p.match >= 60
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {p.match}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No alternate profiles found. Try re-uploading your resume.
          </p>
        )}
      </div>
    </div>
  );
}
