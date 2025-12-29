# LIFE-31: Auto-Sync

**Skill ID**: LIFE-31
**Category**: Life Story / Data Integrity
**Priority**: Critical
**Version**: 2.0
**Last Updated**: 2024-12-28

---

## Purpose

Automatically sync bidirectional references AND word counts across all entities. Runs after data modifications to maintain integrity per Rules 1-8 (Critical) in `story-data/context/data-standards.md`.

---

## When to Activate

**Automatic (Silent)**:
- After LIFE-01 processes an entry
- After LIFE-20 creates/modifies chapters
- After LIFE-21 generates prose
- After any entry/chapter/character/location is modified

**Manual Invocation**:
```
/sync-counts   → Word count sync only
/sync          → Full sync (references + word counts)
```

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-01 | Triggers sync after entry processing |
| LIFE-20 | Triggers sync after chapter creation |
| LIFE-30 | Run after sync to verify consistency (18 rules) |
| LIFE-35 | Unified health report combining LIFE-30 + LIFE-04 |

---

## Two Sync Types

### 1. Reference Sync (Bidirectional Links)

Updates all bidirectional references between entities.

### 2. Word Count Sync

Recalculates and cascades word counts from entries → chapters → books.

---

## Reference Sync Process

### Entry → Character Sync

When an entry references a character:
```
1. For each character_id in entry.characters[]:
   a. Read character file
   b. If entry_id not in character.entries_featured[]:
      - Add entry_id to entries_featured[]
      - Save character file
```

When a character is removed from entry:
```
1. For removed character_id:
   a. Read character file
   b. Remove entry_id from entries_featured[]
   c. Save character file
```

### Entry → Location Sync

Same pattern as Entry → Character:
```
1. For each location_id in entry.locations[]:
   a. Read location file
   b. If entry_id not in location.entries_featured[]:
      - Add entry_id
      - Save location file
```

### Entry → Chapter Sync

When an entry is assigned to a chapter:
```
1. Set entry.chapter_id = chapter_id
2. If entry_id not in chapter.entries[]:
   - Add entry_id to chapter.entries[]
   - Save chapter file
3. If entry previously in different chapter:
   - Remove from old chapter.entries[]
   - Save old chapter file
```

When updating from chapter side:
```
1. For each entry_id in chapter.entries[]:
   a. Read entry file
   b. If entry.chapter_id != chapter_id:
      - Set entry.chapter_id = chapter_id
      - Save entry file
```

### Chapter → Book Sync

When a chapter's book changes:
```
1. Set chapter.book_id = book_id
2. Verify chapter_id in book.life_phases[].chapters[]
3. If not found, add to appropriate phase
```

---

## Word Count Sync Process

### Level 1: Entry Word Counts

**Rule**: Count from H1 title to `## AI Notes` or `---` before AI Notes.

**Algorithm**:
```
1. Read entry file
2. Find content between frontmatter end and "## AI Notes"
3. Strip markdown formatting characters
4. Count words (split on whitespace)
5. Update word_count in frontmatter (exact match required)
```

### Level 2: Section Word Counts

**Rule**: Section word count = sum of entries in that section.

```
For each section in chapter.sections[]:
  section.word_count = sum(entry.word_count for entry_id in section.entries[])
```

### Level 3: Chapter Word Counts

**Rule**:
- If prose exists: count prose in `## Prose Draft` section
- If no prose: sum of entry word counts

```
For each chapter:
  if chapter has prose draft content:
    chapter.current_word_count = prose_word_count
  else:
    chapter.current_word_count = sum(entry.word_count for entry in chapter.entries[])
```

### Level 4: Book Word Counts

**Rule**: Book word count = sum of all chapter word counts.

```
For each book:
  book.current_word_count = sum(chapter.current_word_count for all chapters)
```

### Sync Order

Always sync in this order:
1. Entry word counts (source of truth)
2. Section word counts
3. Chapter word counts
4. Book word counts

---

## Output Modes

### Silent Mode (Automatic)

No output unless errors. Internal logging only.

### Verbose Mode (Manual `/sync`)

```markdown
## Sync Complete

### Reference Updates
- Entry E-2024-002 → Character friends/trinkhalm: already synced
- Entry E-2024-001 → Chapter C-001-06-01: already synced

### Word Count Updates
| Entity | Previous | Current | Change |
|--------|----------|---------|--------|
| E-2024-001 | 347 | 333 | -14 |
| E-2024-002 | 548 | 527 | -21 |
| C-001-06-01 | 456 | 384 | -72 |
| C-001-03-01 | 548 | 527 | -21 |
| B-001 | 895 | 911 | +16 |

---

**Summary**:
- 2 entries synced
- 2 chapters synced
- 1 book synced
- All references verified
- All word counts accurate
```

---

## Triggered After Specific Actions

### After LIFE-01 (Entry Saved)

```
1. Calculate entry.word_count
2. For each character in entry.characters[]:
   - Add entry to character.entries_featured[]
3. For each location in entry.locations[]:
   - Add entry to location.entries_featured[]
4. If entry.chapter_id set:
   - Verify entry in chapter.entries[]
   - Recalculate chapter.current_word_count
   - Recalculate book.current_word_count
```

### After Entry Assigned to Chapter

```
1. Set entry.chapter_id
2. Add entry to chapter.entries[]
3. Recalculate chapter.current_word_count
4. Recalculate book.current_word_count
```

### After Chapter Created/Modified

```
1. For each entry in chapter.entries[]:
   - Verify entry exists
   - Set entry.chapter_id to this chapter
2. Recalculate current_word_count
3. Recalculate book.current_word_count
```

### After Character/Location Modified

```
1. For each entry in entries_featured[]:
   - Verify entry exists
   - Verify this entity is in entry's reference array
```

---

## Edge Cases

### Entry Not Found
- Log warning
- Skip in calculation
- Don't fail sync

### Orphaned Reference
- If character.entries_featured[] references non-existent entry:
  - Remove from entries_featured[]
  - Log warning

### Missing Field
- If word_count field missing: add with calculated value
- If chapter_id missing: leave null (entry not assigned)

---

## Success Criteria

After sync:
- All bidirectional references match (Rule 1-6)
- All word counts are exact (Rule 7, 0 tolerance)
- Section entries subset matches chapter entries (Rule 8)

Run LIFE-30 after sync to verify.

---

*Skill LIFE-31 v2.1 | Life Story System | 2024-12-29*
