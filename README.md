# InterviewReady v3

A corrected MVP focused on the core product you described:
- Separate LeetCode and Codeforces sections
- Live LeetCode catalog fetched server-side and searchable/filterable
- Live Codeforces problemset with rating/tag filters
- Every problem opens on the official platform
- DSA learning sheets, company prep, virtual contest shell, CS fundamentals
- AI Mentor using any OpenAI-compatible chat-completions endpoint

## Run
npm install
copy .env.example .env
npm run dev
Open http://localhost:3000

## AI
Set AI_API_KEY, AI_BASE_URL and AI_MODEL in .env. Restart npm run dev.

## Note
LeetCode does not provide a stable public REST API for all problem data; this project uses a server-side GraphQL request. If LeetCode changes its GraphQL schema or rate limits requests, the adapter may need updating. Codeforces uses its public problemset API.
