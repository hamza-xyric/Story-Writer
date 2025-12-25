# DOC-01: Documentation Validator

**Skill ID**: DOC-01
**Category**: Documentation
**Priority**: 🔴 Critical
**Version**: 1.0
**Last Updated**: 2025-11-30

---

## Purpose

Enforces Xyric Solutions documentation standards including naming conventions, directory structure, required sections, and cross-reference integrity across all 6 initiatives.

---

## When to Activate

**Triggers**:
- "Validate this document"
- "Check documentation standards"
- "Is this file named correctly?"
- Creating new documentation
- Before finalizing any document
- During documentation audits

---

## Naming Convention Standards

### File Naming Format

```
YYYY-MM-DD_Document-Name_vX.Y.md
│        │ │             │ │  └─ Extension
│        │ │             │ └──── Version (Major.Minor)
│        │ │             └────── Underscore separator
│        │ └──────────────────── Document name (hyphens, no spaces)
│        └────────────────────── Underscore separator
└─────────────────────────────── Date (ISO 8601)
```

### Valid Examples
```
✅ 2025-11-30_yHealth-Business-Plan_v1.0.md
✅ 2025-10-25_FIN-Model-B-Financials_v2.1.md
✅ 2025-11-15_DRAI-Technical-Specification_v1.0.md
✅ 2025-09-01_MKT-Brand-Guidelines_v1.2.md
```

### Invalid Examples
```
❌ Business Plan.md (missing date, version, has space)
❌ 2025-11-30-Business-Plan.md (hyphens not underscores)
❌ yhealth_business_plan.md (lowercase, no date, no version)
❌ 2025-11-30_Business Plan_v1.md (space in name)
```

### Special Files (No Date Required)
```
- README.md
- CLAUDE.md
- 00-MASTER-DOCUMENTATION-INDEX.md
- 00-CURRENT-STATE-ASSESSMENT.md
- TEMPLATE-*.md files
```

---

## Department & Product Codes

### Department Codes
| Code | Department |
|------|------------|
| `HR-` | Human Resources |
| `FIN-` | Finance & Accounting |
| `TECH-` | Technical Infrastructure |
| `OPS-` | Operations |
| `MKT-` | Marketing |
| `LEG-` | Legal & Compliance |

### Product Codes
| Code | Product |
|------|---------|
| `CONS-` | Client Consultancy |
| `DRAI-` | DR AI Healthcare |
| `YH-` | yHealth Platform |
| `YB-` | yBusiness Platform |
| `EVAI-` | EverythingAI |
| `TDW-` | Trading Data Warehouse |

---

## Status Indicators

Every document must include a status indicator in the header:

| Status | Meaning | Use When |
|--------|---------|----------|
| `[DRAFT]` | Work in progress | Active editing |
| `[REVIEW]` | Ready for feedback | Pending review |
| `[APPROVED]` | Finalized | Ready for use |
| `[ARCHIVED]` | Historical reference | No longer active |

### Header Format
```markdown
# Document Title
**Status**: [DRAFT]
**Version**: v1.0
**Date**: 2025-11-30
**Owner**: [Name]
```

---

## Version Control

### When to Increment

| Change Type | Version Change | Example |
|-------------|----------------|---------|
| Major restructure, pivot | v1.0 → v2.0 | Complete rewrite |
| New section, significant update | v1.0 → v1.1 | Added market analysis |
| Typo, formatting, small fix | v1.1 → v1.1.1 | Fixed spelling |

---

## Directory Structure

### Required Top-Level Directories
```
xyric-solutions/
├── 00-EXECUTIVE/          # Strategic decisions, dashboards
├── 01-OPERATIONS/         # HR, Finance, Legal, Infrastructure
├── 02-MARKETING/          # Brand, Content, Campaigns
├── 03-CONSULTANCY/        # Client consultancy work
├── 04-PRODUCTS/           # Product-specific docs
│   ├── dr-ai-healthcare/
│   ├── yhealth-platform/
│   ├── ybusiness-platform/
│   ├── everythingai/
│   └── trading-data-warehouse/
├── 05-PLANNING/           # Roadmaps, OKRs
├── 06-GOVERNANCE-RISK/    # Compliance, risk management
├── 07-KNOWLEDGE-BASE/     # Templates, standards
└── 08-ARCHIVE/            # Historical documents
```

### Product Subdirectories
Each product should have:
```
product-name/
├── business-plan/
├── technical-docs/
├── market-analysis/
├── compliance/
└── metrics/
```

---

## Required Sections by Document Type

### Business Plan
```
Required:
1. Executive Summary
2. Problem Statement
3. Solution Overview
4. Market Analysis
5. Competitive Landscape
6. Business Model
7. Go-to-Market Strategy
8. Financial Projections [HUMAN INPUT REQUIRED]
9. Roadmap [HUMAN INPUT REQUIRED]
10. Team & Resources
11. Risk Analysis
12. Success Metrics
```

### Technical Documentation
```
Required:
1. Overview
2. Architecture
3. System Components
4. API Specifications
5. Security Considerations
6. Deployment Guide
```

### Market Analysis
```
Required:
1. Executive Summary
2. Market Size & Growth
3. Target Segments
4. Competitive Analysis
5. Trends & Drivers
6. Recommendations
7. Citations
```

---

## Validation Checklist

### Filename Validation
- [ ] Starts with YYYY-MM-DD
- [ ] Uses underscores as separators
- [ ] No spaces in filename
- [ ] Version suffix present (vX.Y)
- [ ] Appropriate extension

### Structure Validation
- [ ] File in correct directory
- [ ] Product code used (if product-specific)
- [ ] Department code used (if cross-functional)

### Content Validation
- [ ] Status indicator present
- [ ] Required sections included
- [ ] No placeholder text without context
- [ ] Cross-references valid
- [ ] Version number current

---

## Validation Report Format

```markdown
# Validation Report: [filename]

**Status**: ✅ VALID | ❌ INVALID
**Checked**: [Date/Time]

## Errors (Must Fix)
1. ❌ [Error description]
2. ❌ [Error description]

## Warnings (Should Fix)
1. ⚠️ [Warning description]
2. ⚠️ [Warning description]

## Suggestions
1. 💡 [Suggestion]

## Summary
- Filename: ✅/❌
- Structure: ✅/❌
- Content: ✅/❌
- Cross-refs: ✅/❌
```

---

## Integration with Other Skills

### With DOC-02 (Cross-Reference Manager)
- Validates cross-references exist
- Checks reference targets

### With DOC-03 (PDF Finalizer)
- Must pass validation before PDF export
- Ensures no [DRAFT] tags in final

### With CORE-01 (Placeholder Guardian)
- Validates no invented estimates
- Ensures placeholders are appropriate

---

## Anti-Patterns

❌ **Don't** create files without dates
❌ **Don't** use spaces in filenames
❌ **Don't** skip version numbers
❌ **Don't** ignore status indicators
❌ **Don't** put files in wrong directories
❌ **Don't** skip validation before sharing

---

## Best Practices

✅ **Do** validate before committing
✅ **Do** increment versions on changes
✅ **Do** use appropriate codes
✅ **Do** keep status indicators current
✅ **Do** maintain cross-references
✅ **Do** archive outdated documents

---

## Success Criteria

✅ All files follow naming convention
✅ All files in correct directories
✅ All documents have required sections
✅ All cross-references resolve
✅ All status indicators current
✅ No orphaned files

---

*Skill DOC-01 v1.0 | Xyric Solutions | 2025-11-30*









