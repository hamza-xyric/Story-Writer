# EXPERT-22: Epic Generator

**Skill ID**: EXPERT-22
**Category**: Expert Agents
**Priority**: Critical
**Version**: 2.0
**Last Updated**: 2025-12-09
**Architecture**: 4-Phase Workflow with Blocking Validation
**Type**: Generator (Bulk Output)
**MoSCoW**: Distribution Enforced per Epic

---

## Purpose

Transform a Master PRD into a comprehensive set of Epic outlines, ensuring 100% feature coverage with no gaps. This skill generates ALL epics at once, creating a complete epic map that serves as the foundation for detailed Epic PRD generation.

**Core Philosophy**: Epics represent logical groupings of features that can be developed together. The Epic Generator ensures every PRD feature is captured, dependencies are clear, and the development path is well-defined.

---

## When to Activate

### Trigger Phrases
- "Generate epics from PRD"
- "Break PRD into epics"
- "Create epic outlines for [product]"
- "Epic breakdown for [product]"
- "PRD → Epics for [product]"
- "Generate all epics"
- "Epic overview from requirements"

### Related Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-21** (PRD Generator) | PRD → Technical Architecture (upstream) |
| **EXPERT-27** (Technical Architecture Generator) | Technical Architecture → Epics (immediate upstream) |
| **EXPERT-23** (Epic PRD Generator) | Epic outline → Detailed Epic PRD (downstream) |
| **EXPERT-13** (Story Generator) | Epic PRD → Stories (downstream) |
| **EXPERT-10** (Product Manager) | Strategic alignment, prioritization |
| **BI-02** (Hypothesis Questions) | Epic scoping questions, validation hypotheses |

---

## Required Context Sources

Before generating epic outlines, gather context from available sources:

| Priority | Source | Path Pattern | Extract |
|----------|--------|--------------|---------|
| Critical | Master PRD | `PRODUCTS/{product}/Product-Requirements-Document.md` | Features, personas, epics |
| Critical | Technical Architecture | `PRODUCTS/{product}/Technical-Architecture.md` | System design, ADRs, components |
| High | Vision Document | `PRODUCTS/{product}/*Vision*.md` | Strategic alignment |
| High | Existing Epic PRDs | `PRODUCTS/**/prd-epics/*.md` | Template patterns |
| Medium | PROGRESS.md | `PRODUCTS/{product}/PROGRESS.md` | Session context |
| Low | Existing Stories | `PRODUCTS/{product}/stories/*.md` | Story patterns |

**Key Principle:** Master PRD and Technical Architecture are the PRIMARY inputs. Every feature in the PRD must map to exactly one epic. Technical Architecture informs component mapping.

---

## Template & Context Loading

### Template Reference
Read the Epic PRD template at: `FRAMEWORKS/templates/epic-prd-template.md`

This template defines the required sections, structure, and format for Epic Overview documents. Always reference this template during Phase 2 (Generation).

### Product Context
Load product-specific context from: `PRODUCTS/{product}/context/`

| File | Usage | Required |
|------|-------|----------|
| `product-identity.md` | Verify alignment with product identity | Recommended |
| `personas.md` | Map features to personas accurately | Recommended |
| `pillars.md` | Understand epic domain context | Recommended |
| `design-decisions.md` | Respect existing architecture decisions | Optional |
| `constraints.md` | Factor in known constraints | Optional |

### Missing Context Handling
If context files are missing:
1. Notify user: "Context file `{filename}` not found for {product}"
2. Proceed using PRD content as primary reference
3. Recommend creating context files for consistent story generation

If `pillars.md` exists, use it to understand how epics map to product domains/pillars.

---

## Generator vs Individual Skills

### This Skill (Generator)
- Creates ALL epic outlines in one pass
- Produces coverage matrix (PRD → Epic)
- Ensures no feature gaps or overlaps
- Output: Epic Overview Document

### EXPERT-23 (Individual)
- Creates ONE detailed Epic PRD per invocation
- Deep dive into feature specifications
- Output: Full Epic PRD document

---

## The Xyric Way: Epic Philosophy

### Core Principles

1. **100% Coverage Required**
   - Every PRD feature maps to exactly one epic
   - No feature left unassigned
   - No feature assigned to multiple epics

2. **Natural Groupings**
   - Epics group related features
   - Features within an epic share dependencies
   - Size based on scope, not arbitrary limits

3. **Clear Dependencies**
   - Epic dependencies explicitly mapped
   - Development order determined by dependencies
   - No circular dependencies allowed

4. **MVP Alignment**
   - Each epic tagged as Core/MVP/Enhanced/Future
   - MVP scope clearly defined
   - Post-MVP roadmap visible

5. **Persona Coverage**
   - Each epic serves specific personas
   - Primary persona per epic identified
   - No persona left without features

6. **Testable Boundaries**
   - Epic completion is measurable
   - Each epic has success criteria
   - Clear definition of done

7. **MoSCoW Distribution**
   - Each epic tracks MUST/SHOULD/COULD features
   - Enforces 60/20/20 distribution guidance
   - Prevents scope creep within epics

---

## MoSCoW Distribution at Epic Level

### Purpose
Track priority distribution within each epic to ensure balanced scope and prevent feature creep.

### Distribution Guidance

| Priority | Target | Description |
|----------|--------|-------------|
| **MUST** | ~60% | Critical features, epic fails without these |
| **SHOULD** | ~20% | Important features, significant value |
| **COULD** | ~20% | Nice-to-have, can defer if needed |

### Per-Epic MoSCoW Tracking

Each epic summary includes:
```markdown
**MoSCoW Distribution:**
- MUST: [X] features ([Y]%)
- SHOULD: [X] features ([Y]%)
- COULD: [X] features ([Y]%)
```

### Validation Rules
- Epics with >80% MUST features: Flag as high-risk (no flexibility)
- Epics with <40% MUST features: Flag as potentially de-scoped
- Acceptable variance: ±15% from 60/20/20 target

---

## Hypothesis-Driven Epic Scoping

### Purpose
Each epic should validate a product hypothesis. This aligns with BI-02 framework for strategic questioning.

### Epic Hypothesis Format

```markdown
**Hypothesis:** [What we believe to be true]
**Validation:** [How this epic validates the hypothesis]
**Key Questions:** [From BI-02 framework]
```

### Example Hypotheses by Epic Type

| Epic Type | Hypothesis Example |
|-----------|-------------------|
| Foundation | "Users can successfully onboard in <5 min with minimal friction" |
| Core Feature | "Feature X solves problem Y better than existing alternatives" |
| Integration | "Users will combine features A+B to achieve outcome C" |
| Enhancement | "Advanced users will pay premium for capability X" |

### BI-02 Question Framework Integration

For each epic, include key questions:
- **Constraint Discovery**: What limitations must we work within?
- **Assumption Validation**: What do we believe that needs testing?
- **Scope Clarity**: What's explicitly out of scope?

---

## Dependency Complexity Scoring

### Purpose
Quantify dependency complexity to identify high-risk epics and parallel development opportunities.

### Complexity Score Formula

```
Complexity Score = (Upstream Dependencies × 2) + (Downstream Dependents × 1) + (Cross-Epic Integrations × 3)
```

### Scoring Interpretation

| Score | Level | Implication |
|-------|-------|-------------|
| 0-2 | Low | Can develop independently |
| 3-5 | Medium | Standard dependencies, manageable |
| 6-8 | High | Complex coordination required |
| 9+ | Critical | High risk, needs careful sequencing |

### Complexity Matrix

```markdown
| Epic | Upstream | Downstream | Integrations | Score | Level |
|------|----------|------------|--------------|-------|-------|
| E01 | 0 | 4 | 0 | 4 | Medium |
| E02 | 1 | 2 | 1 | 7 | High |
| E03 | 2 | 1 | 0 | 5 | Medium |
| E04 | 1 | 1 | 2 | 9 | Critical |
```

---

## Four-Phase Interactive Workflow

### Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 0: RESEARCH (Automated)                 │
├─────────────────────────────────────────────────────────────────┤
│  1. Locate and read Master PRD                                   │
│  2. Extract all features (F[X.Y] pattern)                        │
│  3. Extract epic structure from PRD (if defined)                 │
│  4. Read existing Epic PRDs for template patterns                │
│  OUTPUT: PRD Feature Inventory (~300 words)                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: ANALYSIS & QUESTIONS                 │
├─────────────────────────────────────────────────────────────────┤
│  5. Present feature inventory to user                            │
│  6. Propose epic groupings based on PRD structure                │
│  7. Ask 5 tailored clarification questions                       │
│  8. ═══════════════ WAIT FOR USER INPUT ════════════════════════│
│  9. (Optional) Ask follow-up questions if needed                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2: GENERATION (Sequential)              │
├─────────────────────────────────────────────────────────────────┤
│  10. Apply user decisions to epic structure                      │
│  11. FOR EACH EPIC (sequentially):                               │
│      ├── Generate epic outline                                   │
│      ├── Assign features to epic                                 │
│      ├── Define dependencies                                     │
│      └── Add to coverage matrix                                  │
│  OUTPUT: Epic Overview Document + Coverage Matrix                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: VALIDATION (Blocking)                │
├─────────────────────────────────────────────────────────────────┤
│  12. COVERAGE CHECK: 100% of PRD features assigned               │
│  13. UNIQUENESS CHECK: No feature in multiple epics             │
│  14. DEPENDENCY CHECK: No circular dependencies                  │
│  15. PERSONA CHECK: All personas have epics                     │
│  IF ANY CHECK FAILS → Return to Phase 2, fix, re-validate      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4: OUTPUT & TRACKING                    │
├─────────────────────────────────────────────────────────────────┤
│  16. Write to PRODUCTS/{product}/Epic-Overview.md                │
│  17. Update PROGRESS.md with session details                     │
│  18. Output pipeline hooks for EXPERT-23 (Epic PRD Generator)   │
└─────────────────────────────────────────────────────────────────┘
```

---

### Assumption Challenge Integration

**Invoke CORE-03** between Phase 0 (Research) and Phase 1 (Questions).

| Challenge Phase | Applied | Trigger |
|-----------------|---------|---------|
| A: Question Why | Yes | User validates epic structure/groupings |
| B: Alternatives | Yes | Epic boundaries, dependency ordering |
| C: Stress Test | No | (Medium intensity - skip Phase C) |

**Challenge Intensity:** Medium (A + B only)

**What to Challenge:**
- Epic groupings: "Why group these features together?"
- Epic boundaries: "Should this feature be in Epic X or Epic Y?"
- Dependency order: "What if Epic Y was prioritized before Epic X?"
- Scope per epic: "Is this epic too large/small to be manageable?"

**Workflow Update:**
```
Phase 0: Research → CORE-03: Challenge → Phase 1: Questions → Phase 2: Generate → Phase 3: Validate
```

**Skip Challenge When:**
- User explicitly requests bypass ("skip challenge")
- Epic structure already validated in prior session
- User provides detailed grouping rationale upfront

**Reference:** See `claude-skills/00-core/CORE-03-assumption-challenge.md` for full framework.

---

### Phase 0: Research & Context Gathering

**Purpose:** Extract all features from PRD and identify existing epic structure.

**Step 1: Locate Master PRD**

Look for PRD in these locations:
- `PRODUCTS/{product}/Product-Requirements-Document.md`
- `PRODUCTS/{product}/PRD.md`
- `PRODUCTS/{product}/*PRD*.md`

**Step 2: Extract Features from PRD**

Parse all features using pattern:
- Feature ID: `F[Epic].[Sequence]` (e.g., F1.1, F2.3)
- Feature name
- Priority (P0-P3)
- MVP status (Core/MVP/Enhanced/Future)
- Personas served

**Step 3: Extract Existing Epic Structure**

If PRD has Epic Overview Map section:
- Extract proposed epic names
- Extract proposed feature assignments
- Extract proposed dependencies

**Step 4: Create PRD Feature Inventory**

```markdown
## PRD Feature Inventory: [Product Name]

### Feature Count Summary
| Category | Count |
|----------|-------|
| Total Features | [X] |
| P0 (Critical) | [X] |
| P1 (High) | [X] |
| P2 (Medium) | [X] |
| P3 (Low) | [X] |
| MVP Features | [X] |
| Post-MVP Features | [X] |

### Features by Proposed Epic

**E01: [Name from PRD]**
- F1.1: [Feature name] - P[X] - [MVP Status]
- F1.2: [Feature name] - P[X] - [MVP Status]
- F1.3: [Feature name] - P[X] - [MVP Status]

**E02: [Name from PRD]**
- F2.1: [Feature name] - P[X] - [MVP Status]
- F2.2: [Feature name] - P[X] - [MVP Status]

[Continue for all proposed epics]

### Unassigned Features (if any)
- [Feature] - needs epic assignment

### Persona Coverage
| Persona | Features | Epics |
|---------|----------|-------|
| P1 | [Count] | E01, E02, ... |
| P2 | [Count] | E01, E03, ... |
| P3 | [Count] | E02, E04, ... |
| P4 | [Count] | E03, E05, ... |
| P5 | [Count] | E04, E06, ... |

### Dependency Hints
- [Dependency observation 1]
- [Dependency observation 2]
```

---

### Phase 1: Questions & User Input

**INPUT:** PRD Feature Inventory from Phase 0

**Step 1: Present Inventory to User**

Show the PRD Feature Inventory summary. User sees:
- Total feature count
- Features by proposed epic
- Persona coverage
- Any unassigned features

**Step 2: Tailored Questions**

**Critical**: Questions must reference specific PRD content, not be generic.

#### Question Framework (5 Questions)

**STRUCTURE (2 Questions)**

**Q1. Epic Grouping Validation**
```markdown
Based on the PRD, I've identified these epic groupings:

| Epic | Name | Features | Priority |
|------|------|----------|----------|
| E01 | [Name] | [Count] | [P0/P1] |
| E02 | [Name] | [Count] | [P0/P1] |
| E03 | [Name] | [Count] | [P1/P2] |
| ... | ... | ... | ... |

Questions:
a) Does this epic structure make sense?
b) Should any epics be:
   - Combined (too small)?
   - Split (too large)?
   - Renamed?
c) Any features that should move between epics?
d) Ideal number of epics: [X]. Is this appropriate?
```

**Q2. Dependency Mapping**
```markdown
Based on feature relationships, I see these dependencies:

**Proposed Dependency Order:**
E01 (Foundation) → E02 → E03
                ↘ E04 → E05

E01: No dependencies (foundation)
E02: Depends on E01
E03: Depends on E01, E02
E04: Depends on E01
E05: Depends on E04, optionally E03

Questions:
a) Does this dependency order match your development plan?
b) Any dependencies I missed?
c) Which epic is the true "foundation" that must come first?
d) Any epics that can be developed in parallel?
```

**SCOPE (2 Questions)**

**Q3. MVP Epic Scope**
```markdown
Based on the PRD MVP status, these epics contain MVP features:

**MVP Core:** E01, E02 (must complete for launch)
**MVP Enhanced:** E03, E04 (should complete for launch)
**Post-MVP:** E05+ (after launch)

Questions:
a) Is this MVP/Post-MVP split correct?
b) Which epics are MUST-HAVE for MVP launch?
c) Which epics are NICE-TO-HAVE for MVP?
d) Any epic that could be deferred to v1.1?
```

**Q4. Epic Sizing**
```markdown
Current epic sizes:

| Epic | Features | Relative Size |
|------|----------|---------------|
| E01 | [Count] | Large |
| E02 | [Count] | Medium |
| E03 | [Count] | Small |
| ... | ... | ... |

Questions:
a) Are any epics too large (should be split)?
   - Target: 4-8 features per epic is ideal
   - [Epic] has [X] features

b) Are any epics too small (could be combined)?
   - [Epic] has only [X] features

c) Should epic sizing be balanced or reflect natural scope?
```

**PRIORITY (1 Question)**

**Q5. Development Priority**
```markdown
Based on dependencies and MVP scope, suggested development order:

**Phase 1 (Sprint 1-2):** E01 - Foundation
**Phase 2 (Sprint 3-4):** E02, E04 - Core features (parallel)
**Phase 3 (Sprint 5-6):** E03 - [Area]
**Phase 4 (Post-MVP):** E05+ - Enhanced

Questions:
a) Does this development order make sense?
b) Any epics that need to be prioritized earlier?
c) Any epics that can wait longer?
d) Sprint timeline assumptions accurate?
```

---

### Phase 2: Epic Generation

**INPUTS (from previous phases):**
- PRD Feature Inventory from Phase 0
- User Answers from Phase 1

**Step 1: Apply User Decisions**

Map user answers to epic structure:

| Decision | Impact on Epics |
|----------|-----------------|
| Grouping validation | Final epic names, feature assignments |
| Dependency mapping | Epic dependency diagram |
| MVP scope | Epic MVP status tags |
| Epic sizing | Split or combine decisions |
| Development priority | Epic ordering |

**Step 2: Generate Epics (Sequential)**

For each epic, sequentially:
1. Define epic name and goal
2. List all assigned features
3. Map personas served
4. Define dependencies
5. Set MVP status
6. Add to coverage matrix

**Why Sequential:**
- Dependencies built correctly
- No features missed
- Coverage verified in real-time

**Step 3: Build Coverage Matrix**

Track every PRD feature → Epic assignment:

```markdown
| Feature | Feature Name | Epic | Status |
|---------|--------------|------|--------|
| F1.1 | [Name] | E01 | ✅ |
| F1.2 | [Name] | E01 | ✅ |
| F2.1 | [Name] | E02 | ✅ |
| ... | ... | ... | ... |
| **Total** | **[X] features** | | **100%** |
```

---

### Phase 3: Validation (Blocking)

**Purpose:** Quality gate - must pass ALL checks before output.

**Critical Checks (Block if Fail):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Coverage** | 100% of PRD features assigned | Assign missing features |
| **Uniqueness** | No feature in multiple epics | Remove duplicates |
| **No Circular Dependencies** | Dependency graph is acyclic | Resolve cycles |
| **Persona Coverage** | All 5 personas have features | Add features/adjust |

**Quality Checks (Warning → Block if >3):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Epic Sizing** | 4-12 features per epic | Consider split/merge |
| **Dependency Depth** | Max 3 levels deep | Restructure if needed |
| **MVP Balance** | At least 50% MVP | Review priorities |
| **Description Quality** | All epics have goals | Add descriptions |
| **MoSCoW Distribution** | ~60/20/20 (±15%) per epic | Rebalance priorities |
| **Hypothesis Defined** | Each epic has hypothesis | Add validation hypothesis |
| **Complexity Scored** | All epics have complexity score | Calculate scores |

**Validation Output:**
- ✅ All checks pass → Proceed to Phase 4
- ❌ Any critical check fails → Return to Phase 2

---

### Phase 4: Output & Tracking

**Step 1: Write Epic Overview File**

Create: `PRODUCTS/{product}/Epic-Overview.md`

**Step 2: Update PROGRESS.md**

Add session entry:
- Session timestamp
- Product: {product name}
- Epic Overview created
- Epic count: [X]
- Feature count: [X]
- Coverage: 100%

**Step 3: Output Pipeline Hooks**

For each epic, include hook for EXPERT-23:
- Epic ID and name
- Feature list
- Format: `<!-- EPIC_PRD_READY: E[XX] -->`

---

## Epic Overview Document Template

```markdown
# [Product Name] – EPIC OVERVIEW DOCUMENT
**[Tagline from PRD]**

---

## DOCUMENT INFORMATION

| Attribute | Value |
|-----------|-------|
| **Product** | [Product Name] |
| **Version** | 1.0 |
| **Status** | Draft / Review / Approved |
| **Owner** | [Product Owner] |
| **Last Updated** | [Date] |
| **PRD Reference** | [Link to PRD] |

---

## EPIC SUMMARY

### Overview Statistics

| Metric | Value |
|--------|-------|
| Total Epics | [X] |
| Total Features | [X] |
| MVP Epics | [X] |
| Post-MVP Epics | [X] |
| Personas Covered | 5/5 |

### Epic Index

| Epic | Name | Features | Priority | MVP Status | Dependencies |
|------|------|----------|----------|------------|--------------|
| E01 | [Name] | [Count] | P0 | Core | None |
| E02 | [Name] | [Count] | P0 | Core | E01 |
| E03 | [Name] | [Count] | P1 | MVP | E01, E02 |
| E04 | [Name] | [Count] | P1 | MVP | E01 |
| E05 | [Name] | [Count] | P2 | Enhanced | E01-E04 |
| E06 | [Name] | [Count] | P2 | Enhanced | E02, E03 |
| E07 | [Name] | [Count] | P3 | Future | E01-E06 |
| ... | ... | ... | ... | ... | ... |

---

## DEPENDENCY DIAGRAM

### Visual Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    [PRODUCT NAME] EPIC DEPENDENCIES              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│                       ┌─────────┐                                │
│                       │   E01   │ ← Foundation                   │
│                       │ [Name]  │                                │
│                       └────┬────┘                                │
│                   ┌────────┼────────┐                           │
│                   ▼        ▼        ▼                           │
│             ┌─────────┐ ┌─────────┐ ┌─────────┐                │
│             │   E02   │ │   E03   │ │   E04   │                │
│             │ [Name]  │ │ [Name]  │ │ [Name]  │                │
│             └────┬────┘ └────┬────┘ └────┬────┘                │
│                  │           │           │                       │
│                  └───────────┼───────────┘                       │
│                              ▼                                   │
│                        ┌─────────┐                              │
│                        │   E05   │                              │
│                        │ [Name]  │                              │
│                        └─────────┘                              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Dependency Rules

| Epic | Depends On | Reason |
|------|------------|--------|
| E01 | None | Foundation epic - core infrastructure |
| E02 | E01 | Requires [E01 capability] |
| E03 | E01, E02 | Requires [E01 + E02 capabilities] |
| E04 | E01 | Requires [E01 capability] |
| E05 | E01-E04 | Integrates all prior epics |
| ... | ... | ... |

### Parallel Development Opportunities

| Phase | Epics | Notes |
|-------|-------|-------|
| Phase 1 | E01 | Foundation only |
| Phase 2 | E02, E04 | Can develop in parallel |
| Phase 3 | E03, E05 | E03 needs E02, E05 needs E04 |
| Phase 4 | E06+ | Post-MVP |

---

## EPIC DETAILS

### E01: [Epic Name]

**Epic Statement:**
[1-2 sentences describing what this epic achieves]

**Goal:**
[Primary objective of this epic]

**Hypothesis:**
[What product hypothesis this epic validates - from BI-02 framework]

**Key Questions:**
- [Constraint discovery question]
- [Assumption validation question]
- [Scope clarity question]

**Scope:**
[What's included and excluded]

**MoSCoW Distribution:**
- MUST: [X] features ([Y]%)
- SHOULD: [X] features ([Y]%)
- COULD: [X] features ([Y]%)

**Features:**
| Feature | Name | Priority | MoSCoW | MVP |
|---------|------|----------|--------|-----|
| F1.1 | [Name] | P0 | MUST | ✅ |
| F1.2 | [Name] | P0 | MUST | ✅ |
| F1.3 | [Name] | P1 | SHOULD | ✅ |
| F1.4 | [Name] | P2 | COULD | ❌ |

**Personas Served:**
- **Primary:** P1 ([Persona Name])
- **Secondary:** P2, P3

**Dependencies:**
- **Upstream:** None (foundation)
- **Downstream:** E02, E03, E04
- **Complexity Score:** [X] ([Level])

**MVP Status:** Core (Required for launch)

**Success Criteria:**
- [ ] [Criterion 1 - testable]
- [ ] [Criterion 2 - testable]
- [ ] [Criterion 3 - testable]

**Estimated Complexity:** [S/M/L/XL]

<!-- EPIC_PRD_READY: E01 -->

---

### E02: [Epic Name]

**Epic Statement:**
[1-2 sentences describing what this epic achieves]

**Goal:**
[Primary objective of this epic]

**Hypothesis:**
[What product hypothesis this epic validates - from BI-02 framework]

**Key Questions:**
- [Constraint discovery question]
- [Assumption validation question]
- [Scope clarity question]

**Scope:**
[What's included and excluded]

**MoSCoW Distribution:**
- MUST: [X] features ([Y]%)
- SHOULD: [X] features ([Y]%)
- COULD: [X] features ([Y]%)

**Features:**
| Feature | Name | Priority | MoSCoW | MVP |
|---------|------|----------|--------|-----|
| F2.1 | [Name] | P0 | MUST | ✅ |
| F2.2 | [Name] | P0 | MUST | ✅ |
| F2.3 | [Name] | P1 | SHOULD | ✅ |

**Personas Served:**
- **Primary:** P2 ([Persona Name])
- **Secondary:** P1

**Dependencies:**
- **Upstream:** E01
- **Downstream:** E03, E05
- **Complexity Score:** [X] ([Level])

**MVP Status:** Core (Required for launch)

**Success Criteria:**
- [ ] [Criterion 1 - testable]
- [ ] [Criterion 2 - testable]
- [ ] [Criterion 3 - testable]

**Estimated Complexity:** [S/M/L/XL]

<!-- EPIC_PRD_READY: E02 -->

---

[Continue for all epics...]

---

## COVERAGE MATRIX

### PRD Feature → Epic Mapping

| Feature | Feature Name | Epic | Priority | MoSCoW | MVP | Persona |
|---------|--------------|------|----------|--------|-----|---------|
| F1.1 | [Name] | E01 | P0 | MUST | ✅ | P1 |
| F1.2 | [Name] | E01 | P0 | MUST | ✅ | P1, P2 |
| F1.3 | [Name] | E01 | P1 | SHOULD | ✅ | P1 |
| F2.1 | [Name] | E02 | P0 | MUST | ✅ | P2 |
| F2.2 | [Name] | E02 | P0 | MUST | ✅ | P2, P3 |
| F3.1 | [Name] | E03 | P1 | SHOULD | ✅ | P3 |
| ... | ... | ... | ... | ... | ... | ... |

**Coverage Summary:**
- **Total Features:** [X]
- **Features Assigned:** [X] (100%)
- **Unassigned:** 0

### Epic Complexity Summary

| Epic | Features | MUST | SHOULD | COULD | Complexity Score | Dependencies |
|------|----------|------|--------|-------|------------------|--------------|
| E01 | [X] | [X] | [X] | [X] | [Score] ([Level]) | [Count] |
| E02 | [X] | [X] | [X] | [X] | [Score] ([Level]) | [Count] |
| E03 | [X] | [X] | [X] | [X] | [Score] ([Level]) | [Count] |
| ... | ... | ... | ... | ... | ... | ... |

**MoSCoW Summary:**
- **Total MUST:** [X] features ([Y]%)
- **Total SHOULD:** [X] features ([Y]%)
- **Total COULD:** [X] features ([Y]%)

### Persona Coverage Matrix

| Persona | E01 | E02 | E03 | E04 | E05 | E06 | Total Features |
|---------|-----|-----|-----|-----|-----|-----|----------------|
| P1 | ✅ | ✅ | | ✅ | | | [X] |
| P2 | ✅ | ✅ | ✅ | | ✅ | | [X] |
| P3 | | ✅ | ✅ | ✅ | | ✅ | [X] |
| P4 | | | ✅ | ✅ | ✅ | | [X] |
| P5 | | | | ✅ | ✅ | ✅ | [X] |

---

## MVP ROADMAP

### MVP v1.0 Scope

| Epic | Status | Features | Notes |
|------|--------|----------|-------|
| E01 | Core | All ([X]) | Must complete |
| E02 | Core | All ([X]) | Must complete |
| E03 | MVP | [X] of [Y] | P0-P1 only |
| E04 | MVP | [X] of [Y] | P0-P1 only |

**MVP Feature Count:** [X] of [Y] total ([X]%)

### Post-MVP Roadmap

| Version | Epics | Theme |
|---------|-------|-------|
| v1.1 | E03 (complete), E04 (complete) | [Theme] |
| v1.2 | E05 | [Theme] |
| v2.0 | E06, E07 | [Theme] |

---

## DEVELOPMENT ORDER

### Recommended Sprint Allocation

| Sprint | Epic(s) | Focus | Dependencies |
|--------|---------|-------|--------------|
| 1-2 | E01 | Foundation | None |
| 3-4 | E02, E04 | Core features | E01 complete |
| 5-6 | E03 | [Area] | E02 complete |
| 7-8 | E05 | Integration | E01-E04 complete |
| Post-MVP | E06+ | Enhanced | E05 complete |

### Critical Path

```
E01 → E02 → E03 → E05 → MVP Launch
  ↘ E04 ↗
```

**Minimum Path to MVP:** E01 → E02 → E03 (6 sprints)
**Full MVP Path:** E01 → E02/E04 → E03 → E05 (8 sprints)

---

## DOCUMENT GOVERNANCE

### Related Documents

| Document | Location | Status |
|----------|----------|--------|
| Vision Document | [Link] | Approved |
| Master PRD | [Link] | Approved |
| Epic PRDs | `prd-epics/` | [Status] |

### Next Steps

1. [ ] Review Epic Overview with stakeholders
2. [ ] Generate detailed Epic PRDs (EXPERT-23)
3. [ ] Begin story generation (EXPERT-13)

---

**Epic Overview Established:** [Date]
**Next Review:** [Date]
**Epic Owner:** [Name/Role]

---

*[Product Name] Epic Overview v1.0 | Xyric Solutions | [Date]*

<!-- EPIC_OVERVIEW_COMPLETE: {PRODUCT-CODE} -->
```

---

## Output Structure

### File: `PRODUCTS/{product}/Epic-Overview.md`

**Typical Length:** 400-800 lines
**Content:** All epic outlines with coverage matrix
**Quality Bar:** 100% feature coverage, no gaps

---

## Quality Checklist

### Coverage Checks
- [ ] 100% of PRD features assigned to epics
- [ ] No feature appears in multiple epics
- [ ] All 5 personas have at least one epic
- [ ] MVP features clearly identified

### Structure Checks
- [ ] Epic Index table complete
- [ ] Dependency diagram present
- [ ] Each epic has full outline (statement, goal, features, personas, dependencies)
- [ ] Coverage matrix complete
- [ ] MVP roadmap defined

### Quality Standards
- [ ] All epics have clear goals
- [ ] All dependencies are logical
- [ ] No circular dependencies
- [ ] Epic sizing is reasonable (4-12 features)
- [ ] Development order makes sense

---

## Integration with Other Skills

### EXPERT-21 (PRD Generator)
- Input: Master PRD (via EXPERT-27)
- Inherits: Features, personas, epic structure hints
- Coverage: 100% of PRD features

### EXPERT-27 (Technical Architecture Generator)
- Input: Technical Architecture Document (immediate upstream)
- Inherits: System design, component mapping, ADRs
- Epic-Component alignment: Each epic maps to architecture components

### EXPERT-23 (Epic PRD Generator)
- Output: Epic outlines for detailed breakdown
- Handoff: `<!-- EPIC_PRD_READY: E[XX] -->`
- Epic PRD Generator creates detailed feature specs

### EXPERT-13 (Story Generator)
- Epic PRDs feed into story generation
- Stories are generated per Epic PRD

---

## Anti-Patterns

### DO NOT

1. **Generate without PRD**
   - Always read PRD first
   - Epics must cover PRD features

2. **Leave features unassigned**
   - Every feature belongs to exactly one epic
   - Validation blocks on gaps

3. **Create overlapping epics**
   - Features can't be in multiple epics
   - Clear boundaries required

4. **Ignore dependencies**
   - Dependencies must be explicit
   - Development order follows dependencies

5. **Skip validation**
   - 100% coverage is required
   - Blocking validation enforces this

6. **Generate detailed feature specs**
   - This skill creates OUTLINES only
   - EXPERT-23 creates detailed Epic PRDs

---

## Activation Checklist

When this skill is activated:

**Phase 0: Research**
1. [ ] Locate Master PRD for product
2. [ ] Extract all features (F[X.Y] pattern)
3. [ ] Extract existing epic structure from PRD
4. [ ] Generate PRD Feature Inventory (~300 words)

**Phase 1: Analysis**
5. [ ] Present Feature Inventory to user
6. [ ] Ask 5 tailored clarification questions
7. [ ] **WAIT for user responses**
8. [ ] (Optional) Ask follow-up questions if needed

**Phase 2: Generation**
9. [ ] Apply user decisions to epic structure
10. [ ] Generate epics sequentially
11. [ ] Build coverage matrix
12. [ ] Create dependency diagram

**Phase 3: Validation (Blocking)**
13. [ ] Verify 100% feature coverage
14. [ ] Verify no duplicate assignments
15. [ ] Verify no circular dependencies
16. [ ] If fails → return to Phase 2 and fix

**Phase 4: Output**
17. [ ] Write to PRODUCTS/{product}/Epic-Overview.md
18. [ ] Update PROGRESS.md
19. [ ] Include pipeline hooks for EXPERT-23
20. [ ] Present completion summary

---

*Skill EXPERT-22 v2.1 | Xyric Solutions | 2025-12-24*
*4-Phase PRD → Epic Overview Generator | MoSCoW Distribution | Hypothesis-Driven | Complexity Scoring | BI-02 Integration*
