# LIFE-30: Data Consistency Checker

**Skill ID**: LIFE-30
**Category**: Life Story / Data Integrity
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-25

---

## Purpose

Audit the entire story database for data integrity issues: mismatched word counts, broken entry/chapter links, orphaned entries, and other metadata inconsistencies. This is different from LIFE-04 (story consistency) which checks narrative contradictions.

---

## When to Activate

**Manual Invocation Only**:
```
/consistency-check
"Check data consistency"
"Audit my story database"
"Are my word counts accurate?"
```

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-31 | After finding issues, suggest running sync |
| LIFE-04 | Different focus: narrative vs data consistency |

---

## What It Checks

### 1. Entry Word Counts
Verify each entry's `word_count` field matches actual content.

**Check**:
```
For each entry in /story-data/entries/:
  1. Read file content (after frontmatter, before AI Notes)
  2. Count words in content section
  3. Compare to frontmatter word_count
  4. Flag if difference > 5%
```

**Output**:
```markdown
Entry E-2024-002: stored 548, actual 548 (OK)
Entry E-2024-001: stored 259, actual 312 (MISMATCH)
```

### 2. Chapter Entry Links
Verify all entry IDs in chapter `entries[]` arrays exist.

**Check**:
```
For each chapter in /story-data/chapters/:
  For each entry_id in chapter.entries:
    Verify entry file exists
    Flag if missing
```

**Output**:
```markdown
Chapter C-001-03-01: 1 entries, all found (OK)
Chapter C-001-06-01: references E-2024-999 - NOT FOUND (BROKEN LINK)
```

### 3. Chapter Word Totals
Verify `current_word_count` equals sum of linked entry word counts.

**Check**:
```
For each chapter:
  calculated = sum(entry.word_count for entry in chapter.entries)
  stored = chapter.current_word_count
  Flag if calculated != stored
```

**Output**:
```markdown
Chapter C-001-03-01: stored 289, calculated 548 (MISMATCH)
Chapter C-001-06-01: stored 259, calculated 259 (OK)
```

### 4. Section Word Totals
Verify each section's `word_count` equals sum of its entries.

**Check**:
```
For each chapter:
  For each section in chapter.sections:
    calculated = sum(entry.word_count for entry in section.entries)
    stored = section.word_count
    Flag if calculated != stored
```

### 5. Book Chapter Links
Verify all chapter IDs in `life_phases[].chapters[]` exist.

**Check**:
```
For each book in /story-data/books/:
  For each phase in book.life_phases:
    For each chapter_id in phase.chapters:
      Verify chapter file exists
      Flag if missing
```

### 6. Book Word Total
Verify book `current_word_count` equals sum of chapter totals.

**Check**:
```
For each book:
  calculated = sum(chapter.current_word_count for chapter in book.chapters)
  stored = book.current_word_count
  Flag if calculated != stored
```

### 7. Orphaned Entries
Find entries not linked to any chapter.

**Check**:
```
all_entry_ids = list all entries in /story-data/entries/
linked_entry_ids = collect all entry IDs from all chapters
orphaned = all_entry_ids - linked_entry_ids
```

### 8. Duplicate Assignments
Find entries linked to multiple chapters.

**Check**:
```
For each entry_id:
  Count how many chapters reference it
  Flag if count > 1
```

---

## Output Format

```markdown
# Data Consistency Report
Generated: 2024-12-25 12:00:00

## Summary
- Entries checked: 2
- Chapters checked: 2
- Books checked: 1
- Issues found: 3
- Warnings: 1

---

## Critical Issues (Must Fix)

### Broken Links
None found.

### Word Count Mismatches
- Chapter C-001-03-01: stored 289 words, calculated 548 words (from 1 entry)
- Book B-001: stored 636 words, calculated 807 words (from 2 chapters)

---

## Warnings

### Orphaned Entries
- E-2024-003: "Childhood Memory" - not assigned to any chapter

### Duplicate Assignments
None found.

---

## All Clear

### Entry Word Counts
- E-2024-001: 259 words (verified)
- E-2024-002: 548 words (verified)

### Chapter Links
- C-001-03-01: 1 entry (all valid)
- C-001-06-01: 1 entry (all valid)

---

## Recommended Action

Run `/sync-counts` to fix word count mismatches automatically.
```

---

## Workflow

### Step 1: Scan All Files
```
entries = glob(/story-data/entries/*.md)
chapters = glob(/story-data/chapters/**/*.md)
books = glob(/story-data/books/*.md)
```

### Step 2: Parse Frontmatter
For each file, extract YAML frontmatter using gray-matter.

### Step 3: Run Checks
Execute all 8 check types, collecting issues.

### Step 4: Generate Report
Format findings into markdown report.

### Step 5: Suggest Fixes
If word count issues found, suggest LIFE-31.
If broken links found, list files to fix manually.

---

## Integration

### After Running
If issues found, suggest:
```
To fix word count mismatches automatically, run:
/sync-counts

To fix broken links, manually update:
- [list of files with issues]
```

### With LIFE-31
After LIFE-31 runs, this skill can verify fixes were applied correctly.

---

## Success Criteria

- All entry word counts match actual content
- All chapter/book word counts are calculated totals
- No broken links between entries, chapters, books
- No orphaned entries (or explicitly flagged as unassigned)
- No duplicate entry assignments

---

*Skill LIFE-30 v1.0 | Life Story System | 2024-12-25*
