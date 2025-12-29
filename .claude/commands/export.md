---
description: Export book to PDF or EPUB
---

# /export

Generate publication-ready exports of the memoir in PDF and EPUB formats.

## Reference
Full skill documentation: `claude-skills/14-lifestory/LIFE-23-export-manager.md`

## Usage
- `/export pdf` - Generate PDF with default template
- `/export epub` - Generate EPUB for e-readers
- `/export pdf --chapters 1-3` - Export specific chapters only
- `/export --preview` - Show export preview without generating
- `/export --check` - Check prerequisites (Pandoc, XeLaTeX)

## `/export pdf` Output

```
## Exporting to PDF

### Validation
- Book: My Life Story
- Chapters: 2 total
  - The League Years (revised, 847 words)
  - Why I Write (revised, 523 words)
- Total words: 1,370

### Compilation
- Title page: Done
- Table of contents: Done
- Part headers: 2
- Chapters: 2

### Generation
Running pandoc with memoir template...

### Complete!
**Output**: /exports/final/my-life-story.pdf
**Size**: 245 KB
**Pages**: ~6 (estimated)

[Open PDF] [Export EPUB too]
```

## Prerequisites

**For PDF export**:
- Pandoc installed (`brew install pandoc`)
- XeLaTeX installed (`brew install --cask mactex`)

**For EPUB export**:
- Pandoc installed

Run `/export --check` to verify prerequisites.

## Chapter Requirements

Chapters should be at status "revised" or "complete" before export:
- **outline** - Will be skipped with warning
- **drafting** - Warning offered, can include
- **revised** - Good to export
- **complete** - Ready for publication

## Export Features

**PDF**:
- Title page with author and date
- Table of contents
- Chapter headers with decorative elements
- Consistent typography
- Page numbers
- Section breaks between life phases

**EPUB**:
- Reflowable text for all screen sizes
- Table of contents navigation
- Chapter navigation
- Cover image (optional)
- Works on Kindle, Apple Books, Kobo

## File Locations
- Templates: `/exports/templates/`
- Output: `/exports/final/`
- Logs: `/exports/logs/export-history.md`

## Related Commands
- `/book` - View book structure
- `/generate-chapter [id]` - Generate chapter prose first
