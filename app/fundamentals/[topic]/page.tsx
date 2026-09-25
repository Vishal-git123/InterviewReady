"use client";

import Link from "next/link";
import { use, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronDown, Search } from "lucide-react";

type TopicItem = {
  id: string;
  title: string;
  explanation: string;
  interview: string;
};

type Subject = {
  title: string;
  description: string;
  topics: TopicItem[];
};

const fundamentals: Record<string, Subject> = {
  oop: {
    title: "Object Oriented Programming",
    description:
      "Understand the OOP concepts frequently asked in software engineering interviews.",
    topics: [
      {
        id: "classes-objects",
        title: "Classes & Objects",
        explanation:
          "A class is a blueprint that defines properties and behavior. An object is an instance created from that class.",
        interview: "What is the difference between a class and an object?",
      },
      {
        id: "encapsulation",
        title: "Encapsulation",
        explanation:
          "Encapsulation combines data and methods inside a class and controls access to internal state.",
        interview: "Why is encapsulation important in object-oriented design?",
      },
      {
        id: "inheritance",
        title: "Inheritance",
        explanation:
          "Inheritance allows one class to reuse or extend the properties and behavior of another class.",
        interview: "Explain inheritance and when you would use it.",
      },
      {
        id: "polymorphism",
        title: "Polymorphism",
        explanation:
          "Polymorphism allows the same interface or method name to represent different implementations.",
        interview: "Explain compile-time and runtime polymorphism.",
      },
      {
        id: "abstraction",
        title: "Abstraction",
        explanation:
          "Abstraction hides implementation details and exposes only the functionality required by the user.",
        interview:
          "What is abstraction and how is it different from encapsulation?",
      },
      {
        id: "solid",
        title: "SOLID Principles",
        explanation:
          "SOLID is a set of design principles that helps create maintainable and extensible object-oriented software.",
        interview:
          "Explain the Single Responsibility Principle with an example.",
      },
    ],
  },

  dbms: {
    title: "Database Management Systems",
    description:
      "Prepare SQL and database concepts commonly tested in SDE interviews.",
    topics: [
      {
        id: "keys",
        title: "Keys",
        explanation:
          "Primary keys uniquely identify records while foreign keys establish relationships between tables.",
        interview:
          "What is the difference between primary key and foreign key?",
      },
      {
        id: "normalization",
        title: "Normalization",
        explanation:
          "Normalization organizes relational data to reduce redundancy and improve consistency.",
        interview: "Explain 1NF, 2NF and 3NF.",
      },
      {
        id: "joins",
        title: "SQL Joins",
        explanation:
          "Joins combine rows from multiple tables using related columns.",
        interview: "Explain INNER JOIN, LEFT JOIN and RIGHT JOIN.",
      },
      {
        id: "indexing",
        title: "Indexing",
        explanation:
          "Indexes improve read performance by allowing databases to locate records efficiently.",
        interview: "What is a database index and what are its trade-offs?",
      },
      {
        id: "transactions",
        title: "Transactions",
        explanation:
          "A transaction is a logical unit of database operations that should maintain consistency.",
        interview: "Explain ACID properties.",
      },
      {
        id: "isolation",
        title: "Isolation Levels",
        explanation:
          "Isolation levels control how concurrent database transactions interact with each other.",
        interview:
          "What are dirty reads, non-repeatable reads and phantom reads?",
      },
    ],
  },

  "operating-systems": {
    title: "Operating Systems",
    description:
      "Learn the OS concepts frequently discussed during technical interviews.",
    topics: [
      {
        id: "processes",
        title: "Processes",
        explanation:
          "A process is a program in execution with its own address space and operating-system resources.",
        interview: "What is a process and how is it different from a program?",
      },
      {
        id: "threads",
        title: "Threads",
        explanation:
          "Threads are lightweight execution units within a process that share process resources.",
        interview: "What is the difference between a process and a thread?",
      },
      {
        id: "scheduling",
        title: "CPU Scheduling",
        explanation:
          "CPU scheduling determines which ready process should execute next.",
        interview: "Compare FCFS, SJF, Round Robin and Priority Scheduling.",
      },
      {
        id: "deadlocks",
        title: "Deadlocks",
        explanation:
          "A deadlock occurs when processes wait indefinitely for resources held by each other.",
        interview: "What are the four necessary conditions for deadlock?",
      },
      {
        id: "memory",
        title: "Memory Management",
        explanation:
          "Operating systems manage memory allocation, virtual memory, paging and segmentation.",
        interview: "What is virtual memory?",
      },
      {
        id: "synchronization",
        title: "Process Synchronization",
        explanation:
          "Synchronization mechanisms coordinate concurrent processes and prevent race conditions.",
        interview: "What is a race condition and how can it be prevented?",
      },
    ],
  },

  "computer-networks": {
    title: "Computer Networks",
    description:
      "Master networking concepts that frequently appear in SDE interviews.",
    topics: [
      {
        id: "osi",
        title: "OSI Model",
        explanation:
          "The OSI model divides network communication into seven conceptual layers.",
        interview: "Explain all seven layers of the OSI model.",
      },
      {
        id: "tcp-udp",
        title: "TCP vs UDP",
        explanation:
          "TCP provides reliable ordered communication while UDP provides lightweight connectionless communication.",
        interview: "When would you choose UDP over TCP?",
      },
      {
        id: "http",
        title: "HTTP & HTTPS",
        explanation:
          "HTTP is an application-layer protocol while HTTPS adds TLS-based encryption.",
        interview: "What happens when you enter a URL in your browser?",
      },
      {
        id: "dns",
        title: "DNS",
        explanation:
          "DNS translates human-readable domain names into IP addresses.",
        interview: "Explain the complete DNS resolution process.",
      },
      {
        id: "tls",
        title: "TLS",
        explanation:
          "TLS provides encrypted and authenticated communication over networks.",
        interview: "How does HTTPS secure communication?",
      },
    ],
  },

  "system-design": {
    title: "System Design",
    description:
      "Build a strong foundation for scalable backend and system design interviews.",
    topics: [
      {
        id: "scalability",
        title: "Scalability",
        explanation:
          "Scalability describes a system's ability to handle increasing workloads.",
        interview: "What is horizontal vs vertical scaling?",
      },
      {
        id: "load-balancer",
        title: "Load Balancing",
        explanation:
          "A load balancer distributes incoming requests across multiple servers.",
        interview: "Why do we need a load balancer?",
      },
      {
        id: "caching",
        title: "Caching",
        explanation:
          "Caching stores frequently accessed data closer to consumers to reduce latency.",
        interview: "Where would you introduce caching in a web application?",
      },
      {
        id: "message-queues",
        title: "Message Queues",
        explanation:
          "Message queues allow asynchronous communication between services.",
        interview: "Why would you use Kafka or RabbitMQ?",
      },
      {
        id: "database-scaling",
        title: "Database Scaling",
        explanation:
          "Large systems can scale databases through replication, partitioning and sharding.",
        interview: "Explain database replication and sharding.",
      },
      {
        id: "api-design",
        title: "API Design",
        explanation:
          "Good APIs define clear contracts, predictable resources, authentication and error handling.",
        interview: "What makes a REST API well designed?",
      },
    ],
  },

  javascript: {
    title: "JavaScript",
    description:
      "Prepare JavaScript concepts frequently asked in frontend and full-stack interviews.",
    topics: [
      {
        id: "scope",
        title: "Scope",
        explanation:
          "JavaScript has lexical scoping with global, function and block-level scopes.",
        interview: "Explain var, let and const.",
      },
      {
        id: "hoisting",
        title: "Hoisting",
        explanation:
          "Declarations are processed before execution, with different behavior for var, let, const and functions.",
        interview: "What is hoisting in JavaScript?",
      },
      {
        id: "closures",
        title: "Closures",
        explanation:
          "A closure allows a function to retain access to variables from its lexical environment.",
        interview: "Explain closures with a practical example.",
      },
      {
        id: "event-loop",
        title: "Event Loop",
        explanation:
          "The event loop coordinates synchronous JavaScript execution with asynchronous callbacks.",
        interview: "Explain the JavaScript event loop.",
      },
      {
        id: "promises",
        title: "Promises",
        explanation:
          "Promises represent the eventual completion or failure of an asynchronous operation.",
        interview: "Explain Promise.all, Promise.race and async/await.",
      },
      {
        id: "prototypes",
        title: "Prototypes",
        explanation:
          "Objects in JavaScript can inherit behavior through the prototype chain.",
        interview: "Explain prototype inheritance in JavaScript.",
      },
    ],
  },
};

export default function FundamentalTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = use(params);

  const subject = fundamentals[topic];

  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  const filteredTopics = useMemo(() => {
    if (!subject) return [];

    const query = search.trim().toLowerCase();

    if (!query) return subject.topics;

    return subject.topics.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.explanation.toLowerCase().includes(query) ||
        item.interview.toLowerCase().includes(query),
    );
  }, [subject, search]);

  if (!subject) {
    return (
      <div className="page">
        <Link href="/fundamentals" className="backLink">
          <ArrowLeft size={16} />
          All Fundamentals
        </Link>

        <div className="emptyState">
          <h2>Subject not found</h2>
          <p>This CS fundamentals subject does not exist.</p>
        </div>
      </div>
    );
  }

  const progress = Math.round((completed.length / subject.topics.length) * 100);

  function toggleComplete(id: string) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <div className="page">
      <Link href="/fundamentals" className="backLink">
        <ArrowLeft size={16} />
        All Fundamentals
      </Link>

      <div className="eyebrow">CS FUNDAMENTALS</div>

      <h1>{subject.title}</h1>

      <p className="pageDescription">{subject.description}</p>

      {/* PROGRESS */}
      <div
        className="card"
        style={{
          marginTop: "28px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <strong>Your Progress</strong>

          <span>
            {completed.length} / {subject.topics.length} · {progress}%
          </span>
        </div>

        <div className="progressBar">
          <div
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* SEARCH */}
      <div
        style={{
          position: "relative",
          marginBottom: "25px",
        }}
      >
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
          placeholder="Search topics or interview questions..."
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "14px 18px 14px 45px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
            color: "inherit",
            outline: "none",
          }}
        />
      </div>

      <div className="problemListHeader">
        <span>{filteredTopics.length} TOPICS</span>

        <span>{completed.length} COMPLETED</span>
      </div>

      {/* TOPICS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {filteredTopics.map((item, index) => {
          const isCompleted = completed.includes(item.id);
          const isOpen = open === item.id;

          return (
            <div
              className="card"
              key={item.id}
              style={{
                padding: "0",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "20px",
                }}
              >
                <button
                  onClick={() => toggleComplete(item.id)}
                  aria-label="Mark topic complete"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: isCompleted
                      ? "#7867ff"
                      : "rgba(255,255,255,0.03)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  {isCompleted && <Check size={16} />}
                </button>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "12px",
                      opacity: 0.45,
                      marginBottom: "5px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3
                    style={{
                      margin: 0,
                      textDecoration: isCompleted ? "line-through" : "none",
                      opacity: isCompleted ? 0.6 : 1,
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="badge"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {isOpen ? "Hide" : "Study"}

                  <ChevronDown
                    size={15}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "0.2s",
                    }}
                  />
                </button>
              </div>

              {isOpen && (
                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    padding: "22px",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div style={{ marginBottom: "22px" }}>
                    <div className="eyebrow">CONCEPT</div>

                    <p
                      style={{
                        lineHeight: 1.8,
                        marginTop: "8px",
                      }}
                    >
                      {item.explanation}
                    </p>
                  </div>

                  <div>
                    <div className="eyebrow">INTERVIEW QUESTION</div>

                    <p
                      style={{
                        lineHeight: 1.7,
                        marginTop: "8px",
                        fontWeight: 600,
                      }}
                    >
                      {item.interview}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="emptyState">
          <h3>No topics found</h3>
          <p>Try another search term.</p>
        </div>
      )}
    </div>
  );
}
