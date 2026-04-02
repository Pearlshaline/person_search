# Person App — Pearlshaline Gumiran

![Status](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![Prisma](https://img.shields.io/badge/Prisma-5-2D3748) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue)

A full-stack Person Management application with complete CRUD operations, built with Next.js 15, Prisma ORM, and PostgreSQL.

**Live Demo:** [https://personapp-gamma.vercel.app/](https://personapp-gamma.vercel.app/)  
**Repository:** [github.com/Pearlshaline/person-app](https://github.com/Pearlshaline/person-app)

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main Person CRUD interface |
| `/about` | App architecture and tech stack |
| `/database` | Prisma schema and database structure |
| `/github` | GitHub repository links |

---

## Features

- ✅ **Full CRUD** — Create, Read, Update, Delete persons
- ✅ **Search & Filter** — Real-time search by name, email, address
- ✅ **Responsive** — Works on desktop and mobile
- ✅ **Dark/Light Mode** — Toggle in navbar
- ✅ **Validation** — Form validation with error messages
- ✅ **Sample Data** — 5 pre-seeded persons for testing

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | React framework with App Router |
| TypeScript | Type-safe development |
| Prisma ORM | Type-safe database access |
| PostgreSQL (Neon) | Serverless relational database |
| Tailwind CSS | Utility-first styling |
| Vercel | Deployment platform |

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/Pearlshaline/person-app.git
cd person-app

# 2. Install
npm install

# 3. Environment
cp .env.example .env
# Edit .env and add your DATABASE_URL from neon.tech

# 4. Database
npx prisma migrate dev --name init
npx prisma db seed

# 5. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add `DATABASE_URL` in Environment Variables
4. Deploy ✅

---

## Database Schema

```prisma
model Person {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  phone     String?
  age       Int?
  address   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

