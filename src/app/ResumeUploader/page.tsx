"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import StepProgress from "../components/StepProgress";

export default function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [jdText, setJdText] = useState("");
  const router = useRouter();

  const BACKEND_URL = "http://127.0.0.1:8000"; // change for deployment

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please upload a resume file first.");
      return;
    }
    if (!jdText.trim()) {
      setMessage("⚠️ Please enter a job description.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      // ---------- 1️⃣ ANALYZE ----------
      const analyzeForm = new FormData();
      analyzeForm.append("resume_file", file);
      analyzeForm.append("jd_text", jdText);

      const analyzeRes = await fetch(`${BACKEND_URL}/analyze`, {
        method: "POST",
        body: analyzeForm,
      });

      if (!analyzeRes.ok) throw new Error("ATS analysis failed.");
      const analyzeData = await analyzeRes.json();

      localStorage.setItem(
        "ats_result",
        JSON.stringify({
          ats_score: analyzeData.ats_score ?? null,
          keywords: analyzeData.keywords ?? [],
        })
      );

      // ---------- 2️⃣ OPTIMIZE ----------
      const optForm = new FormData();
      optForm.append("resume_file", file);
      optForm.append("jd_text", jdText);

      const optRes = await fetch(`${BACKEND_URL}/optimize`, {
        method: "POST",
        body: optForm,
      });

      if (!optRes.ok) throw new Error("Optimization failed.");
      const optData = await optRes.json();

      localStorage.setItem(
        "optimized_resume",
        JSON.stringify(optData.suggestions)
      );

      // ---------- 3️⃣ ALTERNATES ----------
      const altForm = new FormData();
      altForm.append("resume_file", file);

      const altRes = await fetch(`${BACKEND_URL}/alternates`, {
        method: "POST",
        body: altForm,
      });

      if (!altRes.ok) throw new Error("Alternate profiles request failed.");
      const altData = await altRes.json();

      localStorage.setItem(
        "alternate_profiles",
        JSON.stringify(altData.profiles)
      );

      // ---------- ✅ Redirect ----------
      router.push("/scanner");
    } catch (error: any) {
      console.error(error);
      setMessage("❌ Upload failed. Check backend connection.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setMessage("");
  };

  return (
    <div className="relative h-[1024px] bg-[#f6f2ff] overflow-hidden">
      {/* Upload Box */}
      <div className="absolute left-[451px] top-[221px] w-[507px] h-[291px] bg-[#a8dadc] shadow-[0_4px_20px_rgba(0,0,0,0.25)] rounded-md"></div>

      {/* Dotted Upload Area */}
      <div className="absolute left-[491px] top-[264px] w-[418px] h-[199px] rounded-[10px] border border-dashed border-black shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center">
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-center text-gray-700 font-semibold"
        >
          <p>Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500 mt-1">PDF or DOC files only</p>
        </label>

        <input
          id="file-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />

        {file && (
          <div className="mt-3 flex items-center gap-2 bg-white px-3 py-1 rounded-md shadow-sm border border-gray-300">
            <p className="text-sm text-green-700 font-medium truncate max-w-[250px]">
              {file.name}
            </p>
            <button
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700 font-bold text-lg leading-none"
              aria-label="Remove file"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Upload icon */}
      <Image
        src="/upload.png"
        alt="upload icon"
        width={41}
        height={41}
        className="absolute left-[679px] top-[323px] shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
      />

      {/* Job Description Box */}
      <div className="absolute left-[454px] top-[547px] w-[504px] h-[154px] bg-[#a8dadc] shadow-[0_4px_20px_rgba(0,0,0,0.25)] p-4 rounded-md">
        <textarea
          placeholder="Enter job description..."
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          className="w-full h-full p-2 border border-gray-400 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm font-semibold text-black font-[OpenSans]"
        ></textarea>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="absolute left-[670px] top-[720px] bg-[#457b9d] text-white px-6 py-2 rounded-md shadow hover:bg-[#356d8a] transition"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {/* Message */}
      {message && (
        <p className="absolute left-[540px] top-[770px] text-[#1a1a1a] font-semibold">
          {message}
        </p>
      )}

      {/* Step Progress */}
      <StepProgress />
    </div>
  );
}
