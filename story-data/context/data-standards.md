# Data Integrity Standards

**Version**: 2.0
**Created**: 2024-12-28
**Updated**: 2024-12-29
**Purpose**: Define unambiguous rules for data consistency in the Life Story System

---

## Rule Categories Overview

| Category | Rules | Focus | Severity |
|----------|-------|-------|----------|
| A: Bidirectional Sync | 1-8 | Data structure integrity | Critical |
| B: Question Bank | 9-12 | Exploration question health | Warning |
| C: Relationships | 13-16 | Entry/profile connections | Mixed |
| D: Narrative | 17-18 | Story consistency (LIFE-04) | Warning |
| E: Journal Integrity | 19 | Journal entry count validation | Critical |

---

## Word Count Methodology

### Entry Word Count
**What to count**: All prose content from the H1 title (`# Title`) through the last line before `---` or `## AI Notes`, whichever comes first.

**What NOT to count**:
- YAML frontmatter (between `---` markers at top)
- The `## AI Notes` section and everything after
- Markdown formatting characters (`#`, `*`, `-`, etc.)
- Empty lines

**Tolerance**: 0 (exact match required)

**Example**:
```markdown
---
entry_id: E-2024-001
word_count: 333  # Must match actual count exactly
---

# My Title                    # Counted: "My Title" (2 words)

First paragraph of content.   # Counted
Second paragraph.             # Counted

---                           # STOP counting here

## AI Notes
Questions and metadata here.  # NOT counted
```

### Chapter Word Count
**Rule**: `current_word_count` = generated prose word count (if prose exists) OR sum of entry word counts (as estimate before prose is generated)

**Fields**:
- `current_word_count`: The chapter's word count (prose or entry sum)
- `sections[].word_count`: Each section's word count (sum of its entries)

**When prose exists**: Count prose in the `## Prose Draft` section only.
**When no prose**: Sum all `entry.word_count` for entries in `chapter.entries[]`.

### Book Word Count
**Rule**: `current_word_count` = sum of all `chapter.current_word_count`

Recalculate whenever any chapter word count changes.

---

## ID Format Requirements

| Entity | Format | Example |
|--------|--------|---------|
| Entry | `E-YYYY-NNN` | E-2024-001, E-2024-002 |
| Chapter | `C-BBB-PP-CC` | C-001-03-01 (Book 1, Phase 3, Chapter 1) |
| Book | `B-NNN` | B-001 |
| Character | `category/name` | friends/trinkhalm, family/father |
| Location | `type/name` | cities/karachi, homes/childhood-home |
| Draft | `D-YYYY-NNN` | D-2024-001 |
| Journal | `J-YYYY-NNN` | J-2024-001 |

**Rules**:
- IDs must be unique within their type
- IDs are case-sensitive
- Use lowercase with hyphens for slugs
- Never reuse deleted IDs

---

## 19 Integrity Rules

### Category A: Bidirectional Sync (Rules 1-8) - CRITICAL

### Rule 1: Entry ↔ Character Bidirectional Sync

**Invariant**:
```
For every character_id in entry.characters[]:
  1. Character file at story-data/characters/{character_id}.md MUST exist
  2. entry_id MUST be in character.entries_featured[]

For every entry_id in character.entries_featured[]:
  1. Entry file MUST exist
  2. character_id MUST be in entry.characters[]
```

**Enforcement**:
- On entry save: verify character files exist, update their entries_featured[]
- On character save: verify all entries_featured[] entries exist

### Rule 2: Entry ↔ Location Bidirectional Sync

**Invariant**: Same pattern as Rule 1
```
For every location_id in entry.locations[]:
  1. Location file MUST exist
  2. entry_id MUST be in location.entries_featured[]
```

### Rule 3: Entry ↔ Chapter Bidirectional Sync

**Invariant**:
```
If entry.chapter_id = "C-001-03-01":
  1. Chapter file MUST exist
  2. entry_id MUST be in chapter.entries[]

For every entry_id in chapter.entries[]:
  1. Entry file MUST exist
  2. entry.chapter_id MUST equal this chapter_id
```

**Exception**: If entry appears in multiple chapters (cross-cutting narratives), use `chapter_ids[]` array instead of single `chapter_id`.

### Rule 4: Chapter ↔ Book Bidirectional Sync

**Invariant**:
```
If chapter.book_id = "B-001":
  1. Book file MUST exist
  2. chapter_id MUST appear in book.life_phases[].chapters[]

For every chapter_id in book.life_phases[].chapters[]:
  1. Chapter file MUST exist
  2. chapter.book_id MUST equal book_id
```

### Rule 5: Character ↔ Character Relationship Sync

**Invariant**:
```
If character_a.relations[] contains {target_id: "category/character_b"}:
  1. character_b file MUST exist
  2. character_b.relations[] SHOULD contain reference to character_a
     (warning if missing, not blocking error)
```

### Rule 6: Draft ↔ Entry Bidirectional Sync

**Invariant**:
```
If draft.resulting_entries[] contains "E-2024-001":
  1. Entry E-2024-001 MUST exist
  2. entry.origin.draft_id MUST equal this draft_id

If entry.origin.draft_id = "D-2024-001":
  1. Draft D-2024-001 MUST exist (even in /processed/)
  2. draft.resulting_entries[] MUST contain entry_id
```

**Exception**: If draft is deleted, entry.origin.draft_id may be "[deleted]".

### Rule 7: Word Count Cascade

**Invariant**:
```
entry.word_count = actual_content_word_count (exact, 0 tolerance)
chapter.current_word_count = prose_word_count OR sum(entry.word_count for entries in chapter)
book.current_word_count = sum(chapter.current_word_count for all chapters in book)
```

**Cascade trigger**: Any change to entry content → recalculate entry → chapter → book.

### Rule 8: Section Entry Subset Rule

**Invariant**:
```
For each chapter:
  union(section.entries[] for all sections) == chapter.entries[]

  - No entry in chapter.entries[] that isn't in some section
  - No entry in section.entries[] that isn't in chapter.entries[]
```

---

### Category B: Question Bank Health (Rules 9-12) - WARNING

### Rule 9: Duplicate Question Detection

**Invariant**:
```
For each question in "Questions to Explore":
  Question should not appear in multiple entries
  >90% word overlap = likely duplicate
```

**Action**: Suggest removing duplicate, keep in most relevant entry.

### Rule 10: Similar Question Clustering

**Invariant**:
```
Questions about same subject (person/place/event) should be identified
Clusters of 3+ similar questions = merge candidates
```

**Action**: Suggest focused exploration session for clustered topics.

### Rule 11: Answered Question Detection

**Invariant**:
```
Questions that have been answered by newer content should be flagged
Check if new entries address the question subject with narrative detail
```

**Action**: Present to user for confirmation, archive or remove.

### Rule 12: Question Coverage

**Invariant**:
```
Every entry SHOULD have "Questions to Explore" section
LIFE-05 should trigger after entry creation
```

**Action**: Flag entries missing questions, suggest running LIFE-05.

---

### Category C: Relationship Integrity (Rules 13-16) - MIXED

### Rule 13: Entry ↔ Entry Connections

**Invariant**:
```
Entries with strong connections should cross-reference each other
Connection strength = shared characters (+3) + locations (+2) + themes (+1) + time (+2)
If score >= 5 AND no cross-reference → flag as missing connection
```

**Action**: Auto-suggest adding to "Connections Found" sections.

### Rule 14: Lead → Entry Resolution

**Invariant**:
```
Leads in leads.md should track resolution status
If entry addresses a lead → lead.status should be "captured"
```

**Metrics**: Track total leads, unexplored count, resolution rate.

### Rule 15: Journal → Entry Memory Triggers

**Invariant**:
```
Memory triggers in journals should be tracked
If trigger leads to entry creation → track conversion
```

**Metrics**: Track total triggers, converted count, conversion rate.

### Rule 16: Missing Profile Detection

**Invariant**:
```
Characters/locations mentioned in entries should have profiles
Scan for proper nouns, compare against /characters/ and /locations/
```

**Action**: Flag missing profiles with mention count for prioritization.

---

### Category D: Narrative Alignment (Rules 17-18) - WARNING

### Rule 17: Timeline Consistency (LIFE-04 Integration)

**Invariant**:
```
Read LIFE-04 consistency log
Surface open timeline issues
Integrate into unified health report
```

**Source**: `/metadata/consistency-log.md`

### Rule 18: Character Trait Consistency

**Invariant**:
```
Same character should not have contradictory descriptions
Context-dependent variations are valid (home vs work behavior)
Only flag true contradictions
```

**Philosophy**: Character evolution is valid. Only flag impossible contradictions.

---

### Category E: Journal Integrity (Rule 19) - CRITICAL

### Rule 19: Journal Entry Count Consistency

**Invariant**:
```
For each journal file:
  entries_count (in frontmatter) MUST match actual entries in content

Counting logic:
  1. First entry = content before any "## Entry N:" header (always counts as 1)
  2. Additional entries = count of "## Entry N:" headers

If entries_count = 2:
  - There MUST be exactly one "## Entry 2:" header in content
  - No "## Entry 3:" should exist

If entries_count is missing or 0:
  - File SHOULD have entries_count: 1 (if content exists)
```

**Validation**:
```
actual_count = 1 + count(regex: "## Entry \d+:")
frontmatter_count = journal.entries_count || 1

PASS: actual_count == frontmatter_count
FAIL: actual_count != frontmatter_count
```

**Auto-fix**: Update `entries_count` in frontmatter to match actual entries found.

**Severity**: Critical - Causes app display bugs if mismatched.

---

## Deletion Policy

**Default behavior**: BLOCK deletion if references exist.

| Entity to Delete | Pre-deletion Check | Cascade Actions |
|------------------|-------------------|-----------------|
| Entry | None (always allowed) | Remove from chapter.entries[], character.entries_featured[], location.entries_featured[]; recalculate word counts |
| Character | BLOCK if any entry.characters[] references it | User must first remove from all entries |
| Location | BLOCK if any entry.locations[] references it | User must first remove from all entries |
| Chapter | BLOCK if any entry.chapter_id references it | User must first unassign entries |
| Book | BLOCK if any chapter.book_id references it | User must first unassign chapters |
| Draft | Always allowed | Set entry.origin.draft_id = "[deleted]" |

**Force delete**: Not implemented. Always require clean removal of references first.

---

## Validation Commands

| Command | What It Checks |
|---------|----------------|
| `/health` | All 18 rules + LIFE-04 narrative (via LIFE-35) |
| `/health quick` | Rules 1-18 only (LIFE-30 structural) |
| `/health narrative` | LIFE-04 narrative only |
| `/consistency-check` | Alias for `/health` (backward compatible) |
| `/sync-counts` | Recalculates all word counts (Rule 7) |

---

## Session-End Protocol

Before ending ANY session where data was modified:
1. Run `/health` (or `/consistency-check`)
2. Rules 1-8 **MUST** pass with 0 critical issues
3. Rules 9-18 are informational (do not block session end)
4. Fix any critical issues found
5. State "Data integrity verified" in closing

**This is MANDATORY.** A session is not complete until data integrity is confirmed.

---

## Severity Levels

| Severity | Symbol | Rules | Action |
|----------|--------|-------|--------|
| Critical | ✗ | 1-8, 19 | Must fix before session end |
| Warning | ⚠️ | 9-12, 17-18 | Should address soon |
| Info | ℹ️ | 13-16 | Tracking metrics |

---

*Data Standards v2.1 | Life Story System | 2024-12-29*
*v2.1: Added Rule 19 for journal entry count consistency*
*v2.0: Expanded from 8 to 18 rules, added LIFE-35 unified health check*
