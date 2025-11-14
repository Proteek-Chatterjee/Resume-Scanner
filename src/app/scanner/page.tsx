"use client";
import StepProgress from "../components/StepProgress";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ScanProgress() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const router = useRouter();

  // Animate progress
  useEffect(() => {
    if (progress < 100) {
      const timer = setInterval(() => setProgress((p) => p + 1), 40);
      return () => clearInterval(timer);
    } else {
      setTimeout(() => setIsDone(true), 500);
      // After short pause, redirect to result page
      const redirect = setTimeout(() => router.push("/resumepage"), 1500);
      return () => clearTimeout(redirect);
    }
  }, [progress, router]);

  return (
    <div className="relative h-screen bg-[#f6f2ff] overflow-hidden flex items-center justify-center">
      {/* ---- Step Progress fixed at top ---- */}
      <div className="absolute top-0 left-0 w-full z-30">
        <StepProgress />
      </div>

      {/* ---- Animated Scanning Circle ---- */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-[200px] h-[200px] rounded-full bg-gradient-to-b from-[#a8dadc] to-[#457b9d] flex items-center justify-center shadow-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-4xl font-semibold text-white">{progress}%</span>
        </motion.div>

        <p className="mt-4 text-lg font-semibold text-[#1a1a1a]">
          {isDone ? "Scan Complete!" : "Scanning..."}
        </p>
      </div>
    </div>
  );
}

/* ---------------- Helper Components ---------------- */
function Step({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold border transition-all duration-300 ${
          active
            ? "bg-[#457b9d] text-white border-[#457b9d]"
            : "bg-[#a8dadc] text-black border-[#a8dadc]"
        }`}
      >
        {label[0]}
      </div>
      <span className="text-xs mt-2 font-semibold">{label}</span>
    </div>
  );
}

function Line() {
  return <div className="h-[2px] w-16 bg-black" />;
}
