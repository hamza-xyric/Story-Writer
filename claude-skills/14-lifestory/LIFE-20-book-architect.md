# LIFE-20: Book Architect

**Skill ID**: LIFE-20
**Category**: Life Story - Book Generation
**Priority**: Critical
**Version**: 1.0
**Last Updated**: 2024-12-25

---

## Purpose

Design and maintain the overall book structure. Create life phases, organize chapters within phases, and manage the master book outline. This is the "table of contents" controller that orchestrates the journey from scattered entries to cohesive memoir.

---

## When to Activate

**Manual Invocation**:
```
/book                    → Show current book structure and status
/book-create            → Initialize a new book structure
/book add-chapter       → Add a new chapter to the book
/book move-entry        → Assign an entry to a chapter
/book reorder           → Reorder chapters within a phase
/book status            → Show book progress and gaps
```

**Automatic Triggers**:
- When user has 5+ entries (suggest initial structure)
- Before any chapter generation (validate structure exists)
- After significant new entries shift the structure

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-03 | Get timeline data for phase creation |
| LIFE-06 | Get theme data for chapter grouping |
| LIFE-21 | Provide chapter definitions for generation |
| LIFE-00 | Validate structure against voice preferences |
| LIFE-31 | Sync word counts after chapter/entry changes (silent) |
| LIFE-32 | Validate chapter/book data before save |

---

## Core Concepts

### Book Structure Type: Hybrid

The Life Story system uses a **hybrid structure**:
- **Chronological backbone**: Life phases in order (childhood → school → university → adulthood)
- **Thematic sub-chapters**: Within each phase, chapters organized by theme

```
BOOK STRUCTURE
├── Part I: Roots (Childhood)
│   ├── Chapter 1: Family Foundations [theme: family]
│   ├── Chapter 2: Early Adventures [theme: discovery]
│   └── Chapter 3: First Friends [theme: friendship]
├── Part II: Growing Up (School Years)
│   ├── Chapter 4: Classroom Days [theme: education]
│   └── Chapter 5: Gaming Era [theme: gaming/digital]
├── Part III: University
│   └── ...
└── Epilogue: Looking Back
    └── Chapter N: Why I Write [theme: reflection]
```

### Life Phases

Pre-defined phases to organize entries:

```yaml
childhood:      Birth - ~12 years
teenage:        ~12 - ~18 years
university:     College/University years
early_career:   First jobs, early adulthood
adulthood:      Established adult life
present:        Current period
reflections:    Meta-entries about writing this book
```

Phases can be customized based on Hamza's actual life timeline.

---

## Processing Workflow

### Command: `/book` - Show Book Status

Display the current book structure:

```
# My Life Story

**Status**: Planning | 2 chapters outlined

## Structure

### Part I: Roots (Birth - ~2000)
[No chapters yet - 0 entries available for this phase]

### Part II: Growing Up (~2000 - ~2008)
[No chapters yet - 0 entries available for this phase]

### Part III: Digital Worlds (Late 2000s - Early 2010s)
1. **The League Years** [outline] - 1 entry, ~289 words
   └── E-2024-002: The TF/Shaco Days

### Epilogue: Looking Back (2024 - Present)
1. **Why I Write** [outline] - 1 entry, ~347 words
   └── E-2024-001: Why I Want to Write My Life

---

## Progress
- Entries: 2 total (2 assigned, 0 unassigned)
- Chapters: 2 outlined, 0 drafted, 0 complete
- Word count: 636 / 80,000 target

## Gaps to Explore
- [ ] Childhood memories
- [ ] School years
- [ ] University
- [ ] Early career

Would you like to:
[ ] Add a new chapter
[ ] Add entries to fill gaps
[ ] Generate prose for a chapter
```

### Command: `/book-create` - Initialize Book

Create initial book structure:

1. Analyze existing entries for time periods
2. Propose life phases based on content
3. Create book manifest at `/story-data/books/my-life-story.md`

```
## Creating Book Structure

Based on your 2 entries, I've identified:
- Present day reflections (2024)
- Gaming era (Late 2000s - Early 2010s)

**Proposed Structure**:

Part I: Roots (Childhood)
Part II: Growing Up (School Years)
Part III: Digital Worlds (Gaming Era)
Part IV: University
Part V: Building Life (Career/Adulthood)
Epilogue: Looking Back (Reflections)

This structure can grow as you add more entries.

[ ] Accept this structure
[ ] Customize phases
```

### Command: `/book add-chapter [phase] [title]`

Add a new chapter to a phase:

```
/book add-chapter gaming-era "The Duo That Ruled"
```

Creates chapter file at:
```
/story-data/chapters/03-digital-worlds/02-the-duo-that-ruled.md
```

**Process**:
1. Validate phase exists
2. Generate chapter_id (C-[book]-[phase]-[num])
3. Create chapter file with template
4. Update book manifest
5. Suggest entries to include

### Command: `/book move-entry [entry-id] [chapter-id]`

Assign an entry to a chapter:

```
/book move-entry E-2024-002 C-001-03-01
```

**Process**:
1. Validate entry and chapter exist
2. Add entry_id to chapter's entries list
3. Update chapter word count
4. If entry was in another chapter, remove it
5. Recalculate book progress

### Command: `/book reorder [chapter-id] [position]`

Reorder chapters within a phase:

```
/book reorder C-001-03-02 1
```

Moves chapter to position 1 in its phase.

### Command: `/book status`

Show detailed progress:

```
## Book Progress Report

### By Life Phase
| Phase | Entries | Chapters | Words | Status |
|-------|---------|----------|-------|--------|
| Childhood | 0 | 0 | 0 | Empty |
| School Years | 0 | 0 | 0 | Empty |
| Digital Worlds | 1 | 1 | 289 | Started |
| University | 0 | 0 | 0 | Empty |
| Adulthood | 0 | 0 | 0 | Empty |
| Reflections | 1 | 1 | 347 | Started |

### By Chapter Status
- Outline: 2
- Drafting: 0
- Review: 0
- Revised: 0
- Complete: 0

### Unassigned Entries
None - all entries are in chapters!

### Recommended Next Steps
1. Add childhood memories (Phase I is empty)
2. Add school year memories (Phase II is empty)
3. Expand "The League Years" with more gaming memories
```

---

## Auto-Organization Algorithm

When 5+ entries exist, suggest structure:

```python
def suggest_structure(entries):
    # 1. Group entries by time_period
    periods = group_by_period(entries)

    # 2. Within each period, cluster by theme
    for period in periods:
        themes = cluster_by_theme(period.entries)

    # 3. Order clusters for narrative flow
    #    (earlier periods first, thematic coherence)
    ordered = order_for_narrative(themes)

    # 4. Generate chapter proposals
    for cluster in ordered:
        propose_chapter(
            title=generate_title(cluster),
            entries=cluster.entries,
            rationale=explain_grouping(cluster)
        )
```

---

## Book Manifest Format

Located at `/story-data/books/my-life-story.md`:

```yaml
---
book_id: B-001
title: "My Life Story"
subtitle: "Memories, Moments, and the Making of Me"
author: "Hamza"
status: planning | drafting | revising | complete
created_date: YYYY-MM-DD
last_updated: YYYY-MM-DD

structure_type: hybrid

target_word_count: 80000
current_word_count: 636

life_phases:
  - phase_id: "childhood"
    name: "Part I: Roots"
    period_start: "Birth"
    period_end: "~2000"
    order: 1
    description: "Early memories, family foundations"
    chapters: []

  - phase_id: "gaming-era"
    name: "Part III: Digital Worlds"
    period_start: "Late 2000s"
    period_end: "Early 2010s"
    order: 3
    chapters:
      - C-001-03-01

thematic_threads:
  - thread_id: "gaming"
    name: "Gaming & Digital Life"
    chapters: ["C-001-03-01"]

progress:
  total_chapters: 2
  chapters_outlined: 2
  chapters_drafted: 0
  completion_percentage: 0

ai_visibility: always
---

# My Life Story

[Book overview and notes...]
```

---

## Chapter File Format

Located at `/story-data/chapters/[section]/[file].md`:

```yaml
---
chapter_id: C-001-03-01
book_id: B-001
title: "The League Years"
subtitle: "When I Was the Best in the World"
chapter_number: 1
section_id: "gaming-era"
status: outline | drafting | review | revised | complete
entries: ["E-2024-002"]
themes: ["nostalgia", "gaming", "friendship"]
narrative_arc:
  opening_hook: "A Steam message from someone I couldn't recognize"
  key_moments: ["TF/Shaco duo", "feeling unbeatable"]
  closing: "How a forgotten name brought back a whole world"
---

# The League Years

## Chapter Summary
[...]

## Key Scenes
[...]

## Prose Draft
[Generated by LIFE-21]
```

---

## Validation Rules

Before any book operation:

1. **Book manifest must exist** (create with `/book-create` if not)
2. **Chapter IDs must be unique** (C-[book]-[phase]-[number])
3. **Entries can only be in one chapter** (move removes from previous)
4. **Phases must have valid order** (no duplicate order numbers)
5. **Word counts stay accurate** (recalculate after changes)

---

## Data Integrity (Automatic)

After any chapter or book modification, automatically sync data:

### On Chapter Creation/Modification
```
1. LIFE-32: Validate before save
   - Verify chapter_id format and uniqueness
   - Verify all entries[] IDs exist
   - Verify book_id reference is valid

2. LIFE-31: Sync word counts (silent)
   - Calculate chapter.current_word_count from entries
   - Update section.word_count for each section
   - Update book.current_word_count
```

### On Entry Assignment (`/book move-entry`)
```
After moving entry to chapter:
1. Remove entry from previous chapter (if any)
2. Add entry to new chapter.entries[]
3. LIFE-31: Recalculate both chapters' word counts
4. LIFE-31: Recalculate book word count
```

This ensures chapter and book word counts always match the sum of their entries.

---

## Integration with Other Skills

### LIFE-03 (Timeline Builder)
- Get chronological entry order
- Identify time periods for phase boundaries
- Flag chronological gaps

### LIFE-06 (Theme Tracker)
- Get theme clusters for chapter suggestions
- Identify thematic threads across phases
- Suggest chapter titles based on themes

### LIFE-21 (Chapter Generator)
- Provide chapter definition and entries
- Receive generated prose
- Update chapter status

### LIFE-00 (Personal Context)
- Respect voice preferences in structure
- Use his terminology for phase names
- Align with his life narrative style

---

## Output Examples

### After Adding Chapter
```
## Chapter Added

**Title**: The Duo That Ruled
**Chapter ID**: C-001-03-02
**Phase**: Part III: Digital Worlds
**File**: story-data/chapters/03-digital-worlds/02-the-duo-that-ruled.md

### Suggested Entries
These entries might belong in this chapter:
- E-2024-002: The TF/Shaco Days (currently in "The League Years")

Would you like to:
[ ] Move entries to this chapter
[ ] Keep entries where they are
[ ] Write new entries for this chapter
```

### After Moving Entry
```
## Entry Assigned

**Entry**: E-2024-002 "The TF/Shaco Days"
**Moved to**: C-001-03-01 "The League Years"
**Word count added**: 289

Chapter "The League Years" now has:
- 1 entry
- 289 words
- Status: outline

Ready to generate prose? Use `/generate-chapter C-001-03-01`
```

---

## Anti-Patterns

**Do NOT**:
- Create chapters without book structure
- Assign entries to non-existent chapters
- Allow duplicate chapter IDs
- Skip updating word counts
- Create empty phases without purpose

**DO**:
- Suggest structure proactively at 5+ entries
- Keep book manifest synchronized
- Calculate progress accurately
- Suggest next steps for gaps
- Make organization feel natural, not forced

---

## Success Criteria

- Book structure exists and is valid
- All entries can be organized into chapters
- Chapter sequence tells a coherent story
- Progress is tracked and visible
- Gaps are identified for exploration
- User feels in control of their narrative

---

*Skill LIFE-20 v1.0 | Life Story System - Book Generation | 2024-12-25*
