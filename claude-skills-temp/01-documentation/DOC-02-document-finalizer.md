# DOC-02: Document Finalizer

**Skill ID**: DOC-02
**Category**: Documentation
**Priority**: Critical
**Version**: 1.0

---

## Purpose

Standardizes documents for final storage in the Knowledge Base by removing metadata headers, version information, and applying clean naming conventions. This skill ensures documents are treated as finalized, authoritative references rather than work-in-progress drafts.

---

## When to Activate

**Triggers**:
- "Finalize this document"
- "Prepare documents for knowledge base"
- "Standardize document naming"
- "Remove document metadata"
- "Clean up documentation"
- Before adding to Knowledge Base

---

## Core Philosophy

**Documents in the Knowledge Base are FINAL documents.**

- No version numbers needed (treat as current authoritative version)
- No date prefixes needed (not time-sensitive drafts)
- No metadata headers (focus on content, not document tracking)
- Clean, descriptive filenames only

---

## What to REMOVE

### Metadata Headers

Remove these document header patterns:

```markdown
**Document Code:** [ANY-CODE-HERE]
**Version:** [X.X]
**Status:** [ANY STATUS]
**Date:** [ANY DATE]
**Last Updated:** [ANY DATE]
**Authors:** [ANY AUTHORS]
**Owner:** [ANY OWNER]
**Prepared By:** [ANY ENTITY]
**Prepared For:** [ANY ENTITY]
**Document Type:** [ANY TYPE]
**Priority:** [ANY PRIORITY]
**Dependencies:** [ANY DEPENDENCIES]
**Classification:** [ANY CLASSIFICATION]
```

### Version History Sections

```markdown
**Version History:**
- v1.0 (DATE): Description
- v2.0 (DATE): Description
```

### Document Change Log Sections

```markdown
## Document Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | DATE | Author | Description |
```

### Document Control Tables

```markdown
## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
```

### "DOCUMENT PURPOSE" Sections

Remove sections that describe what type of document it is:

```markdown
## DOCUMENT PURPOSE

**This is a VISION DOCUMENT** - It describes...
- **IS:** ...
- **IS NOT:** ...

**Current Status:** Product is in **STAGE**...
```

### Footer Metadata

```markdown
*Document Name v1.0 | Organization | Date*
```

```markdown
**Last Updated:** DATE
**Version:** X.X
**Maintained By:** Team Name
```

---

## What to KEEP

### All Actual Content

- Executive summaries
- Problem statements
- Solutions/features
- Technical specifications
- Market analysis
- Business logic
- Tables with business data
- Implementation details
- Success metrics
- Next steps (if action-oriented)

### Section Headers

Keep all section headers that organize content:
- `## 1. Executive Summary`
- `## 2. Problem Statement`
- `## Table of Contents`

### Document Title

Keep the main `# Title` of the document.

---

## Naming Convention Standards

### Standard Format

```
Document-Name-With-Hyphens.md
```

### Remove from Filenames

| Pattern | Example Before | Example After |
|---------|----------------|---------------|
| Date prefix | `2025-11-29_Document.md` | `Document.md` |
| Version suffix | `Document_v1.0.md` | `Document.md` |
| Version in name | `Document-v4.0.md` | `Document.md` |
| Numbered prefix | `01-Document.md` | `Document.md` |

### Valid Examples

```
Xyric-Vision-Document.md
Xyric-Dashboard-Philosophy.md
Product-Requirements-Document.md
Executive-Vision-Document.md
Mascon-Business-Hypothesis-Framework.md
DR-AI-Product-Vision.md
yBusiness-Product-Vision.md
```

### Invalid Examples

```
2025-11-28_Xyric-Vision-Document_v2.0.md
01-Executive-Vision-Document.md
Product-Requirements-Document-v4.0.md
2025-11-29_Mascon-Business-Hypothesis-Framework_v1.0.md
```

---

## Folder-Specific Conventions

### FRAMEWORKS/

Pattern: `Xyric-[Framework-Name].md`

```
Xyric-Dashboard-Philosophy.md
Xyric-Research-Solution-Development-Philosophy.md
Xyric-Insight-Question-Hypothesis-Generation-Framework.md
Xyric-PowerPoint-Brand-Guidelines.md
```

### COMPANY/

Pattern: `Xyric-[Document-Name].md`

```
Xyric-Vision-Document.md
```

### PRODUCTS/[product-name]/

Pattern: `[Document-Type].md` or `[Product-Code]-[Document-Type].md`

```
Product-Vision.md
Product-Requirements-Document.md
Executive-Vision-Document.md
DR-AI-Product-Vision.md
DR-AI-Business-Plan.md
DR-AI-PRD-Phase1.md
yBusiness-Product-Vision.md
```

### PRODUCTS/[product-name]/prd-epics/

Pattern: `PRD-Epic-[##]-[Name].md`

```
PRD-Epic-01-Onboarding-Assessment.md
PRD-Epic-02-Voice-Coaching.md
PRD-Epic-03-WhatsApp-Integration.md
```

### CLIENT-[NAME]/

Pattern: `[Client]-[Document-Type].md`

```
Mascon-Comprehensive-Data-AI-Solution.md
Mascon-Business-Hypothesis-Framework.md
Mascon-Dashboard-Design-Specification.md
Mascon-Dashboard-Task-Requirements.md
```

---

## Execution Process

### Step 1: Identify Documents

```bash
# Find all markdown files in target directory
find [DIRECTORY] -name "*.md" -type f
```

### Step 2: Read Document Headers

Read first 30-50 lines to identify metadata patterns.

### Step 3: Remove Metadata

Edit documents to remove:
1. Metadata header block (after title, before first content section)
2. Version history sections
3. Document change log sections
4. Footer metadata lines

### Step 4: Rename Files

Remove from filenames:
- Date prefixes (`YYYY-MM-DD_`)
- Version suffixes (`_vX.X`, `-vX.X`)
- Numbered prefixes (`##-`)

### Step 5: Verify

Confirm:
- Document title preserved
- All content sections intact
- Clean filename applied
- No orphaned separators (`---`) at document start

---

## Example Transformation

### Before

```markdown
# Product Vision Document

**Document Code:** YH-VISION-2025-12-03
**Version:** 4.0
**Status:** [DESIGN STAGE - PRODUCT DEFINITION]
**Document Type:** P0 - Critical Foundation
**Authors:** Xyric Solutions Co-Founders

**Version History:**
- v1.0 (2025-10-01): Initial vision
- v4.0 (2025-12-03): Updated scope

---

## DOCUMENT PURPOSE

**This is a VISION DOCUMENT** - It describes...
- **IS:** Long-term vision...
- **IS NOT:** Implementation guide...

---

## EXECUTIVE SUMMARY

yHealth is your AI Life Coach...
```

**Filename:** `2025-12-03_Product-Vision_v4.0.md`

### After

```markdown
# Product Vision Document

## EXECUTIVE SUMMARY

yHealth is your AI Life Coach...
```

**Filename:** `Product-Vision.md`

---

## Checklist

### Content Cleanup

- [ ] Metadata header block removed
- [ ] Version history section removed
- [ ] Document change log removed
- [ ] Document purpose/type section removed
- [ ] Footer metadata removed
- [ ] All actual content preserved
- [ ] Section headers intact

### Filename Cleanup

- [ ] Date prefix removed
- [ ] Version suffix removed
- [ ] Numbered prefix removed
- [ ] Clean hyphenated name applied
- [ ] Appropriate folder convention followed

---

## Integration with Workflow

### Before Knowledge Base Sync

1. Run Document Finalizer on all documents in folder
2. Verify content integrity
3. Add to Knowledge Base

### Relationship to DOC-01

- **DOC-01 (Documentation Validator)**: For work-in-progress documents with version tracking
- **DOC-02 (Document Finalizer)**: For finalized documents ready for knowledge base storage

Use DOC-01 during active development, then DOC-02 when finalizing for permanent storage.

---

## Anti-Patterns

- Do NOT remove actual content (executive summaries, features, specifications)
- Do NOT remove section headers that organize content
- Do NOT remove tables containing business data
- Do NOT remove the document title
- Do NOT add new metadata after finalizing

---

## Success Criteria

- All metadata headers removed
- All version/date information removed from filenames
- All content sections preserved intact
- Clean, descriptive filenames applied
- Documents ready for Knowledge Base sync
