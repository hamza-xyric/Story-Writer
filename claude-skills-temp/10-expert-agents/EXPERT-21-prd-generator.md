# EXPERT-21: PRD Generator

**Skill ID**: EXPERT-21
**Category**: Expert Agents
**Priority**: Critical
**Version**: 2.0
**Last Updated**: 2025-12-09
**Architecture**: 4-Phase Workflow with Blocking Validation
**Focus**: Product requirements (NOT business metrics)

---

## Purpose

Transform a Vision Document into a comprehensive Product Requirements Document (PRD) with defined features, user personas, success metrics, and epic breakdown. This skill ensures the strategic vision is translated into actionable product requirements.

**Core Philosophy**: The PRD bridges vision and execution. It transforms the "what" and "why" from the vision into the "what specifically" with detailed requirements, personas, features, and success criteria that guide development.

---

## When to Activate

### Trigger Phrases
- "Create a PRD from [vision document]"
- "Generate PRD for [product]"
- "Product requirements from vision"
- "Transform vision into PRD"
- "PRD for [product name]"
- "Vision → PRD for [product]"
- "Create requirements document"

### Related Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-20** (Vision Generator) | Vision → PRD transformation (upstream) |
| **EXPERT-27** (Technical Architecture Generator) | PRD → Architecture transformation (downstream) |
| **EXPERT-22** (Epic Generator) | Architecture → Epics (receives from EXPERT-27) |
| **EXPERT-10** (Product Manager) | Strategic alignment, MoSCoW, lifecycle |
| **EXPERT-03** (Software Architect) | Technical feasibility validation |
| **EXPERT-11** (UX/UI Designer) | User experience alignment |
| **BI-02** (Hypothesis Questions) | Competitive analysis framing, questions |

---

## Required Context Sources

Before generating a PRD, gather context from available sources:

| Priority | Source | Path Pattern | Extract |
|----------|--------|--------------|---------|
| Critical | Vision Document | `PRODUCTS/{product}/*Vision*.md` | Strategic foundation |
| High | Existing PRDs | `PRODUCTS/**/Product-Requirements*.md` | Template patterns |
| High | Existing Epic PRDs | `PRODUCTS/**/prd-epics/*.md` | Epic structure patterns |
| Medium | PROGRESS.md | `PRODUCTS/{product}/PROGRESS.md` | Session context |
| Medium | Company Context | `COMPANY/*.md` | Company standards |
| Low | Design docs | `PRODUCTS/{product}/design/*.md` | UI/UX context |

**Key Principle:** Vision Document is the PRIMARY input. PRD translates vision into actionable requirements without contradicting or expanding beyond vision scope.

---

## Template & Context Loading

### Template Reference
Read the PRD template at: `FRAMEWORKS/templates/prd-template.md`

This template defines the required sections, structure, and format for PRDs. Always reference this template during Phase 2 (Generation).

### Product Context
Load product-specific context from: `PRODUCTS/{product}/context/`

| File | Usage | Required |
|------|-------|----------|
| `product-identity.md` | Verify alignment with vision | Recommended |
| `personas.md` | Use as foundation for persona section | Recommended |
| `pillars.md` | Understand product domain structure | Optional |
| `constraints.md` | Incorporate known constraints | Optional |
| `design-decisions.md` | Respect existing decisions | Optional |

### Missing Context Handling
If required context files are missing:
1. Notify user: "Context file `{filename}` not found for {product}"
2. Offer to proceed by asking clarifying questions
3. Recommend creating context files for future use

If `personas.md` exists, use it as the starting point for the PRD Personas section (enrich, don't replace).

---

## The Xyric Way: PRD Philosophy

### Core Principles

1. **PRD Translates Vision to Requirements**
   - Inherits strategic direction from Vision
   - Defines specific features and acceptance criteria
   - Does NOT introduce new strategic goals

2. **Features Must Be Testable**
   - Each feature has acceptance criteria
   - Success metrics are quantified
   - No vague requirements ("improve UX")

3. **Personas Drive Prioritization**
   - 5 user personas defined
   - Each feature maps to persona needs
   - MoSCoW based on persona impact

4. **Epic Structure Enables Development**
   - Logical grouping of features
   - Clear dependencies
   - MVP vs Future scope defined

5. **Product-Agnostic Template**
   - Works for any product type
   - Adapts to industry context
   - No hardcoded assumptions

6. **100% Vision Coverage**
   - Every vision objective mapped to features
   - Every value proposition addressed
   - No gaps between vision and requirements

7. **Interactive Refinement**
   - Questions clarify priorities and scope
   - User input drives MVP decisions
   - Collaborative document building

---

## Four-Phase Interactive Workflow

### Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 0: RESEARCH (Automated)                 │
├─────────────────────────────────────────────────────────────────┤
│  1. Locate and read Vision Document                              │
│  2. Extract strategic objectives, personas, constraints          │
│  3. Read existing PRD templates for patterns                     │
│  4. Identify areas needing user clarification                    │
│  OUTPUT: Vision Analysis Summary (~400 words)                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: ANALYSIS & QUESTIONS                 │
├─────────────────────────────────────────────────────────────────┤
│  5. Present Vision Analysis summary to user                      │
│  6. Show extracted objectives, personas, value propositions     │
│  7. Ask 7 tailored clarification questions                       │
│  8. ═══════════════ WAIT FOR USER INPUT ════════════════════════│
│  9. (Optional) Ask follow-up questions if needed                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2: GENERATION (Sequential)              │
├─────────────────────────────────────────────────────────────────┤
│  10. Apply user decisions to PRD generation                      │
│  11. FOR EACH SECTION (sequentially):                            │
│      ├── Generate section content using template                 │
│      ├── Cross-reference with Vision Document                    │
│      ├── Ensure coverage of all vision objectives               │
│      └── Add to running document                                 │
│  OUTPUT: Complete PRD + Vision Coverage Matrix                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: VALIDATION (Blocking)                │
├─────────────────────────────────────────────────────────────────┤
│  12. VISION COVERAGE: All strategic objectives mapped            │
│  13. PERSONA COVERAGE: All personas have features               │
│  14. SECTION CHECK: All 15 required sections present            │
│  15. QUALITY CHECK: No placeholder text, metrics quantified     │
│  IF ANY CHECK FAILS → Return to Phase 2, fix, re-validate      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4: OUTPUT & TRACKING                    │
├─────────────────────────────────────────────────────────────────┤
│  16. Write to PRODUCTS/{product}/Product-Requirements-Document.md│
│  17. Update PROGRESS.md with session details                     │
│  18. Output pipeline hooks for EXPERT-22 (Epic Generator)       │
└─────────────────────────────────────────────────────────────────┘
```

---

### Assumption Challenge Integration

**Invoke CORE-03** between Phase 0 (Research) and Phase 1 (Questions).

| Challenge Phase | Applied | Trigger |
|-----------------|---------|---------|
| A: Question Why | Yes | User defines MVP scope or feature priorities |
| B: Alternatives | Yes | MoSCoW decisions, scope boundaries |
| C: Stress Test | Yes | Before finalizing PRD direction |

**Challenge Intensity:** Full (A + B + C)

**What to Challenge:**
- MVP scope: "Why are these features Must-Have vs Should-Have?"
- Feature prioritization: "What evidence supports this priority order?"
- Persona focus: "Why prioritize this persona over others?"
- Trade-offs: "What are you sacrificing with this scope?"

**Workflow Update:**
```
Phase 0: Research → CORE-03: Challenge → Phase 1: Questions → Phase 2: Generate → Phase 3: Validate
```

**Skip Challenge When:**
- User explicitly requests bypass ("skip challenge")
- PRD revision with minor scope changes
- User provides detailed rationale upfront

**Reference:** See `claude-skills/00-core/CORE-03-assumption-challenge.md` for full framework.

---

### Phase 0: Research & Context Gathering

**Purpose:** Extract all relevant information from Vision Document and templates.

**Step 1: Locate Vision Document**

Look for Vision Document in these locations:
- `PRODUCTS/{product}/Product-Vision.md`
- `PRODUCTS/{product}/*Vision*.md`
- `PRODUCTS/{product}/Executive-Vision-Document.md`

**Step 2: Extract from Vision Document**

| Section | What to Extract |
|---------|-----------------|
| Executive Summary | Product description, problem, solution |
| Strategic Objectives | 4-6 objectives with key results |
| Value Propositions | Segments, benefits, pain points |
| Product Architecture | Modules, components, AI capabilities |
| Success Metrics | Targets by category |
| Market Opportunity | Segments, characteristics |
| Competitive Landscape | Differentiators |
| Risks | Key risks to address |
| Constraints | Scope, timeline, resources |

**Step 3: Gather Template Patterns**

Read existing PRD documents to extract:
- Section structure and depth
- Feature specification format
- Persona template
- Epic breakdown patterns

**Step 4: Create Vision Analysis Summary**

```markdown
## Vision Analysis: [Product Name]

### From Vision Document
**Product:** [Name and brief description]
**Problem:** [Core problem being solved]
**Target Market:** [Primary segments from vision]

### Strategic Objectives Extracted
1. [Objective 1]: [Key results summary]
2. [Objective 2]: [Key results summary]
3. [Objective 3]: [Key results summary]
4. [Objective 4]: [Key results summary]

### Value Propositions by Segment
- **[Segment 1]**: [Primary promise]
- **[Segment 2]**: [Primary promise]
- **[Segment 3]**: [Primary promise]

### Product Architecture Summary
- **Modules**: [List of modules/components]
- **AI Capabilities**: [Key AI features]
- **Integrations**: [Required integrations]

### Constraints from Vision
- **Scope**: [What's in/out]
- **Timeline**: [Key milestones]
- **Resources**: [Team/budget constraints]

### Gaps Requiring Clarification
- [Gap 1]: MVP scope not defined
- [Gap 2]: Persona priorities unclear
- [Gap 3]: Feature prioritization needed
```

---

### Phase 1: Questions & User Input

**INPUT:** Vision Analysis from Phase 0

**Step 1: Present Analysis to User**

Show the Vision Analysis summary. User sees:
- What was extracted from Vision Document
- Strategic objectives identified
- Personas/segments found
- Gaps needing clarification

**Step 2: Tailored Questions**

**Critical**: Questions must reference specific Vision content, not be generic.

#### Question Framework (7 Questions)

**SCOPE & PRIORITY (3 Questions)**

**Q1. MVP Definition**
```markdown
Based on the Vision Document, the product includes these major capabilities:

**From Architecture:**
[List modules/components from vision]

**From Objectives:**
[List key results that imply features]

Questions:
a) Which of these are MUST-HAVE for MVP (v1.0)?
b) Which are NICE-TO-HAVE for MVP?
c) Which are explicitly POST-MVP (v2.0+)?
d) What's the MVP launch timeline?

Please use MoSCoW format:
- **M**ust Have: [list]
- **S**hould Have: [list]
- **C**ould Have: [list]
- **W**on't Have (this release): [list]
```

**Q2. Feature Prioritization**
```markdown
The Vision Document identifies these strategic objectives:
1. [Objective 1]
2. [Objective 2]
3. [Objective 3]
4. [Objective 4]

Questions:
a) Rank these objectives by priority for MVP:
   [1st priority, 2nd priority, etc.]

b) For MVP success, which objective is the CRITICAL one?
   (The one feature that makes or breaks launch)

c) What's the acceptable trade-off?
   - More features, lower polish
   - Fewer features, higher quality
   - Balanced approach
```

**Q3. Epic Structure**
```markdown
Looking at the product architecture and objectives, I'm planning to organize
the PRD into these epics:

**Proposed Epic Structure:**
| Epic | Focus Area | Key Features |
|------|------------|--------------|
| E01  | [Area 1]   | [Features]   |
| E02  | [Area 2]   | [Features]   |
| E03  | [Area 3]   | [Features]   |
| ...  | ...        | ...          |

Questions:
a) Does this epic structure make sense for your product?
b) Should any epics be combined or split?
c) What's the ideal development order (dependencies)?
d) Estimated epic count: [X] epics. Is this appropriate?
```

**PERSONAS (2 Questions)**

**Q4. Persona Definition**
```markdown
The Vision Document identifies these target segments:
- **[Segment 1]**: [Description from vision]
- **[Segment 2]**: [Description from vision]
- **[Segment 3]**: [Description from vision]

For the PRD, I need to define 5 detailed personas.

Questions:
a) Confirm these segments should map to personas
b) Any segments to add or remove?
c) Who is the PRIMARY persona (most important to serve)?
d) Any specific demographic details to include?
   - Age ranges
   - Technical proficiency levels
   - Geographic considerations
```

**Q5. Persona Priorities**
```markdown
For each persona, features will be prioritized by relevance.

Questions:
a) Which persona has the MOST features designed for them?
b) Which persona is "secondary" (nice to serve, but not critical)?
c) Any personas that share overlapping needs?
d) Any anti-personas? (Who is this product NOT for?)
```

**REQUIREMENTS (2 Questions)**

**Q6. Success Criteria**
```markdown
The Vision Document includes these success metrics:
- [Metric 1]: [Target]
- [Metric 2]: [Target]
- [Metric 3]: [Target]

For the PRD, I need MVP-specific success criteria.

Questions:
a) What are the MVP launch criteria?
   - User count: [target]
   - Revenue: [target] or "not monetized yet"
   - Engagement: [target]
   - Performance: [target]

b) What's the definition of "MVP success"?
   - Specific metrics that prove market fit

c) What's NOT acceptable at launch?
   - Bugs, performance issues, missing features that block launch
```

**Q7. Special Requirements**
```markdown
Based on the product type and industry, there may be special requirements.

Questions:
a) **Accessibility**: What WCAG level? (AA standard recommended)

b) **Security/Compliance**: Any regulations?
   - HIPAA (healthcare)
   - GDPR (EU data)
   - SOC 2 (enterprise)
   - Other: [specify]

c) **AI Safety** (if AI-powered):
   - What should the AI NEVER do?
   - Crisis/emergency handling requirements?
   - Human escalation triggers?

d) **Integrations**: Required third-party integrations?
   - Authentication (Google, Apple, etc.)
   - Data sources (APIs, databases)
   - Export/import requirements

e) **Platform**: Target platforms?
   - Web
   - iOS
   - Android
   - Desktop
```

---

### Phase 2: PRD Generation

**INPUTS (from previous phases):**
- Vision Analysis from Phase 0
- User Answers from Phase 1

**No re-reading of full Vision Document.** All context comes from Phase 0 summary.

**Step 1: Apply User Decisions**

Map user answers to PRD sections:

| Decision | Impact on PRD |
|----------|---------------|
| MVP definition | MVP Scope Matrix, Feature priorities |
| Feature prioritization | Epic ordering, MoSCoW tags |
| Epic structure | Epic Overview Map |
| Persona definition | User Personas section |
| Success criteria | Success Metrics, Launch criteria |
| Special requirements | Accessibility, Security, AI Safety |

**Step 2: Generate Sections (Sequential)**

For each section, sequentially:
1. Reference Vision Analysis and user answers
2. Generate section content using template
3. Cross-reference with Vision objectives
4. Ensure coverage of all strategic goals

**Section Generation Order:**
1. Executive Summary (inherits from Vision)
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
13. Account Management
14. AI Safety Boundaries (if applicable)
15. Data Management

**Why Sequential:**
- Vision alignment maintained
- Consistency across sections
- Dependencies built correctly
- Coverage verified in real-time

---

### Phase 3: Validation (Blocking)

**Purpose:** Quality gate - must pass ALL checks before output.

**Critical Checks (Block if Fail):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Vision Coverage** | Every strategic objective has features | Add missing features |
| **Persona Coverage** | Every persona has relevant features | Expand feature set |
| **Section Coverage** | All 15 required sections present | Add missing sections |
| **Completeness** | No TBD, placeholder, or empty content | Fill in gaps |

**Quality Checks (Warning → Block if >3):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Metrics Quantified** | All success metrics have numbers | Add targets |
| **Epic Dependencies** | Clear dependency mapping | Add dependency info |
| **MoSCoW Tagged** | All features have priority tag | Add priorities |
| **Acceptance Criteria** | Testable format for key features | Rewrite criteria |

**Vision Coverage Matrix:**

```markdown
| Vision Objective | PRD Epic | Features | Status |
|------------------|----------|----------|--------|
| [Objective 1]    | E01      | F1.1-F1.5| ✅     |
| [Objective 2]    | E02, E03 | F2.1-F3.3| ✅     |
| [Objective 3]    | E04      | F4.1-F4.4| ✅     |
| [Objective 4]    | E05      | F5.1-F5.2| ✅     |
| **Coverage**     |          |          | 100%   |
```

**Validation Output:**
- ✅ All checks pass → Proceed to Phase 4
- ❌ Any critical check fails → Return to Phase 2

---

### Phase 4: Output & Tracking

**Step 1: Write PRD File**

Create: `PRODUCTS/{product}/Product-Requirements-Document.md`

**Step 2: Update PROGRESS.md**

Add session entry:
- Session timestamp
- Product: {product name}
- PRD created
- Key decisions made
- Epic count and structure
- Open questions for Epic phase

**Step 3: Output Pipeline Hooks**

Include in PRD for downstream consumption:
- Feature requirements for EXPERT-27 (Technical Architecture Generator)
- Persona references
- Constraints and integration requirements
- Format: `<!-- ARCHITECTURE_READY: {product-code} -->`

> **Note**: PRD now feeds into EXPERT-27 (Technical Architecture) before EXPERT-22 (Epic Generator).

---

## PRD Document Template

```markdown
# [Product Name] – PRODUCT REQUIREMENTS DOCUMENT
**[Tagline from Vision]**

---

## DOCUMENT INFORMATION

| Attribute | Value |
|-----------|-------|
| **Product** | [Product Name] |
| **Version** | 1.0 |
| **Status** | Draft / Review / Approved |
| **Owner** | [Product Owner] |
| **Last Updated** | [Date] |
| **Vision Document** | [Link to Vision] |

---

## EXECUTIVE SUMMARY

### Product Definition
[Product Name] is [brief description - 2-3 sentences inheriting from Vision].

### Core Value Proposition
[Primary value proposition from Vision - 1-2 sentences]

### Key Differentiators
1. [Differentiator 1 from Vision]
2. [Differentiator 2 from Vision]
3. [Differentiator 3 from Vision]
4. [Differentiator 4 from Vision]

### MVP Scope Overview
**In Scope (MVP v1.0):**
- [Feature area 1]
- [Feature area 2]
- [Feature area 3]

**Out of Scope (Post-MVP):**
- [Future feature 1]
- [Future feature 2]

---

## PRODUCT VISION & QUALITY METRICS

> **Note:** Business metrics (revenue, market share, CAC/LTV) are handled in separate business planning documents. This section focuses on product quality and user success.

### North Star Metric
**[Primary product success metric]**: [Target value]

### Product Quality Metrics Dashboard

| Category | Metric | MVP Target | Ultimate Target | Measurement |
|----------|--------|------------|-----------------|-------------|
| User Adoption | [Metric] | [Target] | [Vision target] | [How measured] |
| Engagement | [Metric] | [Target] | [Vision target] | [How measured] |
| Retention | [Metric] | [Target] | [Vision target] | [How measured] |
| Performance | [Metric] | [Target] | [Vision target] | [How measured] |
| Satisfaction | [Metric] | [Target] | [Vision target] | [How measured] |
| Quality | [Metric] | [Target] | [Vision target] | [How measured] |
| Accessibility | [Metric] | [Target] | [Vision target] | [How measured] |
| Reliability | [Metric] | [Target] | [Vision target] | [How measured] |

---

## CORE DESIGN PRINCIPLES

### Principle 1: [Name]
**"[Principle statement]"**

**Application:**
- [How this applies to product decisions]
- [Example of this principle in action]
- [What this means for features]

### Principle 2: [Name]
...

### Principle 3: [Name]
...

[3-5 principles that guide all product decisions]

---

## USER PERSONAS

### P1: [Persona Name] (Primary)

**Demographics:**
- **Age**: [Range]
- **Role**: [Job title/role]
- **Technical Proficiency**: [Low/Medium/High]
- **Location**: [Geographic context]

**Background:**
[2-3 sentences describing this persona]

**Goals:**
- [Goal 1]
- [Goal 2]
- [Goal 3]

**Pain Points:**
- "[Pain point 1 - in their words]"
- "[Pain point 2 - in their words]"
- "[Pain point 3 - in their words]"

**Success Story:**
"[Quote describing what success looks like for this persona]"

**Feature Priorities:**
| Priority | Features |
|----------|----------|
| Must Have | [Features this persona needs] |
| Should Have | [Features that help] |
| Could Have | [Nice to have] |

---

### P2: [Persona Name]
...

### P3: [Persona Name]
...

### P4: [Persona Name]
...

### P5: [Persona Name]
...

---

## EPIC OVERVIEW MAP

### Visual Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    [PRODUCT NAME] EPIC MAP                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
│  │   EPIC 01   │───▶│   EPIC 02   │───▶│   EPIC 03   │          │
│  │  [Name]     │    │  [Name]     │    │  [Name]     │          │
│  │  MVP Core   │    │  MVP Core   │    │  MVP        │          │
│  └─────────────┘    └─────────────┘    └─────────────┘          │
│         │                                     │                   │
│         ▼                                     ▼                   │
│  ┌─────────────┐                       ┌─────────────┐          │
│  │   EPIC 04   │                       │   EPIC 05   │          │
│  │  [Name]     │                       │  [Name]     │          │
│  │  MVP        │                       │  Post-MVP   │          │
│  └─────────────┘                       └─────────────┘          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Epic Summary Table

| Epic | Name | Focus | Features | Priority | MVP Status | Dependencies |
|------|------|-------|----------|----------|------------|--------------|
| E01 | [Name] | [Focus area] | [Count] | P0 | Core | None |
| E02 | [Name] | [Focus area] | [Count] | P0 | Core | E01 |
| E03 | [Name] | [Focus area] | [Count] | P1 | MVP | E01, E02 |
| E04 | [Name] | [Focus area] | [Count] | P1 | MVP | E01 |
| E05 | [Name] | [Focus area] | [Count] | P2 | Enhanced | E01-E04 |
| ... | ... | ... | ... | ... | ... | ... |

### Epic Descriptions

#### E01: [Epic Name]
**Goal:** [What this epic achieves]
**Scope:** [What's included]
**Key Features:**
- F1.1: [Feature name]
- F1.2: [Feature name]
- F1.3: [Feature name]

**Personas Served:** P1, P2
**Dependencies:** None (foundation epic)
**MVP Status:** Core

---

#### E02: [Epic Name]
...

[Continue for all epics]

---

## MVP vs FUTURE SCOPE MATRIX

### Feature Scope by Epic

| Epic | Feature | MVP v1.0 | v1.1 | v2.0 | Future |
|------|---------|----------|------|------|--------|
| E01 | F1.1 | ✅ | | | |
| E01 | F1.2 | ✅ | | | |
| E01 | F1.3 | | ✅ | | |
| E02 | F2.1 | ✅ | | | |
| E02 | F2.2 | ✅ | | | |
| E02 | F2.3 | | | ✅ | |
| ... | ... | ... | ... | ... | ... |

### MVP Definition
**MVP v1.0 includes:**
- Epic 1: [All/Partial] features
- Epic 2: [All/Partial] features
- Epic 3: [All/Partial] features

**MVP v1.0 excludes:**
- Epic 5+: All features
- Advanced features from Epics 1-4

---

## SUCCESS CRITERIA CHECKLIST

### Epic 1: [Name]
- [ ] [Success criterion 1 - testable]
- [ ] [Success criterion 2 - testable]
- [ ] [Success criterion 3 - testable]

### Epic 2: [Name]
- [ ] [Success criterion 1 - testable]
- [ ] [Success criterion 2 - testable]
- [ ] [Success criterion 3 - testable]

### MVP Launch Criteria
- [ ] All P0 features complete and tested
- [ ] Performance targets met ([specific metrics])
- [ ] Security audit passed
- [ ] Accessibility compliance verified (WCAG [level])
- [ ] User acceptance testing completed
- [ ] Documentation complete

---

## FEATURE TEMPLATE REFERENCE

All features in Epic PRDs follow this standard format:

```markdown
### F[Epic].[Seq]: [Feature Name]

**Priority:** P0/P1/P2/P3
**MVP Status:** Core / MVP / Enhanced / Future
**Personas:** P1, P2

**Description:**
[1-2 paragraph description of the feature]

**User Story:**
As a [persona], I want to [action] so that [benefit].

**Success Metrics:**
| Metric | Target |
|--------|--------|
| [Metric 1] | [Value] |
| [Metric 2] | [Value] |

**Acceptance Criteria:**
- [ ] [Criterion 1 - testable]
- [ ] [Criterion 2 - testable]
- [ ] [Criterion 3 - testable]

**Error Scenarios:**
| Scenario | Handling |
|----------|----------|
| [Error 1] | [Response] |
| [Error 2] | [Response] |

**Dependencies:**
- F[X.Y]: [Dependency description]
```

---

## CROSS-REFERENCE INDEX

### Vision → PRD Mapping

| Vision Section | PRD Section | Notes |
|----------------|-------------|-------|
| Strategic Objective 1 | Epic 1 | [Coverage notes] |
| Strategic Objective 2 | Epic 2, 3 | [Coverage notes] |
| Value Prop - Segment 1 | Persona P1 | [Coverage notes] |
| Value Prop - Segment 2 | Persona P2 | [Coverage notes] |

### PRD → Epic PRD Mapping

| PRD Epic | Epic PRD Document | Status |
|----------|-------------------|--------|
| E01 | `prd-epics/PRD-Epic-01-[Name].md` | [Status] |
| E02 | `prd-epics/PRD-Epic-02-[Name].md` | [Status] |
| ... | ... | ... |

---

## COMPETITIVE ANALYSIS (INSPIRATION FOCUS)

> **Purpose:** Learn from existing solutions. Don't reinvent the wheel. This is NOT market positioning analysis.

### What We Can Learn From Others

**[Category 1: Direct Alternatives]**

| Solution | What They Do Well | Patterns to Adopt | Our Differentiation |
|----------|-------------------|-------------------|---------------------|
| [Solution A] | [Strength] | [Pattern to learn] | [How we're different] |
| [Solution B] | [Strength] | [Pattern to learn] | [How we're different] |

**[Category 2: Adjacent Products]**

| Solution | What They Do Well | Patterns to Adopt | Our Differentiation |
|----------|-------------------|-------------------|---------------------|
| [Solution C] | [Strength] | [Pattern to learn] | [How we're different] |
| [Solution D] | [Strength] | [Pattern to learn] | [How we're different] |

### Best Practices to Adopt

Based on competitive research, adopt these proven patterns:

| Practice | Source | Implementation |
|----------|--------|----------------|
| [Practice 1] | Industry standard | [How we'll implement] |
| [Practice 2] | From [Solution A] | [How we'll implement] |
| [Practice 3] | UX best practice | [How we'll implement] |

### Where Others Fall Short (Our Opportunity)

| Gap | Why Existing Solutions Fail | Our Approach |
|-----|----------------------------|--------------|
| [Gap 1] | [Why they fail] | [How we solve it] |
| [Gap 2] | [Why they fail] | [How we solve it] |
| [Gap 3] | [Why they fail] | [How we solve it] |

### Design Inspiration

| Element | Inspiration Source | Application |
|---------|-------------------|-------------|
| [UI Pattern] | [Source] | [How we'll use it] |
| [UX Flow] | [Source] | [How we'll use it] |
| [Feature approach] | [Source] | [How we'll use it] |

---

## ERROR HANDLING & EDGE CASES

### Global Error Handling Patterns

| Error Type | User Message | System Action | Logging |
|------------|--------------|---------------|---------|
| Network failure | "Connection lost. Retrying..." | Auto-retry 3x | Error + context |
| Auth expired | "Please sign in again" | Redirect to login | Info |
| Invalid input | "[Specific validation message]" | Highlight field | Debug |
| Server error | "Something went wrong. We're on it." | Send alert | Error + stack |
| Rate limited | "Too many requests. Try again in [X]" | Backoff | Warning |

### Edge Cases by Epic

**Epic 1: [Name]**
| Scenario | Handling |
|----------|----------|
| [Edge case 1] | [How handled] |
| [Edge case 2] | [How handled] |

**Epic 2: [Name]**
...

---

## ACCESSIBILITY REQUIREMENTS

### Compliance Target
**WCAG 2.1 Level AA** (or as specified)

### Core Requirements

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Color Contrast | 4.5:1 minimum | Design system tokens |
| Keyboard Navigation | Full keyboard support | Tab order, focus indicators |
| Screen Reader | ARIA labels | Semantic HTML, ARIA |
| Text Scaling | Up to 200% | Responsive typography |
| Motion | Reduced motion option | `prefers-reduced-motion` |
| Touch Targets | 44x44px minimum | Button sizing standards |

### Testing Requirements
- [ ] Automated accessibility testing (axe, WAVE)
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Keyboard-only navigation testing
- [ ] Color contrast verification
- [ ] Mobile accessibility testing

---

## ACCOUNT MANAGEMENT

### Account Types

| Type | Access | Features | Limits |
|------|--------|----------|--------|
| Free | Basic | [Features] | [Limits] |
| Premium | Full | [Features] | [Limits] |
| Enterprise | Custom | [Features] | [Limits] |

### Account Lifecycle

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Sign Up   │───▶│   Active    │───▶│  Upgraded   │
└─────────────┘    └─────────────┘    └─────────────┘
                          │
                          ▼
                   ┌─────────────┐    ┌─────────────┐
                   │   Churned   │◀───│  Downgraded │
                   └─────────────┘    └─────────────┘
```

### Data Retention
- Active accounts: [Policy]
- Inactive accounts: [Policy]
- Deleted accounts: [Policy]

---

## AI SAFETY BOUNDARIES

*[Include this section if product has AI capabilities]*

### AI Principles
1. **Transparency**: [How AI decisions are explained]
2. **Human Control**: [When human override available]
3. **Safety First**: [What AI must never do]

### Prohibited AI Actions
- [ ] [Prohibited action 1]
- [ ] [Prohibited action 2]
- [ ] [Prohibited action 3]

### Crisis Detection & Escalation
*[If applicable - e.g., healthcare, mental health]*

| Signal | Detection | Response |
|--------|-----------|----------|
| [Crisis type 1] | [How detected] | [Escalation path] |
| [Crisis type 2] | [How detected] | [Escalation path] |

### AI Disclaimers
- [Disclaimer 1 - when shown]
- [Disclaimer 2 - when shown]

---

## DATA MANAGEMENT

### Data Classification

| Data Type | Classification | Encryption | Retention |
|-----------|----------------|------------|-----------|
| User PII | Sensitive | AES-256 | Account lifetime |
| Usage Data | Internal | AES-256 | [Period] |
| Analytics | Aggregated | TLS | [Period] |
| AI Training | [Policy] | [Policy] | [Policy] |

### Data Sources

| Source | Data Type | Integration | Frequency |
|--------|-----------|-------------|-----------|
| [Source 1] | [Type] | [API/Import] | [Real-time/Daily] |
| [Source 2] | [Type] | [API/Import] | [Real-time/Daily] |

### Privacy Compliance
- [ ] GDPR compliance (EU users)
- [ ] CCPA compliance (California users)
- [ ] [Industry-specific]: [Requirement]

### Data Export
- User data export: [Format, method]
- Bulk export: [Enterprise only]

---

## DOCUMENT GOVERNANCE

### Review Schedule
- **Weekly**: Feature prioritization adjustments
- **Monthly**: Epic progress review
- **Quarterly**: Full PRD alignment with Vision

### Change Control
| Change Type | Approval Required | Process |
|-------------|-------------------|---------|
| Minor (typos, clarification) | None | Direct edit |
| Feature scope | Product Owner | Review meeting |
| Epic scope | Product + Engineering | Change request |
| Strategic (MVP change) | Leadership | Vision alignment review |

### Related Documents
| Document | Location | Status |
|----------|----------|--------|
| Vision Document | [Link] | Approved |
| Epic PRDs | `prd-epics/` | [Status] |
| Design System | `design/` | [Status] |
| Stories | `stories/` | [Status] |

---

**PRD Established:** [Date]
**Next Review:** [Date]
**PRD Owner:** [Name/Role]

---

*[Product Name] Product Requirements Document v1.0 | Xyric Solutions | [Date]*

<!-- ARCHITECTURE_READY: {PRODUCT-CODE} -->
```

---

## Output Structure

### File: `PRODUCTS/{product}/Product-Requirements-Document.md`

**Typical Length:** 800-1200 lines
**Sections:** 15 required sections
**Quality Bar:** Based on yHealth PRD example

---

## Quality Checklist

### Section Completeness Check
- [ ] Document Information (metadata table)
- [ ] Executive Summary (definition, value prop, differentiators, MVP scope)
- [ ] Product Vision & Quality Metrics (north star, 8+ product metrics - NO revenue)
- [ ] Core Design Principles (3-5 principles with applications)
- [ ] User Personas (5 personas with full template)
- [ ] Epic Overview Map (visual, table, descriptions)
- [ ] MVP vs Future Scope Matrix (feature-level scope)
- [ ] Success Criteria Checklist (by epic, launch criteria)
- [ ] Feature Template Reference (standard format)
- [ ] Cross-Reference Index (Vision → PRD, PRD → Epics)
- [ ] Competitive Analysis (INSPIRATION focus - learn from others, NOT market positioning)
- [ ] Error Handling & Edge Cases (patterns, by epic)
- [ ] Accessibility Requirements (WCAG target, requirements, testing)
- [ ] Account Management (types, lifecycle, retention)
- [ ] AI Safety Boundaries (if applicable)
- [ ] Data Management (classification, sources, privacy)
- [ ] Document Governance (schedule, change control)

### Vision Alignment Check
- [ ] Every strategic objective mapped to epic/features
- [ ] Every value proposition addressed
- [ ] Every persona segment has features
- [ ] Success metrics aligned with vision targets
- [ ] Constraints and scope respected
- [ ] Differentiators reflected in features

### Quality Standards Check
- [ ] All metrics are quantified (numbers, percentages, targets)
- [ ] All features have MoSCoW priority tags
- [ ] All epics have dependency mapping
- [ ] No placeholder text (TBD, [fill in], etc.)
- [ ] Consistent product name throughout
- [ ] Consistent persona references (P1-P5)

---

## Integration with Other Skills

### EXPERT-20 (Vision Generator)
- Input: Vision Document
- Inherits: Strategic objectives, personas, constraints
- Coverage: 100% of vision objectives mapped

### EXPERT-27 (Technical Architecture Generator)
- Output: Technical Architecture Document with ADRs
- Handoff: `<!-- ARCHITECTURE_READY: {PRODUCT-CODE} -->`
- Technical Architecture Generator creates system design before epics

### EXPERT-10 (Product Manager)
- Alignment: MoSCoW, lifecycle stage
- Review: PRD structure compatible
- Lifecycle: PRD is Stage 3 (Design & Planning)

---

## Anti-Patterns

### DO NOT

1. **Generate without Vision Document**
   - Always read Vision first
   - PRD must align with established vision

2. **Invent new strategic goals**
   - PRD implements Vision goals
   - Does not create new strategic direction

3. **Skip user questions**
   - MVP scope needs user input
   - Prioritization decisions require confirmation

4. **Use generic personas**
   - Personas must be specific to this product
   - No copy-paste generic templates

5. **Leave gaps in coverage**
   - Every Vision objective needs features
   - Validation ensures 100% coverage

6. **Include implementation details**
   - PRD defines WHAT, not HOW
   - Technical details in Epic PRDs

---

## Activation Checklist

When this skill is activated:

**Phase 0: Research**
1. [ ] Locate Vision Document for product
2. [ ] Extract strategic objectives, personas, constraints
3. [ ] Read existing PRD templates for patterns
4. [ ] Generate Vision Analysis Summary (~400 words)

**Phase 1: Analysis**
5. [ ] Present Vision Analysis to user
6. [ ] Ask 7 tailored clarification questions
7. [ ] **WAIT for user responses**
8. [ ] (Optional) Ask follow-up questions if needed

**Phase 2: Generation**
9. [ ] Apply user decisions to PRD structure
10. [ ] Generate sections sequentially
11. [ ] Cross-reference with Vision objectives
12. [ ] Build Vision Coverage Matrix

**Phase 3: Validation (Blocking)**
13. [ ] Verify all 15 sections complete
14. [ ] Verify 100% Vision objective coverage
15. [ ] Verify all personas have features
16. [ ] If fails → return to Phase 2 and fix

**Phase 4: Output**
17. [ ] Write to PRODUCTS/{product}/Product-Requirements-Document.md
18. [ ] Update PROGRESS.md
19. [ ] Include pipeline hooks for EXPERT-27
20. [ ] Present completion summary

---

*Skill EXPERT-21 v2.1 | Xyric Solutions | 2025-12-24*
*4-Phase Vision → PRD Transformation | Inspiration-Focused Competitive Analysis | Product Quality Metrics | BI-02 Integration*
