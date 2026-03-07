# Africa GRC Summit 1.0 — Supabase & Admin Setup

This document outlines the architecture and configuration for the Africa GRC Summit 1.0 (2026) administration and data management system.

---

## 🏗️ Architecture Overview

The system uses a **Hybrid Configuration Strategy** to ensure maximum reliability and real-time updates:

1.  **Supabase (Primary)**: The primary source of truth for all summit configurations (agenda, speakers, venue, etc.).
2.  **Local JSON (Fallback & Cache)**: A local `summit-config.json` file acts as a persistent cache and safety fallback if Supabase is unreachable. 
3.  **Synchronization**: Updates via the Admin UI are simultaneously pushed to both Supabase and the local JSON file.

---

## 🗄️ Supabase Configuration

### Table Schema
The data is stored in a single master configuration table to allow for flexible schema evolution within the `content` JSONB field.

**Table Name**: `summit_config`

| Column | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY` (Expected: `africa-grc-1.0`) |
| `content` | `JSONB` | `NOT NULL` |
| `updated_at` | `TIMESTAMPTZ` | `DEFAULT now()` |

### SQL for Initialization
```sql
CREATE TABLE IF NOT EXISTS public.summit_config (
    id TEXT PRIMARY KEY,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

---

## 📡 API Endpoints

### `GET /api/admin/config`
Fetches the master configuration.
- **Protocol**: 
  1. Attempt to fetch from Supabase.
  2. If found, return content.
  3. If Supabase fails or is empty, read from `src/data/summit-config.json`.
  4. If local exists but Supabase is empty, proactively attempt to seed Supabase with local data.

### `PUT /api/admin/config`
Updates a specific section of the configuration (e.g., `hero`, `agenda`).
- **Body**: `{ "section": "hero", "data": { ... } }`
- **Protocol**:
  1. Fetch current config from Supabase.
  2. Update the specific section in memory.
  3. Upsert back to Supabase.
  4. Persist updated full config to `src/data/summit-config.json`.

---

## 🛡️ Environment Variables (`.env.local`)

Ensure the following variables are set for both the frontend and the seeding scripts:

```bash
# Supabase Connectivity
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

# Direct Postgres Access (for seeding/migration)
DATABASE_URL="postgresql://postgres:PASSWORD@DB_HOST:5432/postgres"
```

---

## ⚡ Admin Dashboard Overview

The admin center is located at `/admin`. It provides a strategic overview of the summit status:

- **Executive Dashboard**: Real-time stats derived from the configuration (Total Sessions, Speakers, etc.).
- **Strategic Configuration**: Quick access to calibration modules:
  - **Agenda**: Session management and curriculum timing.
  - **Hero**: Title, dates, and event status.
  - **Speakers**: Keynote bios and profile management.
  - **Venue**: Location updates and map coordinates.

---

## 🌱 Seeding the Database

If the Supabase project is empty, use the provided `seed_supabase.js` script to synchronize your local development content to the cloud:

```bash
# Load env and run the seed script
node -e 'require("dotenv").config({ path: ".env.local" }); require("./seed_supabase.js");'
```

---

## 🏁 Current Status
- **Table Existence**: Verified via Dashboard.
- **Connectivity**: Local fallback is active.
- **Admin UI**: Structure implemented for high-level monitoring.
- **Sync Protocol**: Implemented in API routes.
