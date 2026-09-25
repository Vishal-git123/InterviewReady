"use client";

import { ExternalLink, ArrowUpRight } from "lucide-react";

const sheets = [
  {
    number: "01",
    title: "Striver's A2Z DSA Sheet",
    description:
      "Complete DSA roadmap from programming basics to advanced problem solving.",
    category: "COMPLETE ROADMAP",
    platform: "takeUforward",
    url: "https://takeuforward.org/prep-hub/strivers-a2z-dsa-sheet",
    tag: "442 Topics",
  },
  {
    number: "02",
    title: "NeetCode 150",
    description:
      "Pattern-based interview preparation covering the most important DSA problems.",
    category: "INTERVIEW PREP",
    platform: "NeetCode",
    url: "https://neetcode.io/roadmap",
    tag: "150 Problems",
  },
  {
    number: "03",
    title: "Blind 75",
    description:
      "Focused set of high-value coding interview problems across core DSA topics.",
    category: "INTERVIEW PREP",
    platform: "takeUforward",
    url: "https://takeuforward.org/prep-hub",
    tag: "Blind 75",
  },
  {
    number: "04",
    title: "Company Interview Questions",
    description:
      "Explore company-wise coding interview questions and prepare based on your target company.",
    category: "COMPANY PREP",
    platform: "LeetCode",
    url: "https://leetcode.com/problemset/",
    tag: "Company Wise",
  },
];

export default function Sheets() {
  return (
    <div className="page">
      <div className="eyebrow">LEARNING PATHS</div>

      <h1>DSA Sheets</h1>

      <p className="pageDescription">
        Curated DSA roadmaps and interview preparation resources. Choose a sheet
        and continue your preparation on the official platform.
      </p>

      <div className="sheetGrid">
        {sheets.map((sheet) => (
          <a
            key={sheet.title}
            href={sheet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="sheetCard"
          >
            <div className="sheetCardTop">
              <span className="sheetNumber">{sheet.number}</span>

              <span className="sheetExternal">
                <ArrowUpRight size={18} />
              </span>
            </div>

            <div className="sheetCategory">{sheet.category}</div>

            <h2>{sheet.title}</h2>

            <p>{sheet.description}</p>

            <div className="sheetCardBottom">
              <span className="sheetPlatform">
                <ExternalLink size={14} />
                {sheet.platform}
              </span>

              <span className="sheetTag">{sheet.tag}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="sheetInfo">
        <div>
          <span className="eyebrow">HOW IT WORKS</span>

          <h2>Practice where the original content lives.</h2>

          <p>
            InterviewReady brings your preparation resources together in one
            place while keeping each sheet connected to its official source.
          </p>
        </div>
      </div>
    </div>
  );
}
