# DOC-03: Document Metadata Enforcer

**Skill ID**: DOC-03
**Category**: Documentation
**Priority**: Critical
**Version**: 1.0
**Last Updated**: 2025-12-18

---

## Purpose

Automatically ensure all documents have proper KB-readable metadata when created or modified. This skill enforces standardized frontmatter and footer sections that the Knowledge Base application can read and display.

---

## When to Activate

**Triggers**:
- Creating a new document in PRODUCTS/, CLIENTS/, COMPANY/, FRAMEWORKS/, or PROJECTS/
- Modifying existing document content
- Running `/review --fix` command
- Running `/update --apply` command
- "Add metadata to this document"
- "Update document metadata"

---

## Metadata Structure

### YAML Frontmatter (Required)

Every document must have YAML frontmatter with these fields:

```yaml
---
type: product | epic | story | project | service | framework | company | progress
title: Document Title
status: draft | in-progress | review | done | approved | archived
priority: P0 | P1 | P2 | P3
owner: team-member-id
last_updated: YYYY-MM-DD
kb_summary: "One-line summary for KB display (max 100 chars)"
related_docs:
  - /PRODUCTS/product-name
  - /FRAMEWORKS/framework-name
---
```

### Footer Section (Required)

Every document must end with a standardized footer:

```markdown
---

## Document Info

| Field | Value |
|-------|-------|
| Status | {status} |
| Owner | {owner} |
| Last Updated | {last_updated} |

### Related Documents
- [Related Doc 1](/path/to/doc)
- [Related Doc 2](/path/to/doc)

### Next Steps
- [ ] Action item 1
- [ ] Action item 2
```

---

## Field Definitions

### Auto-Populated Fields

| Field | Source | Behavior |
|-------|--------|----------|
| `type` | Path pattern detection | Auto-detected from file location |
| `title` | H1 heading | Extracted from first `#` heading |
| `status` | Default: `draft` | User can override |
| `priority` | Default: `P2` | User can override |
| `owner` | Current user | From session context |
| `last_updated` | Current date | Always set to today's date |
| `related_docs` | Link extraction | Suggested from document links |

### Manual Input Required

| Field | Requirement |
|-------|-------------|
| `kb_summary` | **Required** - User must provide a one-line summary |

---

## Type Detection from Path

| Path Pattern | Detected Type |
|--------------|---------------|
| `PRODUCTS/*/Product-Vision.md` | `product-vision` |
| `PRODUCTS/*/Product-Requirements-Document.md` | `product-prd` |
| `PRODUCTS/*/prd-epics/*.md` | `prd-epic` |
| `PRODUCTS/*/stories/*.md` | `story` |
| `PRODUCTS/*/design/*.md` | `design-system` |
| `PROJECTS/**/PROJECT.md` | `project` |
| `PROJECTS/**/epics/*.md` | `epic` |
| `PROJECTS/**/stories/*.md` | `story` |
| `COMPANY/*.md` | `company` |
| `FRAMEWORKS/*.md` | `framework` |
| `CLIENTS/CLIENT-*/*.md` | `client` |
| `CLIENTS/Offerings/**/*.md` | `service` |
| `**/PROGRESS.md` | `progress` |

---

## Behavior

### On Document Create

```
1. Detect document type from file path
2. Extract title from first H1 heading
3. Generate YAML frontmatter:
   - type: [detected type]
   - title: [extracted title]
   - status: draft
   - priority: P2
   - owner: [current user]
   - last_updated: [today's date]
   - kb_summary: [PROMPT USER]
   - related_docs: []
4. Add standardized footer section
5. Prompt user for kb_summary if not provided
```

### On Document Modify

```
1. Update last_updated to current date
2. Validate existing frontmatter fields
3. Check if kb_summary needs updating (content changed significantly)
4. Warn if status may need update:
   - "done" status but new content added → suggest "in-progress"
   - "draft" status but marked as complete → suggest "review"
5. Verify footer section still present
```

---

## kb_summary Requirements

The `kb_summary` field is critical for Knowledge Base display:

| Requirement | Value |
|-------------|-------|
| **Max Length** | 100 characters |
| **Purpose** | One-line description shown in KB lists/cards |
| **Format** | Plain text, no markdown |
| **Required** | Yes - document is incomplete without it |

### Examples

```yaml
# Good kb_summary values
kb_summary: "AI-powered health coaching platform for fitness, nutrition, and wellbeing"
kb_summary: "Epic: User onboarding and health assessment flow"
kb_summary: "Color system documentation for yHealth design system"
kb_summary: "Client engagement documentation for Mascon Industries"

# Bad kb_summary values
kb_summary: "Document"                    # Too vague
kb_summary: "This is a very long description that exceeds the maximum character limit..."  # Too long
kb_summary: "**Bold text** with *formatting*"  # Contains markdown
```

---

## Integration Workflow

```
User creates/edits document
         │
         ▼
    DOC-03 runs
         │
    ┌────┴────┐
    │         │
  Create    Modify
    │         │
    ▼         ▼
 Add full   Update
 metadata   last_updated
    │         │
    ▼         ▼
 Prompt for  Validate
 kb_summary  completeness
    │         │
    └────┬────┘
         │
         ▼
 Document saved with
 valid KB metadata
```

---

## Example Transformation

### Before (no metadata)

```markdown
# yBusiness Platform Vision

A platform for small business management...

## Overview

yBusiness helps small businesses...
```

### After DOC-03

```markdown
---
type: product-vision
title: yBusiness Platform Vision
status: draft
priority: P2
owner: hamza-muqeem
last_updated: 2025-12-18
kb_summary: "AI-powered platform for small business operations and management"
related_docs: []
---

# yBusiness Platform Vision

A platform for small business management...

## Overview

yBusiness helps small businesses...

---

## Document Info

| Field | Value |
|-------|-------|
| Status | draft |
| Owner | hamza-muqeem |
| Last Updated | 2025-12-18 |

### Related Documents
- None yet

### Next Steps
- [ ] Complete vision document sections
- [ ] Review with stakeholders
```

---

## Validation Checklist

### Frontmatter Validation
- [ ] YAML frontmatter present (between `---` delimiters)
- [ ] `type` field present and valid
- [ ] `title` field matches H1 heading
- [ ] `status` field is valid enum value
- [ ] `priority` field is valid enum value (P0-P3)
- [ ] `owner` field present
- [ ] `last_updated` field is valid date (YYYY-MM-DD)
- [ ] `kb_summary` field present and ≤100 chars

### Footer Validation
- [ ] "Document Info" section present
- [ ] Status/Owner/Last Updated table present
- [ ] "Related Documents" section present
- [ ] "Next Steps" section present

### Consistency Validation
- [ ] Frontmatter status matches footer status
- [ ] Frontmatter date matches footer date
- [ ] H1 title matches frontmatter title

---

## Integration with Other Skills

### With DOC-01 (Documentation Validator)
- DOC-03 ensures metadata structure
- DOC-01 validates naming conventions and content

### With DOC-02 (Document Finalizer)
- DOC-03 maintains metadata during editing
- DOC-02 finalizes for permanent storage

### With EXPERT-25 (Project Scaffolder)
- EXPERT-25 creates folder structure
- DOC-03 adds metadata to generated files

---

## Anti-Patterns

❌ **Don't** create documents without frontmatter
❌ **Don't** leave kb_summary empty or generic
❌ **Don't** skip the footer section
❌ **Don't** use markdown formatting in kb_summary
❌ **Don't** exceed 100 characters in kb_summary
❌ **Don't** forget to update last_updated on changes

---

## Best Practices

✅ **Do** always provide a meaningful kb_summary
✅ **Do** keep frontmatter and footer in sync
✅ **Do** update last_updated on every change
✅ **Do** populate related_docs when applicable
✅ **Do** include actionable Next Steps
✅ **Do** use proper status workflow (draft → review → approved)

---

## Success Criteria

✅ All documents have valid YAML frontmatter
✅ All documents have kb_summary field
✅ All documents have standardized footer
✅ KB can read and display document metadata
✅ Last updated dates are accurate
✅ Status reflects actual document state

---

*Skill DOC-03 v1.0 | Xyric Solutions | 2025-12-18*
