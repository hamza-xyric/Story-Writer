# EXPERT-15: Task Generator

**Skill ID**: EXPERT-15
**Category**: Expert Agents
**Priority**: Critical
**Version**: 2.0
**Last Updated**: 2025-12-09
**Architecture**: 4-Phase Workflow with Blocking Validation
**Type**: Generator (Bulk Output)
**TDD**: Tests Before Implementation

---

## Purpose

Transform a Technical Specification from EXPERT-14 into ALL implementation tasks, with assignments to appropriate engineers and dependency mapping. This skill generates the complete task breakdown for a story.

**Core Philosophy**: Tasks are the atomic units of engineering work. Each task is small enough to complete in one work session, has clear acceptance criteria, and can be assigned to a specific engineer role.

---

## When to Activate

### Trigger Phrases
- "Generate tasks from tech spec"
- "Create tasks for story [ID]"
- "Break down spec into tasks"
- "Task breakdown for [story]"
- "Implementation tasks from spec"
- "Generate all tasks for [spec]"

### Related Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-14** (Story Spec Generator) | Tech Spec → Tasks (upstream) |
| **EXPERT-16** (Task Spec Generator) | Task → Implementation Guide (downstream) |
| **EXPERT-03** (Software Architect) | Architecture decisions, ADR creation |
| **EXPERT-04** (Test Engineer) | Test specifications, TDD guidance |
| **DEV-02** (Code Review) | Review criteria alignment |
| **EXPERT-01** (Backend Engineer) | Backend task assignments |
| **EXPERT-02** (Frontend Engineer) | Frontend task assignments |
| **EXPERT-05** (Fullstack Engineer) | Fullstack task assignments |

---

## Required Context Sources

Before generating tasks, gather context from available sources:

| Priority | Source | Path Pattern | Extract |
|----------|--------|--------------|---------|
| Critical | Tech Spec | `PRODUCTS/{product}/specs/Story-*-Spec.md` | All sections |
| High | Story File | `PRODUCTS/{product}/stories/Epic-XX-Stories.md` | Story context |
| Medium | Epic PRD | `PRODUCTS/{product}/prd-epics/PRD-Epic-XX-*.md` | Feature context |
| Medium | PROGRESS.md | `PRODUCTS/{product}/PROGRESS.md` | Team context |
| Low | Existing Tasks | `PRODUCTS/{product}/tasks/*.md` | Task patterns |

**Key Principle:** Technical Specification from EXPERT-14 is the PRIMARY input. Tasks map to spec sections and acceptance criteria.

---

## Task Categories & TDD Ordering

### Task Category Framework

Tasks are organized into four categories that enforce TDD and proper sequencing:

| Category | Code | Description | Assignee | Phase |
|----------|------|-------------|----------|-------|
| **Architecture** | ARCH | Architecture decisions | EXPERT-03 | 1st |
| **Test** | TEST | Test specifications | EXPERT-04 | 2nd |
| **Implementation** | IMPL | Implementation code | EXPERT-01/02/05 | 3rd |
| **Integration** | INTG | Integration & review | DEV-02 review | 4th |

### TDD Task Ordering (MANDATORY)

```
┌─────────────────────────────────────────────────────────────────┐
│                    TDD TASK ORDERING PATTERN                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  PHASE 1: ARCH Tasks (Architecture First)                        │
│  ├── Design decisions that impact implementation                 │
│  ├── ADR creation for significant choices                        │
│  └── Invoke: EXPERT-03 (Software Architect)                      │
│                                                                   │
│  PHASE 2: TEST Tasks (Tests Before Code)                         │
│  ├── Write test specifications BEFORE implementation             │
│  ├── Define expected behavior and contracts                      │
│  └── Invoke: EXPERT-04 (Test Engineer)                           │
│                                                                   │
│  PHASE 3: IMPL Tasks (Implementation)                            │
│  ├── Write code to make tests pass                               │
│  ├── Follow architecture decisions from Phase 1                  │
│  └── Invoke: EXPERT-01/02/05 (Engineers)                         │
│                                                                   │
│  PHASE 4: INTG Tasks (Integration & Review)                      │
│  ├── Integration testing across components                       │
│  ├── Code review alignment                                        │
│  └── Invoke: DEV-02 (Code Review)                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Implementation Types (Within IMPL Category)

| Type | Description | Typical Assignee |
|------|-------------|------------------|
| **Backend** | API, database, services | EXPERT-01 |
| **Frontend** | UI, components, state | EXPERT-02 |
| **Fullstack** | Cross-cutting concerns | EXPERT-05 |
| **DevOps** | Infrastructure, CI/CD | EXPERT-05 |

### Engineer Roles

| Role | Expertise | Task Types |
|------|-----------|------------|
| **EXPERT-03** | Architecture | ARCH tasks, ADR creation |
| **EXPERT-04** | Testing | TEST tasks, TDD guidance |
| **EXPERT-01** | Backend | IMPL:Backend, INTG:Backend |
| **EXPERT-02** | Frontend | IMPL:Frontend, INTG:Frontend |
| **EXPERT-05** | Fullstack | IMPL:Fullstack, IMPL:DevOps, INTG:E2E |
| **DEV-02** | Review | INTG review alignment |

---

## Task Complexity Sizing

| Size | Effort | Typical Duration | Example |
|------|--------|------------------|---------|
| **S** (Small) | 1-2 hours | Half day | Add validation, fix bug |
| **M** (Medium) | 2-4 hours | Full day | New component, simple API |
| **L** (Large) | 4-8 hours | 1-2 days | Complex feature, integration |
| **XL** (Extra Large) | 8+ hours | 2-4 days | Major feature, architecture |

**Principle:** If a task is XL, consider splitting it into smaller tasks.

---

## MoSCoW Priority Distribution

### Priority Enforcement (MANDATORY)

All task breakdowns MUST follow the MoSCoW distribution:

| Priority | Target | Description |
|----------|--------|-------------|
| **MUST** | ~60% | Critical path, story fails without these |
| **SHOULD** | ~20% | Important but story functions without |
| **COULD** | ~20% | Nice-to-have, quality improvements |

### Priority Mapping

| MoSCoW | Task Priority | Criteria |
|--------|---------------|----------|
| MUST | P0, P1 | Acceptance criteria directly depend on it |
| SHOULD | P1, P2 | Improves quality but not blocking |
| COULD | P2, P3 | Enhancement, optimization, polish |

### Distribution Validation

```markdown
## MoSCoW Distribution Check

| Priority | Count | Percentage | Target | Status |
|----------|-------|------------|--------|--------|
| MUST | [X] | [Y]% | ~60% | ✅/⚠️ |
| SHOULD | [X] | [Y]% | ~20% | ✅/⚠️ |
| COULD | [X] | [Y]% | ~20% | ✅/⚠️ |

⚠️ WARNING: MUST > 70% indicates over-scoping
⚠️ WARNING: COULD > 30% indicates scope creep
```

---

## Four-Phase Interactive Workflow

### Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 0: RESEARCH (Automated)                 │
├─────────────────────────────────────────────────────────────────┤
│  1. Read Technical Specification for target story                │
│  2. Extract API contracts, data models, UI components            │
│  3. Identify testable acceptance criteria                        │
│  4. Map spec sections to task types                              │
│  OUTPUT: Spec Task Analysis (~250 words)                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: ANALYSIS & QUESTIONS                 │
├─────────────────────────────────────────────────────────────────┤
│  5. Present spec analysis to user                                │
│  6. Propose task structure and assignments                       │
│  7. Ask 4 tailored questions                                     │
│  8. ═══════════════ WAIT FOR USER INPUT ════════════════════════│
│  9. (Optional) Ask follow-up questions if needed                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2: GENERATION (TDD Sequential)          │
├─────────────────────────────────────────────────────────────────┤
│  10. Apply user decisions to task structure                      │
│  11. Generate tasks in TDD ORDER:                                │
│      ├── ARCH tasks first (invoke EXPERT-03)                     │
│      ├── TEST tasks second (invoke EXPERT-04)                    │
│      ├── IMPL tasks third (EXPERT-01/02/05)                      │
│      └── INTG tasks last (DEV-02 review)                         │
│  12. Validate MoSCoW distribution (60/20/20)                     │
│  OUTPUT: TDD-Ordered Task Breakdown + Dependency Graph           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: VALIDATION (Blocking)                │
├─────────────────────────────────────────────────────────────────┤
│  13. SPEC COVERAGE: All spec sections have tasks                 │
│  14. CRITERIA COVERAGE: All acceptance criteria addressed        │
│  15. TDD ORDER CHECK: ARCH → TEST → IMPL → INTG                  │
│  16. MOSCOW CHECK: ~60% MUST / ~20% SHOULD / ~20% COULD         │
│  17. DEPENDENCY CHECK: No circular dependencies                  │
│  18. ASSIGNMENT CHECK: All tasks have correct skill assignee     │
│  IF ANY CHECK FAILS → Return to Phase 2, fix, re-validate      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4: OUTPUT & TRACKING                    │
├─────────────────────────────────────────────────────────────────┤
│  16. Write to tasks/Story-[ID]-Tasks.md                         │
│  17. Update PROGRESS.md with session details                     │
│  18. Output pipeline hooks for EXPERT-16 (Task Spec Generator)  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Phase 0: Research & Context Gathering

**Purpose:** Extract all technical components from spec to map to tasks.

**Step 1: Read Technical Specification**

Locate spec at: `specs/Story-[ID]-Spec.md`

**Step 2: Extract Spec Components**

Parse each spec section:
- API Contracts → Backend tasks
- Data Models → Database tasks
- UI Components → Frontend tasks
- Integration Points → Integration tasks
- Testing Strategy → Testing tasks
- Security Requirements → Security tasks

**Step 3: Map to Tasks**

Create mapping:

| Spec Section | Components | Task Type |
|--------------|------------|-----------|
| API Contracts | [Count] endpoints | Backend |
| Data Models | [Count] entities | Backend |
| UI Components | [Count] components | Frontend |
| Integration | [Count] integrations | Fullstack |
| Testing | [Layers] | Mixed |

**Step 4: Create Spec Task Analysis**

```markdown
## Spec Task Analysis: Story [ID]

### Story Summary
**ID:** S[XX.YY.ZZ]
**Title:** [Title]
**Spec Location:** specs/Story-[ID]-Spec.md

### Spec Components

**API Contracts:**
- [Count] endpoints to implement
- [List of endpoints]

**Data Models:**
- [Count] entities
- [Count] schema changes
- [List of entities]

**UI Components:**
- [Count] components
- [List of components]

**Integrations:**
- [Count] internal integrations
- [Count] external integrations

**Testing:**
- Unit tests: [Scope]
- Integration tests: [Scope]
- E2E tests: [Scope]

### Proposed Task Breakdown

| Type | Count | Assignee |
|------|-------|----------|
| Backend | [X] | EXPERT-01 |
| Frontend | [X] | EXPERT-02 |
| Fullstack | [X] | EXPERT-05 |
| Testing | [X] | Mixed |
| **Total** | **[X]** | |

### Acceptance Criteria to Cover
- AC1: [Criterion] → [Tasks]
- AC2: [Criterion] → [Tasks]
- AC3: [Criterion] → [Tasks]
```

---

### Phase 1: Questions & User Input

**INPUT:** Spec Task Analysis from Phase 0

**Step 1: Present Analysis to User**

Show the Spec Task Analysis. User sees:
- Spec component counts
- Proposed task breakdown
- Acceptance criteria mapping

**Step 2: Tailored Questions**

#### Question Framework (4 Questions)

**STRUCTURE (2 Questions)**

**Q1. Task Granularity**
```markdown
Based on the spec, I propose [X] tasks:

| Category | Tasks | Example |
|----------|-------|---------|
| Backend | [X] | Create API endpoint for [resource] |
| Frontend | [X] | Build [Component] component |
| Integration | [X] | Wire [frontend] to [API] |
| Testing | [X] | Write unit tests for [layer] |

Questions:
a) Is this granularity appropriate?
   - Too granular (combine some tasks)?
   - Too coarse (split some tasks)?
   - Just right

b) Any areas that need more detail?
   - [Area 1]
   - [Area 2]

c) Any areas that can be simplified?
   - [Area 1]
   - [Area 2]
```

**Q2. Task Dependencies**
```markdown
Proposed execution order:

**Phase 1 (Foundation):**
- T1: [Database/Schema tasks]
- T2: [Core API tasks]

**Phase 2 (Features):**
- T3-T5: [Remaining API tasks]
- T6-T8: [UI component tasks]

**Phase 3 (Integration):**
- T9-T10: [Integration tasks]

**Phase 4 (Quality):**
- T11-T13: [Testing tasks]

Questions:
a) Does this execution order make sense?
b) Any tasks that can run in parallel?
c) Any dependencies I missed?
d) Any tasks that should be earlier/later?
```

**ASSIGNMENT (1 Question)**

**Q3. Engineer Assignments**
```markdown
Proposed assignments:

| Role | Tasks | Effort |
|------|-------|--------|
| EXPERT-01 (Backend) | T1, T2, T3, T11 | [X] hours |
| EXPERT-02 (Frontend) | T6, T7, T8, T12 | [X] hours |
| EXPERT-05 (Fullstack) | T4, T5, T9, T10, T13 | [X] hours |

Questions:
a) Are these assignments appropriate?
b) Any tasks that need a different engineer?
c) Workload balance acceptable?
d) Any tasks that need collaboration?
```

**PRIORITY (1 Question)**

**Q4. Priority & Scheduling**
```markdown
Questions:
a) Task priorities - any critical path items?
   - P0 (blocking): [Suggested]
   - P1 (high): [Suggested]
   - P2 (medium): [Suggested]
   - P3 (low): [Suggested]

b) Sprint allocation:
   - Sprint 1: [Tasks]
   - Sprint 2: [Tasks]
   - Backlog: [Tasks]

c) Any time-sensitive tasks?
   - External dependency deadlines
   - Integration timing

d) Definition of done for this story?
   - All tasks complete
   - Tests passing
   - Code reviewed
   - Deployed to staging
```

---

### Phase 2: Task Generation (TDD Order)

**INPUTS (from previous phases):**
- Spec Task Analysis from Phase 0
- User Answers from Phase 1

**Step 1: Apply User Decisions**

Map user answers to task structure:

| Decision | Impact on Tasks |
|----------|-----------------|
| Granularity | Task count and scope |
| Dependencies | Execution order |
| Assignments | Skill roles (EXPERT-XX) |
| Priorities | MoSCoW distribution |

**Step 2: Generate Tasks in TDD Order (MANDATORY)**

Generate tasks in STRICT category order:

```
1. ARCH Tasks (Architecture Decisions)
   ├── Invoke: EXPERT-03 (Software Architect)
   ├── ADR creation for significant decisions
   └── Design patterns to apply

2. TEST Tasks (Test Specifications)
   ├── Invoke: EXPERT-04 (Test Engineer)
   ├── Unit test specifications
   ├── Integration test specifications
   └── E2E test specifications

3. IMPL Tasks (Implementation)
   ├── IMPL:Backend → EXPERT-01
   ├── IMPL:Frontend → EXPERT-02
   └── IMPL:Fullstack → EXPERT-05

4. INTG Tasks (Integration & Review)
   ├── Integration testing
   ├── Review criteria alignment
   └── Invoke: DEV-02 (Code Review)
```

**Step 3: For Each Task**

Sequentially define:
1. Task category (ARCH/TEST/IMPL/INTG)
2. Task title and description
3. Assign to correct skill (EXPERT-XX)
4. Set MoSCoW priority
5. Set complexity
6. Write acceptance criteria
7. Document dependencies
8. Add technical notes

**Task Structure:**

```markdown
### T[Story].[Seq]: [Task Title]

**Category:** ARCH | TEST | IMPL | INTG
**Type:** Architecture | Test | Backend | Frontend | Fullstack | DevOps | Integration
**Assignee:** EXPERT-03 | EXPERT-04 | EXPERT-01 | EXPERT-02 | EXPERT-05 | DEV-02
**MoSCoW:** MUST | SHOULD | COULD
**Priority:** P0 | P1 | P2 | P3
**Complexity:** S | M | L | XL
**Estimated Effort:** [X] hours

**Description:**
[Clear description of what needs to be done]

**Acceptance Criteria:**
- [ ] [Criterion 1 - specific and testable]
- [ ] [Criterion 2 - specific and testable]
- [ ] [Criterion 3 - specific and testable]

**Technical Notes:**
- [Implementation hint 1]
- [Implementation hint 2]
- [Reference to spec section]

**Skill Invocation:**
- Invoke: [EXPERT-XX] for [specific purpose]

**Dependencies:**
- T[X.Y]: [Why this must complete first]

**Definition of Done:**
- [ ] Task-specific criteria met
- [ ] Tests passing (if IMPL/INTG)
- [ ] Code reviewed (if IMPL)
- [ ] Skill output documented
```

**Step 3: Build Dependency Graph**

Create visual dependency map:

```
T1 (Database) ─────┬───▶ T3 (API 1) ─────┬───▶ T6 (UI 1) ─────┐
                   │                     │                      │
T2 (Schema) ───────┤                     ├───▶ T7 (UI 2) ──────┼───▶ T9 (Integration)
                   │                     │                      │
                   └───▶ T4 (API 2) ─────┴───▶ T8 (UI 3) ──────┘
                              │
                              └───▶ T5 (API 3) ───▶ T10 (E2E Tests)
```

---

### Phase 3: Validation (Blocking)

**Purpose:** Quality gate - must pass ALL checks before output.

**Critical Checks (Block if Fail):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Spec Coverage** | All spec sections have tasks | Add missing tasks |
| **Criteria Coverage** | All acceptance criteria addressed | Map to tasks |
| **TDD Order** | ARCH → TEST → IMPL → INTG sequence | Reorder tasks |
| **MoSCoW Distribution** | ~60% MUST / ~20% SHOULD / ~20% COULD | Adjust priorities |
| **Skill Assignment** | Correct EXPERT-XX for each category | Fix assignments |
| **No Circular Dependencies** | Dependency graph is acyclic | Resolve cycles |

**Quality Checks (Warning → Block if >3):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Task Sizing** | No XL tasks without justification | Consider splitting |
| **Acceptance Criteria** | All tasks have 2+ criteria | Add criteria |
| **Technical Notes** | Complex tasks have hints | Add notes |
| **Effort Estimates** | All tasks have estimates | Add estimates |
| **Skill Invocation** | Complex tasks reference skill | Add invocation |

**Coverage Matrix:**

```markdown
| Spec Section | Task(s) | Coverage |
|--------------|---------|----------|
| API Contracts | T1-T5 | ✅ 100% |
| Data Models | T6 | ✅ 100% |
| UI Components | T7-T10 | ✅ 100% |
| Integration | T11-T12 | ✅ 100% |
| Testing | T13-T15 | ✅ 100% |
```

**Validation Output:**
- ✅ All checks pass → Proceed to Phase 4
- ❌ Any critical check fails → Return to Phase 2

---

### Phase 4: Output & Tracking

**Step 1: Write Task Breakdown File**

Create: `PRODUCTS/{product}/tasks/Story-[ID]-Tasks.md`

**Step 2: Update PROGRESS.md**

Add session entry:
- Session timestamp
- Story: [Story ID]
- Tasks generated: [count]
- Ready for implementation

**Step 3: Output Pipeline Hooks**

For each task, include hook for EXPERT-16:
- Task ID
- Format: `<!-- TASK_SPEC_READY: T[ID] -->`

---

## Task Breakdown Document Template

```markdown
# Task Breakdown: Story [ID]
**[Story Title]**

---

## DOCUMENT INFORMATION

| Attribute | Value |
|-----------|-------|
| **Story ID** | S[XX.YY.ZZ] |
| **Story Title** | [Title] |
| **Tech Spec** | specs/Story-[ID]-Spec.md |
| **Version** | 1.0 |
| **Status** | Draft / Review / Approved |
| **Author** | [Name] |
| **Last Updated** | [Date] |

---

## TASK SUMMARY

### Overview Statistics

| Metric | Value |
|--------|-------|
| Total Tasks | [X] |
| Backend Tasks | [X] |
| Frontend Tasks | [X] |
| Fullstack Tasks | [X] |
| Testing Tasks | [X] |
| Total Estimated Effort | [X] hours |

### Task Index (TDD Ordered)

| Task | Category | Title | Type | Assignee | MoSCoW | Complexity | Est. |
|------|----------|-------|------|----------|--------|------------|------|
| T[S].01 | ARCH | [Architecture Decision] | Architecture | EXPERT-03 | MUST | M | 2h |
| T[S].02 | TEST | [Unit Test Spec] | Test | EXPERT-04 | MUST | M | 4h |
| T[S].03 | TEST | [Integration Test Spec] | Test | EXPERT-04 | MUST | M | 3h |
| T[S].04 | IMPL | [Backend Implementation] | Backend | EXPERT-01 | MUST | L | 6h |
| T[S].05 | IMPL | [Frontend Implementation] | Frontend | EXPERT-02 | MUST | M | 4h |
| T[S].06 | IMPL | [API Integration] | Fullstack | EXPERT-05 | SHOULD | M | 4h |
| T[S].07 | INTG | [E2E Integration] | Integration | EXPERT-05 | SHOULD | S | 2h |
| T[S].08 | INTG | [Code Review Alignment] | Review | DEV-02 | COULD | S | 1h |
| ... | ... | ... | ... | ... | ... | ... | ... |

### Effort by Role

| Role | Tasks | Total Effort |
|------|-------|--------------|
| EXPERT-03 (Architecture) | T[S].01 | [X] hours |
| EXPERT-04 (Testing) | T[S].02, T[S].03 | [X] hours |
| EXPERT-01 (Backend) | T[S].04 | [X] hours |
| EXPERT-02 (Frontend) | T[S].05 | [X] hours |
| EXPERT-05 (Fullstack) | T[S].06, T[S].07 | [X] hours |
| DEV-02 (Review) | T[S].08 | [X] hours |
| **Total** | **[X] tasks** | **[X] hours** |

### MoSCoW Distribution

| Priority | Count | Percentage | Target | Status |
|----------|-------|------------|--------|--------|
| MUST | [X] | [Y]% | ~60% | ✅/⚠️ |
| SHOULD | [X] | [Y]% | ~20% | ✅/⚠️ |
| COULD | [X] | [Y]% | ~20% | ✅/⚠️ |

### TDD Category Distribution

| Category | Count | Percentage |
|----------|-------|------------|
| ARCH | [X] | [Y]% |
| TEST | [X] | [Y]% |
| IMPL | [X] | [Y]% |
| INTG | [X] | [Y]% |

---

## DEPENDENCY GRAPH

### Visual Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    STORY [ID] TASK DEPENDENCIES                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────┐                                                     │
│  │  T[S].01│ ← Foundation                                        │
│  │  [Name] │                                                     │
│  └────┬────┘                                                     │
│       │                                                           │
│  ┌────┴────┐                                                     │
│  │         │                                                     │
│  ▼         ▼                                                     │
│ ┌─────────┐ ┌─────────┐                                         │
│ │  T[S].02│ │  T[S].03│ ← Can run in parallel                   │
│ │  [Name] │ │  [Name] │                                         │
│ └────┬────┘ └────┬────┘                                         │
│      │           │                                               │
│      └─────┬─────┘                                               │
│            ▼                                                     │
│      ┌─────────┐                                                 │
│      │  T[S].04│ ← Integration point                            │
│      │  [Name] │                                                 │
│      └────┬────┘                                                 │
│           │                                                       │
│           ▼                                                       │
│      ┌─────────┐                                                 │
│      │  T[S].05│ ← Final testing                                │
│      │  [Name] │                                                 │
│      └─────────┘                                                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Dependency Table

| Task | Depends On | Blocks |
|------|------------|--------|
| T[S].01 | None | T[S].02, T[S].03 |
| T[S].02 | T[S].01 | T[S].04 |
| T[S].03 | T[S].01 | T[S].04 |
| T[S].04 | T[S].02, T[S].03 | T[S].05 |
| T[S].05 | T[S].04 | None |

### Critical Path

```
T[S].01 → T[S].02 → T[S].04 → T[S].05
```

**Critical Path Duration:** [X] hours

---

## TASK DETAILS

### T[S].01: [Architecture Decision - Title]

**Category:** ARCH
**Type:** Architecture
**Assignee:** EXPERT-03 (Software Architect)
**MoSCoW:** MUST
**Priority:** P0 (Critical - Must decide first)
**Complexity:** M (Medium)
**Estimated Effort:** 2 hours

#### Description
[2-3 sentences clearly describing the architecture decision needed. Include context about why this decision is necessary and what it impacts.]

#### Decision Points
- [ ] [Decision 1 - specific choice to make]
- [ ] [Decision 2 - specific choice to make]

#### Acceptance Criteria
- [ ] ADR document created (if significant)
- [ ] Pattern selection documented
- [ ] Rationale captured

#### Skill Invocation
- **Invoke:** EXPERT-03 for architecture decision
- **Output:** ADR document or decision record

#### Dependencies
- **Upstream:** None (foundation task - first in TDD order)
- **Downstream:** TEST tasks depend on this

#### Definition of Done
- [ ] Decision documented
- [ ] Rationale clear
- [ ] Downstream tasks unblocked

<!-- TASK_SPEC_READY: T[S].01 -->

---

### T[S].02: [Test Specification - Title]

**Category:** TEST
**Type:** Test
**Assignee:** EXPERT-04 (Test Engineer)
**MoSCoW:** MUST
**Priority:** P0 (Critical - Tests before code)
**Complexity:** M (Medium)
**Estimated Effort:** 4 hours

#### Description
[2-3 sentences clearly describing what test specifications are needed. Tests are written BEFORE implementation (TDD).]

#### Test Coverage Required
- [ ] Unit tests for [components]
- [ ] Integration tests for [integrations]
- [ ] Edge cases covered

#### Acceptance Criteria
- [ ] Test specification complete
- [ ] Expected behavior documented
- [ ] Test data defined

#### Skill Invocation
- **Invoke:** EXPERT-04 for test specification
- **Output:** Test spec ready for implementation

#### Dependencies
- **Upstream:** T[S].01 (ARCH - architecture decisions)
- **Downstream:** IMPL tasks implement to pass these tests

#### Definition of Done
- [ ] Test specification documented
- [ ] Expected outcomes defined
- [ ] Ready for IMPL phase

<!-- TASK_SPEC_READY: T[S].02 -->

---

### T[S].04: [Implementation - Title]

**Category:** IMPL
**Type:** Backend
**Assignee:** EXPERT-01 (Backend Engineer)
**MoSCoW:** MUST
**Priority:** P1 (High)
**Complexity:** L (Large)
**Estimated Effort:** 6 hours

#### Description
[2-3 sentences clearly describing what needs to be implemented. Code should make the TEST spec tests pass.]

#### Acceptance Criteria
- [ ] [Criterion 1 - specific and testable]
- [ ] [Criterion 2 - specific and testable]
- [ ] [Criterion 3 - specific and testable]
- [ ] All TEST spec tests pass

#### Technical Notes
- Reference: Tech Spec Section [X]
- Architecture decision: T[S].01
- Tests to pass: T[S].02

#### Skill Invocation
- **Invoke:** EXPERT-01 for backend implementation
- **Handoff:** EXPERT-16 for implementation guide

#### Dependencies
- **Upstream:** T[S].01 (ARCH), T[S].02 (TEST)
- **Downstream:** T[S].07 (INTG)

#### Definition of Done
- [ ] Code complete and committed
- [ ] All tests from T[S].02 passing
- [ ] Ready for integration

<!-- TASK_SPEC_READY: T[S].04 -->

---

### T[S].07: [Integration - Title]

**Category:** INTG
**Type:** Integration
**Assignee:** EXPERT-05 (Fullstack Engineer)
**MoSCoW:** SHOULD
**Priority:** P2 (Medium)
**Complexity:** M (Medium)
**Estimated Effort:** 4 hours

#### Description
[2-3 sentences clearly describing the integration work. Verify all components work together.]

#### Acceptance Criteria
- [ ] All IMPL tasks integrated
- [ ] E2E tests passing
- [ ] No regression in existing functionality

#### Integration Points
- [ ] [Component A] ↔ [Component B]
- [ ] [API] ↔ [Frontend]

#### Skill Invocation
- **Invoke:** DEV-02 for review alignment
- **Output:** Integration verified, ready for review

#### Dependencies
- **Upstream:** T[S].04, T[S].05, T[S].06 (all IMPL tasks)
- **Downstream:** None (final integration)

#### Definition of Done
- [ ] All components integrated
- [ ] E2E tests passing
- [ ] Ready for code review

<!-- TASK_SPEC_READY: T[S].07 -->

---

[Continue for all tasks in TDD order: ARCH → TEST → IMPL → INTG]

---

## SPRINT ALLOCATION

### Suggested Sprint Assignment

| Sprint | Tasks | Focus | Total Effort |
|--------|-------|-------|--------------|
| Sprint 1 | T[S].01, T[S].02, T[S].03 | Foundation + Core | [X] hours |
| Sprint 2 | T[S].04, T[S].05, T[S].06 | Integration + Testing | [X] hours |

### Parallel Work Opportunities

| Engineer | Sprint 1 | Sprint 2 |
|----------|----------|----------|
| EXPERT-01 | T[S].01, T[S].02 | T[S].06 |
| EXPERT-02 | T[S].03 | T[S].04 (after T[S].02) |
| EXPERT-05 | Support | T[S].05 |

---

## SPEC COVERAGE MATRIX

### Spec Section → Task Mapping

| Spec Section | Component | Task(s) | Status |
|--------------|-----------|---------|--------|
| API Contracts | POST /resource | T[S].01 | ✅ |
| API Contracts | GET /resource/:id | T[S].02 | ✅ |
| Data Models | Entity | T[S].01 | ✅ |
| UI Components | ComponentA | T[S].03 | ✅ |
| UI Components | ComponentB | T[S].04 | ✅ |
| Integration | API → UI | T[S].05 | ✅ |
| Testing | Unit tests | T[S].06 | ✅ |
| **Coverage** | | | **100%** |

### Acceptance Criteria → Task Mapping

| Story AC | Description | Task(s) | Status |
|----------|-------------|---------|--------|
| AC1 | [Criterion 1] | T[S].01, T[S].03 | ✅ |
| AC2 | [Criterion 2] | T[S].02, T[S].04 | ✅ |
| AC3 | [Criterion 3] | T[S].05 | ✅ |
| **Coverage** | | | **100%** |

---

## RISK ASSESSMENT

### Implementation Risks

| Risk | Impact | Mitigation | Owner |
|------|--------|------------|-------|
| [Risk 1] | [Impact] | [Mitigation] | EXPERT-01 |
| [Risk 2] | [Impact] | [Mitigation] | EXPERT-02 |

### Blockers & Dependencies

| Blocker | Type | Resolution | ETA |
|---------|------|------------|-----|
| [Blocker 1] | External | [Resolution] | [Date] |
| [Blocker 2] | Internal | [Resolution] | [Date] |

---

## DOCUMENT GOVERNANCE

### Related Documents

| Document | Location | Status |
|----------|----------|--------|
| Story | `stories/Epic-XX-Stories.md` | Approved |
| Tech Spec | `specs/Story-[ID]-Spec.md` | Approved |
| Task Specs | `tasks/specs/` | [Status] |

### Completion Tracking

| Task | Status | Completed By | Date |
|------|--------|--------------|------|
| T[S].01 | Not Started | - | - |
| T[S].02 | Not Started | - | - |
| T[S].03 | Not Started | - | - |
| ... | ... | ... | ... |

---

**Task Breakdown Created:** [Date]
**Next Review:** [Date]
**Task Owner:** [Name/Role]

---

*Task Breakdown v1.0 | Story [ID] | [Product Name] | [Date]*

<!-- TASKS_COMPLETE: S[XX.YY.ZZ] -->
```

---

## Output Structure

### File: `PRODUCTS/{product}/tasks/Story-[ID]-Tasks.md`

**Typical Length:** 300-500 lines per story
**Content:** All implementation tasks
**Quality Bar:** 100% spec coverage

---

## Quality Checklist

### Coverage Checks
- [ ] All spec sections have tasks
- [ ] All acceptance criteria addressed
- [ ] All APIs have implementation tasks
- [ ] All UI components have tasks
- [ ] Testing strategy has tasks

### Task Quality Checks
- [ ] Every task has description
- [ ] Every task has acceptance criteria (2+)
- [ ] Every task has assignee
- [ ] Every task has estimate
- [ ] Every task has dependencies documented

### Structure Checks
- [ ] Task index table complete
- [ ] Dependency graph present
- [ ] Sprint allocation suggested
- [ ] Coverage matrix complete
- [ ] No circular dependencies

---

## Integration with Other Skills

### Upstream Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-14** (Story Spec Generator) | Input: Technical Specification with API contracts, data models, UI components |

### Skill Invocations (During Task Generation)

| Category | Skill | Purpose |
|----------|-------|---------|
| **ARCH** | EXPERT-03 (Software Architect) | Architecture decisions, ADR creation |
| **TEST** | EXPERT-04 (Test Engineer) | Test specifications, TDD guidance |
| **IMPL** | EXPERT-01/02/05 (Engineers) | Implementation by layer |
| **INTG** | DEV-02 (Code Review) | Review criteria alignment |

### Downstream Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-16** (Task Spec Generator) | Output: Task list for high-level implementation guides |
| | Handoff: `<!-- TASK_SPEC_READY: T[ID] -->` |
| | Each task gets high-level guidance (no code) |

### Skill Invocation Pattern

```
EXPERT-15 generates task breakdown
    │
    ├── ARCH tasks → Invoke EXPERT-03
    │                 Output: ADR, architecture decisions
    │
    ├── TEST tasks → Invoke EXPERT-04
    │                 Output: Test specifications
    │
    ├── IMPL tasks → Route to EXPERT-01/02/05
    │                 Handoff to EXPERT-16 for guide
    │
    └── INTG tasks → Invoke DEV-02
                      Output: Review alignment
```

---

## Anti-Patterns

### DO NOT

1. **Generate without tech spec**
   - Always read spec first
   - Tasks must map to spec sections

2. **Create oversized tasks**
   - XL tasks should be split
   - Each task should be completable in a day

3. **Skip dependencies**
   - All dependencies must be explicit
   - Execution order must be clear

4. **Leave tasks unassigned**
   - Every task needs an owner
   - Clear role assignment required

5. **Forget testing tasks**
   - Testing is not optional
   - Test tasks included in breakdown

6. **Miss acceptance criteria**
   - Story AC must map to tasks
   - 100% coverage required

---

## Activation Checklist

When this skill is activated:

**Phase 0: Research**
1. [ ] Identify target story tech spec
2. [ ] Read technical specification
3. [ ] Extract all spec components
4. [ ] Generate Spec Task Analysis (~250 words)

**Phase 1: Analysis**
5. [ ] Present analysis to user
6. [ ] Ask 4 tailored questions
7. [ ] **WAIT for user responses**
8. [ ] (Optional) Ask follow-up questions if needed

**Phase 2: Generation**
9. [ ] Apply user decisions to task structure
10. [ ] Generate all tasks sequentially
11. [ ] Build dependency graph
12. [ ] Create coverage matrix

**Phase 3: Validation (Blocking)**
13. [ ] Verify all spec sections covered
14. [ ] Verify all acceptance criteria addressed
15. [ ] Verify no circular dependencies
16. [ ] If fails → return to Phase 2 and fix

**Phase 4: Output**
17. [ ] Write to tasks/Story-[ID]-Tasks.md
18. [ ] Update PROGRESS.md
19. [ ] Include pipeline hooks for EXPERT-16
20. [ ] Present completion summary

---

*Skill EXPERT-15 v2.0 | Xyric Solutions | 2025-12-09*
*4-Phase Tech Spec → TDD-Ordered Task Breakdown Generator with blocking validation*
*TDD Ordering: ARCH → TEST → IMPL → INTG | MoSCoW: 60/20/20 | Skill Invocations Integrated*
