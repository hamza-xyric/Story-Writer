# My Life Story Project

*A personal memoir system where AI learns to write like me.*

---

## Why I'm Building This

Memories fade. The vivid details of childhood, the exact words someone said, the feeling of a moment - they slip away year by year. I've already forgotten things I swore I'd never forget.

This project exists because:

- **Memory is impermanent** - Stories I don't capture will be lost forever
- **I want to preserve my voice** - Not just facts, but how I think, how I tell stories
- **Future generations** - My children, their children - they deserve to know who I was beyond photos
- **Self-understanding** - Writing about the past helps me understand who I've become
- **A book worth reading** - Not for fame, but for the satisfaction of having written my story

This isn't about documenting every day. It's about capturing the moments that shaped me before the details blur.

---

## What This Is

At its core: **a patient AI ghostwriter that learns my voice over time.**

Think of it as:
- A memoir companion that listens without judgment
- A system that captures fragments and builds them into stories
- An AI that gets better at sounding like me with every entry
- A long-term project measured in months and years, not days
- Eventually: a publishable book in my own authentic voice

**What it is NOT:**
- A daily habit tracker (no guilt, no streaks)
- A rigid writing system (capture first, structure later)
- A history project (emotional truth > factual accuracy)
- AI replacing my voice (it learns from me, doesn't override me)

---

## How It Works

### Four Ways to Capture

| Mode | When to Use |
|------|-------------|
| **Freeform** (`/freeform`) | Dump thoughts freely. No questions asked. Just write. |
| **Biographer** (`/biographer`) | AI asks questions like a patient interviewer. Guided exploration. |
| **Voice** (`/voice`) | Speak your memories. Transcribe later. Natural storytelling. |
| **Journal** (`/journal`) | Daily reflections. Today's events → trigger older memories. |

### The Pipeline

```
Capture something (any mode)
        ↓
Saved as raw draft
        ↓
Process when ready → Structured entry with metadata
        ↓
AI analyzes voice patterns → Profile grows
        ↓
Entries linked to people, places, themes
        ↓
Eventually → Book chapters
```

### Voice Learning

This is the magic: **the AI learns how I write.**

Every entry I create, the system analyzes:
- Words I use frequently (and words I never use)
- How long my sentences are
- How I start and end stories
- What senses I describe most
- How I refer to people (Dad, not father)

Over time, patterns become `[confirmed]` - and when the AI generates prose for me, it sounds like *me*, not generic AI.

### The Viewer App

A web app (`storyai-app`) to browse everything:
- **Entries** - All my captured memories
- **Characters** - People in my story, with relationships and arcs
- **Locations** - Places that mattered, with sensory details
- **Timeline** - Visual journey through my life
- **Themes** - Recurring patterns across stories
- **Journals** - Calendar view of daily reflections
- **Book** - Organized chapters, ready for export

---

## The Philosophy

These principles guide everything:

### Memory is Emotional Truth
What something *felt like* matters more than what exactly happened. Inconsistencies aren't bugs - they're interesting. The system explores them rather than correcting them.

### Fragments Are Valuable
A 3-sentence memory is worth capturing. I don't need to write complete stories. Dump the fragment now, expand it later through revisits.

### No Pressure, No Guilt
There are no streaks, no daily requirements, no disappointed AI. The system works whether I write daily or monthly. The habit forms naturally.

### Entries Grow Richer
Same memory, multiple visits = deeper story. The system tracks `revisit_count` - how many times I've returned to expand something. Depth comes from returning, not from getting it right the first time.

### Questions Over Corrections
If there's something unclear or contradictory, the AI asks - it doesn't assume or fix. I control the narrative.

### Never Rewrite My Words
AI organizes, suggests, and eventually generates prose. But it never edits my raw captures. My voice stays mine.

---

## What's Possible

The long-term vision:

### Near Term (Now)
- Capture memories without friction
- Build character and location profiles
- See my story visualized (timeline, relationships)
- Journal daily and let it trigger memory exploration

### Medium Term
- Rich, interconnected story database
- Voice profile confident enough for ghostwriting
- Chapter outlines organized from entries
- AI can draft prose that genuinely sounds like me

### Long Term
- Complete memoir manuscript
- Export as a real book (PDF, EPUB)
- A legacy artifact I'm proud of
- Something my family will read for generations

### The Ultimate Goal
**A printed book, in my voice, telling my story.** Written collaboratively with AI that learned to write like me over months of conversation.

---

## Current State

What exists today:

| Component | Status |
|-----------|--------|
| Freeform capture | Working |
| Biographer conversations | Working |
| Voice capture | Working |
| Journal capture | Working |
| Draft → Entry processing | Working |
| Voice profile learning | Growing |
| Character profiles | Started |
| Location profiles | Started |
| storyai-app viewer | Functional |
| Book structure | Framework ready |
| Chapter generation | Planned |
| Export to book | Planned |

**Word count so far:** Growing with each session.

---

## How to Use This

### Daily / Regular

```
/journal      → Reflect on today. Memory triggers will be detected.
/freeform     → Dump a memory fragment, no questions asked.
/biographer   → Have the AI guide me through a memory.
```

### When Ready to Process

```
/drafts       → See what's waiting to be processed.
/process      → Turn a draft into a structured entry.
/promote      → Extract book-worthy moments from journals.
```

### To Browse My Story

```
cd storyai-app && npm run dev
→ Open http://localhost:5173
```

### To See Everything

```
/story-data/entries/     → All structured entries
/story-data/characters/  → All people profiles
/story-data/journals/    → All daily reflections
/story-data/context/     → Voice profile, question bank
```

---

## The Deeper Why

Years from now, I want my children to read this and know who their father was. Not the sanitized version, not the facts they could find anywhere, but the real stories - how I thought, what I struggled with, what made me laugh, who shaped me.

This project is about turning an overwhelming goal ("write a book about my life") into something achievable through small captures that build over time. It's about trusting a system to hold my memories while I add to them piece by piece.

It's not about being a writer. It's about being remembered.

---

*Life Story System | Started December 2024*
