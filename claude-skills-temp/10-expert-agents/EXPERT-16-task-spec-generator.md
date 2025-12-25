# EXPERT-16: Task Implementation Guide Generator

**Skill ID**: EXPERT-16
**Category**: Expert Agents
**Priority**: Critical
**Version**: 2.0
**Last Updated**: 2025-12-09
**Architecture**: 4-Phase Workflow with Blocking Validation
**Type**: Individual (One Task at a Time)

---

## Purpose

Transform a Task from EXPERT-15 into a high-level Implementation Guide that provides strategic direction, patterns, and considerations for engineers. This is the final skill in the pipeline, producing documentation that guides implementation without dictating specific code.

**Core Philosophy**: Implementation guides provide direction, not dictation. They identify patterns to apply, considerations to address, and quality criteria to meet—empowering engineers to make implementation decisions within well-defined boundaries.

**Key Distinction**: This skill produces HIGH-LEVEL GUIDANCE only. No code examples, no boilerplate templates, no language-specific implementation details. Engineers bring their expertise to the implementation; this guide provides the strategic context.

---

## When to Activate

### Trigger Phrases
- "Create implementation guide for task [ID]"
- "Generate task spec for [task]"
- "Implementation plan for task [ID]"
- "Detail task [ID] for implementation"
- "Task implementation guide"
- "High-level guide for task [ID]"

### Related Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-15** (Task Generator) | Task → Implementation Guide (upstream) |
| **EXPERT-03** (Software Architect) | Architecture patterns, ADR flagging |
| **EXPERT-04** (TDD Expert) | Testing strategy, quality checklist |
| **DEV-02** (Code Reviewer) | Review criteria alignment |
| **EXPERT-01** (Backend Engineer) | Backend implementation |
| **EXPERT-02** (Frontend Engineer) | Frontend implementation |
| **EXPERT-05** (Fullstack Engineer) | Fullstack implementation |

---

## Required Context Sources

Before generating an implementation guide, gather context from:

| Priority | Source | Path Pattern | Extract |
|----------|--------|--------------|---------|
| Critical | Task Breakdown | `PRODUCTS/{product}/tasks/Story-*-Tasks.md` | Target task |
| Critical | Tech Spec | `PRODUCTS/{product}/specs/Story-*-Spec.md` | Technical details |
| High | Codebase | Project files | Existing patterns |
| Medium | Design System | `PRODUCTS/{product}/design/*.md` | UI patterns |
| Medium | PROGRESS.md | `PRODUCTS/{product}/PROGRESS.md` | Architecture decisions |
| Low | ADR docs | `PRODUCTS/{product}/docs/adr/*.md` | Prior decisions |

**Key Principle:** Task from EXPERT-15 is the PRIMARY input. The implementation guide provides strategic direction, not step-by-step coding instructions.

---

## Implementation Guide Philosophy

### What This Skill DOES

1. **Identifies Patterns**
   - Which design patterns apply
   - Which project patterns to follow
   - Which anti-patterns to avoid

2. **Highlights Considerations**
   - Technical trade-offs
   - Performance implications
   - Security concerns
   - Integration complexity

3. **Defines Quality Criteria**
   - Testing requirements
   - Review focus areas
   - Definition of done

4. **Flags Decisions**
   - Architecture decisions needing ADR
   - Trade-offs requiring team input
   - Open technical questions

5. **Maps Dependencies**
   - What must exist before this task
   - What this task enables
   - Integration touchpoints

### What This Skill Does NOT

1. **No Code Examples**
   - No function signatures
   - No boilerplate templates
   - No language-specific snippets

2. **No Implementation Details**
   - No line-by-line instructions
   - No file-by-file changes
   - No exact variable names

3. **No Prescriptive Steps**
   - Engineers choose approach
   - Multiple valid implementations exist
   - Flexibility within boundaries

---

## Skill Invocations

This skill invokes other Xyric skills during execution:

### EXPERT-03 (Software Architect)
**When:** Architecture decisions identified
**Purpose:** Flag decisions needing ADR, validate pattern choices
**Output:** ADR recommendation flags

### EXPERT-04 (TDD Expert)
**When:** Quality checklist generation
**Purpose:** Define testing strategy and criteria
**Output:** Test coverage expectations, TDD checklist

### DEV-02 (Code Reviewer)
**When:** Review criteria section
**Purpose:** Align review focus areas with standards
**Output:** Review checklist items

---

## Four-Phase Interactive Workflow

### Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 0: RESEARCH (Automated)                 │
├─────────────────────────────────────────────────────────────────┤
│  1. Read Task from task breakdown document                       │
│  2. Read related Tech Spec sections                              │
│  3. Explore codebase for existing patterns                       │
│  4. Identify implementation considerations                       │
│  OUTPUT: Task Implementation Context (~200 words)                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: ANALYSIS & QUESTIONS                 │
├─────────────────────────────────────────────────────────────────┤
│  5. Present task context to engineer                             │
│  6. Identify implementation decisions needed                     │
│  7. Ask 3 tailored questions                                     │
│  8. ═══════════════ WAIT FOR USER INPUT ════════════════════════│
│  9. (Optional) Ask follow-up questions if needed                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2: GENERATION (Sequential)              │
├─────────────────────────────────────────────────────────────────┤
│  10. Apply user decisions to implementation approach             │
│  11. Generate high-level implementation guide                    │
│  12. Invoke EXPERT-04 for testing strategy                       │
│  13. Flag ADR decisions for EXPERT-03                           │
│  OUTPUT: Complete Implementation Guide                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: VALIDATION (Blocking)                │
├─────────────────────────────────────────────────────────────────┤
│  14. CRITERIA CHECK: All task acceptance criteria addressed      │
│  15. PATTERN CHECK: Patterns identified, not prescribed          │
│  16. NO-CODE CHECK: Zero code examples in output                 │
│  17. QUALITY CHECK: Testing and review criteria complete         │
│  IF ANY CHECK FAILS → Return to Phase 2, fix, re-validate      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4: OUTPUT & TRACKING                    │
├─────────────────────────────────────────────────────────────────┤
│  18. Write to tasks/guides/Task-[ID]-Guide.md                   │
│  19. Update PROGRESS.md with session details                     │
│  20. Ready for engineer implementation                           │
└─────────────────────────────────────────────────────────────────┘
```

---

### Phase 0: Research & Context Gathering

**Purpose:** Extract task details and gather implementation context.

**Step 1: Identify Target Task**

User specifies which task:
- Task ID: T[Story].[Seq] (e.g., T01.01.01.03)
- Task title: [From Tasks document]

**Step 2: Extract from Task Breakdown**

Find the target task and extract:
- Task title and description
- Type (Backend/Frontend/Fullstack)
- Assignee
- Acceptance criteria
- Technical notes
- Dependencies

**Step 3: Extract from Tech Spec**

Get related technical details:
- Relevant contracts/interfaces
- Data model implications
- Integration requirements
- Performance expectations

**Step 4: Explore Codebase Patterns**

Identify existing patterns:
- Similar implementations in codebase
- Project conventions
- Test patterns in use
- Architecture patterns established

**Step 5: Create Task Implementation Context**

```markdown
## Task Implementation Context: [Task ID]

### Task Summary
**ID:** T[XX.YY.ZZ.WW]
**Title:** [Title]
**Type:** Backend | Frontend | Fullstack
**Assignee:** EXPERT-01 | EXPERT-02 | EXPERT-05
**Complexity:** S | M | L | XL

### Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

### Technical Context
**From Tech Spec:**
- [Relevant interface/contract]
- [Relevant data model]
- [Relevant integration point]

**From Codebase:**
- Similar patterns at: [general locations]
- Project conventions: [key patterns]
- Test approach: [pattern in use]

### Considerations Identified
- [Consideration 1]: [Options/trade-offs]
- [Consideration 2]: [Options/trade-offs]

### Potential ADR Flags
- [Decision that may need ADR]
```

---

### Phase 1: Questions & User Input

**INPUT:** Task Implementation Context from Phase 0

**Step 1: Present Context**

Show the Task Implementation Context. Engineer sees:
- Task summary and acceptance criteria
- Technical context from spec and codebase
- Considerations that need input

**Step 2: Tailored Questions**

#### Question Framework (3 Questions)

**Q1. Implementation Approach**
```markdown
This task requires implementing: [Description]

Based on existing codebase patterns, relevant approaches include:

**Approach A: [Name]**
- Pattern: [Which pattern this follows]
- Trade-offs: [Key considerations]
- Alignment: [How it fits existing code]

**Approach B: [Name]**
- Pattern: [Which pattern this follows]
- Trade-offs: [Key considerations]
- Alignment: [How it fits existing code]

Questions:
a) Which approach aligns better with your vision?
b) Any constraints I should know about?
c) Existing patterns to follow or consciously deviate from?
```

**Q2. Integration & Dependencies**
```markdown
This task integrates with:
- [Integration point 1]: [Considerations]
- [Integration point 2]: [Considerations]

Questions:
a) Any integration complexities I should highlight?
b) Coordination needed with other tasks/engineers?
c) External dependencies or blockers?
```

**Q3. Quality & Review Focus**
```markdown
Questions:
a) Testing priority for this task:
   - Unit test focus areas?
   - Integration test requirements?
   - Manual validation needed?

b) Review focus areas:
   - Security considerations?
   - Performance concerns?
   - Architecture alignment?

c) Definition of done beyond acceptance criteria?
```

---

### Phase 2: Implementation Guide Generation

**INPUTS (from previous phases):**
- Task Implementation Context from Phase 0
- User Answers from Phase 1

**Step 1: Apply User Decisions**

Map user answers to guide sections:

| Decision | Impact on Guide |
|----------|-----------------|
| Implementation approach | Pattern selection |
| Integration notes | Dependency mapping |
| Quality focus | Testing/review criteria |

**Step 2: Generate Guide (Sequential)**

Generate each section sequentially:
1. Task Context & Dependencies
2. Implementation Approach
3. Key Patterns to Apply
4. Technical Considerations
5. Integration Points
6. Quality Checklist (invoke EXPERT-04)
7. Architecture Decisions (invoke EXPERT-03)
8. Review Criteria (invoke DEV-02)
9. Definition of Done

**Step 3: Invoke Related Skills**

- **EXPERT-04**: Generate testing strategy section
- **EXPERT-03**: Review ADR flags, add architecture notes
- **DEV-02**: Align review criteria

---

### Phase 3: Validation (Blocking)

**Purpose:** Quality gate - must pass ALL checks before output.

**Critical Checks (Block if Fail):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Criteria Coverage** | All task AC addressed | Add coverage mapping |
| **Pattern Focus** | Patterns identified, not prescribed | Rewrite prescriptive sections |
| **No-Code Compliance** | Zero code examples | Remove any code |
| **Quality Complete** | Testing and review sections present | Add missing sections |

**Quality Checks (Warning → Block if >3):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Considerations** | Trade-offs documented | Add considerations |
| **Dependencies** | Integration points clear | Map dependencies |
| **ADR Flags** | Decisions flagged appropriately | Review decisions |
| **Skill Invocations** | Related skills referenced | Add invocations |

**Validation Output:**
- ✅ All checks pass → Proceed to Phase 4
- ❌ Any critical check fails → Return to Phase 2

---

### Phase 4: Output & Tracking

**Step 1: Write Implementation Guide**

Create: `PRODUCTS/{product}/tasks/guides/Task-[ID]-Guide.md`

**Step 2: Update PROGRESS.md**

Add session entry:
- Session timestamp
- Task: [Task ID]
- Implementation guide created
- ADR flags: [List any]
- Ready for implementation

**Step 3: Ready for Engineer**

Guide is now ready for:
- EXPERT-01 (Backend tasks)
- EXPERT-02 (Frontend tasks)
- EXPERT-05 (Fullstack tasks)

---

## Implementation Guide Template

```markdown
# Implementation Guide: Task [ID]
**[Task Title]**

---

## DOCUMENT INFORMATION

| Attribute | Value |
|-----------|-------|
| **Task ID** | T[XX.YY.ZZ.WW] |
| **Task Title** | [Title] |
| **Story** | S[XX.YY.ZZ] |
| **Type** | Backend / Frontend / Fullstack |
| **Assignee** | EXPERT-01 / EXPERT-02 / EXPERT-05 |
| **Complexity** | S / M / L / XL |
| **Version** | 1.0 |
| **Last Updated** | [Date] |

---

## 1. TASK CONTEXT & DEPENDENCIES

### Description
[Clear description of what this task accomplishes, including context for why it matters. NO implementation details.]

### Acceptance Criteria
| ID | Criterion | Addressed By |
|----|-----------|--------------|
| AC1 | [Criterion 1] | [Which pattern/approach] |
| AC2 | [Criterion 2] | [Which pattern/approach] |
| AC3 | [Criterion 3] | [Which pattern/approach] |

### Prerequisites
- [ ] Task T[X.Y]: [What it provides]
- [ ] [System/service] access configured
- [ ] [Prerequisite knowledge/understanding]

### Downstream Impact
- Enables: Task T[A.B], Task T[C.D]
- Integration point for: [Component/feature]

---

## 2. IMPLEMENTATION APPROACH

### Recommended Pattern
**Pattern:** [Pattern name - e.g., Repository Pattern, Observer, Factory]

**Why This Pattern:**
- [Reason 1 - alignment with existing code]
- [Reason 2 - fits requirements]
- [Reason 3 - team familiarity]

**Alternative Considered:**
- [Alternative pattern]: Not chosen because [reason]

### Approach Overview
[2-3 paragraphs describing the HIGH-LEVEL approach. Focus on WHAT to achieve, not HOW to code it.]

### Key Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| [Decision 1] | [Choice] | [Why] |
| [Decision 2] | [Choice] | [Why] |

---

## 3. KEY PATTERNS TO APPLY

### Project Patterns
Follow these established patterns from the codebase:

| Pattern | Where Used | Apply To |
|---------|------------|----------|
| [Pattern 1] | [Existing location] | [This task aspect] |
| [Pattern 2] | [Existing location] | [This task aspect] |
| [Pattern 3] | [Existing location] | [This task aspect] |

### Anti-Patterns to Avoid
| Anti-Pattern | Why Avoid | Better Approach |
|--------------|-----------|-----------------|
| [Anti-pattern 1] | [Problem it causes] | [What to do instead] |
| [Anti-pattern 2] | [Problem it causes] | [What to do instead] |

---

## 4. TECHNICAL CONSIDERATIONS

### Performance
- [Performance consideration 1]
- [Performance consideration 2]
- Target: [Performance target if specified]

### Security
- [Security consideration 1]
- [Security consideration 2]
- **Invoke EXPERT-03** if security architecture decision needed

### Scalability
- [Scalability consideration]
- Future-proofing: [What to keep in mind]

### Error Handling
- [Error scenario to handle]
- [Error scenario to handle]
- User experience: [Error UX approach]

---

## 5. INTEGRATION POINTS

### Internal Integrations
| Component | Integration Type | Considerations |
|-----------|------------------|----------------|
| [Component 1] | [Type] | [Key consideration] |
| [Component 2] | [Type] | [Key consideration] |

### External Integrations (if any)
| Service | Integration Type | Considerations |
|---------|------------------|----------------|
| [Service 1] | [API/Event/etc.] | [Key consideration] |

### Data Flow
[High-level description of how data flows through this task's implementation]

---

## 6. QUALITY CHECKLIST

*Generated with guidance from EXPERT-04 (TDD Expert)*

### Testing Strategy
| Test Type | Focus Areas | Priority |
|-----------|-------------|----------|
| Unit Tests | [What to unit test] | High |
| Integration Tests | [What to integration test] | [Priority] |
| E2E Tests | [If needed] | [Priority] |

### Test Approach
- **TDD Recommended:** [Yes/No] - [Reason]
- **Coverage Focus:** [Key areas needing coverage]
- **Edge Cases:** [Edge cases to test]

### Test Criteria
- [ ] [Test criterion 1]
- [ ] [Test criterion 2]
- [ ] [Test criterion 3]

---

## 7. ARCHITECTURE DECISIONS

*Flagged for EXPERT-03 (Software Architect) review*

### ADR Required?
| Decision | ADR Needed | Reason |
|----------|------------|--------|
| [Decision 1] | Yes/No | [Why/why not] |
| [Decision 2] | Yes/No | [Why/why not] |

### Architecture Alignment
- Aligns with: [Existing architecture pattern]
- Deviates from: [Any deviation] - Justified by: [Reason]

### Open Questions for Architect
- [Question 1 if any]
- [Question 2 if any]

---

## 8. REVIEW CRITERIA

*Aligned with DEV-02 (Code Reviewer) standards*

### Review Focus Areas
| Area | What to Check | Priority |
|------|---------------|----------|
| Functionality | [Specific checks] | High |
| Code Quality | [Specific checks] | High |
| Performance | [Specific checks] | [Priority] |
| Security | [Specific checks] | [Priority] |
| Testing | [Specific checks] | High |

### Common Issues to Watch
- [Potential issue 1]: [What reviewer should check]
- [Potential issue 2]: [What reviewer should check]

---

## 9. DEFINITION OF DONE

### Task Completion Checklist
- [ ] All acceptance criteria met
- [ ] Implementation follows identified patterns
- [ ] Technical considerations addressed
- [ ] Tests written and passing
- [ ] Code reviewed and approved
- [ ] No linting/type errors
- [ ] Documentation updated (if applicable)

### Quality Gates
- [ ] EXPERT-04 testing criteria satisfied
- [ ] DEV-02 review criteria passed
- [ ] EXPERT-03 architecture alignment confirmed (if ADR flagged)

---

## RELATED DOCUMENTS

| Document | Location | Purpose |
|----------|----------|---------|
| Task Breakdown | `tasks/Story-[ID]-Tasks.md` | Task context |
| Tech Spec | `specs/Story-[ID]-Spec.md` | Technical details |
| Story | `stories/Epic-XX-Stories.md` | User story |

---

**Implementation Guide Created:** [Date]
**Task Owner:** [Name/Role]
**Assigned Engineer:** [EXPERT-01/02/05]

---

*Implementation Guide v1.0 | Task [ID] | [Product Name] | [Date]*

<!-- IMPLEMENTATION_READY: T[XX.YY.ZZ.WW] -->
```

---

## Output Structure

### File: `PRODUCTS/{product}/tasks/guides/Task-[ID]-Guide.md`

**Typical Length:** 150-250 lines per task
**Content:** High-level implementation guidance
**Quality Bar:** Empowers engineers without prescribing code

---

## Quality Checklist

### Content Standards
- [ ] NO code examples anywhere in document
- [ ] NO language-specific implementation details
- [ ] NO boilerplate templates
- [ ] Patterns described, not prescribed
- [ ] Trade-offs documented, not decided
- [ ] Engineer autonomy preserved

### Section Completeness
- [ ] Task Context & Dependencies
- [ ] Implementation Approach (high-level)
- [ ] Key Patterns to Apply
- [ ] Technical Considerations
- [ ] Integration Points
- [ ] Quality Checklist (from EXPERT-04)
- [ ] Architecture Decisions (flagged for EXPERT-03)
- [ ] Review Criteria (from DEV-02)
- [ ] Definition of Done

### Skill Integration
- [ ] EXPERT-04 testing strategy incorporated
- [ ] EXPERT-03 ADR flags included
- [ ] DEV-02 review criteria aligned

---

## Integration with Other Skills

### EXPERT-15 (Task Generator)
- Input: Task from Task Breakdown
- Inherits: Acceptance criteria, technical notes, dependencies

### EXPERT-03 (Software Architect)
- Invoked for: ADR decision flagging
- Provides: Architecture alignment validation

### EXPERT-04 (TDD Expert)
- Invoked for: Testing strategy section
- Provides: Test criteria, TDD recommendations

### DEV-02 (Code Reviewer)
- Invoked for: Review criteria alignment
- Provides: Review focus areas

### EXPERT-01/02/05 (Engineers)
- Consumers: Engineers implement using this guide
- Guide provides direction, engineers provide expertise

---

## Anti-Patterns

### DO NOT

1. **Include code examples**
   - No function signatures
   - No code snippets
   - No boilerplate templates

2. **Prescribe exact implementation**
   - Guide, don't dictate
   - Multiple valid approaches exist
   - Engineer chooses specifics

3. **Skip skill invocations**
   - EXPERT-04 for testing
   - EXPERT-03 for architecture
   - DEV-02 for review criteria

4. **Generate without task context**
   - Always read task and tech spec first
   - Implementation must match requirements

5. **Leave decisions unresolved**
   - Flag decisions that need input
   - Document trade-offs considered
   - Provide recommendations, not mandates

6. **Forget quality sections**
   - Testing strategy is required
   - Review criteria are required
   - Definition of done is required

---

## Activation Checklist

When this skill is activated:

**Phase 0: Research**
1. [ ] Identify target task (T[XX.YY.ZZ.WW])
2. [ ] Read task from Task Breakdown
3. [ ] Read related Tech Spec sections
4. [ ] Explore codebase for patterns
5. [ ] Generate Task Implementation Context (~200 words)

**Phase 1: Analysis**
6. [ ] Present context to engineer
7. [ ] Ask 3 tailored questions
8. [ ] **WAIT for user responses**
9. [ ] (Optional) Ask follow-up questions if needed

**Phase 2: Generation**
10. [ ] Apply user decisions
11. [ ] Generate all sections sequentially
12. [ ] Invoke EXPERT-04 for testing strategy
13. [ ] Flag ADR decisions for EXPERT-03
14. [ ] Align review criteria with DEV-02

**Phase 3: Validation (Blocking)**
15. [ ] Verify all acceptance criteria addressed
16. [ ] Verify NO code examples in output
17. [ ] Verify patterns identified, not prescribed
18. [ ] If fails → return to Phase 2 and fix

**Phase 4: Output**
19. [ ] Write to tasks/guides/Task-[ID]-Guide.md
20. [ ] Update PROGRESS.md
21. [ ] Present completion summary
22. [ ] Hand off to assigned engineer

---

*Skill EXPERT-16 v2.0 | Xyric Solutions | 2025-12-09*
*4-Phase Task → High-Level Implementation Guide with skill invocations*
*Final skill in the Idea → Code pipeline*
*NO CODE EXAMPLES - Engineers bring implementation expertise*
