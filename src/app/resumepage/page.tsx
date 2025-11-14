"use client";
import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import StepProgress from "../components/StepProgress";

export default function ResumePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const ats = localStorage.getItem("ats_result");
    const opt = localStorage.getItem("optimized_resume");

    const atsData = ats ? JSON.parse(ats) : {};
    const optData = opt ? JSON.parse(opt) : {};

    setAtsScore(atsData.ats_score ?? null);
    setData(optData);
  }, []);

  const sections = [
    { title: "Missing Keywords", key: "missing_keywords" },
    { title: "Improvement Areas", key: "improvement_areas" },
    { title: "Formatting Tips", key: "formatting_tips" },
    { title: "Skill Gaps", key: "skill_gaps" },
    { title: "Experience Highlights", key: "experience_highlights" },
    { title: "Final Recommendations", key: "final_recommendations" },
  ];

  return (
    <div className="relative min-h-screen bg-[#f6f2ff] overflow-hidden p-8">
      {/* ---- Step Progress ---- */}
      <div className="absolute top-0 left-0 w-full z-30">
        <StepProgress />
      </div>

      {/* --- ATS Score Widget --- */}
      <div className="absolute left-16 top-56">
        <div className="relative w-[158px] h-[155px] bg-[#a8dadc] rounded-[10px] shadow-lg flex items-center justify-center">
          <div className="absolute w-[100px] h-[100px] rounded-full bg-gradient-to-b from-[#457b9d] to-[#7adaaf] flex items-center justify-center">
            <span className="text-3xl font-semibold text-[#457b9d] bg-white px-3 py-2 rounded-full">
              {atsScore ?? "—"}
            </span>
          </div>
        </div>
        <p className="mt-3 text-lg font-bold text-gray-800">ATS SCORE</p>
      </div>

      {/* --- Accordion Section --- */}
      <div className="mx-auto mt-48 w-full max-w-3xl bg-white rounded-xl shadow-xl p-6 flex flex-col gap-4">
        {sections.map((section, index) => (
          <AccordionItem
            key={index}
            title={section.title}
            open={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {Array.isArray(data?.[section.key]) ? (
              <div className="flex flex-wrap gap-2">
                {data?.[section.key].length > 0 ? (
                  data?.[section.key].map((item: string, i: number) => (
                    <span
                      key={i}
                      className="bg-[#a8dadc] text-[#1a1a1a] px-3 py-1 rounded-md font-medium"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600">No items found.</p>
                )}
              </div>
            ) : (
              <p className="text-gray-700 whitespace-pre-wrap">
                {data?.[section.key] || "No suggestions available."}
              </p>
            )}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}

/* ---------- Accordion Item ---------- */
function AccordionItem({
  title,
  children,
  open,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-[#a8dadc] rounded-lg p-4 cursor-pointer transition-all">
      <div className="flex items-center justify-between" onClick={onToggle}>
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        {open ? (
          <ChevronUp className="text-[#1a1a1a]" />
        ) : (
          <ChevronDown className="text-[#1a1a1a]" />
        )}
      </div>
      {open && <div className="mt-3 border-t border-gray-400 pt-3">{children}</div>}
    </div>
  );
}
