# Xyric Solutions - Claude Skills Master Index

**Version**: 3.3
**Created**: 2025-11-30
**Last Updated**: 2025-12-25
**Purpose**: Comprehensive library of Claude skills for Xyric Solutions workflows
**Total Skills**: 64 active across 14 categories (31 v2.0+ customized, 33 utility/done, 40+ planned)

> **v3.3 Update**: Added Progress Reporting System with OPS-02 (Daily Report Generator) and OPS-03 (Weekly PPP Generator). Generate on-demand progress reports with dual output: terminal plain text + visual HTML dashboard. Commands: `/daily-report`, `/eod`, `/weekly-ppp`, `/ppp`. See `FRAMEWORKS/Progress-Reporting-System.md`.

> **v3.2 Update**: Added DEV-07 Commit Message Generator skill with `/commit` slash command. Generates structured commit messages following conventional commits format. Integrates with GitHub-Slack notification workflow for team visibility.

> **v3.1 Update**: Added EXPERT-26 Brainstormer skill for pre-vision idea exploration. Updated EXPERT-20 Vision Generator to v2.1 with two entry modes (With Brainstorm / Without). Added brainstorm-template.md to FRAMEWORKS/templates/. Pipeline now: IDEA → Brainstorm (26) → Vision (20) → PRD (21) → ...

> **v3.0 Update**: Added DOC-OPS-07 YouTube Key Points Extractor skill for extracting structured key points from video analyses. Enables downstream workflows: social media snippets (CONTENT-01/02), EverythingAI database import, and PDF key moments (DOC-OPS-01). Also added 5 new video analysis templates: comparison, interview, explainer, news, case-study.

> **v2.9 Update**: Added RESEARCH-02 GitHub Repository Research skill for researching open-source repositories. Uses STARS-D framework (Stack, Timeliness, Architecture, Reach, Scope, Documentation) to evaluate repos. Includes `/github-research` slash command. Outputs to `NOTES/` folder.

> **v2.8 Update**: Added DOC-OPS-06 YouTube Summariser skill for transforming video transcripts into structured analysis documents. Supports 8 video types (tutorial, review, trading analysis, etc.) with EverythingAI integration for review aggregation. Includes new `CONTENT/` folder structure for video analyses.

> **v2.7 Update**: Added CORE-06 Prompt Crafter skill for interactive prompt refinement. Transforms brainstorming ideas into well-structured prompts using the 5-question extraction method.

> **v2.5 Update**: Added DOC-OPS-05 YouTube Transcript skill for downloading video transcripts using yt-dlp.

> **v2.4 Update**: Added centralized Templates & Context system. Generic templates in `FRAMEWORKS/templates/`, product-specific context in `PRODUCTS/{product}/context/`. Pipeline skills (EXPERT-20/21/22/13) now reference external templates.

---

## Table of Contents

1. [Overview](#overview)
2. [The Xyric Way](#the-xyric-way)
3. [Templates & Context System](#templates--context-system)
4. [Skill Categories](#skill-categories)
5. [Quick Reference Matrix](#quick-reference-matrix)
6. [Skill Inventory](#skill-inventory)
7. [Directory Structure](#directory-structure)

---

## Overview

### What Are Claude Skills?

Claude Skills are reusable workflows that make Claude better at specialized tasks. Think of them as expert knowledge packages that Claude can load when needed. Each skill defines:

- **When to activate** (triggers)
- **What to do** (workflow steps)
- **What to avoid** (anti-patterns)
- **Success criteria** (validation)

### Xyric Solutions Context

As a company with **1 consultancy + 5 products**, we need skills that:
- Scale across multiple initiatives
- Maintain consistency in documentation
- Accelerate content creation
- Enforce quality standards
- Support development workflows

---

## The Xyric Way

Our methodology differentiates Xyric from generic AI-developed companies. These principles are embedded across all v2.0 skills.

### Engineering Principles

| Principle | What It Means |
|-----------|---------------|
| **Research-First Development** | Discover → Evaluate → Document before building. Never start coding without understanding the problem space. |
| **TDD Required / No-Debt** | Tests before code, 80%+ coverage threshold, do it right the first time. No shortcuts. |
| **Foundation + Build** | Use proven external tools 90%, customize 10% on top. Don't reinvent the wheel. |
| **AI-Native with Quality Gates** | AI generates, humans validate. Never ship unreviewed AI output. |

### Client-Facing Philosophy

| Principle | Application |
|-----------|-------------|
| **Partner, Not Vendor** | "We're your team" - embedded partner positioning. We work alongside clients, not for them. |
| **Pain-Point First** | Client's problem is the hero, Xyric is the guide. We talk about YOUR business, not our services. |
| **Insightful + Practical + Confident** | Our 3-word brand voice. Technical expertise with approachable delivery. |

### Additional Principles

- **All PRs Need Approval** - No solo shipping. Every change gets reviewed.
- **Modular Monolith First** - Default architecture pattern. Extract services only when proven necessary.
- **Methodology Over Specs** - Our approach matters more than specific tools. Best fit per case.
- **Symbiotic Model** - Consultancy informs products, products enhance consultancy. Dual reinforcement loop.

---

## Templates & Context System

Pipeline skills (Vision → PRD → Epic → Stories) use a two-tier architecture for document generation:

### Generic Templates

Location: `FRAMEWORKS/templates/`

| Template | Used By | Purpose |
|----------|---------|---------|
| `brainstorm-template.md` | EXPERT-26 | Pre-vision idea exploration (9 sections) |
| `vision-document-template.md` | EXPERT-20 | Vision document structure (10 sections) |
| `prd-template.md` | EXPERT-21 | PRD structure (16 sections) |
| `epic-prd-template.md` | EXPERT-22 | Epic PRD structure (10 sections) |
| `user-story-template.md` | EXPERT-13 | User story structure (11 sections per story) |

### Product Context

Location: `PRODUCTS/{product}/context/`

| File | Content |
|------|---------|
| `product-identity.md` | Mission, vision, positioning |
| `personas.md` | User personas with behaviors |
| `pillars.md` | Product pillars/domains |
| `design-decisions.md` | Key design choices |
| `constraints.md` | Technical/business constraints |
| `terminology.md` | Product vocabulary |

### How Skills Use Templates & Context

```
┌─────────────────────────────────────────────────────────────┐
│                      SKILL EXECUTION                         │
├─────────────────────────────────────────────────────────────┤
│  1. Load GENERIC TEMPLATE from FRAMEWORKS/templates/         │
│  2. Load PRODUCT CONTEXT from PRODUCTS/{product}/context/    │
│  3. Apply context to template                                │
│  4. Generate product-specific document                       │
└─────────────────────────────────────────────────────────────┘
```

**Benefits:**
- **Reduced context usage** - Skills reference focused files instead of scanning large documents
- **Consistency** - All documents follow same structure patterns
- **Reusability** - Templates work across any product
- **Maintainability** - Update template once, all skills benefit

**Current Context Available:**
- yHealth Platform: `PRODUCTS/yhealth-platform/context/` (7 files)

---

## Skill Categories

| Category | Folder | v2.0 | Done | Planned | Priority |
|----------|--------|------|------|---------|----------|
| **Core Infrastructure** | `00-core/` | 1 | 5 | 2 | 🔴 Critical |
| **Documentation** | `01-documentation/` | 0 | 3 | 4 | 🔴 Critical |
| **Marketing** | `02-marketing/` | 3 | 0 | 3 | 🟡 High |
| **Content Creation** | `03-content-creation/` | 2 | 0 | 5 | 🟡 High |
| **Email Communications** | `04-email-communications/` | 3 | 2 | 2 | 🟡 High |
| **Development** | `05-development/` | 0 | 7 | 5 | 🔴 Critical |
| **Research & Analysis** | `06-research-analysis/` | 0 | 2 | 3 | 🟢 Medium |
| **Financial** | `07-financial/` | 0 | 0 | 3 | 🟡 High |
| **Operations** | `08-operations/` | 0 | 1 | 3 | 🟢 Medium |
| **Client Services** | `09-client-services/` | 1 | 0 | 3 | 🟡 High |
| **Expert Agents** | `10-expert-agents/` | 18 | 0 | 4 | 🔴 Critical |
| **BI & Data Analytics** | `11-bi-data-analytics/` | 0 | 2 | 7 | 🔴 Critical |
| **Document Operations** | `12-document-operations/` | 0 | 7 | 0 | ⚪ Utility |
| **Design & Creative** | `13-design-creative/` | 0 | 4 | 0 | ⚪ Utility |

**Status Legend**: v2.0 = Xyric-customized | Done = Works as-is | Planned = Not yet implemented

---

## Quick Reference Matrix

### By Use Case

| I want to... | Use Skill | Version | Category |
|--------------|-----------|---------|----------|
| Refine a rough idea into a prompt | `CORE-06-prompt-crafter` | v1.0 | Core Infrastructure |
| Challenge my assumptions | `CORE-03-assumption-challenge` | v1.0 | Core Infrastructure |
| Write a LinkedIn post | `CONTENT-01-social-linkedin` | v2.0 | Content Creation |
| Write a Twitter/X post | `CONTENT-02-social-twitter` | v2.0 | Content Creation |
| Create a technical document | `DOC-01-documentation-validator` | v1.0 | Documentation |
| Finalize docs for Knowledge Base | `DOC-02-document-finalizer` | v1.0 | Documentation |
| Add/update KB metadata on docs | `DOC-03-document-metadata-enforcer` | v1.0 | Documentation |
| Generate business questions & hypotheses | `BI-02-question-hypothesis-framework` | v1.0 | BI & Data Analytics |
| Design a BI dashboard | `BI-01-dashboard-philosophy` | v1.0 | BI & Data Analytics |
| Debug code | `DEV-03-debugger-assistant` | v2.1 | Development |
| Write a client email | `EMAIL-01-client-communication` | v2.0 | Email |
| Write internal team updates | `IC-01-internal-communications` | v1.0 | Email |
| Write internal progress reports | `EMAIL-03-internal-progress-report` | v2.0 | Email |
| Create a marketing campaign | `MKT-01-campaign-planner` | v2.0 | Marketing |
| Apply Xyric brand voice | `MKT-02-brand-voice-guardian` | v2.0 | Marketing |
| Apply Xyric brand colors/fonts | `MKT-03-brand-guidelines` | v2.0 | Marketing |
| Review a PR | `DEV-01-code-review-assistant` | v2.1 | Development |
| Generate test cases | `DEV-02-test-generator` | v2.1 | Development |
| Generate commit messages | `DEV-07-commit-message-generator` | v1.0 | Development |
| Create client proposal | `CLIENT-01-proposal-generator` | v2.0 | Client Services |
| Research competitors | `RESEARCH-01-competitive-analysis` | v2.1 | Research |
| Research GitHub repos for app ideas | `RESEARCH-02-github-repository-research` | v1.0 | Research |
| Build React/Next.js frontend | `EXPERT-01-senior-frontend` | v2.1 | Expert Agents |
| Design backend APIs | `EXPERT-02-senior-backend` | v2.0 | Expert Agents |
| Create system architecture | `EXPERT-03-software-architect` | v2.0 | Expert Agents |
| Write comprehensive tests | `EXPERT-04-qa-test-engineer` | v2.1 | Expert Agents |
| Build end-to-end features | `EXPERT-05-fullstack-engineer` | v2.0 | Expert Agents |
| Manage product strategy | `EXPERT-10-product-manager` | v2.0 | Expert Agents |
| Design UX/UI | `EXPERT-11-ux-ui-designer` | v2.0 | Expert Agents |
| Write technical documentation | `EXPERT-12-technical-writer` | v2.1 | Expert Agents |
| Break down Epics into Stories | `EXPERT-13-story-generator` | v2.0 | Expert Agents |
| Create technical specs from Stories | `EXPERT-14-story-spec-generator` | v2.0 | Expert Agents |
| Generate tasks from tech specs | `EXPERT-15-task-generator` | v2.0 | Expert Agents |
| Create implementation guides | `EXPERT-16-task-spec-generator` | v2.0 | Expert Agents |
| Explore product ideas (pre-vision) | `EXPERT-26-brainstormer` | v1.0 | Expert Agents |
| Transform ideas into Vision docs | `EXPERT-20-vision-generator` | v2.1 | Expert Agents |
| Create scope-focused roadmaps | `EXPERT-24-roadmap-generator` | v2.0 | Expert Agents |
| Transform Vision into PRDs | `EXPERT-21-prd-generator` | v2.0 | Expert Agents |
| Break PRDs into Epic outlines | `EXPERT-22-epic-generator` | v2.0 | Expert Agents |
| Create detailed Epic PRDs | `EXPERT-23-epic-prd-generator` | v2.0 | Expert Agents |
| Download YouTube transcript | `DOC-OPS-05-youtube-transcript` | v1.0 | Document Operations |
| Analyze YouTube video | `DOC-OPS-06-youtube-summariser` | v1.0 | Document Operations |
| Extract key points from video | `DOC-OPS-07-youtube-key-points` | v1.0 | Document Operations |
| Generate daily progress report | `OPS-02-daily-report-generator` | v1.0 | Operations |
| Generate weekly PPP report | `OPS-03-weekly-ppp-generator` | v1.0 | Operations |

### By Frequency of Use

| Daily | Weekly | As Needed |
|-------|--------|-----------|
| Placeholder Guardian (CORE-01) | Dashboard Philosophy (BI-01) | Competitive Analysis (RESEARCH-01) |
| Dev Debugger (DEV-03) | Question Framework (BI-02) | Meeting Notes (OPS-01) |
| Client Email (EMAIL-01) | Documentation Validator (DOC-01) | Progress Reports (EMAIL-03) |
| Code Review (DEV-01) | Brand Voice Guardian (MKT-02) | Proposal Generator (CLIENT-01) |
| LinkedIn Content (CONTENT-01) | Campaign Planner (MKT-01) | Document Finalizer (DOC-02) |
| Expert Engineers (EXPERT-01-05) | Product Manager (EXPERT-10) | - |

---

## Skill Inventory

### 00-CORE: Infrastructure Skills

> **The Xyric Way**: Never invent. Always validate. Research before acting.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| CORE-01 | Placeholder Guardian | v1.0 | ✅ Done | Never invent times/revenues/costs |
| CORE-02 | Research-First Workflow | **v2.1** | ✅ Refined | Auto-search before strategic tasks |
| CORE-03 | Assumption Challenge Framework | **v1.0** | ✅ New | 3-phase challenge: Question → Alternatives → Stress-test |
| CORE-04 | Skill Creator | v1.0 | ✅ Done | Framework for creating new Claude skills |
| CORE-05 | Agent Skills Spec | v1.0 | ✅ Done | Official Claude skills specification reference |
| CORE-06 | Prompt Crafter | **v1.0** | ✅ New | Interactive prompt refinement from brainstorming to structured prompts |
| CORE-07 | Skill Template | v1.0 | ✅ Done | Base template for new skills |
| CORE-08 | Memory Bank Manager | - | 📋 Planned | Persist context across sessions |
| CORE-09 | Quality Gate Enforcer | - | 📋 Planned | Validate all outputs before delivery |

### 01-DOCUMENTATION: Document Management Skills

> **The Xyric Way**: Documentation-First. AI-Ready Standards. Consistent structure across all initiatives.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| DOC-01 | Documentation Validator | v1.0 | ✅ Done | Enforce naming/structure standards for WIP docs |
| DOC-02 | Document Finalizer | v1.0 | ✅ Done | Standardize docs for Knowledge Base |
| DOC-03 | Document Metadata Enforcer | v1.0 | ✅ Done | Auto-add/update KB-readable metadata on documents |
| DOC-04 | Cross-Reference Manager | - | 📋 Planned | Track document dependencies |
| DOC-05 | PDF Finalizer | - | 📋 Planned | Export polished shareable PDFs |
| DOC-06 | Template Generator | - | 📋 Planned | Create new docs from templates |
| DOC-07 | Version Controller | - | 📋 Planned | Manage document versions |

### 02-MARKETING: Marketing & Brand Skills

> **The Xyric Way**: Pain-Point First marketing. We talk about YOUR business, not our services. Voice: Insightful + Practical + Confident.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| MKT-01 | Campaign Planner | **v2.0** | ✅ Customized | Pain-Point Framework: Speed/Accuracy/Scale/Foundation/Growth |
| MKT-02 | Brand Voice Guardian | **v2.0** | ✅ Customized | Insightful + Practical + Confident. Advisor Mode. Partnership Voice. |
| MKT-03 | Brand Guidelines | **v2.0** | ✅ Customized | Xyric colors (Deep Navy, Steel Blue, Periwinkle), typography, logo usage |
| MKT-04 | Analytics Reporter | - | 📋 Planned | Generate marketing performance reports |
| MKT-05 | Competitor Monitor | - | 📋 Planned | Track competitor marketing activities |
| MKT-06 | Landing Page Creator | - | 📋 Planned | Generate landing page copy |

**MKT-01 v2.0 Highlights**: 5 Pain Points mapped to 16 services (internal only). LinkedIn + Content/SEO channels. 3 campaign types: Thought Leadership, Problem-Focused Lead Gen, Client Story Amplification.

**MKT-02 v2.0 Highlights**: 4-pillar brand personality (Technical Expert, Strategic Partner, Innovative Builder, Pragmatic Solver). Anti-AI-speak patterns. Partnership Voice positioning.

### 03-CONTENT-CREATION: Content Generation Skills

> **The Xyric Way**: 5 Thought Leadership Pillars. Premium positioning (never desperate). Anonymized case studies. AI-cringe blocklist enforced.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| CONTENT-01 | Social - LinkedIn | **v2.0** | ✅ Customized | Company page voice. 5 Pillars. Anonymized pattern stories. |
| CONTENT-02 | Social - Twitter/X | **v2.0** | ✅ Customized | EQUAL platform. Hot Takes Framework. Daily presence. |
| CONTENT-03 | Social - Instagram | - | 📋 Planned | Visual content captions |
| CONTENT-04 | Blog Writer | - | 📋 Planned | Long-form article creation |
| CONTENT-05 | Video Script Writer | - | 📋 Planned | Scripts for YouTube/TikTok |
| CONTENT-06 | Newsletter Composer | - | 📋 Planned | Email newsletter content |
| CONTENT-07 | Case Study Creator | - | 📋 Planned | Client success stories |

**5 Thought Leadership Pillars**:
1. The Data Gap - Why most businesses don't actually know what's happening
2. The 20-Year Problem - BI promised transformation, delivered dashboards
3. AI Hype vs Reality - Cutting through marketing noise
4. Questions Before Dashboards - The methodology most skip
5. Partner Model - Why embedded teams outperform vendors

### 04-EMAIL-COMMUNICATIONS: Email & Communications Skills

> **The Xyric Way**: "We're your team, not your vendor." Client sets the pace. Embedded partner positioning. 20+ AI-cringe phrases blocked.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| EMAIL-01 | Client Communication | **v2.0** | ✅ Customized | 10 templates. Partnership voice. Tone adaptation by relationship stage. |
| IC-01 | Internal Communications | v1.0 | ✅ New | Team updates, contractor updates, announcements. Scaled for 6-10 person team. |
| EMAIL-03 | Internal Progress Report | **v2.0** | ✅ Customized | Founder self-accountability. Moonshot-first hierarchy. Symbiotic Learning. |
| COMMS-01 | Doc Coauthoring | v1.0 | ✅ Done | Real-time document collaboration workflows |
| COMMS-02 | Slack GIF Creator | v1.0 | ✅ Done | Create animated GIFs for Slack communications |
| EMAIL-04 | Cold Outreach | - | 📋 Planned | Sales and partnership outreach |
| EMAIL-05 | Support Response | - | 📋 Planned | Customer support templates |

**EMAIL-01 v2.0 Highlights**: 3 new templates (Scope Creep, Delay, Value-Add). Partnership Voice table (Vendor vs Partner language). Difficult Situations guidance.

**EMAIL-03 v2.0 Highlights**: Renamed from "Investor Update". Moonshot hierarchy (DR AI > yHealth > Consultancy). 5-Stage Lifecycle tracking. Runway RAG assessment. Honest Reflection section.

### 05-DEVELOPMENT: Engineering Skills

> **The Xyric Way**: TDD Required. All PRs Need Approval. CLEAR framework for code reviews. Sequential thinking for debugging.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| DEV-01 | Code Review Assistant | **v2.1** | ✅ Refined | CLEAR framework (Correctness, Logic, Efficiency, Architecture, Readability) |
| DEV-02 | Test Generator | **v2.1** | ✅ Refined | TDD/integration test generation |
| DEV-03 | Debugger Assistant | **v2.1** | ✅ Refined | Systematic DEBUG framework |
| DEV-04 | Web Artifacts Builder | v1.0 | ✅ Done | React/TypeScript web artifact creation framework |
| DEV-05 | Webapp Testing | v1.0 | ✅ Done | Playwright-based web application testing |
| DEV-06 | MCP Builder | v1.0 | ✅ Done | Model Context Protocol server generation |
| DEV-07 | Commit Message Generator | v1.0 | ✅ Done | Structured commit messages with AI summaries |
| DEV-08 | API Doc Generator | - | 📋 Planned | Auto-generate API documentation |
| DEV-09 | Architecture Designer | - | 📋 Planned | System design assistance |
| DEV-10 | Refactoring Guide | - | 📋 Planned | Safe code refactoring |
| DEV-11 | Security Reviewer | - | 📋 Planned | Security vulnerability checker |
| DEV-12 | Performance Analyzer | - | 📋 Planned | Performance optimization guide |

### 06-RESEARCH-ANALYSIS: Research Skills

> **The Xyric Way**: Research-First. Multiple sources. Evidence before recommendations.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| RESEARCH-01 | Competitive Analysis | **v2.1** | ✅ Refined | 5P Framework competitive research with multiple sources |
| RESEARCH-02 | GitHub Repository Research | **v1.0** | ✅ New | STARS-D framework for researching open-source repos |
| RESEARCH-03 | Market Research | - | 📋 Planned | Industry and market analysis |
| RESEARCH-04 | Technology Scanner | - | 📋 Planned | Tech stack evaluation |
| RESEARCH-05 | User Research Synthesizer | - | 📋 Planned | Analyze user feedback |

### 07-FINANCIAL: Financial Skills

> **The Xyric Way**: Placeholder Guardian enforced. Never invent financial estimates.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| FIN-01 | Financial Propagator | - | 📋 Planned | Propagate model changes |
| FIN-02 | Budget Tracker | - | 📋 Planned | Track spending vs budget |
| FIN-03 | Invoice Generator | - | 📋 Planned | Create client invoices |

### 08-OPERATIONS: Operations Skills

> **The Xyric Way**: Clear action items. Accountability tracking. Multi-initiative awareness. Progress visibility.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| OPS-01 | Meeting Notes Processor | v1.0 | ✅ Done | Summarize meetings, extract actions |
| OPS-02 | Daily Report Generator | v1.0 | ✅ Done | EOD progress summary with dual output (text + HTML) |
| OPS-03 | Weekly PPP Generator | v1.0 | ✅ Done | Weekly Progress, Problems, Plans report |
| OPS-04 | Task Prioritizer | - | 📋 Planned | Prioritize tasks across initiatives |
| OPS-05 | Process Documenter | - | 📋 Planned | Document standard procedures |
| OPS-06 | Portfolio Manager | - | 📋 Planned | Multi-initiative orchestration |

**Progress Reporting System** (OPS-02 + OPS-03):
- **Commands**: `/daily-report`, `/eod`, `/weekly-ppp`, `/ppp`
- **Output**: Terminal plain text + HTML dashboard saved to `reports/`
- **Data**: Git commits, PROGRESS.md, NEXT-STEPS.md, team.yaml
- **Documentation**: `FRAMEWORKS/Progress-Reporting-System.md`

### 09-CLIENT-SERVICES: Consultancy Skills

> **The Xyric Way**: Client's pain is the hero, Xyric is the guide. Phased journey. Partnership model. Never list service codes in proposals.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| CLIENT-01 | Proposal Generator | **v2.0** | ✅ Customized | Client-centric proposals with phased journey |
| CLIENT-02 | Deliverable Packager | - | 📋 Planned | Package client deliverables |
| CLIENT-03 | Scope Analyzer | - | 📋 Planned | Analyze project scope |
| CLIENT-04 | Status Report Generator | - | 📋 Planned | Weekly/monthly status reports |

**CLIENT-01 v2.0 Highlights**:
- **2 Core Bundles**: Data Problems + AI Problems
- **Phased Journey**: ASSESS → FOUNDATION → VISIBILITY → AUTOMATION
- **Pricing Model**: Project phases (fixed fee) + Ongoing retainer (partnership)
- **16 Services Mapped**: Internal reference only (never shown to clients)
- **Template Structure**: Your Challenge → What's at Stake → Journey → Outcomes → Investment → Why Xyric

### 10-EXPERT-AGENTS: Elite Specialists

> **The Xyric Way**: Top 1% expertise. Research-First Development. TDD Required. All PRs Need Approval. Modular Monolith First. Foundation + Build. AI-Native with Quality Gates.

#### Engineering Domain (5 Skills)

| ID | Skill Name | Version | Status | Focus |
|----|------------|---------|--------|-------|
| EXPERT-01 | Senior Frontend Engineer | **v2.1** | ✅ Refined | React/Next.js, TypeScript, Xyric Brand Tokens, accessibility |
| EXPERT-02 | Senior Backend Engineer | **v2.0** | ✅ Customized | API design, Modular Monolith, PostgreSQL/Supabase |
| EXPERT-03 | Software Architect | **v2.0** | ✅ Customized | RESEARCH-SCALE method, ADRs, Service Extraction Criteria |
| EXPERT-04 | QA/Test Engineer | **v2.1** | ✅ Refined | TDD Required, 80%+ coverage, Shift-Left testing |
| EXPERT-05 | Full-Stack Engineer | **v2.0** | ✅ Customized | No Stack Dogma, cross-stack TDD, rapid prototyping |

#### Product & Design Domain (4 Skills)

| ID | Skill Name | Version | Status | Focus |
|----|------------|---------|--------|-------|
| EXPERT-10 | Product Manager | **v2.0** | ✅ Customized | Symbiotic Model, 5-Stage Lifecycle, MoSCoW prioritization |
| EXPERT-11 | UX/UI Designer | **v2.0** | ✅ Customized | Xyric Brand System, Figma + Dev Mode, Emerging Markets a11y |
| EXPERT-12 | Technical Writer | **v2.1** | ✅ Refined | Documentation-First, AI-Ready Standards, Layered Architecture |
| EXPERT-13 | Story Generator | **v3.0** | ✅ Customized | 4-phase workflow, blocking validation, 100% coverage |

#### Software Development Pipeline (8 Skills)

| ID | Skill Name | Version | Status | Focus |
|----|------------|---------|--------|-------|
| EXPERT-14 | Story Spec Generator | **v2.0** | ✅ Customized | Architecture patterns, ADR flags, BI-02 integration |
| EXPERT-15 | Task Generator | **v2.0** | ✅ Customized | TDD ordering (ARCH→TEST→IMPL→INTG), MoSCoW enforcement |
| EXPERT-16 | Task Spec Generator | **v2.0** | ✅ Customized | HIGH-LEVEL GUIDE ONLY, no code examples |
| EXPERT-26 | Brainstormer | **v1.0** | ✅ New | Pre-vision idea exploration, 5-phase workflow, Hard Questions |
| EXPERT-20 | Vision Generator | **v2.1** | ✅ Refined | Product-focused, 10 sections, brainstorm integration |
| EXPERT-21 | PRD Generator | **v2.0** | ✅ Customized | Inspiration-focused competitive analysis |
| EXPERT-22 | Epic Generator | **v2.0** | ✅ Customized | MoSCoW distribution, hypothesis-driven, complexity scoring |
| EXPERT-23 | Epic PRD Generator | **v2.0** | ✅ Customized | BDD acceptance criteria, ADR flags |
| EXPERT-24 | Roadmap Generator | **v2.0** | ✅ Customized | Scope-only roadmaps, multi-layer (strategic + tactical), gap-tolerant |
| EXPERT-25 | Project Scaffold Generator | **v1.0** | ✅ New | Folder structure setup with linking files (PROGRESS.md, README.md) |

**Pipeline Workflow**: IDEA → Brainstorm (26) → Vision (20) → PRD (21) → Epics (22) → Epic PRDs (23) → Stories (13) → Specs (14) → Tasks (15) → Guides (16) → CODE

**Roadmap Aggregation**: ROADMAP (24) aggregates Vision → PRD → Epics → Stories into strategic + tactical views

**Project Setup**: SCAFFOLD (25) creates folder structure for PRODUCTS/ and PROJECTS/ with linking files

**Template-Enabled Skills**: EXPERT-26, 20, 21, 22, and 13 use external templates from `FRAMEWORKS/templates/` and product context from `PRODUCTS/{product}/context/`. See [Templates & Context System](#templates--context-system).

#### DevOps & Ops Domain (4 Skills) [Planned]

| ID | Skill Name | Status | Focus |
|----|------------|--------|-------|
| EXPERT-06 | DevOps/SRE Engineer | 📋 Planned | CI/CD, infrastructure as code, observability |
| EXPERT-07 | Security Engineer | 📋 Planned | OWASP, secure coding, penetration testing |
| EXPERT-08 | Data Engineer | 📋 Planned | ETL, pipelines, warehousing, data modeling |
| EXPERT-09 | MLOps Engineer | 📋 Planned | Model deployment, ML pipelines, monitoring |

**Xyric Engineering Philosophy** (embedded in all v2.0 Expert Agents):
- **Research-First Development**: Discover → Evaluate → Document before building
- **TDD Required**: Tests before code, 80%+ coverage, no exceptions
- **All PRs Need Approval**: No solo shipping, test code = production code
- **Modular Monolith First**: Default architecture, extract services only when proven necessary
- **Foundation + Build**: Use proven external tools 90%, customize 10% on top
- **AI-Native with Quality Gates**: AI generates, humans validate
- **Progress-Based Problem Solving**: Research → Assumptions → Progress → Discuss

**Key Standards Integrated:**
- [Google Engineering Practices](https://google.github.io/eng-practices/)
- [OWASP Top 10 2025](https://owasp.org/www-project-top-ten/)
- [Architecture Decision Records](https://adr.github.io/)
- Industry best practices from FAANG, ISO, NIST

### 11-BI-DATA-ANALYTICS: BI & Data Analytics Skills

> **The Xyric Way**: Questions before dashboards. 80% thought, 20% SQL. Hypothesis-driven design differentiates us from chart-makers.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| BI-01 | Dashboard Philosophy | v1.0 | ✅ Done | Strategic methodology for designing dashboards as decision-making systems |
| BI-02 | Question & Hypothesis Framework | v1.0 | ✅ Done | Universal framework for business questions and testable hypotheses |
| BI-03 | Data Modeling | - | 📋 Planned | Dimensional modeling, star/snowflake schemas |
| BI-04 | Power BI Implementation | - | 📋 Planned | Power BI best practices and patterns |
| BI-05 | DAX Calculation Library | - | 📋 Planned | Common DAX patterns and measures |
| BI-06 | Dashboard Performance | - | 📋 Planned | Dashboard optimization techniques |
| BI-07 | Data Source Integration | - | 📋 Planned | Connecting and transforming data sources |
| BI-08 | Project Scoping | - | 📋 Planned | BI project estimation and scoping |
| BI-09 | Client Training | - | 📋 Planned | Training and handoff methodology |

**Sequential Workflow** (Critical):
1. **BI-02 First** (Discovery): Generate questions and hypotheses
2. **BI-01 Second** (Design): Design dashboards based on BI-02 questions
3. **Build & Launch**: Implement and deploy

**Consultancy Integration:**
- Supports DATA-1.1 (Dashboard Development) service with complete methodology
- Differentiates Xyric through hypothesis-driven design (not just charts)
- Justifies premium pricing through strategic thinking + visualization expertise

---

### 12-DOCUMENT-OPERATIONS: File Manipulation Skills

> **Origin**: Integrated from Anthropic's official skill set. Use as-is for document operations.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| DOC-OPS-01 | PDF | v1.0 | ✅ Done | Read, extract, manipulate PDF files |
| DOC-OPS-02 | Word (DOCX) | v1.0 | ✅ Done | Create and edit Word documents |
| DOC-OPS-03 | PowerPoint (PPTX) | v1.0 | ✅ Done | Generate presentations |
| DOC-OPS-04 | Excel (XLSX) | v1.0 | ✅ Done | Create and manipulate spreadsheets |
| DOC-OPS-05 | YouTube Transcript | v1.0 | ✅ Done | Download transcripts/captions from YouTube videos |
| DOC-OPS-06 | YouTube Summariser | v1.0 | ✅ Done | Transform transcripts into structured analysis documents |
| DOC-OPS-07 | YouTube Key Points | v1.0 | ✅ Done | Extract structured key points for social media, database, PDF |

**See**: `12-document-operations/00-DOC-OPS-INDEX.md` for full documentation.

### 13-DESIGN-CREATIVE: Visual Design Skills

> **Origin**: Integrated from Anthropic's official skill set. Use for design and creative work.

| ID | Skill Name | Version | Status | Purpose |
|----|------------|---------|--------|---------|
| DESIGN-01 | Canvas Design | v1.0 | ✅ Done | Canvas-based drawing with system fonts |
| DESIGN-02 | Theme Factory | v1.0 | ✅ Done | Generate and apply visual themes |
| DESIGN-03 | Algorithmic Art | v1.0 | ✅ Done | Philosophy-driven generative art |
| DESIGN-04 | Frontend Design | v1.0 | ✅ Done | UI/UX best practices guidance |

**See**: `13-design-creative/00-DESIGN-INDEX.md` for full documentation.

---

## Directory Structure

```
claude-skills/
├── 00-CLAUDE-SKILLS-MASTER-INDEX.md      ← This file
├── 00-core/
│   ├── CORE-01-placeholder-guardian.md   ✅
│   ├── CORE-02-research-first-workflow.md ⭐ v2.1
│   ├── CORE-03-assumption-challenge.md    ✅
│   ├── CORE-04-skill-creator/             ✅ (folder)
│   ├── CORE-05-agent-skills-spec/         ✅ (folder)
│   ├── CORE-06-prompt-crafter.md          ⭐ v1.0 NEW
│   └── CORE-07-skill-template/            ✅ (folder)
├── 01-documentation/
│   ├── DOC-01-documentation-validator.md  ✅
│   ├── DOC-02-document-finalizer.md       ✅
│   └── DOC-03-document-metadata-enforcer.md ✅
├── 02-marketing/
│   ├── MKT-01-campaign-planner.md         ⭐ v2.0
│   ├── MKT-02-brand-voice-guardian.md     ⭐ v2.0
│   └── MKT-03-brand-guidelines/           ⭐ v2.0 (folder)
├── 03-content-creation/
│   ├── CONTENT-01-social-linkedin.md      ⭐ v2.0
│   └── CONTENT-02-social-twitter.md       ⭐ v2.0
├── 04-email-communications/
│   ├── EMAIL-01-client-communication.md   ⭐ v2.0
│   ├── IC-01-internal-communications.md   ✅ NEW
│   ├── EMAIL-03-internal-progress-report.md ⭐ v2.0
│   ├── COMMS-01-doc-coauthoring/          ✅ (folder)
│   └── COMMS-02-slack-gif-creator/        ✅ (folder)
├── 05-development/
│   ├── DEV-01-code-review-assistant.md    ⭐ v2.1
│   ├── DEV-02-test-generator.md           ⭐ v2.1
│   ├── DEV-03-debugger-assistant.md       ⭐ v2.1
│   ├── DEV-04-web-artifacts-builder/      ✅ (folder)
│   ├── DEV-05-webapp-testing/             ✅ (folder)
│   ├── DEV-06-mcp-builder/                ✅ (folder)
│   └── DEV-07-commit-message-generator.md ✅
├── 06-research-analysis/
│   ├── RESEARCH-01-competitive-analysis.md ⭐ v2.1
│   └── RESEARCH-02-github-repository-research.md ✅ NEW
├── 08-operations/
│   ├── OPS-01-meeting-notes-processor.md  ✅
│   ├── OPS-02-daily-report-generator.md   ✅ (Progress Reporting)
│   └── OPS-03-weekly-ppp-generator.md     ✅ (Progress Reporting)
├── 09-client-services/
│   └── CLIENT-01-proposal-generator.md    ⭐ v2.0
├── 10-expert-agents/                       ← Elite Specialists + Pipeline
│   ├── 00-EXPERT-AGENTS-INDEX.md
│   ├── SKILL-PIPELINE-PROGRESS.md         ⭐ v3.0 (Pipeline docs)
│   ├── EXPERT-01-senior-frontend.md       ⭐ v2.1
│   ├── EXPERT-02-senior-backend.md        ⭐ v2.0
│   ├── EXPERT-03-software-architect.md    ⭐ v2.0
│   ├── EXPERT-04-qa-test-engineer.md      ⭐ v2.1
│   ├── EXPERT-05-fullstack-engineer.md    ⭐ v2.0
│   ├── EXPERT-10-product-manager.md       ⭐ v2.0
│   ├── EXPERT-11-ux-ui-designer.md        ⭐ v2.0
│   ├── EXPERT-12-technical-writer.md      ⭐ v2.1
│   ├── EXPERT-13-story-generator.md       ⭐ v3.0
│   ├── EXPERT-14-story-spec-generator.md  ⭐ v2.0 (Pipeline)
│   ├── EXPERT-15-task-generator.md        ⭐ v2.0 (Pipeline)
│   ├── EXPERT-16-task-spec-generator.md   ⭐ v2.0 (Pipeline)
│   ├── EXPERT-26-brainstormer.md          ⭐ v1.0 NEW (Pipeline)
│   ├── EXPERT-20-vision-generator.md      ⭐ v2.1 (Pipeline)
│   ├── EXPERT-21-prd-generator.md         ⭐ v2.0 (Pipeline)
│   ├── EXPERT-22-epic-generator.md        ⭐ v2.0 (Pipeline)
│   ├── EXPERT-23-epic-prd-generator.md    ⭐ v2.0 (Pipeline)
│   └── EXPERT-24-roadmap-generator.md     ⭐ v2.0 (Pipeline)
├── 11-bi-data-analytics/
│   ├── 00-BI-SKILLS-INDEX.md
│   ├── BI-01-dashboard-philosophy.md      ✅
│   └── BI-02-question-hypothesis-framework.md ✅
├── 12-document-operations/                 ← File Manipulation
│   ├── 00-DOC-OPS-INDEX.md
│   ├── DOC-OPS-01-pdf/                    ✅ (folder)
│   ├── DOC-OPS-02-docx/                   ✅ (folder)
│   ├── DOC-OPS-03-pptx/                   ✅ (folder)
│   ├── DOC-OPS-04-xlsx/                   ✅ (folder)
│   ├── DOC-OPS-05-youtube-transcript.md   ✅
│   ├── DOC-OPS-06-youtube-summariser.md   ✅
│   └── DOC-OPS-07-youtube-key-points.md   ✅
└── 13-design-creative/                     ← Visual Design
    ├── 00-DESIGN-INDEX.md
    ├── DESIGN-01-canvas-design/           ✅ (folder)
    ├── DESIGN-02-theme-factory/           ✅ (folder)
    ├── DESIGN-03-algorithmic-art/         ✅ (folder)
    └── DESIGN-04-frontend-design/         ✅ (folder)

Legend: ⭐ = v2.0+ Customized/Refined | ✅ = Done (works as-is)
```

---

## How to Use Skills

### Manual Invocation (Recommended)

```
User: "Please use the LinkedIn content skill to create a post about our yHealth launch"
Claude: *Activates CONTENT-01, follows LinkedIn best practices, creates post*

User: "Use the code review skill to review this PR"
Claude: *Activates DEV-01, systematic review checklist, provides feedback*

User: "Act as the Senior Frontend Engineer expert to build this React component"
Claude: *Activates EXPERT-01, applies Google/FAANG best practices, TypeScript patterns, accessibility*

User: "Use the Software Architect expert to design this system"
Claude: *Activates EXPERT-03, creates ADRs, applies SCALE methodology, documents trade-offs*
```

### Slash Commands (After Setup)

```
/social-linkedin <topic>
/code-review <file-or-pr>
/debug <error-description>
/commit
/email-client <recipient> <purpose>
/research-competitor <company>
/github-research <app-idea>
/expert-frontend <task>
/expert-backend <task>
/expert-architect <system>
/expert-qa <test-scope>
/expert-fullstack <feature>
```

---

## Success Metrics

### Quality Indicators
- ✅ Claude never invents estimates (Placeholder Guardian working)
- ✅ All docs follow naming conventions (Documentation Validator working)
- ✅ Content matches brand voice (Brand Voice Guardian working)
- ✅ Code reviews catch issues before merge (Code Review working)
- ✅ Emails are professional and on-brand (Email skills working)
- ✅ Code follows Google/FAANG engineering standards (Expert Agents working)
- ✅ Architecture decisions documented with ADRs (Software Architect working)
- ✅ Tests follow TDD/BDD best practices (QA Engineer working)

### Efficiency Indicators
- ⏱️ Document creation: 50% faster
- ⏱️ Content generation: 60% faster
- ⏱️ Code review: 40% faster
- ⏱️ Research tasks: 70% faster
- ⏱️ Email drafting: 50% faster
- ⏱️ Frontend development: 55% faster (Expert Agents)
- ⏱️ Backend API design: 50% faster (Expert Agents)
- ⏱️ System architecture: 60% faster (Expert Agents)
- ⏱️ Test coverage creation: 65% faster (Expert Agents)

---

## Maintenance Schedule

| Frequency | Task |
|-----------|------|
| Weekly | Review skill usage, identify gaps |
| Monthly | Update skills based on feedback |
| Quarterly | Add new skills, deprecate unused |
| Annually | Full skill library audit |

---

## Contributing

To add a new skill:

1. Identify the category
2. Use the skill template (see any existing skill file)
3. Define clear triggers, workflows, and anti-patterns
4. Test thoroughly before deployment
5. Update this master index

---

*Master Index v3.2 | Updated 2025-12-24 | Xyric Solutions*

**The Xyric Way**: Research-First Development | TDD Required | Foundation + Build | AI-Native with Quality Gates | Partner, Not Vendor









