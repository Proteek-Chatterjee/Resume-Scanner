"use client";
import Image from "next/image";

export default function EditorToolbar() {
  // Tool list (update icons as needed)
  const tools = [
    { label: "Bold", icon: "/vector.png" },
    { label: "Underline", icon: "/vector-8.png" },
    { label: "Align Left", icon: "/Vector-4.png" },
    { label: "Align Right", icon: "/Vector-9.png" },
    { label: "Undo", icon: "/Vector-5.png" },
    { label: "Redo", icon: "/Vector-2.png" },
    { label: "Insert Image", icon: "/Vector-1.png" },
    { label: "Layout", icon: "/Vector-11.png" },
  ];

  return (
      <div className="grid grid-cols-2 gap-4 justify-items-center mt-4">
        {tools.map((tool, i) => (
          <button
            key={i}
            className="bg-[#457B9D] w-12 h-12 flex items-center justify-center rounded-lg shadow-md hover:scale-105 hover:bg-[#5A9EC0] transition-transform"
            title={tool.label}
          >
            <Image
              src={tool.icon}
              alt={tool.label}
              width={24}
              height={24}
              className="object-contain"
            />
          </button>
        ))}
      </div>
  );
}
