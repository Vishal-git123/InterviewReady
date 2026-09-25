"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, Search, Star, Check } from "lucide-react";

type Difficulty = "Easy" | "Medium" | "Hard";

type Problem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  topic: string;
  frequency: number;
  askedAt: string;
  url: string;
};

/* =========================================================
   LEETCODE PROBLEM BANK
   ========================================================= */

const problemBank: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Array / Hash Table",
    frequency: 100,
    askedAt: "2026-09-18",
    url: "https://leetcode.com/problems/two-sum/",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack",
    frequency: 96,
    askedAt: "2026-09-15",
    url: "https://leetcode.com/problems/valid-parentheses/",
  },
  {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Array / DP",
    frequency: 91,
    askedAt: "2026-09-11",
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
  },
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    topic: "Array / Hash Table",
    frequency: 89,
    askedAt: "2026-09-08",
    url: "https://leetcode.com/problems/contains-duplicate/",
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    topic: "Hash Table / String",
    frequency: 87,
    askedAt: "2026-08-29",
    url: "https://leetcode.com/problems/valid-anagram/",
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    frequency: 93,
    askedAt: "2026-09-05",
    url: "https://leetcode.com/problems/reverse-linked-list/",
  },
  {
    id: "maximum-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    topic: "Tree / DFS",
    frequency: 84,
    askedAt: "2026-08-21",
    url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    topic: "Binary Search",
    frequency: 82,
    askedAt: "2026-08-18",
    url: "https://leetcode.com/problems/binary-search/",
  },

  {
    id: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    topic: "Array / Two Pointers",
    frequency: 94,
    askedAt: "2026-09-12",
    url: "https://leetcode.com/problems/3sum/",
  },
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Sliding Window",
    frequency: 98,
    askedAt: "2026-09-17",
    url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    topic: "Hash Table / String",
    frequency: 90,
    askedAt: "2026-08-30",
    url: "https://leetcode.com/problems/group-anagrams/",
  },
  {
    id: "product-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topic: "Array / Prefix",
    frequency: 88,
    askedAt: "2026-08-25",
    url: "https://leetcode.com/problems/product-of-array-except-self/",
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    frequency: 86,
    askedAt: "2026-08-19",
    url: "https://leetcode.com/problems/maximum-subarray/",
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    topic: "Intervals / Sorting",
    frequency: 92,
    askedAt: "2026-09-02",
    url: "https://leetcode.com/problems/merge-intervals/",
  },
  {
    id: "top-k-frequent",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    topic: "Hash Table / Heap",
    frequency: 89,
    askedAt: "2026-08-14",
    url: "https://leetcode.com/problems/top-k-frequent-elements/",
  },
  {
    id: "binary-tree-level-order",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topic: "Tree / BFS",
    frequency: 83,
    askedAt: "2026-07-28",
    url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
  },
  {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graph / DFS / BFS",
    frequency: 95,
    askedAt: "2026-08-07",
    url: "https://leetcode.com/problems/number-of-islands/",
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    topic: "Graph / Topological Sort",
    frequency: 81,
    askedAt: "2026-07-19",
    url: "https://leetcode.com/problems/course-schedule/",
  },
  {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    frequency: 79,
    askedAt: "2026-06-25",
    url: "https://leetcode.com/problems/coin-change/",
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    difficulty: "Medium",
    topic: "Design / Hash Map",
    frequency: 85,
    askedAt: "2026-06-18",
    url: "https://leetcode.com/problems/lru-cache/",
  },
  {
    id: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    topic: "Backtracking",
    frequency: 76,
    askedAt: "2026-05-22",
    url: "https://leetcode.com/problems/word-search/",
  },
  {
    id: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    topic: "Backtracking",
    frequency: 74,
    askedAt: "2026-05-10",
    url: "https://leetcode.com/problems/subsets/",
  },
  {
    id: "search-rotated-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "Binary Search",
    frequency: 80,
    askedAt: "2026-04-18",
    url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
  },
  {
    id: "kth-largest",
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    topic: "Heap / Quickselect",
    frequency: 73,
    askedAt: "2026-03-20",
    url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
  },

  {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "Two Pointers / Stack",
    frequency: 72,
    askedAt: "2026-07-05",
    url: "https://leetcode.com/problems/trapping-rain-water/",
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    topic: "Heap / Linked List",
    frequency: 78,
    askedAt: "2026-06-10",
    url: "https://leetcode.com/problems/merge-k-sorted-lists/",
  },
  {
    id: "median-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    topic: "Binary Search",
    frequency: 65,
    askedAt: "2026-04-02",
    url: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
  },
  {
    id: "serialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    topic: "Tree / Design",
    frequency: 70,
    askedAt: "2026-05-14",
    url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
  },
];

/* =========================================================
   COMPANY-SPECIFIC FREQUENCY MULTIPLIERS
   This makes each company page different.
   ========================================================= */

const companyWeights: Record<string, Record<string, number>> = {
  amazon: {
    "two-sum": 100,
    "number-of-islands": 98,
    "lru-cache": 96,
    "top-k-frequent": 94,
    "merge-k-sorted-lists": 92,
    "course-schedule": 90,
    "valid-parentheses": 88,
    "3sum": 87,
    "word-search": 84,
    "coin-change": 82,
  },

  google: {
    "longest-substring": 100,
    "merge-intervals": 97,
    "number-of-islands": 96,
    "course-schedule": 94,
    "binary-search": 92,
    "serialize-binary-tree": 90,
    "trapping-rain-water": 88,
    "median-two-sorted-arrays": 86,
    "3sum": 84,
    "word-search": 82,
  },

  microsoft: {
    "reverse-linked-list": 100,
    "maximum-subarray": 97,
    "binary-search": 95,
    "valid-parentheses": 93,
    "merge-intervals": 91,
    "number-of-islands": 89,
    "word-search": 87,
    "course-schedule": 85,
    "lru-cache": 83,
    "3sum": 81,
  },

  meta: {
    "3sum": 100,
    "valid-parentheses": 96,
    "binary-tree-level-order": 95,
    "number-of-islands": 94,
    "top-k-frequent": 92,
    "product-except-self": 90,
    "group-anagrams": 88,
    "merge-intervals": 86,
    "word-search": 84,
    "lru-cache": 82,
  },

  apple: {
    "two-sum": 100,
    "valid-anagram": 95,
    "binary-search": 93,
    "maximum-subarray": 91,
    "merge-intervals": 89,
    "reverse-linked-list": 87,
    "3sum": 85,
    "coin-change": 82,
    "word-search": 80,
    "trapping-rain-water": 76,
  },

  adobe: {
    "two-sum": 100,
    "valid-parentheses": 95,
    "group-anagrams": 92,
    "maximum-subarray": 90,
    "number-of-islands": 88,
    "merge-intervals": 86,
    "lru-cache": 83,
    "word-search": 80,
    "top-k-frequent": 78,
  },

  uber: {
    "longest-substring": 100,
    "3sum": 96,
    "merge-intervals": 94,
    "number-of-islands": 91,
    "top-k-frequent": 89,
    "lru-cache": 87,
    "course-schedule": 84,
    "kth-largest": 82,
    "trapping-rain-water": 79,
  },

  linkedin: {
    "two-sum": 100,
    "valid-anagram": 97,
    "group-anagrams": 94,
    "merge-intervals": 92,
    "binary-tree-level-order": 89,
    "lru-cache": 87,
    "top-k-frequent": 85,
    "longest-substring": 83,
  },
};

/* =========================================================
   COMPANY NAME
   ========================================================= */

const companyNames: Record<string, string> = {
  amazon: "Amazon",
  google: "Google",
  microsoft: "Microsoft",
  meta: "Meta",
  apple: "Apple",
  netflix: "Netflix",
  adobe: "Adobe",
  uber: "Uber",
  atlassian: "Atlassian",
  linkedin: "LinkedIn",
  oracle: "Oracle",
  salesforce: "Salesforce",
  paypal: "PayPal",
  visa: "Visa",
  mastercard: "Mastercard",
  "jpmorgan-chase": "JPMorgan Chase",
  "goldman-sachs": "Goldman Sachs",
  "morgan-stanley": "Morgan Stanley",
  walmart: "Walmart",
  target: "Target",
  flipkart: "Flipkart",
  swiggy: "Swiggy",
  zomato: "Zomato",
  phonepe: "PhonePe",
  paytm: "Paytm",
  razorpay: "Razorpay",
  cred: "CRED",
  meesho: "Meesho",
  myntra: "Myntra",
  zepto: "Zepto",
  deloitte: "Deloitte",
  accenture: "Accenture",
  infosys: "Infosys",
  tcs: "TCS",
  wipro: "Wipro",
  cognizant: "Cognizant",
  capgemini: "Capgemini",
  hcltech: "HCLTech",
  "tech-mahindra": "Tech Mahindra",
  "persistent-systems": "Persistent Systems",
  cisco: "Cisco",
  intel: "Intel",
  nvidia: "NVIDIA",
  amd: "AMD",
  qualcomm: "Qualcomm",
  samsung: "Samsung",
  siemens: "Siemens",
  "texas-instruments": "Texas Instruments",
  vmware: "VMware",
  dell: "Dell",
  "booking-com": "Booking.com",
  airbnb: "Airbnb",
  spotify: "Spotify",
  snap: "Snap",
  pinterest: "Pinterest",
  dropbox: "Dropbox",
  github: "GitHub",
  gitlab: "GitLab",
  reddit: "Reddit",
  zoho: "Zoho",
  freshworks: "Freshworks",
  servicenow: "ServiceNow",
  intuit: "Intuit",
  bloomberg: "Bloomberg",
  "two-sigma": "Two Sigma",
  coinbase: "Coinbase",
  datadog: "Datadog",
  stripe: "Stripe",
  block: "Block",
  twilio: "Twilio",
  payu: "PayU",
  groww: "Groww",
  dream11: "Dream11",
  ola: "Ola",
  juspay: "Juspay",
};

function difficultyClass(value: Difficulty) {
  if (value === "Easy") return "easy";
  if (value === "Medium") return "medium";
  return "hard";
}

function getDateLimit(range: string) {
  const date = new Date();

  if (range === "30d") {
    date.setDate(date.getDate() - 30);
  }

  if (range === "3m") {
    date.setMonth(date.getMonth() - 3);
  }

  if (range === "6m") {
    date.setMonth(date.getMonth() - 6);
  }

  if (range === "1y") {
    date.setFullYear(date.getFullYear() - 1);
  }

  return date;
}

/* =========================================================
   PAGE
   ========================================================= */

export default function CompanyPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const [company, setCompany] = useState("");
  const [range, setRange] = useState("3m");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [sort, setSort] = useState("frequency");
  const [solved, setSolved] = useState<string[]>([]);

  useMemo(() => {
    params.then((value) => {
      setCompany(value.company);
    });
  }, [params]);

  const companyName =
    companyNames[company] ||
    company
      .split("-")
      .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
      .join(" ");

  /*
   * If company has custom frequencies use them.
   * Otherwise use the complete problem bank so smaller companies
   * don't show an empty page.
   */
  const problems = useMemo(() => {
    const weights = companyWeights[company];

    return problemBank.map((problem) => ({
      ...problem,
      frequency: weights?.[problem.id] ?? problem.frequency,
    }));
  }, [company]);

  const filteredProblems = useMemo(() => {
    const limit = getDateLimit(range);

    return problems
      .filter((problem) => {
        const askedDate = new Date(problem.askedAt);

        const matchesDate = askedDate >= limit;

        const matchesSearch =
          problem.title.toLowerCase().includes(search.toLowerCase()) ||
          problem.topic.toLowerCase().includes(search.toLowerCase());

        const matchesDifficulty =
          difficulty === "All" || problem.difficulty === difficulty;

        return matchesDate && matchesSearch && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sort === "frequency") {
          return b.frequency - a.frequency;
        }

        if (sort === "recent") {
          return new Date(b.askedAt).getTime() - new Date(a.askedAt).getTime();
        }

        return a.title.localeCompare(b.title);
      });
  }, [problems, range, search, difficulty, sort]);

  const easyCount = filteredProblems.filter(
    (p) => p.difficulty === "Easy",
  ).length;

  const mediumCount = filteredProblems.filter(
    (p) => p.difficulty === "Medium",
  ).length;

  const hardCount = filteredProblems.filter(
    (p) => p.difficulty === "Hard",
  ).length;

  function toggleSolved(id: string) {
    setSolved((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  }

  return (
    <div className="page">
      {/* BACK */}

      <Link href="/companies" className="backLink">
        <ArrowLeft size={16} />
        All Companies
      </Link>

      {/* HEADER */}

      <div className="eyebrow">COMPANY INTERVIEW PREP</div>

      <h1>{companyName}</h1>

      <p className="pageDescription">
        Company-wise LeetCode questions ranked by interview frequency and
        filtered by recency.
      </p>

      {/* STATS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: "12px",
          marginTop: "30px",
        }}
      >
        <div className="card">
          <strong style={{ fontSize: "28px" }}>
            {filteredProblems.length}
          </strong>
          <p style={{ margin: "5px 0 0", opacity: 0.65 }}>Questions</p>
        </div>

        <div className="card">
          <strong style={{ fontSize: "28px" }}>{easyCount}</strong>
          <p style={{ margin: "5px 0 0", opacity: 0.65 }}>Easy</p>
        </div>

        <div className="card">
          <strong style={{ fontSize: "28px" }}>{mediumCount}</strong>
          <p style={{ margin: "5px 0 0", opacity: 0.65 }}>Medium</p>
        </div>

        <div className="card">
          <strong style={{ fontSize: "28px" }}>{hardCount}</strong>
          <p style={{ margin: "5px 0 0", opacity: 0.65 }}>Hard</p>
        </div>

        <div className="card">
          <strong style={{ fontSize: "28px" }}>{solved.length}</strong>
          <p style={{ margin: "5px 0 0", opacity: 0.65 }}>Solved</p>
        </div>
      </div>

      {/* RECENCY */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "32px",
        }}
      >
        {[
          ["30d", "Last 30 Days"],
          ["3m", "Last 3 Months"],
          ["6m", "Last 6 Months"],
          ["1y", "Last 1 Year"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setRange(value)}
            className={range === value ? "primary" : "badge"}
            style={{
              padding: "11px 17px",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* SEARCH + SORT */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto auto",
          gap: "12px",
          marginTop: "22px",
        }}
      >
        <div style={{ position: "relative" }}>
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.5,
            }}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problem or topic..."
            className="searchInput"
            style={{
              width: "100%",
              boxSizing: "border-box",
              paddingLeft: "45px",
            }}
          />
        </div>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="searchInput"
        >
          <option value="All">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="searchInput"
        >
          <option value="frequency">Sort: Frequency</option>
          <option value="recent">Sort: Recent</option>
          <option value="name">Sort: Name</option>
        </select>
      </div>

      {/* SECTION HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "35px",
          marginBottom: "14px",
        }}
      >
        <span className="problemListHeader">
          {filteredProblems.length} QUESTIONS
        </span>

        <span style={{ opacity: 0.55, fontSize: "13px" }}>
          SORTED BY{" "}
          {sort === "frequency"
            ? "FREQUENCY"
            : sort === "recent"
              ? "RECENCY"
              : "NAME"}
        </span>
      </div>

      {/* PROBLEM LIST */}

      {filteredProblems.length > 0 ? (
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {filteredProblems.map((problem, index) => {
            const isSolved = solved.includes(problem.id);

            return (
              <div
                key={problem.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "42px 1fr auto auto auto auto",
                  alignItems: "center",
                  gap: "18px",
                  padding: "22px 24px",
                  borderBottom:
                    index !== filteredProblems.length - 1
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "none",
                  opacity: isSolved ? 0.55 : 1,
                }}
              >
                {/* CHECK */}

                <button
                  onClick={() => toggleSolved(problem.id)}
                  aria-label="Mark solved"
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "5px",
                    border: "1px solid rgba(255,255,255,0.3)",
                    background: isSolved
                      ? "rgba(100,80,255,0.8)"
                      : "transparent",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isSolved && <Check size={14} />}
                </button>

                {/* QUESTION */}

                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        opacity: 0.4,
                        minWidth: "45px",
                      }}
                    >
                      #{String(index + 1).padStart(3, "0")}
                    </span>

                    <h3
                      style={{
                        margin: 0,
                        fontSize: "17px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {problem.title}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginTop: "9px",
                      marginLeft: "45px",
                    }}
                  >
                    <span className="badge">{problem.topic}</span>

                    <span
                      className="badge"
                      style={{
                        color: "#22c7bd",
                      }}
                    >
                      Asked {new Date(problem.askedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* FREQUENCY */}

                <div
                  style={{
                    minWidth: "85px",
                    textAlign: "center",
                    padding: "9px 12px",
                    borderRadius: "999px",
                    background: "rgba(30,200,190,0.08)",
                    border: "1px solid rgba(30,200,190,0.15)",
                    color: "#28c7bd",
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  ↗ {problem.frequency}%
                </div>

                {/* DIFFICULTY */}

                <span
                  className={`difficulty ${difficultyClass(
                    problem.difficulty,
                  )}`}
                >
                  {problem.difficulty}
                </span>

                {/* STAR */}

                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "inherit",
                    opacity: 0.5,
                    cursor: "pointer",
                  }}
                >
                  <Star size={20} />
                </button>

                {/* LEETCODE */}

                <a
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${problem.title} on LeetCode`}
                  style={{
                    color: "inherit",
                    opacity: 0.65,
                    display: "flex",
                  }}
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="emptyState">
          <h3>No questions found</h3>
          <p>
            Try a wider time period, another difficulty, or a different search.
          </p>
        </div>
      )}

      {/* DISCLAIMER FOR STATIC DATA */}

      <p
        style={{
          marginTop: "24px",
          fontSize: "12px",
          opacity: 0.4,
          lineHeight: 1.6,
        }}
      >
        Interview frequency and recency are displayed from the app's question
        dataset. They are preparation signals, not guarantees of what a future
        interviewer will ask.
      </p>
    </div>
  );
}
