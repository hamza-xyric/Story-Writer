# LIFE-31: Auto-Sync Word Counts

**Skill ID**: LIFE-31
**Category**: Life Story / Data Integrity
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-25

---

## Purpose

Automatically recalculate and update word counts across all levels (entry, chapter, section, book) to ensure consistency. Runs silently after data modifications, or manually via command.

---

## When to Activate

**Automatic (Silent)**:
- After LIFE-01 processes an entry
- After LIFE-20 creates/modifies chapters
- After LIFE-21 generates prose
- After any entry is moved between chapters

**Manual Invocation**:
```
/sync-counts
"Update all word counts"
"Recalculate word counts"
```

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-01 | Triggers sync after entry processing |
| LIFE-20 | Triggers sync after chapter creation |
| LIFE-21 | Triggers sync after prose generation |
| LIFE-30 | Run after sync to verify consistency |

---

## Sync Process

### Level 1: Entry Word Counts

**Rule**: Count words in content section only.

**What to Count**:
- Main content (after frontmatter `---`, before `## AI Notes`)
- Include headings in content area
- Include markdown formatting text

**What to Exclude**:
- YAML frontmatter
- `## AI Notes` section and everything after
- Footer metadata line

**Algorithm**:
```
1. Read entry file
2. Split at frontmatter end (---)
3. Split at "## AI Notes" if present
4. Extract content section
5. Strip markdown links/images but keep text
6. Count words (split on whitespace)
7. Update frontmatter word_count if different
```

**Example**:
```markdown
---
word_count: 548  # This field gets updated
---

# Title

Content here gets counted...
More content...

---
## AI Notes
This section is NOT counted
```

### Level 2: Chapter Section Word Counts

**Rule**: Section word count = sum of entries in that section.

**Algorithm**:
```
For each chapter:
  For each section in chapter.sections:
    section_entries = entries matching section.entries[]
    section.word_count = sum(entry.word_count for entry in section_entries)
```

### Level 3: Chapter Word Counts

**Rule**: Chapter word count = sum of all linked entry word counts.

**Algorithm**:
```
For each chapter:
  chapter_entries = entries matching chapter.entries[]
  chapter.current_word_count = sum(entry.word_count for entry in chapter_entries)
```

**Note**: If chapter has its own prose content (not from entries), that should also be counted. Look for content after frontmatter that isn't placeholder text.

### Level 4: Book Word Counts

**Rule**: Book word count = sum of all chapter word counts.

**Algorithm**:
```
For each book:
  book_chapters = chapters matching book.life_phases[].chapters[]
  book.current_word_count = sum(chapter.current_word_count for chapter in book_chapters)
```

---

## Output Modes

### Silent Mode (Default for Automatic)

No output unless errors. Used when triggered by other skills.

```
# Internal logging only
[SYNC] Entry E-2024-002: 548 (unchanged)
[SYNC] Chapter C-001-03-01: 289 → 548 (updated)
[SYNC] Book B-001: 636 → 807 (updated)
```

### Verbose Mode (Manual Invocation)

Full report of changes.

```markdown
## Word Count Sync Complete

### Entries
- E-2024-001: 259 words (unchanged)
- E-2024-002: 548 words (unchanged)

### Chapters
- C-001-03-01: 289 → 548 (updated)
- C-001-06-01: 259 (unchanged)

### Books
- B-001: 636 → 807 (updated)

---

**Summary**:
- 2 entries verified
- 1 chapter updated
- 1 book updated
- All word counts are now consistent
```

---

## File Update Process

### Updating Frontmatter

When updating a file's word count:

1. Read entire file
2. Parse YAML frontmatter
3. Update relevant field (`word_count` or `current_word_count`)
4. Serialize frontmatter back to YAML
5. Reconstruct file with new frontmatter + original content
6. Write file

**Preserve**:
- All other frontmatter fields
- All content after frontmatter
- File formatting and line endings

### Update Order

Always sync in this order:
1. Entries first (source of truth)
2. Sections second
3. Chapters third
4. Books last

This ensures each level has accurate data from the level below.

---

## Edge Cases

### Entry Not Found
If a chapter references an entry that doesn't exist:
- Log warning
- Skip that entry in calculation
- Don't fail the sync

### Empty Chapter
If a chapter has no entries:
- Set `current_word_count: 0`
- Continue normally

### Missing Frontmatter Field
If `word_count` or `current_word_count` field is missing:
- Add the field with calculated value

### Section Without Entries
If a section has no entries:
- Set `word_count: 0`

---

## Integration with Other Skills

### After LIFE-01 (Entry Processor)
```
When LIFE-01 saves an entry:
1. Calculate and set entry word_count
2. If entry is assigned to a chapter:
   - Update chapter current_word_count
   - Update section word_count if applicable
   - Update book current_word_count
```

### After LIFE-20 (Book Architect)
```
When LIFE-20 assigns entries to chapters:
1. Recalculate chapter current_word_count
2. Recalculate section word_counts
3. Recalculate book current_word_count
```

### After LIFE-21 (Chapter Generator)
```
When LIFE-21 generates prose:
1. Calculate prose word count
2. Add to chapter current_word_count
3. Update book current_word_count
```

---

## Validation

After sync completes, optionally verify:
```
For each level:
  stored_value = read from file
  calculated_value = compute from children
  assert stored_value == calculated_value
```

If verification fails, log error but don't loop infinitely.

---

## Success Criteria

- All entry word_counts reflect actual content
- All chapter current_word_counts equal sum of entry word_counts
- All section word_counts equal sum of section entry word_counts
- All book current_word_counts equal sum of chapter word_counts
- Updates happen automatically without user intervention
- Manual sync provides clear report of changes

---

*Skill LIFE-31 v1.0 | Life Story System | 2024-12-25*
