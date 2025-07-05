"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

const sections = [
  { id: 1, name: "Favorites" },
  { id: 2, name: "Albums" },
  { id: 3, name: "Artists" },
  { id: 4, name: "History" },
];

export default function SectionTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentSection = searchParams.get("section");

  return (
    <div className="border-border flex justify-between gap-4 border-b px-4 py-4">
      {sections.map((section) => (
        <Suspense key={section.id} fallback={<div>Loading</div>}>
          <button
            key={section.id}
            onClick={() => {
              router.push(`?section=${section.id}`);
            }}
            className={`text-xs transition ${
              currentSection === section.id.toString()
                ? "text-white"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {section.name}
          </button>
        </Suspense>
      ))}
    </div>
  );
}
