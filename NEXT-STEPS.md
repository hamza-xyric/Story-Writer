# Life Story System - Next Steps

**Last Updated**: 2024-12-29
**Current Focus**: CLI Infrastructure Complete → Content Capture or App Development

---

## Two Paths Forward

You can now either:

### Path A: Capture More Content (Recommended)
Use the CLI to add memories. The infrastructure is ready.

```
/freeform     → Dump thoughts without questions
/biographer   → AI guides you through memories (now with lead suggestions!)
/journal      → Daily reflections
/process      → Turn drafts into entries
```

**Why this matters**: Voice profile needs 5+ entries to confirm patterns. Currently at 2 entries.

### Path B: Build App Features
Develop the storyai-app viewer into a full capture tool.

---

## CLI Layer: Complete ✅

All capture and processing skills are implemented and tested:

| Skill | Command | Status |
|-------|---------|--------|
| Freeform Capture | `/freeform` | ✅ Active |
| Biographer Mode | `/biographer` | ✅ Active + Leads Integration |
| Voice Capture | `/voice` | ✅ Active |
| Journal Capture | `/journal` | ✅ Active |
| Draft Processing | `/process` | ✅ Active |
| Entry Expansion | "Add more to [entry]" | ✅ Active |
| Transcript Mining | `/transcript` | ✅ Active |
| Data Health | `/health` | ✅ Active (18 rules) |

**Recent Improvements (v2.8):**
- LIFE-30: Expanded from 8 to 18 integrity rules
- LIFE-35: Unified Data Health Report (LIFE-30 + LIFE-04)
- `/health` command replaces `/consistency-check`
- New rule categories: Question Bank, Relationships, Narrative

**v2.7 Improvements:**
- LIFE-01: Expansion mode for deepening existing entries
- LIFE-13: Leads integration for biographer session suggestions
- LIFE-20: Auto-suggests chapter placement after entry creation
- LIFE-41: Detects casual trading mentions

---

## Missing CLI Skills (Phase 3)

These skills are referenced but not implemented:

| Skill | Purpose | When Needed |
|-------|---------|-------------|
| LIFE-03 | Timeline Builder | When organizing entries chronologically |
| LIFE-06 | Theme Tracker | When grouping entries by theme |
| LIFE-09 | Story Connector | When linking related entries |

**When to implement**: After 5+ entries exist to have meaningful data to organize.

---

## App Development Roadmap

The storyai-app is currently a **read-only viewer**. Development phases to make it a full capture tool:

### Phase 1: Capture Foundation
| Task | Route | Status |
|------|-------|--------|
| Freeform Capture | `/capture/freeform` | ⏳ Pending |
| Journal Capture | `/capture/journal` | ⏳ Pending |
| Draft Management | `/drafts` | ⏳ Pending |
| Entry Editing | EntryReader edit mode | ⏳ Pending |

### Phase 2: Engagement & Progress
| Task | Component | Status |
|------|-----------|--------|
| Dashboard | `/dashboard` | ⏳ Pending |
| Daily Prompts | DailyPrompt.tsx | ⏳ Pending |
| "On This Day" | OnThisDay.tsx | ⏳ Pending |
| Streak Indicator | StreakIndicator.tsx | ⏳ Pending |

### Phase 3: Voice Profile Display
| Task | Route | Status |
|------|-------|--------|
| Voice Profile Page | `/voice` | ⏳ Pending |
| Learning Progress | VoiceProgress.tsx | ⏳ Pending |

### Phase 4: Book Export
| Task | Component | Status |
|------|-----------|--------|
| Book Preview | BookPreview.tsx | ⏳ Pending |
| Real PDF/EPUB | ExportModal enhanced | ⏳ Pending |

### Phase 5: Advanced Capture
| Task | Route | Status |
|------|-------|--------|
| Biographer Mode | `/capture/biographer` | ⏳ Pending |
| Voice Recording | `/capture/voice` | ⏳ Pending |
| Onboarding Flow | `/onboarding` | ⏳ Pending |

---

## Data Gaps to Fill

### Characters Mentioned But Not Profiled
From journals and transcripts:
- Rabia (romantic)
- Omer (friend)
- Tabish (friend)
- Owais (friend)
- Bilal (friend)
- Umer Sadiq (colleague?)
- Driexor (business)

### Leads from Transcript T-2025-001
6 unexplored story threads:
1. Salman & Zishan (Xyric developers)
2. Gitex conference experience
3. "Slavery Mindset" philosophy
4. Teaching/mentoring role
5. Speed/impatience trait
6. [See leads.md for details]

### Life Periods With No Entries
- Childhood
- School years
- University
- Early career

---

## Technical Decisions Made

### CLI vs App Capture
- **CLI**: Primary capture tool (works now)
- **App**: Read-only viewer → future capture tool

### Engagement Tone
- Subtle & gentle (not Duolingo-style gamification)
- No shame for missing days
- Celebrate milestones quietly

### Voice Learning
- Patterns: emerging (1-2x) → growing (3-4x) → confirmed (5+x)
- Ghostwriter only uses confirmed patterns
- Fidelity target: 0.90+

---

## Quick Reference

### Start a Session
```
1. Read CLAUDE.md (session instructions)
2. Check leads.md (exploration suggestions)
3. Choose capture mode:
   /freeform   → No questions, just write
   /biographer → Guided exploration
   /journal    → Today's reflections
```

### End a Session
```
1. Run /health (if data modified)
2. Rules 1-8 (Critical) MUST pass
3. Rules 9-18 are noted for future attention
4. State "Data integrity verified"
```

### Expand an Entry
```
"I want to add more to [entry name]"
+ Share your thoughts
→ Claude merges content, updates metadata
```

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Entries | 2 | 10+ for meaningful patterns |
| Word Count | ~911 | 80,000 (book target) |
| Confirmed Patterns | 0 | 5+ for ghostwriter |
| Fidelity Score | Untested | 0.90+ |
| Life Phases Covered | 2 | 6+ |

---

*Next Steps v5.1 | 2024-12-29*
