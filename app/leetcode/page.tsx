"use client";

import { useEffect, useMemo, useState } from "react";

const patterns = [
  "All",
  "Array",
  "String",
  "Hash Table",
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Linked List",
  "Stack",
  "Tree",
  "Graph",
  "Dynamic Programming",
  "Greedy",
  "Backtracking",
  "Heap",
];

export default function LeetCode() {
  const [data, setData] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [diff, setDiff] = useState("All");
  const [pattern, setPattern] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadQuestions() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/leetcode");

        if (!response.ok) {
          throw new Error("Failed to load LeetCode problems");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || "LeetCode API failed");
        }

        setData(result.questions || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unable to load problems");
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  const filtered = useMemo(() => {
    return data.filter((x) => {
      const title = String(x.title || "").toLowerCase();
      const number = String(x.questionFrontendId || "");

      const matchesSearch =
        !q || title.includes(q.toLowerCase()) || number.includes(q);

      const matchesDifficulty =
        diff === "All" ||
        String(x.difficulty || "").toUpperCase() === diff.toUpperCase();

      const matchesPattern =
        pattern === "All" ||
        (x.topicTags || []).some(
          (tag: any) =>
            String(tag.name || "").toLowerCase() === pattern.toLowerCase(),
        );

      return matchesSearch && matchesDifficulty && matchesPattern;
    });
  }, [data, q, diff, pattern]);

  return (
    <div className="page">
      <div className="eyebrow">LEETCODE · LIVE CATALOG</div>

      <h1>LeetCode Problem Library</h1>

      <p className="muted">
        Practice LeetCode problems with search, difficulty and topic-based
        filtering.
      </p>

      <div className="toolbar">
        <input
          placeholder="Search title / number"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select value={diff} onChange={(e) => setDiff(e.target.value)}>
          <option value="All">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select value={pattern} onChange={(e) => setPattern(e.target.value)}>
          {patterns.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {!loading && !error && (
        <div className="small muted" style={{ marginBottom: "20px" }}>
          Showing {filtered.length} of {data.length} problems
        </div>
      )}

      {loading && <div className="empty">Loading LeetCode catalog...</div>}

      {error && (
        <div className="empty">
          <b>Unable to load LeetCode problems.</b>
          <br />
          <span className="muted">{error}</span>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="empty">No problems found.</div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="list">
          {filtered.map((x) => (
            <a
              className="problem"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://leetcode.com/problems/${x.titleSlug}/`}
              key={x.id || x.questionFrontendId}
            >
              <div>
                <b>
                  {x.questionFrontendId}. {x.title}
                </b>

                <div className="small muted">
                  {(x.topicTags || [])
                    .slice(0, 4)
                    .map((tag: any) => tag.name)
                    .join(" · ")}
                </div>
              </div>

              <span className="badge">{x.difficulty}</span>

              <span>↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
