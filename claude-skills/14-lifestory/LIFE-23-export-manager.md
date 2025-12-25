# LIFE-23: Export Manager

**Skill ID**: LIFE-23
**Category**: Life Story - Book Generation
**Priority**: Medium
**Version**: 1.0
**Last Updated**: 2024-12-25

---

## Purpose

Generate publication-ready exports of the memoir in multiple formats (PDF, EPUB). This skill orchestrates the final compilation of polished chapters into a cohesive book, handling formatting, styling, and file generation.

---

## When to Activate

**Manual Invocation**:
```
/export pdf                      → Generate PDF with default template
/export epub                     → Generate EPUB for e-readers
/export pdf --chapters 1-3       → Export specific chapters only
/export --preview                → Show export preview without generating
```

**Automatic Triggers**:
- When all chapters reach "complete" status
- When user explicitly requests export
- Before printing or sharing

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-20 | Get book structure and chapter order |
| LIFE-22 | Ensure chapters are polished before export |
| LIFE-00 | Get author name and preferences |

---

## Export Formats

### PDF Export

Uses Pandoc with custom template for professional book layout.

**Features**:
- Title page with author and date
- Table of contents
- Chapter headers with decorative elements
- Consistent typography (serif body, sans headers)
- Page numbers
- Section breaks between life phases

**Template location**: `/exports/templates/memoir-pdf.tex`

### EPUB Export

E-reader compatible format using Pandoc.

**Features**:
- Reflowable text for all screen sizes
- Table of contents navigation
- Chapter navigation
- Cover image (optional)
- Metadata (author, title, date)

---

## Export Workflow

### Step 1: Validate Book State

```
1. Load book manifest from LIFE-20
2. Check chapter statuses:
   - All chapters at "revised" or "complete"? → Proceed
   - Some chapters in "drafting"? → Warn, offer partial export
   - Chapters in "outline"? → Skip with warning
3. Calculate total word count
4. Verify chapter order and numbering
```

### Step 2: Compile Content

```
1. For each life phase (in order):
   a. Create phase/part header
   b. For each chapter in phase:
      - Extract prose content (not metadata)
      - Add chapter title and subtitle
      - Include chapter number
   c. Add phase separator
2. Build table of contents
3. Create title page content
```

### Step 3: Generate Output

**For PDF**:
```bash
pandoc \
  --from markdown \
  --to pdf \
  --template memoir-pdf.tex \
  --pdf-engine xelatex \
  --toc \
  --toc-depth 2 \
  -V title="My Life Story" \
  -V author="Hamza" \
  -V date="$(date +%Y)" \
  -o "/exports/final/my-life-story.pdf" \
  compiled-book.md
```

**For EPUB**:
```bash
pandoc \
  --from markdown \
  --to epub3 \
  --toc \
  --toc-depth 2 \
  --epub-title-page \
  -V title="My Life Story" \
  -V author="Hamza" \
  -o "/exports/final/my-life-story.epub" \
  compiled-book.md
```

### Step 4: Post-Process

```
1. Verify file was created
2. Report file size and location
3. Offer to open file
4. Log export in metadata/exports.log
```

---

## Command Details

### `/export pdf`

Full PDF export:

```
## Exporting to PDF

### Validation
- Book: My Life Story ✓
- Chapters: 2 total
  - ✓ The League Years (revised, 847 words)
  - ✓ Why I Write (revised, 523 words)
- Total words: 1,370

### Compilation
- Title page: ✓
- Table of contents: ✓
- Part headers: 2
- Chapters: 2
- Compiled content: 1,523 words (with front matter)

### Generation
Running pandoc with memoir template...

### Complete!
**Output**: /exports/final/my-life-story.pdf
**Size**: 245 KB
**Pages**: ~6 (estimated)

[Open PDF] [Export EPUB too]
```

### `/export epub`

Full EPUB export:

```
## Exporting to EPUB

### Validation
[Same as PDF]

### Compilation
[Same as PDF]

### Generation
Running pandoc for EPUB3...

### Complete!
**Output**: /exports/final/my-life-story.epub
**Size**: 128 KB

Compatible with: Kindle, Apple Books, Kobo, etc.

[Open EPUB] [Export PDF too]
```

### `/export --preview`

Shows what would be exported:

```
## Export Preview

**Book**: My Life Story
**Author**: Hamza
**Format**: Would generate PDF and EPUB

### Structure Preview
- Title Page
- Table of Contents
- Part III: Digital Worlds
  - Chapter 1: The League Years (847 words)
- Epilogue: Looking Back
  - Chapter 1: Why I Write (523 words)

### Readiness
- Chapters ready: 2/2 (100%)
- Ghostwriter score avg: 0.94
- Total words: 1,370

### Missing Content
- Parts I, II, IV, V: No chapters yet (expected)

[Export PDF] [Export EPUB] [Export Both]
```

---

## Template Structure

### PDF Template (memoir-pdf.tex)

```latex
% Memoir PDF Template for Life Story System
\documentclass[11pt,a5paper]{book}

% Typography
\usepackage{fontspec}
\setmainfont{Crimson Pro}
\setsansfont{Inter}

% Layout
\usepackage[margin=0.75in]{geometry}
\usepackage{titlesec}

% Chapter styling
\titleformat{\chapter}[display]
  {\normalfont\Large\sffamily\bfseries}
  {Chapter \thechapter}{20pt}{\Huge}

% Part styling
\titleformat{\part}[display]
  {\centering\normalfont\Huge\sffamily}
  {\partname\ \thepart}{20pt}{\Huge}

% Decorative elements
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhead{}
\fancyfoot[C]{\thepage}

\begin{document}
$body$
\end{document}
```

### Compiled Markdown Structure

```markdown
---
title: My Life Story
subtitle: Memories, Moments, and the Making of Me
author: Hamza
date: 2024
---

# Part III: Digital Worlds

## Chapter 1: The League Years

*When I Was the Best in the World*

[Chapter prose content...]

---

# Epilogue: Looking Back

## Chapter 1: Why I Write

[Chapter prose content...]

---

*This memoir was written with the help of StoryAI.*
*Generated December 2024*
```

---

## Output Directory Structure

```
/exports/
├── templates/
│   ├── memoir-pdf.tex        # LaTeX template for PDF
│   ├── memoir-epub.css       # Stylesheet for EPUB
│   └── cover.png             # Optional cover image
├── drafts/
│   └── [chapter drafts]
├── final/
│   ├── my-life-story.pdf
│   └── my-life-story.epub
└── logs/
    └── export-history.md     # Log of all exports
```

---

## Prerequisites

**For PDF export**:
- Pandoc installed (`brew install pandoc`)
- XeLaTeX installed (`brew install --cask mactex`)
- Fonts: Crimson Pro, Inter (or fallbacks)

**For EPUB export**:
- Pandoc installed

**Check prerequisites**:
```
/export --check
```

---

## Error Handling

### Common Issues

**No pandoc installed**:
```
Pandoc is required for export. Install with:
  brew install pandoc

For PDF export, also install:
  brew install --cask mactex
```

**Chapters not ready**:
```
Some chapters are not ready for export:
- "The League Years" is in 'drafting' status

Options:
[ ] Polish chapters first (recommended)
[ ] Export anyway (incomplete chapters skipped)
[ ] Cancel
```

**Font not found**:
```
Font "Crimson Pro" not found. Using fallback: Georgia
This may affect PDF appearance.
```

---

## Versioning

Each export is logged with timestamp:

```markdown
# Export History

## 2024-12-25 14:32
- Format: PDF
- Chapters: 2
- Words: 1,370
- File: my-life-story-20241225.pdf

## 2024-12-25 14:35
- Format: EPUB
- Chapters: 2
- Words: 1,370
- File: my-life-story-20241225.epub
```

---

## Anti-Patterns

**Do NOT**:
- Export chapters still in "outline" status
- Skip ghostwriter validation
- Generate without checking prerequisites
- Overwrite previous exports without versioning

**DO**:
- Validate all chapters are polished
- Check prerequisites before attempting export
- Version exports with timestamps
- Offer both formats when exporting

---

## Success Criteria

- PDF renders correctly with proper formatting
- EPUB works on major e-readers
- All chapters included in correct order
- Table of contents functions correctly
- Author name and metadata correct
- Export completes without errors

---

*Skill LIFE-23 v1.0 | Life Story System - Book Generation | 2024-12-25*
