"use client";

import Link from "next/link";
import { use, useMemo, useState } from "react";

type Difficulty = "Easy" | "Medium" | "Hard";

type Problem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  topic: string;
  pattern?: string;
  platform: "LeetCode" | "Codeforces" | "Other";
  url: string;
};

type Module = {
  id: string;
  number: number;
  title: string;
  description: string;
  problems: Problem[];
};

const striverModules: Module[] = [
  {
    id: "basics",
    number: 1,
    title: "Learn the Basics",
    description: "Programming basics, complexity and fundamental concepts.",
    problems: [
      {
        id: "input-output",
        title: "Input / Output",
        difficulty: "Easy",
        topic: "Basics",
        pattern: "Fundamentals",
        platform: "Other",
        url: "https://takeuforward.org/",
      },
      {
        id: "time-complexity",
        title: "Time and Space Complexity",
        difficulty: "Easy",
        topic: "Basics",
        pattern: "Complexity",
        platform: "Other",
        url: "https://takeuforward.org/",
      },
      {
        id: "basic-recursion",
        title: "Basic Recursion",
        difficulty: "Easy",
        topic: "Recursion",
        pattern: "Recursion",
        platform: "Other",
        url: "https://takeuforward.org/",
      },
    ],
  },

  {
    id: "sorting",
    number: 2,
    title: "Sorting Techniques",
    description: "Learn fundamental sorting algorithms and their complexity.",
    problems: [
      {
        id: "selection-sort",
        title: "Selection Sort",
        difficulty: "Easy",
        topic: "Sorting",
        pattern: "Selection Sort",
        platform: "Other",
        url: "https://takeuforward.org/",
      },
      {
        id: "bubble-sort",
        title: "Bubble Sort",
        difficulty: "Easy",
        topic: "Sorting",
        pattern: "Bubble Sort",
        platform: "Other",
        url: "https://takeuforward.org/",
      },
      {
        id: "insertion-sort",
        title: "Insertion Sort",
        difficulty: "Easy",
        topic: "Sorting",
        pattern: "Insertion Sort",
        platform: "Other",
        url: "https://takeuforward.org/",
      },
    ],
  },

  {
    id: "arrays",
    number: 3,
    title: "Arrays",
    description:
      "Array fundamentals, hashing, two pointers and advanced patterns.",
    problems: [
      {
        id: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        topic: "Arrays",
        pattern: "Hashing",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/two-sum/",
      },
      {
        id: "maximum-subarray",
        title: "Maximum Subarray",
        difficulty: "Medium",
        topic: "Arrays",
        pattern: "Kadane's Algorithm",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/maximum-subarray/",
      },
      {
        id: "3sum",
        title: "3Sum",
        difficulty: "Medium",
        topic: "Arrays",
        pattern: "Two Pointers",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/3sum/",
      },
    ],
  },

  {
    id: "hashing",
    number: 4,
    title: "Hashing",
    description: "Frequency maps, hashing patterns and lookup techniques.",
    problems: [
      {
        id: "contains-duplicate",
        title: "Contains Duplicate",
        difficulty: "Easy",
        topic: "Hashing",
        pattern: "Hash Set",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/contains-duplicate/",
      },
      {
        id: "valid-anagram",
        title: "Valid Anagram",
        difficulty: "Easy",
        topic: "Hashing",
        pattern: "Frequency Map",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/valid-anagram/",
      },
    ],
  },

  {
    id: "binary-search",
    number: 5,
    title: "Binary Search",
    description: "Classic binary search and search-space patterns.",
    problems: [
      {
        id: "binary-search",
        title: "Binary Search",
        difficulty: "Easy",
        topic: "Binary Search",
        pattern: "Binary Search",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/binary-search/",
      },
      {
        id: "search-rotated",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        topic: "Binary Search",
        pattern: "Modified Binary Search",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      },
    ],
  },

  {
    id: "strings",
    number: 6,
    title: "Strings",
    description: "String manipulation and common interview patterns.",
    problems: [
      {
        id: "valid-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        topic: "Strings",
        pattern: "Two Pointers",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/valid-palindrome/",
      },
      {
        id: "longest-substring",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        topic: "Strings",
        pattern: "Sliding Window",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      },
    ],
  },

  {
    id: "recursion",
    number: 7,
    title: "Recursion",
    description: "Recursion, subsequences and backtracking foundations.",
    problems: [
      {
        id: "subsets",
        title: "Subsets",
        difficulty: "Medium",
        topic: "Recursion",
        pattern: "Backtracking",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/subsets/",
      },
      {
        id: "permutations",
        title: "Permutations",
        difficulty: "Medium",
        topic: "Recursion",
        pattern: "Backtracking",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/permutations/",
      },
    ],
  },

  {
    id: "linked-list",
    number: 8,
    title: "Linked List",
    description: "Linked-list traversal, manipulation and interview patterns.",
    problems: [
      {
        id: "reverse-linked-list",
        title: "Reverse Linked List",
        difficulty: "Easy",
        topic: "Linked List",
        pattern: "Iteration",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/reverse-linked-list/",
      },
      {
        id: "merge-two-lists",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        topic: "Linked List",
        pattern: "Two Pointers",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/merge-two-sorted-lists/",
      },
      {
        id: "lru-cache",
        title: "LRU Cache",
        difficulty: "Medium",
        topic: "Linked List",
        pattern: "Hash Map + Linked List",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/lru-cache/",
      },
    ],
  },

  {
    id: "bit",
    number: 9,
    title: "Bit Manipulation",
    description: "Bitwise operations and useful binary tricks.",
    problems: [
      {
        id: "single-number",
        title: "Single Number",
        difficulty: "Easy",
        topic: "Bit Manipulation",
        pattern: "XOR",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/single-number/",
      },
      {
        id: "counting-bits",
        title: "Counting Bits",
        difficulty: "Easy",
        topic: "Bit Manipulation",
        pattern: "DP + Bits",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/counting-bits/",
      },
    ],
  },

  {
    id: "greedy",
    number: 10,
    title: "Greedy Algorithms",
    description: "Greedy choices and optimization techniques.",
    problems: [
      {
        id: "jump-game",
        title: "Jump Game",
        difficulty: "Medium",
        topic: "Greedy",
        pattern: "Greedy",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/jump-game/",
      },
      {
        id: "gas-station",
        title: "Gas Station",
        difficulty: "Medium",
        topic: "Greedy",
        pattern: "Greedy",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/gas-station/",
      },
    ],
  },

  {
    id: "sliding-window",
    number: 11,
    title: "Sliding Window / Two Pointer",
    description: "Window expansion, shrinking and two-pointer techniques.",
    problems: [
      {
        id: "max-subarray",
        title: "Maximum Average Subarray I",
        difficulty: "Easy",
        topic: "Sliding Window",
        pattern: "Fixed Window",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/maximum-average-subarray-i/",
      },
      {
        id: "longest-repeating",
        title: "Longest Repeating Character Replacement",
        difficulty: "Medium",
        topic: "Sliding Window",
        pattern: "Variable Window",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/longest-repeating-character-replacement/",
      },
    ],
  },

  {
    id: "stack-queue",
    number: 12,
    title: "Stack and Queue",
    description: "Stack, queue, monotonic stack and expression patterns.",
    problems: [
      {
        id: "valid-parentheses",
        title: "Valid Parentheses",
        difficulty: "Easy",
        topic: "Stack",
        pattern: "Stack",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/valid-parentheses/",
      },
      {
        id: "daily-temperatures",
        title: "Daily Temperatures",
        difficulty: "Medium",
        topic: "Stack",
        pattern: "Monotonic Stack",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/daily-temperatures/",
      },
    ],
  },

  {
    id: "trees",
    number: 13,
    title: "Binary Trees",
    description: "Tree traversal, recursion, views and common patterns.",
    problems: [
      {
        id: "inorder",
        title: "Binary Tree Inorder Traversal",
        difficulty: "Easy",
        topic: "Trees",
        pattern: "DFS",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
      },
      {
        id: "level-order",
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        topic: "Trees",
        pattern: "BFS",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      },
      {
        id: "diameter-tree",
        title: "Diameter of Binary Tree",
        difficulty: "Easy",
        topic: "Trees",
        pattern: "DFS",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/diameter-of-binary-tree/",
      },
    ],
  },

  {
    id: "bst",
    number: 14,
    title: "Binary Search Trees",
    description: "BST properties, traversal and search techniques.",
    problems: [
      {
        id: "validate-bst",
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        topic: "BST",
        pattern: "DFS",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/validate-binary-search-tree/",
      },
      {
        id: "kth-smallest",
        title: "Kth Smallest Element in a BST",
        difficulty: "Medium",
        topic: "BST",
        pattern: "Inorder",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
      },
    ],
  },

  {
    id: "heap",
    number: 15,
    title: "Heaps / Priority Queue",
    description: "Priority queues, min-heaps, max-heaps and top-k patterns.",
    problems: [
      {
        id: "kth-largest",
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        topic: "Heap",
        pattern: "Priority Queue",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      },
      {
        id: "top-k",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        topic: "Heap",
        pattern: "Heap + Hashing",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/top-k-frequent-elements/",
      },
    ],
  },

  {
    id: "graphs",
    number: 16,
    title: "Graphs",
    description: "BFS, DFS, shortest paths, topological sorting and DSU.",
    problems: [
      {
        id: "number-islands",
        title: "Number of Islands",
        difficulty: "Medium",
        topic: "Graphs",
        pattern: "DFS / BFS",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/number-of-islands/",
      },
      {
        id: "course-schedule",
        title: "Course Schedule",
        difficulty: "Medium",
        topic: "Graphs",
        pattern: "Topological Sort",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/course-schedule/",
      },
      {
        id: "network-delay",
        title: "Network Delay Time",
        difficulty: "Medium",
        topic: "Graphs",
        pattern: "Dijkstra",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/network-delay-time/",
      },
    ],
  },

  {
    id: "dp",
    number: 17,
    title: "Dynamic Programming",
    description: "1D DP, 2D DP, subsequences and advanced DP patterns.",
    problems: [
      {
        id: "climbing-stairs",
        title: "Climbing Stairs",
        difficulty: "Easy",
        topic: "Dynamic Programming",
        pattern: "1D DP",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/climbing-stairs/",
      },
      {
        id: "house-robber",
        title: "House Robber",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        pattern: "1D DP",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/house-robber/",
      },
      {
        id: "coin-change",
        title: "Coin Change",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        pattern: "Unbounded Knapsack",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/coin-change/",
      },
    ],
  },

  {
    id: "tries",
    number: 18,
    title: "Tries",
    description: "Prefix trees, word search and string lookup.",
    problems: [
      {
        id: "implement-trie",
        title: "Implement Trie",
        difficulty: "Medium",
        topic: "Tries",
        pattern: "Prefix Tree",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
      },
      {
        id: "word-search-ii",
        title: "Word Search II",
        difficulty: "Hard",
        topic: "Tries",
        pattern: "Trie + Backtracking",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/word-search-ii/",
      },
    ],
  },

  {
    id: "advanced-strings",
    number: 19,
    title: "Advanced String Algorithms",
    description: "Advanced string matching and processing concepts.",
    problems: [
      {
        id: "longest-palindromic",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        topic: "Strings",
        pattern: "String DP",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/longest-palindromic-substring/",
      },
    ],
  },

  {
    id: "maths",
    number: 20,
    title: "Maths",
    description:
      "Mathematical concepts useful for DSA and competitive programming.",
    problems: [
      {
        id: "reverse-integer",
        title: "Reverse Integer",
        difficulty: "Medium",
        topic: "Math",
        pattern: "Simulation",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/reverse-integer/",
      },
      {
        id: "palindrome-number",
        title: "Palindrome Number",
        difficulty: "Easy",
        topic: "Math",
        pattern: "Number Manipulation",
        platform: "LeetCode",
        url: "https://leetcode.com/problems/palindrome-number/",
      },
    ],
  },
];

function difficultyClass(value: Difficulty) {
  if (value === "Easy") return "easy";
  if (value === "Medium") return "medium";
  return "hard";
}

export default function SheetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const isStriver =
    slug === "striver-a2z" ||
    slug === "striver-a2z-dsa-sheet" ||
    slug === "striver-style-patterns";

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [openModule, setOpenModule] = useState<string | null>("basics");
  const [completed, setCompleted] = useState<string[]>([]);

  const allProblems = useMemo(
    () => striverModules.flatMap((module) => module.problems),
    [],
  );

  const filteredModules = useMemo(() => {
    return striverModules
      .map((module) => ({
        ...module,
        problems: module.problems.filter((problem) => {
          const searchText =
            `${problem.title} ${problem.topic} ${problem.pattern ?? ""}`.toLowerCase();

          const matchesSearch = searchText.includes(search.toLowerCase());

          const matchesDifficulty =
            difficulty === "All" || problem.difficulty === difficulty;

          return matchesSearch && matchesDifficulty;
        }),
      }))
      .filter((module) => module.problems.length > 0);
  }, [search, difficulty]);

  function toggleComplete(id: string) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  if (!isStriver) {
    return (
      <div className="page">
        <Link href="/sheets" className="backLink">
          ← All DSA Sheets
        </Link>

        <div className="emptyState">
          <h2>Sheet not found</h2>
          <p>This sheet is not available yet.</p>
        </div>
      </div>
    );
  }

  const total = allProblems.length;
  const progress = total ? (completed.length / total) * 100 : 0;

  return (
    <div className="page">
      <Link href="/sheets" className="backLink">
        ← All DSA Sheets
      </Link>

      <div className="eyebrow">STRIVER&apos;S A2Z · DSA ROADMAP</div>

      <h1>Striver&apos;s A2Z DSA Sheet</h1>

      <p className="pageDescription">
        A structured DSA roadmap from programming fundamentals to advanced
        interview-level algorithms.
      </p>

      {/* STATS */}

      <div className="sheetStats">
        <div>
          <strong>{total}</strong>
          <span>Problems</span>
        </div>

        <div>
          <strong>{completed.length}</strong>
          <span>Completed</span>
        </div>

        <div>
          <strong>
            {allProblems.filter((p) => p.difficulty === "Easy").length}
          </strong>
          <span>Easy</span>
        </div>

        <div>
          <strong>
            {allProblems.filter((p) => p.difficulty === "Medium").length}
          </strong>
          <span>Medium</span>
        </div>

        <div>
          <strong>
            {allProblems.filter((p) => p.difficulty === "Hard").length}
          </strong>
          <span>Hard</span>
        </div>
      </div>

      {/* PROGRESS */}

      <div className="sheetProgress">
        <div className="sheetProgressTop">
          <span>YOUR PROGRESS</span>

          <span>
            {completed.length} / {total}
          </span>
        </div>

        <div className="progressBar">
          <div style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* FILTERS */}

      <div className="sheetFilters">
        <input
          className="searchInput"
          placeholder="Search problems, patterns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* MODULES */}

      <div className="a2zModules">
        {filteredModules.map((module) => {
          const moduleCompleted = module.problems.filter((problem) =>
            completed.includes(problem.id),
          ).length;

          const isOpen = openModule === module.id;

          return (
            <section className="a2zModule" key={module.id}>
              <button
                className="a2zModuleHeader"
                onClick={() => setOpenModule(isOpen ? null : module.id)}
              >
                <div className="moduleLeft">
                  <span className="moduleNumber">
                    {String(module.number).padStart(2, "0")}
                  </span>

                  <div>
                    <h2>{module.title}</h2>
                    <p>{module.description}</p>
                  </div>
                </div>

                <div className="moduleRight">
                  <span>
                    {moduleCompleted}/{module.problems.length}
                  </span>

                  <span className="moduleArrow">{isOpen ? "−" : "+"}</span>
                </div>
              </button>

              {isOpen && (
                <div className="moduleProblems">
                  {module.problems.map((problem, index) => {
                    const isCompleted = completed.includes(problem.id);

                    return (
                      <div
                        className={`problemRow ${
                          isCompleted ? "completed" : ""
                        }`}
                        key={problem.id}
                      >
                        <button
                          className={`problemCheck ${
                            isCompleted ? "checked" : ""
                          }`}
                          onClick={() => toggleComplete(problem.id)}
                          aria-label={`Mark ${problem.title} complete`}
                        >
                          {isCompleted ? "✓" : ""}
                        </button>

                        <div className="problemNumber">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="problemMain">
                          <h3>{problem.title}</h3>

                          <div className="problemMeta">
                            <span>{problem.topic}</span>

                            {problem.pattern && <span>{problem.pattern}</span>}

                            <span>{problem.platform}</span>
                          </div>
                        </div>

                        <span
                          className={`difficulty ${difficultyClass(
                            problem.difficulty,
                          )}`}
                        >
                          {problem.difficulty}
                        </span>

                        <Link
                          href={`/mentor?problem=${encodeURIComponent(
                            problem.title,
                          )}`}
                          className="problemAI"
                        >
                          AI
                        </Link>

                        <a
                          href={problem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="problemButton"
                        >
                          Solve ↗
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {filteredModules.length === 0 && (
        <div className="emptyState">
          <h3>No problems found</h3>
          <p>Try changing your search or difficulty filter.</p>
        </div>
      )}

      <div className="sheetFooter">
        <span>INTERVIEWREADY</span>
        <span>DSA · PATTERNS · PRACTICE</span>
      </div>
    </div>
  );
}
