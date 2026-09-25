"use client";

import { useState } from "react";
import Link from "next/link";

const contestOptions = [
  {
    platform: "LeetCode",
    description: "Practice an interview-style coding contest.",
    problems: 4,
  },
  {
    platform: "Codeforces",
    description: "Practice a competitive-programming style contest.",
    problems: 4,
  },
];

const durations = [
  { value: 60, label: "60 Minutes" },
  { value: 90, label: "90 Minutes" },
  { value: 120, label: "120 Minutes" },
];

export default function Contests() {
  const [platform, setPlatform] = useState("LeetCode");
  const [duration, setDuration] = useState(90);

  return (
    <div className="page">
      <div className="eyebrow">VIRTUAL CONTESTS</div>

      <h1>Contest Mode</h1>

      <p className="pageDescription">
        Simulate a real coding contest with a timer, multiple problems,
        submissions and performance tracking.
      </p>

      {/* PLATFORM */}
      <div className="toolbar" style={{ marginTop: 30 }}>
        {contestOptions.map((item) => (
          <button
            key={item.platform}
            className={platform === item.platform ? "primary" : ""}
            onClick={() => setPlatform(item.platform)}
          >
            {item.platform}
          </button>
        ))}
      </div>

      {/* CONTEST CARD */}
      <div
        className="card"
        style={{
          marginTop: 24,
          maxWidth: 800,
        }}
      >
        <div className="eyebrow">{platform.toUpperCase()}</div>

        <h2 style={{ marginTop: 10 }}>{platform} Virtual Contest</h2>

        <p className="muted">
          {platform === "LeetCode"
            ? "Solve interview-focused DSA problems under a time limit."
            : "Solve competitive programming problems under contest conditions."}
        </p>

        {/* STATS */}
        <div
          className="sheetStats"
          style={{
            marginTop: 28,
          }}
        >
          <div>
            <strong>4</strong>
            <span>Problems</span>
          </div>

          <div>
            <strong>1000</strong>
            <span>Max Score</span>
          </div>

          <div>
            <strong>1</strong>
            <span>Attempt</span>
          </div>
        </div>

        {/* DURATION */}
        <div style={{ marginTop: 30 }}>
          <div className="eyebrow">CONTEST DURATION</div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 14,
            }}
          >
            {durations.map((item) => (
              <button
                key={item.value}
                className={duration === item.value ? "primary" : "badge"}
                onClick={() => setDuration(item.value)}
                style={{
                  cursor: "pointer",
                  padding: "10px 16px",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* RULES */}
        <div
          style={{
            marginTop: 30,
            padding: 18,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div className="eyebrow">CONTEST RULES</div>

          <ul
            style={{
              marginTop: 12,
              paddingLeft: 20,
              lineHeight: 1.8,
            }}
          >
            <li>Contest starts immediately after clicking start.</li>
            <li>Timer cannot be paused.</li>
            <li>Problems can be attempted in any order.</li>
            <li>Your score is calculated after submission.</li>
            <li>Finish the contest to view your performance.</li>
          </ul>
        </div>

        {/* START */}
        <Link
          href={`/contests/virtual?platform=${platform.toLowerCase()}&duration=${duration}`}
          className="primary"
          style={{
            display: "inline-block",
            marginTop: 28,
            textDecoration: "none",
          }}
        >
          Start {duration}-Minute Contest →
        </Link>
      </div>
    </div>
  );
}
