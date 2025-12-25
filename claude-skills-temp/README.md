# Xyric Solutions - Claude Skills Library

**Version**: 2.3
**Last Updated**: 2025-12-22
**Total Skills**: 61 active across 14 categories

---

## Overview

This directory contains Xyric Solutions' comprehensive library of Claude Skills - reusable workflows that make Claude better at specialized tasks. Each skill is a documented expert knowledge package that Claude can load when needed.

## Quick Start

1. **Browse Skills**: Check `00-CLAUDE-SKILLS-MASTER-INDEX.md` for the complete inventory
2. **Use a Skill**: Tell Claude "Use the [skill name] skill" or describe your task
3. **Find by Category**: Navigate to the relevant category folder

## Directory Structure

```
claude-skills/
├── 00-CLAUDE-SKILLS-MASTER-INDEX.md   # Complete skill inventory (v2.2)
├── README.md                           # This file
│
├── 00-core/                           # Infrastructure skills (5)
│   ├── CORE-01-placeholder-guardian.md
│   ├── CORE-02-research-first-workflow.md
│   ├── CORE-03-skill-creator/
│   ├── CORE-04-agent-skills-spec/
│   └── CORE-05-skill-template/
│
├── 01-documentation/                  # Document management (2)
│   ├── DOC-01-documentation-validator.md
│   └── DOC-02-document-finalizer.md
│
├── 02-marketing/                      # Marketing & brand (3)
│   ├── MKT-01-campaign-planner.md
│   ├── MKT-02-brand-voice-guardian.md
│   └── MKT-03-brand-guidelines/
│
├── 03-content-creation/               # Content generation (2)
│   ├── CONTENT-01-social-linkedin.md
│   └── CONTENT-02-social-twitter.md
│
├── 04-email-communications/           # Email & comms (5)
│   ├── EMAIL-01-client-communication.md
│   ├── IC-01-internal-communications.md
│   ├── EMAIL-03-internal-progress-report.md
│   ├── COMMS-01-doc-coauthoring/
│   └── COMMS-02-slack-gif-creator/
│
├── 05-development/                    # Engineering skills (6)
│   ├── DEV-01-code-review-assistant.md
│   ├── DEV-02-test-generator.md
│   ├── DEV-03-debugger-assistant.md
│   ├── DEV-04-web-artifacts-builder/
│   ├── DEV-05-webapp-testing/
│   └── DEV-06-mcp-builder/
│
├── 06-research-analysis/              # Research skills (1)
│   └── RESEARCH-01-competitive-analysis.md
│
├── 07-financial/                      # Financial skills (planned)
│   └── [Pending implementation]
│
├── 08-operations/                     # Ops skills (1)
│   └── OPS-01-meeting-notes-processor.md
│
├── 09-client-services/                # Consultancy skills (1)
│   └── CLIENT-01-proposal-generator.md
│
├── 10-expert-agents/                  # Elite specialists (17)
│   ├── 00-EXPERT-AGENTS-INDEX.md
│   ├── SKILL-PIPELINE-PROGRESS.md
│   ├── EXPERT-01-senior-frontend.md
│   ├── EXPERT-02-senior-backend.md
│   ├── EXPERT-03-software-architect.md
│   ├── EXPERT-04-qa-test-engineer.md
│   ├── EXPERT-05-fullstack-engineer.md
│   ├── EXPERT-10-product-manager.md
│   ├── EXPERT-11-ux-ui-designer.md
│   ├── EXPERT-12-technical-writer.md
│   ├── EXPERT-13-story-generator.md
│   ├── EXPERT-14-story-spec-generator.md
│   ├── EXPERT-15-task-generator.md
│   ├── EXPERT-16-task-spec-generator.md
│   ├── EXPERT-20-vision-generator.md     (v2.1)
│   ├── EXPERT-21-prd-generator.md
│   ├── EXPERT-22-epic-generator.md
│   ├── EXPERT-23-epic-prd-generator.md
│   └── EXPERT-26-brainstormer.md         (v1.0 - NEW)
│
├── 11-bi-data-analytics/              # BI & Data Analytics (2)
│   ├── 00-BI-SKILLS-INDEX.md
│   ├── BI-01-dashboard-philosophy.md
│   └── BI-02-question-hypothesis-framework.md
│
├── 12-document-operations/            # File manipulation (4)
│   ├── 00-DOC-OPS-INDEX.md
│   ├── DOC-OPS-01-pdf/
│   ├── DOC-OPS-02-docx/
│   ├── DOC-OPS-03-pptx/
│   └── DOC-OPS-04-xlsx/
│
└── 13-design-creative/                # Visual design (4)
    ├── 00-DESIGN-INDEX.md
    ├── DESIGN-01-canvas-design/
    ├── DESIGN-02-theme-factory/
    ├── DESIGN-03-algorithmic-art/
    └── DESIGN-04-frontend-design/
```

## Skill Categories

| Category | Folder | Skills | Priority |
|----------|--------|--------|----------|
| **Core Infrastructure** | `00-core/` | 5 | Critical |
| **Documentation** | `01-documentation/` | 2 | Critical |
| **Marketing** | `02-marketing/` | 3 | High |
| **Content Creation** | `03-content-creation/` | 2 | High |
| **Email Communications** | `04-email-communications/` | 5 | High |
| **Development** | `05-development/` | 6 | Critical |
| **Research & Analysis** | `06-research-analysis/` | 1 | Medium |
| **Financial** | `07-financial/` | 0 | High (planned) |
| **Operations** | `08-operations/` | 1 | Medium |
| **Client Services** | `09-client-services/` | 1 | High |
| **Expert Agents** | `10-expert-agents/` | 17 | Critical |
| **BI & Data Analytics** | `11-bi-data-analytics/` | 2 | Critical |
| **Document Operations** | `12-document-operations/` | 4 | Utility |
| **Design & Creative** | `13-design-creative/` | 4 | Utility |

## How to Use Skills

### Method 1: Direct Invocation
```
"Use the placeholder guardian skill - I need a roadmap for yHealth"
"Apply the code review skill to this PR"
"Act as the Senior Frontend Engineer expert to build this component"
```

### Method 2: Task Description
```
"Create a LinkedIn post about our product launch"
→ Claude automatically uses CONTENT-01 patterns

"Debug this error I'm getting"
→ Claude automatically uses DEV-03 patterns
```

### Method 3: Expert Agent Invocation
```
"Use the Software Architect expert to design this system"
"Act as the QA Test Engineer to create test cases"
"Use the Story Generator to break down this epic"
```

## Key Skills to Know

### Most Important (Start Here)
1. **CORE-01: Placeholder Guardian** - Prevents Claude from inventing estimates
2. **CORE-02: Research-First Workflow** - Ensures evidence-based recommendations
3. **DOC-01: Documentation Validator** - Enforces naming/structure standards
4. **DEV-01: Code Review Assistant** - Systematic code reviews

### Expert Agents Pipeline
The Expert Agents (10-expert-agents/) provide a complete software development pipeline:

```
IDEA → Brainstorm (26) → Vision (20) → PRD (21) → Epics (22) → Epic PRDs (23) → Stories (13) → Specs (14) → Tasks (15) → Guides (16) → CODE
```

### Most Frequently Used
- **CONTENT-01/02**: Social media content
- **EMAIL-01**: Client communications
- **DEV-02/03**: Testing and debugging
- **EXPERT-01-05**: Engineering specialists

## The Xyric Way

All v2.0 skills embed these principles:

**Engineering**:
- Research-First Development
- TDD Required (80%+ coverage)
- All PRs Need Approval
- Foundation + Build (90% proven tools, 10% custom)

**Client-Facing**:
- Partner, Not Vendor positioning
- Pain-Point First (client's problem is the hero)
- Insightful + Practical + Confident voice

## Skill Versions

- **v2.0**: Xyric-customized with brand voice and methodology
- **v1.0**: Works as-is (utility skills)
- **Planned**: Not yet implemented

## Related Resources

- `00-CLAUDE-SKILLS-MASTER-INDEX.md` - Complete skill inventory with details
- `10-expert-agents/00-EXPERT-AGENTS-INDEX.md` - Expert agents reference
- `CLAUDE.md` (root) - Main project configuration

---

*Claude Skills Library v2.3 | Updated 2025-12-22 | Xyric Solutions*
