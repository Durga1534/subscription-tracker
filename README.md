# Subscription Tracker API

A simple subscription-tracking REST API built with Node.js, Express and MongoDB.  
Supports user auth (JWT), subscription management, scheduled reminders (Upstash workflows / QStash) and automated rate/bot protection via Arcjet.

---

## Key features
- User authentication (JWT)
- CRUD for subscriptions (auto-calc renewal date)
- Upstash Workflow triggers for reminders
- Arcjet-based rate limiting & bot detection middleware
- Mongoose models with validation
- Env-driven configuration for multiple environments

---

## Tech stack
- Node.js (recommend LTS: Node 20.x)
- Express
- MongoDB via Mongoose (MongoDB Atlas)
- Arcjet (@arcjet/node) for rate-limiting/bot detection
- Upstash / QStash for workflow/webhook processing
- dotenv for environment variables
- Nodemon for local development

---

## Repository layout (important files)
- app.js — application bootstrap & middleware
- config/
  - env.js — environment variable exports
  - arcjet.js — Arcjet client configuration
  - upstash.js — Upstash workflow client config
- controllers/ — route handlers (subscriptions, users, auth, workflows)
- middleware/ — auth, arcjet, error handling, etc.
- models/ — Mongoose models (User, Subscription)
- routes/ — Express routers
- database/ — MongoDB connection helper

---

## Prerequisites
- Node.js 20.x (recommended)
- npm (or pnpm/yarn)
- MongoDB Atlas cluster and connection string
- Arcjet API key (if using Arcjet)
- Upstash / QStash credentials (if using workflows)
- .env file (see example below)

---

## Environment variables (.env)
Create `.env.development.local` (or `.env`) in the project root. Example values:

````text
PORT=5050
SERVER_URL="http://localhost:5050"
NODE_ENV=development

MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.qyy3ei8.mongodb.net/subscription-tracker?retryWrites=true&w=majority"

JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="1d"

ARCJET_KEY="ajkey_xxx"
ARCJET_ENV="development"

QSTASH_URL="http://127.0.0.1:8080"
QSTASH_TOKEN="your-qstash-token"

EMAIL_PASSWORD="..."
