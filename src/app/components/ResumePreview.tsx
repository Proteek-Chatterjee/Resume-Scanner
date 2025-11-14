"use client";
import { useState } from "react";

export default function ResumePreview() {
  const [resume, setResume] = useState({
    name: "JENNIFER WATSON",
    title: "USER EXPERIENCE DESIGNER",
    about: "My name is Henry Watson, a passionate UX designer...",
    contact: "Email: hello@example.com | Phone: +91 1234567890",
  });

  const handleChange = (field: string, value: string) => {
    setResume({ ...resume, [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl p-10 shadow-lg w-[60%]">
      <input
        type="text"
        value={resume.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="text-2xl font-bold w-full text-center mb-2 outline-none border-b border-gray-300"
      />
      <input
        type="text"
        value={resume.title}
        onChange={(e) => handleChange("title", e.target.value)}
        className="text-md w-full text-center text-gray-600 mb-8 outline-none border-b border-gray-200"
      />
      <textarea
        value={resume.about}
        onChange={(e) => handleChange("about", e.target.value)}
        className="w-full p-3 border rounded-md outline-none h-40 text-gray-700 resize-none"
      />
      <textarea
        value={resume.contact}
        onChange={(e) => handleChange("contact", e.target.value)}
        className="w-full p-3 border rounded-md outline-none h-20 text-gray-700 resize-none mt-4"
      />
    </div>
  );
}
