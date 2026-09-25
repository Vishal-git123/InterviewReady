"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const subjects = [
  {
    slug: "oop",
    title: "OOP",
    description:
      "Classes, objects, inheritance, polymorphism, abstraction, encapsulation and SOLID principles.",
    topics: 12,
  },
  {
    slug: "dbms",
    title: "DBMS",
    description:
      "SQL, normalization, indexing, transactions, joins, keys, ACID and isolation levels.",
    topics: 14,
  },
  {
    slug: "operating-systems",
    title: "Operating Systems",
    description:
      "Processes, threads, scheduling, memory management, deadlocks, synchronization and virtual memory.",
    topics: 15,
  },
  {
    slug: "computer-networks",
    title: "Computer Networks",
    description:
      "HTTP, TCP/IP, UDP, DNS, TLS, OSI model, routing, congestion control and networking fundamentals.",
    topics: 14,
  },
  {
    slug: "system-design",
    title: "System Design",
    description:
      "Scalability, APIs, caching, queues, databases, load balancing and distributed systems.",
    topics: 16,
  },
  {
    slug: "javascript",
    title: "JavaScript",
    description:
      "Closures, promises, async/await, event loop, prototypes, hoisting and modern JavaScript.",
    topics: 15,
  },
];

export default function Fundamentals() {
  return (
    <div className="page">
      <div className="eyebrow">CS FUNDAMENTALS</div>

      <h1>Core interview subjects</h1>

      <p className="pageDescription">
        Master the core concepts asked in SDE interviews with structured
        revision, interview questions and topic-wise preparation.
      </p>

      <div className="grid">
        {subjects.map((subject) => (
          <div className="card" key={subject.slug}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <div>
                <div className="eyebrow">SUBJECT</div>

                <h3 style={{ marginTop: "8px" }}>{subject.title}</h3>
              </div>

              <ArrowUpRight size={19} style={{ opacity: 0.45 }} />
            </div>

            <p>{subject.description}</p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "18px",
                marginBottom: "18px",
              }}
            >
              <span className="badge">{subject.topics} Topics</span>

              <span className="badge">Interview Ready</span>
            </div>

            <Link
              href={`/fundamentals/${subject.slug}`}
              className="primary"
              style={{
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              Study →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
