# Document Operations - Master Index

**Version**: 1.3
**Created**: 2025-12-07
**Last Updated**: 2025-12-22
**Purpose**: File manipulation skills for PDF, Word, PowerPoint, Excel documents, YouTube transcripts, video analysis, and key points extraction
**Total Skills**: 7

---

## Overview

Document Operations skills enable creation, editing, and manipulation of common document formats. These are utility skills originally from Anthropic's official skill set, integrated into Xyric's unified structure.

---

## Quick Reference

| Skill | ID | Format | Use Case |
|-------|-----|--------|----------|
| **PDF** | DOC-OPS-01 | .pdf | Extract text, fill forms, manipulate PDF files |
| **Word** | DOC-OPS-02 | .docx | Create and edit Word documents |
| **PowerPoint** | DOC-OPS-03 | .pptx | Generate presentations from content |
| **Excel** | DOC-OPS-04 | .xlsx | Create and manipulate spreadsheets |
| **YouTube Transcript** | DOC-OPS-05 | .vtt/.txt | Download transcripts/captions from YouTube videos |
| **YouTube Summariser** | DOC-OPS-06 | .md | Transform transcripts into structured analysis documents |
| **YouTube Key Points** | DOC-OPS-07 | .yaml/.md | Extract structured key points for social media, database import, PDF |

---

## Skill Details

### DOC-OPS-01: PDF Operations
- **Path**: `DOC-OPS-01-pdf/SKILL.md`
- **Capabilities**: Text extraction, form filling, page manipulation
- **Scripts**: 7 Python scripts for various PDF operations
- **Reference**: Includes forms.md and reference.md documentation

### DOC-OPS-02: Word Documents
- **Path**: `DOC-OPS-02-docx/SKILL.md`
- **Capabilities**: Document creation, formatting, template generation
- **Reference**: docx-js.md for JavaScript integration
- **OOXML**: Office Open XML specification support

### DOC-OPS-03: PowerPoint Presentations
- **Path**: `DOC-OPS-03-pptx/SKILL.md`
- **Capabilities**: Slide generation, HTML to PPTX conversion
- **Reference**: html2pptx.md for web content conversion
- **OOXML**: Office Open XML specification support

### DOC-OPS-04: Excel Spreadsheets
- **Path**: `DOC-OPS-04-xlsx/SKILL.md`
- **Capabilities**: Spreadsheet creation, formula handling, data manipulation
- **Scripts**: recalc.py for formula recalculation

### DOC-OPS-05: YouTube Transcript
- **Path**: `DOC-OPS-05-youtube-transcript.md`
- **Capabilities**: Download video transcripts, extract captions/subtitles, convert to plain text
- **Dependencies**: yt-dlp (auto-installs via Homebrew/apt/pip)
- **Fallback**: Whisper transcription for videos without subtitles

### DOC-OPS-06: YouTube Summariser
- **Path**: `DOC-OPS-06-youtube-summariser.md`
- **Capabilities**: Transform transcripts into structured analysis documents, auto-detect video types, channel credibility lookup
- **Video Types**: tutorial, review, analysis, interview, news, explainer, comparison, case-study
- **Output**: Structured markdown documents saved to `CONTENT/youtube/{type}/`
- **Integration**: Chains with DOC-OPS-05, supports EverythingAI for review videos

### DOC-OPS-07: YouTube Key Points Extractor
- **Path**: `DOC-OPS-07-youtube-key-points.md`
- **Capabilities**: Extract structured key points from DOC-OPS-06 analyses for downstream workflows
- **Output Schema**: YAML blocks with key_moments, ratings, pros_cons, takeaways, quotable_snippets, social_snippets, everythingai_import, pdf_export
- **Downstream Workflows**:
  - Social Media: Pre-formatted Twitter/LinkedIn snippets → CONTENT-01/02
  - Database Import: YAML for EverythingAI tool aggregation
  - PDF Export: Key moments with timestamps → DOC-OPS-01
- **Integration**: Downstream of DOC-OPS-06, feeds CONTENT-01/02, DOC-OPS-01

---

## Integration Notes

These skills work well with:
- `11-bi-data-analytics/` - For data visualization and reporting
- `EXPERT-12-technical-writer` - For document generation workflows
- `CLIENT-01-proposal-generator` - For creating client deliverables
- `RESEARCH-01-competitive-analysis` - For analyzing video content in research
- `CONTENT-01/02-social-*` - For repurposing video content for social media

---

## Source

Originally from [Anthropic's official Claude Skills repository](https://github.com/anthropics/claude-code/tree/main/docs/skills).
