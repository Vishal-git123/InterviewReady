"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, Send, Sparkles, User, Loader2, RotateCcw } from "lucide-react";

type Message = {
  role: "user" | "mentor";
  content: string;
};

const suggestions = [
  "How can I improve my problem solving skills?",
  "Give me a 30-day DSA preparation plan",
  "Explain sliding window with an example",
  "How should I prepare for an SDE interview?",
];

export default function AIMentor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "mentor",
      content:
        "Hi! I'm your **InterviewReady AI Mentor**. 👋\n\nPaste a DSA problem, your code, an error, or ask me anything about **interview preparation**.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const message = (text ?? input).trim();

    if (!message || loading) return;

    setInput("");

    const userMessage: Message = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "mentor",
          content: data.answer || "No answer returned.",
        },
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "mentor",
          content: `**Something went wrong.**\n\n${
            error?.message || "Unable to reach the AI mentor."
          }`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "mentor",
        content: "Chat cleared. 👋\n\nWhat would you like to practice today?",
      },
    ]);
  };

  return (
    <main className="aiPage">
      <div className="aiContainer">
        {/* HEADER */}
        <div className="aiHeader">
          <div>
            <div className="eyebrow">
              <Sparkles size={14} />
              AI INTERVIEW MENTOR
            </div>

            <h1>Practice smarter with AI</h1>

            <p>
              Get hints, explanations, debugging help and interview-focused
              guidance.
            </p>
          </div>

          <button
            type="button"
            className="clearButton"
            onClick={clearChat}
            title="Clear chat"
          >
            <RotateCcw size={16} />
            Clear
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="aiGrid">
          {/* CHAT */}
          <section className="chatCard">
            <div className="chatTopbar">
              <div className="mentorIdentity">
                <div className="mentorAvatar">
                  <Bot size={20} />
                </div>

                <div>
                  <strong>InterviewReady Mentor</strong>
                  <span>
                    <i className="onlineDot" />
                    AI Mentor online
                  </span>
                </div>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`messageRow ${
                    message.role === "user" ? "userRow" : "mentorRow"
                  }`}
                >
                  <div
                    className={`messageAvatar ${
                      message.role === "user" ? "userAvatar" : "botAvatar"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User size={16} />
                    ) : (
                      <Bot size={16} />
                    )}
                  </div>

                  <div
                    className={`messageBubble ${
                      message.role === "user" ? "userBubble" : "mentorBubble"
                    }`}
                  >
                    <div className="messageName">
                      {message.role === "user" ? "You" : "Mentor"}
                    </div>

                    {message.role === "mentor" ? (
                      <div className="markdownContent">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({
                              inline,
                              className,
                              children,
                              ...props
                            }: any) {
                              return inline ? (
                                <code className="inlineCode" {...props}>
                                  {children}
                                </code>
                              ) : (
                                <pre className="codeBlock">
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                </pre>
                              );
                            },

                            a({ children, ...props }) {
                              return (
                                <a
                                  {...props}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {children}
                                </a>
                              );
                            },
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="userText">{message.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* LOADING */}
              {loading && (
                <div className="messageRow mentorRow">
                  <div className="messageAvatar botAvatar">
                    <Bot size={16} />
                  </div>

                  <div className="messageBubble mentorBubble">
                    <div className="messageName">Mentor</div>

                    <div className="typing">
                      <span />
                      <span />
                      <span />
                      <em>Thinking...</em>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* SUGGESTIONS */}
            {messages.length === 1 && (
              <div className="suggestions">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    disabled={loading}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* INPUT */}
            <form className="inputArea" onSubmit={handleSubmit}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste a problem, code, error, or ask an interview question..."
                rows={3}
                disabled={loading}
              />

              <div className="inputBottom">
                <span>Enter to send · Shift + Enter for new line</span>

                <button type="submit" disabled={!input.trim() || loading}>
                  {loading ? (
                    <Loader2 size={17} className="spin" />
                  ) : (
                    <Send size={17} />
                  )}
                  Send
                </button>
              </div>
            </form>
          </section>

          {/* SIDEBAR */}
          <aside className="mentorSidebar">
            <div className="sideHeader">
              <Sparkles size={18} />
              <h3>Mentor modes</h3>
            </div>

            <div className="modeList">
              <div>
                <span>01</span>
                <section>
                  <strong>Hint only</strong>
                  <p>Get hints without revealing the complete solution.</p>
                </section>
              </div>

              <div>
                <span>02</span>
                <section>
                  <strong>Explain approach</strong>
                  <p>Understand the intuition and optimal approach.</p>
                </section>
              </div>

              <div>
                <span>03</span>
                <section>
                  <strong>Debug my code</strong>
                  <p>Find bugs and understand why your solution fails.</p>
                </section>
              </div>

              <div>
                <span>04</span>
                <section>
                  <strong>Complexity analysis</strong>
                  <p>Analyze time and space complexity.</p>
                </section>
              </div>

              <div>
                <span>05</span>
                <section>
                  <strong>Interview follow-ups</strong>
                  <p>Practice questions an interviewer might ask next.</p>
                </section>
              </div>
            </div>

            <div className="mentorTip">
              <Bot size={18} />

              <div>
                <strong>Pro tip</strong>
                <p>
                  Don't immediately ask for the solution. Ask for a hint first
                  and try solving it yourself.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .aiPage {
          min-height: calc(100vh - 70px);
          padding: 64px 24px 80px;
        }

        .aiContainer {
          max-width: 1250px;
          margin: 0 auto;
        }

        .aiHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
          margin-bottom: 32px;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #8b7cff;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 14px;
        }

        .aiHeader h1 {
          margin: 0;
          font-size: clamp(32px, 5vw, 52px);
          letter-spacing: -2px;
        }

        .aiHeader p {
          margin: 12px 0 0;
          color: #9296a5;
          max-width: 650px;
          line-height: 1.7;
        }

        .clearButton {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 15px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: #aeb2c0;
          cursor: pointer;
        }

        .clearButton:hover {
          background: rgba(255, 255, 255, 0.07);
          color: white;
        }

        .aiGrid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 310px;
          gap: 20px;
        }

        .chatCard,
        .mentorSidebar {
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: rgba(12, 15, 22, 0.82);
          border-radius: 20px;
          overflow: hidden;
        }

        .chatTopbar {
          padding: 18px 22px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .mentorIdentity {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mentorAvatar,
        .messageAvatar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mentorAvatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(124, 108, 255, 0.15);
          color: #9b8cff;
        }

        .mentorIdentity strong {
          display: block;
          font-size: 14px;
        }

        .mentorIdentity span {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 3px;
          font-size: 11px;
          color: #777d8e;
        }

        .onlineDot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #42d392;
          box-shadow: 0 0 8px #42d392;
        }

        .messages {
          min-height: 520px;
          max-height: 680px;
          overflow-y: auto;
          padding: 25px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .messageRow {
          display: flex;
          gap: 11px;
          max-width: 92%;
        }

        .userRow {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .mentorRow {
          align-self: flex-start;
        }

        .messageAvatar {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          margin-top: 4px;
        }

        .botAvatar {
          background: rgba(124, 108, 255, 0.13);
          color: #9b8cff;
        }

        .userAvatar {
          background: rgba(255, 255, 255, 0.07);
          color: #c8cbd4;
        }

        .messageBubble {
          padding: 14px 16px;
          border-radius: 15px;
          line-height: 1.65;
          font-size: 14px;
          min-width: 80px;
        }

        .mentorBubble {
          background: #171b24;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-top-left-radius: 5px;
        }

        .userBubble {
          background: #40318f;
          border-top-right-radius: 5px;
        }

        .messageName {
          font-size: 11px;
          font-weight: 800;
          color: #888e9f;
          margin-bottom: 7px;
        }

        .userBubble .messageName {
          color: #bdb5ff;
        }

        .userText {
          margin: 0;
          white-space: pre-wrap;
        }

        .markdownContent {
          color: #d8dbe4;
        }

        .markdownContent p {
          margin: 0 0 12px;
        }

        .markdownContent p:last-child {
          margin-bottom: 0;
        }

        .markdownContent h1,
        .markdownContent h2,
        .markdownContent h3 {
          color: #fff;
          line-height: 1.3;
          margin: 20px 0 9px;
        }

        .markdownContent h1 {
          font-size: 21px;
        }

        .markdownContent h2 {
          font-size: 18px;
        }

        .markdownContent h3 {
          font-size: 16px;
        }

        .markdownContent ul,
        .markdownContent ol {
          margin: 9px 0 14px;
          padding-left: 22px;
        }

        .markdownContent li {
          margin: 5px 0;
        }

        .markdownContent strong {
          color: white;
          font-weight: 700;
        }

        .markdownContent a {
          color: #9b8cff;
        }

        .inlineCode {
          padding: 2px 6px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.08);
          color: #c5baff;
          font-family: monospace;
          font-size: 12px;
        }

        .codeBlock {
          overflow-x: auto;
          margin: 14px 0 4px;
          padding: 15px;
          border-radius: 10px;
          background: #090b10;
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 12px;
          line-height: 1.65;
        }

        .codeBlock code {
          font-family: "JetBrains Mono", Consolas, monospace;
        }

        .typing {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8b7cff;
          animation: bounce 1.2s infinite;
        }

        .typing span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .typing span:nth-child(3) {
          animation-delay: 0.3s;
        }

        .typing em {
          margin-left: 7px;
          font-size: 11px;
          color: #74798a;
          font-style: normal;
        }

        @keyframes bounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.45;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }

        .suggestions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding: 0 24px 18px;
        }

        .suggestions button {
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: rgba(255, 255, 255, 0.025);
          color: #aeb2c0;
          border-radius: 9px;
          padding: 9px 11px;
          font-size: 12px;
          cursor: pointer;
          text-align: left;
        }

        .suggestions button:hover {
          border-color: rgba(139, 124, 255, 0.45);
          color: #c6bfff;
        }

        .inputArea {
          padding: 17px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .inputArea textarea {
          width: 100%;
          box-sizing: border-box;
          resize: vertical;
          min-height: 82px;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: #0b0e14;
          color: white;
          outline: none;
          font: inherit;
          font-size: 13px;
        }

        .inputArea textarea:focus {
          border-color: rgba(139, 124, 255, 0.55);
          box-shadow: 0 0 0 3px rgba(139, 124, 255, 0.07);
        }

        .inputBottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
        }

        .inputBottom span {
          color: #656b7a;
          font-size: 10px;
        }

        .inputBottom button {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 16px;
          border: 0;
          border-radius: 9px;
          background: #7c6cff;
          color: white;
          font-weight: 700;
          cursor: pointer;
        }

        .inputBottom button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .mentorSidebar {
          padding: 22px;
          align-self: start;
        }

        .sideHeader {
          display: flex;
          align-items: center;
          gap: 9px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .sideHeader svg {
          color: #9b8cff;
        }

        .sideHeader h3 {
          margin: 0;
          font-size: 15px;
        }

        .modeList {
          padding-top: 8px;
        }

        .modeList > div {
          display: flex;
          gap: 12px;
          padding: 15px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .modeList > div > span {
          color: #70687f;
          font-size: 11px;
          font-weight: 800;
        }

        .modeList strong {
          font-size: 13px;
        }

        .modeList p {
          margin: 5px 0 0;
          color: #747a89;
          font-size: 11px;
          line-height: 1.5;
        }

        .mentorTip {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          padding: 14px;
          border-radius: 12px;
          background: rgba(124, 108, 255, 0.07);
          border: 1px solid rgba(124, 108, 255, 0.12);
        }

        .mentorTip svg {
          flex-shrink: 0;
          color: #9b8cff;
        }

        .mentorTip strong {
          font-size: 12px;
        }

        .mentorTip p {
          margin: 5px 0 0;
          color: #7e8493;
          font-size: 11px;
          line-height: 1.55;
        }

        @media (max-width: 900px) {
          .aiGrid {
            grid-template-columns: 1fr;
          }

          .mentorSidebar {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .aiPage {
            padding: 35px 14px 60px;
          }

          .aiHeader {
            align-items: flex-start;
            flex-direction: column;
          }

          .messages {
            padding: 16px;
          }

          .messageRow {
            max-width: 96%;
          }

          .suggestions {
            padding: 0 16px 15px;
          }
        }
      `}</style>
    </main>
  );
}
