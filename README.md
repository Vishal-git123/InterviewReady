# InterviewReady

> AI-powered software engineering interview preparation platform for DSA, coding contests, company-specific preparation, CS fundamentals, and AI-guided learning.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=flat-square&logo=google" />
  <img src="https://img.shields.io/badge/Auth.js-Authentication-purple?style=flat-square" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" />
</p>

## Overview

InterviewReady is a full-stack interview preparation platform designed to bring the major parts of software engineering interview preparation into one place.

Instead of switching between multiple resources, users can practice DSA, explore company-focused problems, study core CS subjects, participate in virtual contests, and interact with an AI mentor.

## Features

### DSA Problem Practice

- LeetCode problem catalog
- Search by problem title or number
- Difficulty filtering
- Topic-based filtering
- Direct links to official LeetCode problems
- Problem-focused preparation workflows

### DSA Sheets

Structured preparation paths such as:

- Blind 75
- Striver A2Z
- Interview-focused sheets
- Competitive programming starter paths

Features include:

- Topic filtering
- Difficulty filtering
- Search
- Progress tracking
- Problem completion state
- Direct problem links

### Company Interview Preparation

Practice problems organized around companies such as:

- Amazon
- Google
- Microsoft
- Meta
- Apple
- Adobe
- Uber
- LinkedIn
- and many more

Company pages provide:

- Company search
- Problem search
- Difficulty filters
- Recency-based preparation views
- Frequency-oriented problem ordering
- Solved tracking
- Direct LeetCode links

> Company frequency/recency values are preparation data and should not be interpreted as guarantees of future interview questions.

### Contest Arena

The contest section includes:

- LeetCode contest tracking
- Codeforces contest tracking
- Upcoming/past contest views
- Contest search
- Virtual contest mode

### Virtual Contest Mode

Users can start an in-app timed contest with:

- Configurable duration
- Multiple problems
- Problem navigation
- Countdown timer
- Submission state
- Solved tracking
- Score calculation
- Final performance summary

### CS Fundamentals

Interview preparation for:

- OOP
- DBMS
- Operating Systems
- Computer Networks
- System Design
- JavaScript

Each subject includes:

- Topic-wise learning
- Concept explanations
- Interview questions
- Search
- Completion tracking
- Progress percentage

### AI Mentor

AI-powered interview assistance using Google Gemini.

The mentor can help with:

- DSA hints
- Problem-solving guidance
- Approach explanations
- Time and space complexity
- Debugging
- Code review
- CS fundamentals
- Interview preparation
- Study planning
- Follow-up interview questions

The AI interface supports:

- Markdown rendering
- Code blocks
- Chat history during the session
- Loading states
- Error handling
- Suggested prompts
- Enter-to-send interaction

### Authentication

Authentication is implemented using Auth.js.

Currently supported:

- GitHub OAuth
- Session-based authentication

Google OAuth can be added separately once Google OAuth credentials are configured.

---

## Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- CSS
- Lucide React
- React Markdown
- Remark GFM

### Backend

- Next.js App Router
- Route Handlers
- Auth.js
- Google Gemini API

### Data / APIs

- LeetCode GraphQL API
- Codeforces API
- Gemini API

### Deployment

- Vercel

---

## Project Structure

```text
interview-ready/
│
├── app/
│   ├── ai/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   ├── ai/
│   │   │   └── route.ts
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   ├── codeforces/
│   │   │   └── route.ts
│   │   └── leetcode/
│   │       └── route.ts
│   │
│   ├── companies/
│   │   ├── page.tsx
│   │   └── [company]/
│   │       └── page.tsx
│   │
│   ├── contests/
│   │   ├── page.tsx
│   │   └── virtual/
│   │       └── page.tsx
│   │
│   ├── fundamentals/
│   │   ├── page.tsx
│   │   └── [topic]/
│   │       └── page.tsx
│   │
│   ├── leetcode/
│   ├── codeforces/
│   ├── sheets/
│   ├── dashboard/
│   ├── login/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
├── public/
├── auth.ts
├── package.json
├── tsconfig.json
└── README.md
