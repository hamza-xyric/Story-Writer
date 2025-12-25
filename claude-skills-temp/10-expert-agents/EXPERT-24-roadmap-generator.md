# EXPERT-24: Roadmap Generator

**Skill ID**: EXPERT-24
**Category**: Expert Agents
**Priority**: High
**Version**: 1.0
**Last Updated**: 2025-12-11
**Architecture**: 4-Phase Workflow with Blocking Validation
**Type**: Generator (Scope-Only Roadmap)

---

## Purpose

Generate a comprehensive, scope-focused roadmap from a PRD and its associated Epic PRDs and Stories. This skill produces a multi-layer roadmap showing dependencies, sequencing, and phases WITHOUT timelines or resource allocation.

**Core Philosophy**: Roadmaps define WHAT needs to be done and in WHAT ORDER. They are scope-first, not schedule-first. A well-crafted roadmap reveals dependencies, gaps, and the path from current state to completion.

---

## When to Activate

### Trigger Phrases
- "Create a roadmap for [product]"
- "Generate scope roadmap from PRD"
- "Product roadmap for [product]"
- "Show me what needs to be done for [product]"
- "Roadmap from PRD/Epics/Stories"
- "PRD → Roadmap for [product]"
- "Scope-focused roadmap"
- "What's the path to completion for [product]"

### Related Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-21** (PRD Generator) | PRD is primary input |
| **EXPERT-22** (Epic Generator) | Epic PRDs provide feature details and dependencies |
| **EXPERT-23** (Epic PRD Generator) | Detailed epic specifications |
| **EXPERT-13** (Story Generator) | Stories provide tactical layer |
| **EXPERT-10** (Product Manager) | MoSCoW, stage-gates, methodology |
| **CORE-03** (Assumption Challenge) | Challenge scope decisions |

---

## Pipeline Position

This skill aggregates ALL upstream artifacts:

```
Vision Document (EXPERT-20)
        │
        ▼
Master PRD (EXPERT-21)
        │
        ▼
Epic Overview (EXPERT-22)
        │
        ▼
Epic PRDs (EXPERT-23)
        │
        ▼
Stories (EXPERT-13)
        │
        ▼
┌───────────────────────────────────┐
│  ROADMAP (EXPERT-24) ◄─────────── │ AGGREGATES ALL ABOVE
│  Scope-only, multi-layer output   │
└───────────────────────────────────┘
```

---

## Required Context Sources

| Priority | Source | Path Pattern | Extract |
|----------|--------|--------------|---------|
| Critical | Master PRD | `PRODUCTS/{product}/Product-Requirements-Document.md` | Epics, features, personas, success criteria |
| Critical | Epic PRDs | `PRODUCTS/{product}/prd-epics/PRD-Epic-*.md` | Feature specs, dependencies, MVP status |
| High | Story Files | `PRODUCTS/{product}/stories/Epic-*-Stories.md` | Story counts, coverage, phases |
| High | PROGRESS.md | `PRODUCTS/{product}/PROGRESS.md` | Session context, global decisions |
| Medium | Product Context | `PRODUCTS/{product}/context/` | Personas, pillars, terminology |
| Low | Vision Document | `PRODUCTS/{product}/*Vision*.md` | Strategic alignment |

**Key Principle:** Master PRD is the PRIMARY input. Epic PRDs provide depth. Stories provide tactical detail. Missing stories should NOT block roadmap generation.

---

## What This Skill Does NOT Include

**Explicitly Out of Scope:**
- Timeline estimates (no dates, no sprints, no deadlines)
- Resource allocation (no team assignments, no headcount)
- Cost estimates (no budgets, no LOE)
- Effort sizing (no story points, no T-shirt sizes)

**Why:** Scope-focused roadmaps enable cleaner prioritization decisions. Timeline and resource discussions happen separately, informed by the scope roadmap.

---

## The Xyric Way: Roadmap Philosophy

### Core Principles

1. **Scope Over Schedule**
   - Define WHAT needs to be done, not WHEN
   - Dependencies determine sequence, not calendar dates
   - Enables honest scope discussions without timeline pressure

2. **Multi-Layer Visibility**
   - Strategic Layer: Epic-level phases for executive overview
   - Tactical Layer: Story-level details for implementation planning
   - Both layers in one document for complete picture

3. **Gap Tolerance**
   - Missing stories should not block roadmap generation
   - Estimate story counts from feature counts
   - Flag gaps with action items, not blockers

4. **Dependency-First Sequencing**
   - Critical path emerges from dependencies
   - Parallel opportunities identified
   - No arbitrary phase assignments

5. **100% Coverage Required**
   - Every PRD feature appears in roadmap
   - Every epic mapped to a phase
   - Complete path from current state to MVP

6. **MoSCoW Alignment**
   - Roadmap reflects PRD priorities
   - Must Have features in early phases
   - Could Have features in later phases

---

## Four-Phase Interactive Workflow

### Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 0: RESEARCH (Automated)                 │
├─────────────────────────────────────────────────────────────────┤
│  1. Locate and read Master PRD                                   │
│  2. Locate and read all Epic PRDs                                │
│  3. Locate and read all Story files (if exist)                   │
│  4. Build dependency graph from Epic dependencies                │
│  5. Identify gaps (missing stories, incomplete coverage)         │
│  OUTPUT: Product Analysis Summary (~400 words)                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: QUESTIONS & USER INPUT               │
├─────────────────────────────────────────────────────────────────┤
│  6. Present Product Analysis to user                             │
│  7. Show coverage status (complete vs pending)                   │
│  8. Ask 7 tailored clarification questions                       │
│  9. ═══════════════ WAIT FOR USER INPUT ════════════════════════│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2: GENERATION (Sequential)              │
├─────────────────────────────────────────────────────────────────┤
│  10. Build Strategic Layer (Epic-level phases)                   │
│  11. Build Tactical Layer (Story-level details)                  │
│  12. Create Dependency Map (visual + tabular)                    │
│  13. Create Coverage Matrix (feature → story)                    │
│  14. Document Gaps and Actions                                   │
│  OUTPUT: Complete Roadmap Document                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: VALIDATION (Blocking)                │
├─────────────────────────────────────────────────────────────────┤
│  15. COVERAGE CHECK: All PRD features mapped                     │
│  16. DEPENDENCY CHECK: No circular dependencies                  │
│  17. GAP CHECK: All gaps documented with actions                 │
│  18. SECTION CHECK: All required sections present                │
│  IF ANY CHECK FAILS → Return to Phase 2, fix, re-validate       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4: OUTPUT & TRACKING                    │
├─────────────────────────────────────────────────────────────────┤
│  19. Write to PRODUCTS/{product}/Roadmap.md                      │
│  20. Update PROGRESS.md with session details                     │
│  21. Present completion summary with key metrics                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Assumption Challenge Integration

**Invoke CORE-03** between Phase 0 (Research) and Phase 1 (Questions).

| Challenge Phase | Applied | Trigger |
|-----------------|---------|---------|
| A: Question Why | Yes | User specifies phase grouping |
| B: Alternatives | Yes | MVP scope decisions, phase boundaries |
| C: Stress Test | No | (Medium intensity - skip Phase C) |

**Challenge Intensity:** Medium (A + B only)

**What to Challenge:**
- Phase groupings: "Why group these epics together?"
- MVP exclusions: "Why exclude this feature from MVP?"
- Gap handling: "Why skip vs estimate stories?"
- Critical path: "What if this dependency order is wrong?"

**Workflow Update:**
```
Phase 0: Research → CORE-03: Challenge (Medium) → Phase 1: Questions → Phase 2: Generate → Phase 3: Validate
```

**Skip Challenge When:**
- User explicitly requests bypass ("skip challenge")
- Phase structure already validated in prior session
- User provides detailed rationale upfront

**Reference:** See `claude-skills/00-core/CORE-03-assumption-challenge.md` for full framework.

---

### Phase 0: Research & Context Gathering

**Purpose:** Build complete picture of product state from all available artifacts.

**Step 1: Locate Master PRD**

Look for PRD in these locations:
- `PRODUCTS/{product}/Product-Requirements-Document.md`
- `PRODUCTS/{product}/PRD.md`
- `PRODUCTS/{product}/*PRD*.md`

**Step 2: Extract PRD Overview**

Parse from Master PRD:
- Product name and description
- Total epic count
- Total feature count per epic
- Personas (P1-P5)
- MVP scope definition
- Success criteria

**Step 3: Read All Epic PRDs**

For each epic PRD (`prd-epics/PRD-Epic-*.md`):
- Epic name and goal
- Feature list (F[X.Y] pattern)
- Feature priorities (P0-P3)
- MVP status per feature
- Dependencies on other epics

**Step 4: Read Story Files (If Exist)**

For each story file (`stories/Epic-*-Stories.md`):
- Total story count
- Story priorities (Must/Should/Could)
- Implementation phases
- Feature → Story mapping

**Step 5: Build Dependency Graph**

From Epic PRD dependencies:
- Map upstream dependencies (what must come before)
- Map downstream dependencies (what this enables)
- Calculate complexity scores
- Identify critical path

**Step 6: Identify Gaps**

- Epics without story files
- Features without story coverage
- Incomplete coverage matrices

**Step 7: Create Product Analysis Summary**

```markdown
## Product Analysis: [Product Name]

### Source Documents Found
| Document | Status | Details |
|----------|--------|---------|
| Master PRD | ✅/❌ | [Version, date] |
| Epic PRDs | [X]/[Y] | E1-E[Y] found |
| Story Files | [X]/[Y] | E1-E[X] stories exist |

### Epic Overview
| Epic | Name | Features | Stories | Status |
|------|------|----------|---------|--------|
| E1 | [Name] | [X] | [Y] | Complete/Pending |
| E2 | [Name] | [X] | [Y] | Complete/Pending |
...

### Dependency Analysis
- Foundation Epic: E[X]
- Critical Path: E[A] → E[B] → E[C] → E[D]
- Parallel Opportunities: [List]
- Complexity Hotspots: [Epics with high dependency scores]

### Coverage Status
- Total Features: [X]
- Features with Stories: [Y] ([Z]%)
- Stories Complete: [A] of ~[B] estimated

### Gaps Identified
| Epic | Issue | Action Required |
|------|-------|-----------------|
| E[X] | No stories | Run EXPERT-13 |
| E[Y] | No stories | Run EXPERT-13 |

### Recommended Phase Structure
- Phase 1: [Foundation - Epics]
- Phase 2: [Core - Epics]
- Phase 3: [Domain - Epics]
- Phase 4: [Intelligence - Epics]
```

---

### Phase 1: Questions & User Input

**INPUT:** Product Analysis from Phase 0

**Step 1: Present Analysis to User**

Show the Product Analysis summary. User sees:
- What documents were found
- Epic overview with completion status
- Dependency analysis
- Gap identification
- Recommended phases

**Step 2: Tailored Questions**

**Critical**: Questions must reference specific product content, not be generic.

#### Question Framework (7 Questions)

**STRATEGIC (3 Questions)**

**Q1. Phase Structure Confirmation**
```markdown
Based on dependencies, I propose these phases for [Product]:

| Phase | Epics | Theme |
|-------|-------|-------|
| Phase 1 | E[X], E[Y] | Foundation |
| Phase 2 | E[A], E[B] | Core Experience |
| Phase 3 | E[C], E[D], E[E] | Domain Features |
| Phase 4 | E[F], E[G], E[H] | Intelligence Layer |

Questions:
a) Does this phase grouping make sense?
b) Should any epics move to a different phase?
c) Are there epics that should be in the same phase but are separated?
```

**Q2. MVP Scope Boundaries**
```markdown
Based on the PRD, these epics are marked MVP:
- **MVP Core:** E[X], E[Y] (must complete for launch)
- **MVP Enhanced:** E[A], E[B] (should complete for launch)
- **Post-MVP:** E[C]+ (after launch)

Questions:
a) Is this MVP/Post-MVP split correct?
b) Any epics that should be explicitly excluded from this roadmap?
c) Any features within MVP epics that should be deferred?
```

**Q3. Gap Handling**
```markdown
Stories are missing for these epics:
- E[X]: [Y] features, ~[Z] estimated stories
- E[A]: [B] features, ~[C] estimated stories

How should I handle this in the roadmap?
a) **Estimate**: Show estimated story counts based on feature counts
b) **Flag Only**: Mark as PENDING with action items, no estimates
c) **Skip Tactical**: Show strategic layer only, omit tactical for incomplete epics
```

**TACTICAL (2 Questions)**

**Q4. Story Detail Level**
```markdown
For epics with complete stories (E[X]-E[Y]), how detailed should the tactical layer be?

a) **Summary**: Story counts and feature coverage only
b) **Detailed**: Full story index with dependencies per epic
c) **Minimal**: Skip story-level details, focus on epic phases
```

**Q5. Success Criteria Inclusion**
```markdown
The PRD defines success criteria for each epic. Include in roadmap?

a) **Per-Phase**: Success criteria grouped by roadmap phase
b) **Per-Epic**: Success criteria listed under each epic
c) **Summary Only**: Overall MVP success criteria at the end
d) **Skip**: Omit success criteria (reference PRD instead)
```

**STRUCTURAL (2 Questions)**

**Q6. Dependency Visualization**
```markdown
Dependency map format preference?

a) **ASCII Diagram**: Text-based, portable, renders anywhere
b) **Mermaid Diagram**: Rich visualization, renders in GitHub/tools
c) **Table Only**: No visual diagram, dependency table only
```

**Q7. Competitive Differentiation**
```markdown
Include competitive differentiation mapping?

a) **Yes**: Show which features create competitive advantage
b) **No**: Skip competitive analysis in roadmap
```

---

### Phase 2: Roadmap Generation

**INPUTS (from previous phases):**
- Product Analysis from Phase 0
- User Answers from Phase 1

**Step 1: Apply User Decisions**

Map user answers to roadmap structure:

| Decision | Impact on Roadmap |
|----------|-------------------|
| Phase structure | Final phase groupings |
| MVP scope | Phase tagging (MVP vs Post-MVP) |
| Gap handling | Tactical layer completeness |
| Story detail | Per-epic story information |
| Success criteria | Criteria sections included |
| Visualization | Dependency diagram format |
| Competitive | Differentiation section included |

**Step 2: Build Strategic Layer**

For each phase:
1. List epics in the phase
2. Show feature counts and story counts
3. Define phase dependencies
4. Set phase success criteria (if included)

**Step 3: Build Tactical Layer**

For each epic:
1. If stories exist: Show story index, dependencies, phases
2. If stories missing: Show feature list, estimated counts, action item
3. Map features to stories (coverage matrix)

**Step 4: Create Dependency Map**

Based on user preference:
- ASCII diagram showing epic → epic dependencies
- Or Mermaid diagram
- Plus dependency table with reasons

**Step 5: Create Coverage Matrix**

| Feature | Feature Name | Epic | Stories | Coverage |
|---------|--------------|------|---------|----------|
| F1.1 | [Name] | E1 | S01.1.1, S01.1.2 | 100% |
| F7.1 | [Name] | E7 | PENDING | 0% |

**Step 6: Document Gaps**

For each gap:
- Epic name and ID
- Features affected
- Estimated story count
- Action required (e.g., "Run EXPERT-13")

---

### Phase 3: Validation (Blocking)

**Purpose:** Quality gate - must pass ALL checks before output.

**Critical Checks (Block if Fail):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Coverage** | All PRD features mapped to roadmap | Add missing features |
| **Dependencies** | No circular dependencies | Resolve cycles |
| **Gaps Documented** | All gaps have actions | Document missing gaps |
| **Sections Complete** | All required sections present | Add missing sections |

**Quality Checks (Warning → Block if >3):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Phase Balance** | No phase with >40% of features | Consider rebalancing |
| **Critical Path Clear** | Path to MVP identified | Define critical path |
| **Success Criteria** | Measurable criteria included | Add metrics |
| **Dependency Reasons** | All dependencies have rationale | Document reasons |

**Validation Output:**
- ✅ All checks pass → Proceed to Phase 4
- ❌ Any critical check fails → Return to Phase 2

---

### Phase 4: Output & Tracking

**Step 1: Write Roadmap File**

Create: `PRODUCTS/{product}/Roadmap.md`

**Step 2: Update PROGRESS.md**

Add session entry:
- Session timestamp
- Product: {product name}
- Roadmap created/updated
- Phase count: [X]
- Epic coverage: [X]/[Y]
- Story coverage: [X]/[Y] ([Z]%)
- Gaps identified: [List]

**Step 3: Present Completion Summary**

```markdown
## Roadmap Generation Complete

**Product:** [Name]
**Output:** PRODUCTS/{product}/Roadmap.md

**Summary:**
- Phases: [X]
- Epics: [Y] (all mapped)
- Features: [Z] (100% coverage)
- Stories: [A] of ~[B] ([C]%)

**Gaps Requiring Action:**
- E[X]: Run EXPERT-13 to generate stories
- E[Y]: Run EXPERT-13 to generate stories

**Critical Path:** E[A] → E[B] → E[C] → MVP

**Next Steps:**
1. Generate missing stories (EXPERT-13)
2. Review roadmap with stakeholders
3. Begin Phase 1 implementation
```

---

## Roadmap Document Template

```markdown
# [Product Name] – PRODUCT ROADMAP
**Scope-Focused Roadmap (No Timelines, No Resources)**

---

## DOCUMENT INFORMATION

| Attribute | Value |
|-----------|-------|
| **Product** | [Product Name] |
| **Version** | 1.0 |
| **Status** | Draft |
| **Owner** | [Owner] |
| **Last Updated** | [Date] |
| **Source PRD** | [Link] |

---

## 1. EXECUTIVE ROADMAP SUMMARY

### Product Overview
[1-2 sentences describing the product]

### Roadmap Scope
This roadmap defines WHAT needs to be done from current state to MVP completion:
- **NO timelines** (scope-only)
- **NO resource allocation**
- Dependencies and sequencing shown
- Multi-layer view (Strategic + Tactical)

### Completion Overview

| Metric | Value |
|--------|-------|
| Total Epics | [X] |
| Total Features | [Y] |
| Stories Complete | [A] of ~[B] |
| Coverage | [C]% |

### Roadmap Phases

| Phase | Theme | Epics | Features | Status |
|-------|-------|-------|----------|--------|
| Phase 1 | Foundation | E[X], E[Y] | [N] | [Status] |
| Phase 2 | Core | E[A], E[B] | [N] | [Status] |
| Phase 3 | Domain | E[C], E[D], E[E] | [N] | [Status] |
| Phase 4 | Intelligence | E[F], E[G], E[H] | [N] | [Status] |

---

## 2. STRATEGIC ROADMAP (Epic-Level)

### Phase 1: [Theme Name]

**Goal:** [Phase goal]

| Epic | Name | Features | Stories | MVP Status |
|------|------|----------|---------|------------|
| E[X] | [Name] | [N] | [M] | Core |
| E[Y] | [Name] | [N] | [M] | Core |

**Dependencies:** None (foundation phase)

**Phase Success Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

---

### Phase 2: [Theme Name]

**Goal:** [Phase goal]

| Epic | Name | Features | Stories | MVP Status |
|------|------|----------|---------|------------|
| E[A] | [Name] | [N] | [M] | Core |
| E[B] | [Name] | [N] | [M] | Core |

**Dependencies:** Phase 1 complete

**Phase Success Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

---

### Phase 3: [Theme Name]

**Goal:** [Phase goal]

| Epic | Name | Features | Stories | MVP Status |
|------|------|----------|---------|------------|
| E[C] | [Name] | [N] | [M] | Core |
| E[D] | [Name] | [N] | [M] | Core |
| E[E] | [Name] | [N] | PENDING | Core |

**Dependencies:** Phase 1 complete, Phase 2 recommended

**Phase Success Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

---

### Phase 4: [Theme Name]

**Goal:** [Phase goal]

| Epic | Name | Features | Stories | MVP Status |
|------|------|----------|---------|------------|
| E[F] | [Name] | [N] | PENDING | Core |
| E[G] | [Name] | [N] | PENDING | Core |
| E[H] | [Name] | [N] | PENDING | Core (USP) |

**Dependencies:** Phases 1-3 complete

**Phase Success Criteria:**
- [ ] [Criterion 1]
- [ ] [Criterion 2]

---

## 3. DEPENDENCY MAP

### Visual Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    [PRODUCT NAME] DEPENDENCIES                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  PHASE 1: FOUNDATION                                             │
│  ┌─────────┐     ┌─────────┐                                    │
│  │   E01   │     │   E04   │                                    │
│  │ [Name]  │     │ [Name]  │                                    │
│  └────┬────┘     └────┬────┘                                    │
│       │               │                                          │
│       └───────┬───────┘                                          │
│               ▼                                                   │
│  PHASE 2: CORE CHANNELS                                          │
│  ┌─────────┐     ┌─────────┐                                    │
│  │   E02   │     │   E03   │                                    │
│  │ [Name]  │     │ [Name]  │                                    │
│  └────┬────┘     └────┬────┘                                    │
│       │               │                                          │
│       └───────┬───────┘                                          │
│               ▼                                                   │
│  PHASE 3: DOMAIN FEATURES                                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                           │
│  │   E05   │ │   E06   │ │   E07   │                           │
│  │ [Name]  │ │ [Name]  │ │ [Name]  │                           │
│  └────┬────┘ └────┬────┘ └────┬────┘                           │
│       │           │           │                                  │
│       └───────────┼───────────┘                                  │
│                   ▼                                               │
│  PHASE 4: INTELLIGENCE                                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                           │
│  │   E08   │ │   E09   │ │   E10   │                           │
│  │ [Name]  │ │ [Name]  │ │ [Name]  │                           │
│  └─────────┘ └─────────┘ └─────────┘                           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Critical Path
**E[A] → E[B] → E[C]/E[D]/E[E] → E[F] → E[G] → MVP**

### Parallel Development Opportunities

| Parallel Group | Epics | Condition |
|----------------|-------|-----------|
| Group 1 | E[X], E[Y] | After Phase 1 |
| Group 2 | E[A], E[B], E[C] | After Phase 2 |

### Dependency Details

| Epic | Depends On | Reason |
|------|------------|--------|
| E[X] | None | Foundation epic |
| E[Y] | E[X] | Requires [capability] |
| E[Z] | E[X], E[Y] | Requires [capabilities] |

---

## 4. TACTICAL ROADMAP (Story-Level)

### E[X]: [Epic Name]

**Status:** Stories Complete

**Feature → Story Coverage:**

| Feature | Name | Stories | Coverage |
|---------|------|---------|----------|
| F[X.1] | [Name] | S[XX].1.1, S[XX].1.2 | 100% |
| F[X.2] | [Name] | S[XX].2.1 | 100% |

**Story Summary:**
- Total Stories: [N]
- Must Have: [X]
- Should Have: [Y]
- Could Have: [Z]

**Implementation Phases:**

| Phase | Stories | Deliverable |
|-------|---------|-------------|
| Foundation | S[XX].1.1, S[XX].1.2 | [What] |
| Core | S[XX].2.1, S[XX].3.1 | [What] |

---

### E[Y]: [Epic Name] (PENDING)

**Status:** Stories Not Generated

**Features:**
| Feature | Name | Priority | Estimated Stories |
|---------|------|----------|-------------------|
| F[Y.1] | [Name] | P0 | ~2-3 |
| F[Y.2] | [Name] | P0 | ~2-3 |
| F[Y.3] | [Name] | P1 | ~2-3 |

**Estimated Total:** ~[N] stories

**Action Required:** Run EXPERT-13 with `prd-epics/PRD-Epic-[YY]-[Name].md`

---

[Continue for all epics...]

---

## 5. MVP SCOPE DEFINITION

### Must Have (P0) - MVP Critical

| Epic | Features | Description |
|------|----------|-------------|
| E[X] | F[X.1]-F[X.N] | [Why critical] |
| E[Y] | F[Y.1]-F[Y.N] | [Why critical] |

### Should Have (P1) - MVP Desirable

| Epic | Features | Description |
|------|----------|-------------|
| E[A] | F[A.X] | [Why important] |

### Could Have (P2) - Post-MVP

| Epic | Features | Description |
|------|----------|-------------|
| E[B] | F[B.X] | [Why deferrable] |

### Won't Have (P3) - Explicitly Excluded

| Feature | Reason | Future Consideration |
|---------|--------|----------------------|
| [Feature] | [Reason] | v[X.X] |

---

## 6. FEATURE-TO-STORY COVERAGE MATRIX

### Complete Coverage (E[X]-E[Y])

| Feature | Feature Name | Epic | Stories | Coverage |
|---------|--------------|------|---------|----------|
| F1.1 | [Name] | E1 | S01.1.1, S01.1.2 | 100% |
| F1.2 | [Name] | E1 | S01.2.1 | 100% |

### Pending Coverage (E[A]-E[B])

| Feature | Feature Name | Epic | Stories | Coverage |
|---------|--------------|------|---------|----------|
| F[A.1] | [Name] | E[A] | PENDING | 0% |
| F[A.2] | [Name] | E[A] | PENDING | 0% |

### Coverage Summary

| Status | Features | Percentage |
|--------|----------|------------|
| Complete | [X] | [Y]% |
| Pending | [A] | [B]% |
| **Total** | [N] | 100% |

---

## 7. GAP ANALYSIS & ACTIONS

### Story Generation Gaps

| Epic | Features | Est. Stories | Action | Priority |
|------|----------|--------------|--------|----------|
| E[X] | [N] | ~[M] | Run EXPERT-13 with PRD-Epic-[XX] | High |
| E[Y] | [N] | ~[M] | Run EXPERT-13 with PRD-Epic-[YY] | High |

### Recommended Gap Resolution Sequence

1. **E[X]**: [Reason - e.g., "Completes domain layer"]
2. **E[Y]**: [Reason - e.g., "Enables intelligence features"]
3. **E[Z]**: [Reason - e.g., "Core USP, needs detailed stories"]

### Gap Impact

| Gap | Impact on Roadmap |
|-----|-------------------|
| E[X] stories missing | Tactical layer incomplete for Phase 3 |
| E[Y] stories missing | Cannot detail Phase 4 implementation |

---

## 8. SUCCESS CRITERIA BY PHASE

### Phase 1: [Theme] Success

| Criterion | Metric | Target |
|-----------|--------|--------|
| [Criterion 1] | [Metric] | [Target] |
| [Criterion 2] | [Metric] | [Target] |

### Phase 2: [Theme] Success

| Criterion | Metric | Target |
|-----------|--------|--------|
| [Criterion 1] | [Metric] | [Target] |
| [Criterion 2] | [Metric] | [Target] |

### Phase 3: [Theme] Success

| Criterion | Metric | Target |
|-----------|--------|--------|
| [Criterion 1] | [Metric] | [Target] |
| [Criterion 2] | [Metric] | [Target] |

### Phase 4: [Theme] Success

| Criterion | Metric | Target |
|-----------|--------|--------|
| [Criterion 1] | [Metric] | [Target] |
| [Criterion 2] | [Metric] | [Target] |

### MVP Launch Success

| Criterion | Metric | Target |
|-----------|--------|--------|
| [Overall 1] | [Metric] | [Target] |
| [Overall 2] | [Metric] | [Target] |

---

## 9. COMPETITIVE DIFFERENTIATION MAPPING

### Features Creating Competitive Advantage

| Feature | Epic | Differentiation | Competitors Lack |
|---------|------|-----------------|------------------|
| [Feature] | E[X] | [What makes it unique] | [Who lacks it] |
| [Feature] | E[Y] | [What makes it unique] | [Who lacks it] |

### Unique Capabilities by Phase

| Phase | Unique Capability | Why It Matters |
|-------|-------------------|----------------|
| Phase 3 | [Capability] | [Business impact] |
| Phase 4 | [Capability] | [Business impact] |

---

## APPENDIX A: Epic PRD References

| Epic | PRD Location |
|------|--------------|
| E01 | `prd-epics/PRD-Epic-01-[Name].md` |
| E02 | `prd-epics/PRD-Epic-02-[Name].md` |

## APPENDIX B: Story File References

| Epic | Story Location | Status |
|------|----------------|--------|
| E01 | `stories/Epic-01-Stories.md` | Complete |
| E02 | `stories/Epic-02-Stories.md` | Complete |
| E07 | — | PENDING |

## APPENDIX C: Related Documents

| Document | Location |
|----------|----------|
| Vision | `[Path]` |
| Master PRD | `[Path]` |
| Design System | `design/` |

---

**Roadmap Established:** [Date]
**Next Action:** [Action]
**Roadmap Owner:** [Name]

---

*[Product Name] Product Roadmap v1.0 | Xyric Solutions | [Date]*

<!-- ROADMAP_COMPLETE: {PRODUCT-CODE} -->
```

---

## Gap Handling Strategy

### When Stories Are Missing

1. **Identify the Gap**
   - List epics without story files
   - Note feature count from Epic PRD

2. **Estimate Story Count**
   - Rule of thumb: ~2-3 stories per feature
   - Reference completed epics for product-specific patterns
   - E.g., "E1 has 6 features and 15 stories = 2.5 stories/feature"

3. **Document the Action**
   - "Run EXPERT-13 with [Epic PRD path]"
   - Link to Epic PRD file

4. **Include in Coverage Matrix**
   - Show feature coverage as 0%
   - Flag status as PENDING

5. **Don't Block Roadmap**
   - Strategic layer can complete with estimates
   - Tactical layer shows gaps clearly
   - Roadmap is still useful for planning

### Estimation Heuristics

| Epic Complexity | Stories per Feature |
|-----------------|---------------------|
| Simple (UI-only) | 1-2 |
| Medium (API + UI) | 2-3 |
| Complex (Integration) | 3-4 |
| Very Complex (AI/ML) | 4-5 |

---

## Quality Checklist

### Strategic Layer Checks
- [ ] All epics from PRD included
- [ ] Phases reflect logical dependency order
- [ ] Dependencies shown (visual + table)
- [ ] MVP status per epic shown
- [ ] Critical path identified

### Tactical Layer Checks
- [ ] Story counts accurate for complete epics
- [ ] Gaps clearly identified for incomplete epics
- [ ] Feature-to-story mapping complete
- [ ] Dependencies shown at story level (where available)

### Completeness Checks
- [ ] Coverage matrix complete (100% features)
- [ ] Gap analysis with actions
- [ ] Success criteria included (per user preference)
- [ ] No placeholder content
- [ ] All sections from template present

### Dependency Checks
- [ ] No circular dependencies
- [ ] All dependencies have reasons
- [ ] Critical path is logical
- [ ] Parallel opportunities identified

---

## Anti-Patterns

### DO NOT

1. **Include timelines**
   - No dates, sprints, or deadlines
   - Scope-only focus

2. **Include resource allocation**
   - No team assignments
   - No headcount planning

3. **Include effort estimates**
   - No story points
   - No T-shirt sizes

4. **Block on missing stories**
   - Estimate and document gaps
   - Generate roadmap with what's available

5. **Generate without questions**
   - Always ask 7 clarification questions
   - User input ensures alignment

6. **Copy PRD verbatim**
   - Synthesize and structure for roadmap format
   - Add dependency analysis and phasing

7. **Ignore dependencies**
   - Dependencies determine phase order
   - Show critical path clearly

8. **Skip validation**
   - 100% feature coverage required
   - All gaps must be documented

---

## Activation Checklist

When this skill is activated:

**Phase 0: Research**
1. [ ] Locate Master PRD for product
2. [ ] Locate all Epic PRDs
3. [ ] Locate all Story files (note missing)
4. [ ] Build dependency graph
5. [ ] Identify gaps
6. [ ] Generate Product Analysis Summary (~400 words)

**Phase 1: Questions**
7. [ ] Present Product Analysis to user
8. [ ] Show coverage status
9. [ ] Ask 7 tailored clarification questions
10. [ ] **WAIT for user responses**

**Phase 2: Generation**
11. [ ] Apply user decisions
12. [ ] Build Strategic Layer (phases)
13. [ ] Build Tactical Layer (stories/estimates)
14. [ ] Create Dependency Map
15. [ ] Create Coverage Matrix
16. [ ] Document Gaps with Actions

**Phase 3: Validation (Blocking)**
17. [ ] Verify 100% feature coverage
18. [ ] Verify no circular dependencies
19. [ ] Verify all gaps documented
20. [ ] Verify all sections present
21. [ ] If fails → return to Phase 2 and fix

**Phase 4: Output**
22. [ ] Write to PRODUCTS/{product}/Roadmap.md
23. [ ] Update PROGRESS.md
24. [ ] Present completion summary

---

## Integration with Other Skills

### Upstream (Inputs)
- **EXPERT-20**: Vision provides strategic context
- **EXPERT-21**: PRD provides features and epics
- **EXPERT-22**: Epic overview provides structure
- **EXPERT-23**: Epic PRDs provide feature details
- **EXPERT-13**: Stories provide tactical detail

### Downstream (Outputs)
- Roadmap informs sprint planning
- Roadmap informs stakeholder communication
- Roadmap identifies next actions (story generation gaps)

### Cross-Reference Skills
- **EXPERT-10**: Product Manager for MoSCoW alignment
- **CORE-03**: Assumption Challenge for scope decisions
- **BI-02**: Questions framework for success criteria

---

*Skill EXPERT-24 v1.0 | Xyric Solutions | 2025-12-11*
*4-Phase Scope-Focused Roadmap Generator | Multi-Layer Output | Gap-Tolerant*
