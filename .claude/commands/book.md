---
description: Book structure and chapter management
---

# /book

Design and maintain the book structure. Create life phases, organize chapters, and manage the master book outline.

## Reference
Full skill documentation: `claude-skills/14-lifestory/LIFE-20-book-architect.md`

## Usage
- `/book` - Show current book structure and status
- `/book-create` - Initialize a new book structure
- `/book add-chapter [phase] [title]` - Add a new chapter
- `/book move-entry [entry-id] [chapter-id]` - Assign entry to chapter
- `/book reorder [chapter-id] [position]` - Reorder chapters
- `/book status` - Show detailed progress

## `/book` - Show Structure

```
# My Life Story

**Status**: Planning | 2 chapters outlined

## Structure

### Part I: Roots (Birth - ~2000)
[No chapters yet - 0 entries available]

### Part II: Growing Up (~2000 - ~2008)
[No chapters yet - 0 entries available]

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

## Structure Type: Hybrid

- **Chronological backbone**: Life phases in order (childhood → school → university → adulthood)
- **Thematic sub-chapters**: Within each phase, chapters organized by theme

## Life Phases
```yaml
childhood:      Birth - ~12 years
teenage:        ~12 - ~18 years
university:     College/University years
early_career:   First jobs, early adulthood
adulthood:      Established adult life
present:        Current period
reflections:    Meta-entries about writing this book
```

## File Locations
- Book manifest: `/story-data/books/my-life-story.md`
- Chapters: `/story-data/chapters/[section]/[file].md`

## Related Commands
- `/generate-chapter [id]` - Generate prose for a chapter (LIFE-21)
- `/export` - Export to PDF/EPUB
