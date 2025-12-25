# LIFE-32: Data Validator

**Skill ID**: LIFE-32
**Category**: Life Story / Data Integrity
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-25

---

## Purpose

Validate data before saving any entry, chapter, or book file. Acts as a pre-commit hook to catch errors before they enter the database. Called internally by LIFE-01, LIFE-20, LIFE-21 before writing files.

---

## When to Activate

**Automatic (Internal)**:
- Before LIFE-01 saves an entry
- Before LIFE-20 saves a chapter or book
- Before LIFE-21 saves generated prose
- Before any skill writes to story-data/

**Not Manually Invocable** - this is an internal validation layer.

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-01 | Validates entry before save |
| LIFE-20 | Validates chapter/book before save |
| LIFE-21 | Validates chapter after prose generation |
| LIFE-30 | Post-hoc validation (this is pre-save) |

---

## Validation Rules

### Entry Validation

**Required Fields**:
```yaml
entry_id: string        # E-YYYY-NNN format
title: string           # Non-empty
date_written: date      # YYYY-MM-DD format
time_period: string     # Non-empty (can be "[TO BE DETERMINED]")
word_count: number      # Must be calculated, not guessed
completeness: enum      # brief | partial | detailed
```

**ID Format**:
```
Pattern: E-YYYY-NNN
Example: E-2024-001, E-2024-002

Validation:
- Must start with "E-"
- Year must be valid (1900-2100)
- Number must be 3 digits (001-999)
- Must be unique across all entries
```

**Word Count Validation**:
```
Rule: word_count must equal actual content word count
Tolerance: +/- 5 words (for minor formatting differences)

If mismatch:
  → Calculate correct word count
  → Update frontmatter before save
  → Log correction
```

**Completeness Validation**:
```
brief: < 150 words
partial: 150-500 words
detailed: > 500 words

Auto-correct if wrong based on word count.
```

### Chapter Validation

**Required Fields**:
```yaml
chapter_id: string           # C-BBB-PP-NN format
book_id: string              # Must reference existing book
title: string                # Non-empty
chapter_number: number       # Positive integer
status: enum                 # outline | drafting | revised | complete
entries: array               # Array of entry IDs
current_word_count: number   # Calculated from entries
target_word_count: number    # Positive integer
```

**ID Format**:
```
Pattern: C-BBB-PP-NN
  BBB = Book number (001-999)
  PP = Phase/Part number (01-99)
  NN = Chapter number within phase (01-99)

Example: C-001-03-01 (Book 1, Part 3, Chapter 1)
```

**Entry References**:
```
For each entry_id in entries[]:
  → Verify entry file exists
  → Verify entry_id matches file's frontmatter

If entry not found:
  → Return validation error
  → Do NOT save chapter
```

**Status Transitions**:
```
Valid progressions:
  outline → drafting → revised → complete

Invalid:
  drafting → outline (regression)
  complete → drafting (without explicit override)

Warn but allow:
  revised → drafting (revision cycle)
```

**Word Count Validation**:
```
calculated = sum(entry.word_count for entry in entries)
If current_word_count != calculated:
  → Update current_word_count to calculated value
  → Log correction
```

### Book Validation

**Required Fields**:
```yaml
book_id: string              # B-NNN format
title: string                # Non-empty
current_word_count: number   # Calculated from chapters
target_word_count: number    # Positive integer
life_phases: array           # Array of phase objects
```

**ID Format**:
```
Pattern: B-NNN
Example: B-001
```

**Life Phase Validation**:
```yaml
Each phase must have:
  phase_id: string           # Unique within book
  name: string               # Non-empty
  order: number              # Unique, positive integer
  chapters: array            # Array of chapter IDs
```

**Chapter References**:
```
For each chapter_id in all life_phases[].chapters[]:
  → Verify chapter file exists
  → Verify chapter.book_id matches this book

If chapter not found:
  → Return validation error
```

**Word Count Validation**:
```
calculated = sum(chapter.current_word_count for all chapters)
If current_word_count != calculated:
  → Update current_word_count to calculated value
  → Log correction
```

---

## Validation Response

### On Success
```
{
  valid: true,
  corrections: [
    { field: "word_count", old: 289, new: 548 }
  ],
  data: { ... validated and corrected data ... }
}
```

### On Failure
```
{
  valid: false,
  errors: [
    {
      field: "entries[0]",
      error: "Entry E-2024-999 not found",
      severity: "critical"
    }
  ]
}
```

### Error Severities

| Severity | Action |
|----------|--------|
| `critical` | Block save, must fix |
| `warning` | Log warning, allow save |
| `info` | Auto-correct, proceed |

---

## Auto-Corrections

The validator will automatically fix these issues:

| Issue | Auto-Correction |
|-------|-----------------|
| Word count mismatch | Recalculate from content |
| Completeness mismatch | Recalculate from word count |
| Missing `date_written` | Set to today |
| Trailing whitespace in IDs | Trim |
| Duplicate entries in array | Deduplicate |

---

## Blocking Errors

These errors MUST be fixed before save:

| Error | Why It Blocks |
|-------|---------------|
| Missing entry_id/chapter_id/book_id | Data integrity |
| Duplicate ID | Uniqueness violation |
| Referenced entry/chapter not found | Broken links |
| Invalid ID format | Query/lookup failures |
| Missing required field | Schema violation |

---

## Usage by Other Skills

### LIFE-01 Usage
```
Before saving entry:
  validation = LIFE-32.validateEntry(entryData)
  if not validation.valid:
    raise ValidationError(validation.errors)
  entryData = validation.data  # Use corrected data
  saveEntry(entryData)
```

### LIFE-20 Usage
```
Before saving chapter:
  validation = LIFE-32.validateChapter(chapterData)
  if not validation.valid:
    raise ValidationError(validation.errors)
  chapterData = validation.data
  saveChapter(chapterData)

Before saving book:
  validation = LIFE-32.validateBook(bookData)
  if not validation.valid:
    raise ValidationError(validation.errors)
  bookData = validation.data
  saveBook(bookData)
```

### LIFE-21 Usage
```
After generating prose, before saving:
  chapterData.current_word_count = calculateWordCount(prose)
  validation = LIFE-32.validateChapter(chapterData)
  # ... same pattern
```

---

## ID Uniqueness Check

### Entry IDs
```
Load all existing entries
Extract all entry_ids
Check new ID not in existing set
```

### Chapter IDs
```
Load all existing chapters
Extract all chapter_ids
Check new ID not in existing set
```

### Generating New IDs
```
If ID not provided:
  For entries: E-{year}-{next_available_number}
  For chapters: C-{book}-{phase}-{next_available_number}
```

---

## Date Validation

**Formats Accepted**:
```
2024-12-25         (full date)
2024-12             (year-month)
2024                (year only)
"Late 2000s"        (period description)
"[TO BE DETERMINED]" (unknown)
```

**Validation**:
- If specific date, must be valid calendar date
- Must not be in future (for date_written)
- Time periods can be descriptive strings

---

## Success Criteria

- No invalid data enters the database
- Word counts are always accurate at save time
- All references (entries, chapters) are valid
- IDs follow consistent format and are unique
- Auto-corrections happen transparently
- Blocking errors provide clear fix instructions

---

*Skill LIFE-32 v1.0 | Life Story System | 2024-12-25*
