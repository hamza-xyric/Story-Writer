# Skill Pipeline Development Progress

> **Purpose:** Track development of the complete software development system
> **Scope:** Idea → Vision → PRD → Epics → Stories → Tasks → Code
> **Owner:** Xyric Solutions
> **Created:** 2025-12-08
> **Updated:** 2025-12-22

---

## Vision

Complete software development system from idea to implementation:

```
IDEA/NOTES (User Input)
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  EXPERT-26: Brainstormer (v1.0)                                      │
│  Input: Raw product ideas, notes, sketches (any format)              │
│  Output: brainstorm.md with validated assumptions & VISION_READY     │
│  Status: NEW ✅                                                      │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  EXPERT-20: Vision Generator (v2.1)                                  │
│  Input: brainstorm.md OR product idea/notes (two entry modes)        │
│  Output: Product Vision Document (10 sections, NO business content) │
│  Status: REFINED ✅                                                  │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  EXPERT-21: PRD Generator (v2.0)                                     │
│  Input: Vision Document                                              │
│  Output: Master PRD (Inspiration-focused competitive analysis)      │
│  Status: REFINED ✅                                                  │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  EXPERT-22: Epic Generator (v2.0)                                    │
│  Input: Master PRD                                                   │
│  Output: All Epic outlines (MoSCoW, Hypothesis, Complexity Scoring) │
│  Status: REFINED ✅                                                  │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼ (For each Epic)
┌─────────────────────────────────────────────────────────────────────┐
│  EXPERT-23: Epic PRD Generator (v2.0)                                │
│  Input: Epic outline from EXPERT-22                                 │
│  Output: Detailed Epic PRD (BDD format, ADR flags)                  │
│  Status: REFINED ✅                                                  │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼ (For each Epic PRD)
┌─────────────────────────────────────────────────────────────────────┐
│  EXPERT-13: Story Generator                                          │
│  Input: Epic PRD                                                     │
│  Output: All Stories (stories/Epic-XX-Stories.md)                   │
│  Status: COMPLETE (v3.0) ✅                                          │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼ (For each Story)
┌─────────────────────────────────────────────────────────────────────┐
│  EXPERT-14: Story Spec Generator (v2.0)                              │
│  Input: Story from EXPERT-13                                        │
│  Output: Technical Specification (Architecture patterns, ADR flags) │
│  Status: REFINED ✅                                                  │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼ (For each Tech Spec)
┌─────────────────────────────────────────────────────────────────────┐
│  EXPERT-15: Task Generator (v2.0)                                    │
│  Input: Technical Specification                                      │
│  Output: All Tasks (TDD ordering: ARCH → TEST → IMPL → INTG)       │
│  Status: REFINED ✅                                                  │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼ (For each Task)
┌─────────────────────────────────────────────────────────────────────┐
│  EXPERT-16: Task Spec Generator (v2.0)                               │
│  Input: Task from EXPERT-15                                         │
│  Output: High-Level Implementation Guide (NO code examples)         │
│  Status: REFINED ✅                                                  │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  EXPERT-01/02/05: Engineers                                          │
│  Input: Task Implementation Guide                                    │
│  Output: Code Implementation                                         │
│  Status: AVAILABLE                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

**Goal:** Apply this system to ANY product idea with consistent quality, from initial brainstorm to production code.

---

## Pipeline Skills Summary

| Skill ID | Name | Type | Status | Version | Input | Output |
|----------|------|------|--------|---------|-------|--------|
| **EXPERT-26** | Brainstormer | Generator | NEW | v1.0 | Raw idea/notes | brainstorm.md |
| **EXPERT-20** | Vision Generator | Generator | REFINED | v2.1 | brainstorm.md OR idea | Vision Document |
| **EXPERT-21** | PRD Generator | Generator | REFINED | v2.0 | Vision Doc | Master PRD |
| **EXPERT-22** | Epic Generator | Generator | REFINED | v2.0 | Master PRD | All Epic outlines |
| **EXPERT-23** | Epic PRD Generator | Individual | REFINED | v2.0 | Epic outline | Detailed Epic PRD |
| **EXPERT-13** | Story Generator | Generator | COMPLETE | v3.0 | Epic PRD | All Stories |
| **EXPERT-14** | Story Spec Generator | Individual | REFINED | v2.0 | Story | Tech Spec |
| **EXPERT-15** | Task Generator | Generator | REFINED | v2.0 | Tech Spec | All Tasks |
| **EXPERT-16** | Task Spec Generator | Individual | REFINED | v2.0 | Task | Implementation Guide |

### Skill Type Definitions

- **Generator**: Creates ALL items at once (bulk output with coverage matrix)
- **Individual**: Creates detailed spec for ONE item (deep dive with questions)

---

## Standard 4-Phase Workflow (All Pipeline Skills)

All pipeline skills follow this standardized workflow:

```
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 0: RESEARCH (Automated)                                       │
├─────────────────────────────────────────────────────────────────────┤
│  1. Gather context from product folder                               │
│  2. Read related documents (existing vision, PRD, etc.)             │
│  3. Extract patterns from similar existing documents                 │
│  4. Identify gaps and areas needing clarification                    │
│  OUTPUT: Context Analysis Summary                                    │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 1: ANALYSIS & QUESTIONS                                       │
├─────────────────────────────────────────────────────────────────────┤
│  1. Present analysis summary to user                                 │
│  2. Ask tailored clarification questions (domain-specific)          │
│  3. May have MULTIPLE question rounds if needed                      │
│  4. ═══════════════ WAIT FOR USER INPUT ════════════════════════════│
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 2: GENERATION (Sequential)                                    │
├─────────────────────────────────────────────────────────────────────┤
│  1. Apply user decisions to generation                               │
│  2. Generate content section-by-section                              │
│  3. Cross-reference for consistency                                  │
│  4. Build coverage matrix (inputs → outputs)                         │
│  OUTPUT: Complete document/artifacts                                 │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 3: VALIDATION (Blocking)                                      │
├─────────────────────────────────────────────────────────────────────┤
│  1. Coverage check: All inputs covered                               │
│  2. Template compliance check                                        │
│  3. Quality checks (metrics quantified, criteria testable)          │
│  4. Consistency check (no contradictions)                            │
│  IF ANY CHECK FAILS → Return to Phase 2                             │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 4: OUTPUT & TRACKING                                          │
├─────────────────────────────────────────────────────────────────────┤
│  1. Write to appropriate file location                               │
│  2. Update PROGRESS.md with session details                          │
│  3. Output pipeline hooks for downstream skills                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Global Decisions (Apply to ALL Pipeline Skills)

### Core Principles

1. **Specifications define WHAT, not HOW**
   - Each transformation outputs specifications, not implementation
   - Implementation deferred to final engineering phase

2. **100% Coverage Required**
   - No gaps between inputs and outputs
   - Coverage matrix must show 100%
   - Blocking validation enforces this

3. **Blocking Validation**
   - Quality gates at each phase boundary
   - Cannot proceed until all checks pass
   - No warnings-only mode

4. **Sequential Processing**
   - Quality over speed
   - Context preserved across sections
   - Dependencies built incrementally

5. **Template Compliance**
   - Mandatory structure for all outputs
   - Ensures consistency across products
   - Enables downstream automation

6. **Research Phase Before Transformation**
   - Gather context before generating
   - Use available product docs
   - Don't assume - verify

7. **Product-Agnostic Design**
   - No hardcoded product patterns
   - Generic placeholders `{product}`
   - Skills work for ANY product

8. **Flexible Sizing**
   - Size based on natural scope, not equal chunks
   - Some items larger, some smaller
   - Determined by content complexity

9. **Adaptable Context**
   - Use available context files
   - Don't block on missing optional files
   - Proceed with what exists

10. **Interactive Refinement**
    - Multiple question rounds allowed
    - User input drives detail level
    - Collaborative document building

---

## Quality Standards

| Metric | Threshold | Blocking? |
|--------|-----------|-----------|
| Input Coverage | 100% | Yes |
| Template Compliance | 100% | Yes |
| Acceptance Criteria | BDD Format | Yes |
| Success Metrics | Quantified | Yes |
| Duplicate Check | 0 overlaps | Yes |
| Dependencies Documented | All | Yes |
| Edge Cases | Addressed | Warning (>3 blocks) |

---

## Skill Details

### EXPERT-26: Brainstormer (NEW)

**Purpose:** Transform raw product ideas into structured brainstorm documents through rigorous questioning before vision creation.

**Architecture:** 5-Phase Workflow with Hard Questions Framework

**Phases:**
1. **INTAKE** - Parse raw ideas into structured inventory
2. **HARD QUESTIONS** - Challenge with 5 question categories (WHY/WHO/WHAT/HOW/WHAT-IF)
3. **CLARIFICATION** - Resolve contradictions, define vague terms
4. **SYNTHESIS** - Generate brainstorm.md
5. **VALIDATION** - Blocking checks before handoff

**Output Structure:**
1. Product Identity (name, tagline, one-liner)
2. Problem Space (specific problems, user pain points)
3. Proposed Solution (core features, differentiators)
4. Target Users (primary/secondary/excluded)
5. Success Criteria (how to measure success)
6. Open Questions (remaining uncertainties)
7. Integration Notes (EXPERT-20 handoff marker)

**Handoff Marker:** `<!-- VISION_READY: {PRODUCT-CODE} -->` signals readiness for EXPERT-20

---

### EXPERT-20: Vision Generator (v2.1)

**Purpose:** Transform a brainstorm document or product idea into a comprehensive Vision Document following the Xyric methodology.

**Two Entry Modes:**
- **With Brainstorm (Recommended):** 4 reduced questions (brainstorm.md provides context)
- **Without Brainstorm (Legacy):** 7 full questions

**Upstream:** EXPERT-26 (Brainstormer)

**Output Structure:**
1. Executive Summary (tagline, vision statement, problem, solution, market, differentiation)
2. Mission Statement
3. Vision Statement (expanded)
4. Strategic Objectives (4-6 with key results)
5. Core Value Propositions (by segment)
6. Product Architecture (ecosystem, modules, AI capabilities)
7. Strategic Principles (7, "X Over Y" format)
8. Success Metrics (by category)
9. Target Customer Segments (3-5 personas)
10. Competitive Landscape
11. Risks & Mitigation (10-15)
12. Future Opportunities
13. Document Governance

**Question Categories (Phase 1):**
1. Problem Space
2. Target Market
3. Competitive Landscape
4. Revenue Model
5. Technology Approach
6. Timeline Vision
7. Resource Constraints
8. Risk Tolerance
9. Integration (with other Xyric products)

---

### EXPERT-21: PRD Generator

**Purpose:** Transform a Vision Document into a structured Product Requirements Document with defined features, user personas, success metrics, and epic breakdown.

**Output Structure:**
1. Executive Summary
2. Product Vision & Success Metrics
3. Core Design Principles
4. User Personas (5)
5. Epic Overview Map
6. MVP vs Future Scope Matrix
7. Success Criteria Checklist
8. Feature Template Reference
9. Cross-Reference Index
10. Competitive Analysis
11. Error Handling & Edge Cases
12. Accessibility Requirements
13. AI Safety Boundaries
14. Data Management

---

### EXPERT-22: Epic Generator

**Purpose:** Break down a Master PRD into a comprehensive set of Epic outlines, ensuring 100% feature coverage with no gaps.

**Output Structure:**
- Epic Index (table)
- Epic Summaries (for each: goal, features, personas, dependencies, MVP status)
- Dependency Diagram
- Coverage Matrix (PRD Feature → Epic mapping)

---

### EXPERT-23: Epic PRD Generator

**Purpose:** Transform an Epic outline into a detailed Epic PRD with full feature specifications.

**Output Structure:**
1. Epic Overview (statement, goal, philosophy, feature count)
2. Feature Details (6+ per epic with full specification)
3. Integration Points
4. Priority Legend
5. MVP vs Post-MVP Status

---

### EXPERT-13: Story Generator (COMPLETE)

**Purpose:** Break down Epic PRDs into comprehensive, well-defined User Stories.

**Status:** Complete (v3.0) - 4-phase workflow with blocking validation

See: `EXPERT-13-story-generator.md` for full specification

---

### EXPERT-14: Story Spec Generator

**Purpose:** Transform a User Story into a detailed Technical Specification ready for task breakdown.

**Output Structure:**
1. Story Reference
2. Technical Overview
3. API Contracts
4. Data Models
5. UI Components
6. Integration Points
7. Security Requirements
8. Testing Strategy
9. Performance Requirements
10. Open Technical Decisions

---

### EXPERT-15: Task Generator

**Purpose:** Break down a Technical Specification into all implementation tasks, with assignments to appropriate engineers.

**Output Structure:**
- Task Index (table)
- Tasks (each with: type, assignee, priority, complexity, description, acceptance criteria)
- Dependency Graph
- Sprint Allocation

---

### EXPERT-16: Task Spec Generator

**Purpose:** Transform a Task into a detailed Implementation Guide that an engineer can follow step-by-step.

**Output Structure:**
1. Task Overview
2. Prerequisites
3. Implementation Steps
4. Code Examples
5. Testing Checklist
6. Review Criteria
7. Definition of Done

---

## Context Source Patterns (Generic)

Before any transformation, gather context from the PRODUCT folder:

| Priority | Source | Path Pattern | Extract |
|----------|--------|--------------|---------|
| Critical | Input Document | (varies by skill) | Primary input |
| Critical | Existing Output | (varies by skill) | Template patterns |
| High | Product Requirements | `Product-Requirements-Document.md` | Success metrics |
| High | PROGRESS.md | `PROGRESS.md` | Global decisions |
| Medium | Vision docs | `*Vision*.md` | Strategic alignment |
| Medium | Cross-dependencies | Related documents | Dependencies |
| Low | Design docs | `design/*.md` | UI/UX context |

**Adaptation Rule:** Not all products have all files. Use what exists, don't block on missing optional context.

---

## Caching Strategy

| Document Type | Cache Policy | Reason |
|---------------|-------------|--------|
| PROGRESS.md | Always Fresh | Contains session decisions |
| Existing Output | Session Cache | Template stable within project |
| Product Requirements | Session Cache | Rarely changes mid-project |
| Executive Vision | Session Cache | Strategic anchor |
| Design System | Session Cache | UI patterns stable |
| Input Document | Always Fresh | The input being transformed |

---

## Implementation Order

| Phase | Skills | Focus |
|-------|--------|-------|
| 1 | EXPERT-20, EXPERT-21 | Foundation (Vision, PRD) |
| 2 | EXPERT-22, EXPERT-23 | Epic Layer |
| 3 | EXPERT-14 | Story Layer (EXPERT-13 exists) |
| 4 | EXPERT-15, EXPERT-16 | Task Layer |

---

## Development History

### EXPERT-13 Development (Complete)

#### Session 1 - 2025-12-08

**Focus:** Quality Review & Enhancement Design

**Findings (5 Critical Gaps):**
1. Context overflow risk (PRDs 2000+ lines)
2. No subagent architecture
3. Missing research phase
4. Incomplete context sources
5. No pipeline integration

**Quality Baseline:**
- Epic-01-Stories.md scored 9.1/10
- 15 stories with full template compliance
- 11 minor gaps identified (edge cases)

**Decisions Made:**

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Processing Mode | Sequential | Quality > Speed, context preserved |
| Validation | Blocking | Must fix all gaps before output |
| Pipeline Scope | Iterative | Perfect 13 → then 14 → then 15 |
| Context Caching | Selective | Cache stable, refresh dynamic |
| Story Flexibility | Requirement-Based | Natural scope, not equal chunks |
| Product Agnostic | Yes | Remove yHealth-specific patterns |

**Enhancements Implemented:**
- Phase 0: Research & Context Gathering (NEW)
- Phase 1: Analysis & Questions (ENHANCED)
- Phase 2: Story Generation (SEQUENTIAL)
- Phase 3: Validation (NEW - BLOCKING)
- Phase 4: Output & Tracking (NEW)

---

### Pipeline Expansion - 2025-12-09

**Focus:** Complete pipeline from Idea to Implementation

**New Skills Designed:**
- EXPERT-20: Vision Generator
- EXPERT-21: PRD Generator
- EXPERT-22: Epic Generator
- EXPERT-23: Epic PRD Generator
- EXPERT-14: Story Spec Generator
- EXPERT-15: Task Generator
- EXPERT-16: Task Spec Generator

**Key Decisions:**

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Skill Numbering | 14-16, 20-23 | Pipeline skills at 20+, downstream at 14-16 |
| Workflow Pattern | 4-Phase Standard | Consistency across all skills |
| Question Rounds | Multiple allowed | Flexible refinement based on input detail |
| Generator vs Individual | Both types | Bulk generation + detailed specs |

---

### Xyric Customization Refinement - 2025-12-09

**Focus:** Refine all 7 pipeline skills to Xyric practices

**Skills Refined (7 Total):**

| Skill | Version | Key Changes |
|-------|---------|-------------|
| EXPERT-16 | v2.0 | HIGH-LEVEL GUIDE ONLY - Removed all code examples |
| EXPERT-15 | v2.0 | TDD task ordering (ARCH → TEST → IMPL → INTG), MoSCoW enforcement |
| EXPERT-14 | v2.0 | Architecture patterns, ADR flagging, BI-02 question framework |
| EXPERT-23 | v2.0 | BDD acceptance criteria (Given/When/Then), ADR flags |
| EXPERT-22 | v2.0 | MoSCoW distribution per epic, hypothesis-driven scoping, complexity scoring |
| EXPERT-20 | v2.0 | Removed business sections (revenue, TAM, go-to-market), 10 sections not 13 |
| EXPERT-21 | v2.0 | Inspiration-focused competitive analysis, product quality metrics |

**Key Decisions:**

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Vision Focus | Product Concept (PRIMARY) | Business model handled elsewhere |
| Competitive Analysis | Inspiration-focused | Learn from others, don't reinvent the wheel |
| Task Spec | High-level guidance only | No code examples - engineers implement |
| TDD Ordering | ARCH → TEST → IMPL → INTG | Tests before implementation |
| MoSCoW Distribution | 60% MUST / 20% SHOULD / 20% COULD | Balanced scope management |
| BDD Format | Given/When/Then | Testable acceptance criteria |
| ADR Flagging | All significant decisions | EXPERT-03 integration |

**Skill Invocations Added:**

| Pipeline Skill | Now Invokes |
|----------------|-------------|
| EXPERT-20 | BI-02 |
| EXPERT-21 | BI-02 |
| EXPERT-22 | BI-02 |
| EXPERT-23 | EXPERT-03, BI-02 |
| EXPERT-14 | EXPERT-03, BI-02 |
| EXPERT-15 | EXPERT-04, DEV-02 |
| EXPERT-16 | EXPERT-03, EXPERT-04, DEV-02 |

---

## Open Questions (Resolved)

| Question | Resolution |
|----------|------------|
| Epic Generator Skill Number | EXPERT-22 |
| Vision Generator Skill Number | EXPERT-20 |
| Task Granularity | Flexible based on complexity |
| Cross-Skill Handoff | Pipeline hooks in output |

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2025-12-08 | 1.0 | Initial creation, EXPERT-13 enhancement design |
| 2025-12-09 | 2.0 | Complete pipeline expansion (Idea → Code), 7 new skills designed |
| 2025-12-09 | 3.0 | Xyric customization refinement - 7 skills refined to v2.0 with Xyric practices |
| 2025-12-22 | 4.0 | Added EXPERT-26 Brainstormer (pre-vision), updated EXPERT-20 to v2.1 with two entry modes |

---

*Skill Pipeline Progress v4.0 | Xyric Solutions | 2025-12-22*
