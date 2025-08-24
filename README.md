📖 Tinder-like App (Next.js + TypeScript + MUI)

🚀 Overview

A production-ready prototype of a Tinder-like application, where a user can swipe through profiles with Like or Dislike.
No registration, authentication, or profile management is included — only the swipe/match functionality.

Stack:

Next.js 13+ (App Router)
with TypeScript

Material UI
for UI components

API mock endpoints (/api/profiles) integrated with Next.js

Jest + React Testing Library
for testing (100% coverage)

📦 Installation
git clone https://github.com/your-username/tinder-like.git
cd tinder-like
npm install

▶️ Development
npm run dev

App runs at http://localhost:3000

🏗 Production Build
npm run build
npm start

🧪 Testing

Run tests with full coverage:

npm run test

Coverage reports will be available inside the coverage/ folder.

🔌 API Contract

The API specification is documented in OpenAPI 3.0 format.
📄 File: openapi.yaml

You can open it using Swagger Editor

Endpoints

GET /api/profiles → returns a list of profiles or 204 if no profiles are left

🛠 Error Handling & Edge Cases

If there are no more profiles → returns 204 No Content, frontend displays “No more profiles”.

Invalid swipe request → returns 400 Bad Request.

If two users like each other → returns { match: true, message: "It's a match with --name!" }.
