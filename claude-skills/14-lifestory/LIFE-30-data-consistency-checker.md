# LIFE-30: Data Consistency Checker

**Skill ID**: LIFE-30
**Category**: Life Story / Data Integrity
**Priority**: Critical
**Version**: 3.0
**Last Updated**: 2024-12-29

---

## Purpose

Audit the entire story database for data integrity issues using 19 Critical Integrity Rules. This is the structural integrity checker - different from LIFE-04 (narrative consistency) which checks story contradictions.

**Rule Categories:**
- **Rules 1-8**: Bidirectional sync and data structure (original rules)
- **Rules 9-12**: Question Bank Health (duplicate, similar, answered questions)
- **Rules 13-16**: Relationship Integrity (entry connections, leads, profiles)
- **Rules 17-18**: Narrative Alignment (timeline and character consistency via LIFE-04)
- **Rule 19**: Journal Integrity (entry count consistency)

---

## When to Activate

**Manual Invocation**:
```
/consistency-check
"Check data consistency"
"Audit my story database"
```

**Automatic (Session-End Protocol)**:
Before ending ANY session where data was modified, this check MUST run.

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-31 | After finding issues, run sync to fix |
| LIFE-04 | Provides narrative consistency data for Rules 17-18 |
| LIFE-35 | Orchestrates LIFE-30 + LIFE-04 into unified report |
| LIFE-05 | Source of "Questions to Explore" checked by Rules 9-12 |

---

## Reference

See `story-data/context/data-standards.md` for complete rule definitions.

---

## The 19 Critical Integrity Rules

### Category A: Bidirectional Sync (Rules 1-8)

### Rule 1: Entry ↔ Character Bidirectional Sync

**Check**:
```
For each entry in /story-data/entries/:
  For each character_id in entry.characters[]:
    1. Verify character file exists at /story-data/characters/{character_id}.md
    2. Verify entry_id is in character.entries_featured[]

For each character in /story-data/characters/:
  For each entry_id in character.entries_featured[]:
    1. Verify entry file exists
    2. Verify character_id is in entry.characters[]
```

**Output**:
```markdown
### Entry ↔ Character Sync
- E-2024-002 → friends/trinkhalm: OK (bidirectional)
- E-2024-003 → family/father: BROKEN (character.entries_featured missing E-2024-003)
```

### Rule 2: Entry ↔ Location Bidirectional Sync

**Check**: Same pattern as Rule 1, but for locations.
```
For each entry:
  For each location_id in entry.locations[]:
    1. Verify location file exists
    2. Verify entry_id is in location.entries_featured[]
```

### Rule 3: Entry ↔ Chapter Bidirectional Sync

**Check**:
```
For each entry in /story-data/entries/:
  If entry.chapter_id exists:
    1. Verify chapter file exists
    2. Verify entry_id is in chapter.entries[]

For each chapter in /story-data/chapters/:
  For each entry_id in chapter.entries[]:
    1. Verify entry file exists
    2. Verify entry.chapter_id equals this chapter_id
```

**Output**:
```markdown
### Entry ↔ Chapter Sync
- E-2024-001 ↔ C-001-06-01: OK
- E-2024-002 ↔ C-001-03-01: OK
- E-2024-003: chapter_id is null but appears in C-001-02-01 (MISMATCH)
```

### Rule 4: Chapter ↔ Book Bidirectional Sync

**Check**:
```
For each chapter:
  If chapter.book_id exists:
    1. Verify book file exists
    2. Verify chapter_id appears in book.life_phases[].chapters[]

For each book:
  For each chapter_id in all life_phases[].chapters[]:
    1. Verify chapter file exists
    2. Verify chapter.book_id equals this book_id
```

### Rule 5: Character ↔ Character Relationship Sync

**Check**:
```
For each character:
  For each relation in character.relations[]:
    If relation.target_id is another character:
      1. Verify target character file exists
      2. WARN if target doesn't have reciprocal relation (not blocking)
```

**Output**:
```markdown
### Character Relationships
- friends/trinkhalm → none: OK (no relations defined)
- family/father → family/mother: WARNING (mother.relations[] doesn't mention father)
```

### Rule 6: Draft ↔ Entry Bidirectional Sync

**Check**:
```
For each entry with origin.draft_id:
  1. Verify draft file exists (in /drafts/ or /drafts/processed/)
  2. Verify draft.resulting_entries[] contains entry_id

For each draft with resulting_entries[]:
  For each entry_id:
    1. Verify entry file exists
    2. Verify entry.origin.draft_id equals this draft_id
```

**Exception**: If draft was deleted, entry.origin.draft_id may be "[deleted]".

### Rule 7: Word Count Cascade

**Check**:
```
For each entry:
  1. Count words in content (H1 to before ## AI Notes)
  2. Compare to stored word_count
  3. Flag if not exact match (0 tolerance)

For each chapter:
  1. If prose exists: count prose words
  2. If no prose: sum entry.word_count for all entries
  3. Compare to stored current_word_count
  4. Flag if not exact match

For each book:
  1. Sum chapter.current_word_count for all chapters
  2. Compare to stored current_word_count
  3. Flag if not exact match
```

**Output**:
```markdown
### Word Count Cascade
- E-2024-001: stored 333, actual 333 (OK)
- E-2024-002: stored 527, actual 527 (OK)
- C-001-06-01: stored 384, actual 384 (OK - prose)
- C-001-03-01: stored 527, calculated 527 (OK - entry sum)
- B-001: stored 911, calculated 911 (OK)
```

### Rule 8: Section Entry Subset

**Check**:
```
For each chapter:
  1. Collect all entries from chapter.entries[]
  2. Collect union of all section.entries[]
  3. Flag if sets don't match exactly
```

**Output**:
```markdown
### Section Entry Subsets
- C-001-03-01: chapter.entries=[E-2024-002], sections union=[E-2024-002] (OK)
- C-001-06-01: chapter.entries=[E-2024-001], sections union=[E-2024-001] (OK)
```

---

### Category B: Question Bank Health (Rules 9-12)

### Rule 9: Duplicate Question Detection

**Purpose**: Find exact or near-exact duplicate questions across entries.

**Check**:
```
For each entry in /story-data/entries/:
  Extract all questions from "Questions to Explore" section
  Compare against questions in all OTHER entries
  Flag if:
    - Exact match (different entry)
    - >90% word overlap (likely duplicate)
```

**Output**:
```markdown
### Rule 9: Duplicate Questions
- "How did you and Trinkhalm meet?" appears in:
  - E-2024-002 (original)
  - E-2024-005 (duplicate) → REMOVE from E-2024-005
```

**Action**: Suggest removing duplicate, keeping in most relevant entry.

---

### Rule 10: Similar Question Clustering

**Purpose**: Find questions that could be merged or consolidated.

**Check**:
```
Cluster questions by:
  - Same target subject (person, place, event)
  - Same question type (sensory, emotional, meaning)
  - Same time period reference
Flag clusters with 3+ similar questions as "merge candidates"
```

**Output**:
```markdown
### Rule 10: Similar Questions (Merge Candidates)
**Cluster: "Father's workshop"**
- E-2024-003: "What did the workshop smell like?"
- E-2024-007: "What sounds do you remember from dad's workshop?"
- E-2024-012: "Describe the light in the workshop"
→ Consider consolidating into single "workshop memory" exploration
```

**Action**: Suggest creating focused exploration session for clustered topics.

---

### Rule 11: Answered Question Detection

**Purpose**: Identify questions that have been answered by recent content.

**Check**:
```
For each question in entry.questions_to_explore:
  Scan all entries with date_written > question_created_date
  Check if new content addresses the question:
    - Mentions same subject (person, place, theme)
    - Contains answer-type content (narrative, detail, reflection)
  Flag as "potentially answered" with confidence score
```

**Output**:
```markdown
### Rule 11: Potentially Answered Questions
- E-2024-002 Q: "How did you and Trinkhalm meet?"
  → Potentially answered in E-2024-008 (added 2024-12-28)
  → Confidence: HIGH (mentions "first game together", "random duo queue")
  → Action: Move to "Connections Found" or remove
```

**Action**: Present to user for confirmation, then archive or remove.

---

### Rule 12: Question Coverage

**Purpose**: Ensure every entry has exploration questions (LIFE-05 was triggered).

**Check**:
```
For each entry:
  If "Questions to Explore" section is empty or missing:
    Flag as "needs deepening questions"
  If entry.revisit_count > 0 but no new questions added:
    Flag as "stale questions" (suggestion only)
```

**Output**:
```markdown
### Rule 12: Question Coverage
- E-2024-003: No questions (LIFE-05 not triggered) → NEEDS QUESTIONS
- E-2024-002: 8 questions, revisit_count=1 → OK
```

---

### Category C: Relationship Integrity (Rules 13-16)

### Rule 13: Entry ↔ Entry Connections

**Purpose**: Validate that related entries are cross-referenced.

**Check**:
```
For each pair of entries:
  Calculate connection strength based on:
    - Shared characters (strong signal: +3)
    - Shared locations (medium signal: +2)
    - Shared themes (weak signal: +1)
    - Overlapping time periods (medium signal: +2)
  If connection_strength >= 5 AND no cross-reference exists:
    Flag as "missing connection"
```

**Output**:
```markdown
### Rule 13: Missing Entry Connections
- E-2024-002 ↔ E-2024-008: Score 6 (Trinkhalm +3, gaming era +2, nostalgia +1)
  → Neither references the other in "Connections Found"
  → Suggest: Add bidirectional connection
```

**Action**: Auto-suggest adding to "Connections Found" sections.

---

### Rule 14: Lead → Entry Resolution

**Purpose**: Track leads from transcripts to their resolution.

**Check**:
```
For each lead in leads.md with status="unexplored":
  Check if any entry was created that addresses the lead:
    - Mentions same person/place/theme
    - Created after lead was logged
  If match found:
    Flag lead for status update to "captured"
    Link to entry_id
```

**Output**:
```markdown
### Rule 14: Lead Resolution
- L-2025-004 "Slavery Mindset Philosophy": unexplored
  → No matching entry found
  → Suggest: Explore in next /biographer session

- L-2025-003 "Gitex Experience": unexplored
  → Potential match: E-2024-010 mentions "AI conference"
  → Action: Verify and update lead status
```

**Metrics**:
- Total leads: X
- Unexplored: Y
- Captured: Z
- Resolution rate: Z/X

---

### Rule 15: Journal → Entry Memory Triggers

**Purpose**: Track if journal memory triggers led to entries.

**Check**:
```
For each journal in /story-data/journals/:
  Extract memory_triggers from AI Notes section
  For each trigger:
    Check if corresponding entry exists:
      - Matches trigger subject
      - Created on or after journal date
    Track conversion rate
```

**Output**:
```markdown
### Rule 15: Journal Memory Triggers
- J-2025-12-26: Trigger "Rabia dream" → No entry created
- J-2025-12-27: Trigger "Owais conversation" → No entry created
→ 6 memory triggers, 0 converted to entries
→ Suggest: Run /promote on journals
```

**Metrics**:
- Total triggers: X
- Converted to entries: Y
- Conversion rate: Y/X

---

### Rule 16: Missing Profile Detection

**Purpose**: Find characters/locations mentioned but not profiled.

**Check**:
```
Scan all entries and journals for:
  - Proper nouns in character context (names of people)
  - Proper nouns in location context (names of places)
Compare against existing profiles in /characters/ and /locations/
Flag missing profiles with mention count
```

**Output**:
```markdown
### Rule 16: Missing Profiles
**Characters mentioned but not profiled:**
- Rabia (5 mentions in J-2025-12-26, J-2025-12-27) → Create romantic/rabia.md
- Omer (3 mentions in J-2025-12-26) → Create friends/omer.md
- Driexor (2 mentions in J-2025-12-27) → Create business/driexor.md

**Locations mentioned but not profiled:**
- University (4 mentions) → Create schools/university.md
- Lahore (3 mentions) → Create cities/lahore.md
```

**Priority**: Higher mention count = higher priority for profile creation.

---

### Category D: Narrative Alignment (Rules 17-18)

### Rule 17: Timeline Consistency (LIFE-04 Integration)

**Purpose**: Surface narrative contradictions from LIFE-04.

**Check**:
```
Read /metadata/consistency-log.md (LIFE-04 output)
Extract issues with status="open"
Include in consistency report with severity
```

**Output**:
```markdown
### Rule 17: Timeline Consistency
Source: LIFE-04 Consistency Guardian

**Open Issues:**
- E-2024-002 says "late 2000s" but mentions Season 3 (2013)
  → Severity: CLARIFY
  → Action: Verify time period with user
```

**Severity Levels**:
- CLARIFY: Needs user input to resolve
- CONTRADICTION: Factual conflict detected
- ACKNOWLEDGED: Known discrepancy (memory vs history)

---

### Rule 18: Character Trait Consistency

**Purpose**: Flag when same character described differently across entries.

**Check**:
```
For each character with 2+ entry appearances:
  Extract trait descriptions from each entry:
    - Physical descriptions
    - Personality traits
    - Relationship to Hamza
  Compare for contradictions
  Flag significant variances
```

**Output**:
```markdown
### Rule 18: Character Trait Consistency
- Trinkhalm:
  - E-2024-002: "duo partner", "German"
  - E-2024-008: "random duo queue partner"
  → Consistent (OK)

- Father:
  - E-2024-003: "quiet, reserved"
  - E-2024-007: "loud singer in shower"
  → Not contradiction (private vs home behavior)
  → Status: OK (context-dependent traits)
```

**Philosophy**: Character evolution is valid. Only flag true contradictions.

---

### Category E: Journal Integrity (Rule 19)

### Rule 19: Journal Entry Count Consistency

**Purpose**: Ensure `entries_count` in journal frontmatter matches actual entries.

**Check**:
```
For each journal in /story-data/journals/:
  1. Parse entries_count from frontmatter (default: 1)
  2. Count actual entries in content:
     - First entry = content before any "## Entry N:" header
     - Additional entries = count of "## Entry N:" headers
  3. actual_count = 1 + count("## Entry \d+:" headers)
  4. Compare entries_count vs actual_count
  5. Flag if mismatch
```

**Output**:
```markdown
### Rule 19: Journal Entry Count
- J-2025-001: entries_count=1, actual=1 (OK)
- J-2025-002: entries_count=2, actual=2 (OK)
- J-2025-003: entries_count=1, actual=1 (OK)

OR if mismatch:

- J-2025-002: entries_count=1, actual=2 (MISMATCH)
  → Content has "## Entry 2:" but frontmatter says entries_count=1
  → Action: Update frontmatter to entries_count=2
```

**Severity**: Critical - Causes app display bugs if mismatched.

**Auto-fix**: Update `entries_count` in frontmatter to match actual entries found.

---

## Output Format

```markdown
# Data Consistency Report
Generated: 2024-12-29 12:00:00

## Summary
- Entries checked: 2
- Chapters checked: 2
- Books checked: 1
- Characters checked: 1
- Locations checked: 0
- Journals checked: 3
- Leads checked: 6

## Rule Summary
| Category | Rules | Passed | Issues | Warnings |
|----------|-------|--------|--------|----------|
| A: Bidirectional Sync | 1-8 | 8/8 | 0 | 0 |
| B: Question Bank | 9-12 | 3/4 | 1 | 0 |
| C: Relationships | 13-16 | 2/4 | 2 | 0 |
| D: Narrative | 17-18 | 2/2 | 0 | 0 |
| E: Journal Integrity | 19 | 1/1 | 0 | 0 |
| **Total** | **19** | **16/19** | **3** | **0** |

## Status: ATTENTION NEEDED

---

## Category A: Bidirectional Sync (Rules 1-8) ✓

### Rule 1: Entry ↔ Character Sync ✓
- E-2024-002 ↔ friends/trinkhalm: OK

### Rule 2: Entry ↔ Location Sync ✓
- No locations referenced (OK)

### Rule 3: Entry ↔ Chapter Sync ✓
- E-2024-001 ↔ C-001-06-01: OK
- E-2024-002 ↔ C-001-03-01: OK

### Rule 4: Chapter ↔ Book Sync ✓
- All chapters properly linked to B-001

### Rule 5: Character Relationships ✓
- friends/trinkhalm: No relations defined

### Rule 6: Draft ↔ Entry Sync ✓
- E-2024-001 → D-2024-001: OK

### Rule 7: Word Count Cascade ✓
- All counts match (0 tolerance verified)

### Rule 8: Section Entry Subset ✓
- All chapters: section entries match chapter entries

---

## Category B: Question Bank (Rules 9-12)

### Rule 9: Duplicate Questions ✓
- No duplicates found

### Rule 10: Similar Questions ⚠️
- 1 cluster found (see details below)

### Rule 11: Answered Questions ✓
- No answered questions detected

### Rule 12: Question Coverage ✓
- All entries have exploration questions

---

## Category C: Relationships (Rules 13-16)

### Rule 13: Entry Connections ✓
- No missing connections (only 2 entries)

### Rule 14: Lead Resolution ✗
- 6/6 leads unexplored
- See "Recommended Actions"

### Rule 15: Journal Triggers ✗
- 0/6 triggers converted to entries
- See "Recommended Actions"

### Rule 16: Missing Profiles ⚠️
- 7 characters need profiles
- 2 locations need profiles

---

## Category D: Narrative (Rules 17-18)

### Rule 17: Timeline Consistency ✓
- No open issues from LIFE-04

### Rule 18: Character Consistency ✓
- All character descriptions consistent

---

## Category E: Journal Integrity (Rule 19) ✓

### Rule 19: Entry Count ✓
- J-2025-001: entries_count=1, actual=1 (OK)
- J-2025-002: entries_count=2, actual=2 (OK)
- J-2025-003: entries_count=1, actual=1 (OK)

---

## Recommended Actions

**High Priority:**
1. Create character profiles: Rabia, Omer, Tabish, Owais, Bilal
2. Run `/promote` on journals to convert triggers

**Medium Priority:**
3. Explore 6 unexplored leads via `/biographer`
4. Create location profiles: University, Lahore

**Low Priority:**
5. Review similar question cluster for consolidation

---

*Data consistency verified with 16/19 rules passed, 3 need attention.*
```

---

## Issue Classification

Issues are classified by severity:

| Severity | Symbol | Meaning | Action Required |
|----------|--------|---------|-----------------|
| Critical | ✗ | Broken data integrity | Must fix before session end |
| Warning | ⚠️ | Opportunity for improvement | Should address soon |
| Info | ℹ️ | Tracking metric | No action required |

**Rules 1-8**: Critical if broken (data integrity)
**Rules 9-12**: Warning level (question bank health)
**Rules 13-16**: Mix of warning and info (relationship tracking)
**Rules 17-18**: Warning level (narrative alignment)
**Rule 19**: Critical if broken (journal display integrity)

---

## Workflow

### Step 1: Scan All Files
```
entries = glob(/story-data/entries/*.md) - exclude _TEMPLATE.md
journals = glob(/story-data/journals/*.md) - exclude _TEMPLATE.md, _README.md
chapters = glob(/story-data/chapters/**/*.md) - exclude _TEMPLATE.md
books = glob(/story-data/books/*.md) - exclude _TEMPLATE.md
characters = glob(/story-data/characters/**/*.md) - exclude _TEMPLATE.md
locations = glob(/story-data/locations/**/*.md) - exclude _TEMPLATE.md
drafts = glob(/story-data/drafts/*.md) + glob(/story-data/drafts/processed/*.md)
leads = read(/story-data/context/leads.md)
consistency_log = read(/metadata/consistency-log.md) if exists
```

### Step 2: Parse All Frontmatter
Extract YAML frontmatter from each file.

### Step 3: Extract Questions
For each entry, parse "Questions to Explore" section.

### Step 4: Run All 18 Rules by Category
```
Category A (Rules 1-8):  Bidirectional sync checks
Category B (Rules 9-12): Question bank analysis
Category C (Rules 13-16): Relationship integrity
Category D (Rules 17-18): Narrative alignment (LIFE-04 data)
```

### Step 5: Generate Report
Format findings by category with summary table.

### Step 6: Prioritize Actions
Rank issues by severity and suggest fixes.

---

## Success Criteria

### Category A: Bidirectional Sync (Critical - Must Pass)
- [ ] Rule 1: Entry ↔ Character bidirectional sync
- [ ] Rule 2: Entry ↔ Location bidirectional sync
- [ ] Rule 3: Entry ↔ Chapter bidirectional sync
- [ ] Rule 4: Chapter ↔ Book bidirectional sync
- [ ] Rule 5: Character ↔ Character relationship sync (warnings OK)
- [ ] Rule 6: Draft ↔ Entry bidirectional sync
- [ ] Rule 7: Word count cascade (exact match, 0 tolerance)
- [ ] Rule 8: Section entry subset match

### Category B: Question Bank (Warnings OK)
- [ ] Rule 9: No duplicate questions across entries
- [ ] Rule 10: Similar questions identified for potential merge
- [ ] Rule 11: Answered questions flagged for cleanup
- [ ] Rule 12: All entries have exploration questions

### Category C: Relationships (Tracking Metrics)
- [ ] Rule 13: Related entries cross-referenced
- [ ] Rule 14: Lead resolution tracked
- [ ] Rule 15: Journal triggers tracked
- [ ] Rule 16: Missing profiles identified

### Category D: Narrative (Via LIFE-04)
- [ ] Rule 17: Timeline issues surfaced from LIFE-04
- [ ] Rule 18: Character trait consistency checked

### Category E: Journal Integrity (Critical - Must Pass)
- [ ] Rule 19: Journal entry count matches actual entries in content

**Session-End Requirement**: Rules 1-8 and 19 must pass with 0 critical issues. Rules 9-18 are informational and do not block session end.

---

*Skill LIFE-30 v3.1 | Life Story System | 2024-12-29*
*v3.1: Added Rule 19 for journal entry count consistency*
*v3.0: Added 10 new rules (9-18) for question bank, relationships, and narrative alignment*
