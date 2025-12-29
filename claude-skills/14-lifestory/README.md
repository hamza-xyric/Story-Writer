# 14-LIFESTORY: Personal Life Story Skills

**Category**: Life Story
**Purpose**: Capture, organize, and develop Hamza's autobiographical narrative
**Status**: Phase 2 Complete (10 active skills + ghostwriter system)

---

## Overview

This category contains skills for a long-term memoir writing project. The system allows you to:

- **Capture memories** in multiple ways (freeform, conversation, voice)
- **Learn your voice** through vocabulary, sentence patterns, and style analysis
- **Act as your ghostwriter** - generating prose that sounds like YOU
- Track people and places across your life story
- Deepen memories through guided questions
- Eventually compile into chapters and a printable book

**This is a long-term project** - built to grow over months and years, learning your voice and patterns along the way.

---

## Skills Inventory

### Core Skills

| ID | Name | Purpose |
|----|------|---------|
| **LIFE-00** | Personal Context & Voice Manager (v2.0) | Learn voice, track patterns, enable ghostwriter mode |
| **LIFE-01** | Entry Processor | Process entries, extract metadata, save structured stories |
| **LIFE-02** | Character Manager (v1.1) | Build profiles of people with progressions & relations |
| **LIFE-04** | Consistency Guardian | Check for contradictions across entries |
| **LIFE-05** | Emotion Excavator | Ask deepening questions, draw out feelings |
| **LIFE-11** | Location Manager | Track places with same depth as characters |

### Input Skills

| ID | Name | Purpose |
|----|------|---------|
| **LIFE-12** | Freeform Capture | Accept messy notes, fragments, stream of consciousness |
| **LIFE-13** | Biographer Conversation | AI asks questions like a patient biographer |
| **LIFE-14** | Voice Capture | Handle transcribed voice recordings |
| **LIFE-15** | Draft Processor | Convert drafts to structured entries |
| **LIFE-16** | Journal Capture | Daily reflections that trigger memories |

### Transcript Processing Skills (NEW)

| ID | Name | Purpose |
|----|------|---------|
| **LIFE-17** | Transcript Ingestion | Parse, store, index conversation transcripts |
| **LIFE-18** | Voice Mining | Learn speaking patterns, sarcasm, humor from transcripts |
| **LIFE-19** | Story Extraction | Find and extract stories told in conversations |
| **LIFE-25** | Gap Analysis | Identify undocumented people, places, events → leads database |

### Book Generation Skills

| ID | Name | Purpose |
|----|------|---------|
| **LIFE-20** | Book Architect | Organize entries into book/chapter structure |
| **LIFE-21** | Chapter Generator | Generate prose using ghostwriter mode |
| **LIFE-22** | Prose Polisher | Refine chapters to publication quality |
| **LIFE-23** | Export Manager | Generate PDF, EPUB exports |

### Domain Lens Skills (NEW)

| ID | Name | Purpose |
|----|------|---------|
| **LIFE-40** | Dreams Lens | Detect dream content, add exploration questions |
| **LIFE-41** | Trading Lens | Detect trading content, add reflection questions |
| **LIFE-42** | Problems Lens | Detect problem content, add processing questions |

### Data Integrity Skills

| ID | Name | Purpose |
|----|------|---------|
| **LIFE-30** | Data Consistency Checker (v3.0) | 18 structural integrity rules |
| **LIFE-31** | Auto-Sync | Automatically sync word counts across levels |
| **LIFE-32** | Data Validator | Validate data before any save operation |
| **LIFE-35** | Data Health Report | Unified orchestrator for LIFE-30 + LIFE-04 |

### Planned Skills

| ID | Name | Purpose |
|----|------|---------|
| LIFE-03 | Timeline Builder | Create/update chronological index |
| LIFE-06 | Theme Tracker | Identify recurring themes and arcs |
| LIFE-09 | Story Connector | Find links between entries |

---

## How to Use

### Five Ways to Capture

**1. Freeform (LIFE-12)** - Just dump thoughts, no pressure

```
/freeform
"The kitchen. Yellow walls. Mom singing. The smell of cardamom."
```

**2. Conversation (LIFE-13)** - AI asks, you answer

```
/biographer
"Ask me about my grandmother"
→ AI guides you through the memory with questions
```

**3. Voice (LIFE-14)** - Speak, transcribe, capture

```
Record a voice memo → Transcribe with Whisper → Paste here
```

**4. Journal (LIFE-16)** - Capture today, trigger memories

```
/journal
"Had coffee with an old friend. Reminded me of college nights..."
→ AI detects memory triggers, suggests exploration
```

**5. Transcripts (LIFE-17/18/19/25)** - Mine your conversations (NEW)

```
/transcript
[paste transcript from Otter.ai, Zoom, Teams, etc.]
→ AI learns your speaking patterns, extracts stories, finds leads
```

### Transcript Processing: Mining Candid Conversations (NEW)

Transcripts from meetings, calls, and casual conversations reveal:
- **Speaking patterns** - How you actually talk (different from writing)
- **Sarcasm/humor** - Learned over time to avoid misinterpretation
- **Stories told naturally** - Memories shared without trying
- **Life details** - People, places, events mentioned in passing

```
/transcript               → Paste and ingest a transcript
       ↓
LIFE-17 parses, stores, offers options:
       ↓
/transcript voice         → Learn speaking patterns (LIFE-18)
/transcript stories       → Extract stories told (LIFE-19)
/transcript gaps          → Find undocumented mentions (LIFE-25)
/transcript all           → Run all three
       ↓
Sarcasm flags verified
Stories → drafts pipeline
Leads → biographer suggestions
```

**Sarcasm Learning**: The system learns your sarcasm patterns over time. When you say "I literally died" or "best meeting ever," it learns to flag these as exaggeration/irony rather than taking them literally.

**Leads Integration**: People and places mentioned but not documented become "leads" that are automatically suggested during `/biographer` sessions.

### Domain Lenses: Specialized Perspectives (NEW)

When you write about certain topics, the system automatically detects the domain and adds specialized questions.

**Available Lenses:**

| Domain | Detects | Questions About |
|--------|---------|-----------------|
| Dreams | dream, nightmare, sleep, woke up | Emotions, connections, patterns, symbolism |
| Trading | trade, market, profit, loss | Emotional state, rules, lessons, patterns |
| Problems | problem, stuck, frustrated | Progress, blockers, support, resolution |

**How it works:**
```
You write: "Had a weird dream about the market crashing..."
             ↓
LIFE-01 detects: [dreams, trading]
             ↓
LIFE-40 adds: "What emotions did you feel in the dream?"
LIFE-41 adds: "Is there anxiety about your trading lately?"
             ↓
Questions merged into "Questions to Explore"
```

**Multi-domain entries:** When your content touches multiple domains (like a dream about trading), each lens contributes relevant questions. This creates richer exploration opportunities.

**Reference:** `story-data/context/lenses.md`

### Journaling: The Present → Past Bridge

Journals capture TODAY. But today's thoughts often trigger yesterday's memories.

```
/journal → Capture today's reflections
             ↓
AI detects memory triggers (names, places, feelings)
             ↓
"Would you like to explore that memory?" → /biographer
             ↓
Or add to question bank for later
             ↓
/promote → Extract book-worthy moments as drafts
```

**Key insight:** Not every journal is book-worthy. That's fine. The system captures without judging, then allows promotion of meaningful moments.

### Processing Flow

```
Capture (LIFE-12/13/14)
      ↓
Save as Draft (/story-data/drafts/)
      ↓
Process when ready (LIFE-15)
      ↓
Structured Entry (LIFE-01)
      ↓
Voice Analysis (LIFE-00)
      ↓
Revisit & Deepen (when more thoughts come)
```

### Expanding Entries vs. Creating New Ones

When you have more thoughts about an existing memory, should you update or create new?

**Expand the EXISTING entry when:**
- Thinking more about the *same* memory moment
- Adding context, feelings, or details
- Answering the "Questions to Explore" in that entry
- The new content deepens rather than diverges

**Create a NEW entry when:**
- It's a genuinely different memory/event
- The thought triggers a completely separate story
- Different time period or emotional context

**How expanding works:**
1. Tell Claude: "I want to add more to [entry name]" + share your thoughts
2. Claude integrates content naturally (cleans up transcription if voice)
3. Metadata updates:
   - `revisit_count`: increments (0 → 1 → 2...)
   - `completeness`: may upgrade (partial → detailed)
   - `word_count`: updated
4. New "Questions to Explore" added for future deepening
5. "Connections Found" updated if new threads emerge

**Philosophy:** Entries grow richer through revisits. A memory that started as 3 sentences can become a detailed narrative over multiple sessions. Don't fragment the same moment across multiple entries.

### Commands

**Input Modes**
```
/freeform              → Start freeform capture (no questions)
/biographer            → Start conversation mode (AI asks questions)
/voice                 → Instructions for voice capture
/journal               → Capture today's reflections (triggers memories)
/today                 → Same as /journal
/drafts                → List unprocessed drafts
/process               → Turn draft into structured entry
```

**Journal Commands**
```
/journal [mood]        → Start journal with mood (e.g., /journal tired)
/journals              → List recent journal entries
/promote               → Review journals for book-worthy moments
```

**Transcript Commands (NEW)**
```
/transcript            → Paste and ingest a transcript
/transcript voice      → Analyze speaking patterns (LIFE-18)
/transcript stories    → Extract stories told (LIFE-19)
/transcript gaps       → Find undocumented mentions (LIFE-25)
/transcript all        → Run all three analyses
/transcripts           → List stored transcripts
/leads                 → View leads database
/sarcasm               → View learned sarcasm patterns
```

**Story Management**
```
"Process this as a story entry"     → LIFE-01
"Tell me about [character]"         → LIFE-02
"Check my stories for consistency"  → LIFE-04
"Help me remember more about this"  → LIFE-05
"Describe [location]"               → LIFE-11
```

**Voice Profile**
```
"What's my writing style?"          → LIFE-00
"What patterns have you noticed?"   → LIFE-00
"Show me my voice profile"          → LIFE-00
```

**Data Integrity**
```
/health                             → LIFE-35 (full data health report)
/health quick                       → LIFE-30 only (structural)
/health narrative                   → LIFE-04 only (contradictions)
/consistency-check                  → Alias for /health
/sync-counts                        → LIFE-31 (fix word counts)
```

---

## Data Structure

```
/story-data/
├── drafts/           # Raw captures before processing
│   ├── _TEMPLATE.md
│   ├── processed/    # Archived after processing
│   └── [date-time-type].md
├── journals/         # Daily reflections (present-focused)
│   ├── _TEMPLATE.md
│   ├── _README.md
│   └── [YYYY-MM-DD].md
├── entries/          # Structured story entries
│   └── _TEMPLATE.md
├── characters/       # People profiles
│   ├── family/
│   ├── friends/
│   ├── mentors/
│   ├── colleagues/
│   ├── romantic/
│   ├── other/
│   └── _TEMPLATE.md
├── locations/        # Place profiles
│   ├── homes/
│   ├── schools/
│   ├── workplaces/
│   ├── cities/
│   ├── neighborhoods/
│   ├── landmarks/
│   ├── other/
│   └── _TEMPLATE.md
├── context/          # Personal context (grows over time)
│   ├── hamza-profile.md  # Voice profile, preferences, patterns
│   ├── leads.md          # Leads database from transcripts
│   └── lenses.md         # Domain lens definitions (NEW)
├── transcripts/      # Stored conversation transcripts (NEW)
├── chapters/         # Organized narrative chapters
├── timeline/         # Chronological index
└── themes/           # Recurring themes

/metadata/
├── consistency-log.md  # Contradictions found
├── gaps-to-fill.md     # Missing periods
└── progress.md         # Writing progress

/exports/
└── drafts/             # Generated chapter drafts
```

---

## Workflow

```
                    LIFE-00 (Voice Manager)
                    Reads context, enables ghostwriter
                              ↓
┌──────────────────────────────────────────────────────────┐
│                      CAPTURE LAYER                        │
│                                                           │
│  /freeform     /biographer     /voice       /journal     │
│      ↓              ↓            ↓             ↓         │
│  LIFE-12        LIFE-13      LIFE-14       LIFE-16       │
│ (Freeform)   (Conversation)  (Voice)      (Journal)      │
│      │              │            │             │         │
│      └──────────────┼────────────┘             │         │
│                     ↓                          ↓         │
│          /story-data/drafts/        /story-data/journals/ │
│                     ↓                          ↓         │
│  /process → LIFE-15 (Draft Processor)    Memory Bridge   │
│                                     ↓                    │
│                            "Want to explore?"            │
│                                     ↓                    │
│                            /biographer OR question bank  │
│                                     ↓                    │
│                    /promote → Extract as draft           │
└─────────────────────────────┼────────────────────────────┘
                              ↓
                       LIFE-01 (Entry Processor)
                              ↓
         ┌────────────────────┼────────────────────┐
         ↓                    ↓                    ↓
     LIFE-02              LIFE-11              LIFE-04
   (Characters)        (Locations)         (Consistency)
         └────────────────────┼────────────────────┘
                              ↓
                       LIFE-05 (Deepening)
                              ↓
                       LIFE-00 (Voice Analysis)
                              ↓
                   ┌──────────────────────┐
                   │  REVISIT CYCLE       │
                   │                      │
                   │  User thinks more    │
                   │  about same memory   │
                   │         ↓            │
                   │  Expand entry        │
                   │  (revisit_count++)   │
                   │         ↓            │
                   │  New questions added │
                   │         ↓            │
                   │  (loop continues)    │
                   └──────────────────────┘
```

---

## Personal Context & Voice (LIFE-00 v2.0)

The system learns your voice over time through a **Voice Capture Pipeline**:

| What It Tracks | How It's Used |
|----------------|---------------|
| **Vocabulary patterns** | Words you use often, phrases unique to you |
| **Sentence structure** | Average length, complexity, use of fragments |
| **Narrative style** | How you open/close stories, level of detail |
| **Sensory preferences** | Which senses you naturally invoke |
| **Emotional vocabulary** | Your specific words for feelings |
| **People references** | How you refer to family (Dad vs father) |
| **Sensitive topics** | Areas to handle gently or avoid |
| **Session memory** | Track progress across sessions |

### Ghostwriter Mode

When generating prose (drafts, chapters), AI:
- Only uses vocabulary from your confirmed patterns
- Matches your sentence length and rhythm
- Uses your opening/closing styles
- References people the way YOU do
- Never sounds like generic AI

Your profile: `/story-data/context/hamza-profile.md`

---

## Philosophy

- **Memory is not history** - Emotional truth matters as much as facts
- **Fragments are valuable** - Brief entries are still worth capturing
- **The story grows** - Each entry builds on the whole
- **Questions over corrections** - Inconsistencies are explored, not fixed
- **Your voice, preserved** - The system organizes but never rewrites
- **Context grows over time** - AI learns your style session by session

---

## Future: Local Web Viewer

A Vite + React local web app for viewing/browsing (writing stays in terminal):

- **Binder sidebar**: Navigate entries, characters, locations
- **Corkboard**: Visual cards showing entry summaries
- **Outliner**: Table view with metadata
- **Timeline**: Horizontal timeline visualization
- **Character network**: Relationship visualization

---

*Life Story System v2.8 | Created 2024-12-24 | Updated 2024-12-29*
*v2.8: Data Health System - LIFE-30 expanded to 18 rules, LIFE-35 unified orchestrator, /health command replaces /consistency-check*
*v2.7: Infrastructure hardening - LIFE-01 expansion mode, LIFE-13 leads integration, LIFE-20 chapter auto-suggestion, LIFE-41 casual keyword detection, standardized domains field across all files*
*v2.6: Added domain lens system (LIFE-40/41/42) - auto-detect dreams, trading, problems for specialized questions*
*v2.5: Added transcript processing (LIFE-17/18/19/25) - mine candid conversations for voice, stories, and leads*
*v2.4: Added journaling (LIFE-16) - present-focused capture with memory bridge*
*v2.3: Added data integrity skills (LIFE-30/31/32) for automatic word count sync*
*v2.2: Added book generation skills (LIFE-20/21/22)*
*v2.1: Added entry expansion/revisit workflow documentation*
*v2.0: Input modes (LIFE-12/13/14/15), Voice capture, Ghostwriter system*
