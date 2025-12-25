# CLAUDE.md

This file provides guidance to Claude Code when working with this Life Story System.

## What This Is

A **personal memoir system** for capturing Hamza's life story. AI acts as a patient ghostwriter who:
- Listens and captures memories without pressure
- Learns your voice over time
- Generates prose that sounds like YOU, not generic AI
- Eventually helps compile into a book

**This is not a code project** - it's a data and skill-driven system where all content is markdown.

---

## Quick Start

### Four Ways to Capture

```
/freeform     → Just dump thoughts, fragments, notes (no questions)
/biographer   → AI asks questions like a patient biographer
/voice        → Instructions for voice recording workflow
/journal      → Daily reflections (present → past bridge)
```

### Key Commands

```
/drafts       → List unprocessed captures
/process      → Turn draft into structured entry
/journals     → List recent journal entries
/promote      → Extract book-worthy moments from journals
```

---

## Key Files

| File | Purpose |
|------|---------|
| `story-data/context/hamza-profile.md` | Voice profile - READ AT SESSION START |
| `claude-skills/14-lifestory/README.md` | Full skill reference |
| `story-data/drafts/` | Raw captures before processing |
| `story-data/journals/` | Daily reflections (present-focused) |
| `story-data/entries/` | Structured story entries |

---

## Active Skills

| Skill | Purpose | Trigger |
|-------|---------|---------|
| **LIFE-00** | Voice Manager | Every session, after entries |
| **LIFE-01** | Entry Processor | When processing drafts |
| **LIFE-02** | Character Manager | When people are mentioned |
| **LIFE-05** | Emotion Excavator | After entries (deepening) |
| **LIFE-11** | Location Manager | When places are mentioned |
| **LIFE-12** | Freeform Capture | `/freeform` |
| **LIFE-13** | Biographer Conversation | `/biographer` |
| **LIFE-14** | Voice Capture | `/voice` |
| **LIFE-15** | Draft Processor | `/process` |
| **LIFE-16** | Journal Capture | `/journal`, `/today`, `/promote` |

---

## Workflow

```
Capture (freeform/biographer/voice)      OR      Journal (today's reflections)
               ↓                                          ↓
         Saved as draft                          Saved as journal
               ↓                                          ↓
    /process → Structured entry             Memory triggers detected
               ↓                                          ↓
    Voice analysis → Profile grows          "Want to explore?" → /biographer
               ↓                                    OR add to question bank
    Revisit & deepen                                      ↓
                                              /promote → Extract as draft
                                                          ↓
                                              (Same pipeline as drafts)
```

---

## Expanding Entries vs. Creating New Ones

**Expand an EXISTING entry when:**
- You're thinking more about the same memory moment
- You're adding context, feelings, or details to what's already there
- You're answering the "Questions to Explore" in that entry

**Create a NEW entry when:**
- It's a genuinely different memory/moment
- The thought triggers a completely different story

**How to expand:** Just tell Claude "I want to add more to [entry]" and share your thoughts. Claude will:
- Integrate the new content naturally
- Bump `revisit_count` (tracks how many times you've deepened it)
- Update `completeness` if it's grown richer
- Add new questions for future exploration

**Philosophy:** Entries grow richer through revisits. Don't fragment memories across multiple entries.

---

## Philosophy

- **Memory is not history** - Emotional truth matters
- **Never rewrite user's words** - Organize, don't edit
- **Questions over corrections** - Explore inconsistencies
- **Learn the voice** - Sound like Hamza, not AI
- **No pressure** - Capture first, structure later

---

## Ghostwriter Mode

When generating prose, AI must:
- Only use vocabulary from confirmed patterns
- Match sentence length and rhythm
- Use his opening/closing styles
- Reference people the way HE does
- Never sound generic

---

*Life Story System v2.4 | 2024-12-25*
