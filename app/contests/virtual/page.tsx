"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Problem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  description: string;
  points: number;
};

const problems: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Array",
    points: 200,
    description:
      "Given an array of integers and a target value, return the indices of two numbers that add up to the target.",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack",
    points: 200,
    description:
      "Given a string containing brackets, determine whether the input string is valid.",
  },
  {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graph",
    points: 300,
    description:
      "Given a 2D grid of land and water, count the number of islands in the grid.",
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    difficulty: "Hard",
    topic: "Design",
    points: 300,
    description:
      "Design a data structure that supports get and put operations while maintaining a least-recently-used eviction policy.",
  },
];

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(
    2,
    "0",
  )}`;
}

function difficultyClass(value: string) {
  if (value === "Easy") return "easy";
  if (value === "Medium") return "medium";
  return "hard";
}

function VirtualContestContent() {
  const searchParams = useSearchParams();

  const platform =
    searchParams.get("platform") === "codeforces" ? "Codeforces" : "LeetCode";

  const duration = Number(searchParams.get("duration")) || 90;

  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [activeProblem, setActiveProblem] = useState(0);
  const [solved, setSolved] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [code, setCode] = useState(
    `function solve() {
  // Write your solution here
}`,
  );
  const [finished, setFinished] = useState(false);

  const currentProblem = problems[activeProblem];

  // Timer
  useEffect(() => {
    if (finished || timeLeft <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setFinished(true);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [finished, timeLeft]);

  const score = useMemo(() => {
    return problems
      .filter((problem) => solved.includes(problem.id))
      .reduce((total, problem) => total + problem.points, 0);
  }, [solved]);

  const timeUsed = duration * 60 - timeLeft;

  function submitProblem() {
    if (!submitted.includes(currentProblem.id)) {
      setSubmitted((current) => [...current, currentProblem.id]);
    }

    if (!solved.includes(currentProblem.id)) {
      setSolved((current) => [...current, currentProblem.id]);
    }
  }

  function finishContest() {
    setFinished(true);
  }

  if (finished) {
    return (
      <div className="page">
        <div className="eyebrow">CONTEST COMPLETE</div>

        <h1>{platform} Virtual Contest</h1>

        <p className="pageDescription">
          Your contest has ended. Here is your performance summary.
        </p>

        <div className="sheetStats" style={{ marginTop: 30 }}>
          <div>
            <strong>{score}</strong>
            <span>Score</span>
          </div>

          <div>
            <strong>
              {solved.length}/{problems.length}
            </strong>
            <span>Solved</span>
          </div>

          <div>
            <strong>{submitted.length}</strong>
            <span>Submitted</span>
          </div>

          <div>
            <strong>{formatTime(timeUsed)}</strong>
            <span>Time Used</span>
          </div>
        </div>

        <div className="problemList" style={{ marginTop: 30 }}>
          {problems.map((problem) => {
            const isSolved = solved.includes(problem.id);

            return (
              <div className="problemRow" key={problem.id}>
                <div className="problemNumber">{isSolved ? "✓" : "—"}</div>

                <div className="problemMain">
                  <h3>{problem.title}</h3>

                  <div className="problemMeta">
                    <span>{problem.topic}</span>
                    <span>{problem.points} points</span>
                  </div>
                </div>

                <span
                  className={`difficulty ${difficultyClass(
                    problem.difficulty,
                  )}`}
                >
                  {problem.difficulty}
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 30,
          }}
        >
          <Link
            href="/contests"
            className="primary"
            style={{
              textDecoration: "none",
            }}
          >
            Back to Contests →
          </Link>

          <button
            type="button"
            className="badge"
            onClick={() => window.location.reload()}
            style={{
              cursor: "pointer",
              padding: "10px 16px",
            }}
          >
            Start Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div className="eyebrow">
            {platform.toUpperCase()} · VIRTUAL CONTEST
          </div>

          <h1 style={{ marginBottom: 5 }}>Contest Mode</h1>

          <p className="muted">
            {solved.length}/{problems.length} problems solved
          </p>
        </div>

        {/* TIMER */}
        <div
          style={{
            padding: "14px 24px",
            borderRadius: 12,
            border:
              timeLeft < 300
                ? "1px solid rgba(255,70,70,0.35)"
                : "1px solid rgba(255,255,255,0.1)",
            background:
              timeLeft < 300 ? "rgba(255,70,70,0.1)" : "rgba(255,255,255,0.03)",
            fontSize: 25,
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
            color: timeLeft < 300 ? "#ff7373" : "inherit",
          }}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* PROBLEM NAVIGATION */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginTop: 30,
          marginBottom: 24,
        }}
      >
        {problems.map((problem, index) => (
          <button
            key={problem.id}
            type="button"
            onClick={() => setActiveProblem(index)}
            className={activeProblem === index ? "primary" : "badge"}
            style={{
              cursor: "pointer",
              padding: "10px 14px",
            }}
          >
            {index + 1}. {problem.title}
            {solved.includes(problem.id) ? " ✓" : ""}
          </button>
        ))}
      </div>

      {/* CONTEST AREA */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 20,
        }}
      >
        {/* PROBLEM */}
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 15,
              alignItems: "center",
            }}
          >
            <div>
              <div className="eyebrow">PROBLEM {activeProblem + 1}</div>

              <h2 style={{ marginTop: 8 }}>{currentProblem.title}</h2>
            </div>

            <span
              className={`difficulty ${difficultyClass(
                currentProblem.difficulty,
              )}`}
            >
              {currentProblem.difficulty}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginTop: 12,
            }}
          >
            <span className="badge">{currentProblem.topic}</span>
            <span className="badge">{currentProblem.points} points</span>
          </div>

          <p
            style={{
              marginTop: 28,
              lineHeight: 1.8,
            }}
          >
            {currentProblem.description}
          </p>

          <div
            style={{
              marginTop: 25,
              padding: 16,
              borderRadius: 10,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="eyebrow">EXAMPLE</div>

            <pre
              style={{
                marginTop: 10,
                whiteSpace: "pre-wrap",
                overflowX: "auto",
                opacity: 0.8,
              }}
            >
              Input: [2, 7, 11, 15], target = 9{"\n"}
              Output: [0, 1]
            </pre>
          </div>

          <div
            style={{
              marginTop: 20,
              padding: 14,
              borderRadius: 10,
              background: "rgba(124,108,255,0.06)",
              border: "1px solid rgba(124,108,255,0.12)",
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            <strong>Contest tip:</strong> Start with the problems you can solve
            quickly and return to harder problems later.
          </div>
        </div>

        {/* EDITOR */}
        <div className="card">
          <div className="eyebrow">CODE EDITOR</div>

          <h3 style={{ marginTop: 8 }}>Write your solution</h3>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            style={{
              width: "100%",
              minHeight: 360,
              marginTop: 18,
              padding: 18,
              boxSizing: "border-box",
              resize: "vertical",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "#090909",
              color: "inherit",
              fontFamily: "monospace",
              fontSize: 14,
              lineHeight: 1.6,
              outline: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
              marginTop: 15,
            }}
          >
            <button
              type="button"
              className="badge"
              onClick={() => setCode("")}
              style={{
                cursor: "pointer",
                padding: "10px 16px",
              }}
            >
              Clear
            </button>

            <button
              type="button"
              className="primary"
              onClick={submitProblem}
              style={{
                cursor: "pointer",
                padding: "10px 18px",
              }}
            >
              Submit Solution
            </button>
          </div>

          {submitted.includes(currentProblem.id) && (
            <div
              style={{
                marginTop: 16,
                padding: 12,
                borderRadius: 8,
                background: "rgba(50,200,100,0.08)",
                border: "1px solid rgba(50,200,100,0.12)",
              }}
            >
              ✓ Submitted successfully
            </div>
          )}
        </div>
      </div>

      {/* NAVIGATION */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 15,
          marginTop: 25,
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          className="badge"
          disabled={activeProblem === 0}
          onClick={() => setActiveProblem((current) => current - 1)}
          style={{
            padding: "11px 18px",
            cursor: activeProblem === 0 ? "not-allowed" : "pointer",
            opacity: activeProblem === 0 ? 0.4 : 1,
          }}
        >
          ← Previous
        </button>

        {activeProblem < problems.length - 1 ? (
          <button
            type="button"
            className="primary"
            onClick={() => setActiveProblem((current) => current + 1)}
            style={{
              padding: "11px 18px",
              cursor: "pointer",
            }}
          >
            Next Problem →
          </button>
        ) : (
          <button
            type="button"
            className="primary"
            onClick={finishContest}
            style={{
              padding: "11px 18px",
              cursor: "pointer",
            }}
          >
            Finish Contest →
          </button>
        )}
      </div>

      {/* MOBILE STACK */}
      <style jsx>{`
        @media (max-width: 850px) {
          .page > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function VirtualContest() {
  return (
    <Suspense
      fallback={
        <div className="page">
          <div className="eyebrow">VIRTUAL CONTEST</div>
          <h1>Loading contest...</h1>
          <p className="pageDescription">Preparing your virtual contest...</p>
        </div>
      }
    >
      <VirtualContestContent />
    </Suspense>
  );
}
