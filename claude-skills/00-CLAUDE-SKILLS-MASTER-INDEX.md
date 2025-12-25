# Life Story System - Claude Skills Index

**Version**: 1.0
**Created**: 2024-12-24
**Last Updated**: 2024-12-24
**Purpose**: Skills for capturing, organizing, and developing Hamza's autobiographical narrative
**Total Skills**: 6 active, 6 planned

---

## Table of Contents

1. [Overview](#overview)
2. [Philosophy](#philosophy)
3. [Skill Categories](#skill-categories)
4. [Quick Reference](#quick-reference)
5. [Skill Inventory](#skill-inventory)
6. [Directory Structure](#directory-structure)
7. [Workflow](#workflow)

---

## Overview

### What Are Claude Skills?

Claude Skills are reusable workflows that make Claude better at specialized tasks. Each skill defines:

- **When to activate** (triggers)
- **What to do** (workflow steps)
- **What to avoid** (anti-patterns)
- **Success criteria** (validation)

### Life Story System

This is a **long-term memoir writing project** designed to:

- Capture memories and stories naturally through conversation
- Automatically extract metadata (time, characters, themes, locations)
- Build rich profiles of people and places over time
- Track consistency across entries
- Deepen memories through guided questions
- Eventually compile into chapters and drafts

**This is not a one-day thing** - it's built to grow over months and years, learning your voice, preferences, and patterns along the way.

---

## Philosophy

### Core Principles

| Principle | Meaning |
|-----------|---------|
| **Memory is not history** | Emotional truth matters as much as facts |
| **Fragments are valuable** | Brief entries are still worth capturing |
| **The story grows** | Each entry builds on the whole |
| **Questions over corrections** | Inconsistencies are explored, not fixed |
| **Your voice, preserved** | The system organizes but never rewrites |
| **Context grows over time** | AI learns your style, preferences, patterns |

### Writing Approach

- Share memories naturally - no special format needed
- AI extracts structure from your narrative
- Deepening questions draw out more detail
- Characters and locations build rich profiles automatically
- Your context file grows with each session

---

## Skill Categories

| Category | Folder | Active | Planned | Purpose |
|----------|--------|--------|---------|---------|
| **Life Story** | `14-lifestory/` | 6 | 6 | Memoir capture and organization |

---

## Quick Reference

### By Use Case

| I want to... | Use Skill | Status |
|--------------|-----------|--------|
| Share a memory/story | LIFE-01 Entry Processor | Active |
| Learn about a character | LIFE-02 Character Manager | Active |
| Check for contradictions | LIFE-04 Consistency Guardian | Active |
| Explore a memory deeper | LIFE-05 Emotion Excavator | Active |
| Describe a place | LIFE-11 Location Manager | Active |
| See AI understand my style | LIFE-00 Personal Context | Active |
| View timeline | LIFE-03 Timeline Builder | Planned |
| Find recurring themes | LIFE-06 Theme Tracker | Planned |
| Organize into chapters | LIFE-07 Chapter Architect | Planned |
| Find gaps in my story | LIFE-08 Gap Identifier | Planned |
| Link related stories | LIFE-09 Story Connector | Planned |
| Generate readable drafts | LIFE-10 Draft Generator | Planned |

### Commands

```
"Process this as a story entry"     → LIFE-01
"Tell me about [character]"         → LIFE-02
"Check my stories for consistency"  → LIFE-04
"Help me remember more about this"  → LIFE-05
"Describe [location]"               → LIFE-11
"What's my writing style?"          → LIFE-00
```

---

## Skill Inventory

### 14-LIFESTORY: Life Story Skills

> Active skills for capturing and organizing autobiographical narrative.

#### Active Skills

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| LIFE-00 | Personal Context | v1.0 | Active | Store writing style, preferences, learned patterns |
| LIFE-01 | Entry Processor | v1.0 | Active | Process raw entries, extract metadata |
| LIFE-02 | Character Manager | v1.1 | Active | Build profiles with progressions & relations |
| LIFE-04 | Consistency Guardian | v1.0 | Active | Check for contradictions across entries |
| LIFE-05 | Emotion Excavator | v1.0 | Active | Ask deepening questions, draw out feelings |
| LIFE-11 | Location Manager | v1.0 | Active | Track places with progressions & relations |

#### Planned Skills

| ID | Skill Name | Status | Purpose |
|----|------------|--------|---------|
| LIFE-03 | Timeline Builder | Planned | Create chronological index from entries |
| LIFE-06 | Theme Tracker | Planned | Identify recurring themes and arcs |
| LIFE-07 | Chapter Architect | Planned | Organize entries into chapters |
| LIFE-08 | Gap Identifier | Planned | Find missing periods worth exploring |
| LIFE-09 | Story Connector | Planned | Find links between entries |
| LIFE-10 | Draft Generator | Planned | Compile entries into readable drafts |

---

## Directory Structure

```
Story Writer/
├── claude-skills/
│   ├── 00-CLAUDE-SKILLS-MASTER-INDEX.md    ← This file
│   └── 14-lifestory/                        ← Life Story skills
│       ├── README.md
│       ├── LIFE-00-personal-context.md
│       ├── LIFE-01-entry-processor.md
│       ├── LIFE-02-character-manager.md
│       ├── LIFE-04-consistency-guardian.md
│       ├── LIFE-05-emotion-excavator.md
│       └── LIFE-11-location-manager.md
│
├── story-data/                              ← Your life story data
│   ├── entries/                             ← Story entries (markdown)
│   ├── characters/                          ← People profiles
│   │   ├── family/
│   │   ├── friends/
│   │   ├── mentors/
│   │   ├── colleagues/
│   │   ├── romantic/
│   │   └── other/
│   ├── locations/                           ← Place profiles
│   │   ├── homes/
│   │   ├── schools/
│   │   ├── workplaces/
│   │   ├── cities/
│   │   ├── neighborhoods/
│   │   ├── landmarks/
│   │   └── other/
│   ├── context/                             ← Personal context
│   │   └── hamza-profile.md
│   ├── chapters/                            ← Organized chapters
│   ├── timeline/                            ← Chronological index
│   └── themes/                              ← Theme tracking
│
├── metadata/                                ← System metadata
│   ├── consistency-log.md
│   ├── gaps-to-fill.md
│   └── progress.md
│
└── exports/                                 ← Generated outputs
    └── drafts/
```

---

## Workflow

### Writing Flow

```
Share a memory naturally
        ↓
   LIFE-01 (Process)
   Extract metadata, save entry
        ↓
┌───────┼───────┬───────┬───────┐
↓       ↓       ↓       ↓       ↓
LIFE-02 LIFE-11 LIFE-03 LIFE-04 LIFE-06
(Chars) (Locs)  (Time)  (Check) (Themes)
↓       ↓
└───┬───┘
    ↓
LIFE-05 (Deepen)
Ask questions, explore feelings
    ↓
LIFE-08 (Gaps)
Identify missing stories
    ↓
LIFE-07 (Chapters)
Organize into narrative
    ↓
LIFE-10 (Draft)
Generate readable output
```

### Personal Context Flow

```
Each writing session
        ↓
AI observes patterns:
- Writing style preferences
- Recurring themes
- How you refer to people
- Emotional patterns
        ↓
LIFE-00 updates context file
        ↓
Future sessions use context
for better, personalized responses
```

---

## How to Use

### Starting a Session

Just share a memory naturally:

```
"I remember when my father took me fishing for the first time.
I must have been 5 or 6. The waves scared me at first..."
```

The system will:
1. Process the entry (LIFE-01)
2. Extract characters, locations, time period
3. Create/update relevant profiles
4. Ask deepening questions (LIFE-05)
5. Update your personal context (LIFE-00)

### Exploring Your Story

- **"Tell me about Dad"** → Character profile
- **"What places have I written about?"** → Location summary
- **"Check for inconsistencies"** → Consistency report
- **"What themes keep coming up?"** → Theme analysis
- **"What periods haven't I covered?"** → Gap identification

---

## Future: Local Web Viewer

A Vite + React local web app for viewing (separate from writing):

- **Binder sidebar**: Navigate entries, characters, locations
- **Corkboard**: Visual cards showing entries
- **Outliner**: Table view with metadata
- **Timeline**: Horizontal timeline visualization
- **Character network**: Relationship visualization

Writing stays in terminal with Claude Code. Viewing/browsing in the web app.

---

## Maintenance

| Frequency | Task |
|-----------|------|
| After each session | Context file updated automatically |
| Weekly | Review consistency log |
| Monthly | Check for underdeveloped profiles |
| Quarterly | Identify major gaps, plan chapters |

---

*Life Story System v1.0 | Created 2024-12-24*
