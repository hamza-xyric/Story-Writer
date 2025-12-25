# EXPERT-13: Story Generator

**Skill ID**: EXPERT-13
**Category**: Expert Agents
**Priority**: High
**Version**: 4.0
**Last Updated**: 2025-12-24
**Architecture**: 4-Phase Workflow with Multi-File Output

---

## Purpose

Break down product Epics into comprehensive, well-defined User Stories using an **interactive two-phase workflow**. This skill ensures consistent story quality across all Epics while gathering stakeholder input before generation.

**Core Philosophy**: Stories define **WHAT** needs to be done, not **HOW** to implement it. All stories combined must achieve 100% Epic coverage with no gaps.

---

## When to Activate

### Trigger Phrases
- "Break down Epic [X]"
- "Generate stories for Epic [X]"
- "Epic to stories"
- "Story breakdown for [Epic name]"
- "Create user stories from [Epic]"
- "Epic → Story breakdown"

### Related Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-10** (Product Manager) | MoSCoW prioritization, PRD structure, lifecycle alignment |
| **EXPERT-03** (Software Architect) | Technical feasibility, modularity, scalability |
| **BI-02** (Question Framework) | Breaking requirements into testable hypotheses |
| **DEV-02** (Test Generator) | Acceptance criteria patterns, test case thinking |
| **EXPERT-04** (QA Engineer) | TDD/BDD story structure |

---

## Required Context Sources

Before generating stories, gather context from the PRODUCT folder:

| Priority | Source | Path Pattern | Extract |
|----------|--------|--------------|---------|
| Critical | Epic PRD | `prd-epics/PRD-Epic-XX-*.md` | Feature definitions |
| Critical | Existing Stories | `stories/S*-*.md`, `stories/Epic-*-Index.md` | Template patterns |
| High | Product Requirements | `Product-Requirements-Document.md` | Success metrics |
| High | PROGRESS.md | `PROGRESS.md` | Global decisions |
| Medium | Vision docs | `*Vision*.md` | Strategic alignment |
| Medium | Cross-Epic PRDs | `prd-epics/PRD-Epic-*.md` | Dependencies |
| Low | Design docs | `design/*.md` | UI/UX context |

**Key Principle:** Epic PRD is the PRIMARY input. Other sources provide supporting context but should never block story generation.

---

## Template & Context Loading

### Template Reference
Read the Story template at: `FRAMEWORKS/templates/story-template.md`
Read the Epic Index template at: `FRAMEWORKS/templates/epic-index-template.md`

These templates define the required sections, structure, and format for:
- **Individual story files**: `S{Epic}-{Seq}-{slug}.md` (e.g., `S01-01-core-registration.md`)
- **Epic index file**: `Epic-{Number}-Stories-Index.md` (e.g., `Epic-01-Stories-Index.md`)

Always reference these templates during Phase 2 (Generation).

### Product Context
Load product-specific context from: `PRODUCTS/{product}/context/`

| File | Usage | Required |
|------|-------|----------|
| `personas.md` | Use accurate persona names in stories | Recommended |
| `terminology.md` | Apply consistent vocabulary | Recommended |
| `pillars.md` | Understand domain context | Optional |
| `design-decisions.md` | Respect existing decisions | Optional |

### Missing Context Handling
If context files are missing:
1. Notify user: "Context file `{filename}` not found for {product}"
2. Proceed using Epic PRD content as primary reference
3. Use generic persona references if `personas.md` unavailable

If `terminology.md` exists, use it to ensure consistent product vocabulary in story descriptions.

---

## The Xyric Way: Story Philosophy

### Core Principles

1. **Stories Define WHAT, Not HOW**
   - Comprehensively describe what needs to be accomplished
   - Implementation details deferred to task breakdown
   - Focus on user value, behaviors, constraints

2. **100% Epic Coverage**
   - All stories combined = complete Epic implementation
   - No gaps between stories
   - Verify with Feature → Story Coverage Matrix

3. **Flexible Sizing**
   - Story size determined by natural scope
   - Split based on cognitive load, not arbitrary rules
   - No predetermined story count per feature

4. **User-Adaptive Flexibility**
   - Feature variants combined by default
   - Split only when complexity demands separate stories
   - Error handling embedded unless substantial

5. **Evidence-Based Splitting**
   - Split when cognitive load is too high
   - Split when distinct personas have different needs
   - Split when error handling deserves dedicated focus
   - DO NOT split arbitrarily by feature variants

6. **Flexible Sizing (Not Equal Chunks)**
   - Stories divide requirements into manageable pieces, not equal sizes
   - Some stories may be larger, some smaller based on feature scope
   - Story count varies by Epic complexity (not fixed)
   - Ordering should make sequential implementation sense

7. **Product-Agnostic Design**
   - No hardcoded product patterns (e.g., no "Light/Deep mode")
   - Use generic placeholders `{product}` in paths
   - Skill works for ANY product's Epics
   - Adapt to product's actual structure and terminology

---

## Four-Phase Interactive Workflow

### Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 0: RESEARCH (Automated)                 │
├─────────────────────────────────────────────────────────────────┤
│  1. Gather context from product folder (see Required Sources)    │
│  2. Read existing stories for template patterns                  │
│  3. Check PROGRESS.md for global decisions                       │
│  4. Extract Epic PRD features, personas, dependencies            │
│  5. Classify feature complexity (Simple/Medium/Complex)          │
│  OUTPUT: Epic Analysis Summary (~500 words)                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: ANALYSIS & QUESTIONS                 │
├─────────────────────────────────────────────────────────────────┤
│  6. Present Epic summary (compressed, not full PRD)              │
│  7. Show context findings (global decisions, patterns)           │
│  8. Ask 9 tailored clarification questions                       │
│  9. ═══════════════ WAIT FOR USER INPUT ════════════════════════│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2: STORY GENERATION (Sequential)        │
├─────────────────────────────────────────────────────────────────┤
│  10. Apply user decisions to story breakdown                     │
│  11. FOR EACH FEATURE (sequentially):                            │
│      ├── Generate story/stories using template                   │
│      ├── Check for overlap with previous stories                 │
│      ├── Update running dependency graph                         │
│      └── Add to Feature → Story coverage matrix                  │
│  OUTPUT: Complete stories + dependency diagram + coverage matrix │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: VALIDATION (Blocking)                │
├─────────────────────────────────────────────────────────────────┤
│  12. COVERAGE CHECK: Every feature has ≥1 story                  │
│  13. DUPLICATE CHECK: No overlapping stories                     │
│  14. TEMPLATE CHECK: All 11 required sections present            │
│  15. QUALITY CHECK: BDD acceptance criteria, quantified metrics  │
│  IF ANY CHECK FAILS → Return to Phase 2, fix, re-validate       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4: OUTPUT & TRACKING                    │
├─────────────────────────────────────────────────────────────────┤
│  16. Write individual story files: stories/S[XX]-[YY]-slug.md    │
│  17. Write epic index: stories/Epic-XX-Stories-Index.md          │
│  18. Update PROGRESS.md with session details                     │
│  19. Output pipeline hooks for downstream skills                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Assumption Challenge Integration

**Invoke CORE-03** between Phase 0 (Research) and Phase 1 (Questions).

| Challenge Phase | Applied | Trigger |
|-----------------|---------|---------|
| A: Question Why | Yes | User provides priority assignments |
| B: Alternatives | No | (Light intensity - skip Phase B) |
| C: Stress Test | No | (Light intensity - skip Phase C) |

**Challenge Intensity:** Light (Phase A only)

**What to Challenge:**
- Priority assignments: "Why is this feature P0 vs P1?"
- Story granularity: "Why split/combine these stories this way?"
- Scope boundaries: "Should this story include X or is that separate?"

**Workflow Update:**
```
Phase 0: Research → CORE-03: Challenge (Light) → Phase 1: Questions → Phase 2: Generate → Phase 3: Validate
```

**Skip Challenge When:**
- User explicitly requests bypass ("skip challenge")
- Story revision (not new breakdown)
- Priorities already validated at Epic PRD level

**Reference:** See `claude-skills/00-core/CORE-03-assumption-challenge.md` for full framework.

---

### Phase 0: Research & Context Gathering

**Purpose:** Build unified context that informs ALL subsequent phases.

**Step 1: Identify Product & Epic**

User provides Epic number, path, or product name:
```
"Generate stories for Epic 03" → Identify product folder and Epic PRD
```

**Step 2: Read Epic PRD (Primary Input)**

This is the main input document. Extract:
- All Features (F[X.Y]) with descriptions
- Success metrics and acceptance criteria
- Dependencies and MVP status
- Error handling requirements

**Step 3: Gather Supporting Context (If Available)**

Check for these files and extract relevant context:

| Source | What to Extract | Why It Matters |
|--------|-----------------|----------------|
| Existing Stories | Template patterns, story structure | Ensures consistency |
| PROGRESS.md | Global decisions, prior learnings | Avoids repeating mistakes |
| Vision/PRD docs | Product success metrics | Stories align to product goals |

**Note:** Don't block on missing files. Use what's available.

**Step 4: Create Unified Epic Analysis**

Combine ALL context into one summary that will be used in Phase 1 and Phase 2:

```markdown
## Epic Analysis: E[XX] - [Name]

### From Epic PRD
**Features:** [N] total
- F[X.1]: [Name] - [Scope + complexity]
- F[X.2]: [Name] - [Scope + complexity]
...

**Success Metrics:** [From PRD - what must be measurable]
**Personas:** [Who benefits from this Epic]
**Dependencies:** [Cross-Epic and external]

### From Product Context (If Found)
**Global Decisions:** [From PROGRESS.md - decisions that apply]
**Template Patterns:** [From existing stories - structure to follow]
**Product Goals:** [From Vision - strategic alignment]

### Story Generation Guidance
**Recommended Story Count:** [Based on feature complexity]
**Key Constraints:** [Must be addressed in stories]
**Open Questions:** [Need user input in Phase 1]
```

**CRITICAL:** This unified analysis is the ONLY context used in Phase 1 and Phase 2. No re-reading of full documents.

---

### Phase 1: Questions & User Input

**INPUT:** Epic Analysis from Phase 0 (not raw PRD)

**Step 1: Present Epic Analysis to User**

Show the unified Epic Analysis summary. User sees:
- What features will become stories
- What context was gathered
- What decisions have already been made

**Step 2: Tailored Questions

**Critical**: Questions must include Epic context, not be generic.

#### Question Framework (9 Questions)

**STRATEGIC (3 Questions)**

**Q1. Priority Validation**
```markdown
Epic [XX] has [N] features, currently prioritized as:

| Feature | Name | Current Priority |
|---------|------|------------------|
| F[X.1]  | ...  | MVP Core         |
| F[X.2]  | ...  | MVP Core         |
...

Do you want to adjust any MoSCoW priorities?
- Example: Should [F[X.Y]] be P0 Must Have or P1 Should Have?
- Any features that should be explicitly Won't Have for MVP?
```

**Q2. Scope Boundaries**
```markdown
These features are marked MVP Core:
- [List features]

Are there any you want to explicitly EXCLUDE from MVP scope?
This won't delete them but will mark as post-MVP (Won't Have).
```

**Q3. Story Granularity**
```markdown
This Epic has [N] features with varying complexity:
- [F[X.1]]: [Simple/Medium/Complex] - [reason]
- [F[X.2]]: [Simple/Medium/Complex] - [reason]
...

Preference for story granularity?
- **Granular**: More stories (1-3 day dev time each), easier to track
- **Larger**: Fewer stories (5-7 day dev time each), less overhead
- **Mixed**: Granular for complex features, larger for simple ones
```

**TECHNICAL (2 Questions)**

**Q4. Tech Stack Constraints**
```markdown
This Epic has these technical dependencies:
- [API/Service 1]: [Purpose]
- [API/Service 2]: [Purpose]
...

Are there any technical constraints or preferences to factor in?
- Specific APIs already selected?
- Framework preferences?
- Architectural patterns to follow?
```

**Q5. Integration Priority**
```markdown
This Epic includes these integrations:
- [Integration 1]: [Description]
- [Integration 2]: [Description]
...

Which are MVP-critical vs can be deferred to post-MVP?
```

**UX (2 Questions)**

**Q6. Feature Variants (If Applicable)**
```markdown
Does this Epic have feature variants or modes?
- [F[X.Y]]: [Variant A] = [description], [Variant B] = [description]
- [F[X.Z]]: Single mode only
...

If variants exist, which should receive more implementation detail?
- **Primary-first**: Focus on main variant, secondary as enhancement
- **Full-coverage**: All variants equally detailed
- **N/A**: No variants in this Epic
```

**Note:** Skip this question if Epic has no feature variants.

**Q7. Error Handling Depth**
```markdown
This Epic defines these error scenarios:
- [Scenario 1]: [Brief description]
- [Scenario 2]: [Brief description]
...

How thorough should error handling be in stories?
- **Basic**: Happy path + critical errors only
- **Comprehensive**: All defined error scenarios
- **Enterprise-grade**: Additional edge cases beyond what's defined
```

**TIMELINE (2 Questions)**

**Q8. Implementation Phasing**
```markdown
Based on feature dependencies, I suggest these phases:

**Phase A: Foundation**
- [Features that enable others]

**Phase B: Core Experience**
- [Primary user flows]

**Phase C: Enhancement**
- [Polish, optimization]

Do you agree with this phasing, or want to adjust?
```

**Q9. External Dependencies**
```markdown
This Epic has external dependencies:
- [Dependency 1]: [Status if known]
- [Dependency 2]: [Status if known]
...

Are any of these blockers that will affect story sequencing?
Any dependencies not listed that I should know about?
```

---

### Phase 2: Story Generation

**INPUTS (from previous phases):**
- Epic Analysis from Phase 0 (features, context, constraints)
- User Answers from Phase 1 (priorities, scope, decisions)

**No re-reading of documents.** All context comes from Phase 0 summary.

**Step 6: Apply User Decisions**

Map user answers to story decisions:

| Decision | Impact on Stories |
|----------|-------------------|
| Priority changes | Adjust MoSCoW per story |
| Scope exclusions | Mark as Won't Have |
| Granularity | Determine split strategy |
| Tech constraints | Add to story constraints |
| Integration priority | Sequence dependencies |
| Mode balance | Detail level per mode |
| Error handling | Embed vs separate stories |
| Phasing | Group into sprints |
| External deps | Add to dependencies |

**Step 7-9: Generate Stories (Sequential)**

For each feature, sequentially:
1. Load feature spec from Epic Analysis Summary
2. Generate story/stories using template (below)
3. Check for overlap with previous stories
4. Update running dependency graph
5. Add to Feature → Story coverage matrix

**Why Sequential:**
- Context preserved across features
- Dependencies build incrementally
- No risk of overlapping stories
- Coverage verified in real-time

---

### Phase 3: Validation (Blocking)

**Purpose:** Quality gate - must pass ALL checks before output.

**Critical Checks (Block if Fail):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Coverage** | Every feature has ≥1 story | Return to Phase 2, add missing stories |
| **Duplicate** | No overlapping story scopes | Merge or differentiate stories |
| **Template** | All 11 required sections present | Add missing sections |
| **DAG** | Dependencies are acyclic | Fix circular dependencies |

**Quality Checks (Warning → Block if >3):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **BDD Format** | Acceptance criteria in Given/When/Then | Reformat criteria |
| **Quantified Metrics** | Success metrics are numeric | Add specific targets |
| **Edge Cases** | Error scenarios addressed | Document edge cases |
| **Open Questions** | Deferred decisions documented | List open questions |

**Validation Output:**
- ✅ All checks pass → Proceed to Phase 4
- ❌ Any critical check fails → Return to Phase 2

---

### Phase 4: Output & Tracking

**Step 1: Write Individual Story Files**

For each story generated, create: `PRODUCTS/{product}/stories/S[XX]-[YY]-{slug}.md`

**Filename Convention:**
- `S{Epic}-{Seq}-{slug}.md`
- Example: `S01-01-core-registration.md`, `S01-02-social-sign-in.md`
- Slug: lowercase, hyphenated, max 40 characters

**Each file contains:**
- YAML frontmatter: `type: story`, `id`, `title`, `epic`, `feature`, `product`, `priority`, `status`
- Full story content using template from `FRAMEWORKS/templates/story-template.md`

**Step 2: Write Epic Index File**

Create: `PRODUCTS/{product}/stories/Epic-XX-Stories-Index.md`

**Index contains:**
- Story Index table with links to individual files
- Dependency Diagram
- Feature → Story Coverage Matrix
- Implementation Phases
- Quick Links to related docs

Use template from `FRAMEWORKS/templates/epic-index-template.md`

**Step 3: Update PROGRESS.md**

Add session entry:
- Session timestamp
- Epic completed: E[XX]
- Stories generated: [count]
- Files created: list of S[XX]-[YY]-*.md files
- Decisions made (capture for future epics)
- Open questions for next session

**Step 4: Output Pipeline Hooks**

Include in Epic Index for downstream consumption:
- Story IDs list with file paths (for EXPERT-14)
- Technical dependencies identified
- Priority ordering for implementation
- Format in index: `| S01.1.1 | Title | ... | [View](./S01-01-slug.md) |`

---

## Story Template

```markdown
## S[Epic#].[Feature#].[Story#]: [Story Title]

### User Story
**As a** [persona],
**I want to** [action/capability],
**So that** [benefit/value].

### Story Type
- [ ] Feature | Enhancement | Technical | Integration

### Priority
- [ ] Must Have (P0) | Should Have (P1) | Could Have (P2) | Won't Have (P3)

### Scope Description

**User Experience:**
[What the user sees/experiences]

**Feature Variants (If Applicable):**
[Include if Epic has multiple modes/variants]
- **[Variant A]:** [Description]
- **[Variant B]:** [Description]

**Data Captured:**
| Field | Format | Validation | Privacy |
|-------|--------|------------|---------|
| ...   | ...    | ...        | ...     |

**Behaviors:**
[Expected system behaviors]

### Acceptance Criteria
Given [context],
When [action],
Then [expected outcome].

(Include criteria for: happy path, edge cases, error states)

### Success Metrics
- [Metric 1]: [Target]
- [Metric 2]: [Target]

### Constraints & Requirements
| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| [Requirement] | [Requirement] | [Requirement] | [Requirement] | [Requirement] |

### Dependencies
- **Prerequisite Stories:** [Stories that must be done first]
- **Related Stories:** [Stories that share components/data]
- **External Dependencies:** [APIs, services, approvals needed]

### Edge Cases & Errors
| Scenario | Expected Behavior |
|----------|-------------------|
| [Edge case 1] | [What should happen] |
| [Error state 1] | [How to handle gracefully] |

### Open Questions
- [Questions for task breakdown]
- [Technical decisions deferred to implementation]

### Definition of Done
- [ ] Acceptance criteria met
- [ ] Error scenarios handled
- [ ] Accessibility requirements verified
- [ ] Security requirements verified
- [ ] Performance requirements verified
```

---

## Output Structure

### Directory: `stories/`

```
stories/
├── Epic-01-Stories-Index.md      # Index with links to all stories
├── S01-01-core-registration.md   # Individual story file
├── S01-02-social-sign-in.md      # Individual story file
├── S01-03-privacy-consent.md     # Individual story file
└── ...                           # More story files
```

### File 1: `stories/Epic-XX-Stories-Index.md`

```markdown
# Epic XX: [Name] - Story Index

> **Epic:** E[XX] - [Name]
> **Source:** `prd-epics/PRD-Epic-XX-[Name].md`
> **Created:** [Date]
> **Updated:** [Date]
> **Stories:** [Count] ([Must Have count] Must Have, [Should Have count] Should Have)

---

## Story Index

| Story ID | Title | Feature | Priority | Status | File |
|----------|-------|---------|----------|--------|------|
| S[XX].1.1 | [Title] | F[X.1] | P0 (Must) | Draft | [View](./S[XX]-01-slug.md) |
| S[XX].1.2 | [Title] | F[X.1] | P1 (Should) | Draft | [View](./S[XX]-02-slug.md) |
...

---

## Dependency Diagram

```
PHASE 1: [NAME]
S[XX].1.1 ──┬──► S[XX].1.2
            └──► S[XX].1.3
                    │
                    ▼
PHASE 2: [NAME]
...
```

---

## Feature → Story Coverage Matrix

| Epic Feature | Story ID(s) | Files | Coverage |
|--------------|-------------|-------|----------|
| F[X.1]: [Name] | S[XX].1.1, S[XX].1.2 | [View](./S[XX]-01-*.md) | 100% |
...

**Completeness Verification:** All [N] features mapped to stories.

---

## Implementation Phases

| Phase | Sprint | Stories | Files | Deliverable |
|-------|--------|---------|-------|-------------|
| 1: [Name] | Sprint 1 | S[XX].1.1, ... | [Links] | [What's delivered] |
...

---

## Quick Links

| Resource | Link |
|----------|------|
| Epic PRD | [View](../prd-epics/PRD-Epic-XX-[Name].md) |
| Product PRD | [View](../Product-Requirements-Document.md) |
| PROGRESS.md | [View](../PROGRESS.md) |
```

### File 2: `stories/S[XX]-[YY]-[slug].md` (Individual Story)

```markdown
---
type: story
id: S[XX].[Feature].[Seq]
title: [Story Title]
epic: E[XX]
epic_name: [Epic Name]
feature: F[XX].[Feature]
feature_name: [Feature Name]
product: [product-name]
priority: P0
status: Draft
created: [Date]
---

# S[XX].[Feature].[Seq]: [Story Title]

## User Story

**As a** [persona],
**I want to** [action/capability],
**So that** [benefit/value].

---

## Story Type

- [ ] Feature | Enhancement | Technical | Integration

## Priority

- [ ] Must Have (P0) | Should Have (P1) | Could Have (P2) | Won't Have (P3)

---

[... remaining sections from story-template.md ...]

---

*Story S[XX].[Feature].[Seq] | Epic E[XX] | Product: [product]*
```

---

## Quality Checklist

### Completeness Check (Critical)
- [ ] All Epic features covered by at least one story
- [ ] No gaps between stories
- [ ] Error handling scenarios addressed
- [ ] Cross-cutting concerns embedded (security, accessibility, performance)
- [ ] All personas served by this Epic have relevant stories

### Scope Clarity Check
- [ ] Each story clearly describes WHAT (not HOW)
- [ ] Acceptance criteria are specific and testable
- [ ] Constraints and requirements are explicit
- [ ] Open questions documented for task breakdown

### Consistency Check
- [ ] Story naming follows pattern: S[Epic].[Feature].[Seq]
- [ ] All stories use same template structure
- [ ] Priority distribution is realistic
- [ ] Dependencies are logical (no circular deps)

### Traceability Check
- [ ] Every story links back to Epic feature(s)
- [ ] Dependencies map correctly
- [ ] Success metrics align with Epic success criteria

---

## Integration with Other Skills

### EXPERT-10 (Product Manager)
- Use for MoSCoW prioritization decisions
- Align with 5-stage product lifecycle
- Validate story value propositions

### EXPERT-03 (Software Architect)
- Validate technical feasibility of stories
- Identify architectural concerns
- Review integration dependencies

### BI-02 (Question Framework)
- Structure acceptance criteria as hypotheses
- Define measurable success metrics
- Create testable assertions

### DEV-02 (Test Generator)
- Generate test cases from acceptance criteria
- Identify edge cases
- Define Definition of Done

### EXPERT-04 (QA Engineer)
- BDD structure for acceptance criteria
- Given/When/Then patterns
- Test coverage validation

---

## Anti-Patterns

### DO NOT

1. **Auto-generate without questions**
   - Always ask the 9 clarification questions
   - User input ensures alignment and surfaces refinements

2. **Split feature variants arbitrarily**
   - Combine variants in single story by default
   - Split only when implementations are substantially different

3. **Prescribe HOW in stories**
   - Stories define WHAT needs to be done
   - Implementation approach is for task breakdown

4. **Skip coverage verification**
   - Always create Feature → Story matrix
   - Verify 100% coverage before completing

5. **Use generic questions**
   - Questions must include Epic context
   - Show understanding of specific features

6. **Ignore error handling**
   - Embed error scenarios in stories
   - Only separate when complexity warrants

---

## Example: Epic 03 Tailored Questions

### Q1. Priority Validation (Tailored)

```markdown
Epic 03 (WhatsApp Integration) has 7 features, all marked MVP Core:

| Feature | Name | Current Priority |
|---------|------|------------------|
| F3.1 | WhatsApp Account Linking | MVP Core |
| F3.2 | Text-Based Coaching | MVP Core |
| F3.3 | Photo Analysis | MVP Core |
| F3.4 | Voice Message Processing | MVP Core |
| F3.5 | Proactive Nudges | MVP Core |
| F3.6 | Quick Logging | MVP Core |
| F3.7 | Cross-Channel Sync | MVP Core |

Do you want to adjust any priorities?
- Should Photo Analysis (F3.3) be P0 Must Have or P1 Should Have?
- Is Voice Message Processing (F3.4) MVP critical or could it be post-MVP?
- Could Proactive Nudges (F3.5) be deferred to enhance v1.1?
```

### Q4. Tech Stack Constraints (Tailored)

```markdown
Epic 03 has these technical dependencies:
- **WhatsApp Business API**: Message sending, receiving, templates
- **SMS Provider (Twilio)**: Phone verification codes
- **AI/ML Service**: Photo analysis, voice processing, sentiment detection
- **Cloud Storage**: Media file handling

Are there any technical constraints?
- WhatsApp Business API tier (standard vs enterprise)?
- Preferred AI provider for photo/voice analysis?
- Storage requirements for media files?
```

---

## Activation Checklist

When this skill is activated:

**Phase 0: Research**
1. [ ] Confirm Epic number/path and product folder
2. [ ] Gather context from product folder (see Required Sources)
3. [ ] Generate Epic Analysis Summary (~500 words)

**Phase 1: Analysis**
4. [ ] Present Epic summary to user
5. [ ] Ask 9 tailored clarification questions
6. [ ] **WAIT for user responses**

**Phase 2: Generation**
7. [ ] Apply user decisions to story breakdown
8. [ ] Generate stories sequentially (no overlaps)
9. [ ] Build dependency graph and coverage matrix

**Phase 3: Validation (Blocking)**
10. [ ] Verify 100% feature coverage
11. [ ] Check no duplicate/overlapping stories
12. [ ] Validate template compliance
13. [ ] If fails → return to Phase 2 and fix

**Phase 4: Output**
14. [ ] Write individual story files: stories/S[XX]-[YY]-slug.md
15. [ ] Write epic index: stories/Epic-XX-Stories-Index.md
16. [ ] Update PROGRESS.md
17. [ ] Present completion summary

---

*Skill EXPERT-13 v4.0 | Xyric Solutions | 2025-12-24*
*4-Phase Product-Agnostic Epic → Story breakdown with multi-file output*
