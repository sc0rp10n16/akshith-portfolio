# CRM pipeline view — image prompt

Use this to generate the hero image for the Edmissions World CRM case study (`/work/edmissions-crm`, the 16:9 “CRM pipeline view” slot).

Generate **one** still. Not a collage. Not a mockup on a laptop. Not a kanban.

---

## Copy-paste prompt

A 16:9 desktop screenshot of a **private staff CRM pipeline**, viewed as a dense **spreadsheet-style lead table** (not cards, not a Kanban board, not a CRM template from Dribbble).

Product: **Edmissions World CRM** — admissions floor software for an education consultancy in Hyderabad. Staff tool only. No student portal. No marketing website.

Photoreal UI screenshot, slightly grainy OLED monitor, shot straight-on, no bezel, no phone, no hands.

### Layout

Dark app chrome, almost black olive (`#0c0d0b`), raised panels `#131410`, hairline borders in warm off-white at ~12% opacity.

**Left sidebar (narrow)**
- Wordmark: EDMISSIONS WORLD CRM in a chunky pixel / bitmap mono, 16px feel
- Role badge: SALES MANAGER
- Nav: Leads, Follow-ups, DNP, Teams, Reports, Leave
- Leads item is active, marked with a thin ice-blue (`#7eb4ff`) bar

**Top bar**
- Search leads
- Daily cap 42 / 50
- Asia/Kolkata 00:05 job hint: “NoContact → Follow-up 1 overnight”
- User chip: R. Sharma · Manager

**Main view — THE PIPELINE (must dominate the frame)**
A spreadsheet grid filling the remaining width. Many rows visible (28–40). High information density. Rows are the unit of work.

Columns, left to right, readable at a glance:
1. Checkbox
2. Student name (Indian names: Priya S., Arjun V., Fatima A., Rahul M., Sneha Iyer, Daniel P.)
3. Source (CSV, Walk-in, WhatsApp)
4. Owner (telecaller first names)
5. Team
6. Status
7. Follow-up date
8. Counselor
9. Notes (one short clause)

**Status chips** (use these exact labels, mixed down the column):
New · In progress · No contact · Follow-up 1 · Follow-up 2 · Follow-up 3 · Qualified · Counselor-assigned

Status colour: ice-blue outline for Qualified / Counselor-assigned; muted warm grey for No contact; default off-white for the rest. No rainbow Material chips. No green “success” pills.

One row is selected (subtle raised background `#131410`, left ice-blue hairline). The selected row’s notes read: “Called twice. Father will send 10th marks. Qualify to counselor.”

A slim filter row above the grid: Status, Owner, Team, Follow-up today. Pixel-mono labels, uppercase, 1px letter-spacing.

Tiny footer: 1,248 leads · 37 missed follow-ups · DNP 11

### What this is NOT

- Not a Kanban / Trello / HubSpot pipeline with cards
- Not a student application portal
- Not a mobile app
- Not a 3D glass morphism dashboard with giant donut charts
- Not light mode
- Not rounded-everything SaaS (8px max radius, mostly 0–2px)
- No logos of Salesforce, HubSpot, Notion
- No watermarks, no “AI generated”, no captions overlaid, no fake browser URL bar unless it is a thin dark Chrome with localhost omitted
- No Lorem ipsum. English UI, Indian names.

### Palette (match the portfolio)

- Background: `#0c0d0b`
- Text: `#ece6d8`
- Muted: `#a39d90`
- Signal / active: `#7eb4ff`
- Signal dim: `#5a87c4`
- Hairlines: `rgba(236,230,216,0.12)`

Typography: UI labels in a bitmap / pixel-operator mono (think Pixel Operator Mono, JetBrains Mono as fallback). Body names in a clean grotesque. No Inter-on-white. No Inter-on-purple.

Lighting: flat UI, no drop shadows heavier than 1px, no bloom, no neon glow except the ice-blue selection bar.

### Output

- Single PNG, **16:9**, **2400 × 1350** (or 1920 × 1080)
- PNG-24, no alpha needed (opaque)
- Crop tight to the app. Full-bleed UI.
- Must read as a **working admissions floor tool**, not a concept deck.

---

## Negative prompt (if the tool has one)

kanban, trello, cards, sticky notes, light mode, white background, purple gradient, glassmorphism, 3D, isometric, laptop mockup, phone mockup, hands, watermark, illegible tiny text, rainbow status pills, Salesforce, HubSpot, generic CRM template, student login, cute illustrations, isometric office

---

## After you generate

Save as `public/crm-pipeline-view.png` (or send the file) if you want it on the case study.
