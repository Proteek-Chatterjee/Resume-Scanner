"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-[#a8dadc] text-[#1a1a1a] shadow-md">
      {/* Left Section — Title */}
      <div className="text-2xl font-extrabold text-[#356a86] tracking-wide">
        Resume Scanner
      </div>

      {/* Middle Section — Navigation Links */}
      <div className="flex gap-6 text-lg font-medium">
        <Link href="/page2" className="hover:text-[#356a86] transition">
          Home
        </Link>
        <Link href="/ResumeUploader" className="hover:text-[#356a86] transition">
          Upload Resume 
        </Link>
        <Link href="/resumepage" className="hover:text-[#356a86] transition">
          Result
        </Link>

        <Link href="/alternate" className="hover:text-[#356a86] transition">
          Alternate Profiles
        </Link>


      </div>

      {/* Right Section — Buttons */}
      
    </nav>
  );
}
