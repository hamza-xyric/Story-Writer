# EXPERT-23: Epic PRD Generator

**Skill ID**: EXPERT-23
**Category**: Expert Agents
**Priority**: Critical
**Version**: 2.0
**Last Updated**: 2025-12-09
**Architecture**: 4-Phase Workflow with Blocking Validation
**Type**: Individual (One Epic at a Time)
**Acceptance Format**: BDD (Given/When/Then)
**ADR**: Flags Architecture Decisions for Review

---

## Purpose

Transform an Epic outline from EXPERT-22 into a detailed Epic PRD with full feature specifications, acceptance criteria, and error handling scenarios. This skill creates ONE detailed Epic PRD per invocation.

**Core Philosophy**: Epic PRDs bridge high-level requirements and implementation. They provide the detailed feature specifications that story generation requires, ensuring every feature is fully specified before development begins.

---

## When to Activate

### Trigger Phrases
- "Create Epic PRD for E[XX]"
- "Generate detailed Epic [Name]"
- "Epic PRD for [epic name]"
- "Expand Epic [XX] into PRD"
- "Detail Epic [XX] features"
- "Create prd-epics document for [epic]"

### Related Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-22** (Epic Generator) | Epic outline → Epic PRD (upstream) |
| **EXPERT-13** (Story Generator) | Epic PRD → Stories (downstream) |
| **EXPERT-21** (PRD Generator) | Master PRD context |
| **EXPERT-03** (Software Architect) | Architecture decisions, ADR creation |
| **BI-02** (Business Insights) | Feature analysis question framework |
| **EXPERT-10** (Product Manager) | Feature prioritization |

---

## Required Context Sources

Before generating an Epic PRD, gather context from available sources:

| Priority | Source | Path Pattern | Extract |
|----------|--------|--------------|---------|
| Critical | Epic Overview | `PRODUCTS/{product}/Epic-Overview.md` | Epic outline, features |
| Critical | Master PRD | `PRODUCTS/{product}/Product-Requirements-Document.md` | Feature details, personas |
| High | Existing Epic PRDs | `PRODUCTS/{product}/prd-epics/*.md` | Template patterns |
| Medium | Vision Document | `PRODUCTS/{product}/*Vision*.md` | Strategic context |
| Medium | PROGRESS.md | `PRODUCTS/{product}/PROGRESS.md` | Session context |
| Low | Design docs | `PRODUCTS/{product}/design/*.md` | UI/UX patterns |

**Key Principle:** Epic outline from EXPERT-22 is the PRIMARY input. The Epic PRD expands each feature with full specifications.

---

## Generator vs Individual Skills

### EXPERT-22 (Generator)
- Creates ALL epic outlines in one pass
- Produces coverage matrix
- Output: Epic Overview Document

### This Skill (Individual)
- Creates ONE detailed Epic PRD per invocation
- Deep dive into each feature
- Full acceptance criteria and error scenarios
- Output: `prd-epics/PRD-Epic-XX-[Name].md`

---

## The Xyric Way: Epic PRD Philosophy

### Core Principles

1. **Features Fully Specified**
   - Each feature has user story format
   - Success metrics quantified
   - Acceptance criteria testable
   - Error scenarios documented

2. **Persona-Driven**
   - User story for each feature
   - "As a [persona], I want..."
   - Benefits tied to persona goals

3. **Testable Criteria**
   - Acceptance criteria are checkboxes
   - Each criterion independently verifiable
   - No vague success measures

4. **Error Handling Required**
   - Every feature has error scenarios
   - User-facing error messages defined
   - Recovery paths specified

5. **Dependencies Explicit**
   - Feature dependencies documented
   - Cross-epic dependencies clear
   - Prerequisite features identified

6. **MoSCoW Tagged**
   - Every feature has priority (P0-P3)
   - MVP status clear (Core/MVP/Enhanced/Future)
   - Trade-offs visible

---

## BDD Acceptance Criteria Format

### Mandatory Format (Given/When/Then)

All acceptance criteria MUST use BDD format for testability:

```markdown
**Given** [initial context or precondition]
**When** [action or event occurs]
**Then** [expected outcome or behavior]
```

### BDD Examples

| Scenario | BDD Format |
|----------|-----------|
| **User Login** | **Given** a registered user with valid credentials, **When** they submit the login form, **Then** they are redirected to the dashboard |
| **Error State** | **Given** a network connection failure, **When** the user attempts to save, **Then** an error message appears with retry option |
| **Edge Case** | **Given** an empty data set, **When** the user views the list, **Then** a helpful empty state message is displayed |

### Acceptance Criteria Structure

```markdown
#### Acceptance Criteria (BDD Format)

**Core Functionality:**
- **Given** [context], **When** [action], **Then** [outcome]
- **Given** [context], **When** [action], **Then** [outcome]

**User Experience:**
- **Given** [context], **When** [action], **Then** [outcome]

**Edge Cases:**
- **Given** [edge case context], **When** [action], **Then** [graceful handling]

**Performance:**
- **Given** [load condition], **When** [action], **Then** [response within target]
```

---

## ADR Flagging for Epic-Level Decisions

### When to Flag ADR at Epic Level

- Epic-wide architecture patterns
- Cross-feature design decisions
- Technology choices affecting all features
- Integration patterns across features

### ADR Flag Format

```markdown
### Architecture Decisions (Epic-Level)

| Decision | Choice | ADR Required | Invoke |
|----------|--------|--------------|--------|
| [Decision topic] | [Selected approach] | ⚠️ Yes / No | EXPERT-03 |
| [Decision topic] | [Selected approach] | No | - |

**⚠️ ADR Required:** [Decision Topic]
- **Impact:** High | Medium
- **Scope:** Epic / Product
- **Invoke:** EXPERT-03 for ADR creation
```

---

## Four-Phase Interactive Workflow

### Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 0: RESEARCH (Automated)                 │
├─────────────────────────────────────────────────────────────────┤
│  1. Read Epic Overview for target epic outline                   │
│  2. Read Master PRD for feature details                          │
│  3. Read existing Epic PRDs for template patterns                │
│  4. Extract personas, dependencies, MVP status                   │
│  OUTPUT: Epic Context Summary (~250 words)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: ANALYSIS & QUESTIONS                 │
├─────────────────────────────────────────────────────────────────┤
│  5. Present epic context to user                                 │
│  6. Show features to be detailed                                 │
│  7. Ask 4 tailored clarification questions                       │
│  8. ═══════════════ WAIT FOR USER INPUT ════════════════════════│
│  9. (Optional) Ask follow-up questions if needed                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2: GENERATION (Sequential)              │
├─────────────────────────────────────────────────────────────────┤
│  10. Apply user decisions to feature specs                       │
│  11. Flag epic-level ADR decisions (invoke EXPERT-03)            │
│  12. FOR EACH FEATURE (sequentially):                            │
│      ├── Generate full feature specification                     │
│      ├── Define acceptance criteria (BDD format)                 │
│      ├── Document error scenarios                                │
│      ├── Add success metrics                                     │
│      └── Flag feature-level ADRs (if any)                        │
│  OUTPUT: Complete Epic PRD with BDD Criteria + ADR Flags         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: VALIDATION (Blocking)                │
├─────────────────────────────────────────────────────────────────┤
│  13. FEATURE CHECK: All epic features specified                  │
│  14. BDD FORMAT CHECK: All criteria use Given/When/Then         │
│  15. ADR CHECK: Significant decisions flagged for EXPERT-03      │
│  16. ERROR CHECK: All features have error scenarios             │
│  17. METRIC CHECK: All features have success metrics            │
│  IF ANY CHECK FAILS → Return to Phase 2, fix, re-validate      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4: OUTPUT & TRACKING                    │
├─────────────────────────────────────────────────────────────────┤
│  16. Write to prd-epics/PRD-Epic-XX-[Name].md                   │
│  17. Update PROGRESS.md with session details                     │
│  18. Output pipeline hooks for EXPERT-13 (Story Generator)      │
└─────────────────────────────────────────────────────────────────┘
```

---

### Assumption Challenge Integration

**Invoke CORE-03** between Phase 0 (Research) and Phase 1 (Questions).

| Challenge Phase | Applied | Trigger |
|-----------------|---------|---------|
| A: Question Why | Yes | User specifies feature scope/acceptance criteria |
| B: Alternatives | Yes | Feature boundaries, acceptance criteria depth |
| C: Stress Test | No | (Medium intensity - skip Phase C) |

**Challenge Intensity:** Medium (A + B only)

**What to Challenge:**
- Feature scope: "Is this feature doing too much or too little?"
- Acceptance criteria: "Are these criteria testable and complete?"
- Error handling: "What edge cases are missing?"
- Dependencies: "Are the feature dependencies correctly identified?"

**Workflow Update:**
```
Phase 0: Research → CORE-03: Challenge → Phase 1: Questions → Phase 2: Generate → Phase 3: Validate
```

**Skip Challenge When:**
- User explicitly requests bypass ("skip challenge")
- Feature specifications already validated
- User provides detailed acceptance criteria upfront

**Reference:** See `claude-skills/00-core/CORE-03-assumption-challenge.md` for full framework.

---

### Phase 0: Research & Context Gathering

**Purpose:** Extract epic outline and gather context for full specification.

**Step 1: Identify Target Epic**

User specifies which epic to detail:
- Epic ID: E[XX] (e.g., E01, E05)
- Epic Name: [From Epic Overview]

**Step 2: Extract from Epic Overview**

Find the target epic and extract:
- Epic statement and goal
- Feature list (F[X.Y] IDs)
- Personas served
- Dependencies
- MVP status
- Success criteria

**Step 3: Extract from Master PRD**

For each feature in the epic:
- Feature name and priority
- Initial description (if any)
- Persona mapping
- MVP status

**Step 4: Gather Template Patterns**

Read existing Epic PRDs to extract:
- Feature specification format
- Acceptance criteria patterns
- Error scenario templates
- Success metric patterns

**Step 5: Create Epic Context Summary**

```markdown
## Epic Context: E[XX] - [Epic Name]

### Epic Overview
**Statement:** [From Epic Overview]
**Goal:** [From Epic Overview]
**MVP Status:** [Core/MVP/Enhanced/Future]

### Features to Specify
| Feature | Name | Priority | MVP |
|---------|------|----------|-----|
| F[X.1] | [Name] | P[X] | [Status] |
| F[X.2] | [Name] | P[X] | [Status] |
| F[X.3] | [Name] | P[X] | [Status] |
| ... | ... | ... | ... |

### Personas Served
- **Primary:** P[X] - [Name]
- **Secondary:** P[Y], P[Z]

### Dependencies
- **Upstream:** [Epic dependencies]
- **Feature-level:** [Any feature dependencies]

### Success Criteria (from Epic Overview)
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

### Gaps Requiring Clarification
- [Gap 1]: Feature scope unclear
- [Gap 2]: Acceptance criteria needed
- [Gap 3]: Error handling TBD
```

---

### Phase 1: Questions & User Input

**INPUT:** Epic Context Summary from Phase 0

**Step 1: Present Context to User**

Show the Epic Context Summary. User sees:
- Epic overview
- Features to be specified
- Personas served
- Current gaps

**Step 2: Tailored Questions**

**Critical**: Questions must reference specific epic content, not be generic.

#### Question Framework (4 Questions)

**FEATURE SCOPE (2 Questions)**

**Q1. Feature Detail Level**
```markdown
This epic has [X] features to specify:

| Feature | Name | Current Detail |
|---------|------|----------------|
| F[X.1] | [Name] | [Brief/None] |
| F[X.2] | [Name] | [Brief/None] |
| ... | ... | ... |

Questions:
a) Any features that need special attention or deep detail?
b) Any features that are simpler and need less specification?
c) Any features with complex edge cases I should explore?
d) Estimated acceptance criteria per feature:
   - Standard: 3-5 criteria
   - Complex: 6-10 criteria
   - Simple: 2-3 criteria
```

**Q2. Feature Scope Clarification**
```markdown
For each feature, I need to understand scope boundaries.

**F[X.1]: [Feature Name]**
Based on PRD description: "[Description if any]"
- What should this feature INCLUDE?
- What should this feature EXCLUDE?
- Any specific behaviors to highlight?

**F[X.2]: [Feature Name]**
...

[Ask about features that need clarification]
```

**USER EXPERIENCE (1 Question)**

**Q3. Error Handling & Edge Cases**
```markdown
For error scenarios, I need to understand:

Questions:
a) What error messages should users see?
   - Technical details hidden/shown
   - Tone (friendly, professional, apologetic)
   - Action guidance (yes/no)

b) Key error scenarios to document:
   - Network failures
   - Validation errors
   - Permission denied
   - Rate limiting
   - Other: [specify]

c) Recovery expectations:
   - Auto-retry behavior
   - Save state before error
   - Clear recovery path
```

**ACCEPTANCE CRITERIA (1 Question)**

**Q4. Success Criteria & Metrics**
```markdown
Each feature needs success metrics.

Questions:
a) What metrics matter most for this epic?
   - User engagement: [specific metrics]
   - Performance: [targets]
   - Quality: [measures]
   - Business: [KPIs]

b) For acceptance criteria, which format?
   - Checkbox format: "- [ ] User can..."
   - Given/When/Then format: "Given X, When Y, Then Z"
   - Both

c) Any specific SLAs or performance requirements?
   - Response times
   - Availability
   - Throughput
```

---

### Phase 2: Epic PRD Generation

**INPUTS (from previous phases):**
- Epic Context Summary from Phase 0
- User Answers from Phase 1

**Step 1: Apply User Decisions**

Map user answers to feature specifications:

| Decision | Impact on Features |
|----------|-------------------|
| Detail level | Depth of specification |
| Scope clarifications | Feature boundaries |
| Error handling | Error scenario tables |
| Success criteria | Metric targets |

**Step 2: Generate Features (Sequential)**

For each feature, sequentially:
1. Write feature description
2. Create user story
3. Define success metrics (table)
4. Write acceptance criteria (checkboxes)
5. Document error scenarios (table)
6. Note dependencies

**Why Sequential:**
- Consistent depth across features
- Cross-references accurate
- Quality maintained

**Feature Specification Structure:**

```markdown
### F[X.Y]: [Feature Name]

**Priority:** P[X]
**MVP Status:** Core / MVP / Enhanced / Future
**Personas:** P[X] (Primary), P[Y], P[Z] (Secondary)

**Description:**
[2-3 paragraphs describing the feature in detail]

**User Story:**
As a [persona name], I want to [action/capability] so that [benefit/value].

**Success Metrics:**
| Metric | Target | Measurement |
|--------|--------|-------------|
| [Metric 1] | [Target] | [How measured] |
| [Metric 2] | [Target] | [How measured] |
| [Metric 3] | [Target] | [How measured] |

**Acceptance Criteria (BDD Format):**

*Core Functionality:*
- **Given** [context], **When** [action], **Then** [outcome]
- **Given** [context], **When** [action], **Then** [outcome]
- **Given** [context], **When** [action], **Then** [outcome]

*User Experience:*
- **Given** [context], **When** [action], **Then** [outcome]

*Edge Cases:*
- **Given** [edge case context], **When** [action], **Then** [graceful handling]

*Performance:*
- **Given** [load condition], **When** [action], **Then** [response within target]

**Error Scenarios:**
| Scenario | User Message | System Action | Recovery |
|----------|--------------|---------------|----------|
| [Error 1] | "[Message]" | [Action] | [Recovery path] |
| [Error 2] | "[Message]" | [Action] | [Recovery path] |
| [Error 3] | "[Message]" | [Action] | [Recovery path] |

**Architecture Decision (if applicable):**
- [ ] ADR Required: Yes / No
- Pattern: [Selected pattern]
- Rationale: [Brief justification]
- Invoke: EXPERT-03

**Dependencies:**
- F[X.Y-1]: [Why this is needed first]
- E[YY]: [Cross-epic dependency if any]
```

---

### Phase 3: Validation (Blocking)

**Purpose:** Quality gate - must pass ALL checks before output.

**Critical Checks (Block if Fail):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Feature Coverage** | All epic features specified | Add missing features |
| **BDD Format** | All criteria use Given/When/Then | Convert to BDD format |
| **ADR Flagging** | Significant decisions flagged | Add ADR flags, invoke EXPERT-03 |
| **Acceptance Criteria** | Every feature has 3+ criteria | Add criteria |
| **Error Scenarios** | Every feature has error table | Add scenarios |
| **Success Metrics** | Every feature has metrics | Add metrics |

**Quality Checks (Warning → Block if >3):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **User Story** | Proper format (As a... I want... so that...) | Reformat |
| **BDD Completeness** | Given/When/Then all present | Complete BDD |
| **Metric Quantification** | Targets are numbers | Add targets |
| **Dependency Clarity** | Dependencies specified | Document |
| **Architecture Pattern** | Complex features have patterns | Add pattern reference |

**Validation Output:**
- ✅ All checks pass → Proceed to Phase 4
- ❌ Any critical check fails → Return to Phase 2

---

### Phase 4: Output & Tracking

**Step 1: Write Epic PRD File**

Create: `PRODUCTS/{product}/prd-epics/PRD-Epic-[XX]-[Name].md`

File naming convention:
- `PRD-Epic-01-Onboarding-Assessment.md`
- `PRD-Epic-02-Voice-Coaching.md`
- `PRD-Epic-03-Data-Integration.md`

**Step 2: Update PROGRESS.md**

Add session entry:
- Session timestamp
- Epic: E[XX] - [Name]
- Features specified: [count]
- Ready for story generation

**Step 3: Output Pipeline Hooks**

Include hook for EXPERT-13:
- Epic ID and feature list
- Format: `<!-- STORY_READY: E[XX] -->`

---

## Epic PRD Document Template

```markdown
# Epic [XX]: [Epic Name] – PRD

**Product:** [Product Name]
**Epic ID:** E[XX]
**Version:** 1.0
**Status:** Draft / Review / Approved
**Last Updated:** [Date]

---

## EPIC OVERVIEW

### Epic Statement
[1-2 sentences describing what this epic achieves - from Epic Overview]

### Epic Goal
[Primary objective - clear and measurable]

### Core Philosophy
[Guiding principle for this epic - what approach drives decisions]

### Feature Summary

| Feature | Name | Priority | MVP | Status |
|---------|------|----------|-----|--------|
| F[X.1] | [Name] | P0 | ✅ | Specified |
| F[X.2] | [Name] | P0 | ✅ | Specified |
| F[X.3] | [Name] | P1 | ✅ | Specified |
| F[X.4] | [Name] | P2 | ❌ | Specified |
| ... | ... | ... | ... | ... |

**Total Features:** [X]
**MVP Features:** [Y]
**Post-MVP Features:** [Z]

---

## PERSONAS SERVED

### Primary Persona

**P[X]: [Persona Name]**
- **Role:** [From PRD]
- **Goal:** [What they want from this epic]
- **Key Features:** F[X.1], F[X.2], F[X.3]

### Secondary Personas

**P[Y]: [Persona Name]**
- **Goal:** [What they want]
- **Key Features:** F[X.2], F[X.4]

**P[Z]: [Persona Name]**
- **Goal:** [What they want]
- **Key Features:** F[X.3], F[X.5]

---

## FEATURE SPECIFICATIONS

### F[X.1]: [Feature Name]

**Priority:** P0 (Critical)
**MVP Status:** Core
**Personas:** P[X] (Primary), P[Y], P[Z]

#### Description
[2-3 paragraphs providing comprehensive description of the feature. Include:
- What the feature does
- Why it matters
- How users interact with it
- Key behaviors and states]

#### User Story
**As a** [persona name],
**I want to** [action/capability],
**so that** [benefit/value].

#### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| [Engagement metric] | [X%] | [Analytics event] |
| [Performance metric] | [Xms] | [Performance monitoring] |
| [Quality metric] | [X%] | [Error rate tracking] |
| [Business metric] | [X] | [Business KPI] |

#### Acceptance Criteria

**Core Functionality:**
- [ ] [Criterion 1 - specific and testable]
- [ ] [Criterion 2 - specific and testable]
- [ ] [Criterion 3 - specific and testable]

**User Experience:**
- [ ] [UX criterion 1]
- [ ] [UX criterion 2]

**Edge Cases:**
- [ ] [Edge case handling 1]
- [ ] [Edge case handling 2]

**Performance:**
- [ ] [Performance criterion]

#### Error Scenarios

| Scenario | User Message | System Action | Recovery |
|----------|--------------|---------------|----------|
| Network timeout | "Connection lost. Checking your network..." | Retry 3x, then show error | Retry button, offline mode |
| Invalid input | "[Specific field] is invalid. [Guidance]" | Highlight field, prevent submit | Clear guidance on format |
| Server error | "Something went wrong. We're on it." | Log error, alert team | Retry button, contact support |
| Rate limited | "Too many requests. Please wait [X] seconds." | Backoff timer | Auto-retry after timeout |
| Permission denied | "You don't have access to [resource]." | Log attempt | Request access link |

#### Dependencies
- **Prerequisite Features:** None / F[X.Y]
- **Cross-Epic:** E[YY] - [Reason]
- **External:** [API, service, etc.]

#### Technical Notes
[Any technical considerations for engineering - optional]

---

### F[X.2]: [Feature Name]

**Priority:** P0 (Critical)
**MVP Status:** Core
**Personas:** P[X], P[Y]

#### Description
[Feature description...]

#### User Story
**As a** [persona],
**I want to** [action],
**so that** [benefit].

#### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| [Metric] | [Target] | [Measurement] |
| [Metric] | [Target] | [Measurement] |

#### Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]
- [ ] [Criterion 4]

#### Error Scenarios

| Scenario | User Message | System Action | Recovery |
|----------|--------------|---------------|----------|
| [Scenario] | "[Message]" | [Action] | [Recovery] |
| [Scenario] | "[Message]" | [Action] | [Recovery] |

#### Dependencies
- **Prerequisite Features:** F[X.1]
- **Cross-Epic:** None

---

[Continue for all features F[X.3], F[X.4], etc.]

---

## INTEGRATION POINTS

### Within This Epic
[How features in this epic interact with each other]

| Source Feature | Target Feature | Integration Type |
|----------------|----------------|------------------|
| F[X.1] | F[X.2] | Data flow |
| F[X.2] | F[X.3] | Event trigger |
| ... | ... | ... |

### Cross-Epic Integration

| This Epic Feature | Other Epic | Other Feature | Integration |
|-------------------|------------|---------------|-------------|
| F[X.2] | E[YY] | F[Y.1] | Shared data |
| F[X.4] | E[ZZ] | F[Z.3] | API call |
| ... | ... | ... | ... |

### External Integrations

| Feature | External System | Integration Type |
|---------|-----------------|------------------|
| F[X.1] | [System] | API |
| F[X.3] | [System] | Webhook |
| ... | ... | ... |

---

## PRIORITY LEGEND

| Priority | Label | Definition |
|----------|-------|------------|
| P0 | Critical | Must have for any release |
| P1 | High | Must have for MVP |
| P2 | Medium | Should have for MVP |
| P3 | Low | Nice to have, can defer |

---

## MVP STATUS

### MVP v1.0 Features

| Feature | Status | Notes |
|---------|--------|-------|
| F[X.1] | Core | Required |
| F[X.2] | Core | Required |
| F[X.3] | MVP | Included |
| F[X.4] | MVP | Included |

### Post-MVP Features

| Feature | Target Version | Notes |
|---------|----------------|-------|
| F[X.5] | v1.1 | [Reason for deferral] |
| F[X.6] | v2.0 | [Reason for deferral] |

---

## SUCCESS CRITERIA SUMMARY

### Epic Completion Criteria
- [ ] All P0 features implemented and tested
- [ ] All P1 features implemented and tested
- [ ] Performance targets met
- [ ] Error scenarios handled
- [ ] Integration tests passing

### Epic-Level Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Feature Completion | 100% | [X]% |
| Test Coverage | [X]% | [X]% |
| Bug Count | < [X] | [X] |
| Performance | [Target] | [Current] |

---

## DOCUMENT GOVERNANCE

### Related Documents

| Document | Location | Status |
|----------|----------|--------|
| Master PRD | [Link] | Approved |
| Epic Overview | [Link] | Approved |
| Stories | `stories/Epic-[XX]-Stories.md` | [Status] |

### Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| [Date] | 1.0 | Initial creation | [Name] |

---

**Epic PRD Established:** [Date]
**Next Review:** [Date]
**Epic Owner:** [Name/Role]

---

*Epic [XX] PRD v1.0 | [Product Name] | Xyric Solutions | [Date]*

<!-- STORY_READY: E[XX] -->
```

---

## Output Structure

### File: `PRODUCTS/{product}/prd-epics/PRD-Epic-[XX]-[Name].md`

**Typical Length:** 300-600 lines per epic
**Content:** Full feature specifications
**Quality Bar:** Based on yHealth Epic PRD examples

---

## Quality Checklist

### Section Completeness
- [ ] Epic Overview (statement, goal, philosophy, feature summary)
- [ ] Personas Served (primary and secondary)
- [ ] All features specified (F[X.1] through F[X.N])
- [ ] Integration Points (within epic, cross-epic, external)
- [ ] Priority Legend
- [ ] MVP Status
- [ ] Success Criteria Summary
- [ ] Document Governance

### Feature Specification Checks
- [ ] Every feature has description (2+ paragraphs)
- [ ] Every feature has user story (As a... I want... so that...)
- [ ] Every feature has success metrics table (3+ metrics)
- [ ] Every feature has acceptance criteria (3+ checkboxes)
- [ ] Every feature has error scenarios table (3+ scenarios)
- [ ] Every feature has dependencies documented

### Quality Standards
- [ ] All metrics have quantified targets
- [ ] All acceptance criteria are testable
- [ ] All error messages are user-friendly
- [ ] All dependencies are explicit
- [ ] Consistent feature ID format (F[X.Y])
- [ ] No placeholder text

---

## Integration with Other Skills

### Upstream Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-22** (Epic Generator) | Input: Epic outline with statement, goal, feature list, personas |
| **EXPERT-21** (PRD Generator) | Reference: Feature details, personas, success metrics |

### Skill Invocations (During PRD Generation)

| Phase | Skill | Purpose |
|-------|-------|---------|
| **Questions** | BI-02 (Business Insights) | Feature analysis question framework |
| **Generation** | EXPERT-03 (Software Architect) | Epic-level and feature-level ADR decisions |

### Downstream Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-13** (Story Generator) | Output: Full Epic PRD with BDD criteria for story breakdown |
| | Handoff: `<!-- STORY_READY: E[XX] -->` |
| | Stories inherit BDD acceptance criteria format |

### Skill Invocation Pattern

```
EXPERT-23 generates Epic PRD
    │
    ├── Questions Phase
    │   └── Apply BI-02 feature analysis framework
    │
    ├── Generation Phase
    │   ├── Flag epic-level ADR decisions
    │   ├── Invoke EXPERT-03 for significant decisions
    │   ├── Generate BDD acceptance criteria
    │   └── Flag feature-level ADRs
    │
    └── Output Phase
        └── Handoff to EXPERT-13 for story generation
```

---

## Anti-Patterns

### DO NOT

1. **Generate without Epic Overview**
   - Always read Epic Overview first
   - Features must match Epic Overview list

2. **Skip acceptance criteria**
   - Every feature needs testable criteria
   - Validation blocks on missing criteria

3. **Use vague error messages**
   - Error scenarios must be specific
   - User messages must be helpful

4. **Generate all epics at once**
   - This skill is ONE epic at a time
   - EXPERT-22 generates all epic outlines

5. **Add new features**
   - Only specify features from Epic Overview
   - Don't invent new features

6. **Skip dependencies**
   - Feature dependencies must be explicit
   - Cross-epic dependencies documented

---

## Activation Checklist

When this skill is activated:

**Phase 0: Research**
1. [ ] Identify target epic (E[XX])
2. [ ] Read Epic Overview for epic outline
3. [ ] Read Master PRD for feature details
4. [ ] Read existing Epic PRDs for patterns
5. [ ] Generate Epic Context Summary (~250 words)

**Phase 1: Analysis**
6. [ ] Present Epic Context to user
7. [ ] Ask 4 tailored clarification questions
8. [ ] **WAIT for user responses**
9. [ ] (Optional) Ask follow-up questions if needed

**Phase 2: Generation**
10. [ ] Apply user decisions to feature specs
11. [ ] Generate features sequentially
12. [ ] Include all required elements per feature
13. [ ] Build integration points section

**Phase 3: Validation (Blocking)**
14. [ ] Verify all epic features specified
15. [ ] Verify all features have acceptance criteria
16. [ ] Verify all features have error scenarios
17. [ ] If fails → return to Phase 2 and fix

**Phase 4: Output**
18. [ ] Write to prd-epics/PRD-Epic-[XX]-[Name].md
19. [ ] Update PROGRESS.md
20. [ ] Include pipeline hooks for EXPERT-13
21. [ ] Present completion summary

---

*Skill EXPERT-23 v2.0 | Xyric Solutions | 2025-12-09*
*4-Phase Epic Outline → Detailed Epic PRD with blocking validation*
*BDD Format: Given/When/Then | ADR Flagging: EXPERT-03 | BI-02 Question Framework*
