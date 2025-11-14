"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { label: "Upload", path: "/ResumeUploader", icon: "/upload.png" },
  { label: "Scan", path: "/scanner", icon: "/vector13.png" },
  { label: "Result", path: "/resumepage", icon: "/vector12.png" },
  { label: "Alternate Profiles", path: "/alternate", icon: "/ix_optimize.png" },
];

export default function StepProgress() {
  const pathname = usePathname();
  const currentStep = steps.findIndex((s) => pathname.startsWith(s.path));

  return (
    <div className="flex flex-col items-center mt-10 space-y-8">
      {/* Progress bar */}
      <div className="relative flex items-center justify-center w-full max-w-3xl">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={step.path} className="flex-1 relative flex flex-col items-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-[50%] left-[calc(50%+28px)] h-[3px] w-[calc(100%-56px)] translate-y-[-1px] ${
                    index < currentStep ? "bg-[#457b9d]" : "bg-gray-300"
                  }`}
                ></div>
              )}

              {/* Step Circle */}
              <Link href={step.path} className="relative z-10 flex flex-col items-center group">
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full border-[3px] transition-all duration-300 shadow-sm ${
                    isActive
                      ? "bg-[#457b9d] border-[#457b9d] scale-110"
                      : isCompleted
                      ? "bg-[#a8dadc] border-[#457b9d]"
                      : "bg-[#f1faee] border-gray-400"
                  } group-hover:scale-110`}
                >
                  <Image
                    src={step.icon}
                    alt={step.label}
                    width={26}
                    height={26}
                    className={`${
                      isActive || isCompleted ? "opacity-100 brightness-200" : "opacity-60 brightness-0"
                    } transition`}
                  />
                </div>
                <p
                  className={`mt-3 font-semibold text-sm ${
                    isActive
                      ? "text-[#1d3557]"
                      : isCompleted
                      ? "text-[#457b9d]"
                      : "text-gray-600"
                  }`}
                >
                  {step.label}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
