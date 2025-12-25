# EXPERT-20: Vision Generator

**Skill ID**: EXPERT-20
**Category**: Expert Agents
**Priority**: Critical
**Version**: 2.1
**Last Updated**: 2025-12-22
**Architecture**: 4-Phase Workflow with Blocking Validation
**Focus**: Product Concept (PRIMARY), Problem/Solution (SECONDARY), Strategic Intent (TERTIARY)
**Upstream**: EXPERT-26 (Brainstormer) → brainstorm.md input

---

## Purpose

Transform a product idea (from brief notes to detailed brainstorm) into a comprehensive Vision Document following the Xyric methodology. This skill ensures consistent, high-quality vision documents that serve as the foundation for all downstream planning and development.

**Core Philosophy**: Vision documents establish the **product concept** and **strategic north star**. They define WHAT we're building, WHY it matters, and WHO it serves—not HOW to monetize it. Business models, revenue strategies, and go-to-market belong elsewhere. A well-crafted vision creates alignment, inspires teams, and guides product decisions.

---

## When to Activate

### Trigger Phrases
- "Create a vision document for [idea]"
- "Generate vision for [product]"
- "Product vision for [concept]"
- "Vision document from my notes"
- "Help me create a vision for [idea]"
- "Turn this idea into a vision document"
- "Vision → PRD pipeline for [product]"

### Related Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-26** (Brainstormer) | Brainstorm → Vision (upstream input) |
| **EXPERT-21** (PRD Generator) | Vision → PRD transformation |
| **EXPERT-10** (Product Manager) | Strategic alignment, MoSCoW, lifecycle |
| **EXPERT-03** (Software Architect) | Technical feasibility validation |
| **EXPERT-11** (UX/UI Designer) | User experience alignment |

---

## Required Context Sources

Before generating a vision document, gather context from available sources:

| Priority | Source | Path Pattern | Extract |
|----------|--------|--------------|---------|
| **Critical** | Brainstorm Doc | `PRODUCTS/{product}/brainstorm.md` | Pre-validated ideas, challenged assumptions |
| Critical | User Input | (provided by user) | Product idea, notes, brainstorm |
| High | Existing Visions | `PRODUCTS/**/\*Vision\*.md` | Template patterns, structure |
| High | Product Folder | `PRODUCTS/{product}/` | Existing product context |
| Medium | Company Context | `COMPANY/*.md` | Company mission, values |
| Medium | Related Products | `PRODUCTS/*/` | Cross-product synergies |
| Low | Frameworks | `FRAMEWORKS/*.md` | Methodologies to apply |

**Key Principle:** User input is the PRIMARY input. Existing documents provide template patterns and context but should never constrain the new vision's uniqueness.

**Brainstorm Integration:** If `brainstorm.md` exists with `<!-- VISION_READY: {PRODUCT-CODE} -->` marker, enter **"With Brainstorm" mode** (reduced questions). See Two Entry Modes section below.

---

## Template & Context Loading

### Template Reference
Read the vision document template at: `FRAMEWORKS/templates/vision-document-template.md`

This template defines the required sections, structure, and format for vision documents. Always reference this template during Phase 2 (Generation).

### Product Context (If Available)
Load product-specific context from: `PRODUCTS/{product}/context/`

| File | Usage | Required |
|------|-------|----------|
| `product-identity.md` | Verify alignment if updating existing product | Optional |
| `personas.md` | Reference existing personas if available | Optional |
| `pillars.md` | Understand product domain structure | Optional |

**Note:** For new products, context files won't exist yet. The vision document is typically the first document created, so context loading is optional for this skill.

### Missing Context Handling
If generating a vision for a NEW product:
1. Proceed without context files (this is expected)
2. After vision is created, recommend creating context files for downstream documents (PRD, Epics, Stories)

If UPDATING an existing product's vision:
1. Check for existing context files
2. Ensure updates align with established product identity
3. Note any conflicts in the output

---

## Two Entry Modes

EXPERT-20 supports two entry modes based on whether a brainstorm document exists:

### Mode 1: With Brainstorm (Recommended)

**Trigger:** `brainstorm.md` exists in product folder with `<!-- VISION_READY: {PRODUCT-CODE} -->` marker

**What Changes:**
- Phase 0 extracts structured content from brainstorm.md instead of raw user input
- Phase 1 questions are **reduced** (4 instead of 7) - many already answered
- Validated assumptions, resolved tensions, and defined terms carry forward
- Higher quality input = faster, more focused vision generation

**Sections Pre-Populated from Brainstorm:**
| Brainstorm Section | Maps To Vision Section |
|--------------------|------------------------|
| Executive Snapshot | Executive Summary seed |
| User Clarity (Primary Persona) | Target Users foundation |
| Problem Clarity | Problem statement, evidence |
| Solution Clarity | Core capabilities, differentiators |
| Technical Approach Clarity | Product Architecture hints |
| Risk Registry | Risks & Mitigation foundation |

**Reduced Questions (4 Questions):**
1. **Vision Expansion** - "The brainstorm establishes [X]. For the 5-year vision, how do you see this evolving?"
2. **Strategic Positioning** - "Where does this fit in Xyric's portfolio? What makes it a priority now?"
3. **Architecture Depth** - "The brainstorm mentions [tech approach]. What architecture decisions need vision-level clarity?"
4. **Quality Metrics** - "What product quality metrics matter most? (UX, performance, reliability)"

### Mode 2: Without Brainstorm (Legacy)

**Trigger:** No brainstorm.md exists OR user explicitly bypasses ("skip brainstorm")

**What Changes:**
- Full 7-question Phase 1 (traditional flow)
- More user interaction required to gather equivalent context
- Suitable for quick ideas or when brainstorm overhead not warranted

**When to Use Legacy Mode:**
- Simple, well-defined product ideas
- Time-constrained sessions
- Updating existing visions (context already established)
- User has comprehensive notes that serve as informal brainstorm

### Mode Detection Logic

```
Phase 0 Start:
├── Check: Does PRODUCTS/{product}/brainstorm.md exist?
│   ├── YES → Check for <!-- VISION_READY: {PRODUCT-CODE} --> marker
│   │   ├── MARKER FOUND → Enter "With Brainstorm" mode
│   │   └── NO MARKER → Warn user, suggest completing brainstorm first
│   └── NO → Enter "Without Brainstorm" (Legacy) mode
```

---

## The Xyric Way: Vision Philosophy

### Core Principles

1. **Product Concept First**
   - What is it? How does it work? What makes it unique?
   - Define the product clearly before anything else
   - Skip business model - that's a separate concern

2. **Problem/Solution Focus**
   - What problem does it solve?
   - Who has this problem?
   - Why do existing solutions fail?

3. **Strategic Intent (Light Touch)**
   - Long-term product vision
   - Platform potential
   - NOT: revenue model, go-to-market, business KPIs

4. **Aspirational Yet Achievable**
   - 5-year product vision that inspires
   - Grounded in near-term execution path
   - Clear product milestones

5. **Product-Agnostic Template**
   - Works for any product type (B2B, B2C, Platform, Service)
   - Adapts to industry context
   - No hardcoded assumptions

6. **Interactive Refinement**
   - Multiple question rounds allowed
   - User input drives depth and focus
   - Collaborative document building

7. **Quality Over Speed**
   - Better to generate excellent 500 lines than mediocre 1500
   - Each section validated before moving to next
   - Blocking validation ensures completeness

---

## Focus Hierarchy

```
PRODUCT CONCEPT (60%)
├── What is it?
├── How does it work?
└── What makes it unique?

PROBLEM & SOLUTION (30%)
├── What problem does it solve?
├── Who has this problem?
└── Why existing solutions fail?

STRATEGIC INTENT (10%)
├── Long-term product vision
└── Platform potential
```

### NOT in Scope (Business Focus - Handled Elsewhere)
- Go-to-Market Strategy
- Revenue Model / Business Model
- Market Opportunity / TAM/SAM/SOM
- Unit Economics
- Customer Acquisition Strategy
- Competitive Market Analysis (keep as "Inspiration Sources")

---

## Four-Phase Interactive Workflow

### Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 0: RESEARCH (Automated)                 │
├─────────────────────────────────────────────────────────────────┤
│  1. Parse user input (idea, notes, brainstorm)                   │
│  2. Identify product type, target market, technology approach   │
│  3. Read existing vision documents for template patterns         │
│  4. Gather company context and related products                  │
│  5. Identify gaps requiring user clarification                   │
│  OUTPUT: Input Analysis Summary (~300 words)                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: ANALYSIS & QUESTIONS                 │
├─────────────────────────────────────────────────────────────────┤
│  6. Present Input Analysis summary to user                       │
│  7. Show what was extracted and inferred                         │
│  8. Ask 7 tailored clarification questions                       │
│  9. ═══════════════ WAIT FOR USER INPUT ════════════════════════│
│  10. (Optional) Ask follow-up questions if needed               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2: GENERATION (Sequential)              │
├─────────────────────────────────────────────────────────────────┤
│  11. Apply user decisions to vision generation                   │
│  12. FOR EACH SECTION (sequentially):                            │
│      ├── Generate section content using template                 │
│      ├── Cross-reference with previous sections                  │
│      ├── Ensure consistency and coherence                        │
│      └── Add to running document                                 │
│  OUTPUT: Complete Vision Document + Section Coverage Matrix     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: VALIDATION (Blocking)                │
├─────────────────────────────────────────────────────────────────┤
│  13. SECTION CHECK: All 13 required sections present             │
│  14. CONSISTENCY CHECK: No contradictions between sections      │
│  15. COMPLETENESS CHECK: No placeholder text or TBD markers     │
│  16. QUALITY CHECK: Metrics quantified, differentiators clear   │
│  IF ANY CHECK FAILS → Return to Phase 2, fix, re-validate      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4: OUTPUT & TRACKING                    │
├─────────────────────────────────────────────────────────────────┤
│  17. Write to PRODUCTS/{product}/Product-Vision.md              │
│  18. Update PROGRESS.md with session details                     │
│  19. Output pipeline hooks for EXPERT-21 (PRD Generator)        │
└─────────────────────────────────────────────────────────────────┘
```

---

### Assumption Challenge Integration

**Invoke CORE-03** between Phase 0 (Research) and Phase 1 (Questions).

| Challenge Phase | Applied | Trigger |
|-----------------|---------|---------|
| A: Question Why | Yes | User provides problem statement or product idea |
| B: Alternatives | Yes | Market assumptions, product positioning |
| C: Stress Test | Yes | Before finalizing vision direction |

**Challenge Intensity:** Full (A + B + C)

**What to Challenge:**
- Problem framing: "Is this the right problem to solve?"
- Target market: "Are these the right users to focus on?"
- Solution approach: "Why this approach vs. alternatives?"
- Uniqueness claims: "What evidence supports this differentiation?"

**Workflow Update:**
```
Phase 0: Research → CORE-03: Challenge → Phase 1: Questions → Phase 2: Generate → Phase 3: Validate
```

**Skip Challenge When:**
- User explicitly requests bypass ("skip challenge")
- Vision revision (not new creation) with minor updates
- User provides comprehensive rationale upfront

**Reference:** See `claude-skills/00-core/CORE-03-assumption-challenge.md` for full framework.

---

### Phase 0: Research & Context Gathering

**Purpose:** Build unified context from user input and existing documents.

**Step 0: Brainstorm Detection (NEW)**

Before parsing user input, check for structured brainstorm:

```
1. Check: Does PRODUCTS/{product}/brainstorm.md exist?
2. If YES: Check for <!-- VISION_READY: {PRODUCT-CODE} --> marker
3. If MARKER FOUND:
   - Set MODE = "With Brainstorm"
   - Extract structured content (see mapping table above)
   - Skip to Step 1b (Brainstorm Extraction)
4. If NO MARKER:
   - Warn: "Brainstorm exists but not marked ready. Complete EXPERT-26 workflow first?"
5. If NO FILE:
   - Set MODE = "Without Brainstorm" (Legacy)
   - Continue to Step 1a (User Input Parsing)
```

**Step 1a: Parse User Input (Legacy Mode)**

User provides product idea in any format:
- Brief: "I want to build an AI tutoring platform"
- Detailed: Multi-page brainstorm document
- Mixed: Rough notes with some research

Extract from user input:
- Product name (or suggest one)
- Core problem being solved
- Target market/customers
- Technology approach
- Revenue model hints
- Competitive landscape mentions

**Step 1b: Extract from Brainstorm (With Brainstorm Mode)**

When brainstorm.md exists and is marked ready:

| Extract From | Section in brainstorm.md |
|--------------|--------------------------|
| Product name | Executive Snapshot → One-liner |
| Problem statement | Problem Clarity → Problem Statement |
| Primary user | User Clarity → Primary Persona |
| Anti-persona | User Clarity → Anti-Persona |
| Core capabilities | Solution Clarity → Must Have |
| Exclusions | Solution Clarity → Out of Scope |
| Tech approach | Technical Approach Clarity |
| Risks | Risk Registry |
| Defined terms | Resolved Tensions → Defined Terms |

**Advantage:** All content is pre-validated through EXPERT-26's challenge process.

**Step 2: Gather Supporting Context**

Check for these files and extract relevant patterns:

| Source | What to Extract | Why It Matters |
|--------|-----------------|----------------|
| Existing Visions | Section structure, depth level | Ensures consistency |
| Company docs | Mission, values, portfolio | Strategic alignment |
| Related products | Synergies, cross-references | Ecosystem fit |

**Step 3: Create Input Analysis Summary**

Combine ALL context into one summary:

```markdown
## Input Analysis: [Product Name]

### Extracted from User Input
**Product Concept:** [Brief description]
**Problem Statement:** [What problem are we solving]
**Target Market:** [Who are the customers]
**Technology Approach:** [What tech/approach mentioned]
**Revenue Model:** [If mentioned, or "Not specified"]
**Competitive Context:** [Any competitors mentioned]

### Inferred from Context
**Product Type:** [B2B SaaS / B2C App / Platform / Service / etc.]
**Industry:** [Healthcare / Finance / Education / etc.]
**Xyric Portfolio Fit:** [Standalone / Extension of X / Related to Y]

### Gaps Requiring Clarification
- [Gap 1]: [What's missing]
- [Gap 2]: [What's unclear]
- [Gap 3]: [Decision needed]

### Template Patterns (From Existing Visions)
**Typical Length:** [1000-1500 lines]
**Section Structure:** [13 sections identified]
**Depth Examples:** [Reference to yBusiness, EverythingAI, etc.]
```

---

### Phase 1: Questions & User Input

**INPUT:** Input Analysis from Phase 0

**Mode-Dependent Flow:**
- **With Brainstorm Mode:** Present brainstorm summary, ask 4 reduced questions
- **Without Brainstorm (Legacy) Mode:** Present input analysis, ask 7 full questions

---

#### With Brainstorm Mode (4 Questions)

**Step 1: Present Brainstorm Summary**

Show what was extracted from brainstorm.md:
```markdown
## Brainstorm Summary: [Product Name]

**From EXPERT-26 Brainstorm Session:**
- **One-liner:** [From Executive Snapshot]
- **Problem:** [From Problem Clarity]
- **Primary User:** [From User Clarity]
- **Core Capabilities:** [From Solution Clarity]
- **Key Risks:** [From Risk Registry]

**Challenged & Validated:**
- [X] Problem statement validated
- [X] User defined (persona + anti-persona)
- [X] Scope bounded (must-have + exclusions)
- [X] No unresolved contradictions

**Ready for Vision expansion.**
```

**Step 2: Reduced Questions (4 Questions)**

Since brainstorm has pre-validated core content, focus on VISION-SPECIFIC expansion:

**Q1. Vision Expansion**
```markdown
The brainstorm establishes your product as:
"[One-liner from brainstorm]"

For the 5-year VISION:
a) How do you see this product evolving over time?
b) What's the ultimate form this product could take?
c) What capabilities would a mature version have that v1 won't?
d) Is there platform potential? (Other products building on this?)
```

**Q2. Strategic Positioning**
```markdown
Questions about strategic fit:
a) Where does this fit in Xyric's portfolio?
   - Moonshot (flagship bet)
   - Core (essential product)
   - Exploratory (testing market)
   - Supporting (enables other products)

b) Why is this a priority NOW? What's changed?
c) What resources are you prepared to commit?
d) What would success look like in 1 year? 3 years?
```

**Q3. Architecture Depth**
```markdown
The brainstorm mentions this technical approach:
"[From Technical Approach Clarity]"

For vision-level architecture:
a) What are the major system components you envision?
b) What's the core technology that makes this possible?
c) Any technology bets or dependencies to call out?
d) Build vs. buy decisions at a high level?
```

**Q4. Quality Metrics**
```markdown
What product quality metrics matter most?

a) **User Experience:**
   - Time to value? (How fast should users see benefit?)
   - Ease of use? (Learning curve expectations?)

b) **Performance:**
   - Speed requirements? (Response times, processing)
   - Scale expectations? (Users, data volume)

c) **Reliability:**
   - Uptime requirements?
   - Error tolerance?

d) **Which 3 metrics would you never compromise on?**
```

---

#### Without Brainstorm Mode (7 Questions - Legacy)

**Step 1: Present Analysis to User**

Show the unified Input Analysis summary. User sees:
- What was extracted from their input
- What was inferred
- What gaps need clarification

**Step 2: Tailored Questions**

**Critical**: Questions must reference user's specific input, not be generic.

#### Question Framework (7 Questions)

> **Note:** Business questions (revenue model, go-to-market) are intentionally excluded. Vision documents focus on product concept, not monetization.

**PRODUCT CONCEPT (3 Questions - PRIMARY)**

**Q1. Problem Space**
```markdown
Based on your input, the core problem appears to be:
"[Extracted problem statement]"

Questions:
a) Is this problem statement accurate? What would you refine?
b) How severe is this problem? (Minor inconvenience → Critical pain point)
c) What evidence do you have that this problem exists? (Personal experience, research, customer interviews)
d) Why do existing solutions fail to solve this problem adequately?
```

**Q2. Target Users**
```markdown
Target users appear to be:
"[Extracted target users]"

Questions:
a) Who is the PRIMARY user? (Most important to serve well)
b) Who are SECONDARY users? (Also benefit from the product)
c) What does a day in the life of your primary user look like?
d) What are their top 3 frustrations with current solutions?
```

**Q3. Solution Approach**
```markdown
The product concept appears to be:
"[Extracted solution description]"

Questions:
a) What are the 3-5 core capabilities this product MUST have?
b) What makes this approach unique? (Why will users choose this over alternatives?)
c) What will users be able to do that they couldn't do before?
d) What's the "aha moment" when users understand the value?
```

**TECHNOLOGY (2 Questions - SECONDARY)**

**Q4. Technology Approach**
```markdown
Based on your input, the technology approach seems to involve:
"[Extracted tech mentions]"

Questions:
a) What core technology enables this product? (AI/ML, Platform, API, etc.)
b) Build vs. Buy: What should be built in-house vs. leveraged from existing tools?
c) Any specific technology constraints or preferences?
d) What makes this technically feasible now? (Why couldn't this exist 5 years ago?)
```

**Q5. Integration & Ecosystem**
```markdown
Questions:
a) How does this product fit into Xyric's portfolio?
   - Standalone (independent product)
   - Extension (builds on [existing product])
   - Synergistic (shares technology with [products])
   - Moonshot (flagship product)

b) What integrations are essential? (APIs, platforms, services)

c) If AI/ML is involved:
   - What data is needed? How will it be acquired?
   - What's the AI doing? (Predictions, automation, insights, generation)
   - Human-in-the-loop requirements? (Full automation vs. AI-assisted)
```

**CONSTRAINTS (2 Questions - TERTIARY)**

**Q6. Resource Constraints**
```markdown
What constraints should the vision acknowledge?

a) **Team constraints:**
   - Team size (current/planned)
   - Key skills available or needed

b) **Scope constraints:**
   - What's explicitly OUT of scope?
   - Any features you do NOT want to include?
   - Timeline expectations (urgent vs. can take time)

c) **Context I should know:**
   - Any industry regulations?
   - Any past attempts at this?
```

**Q7. Risks & Product Assumptions**
```markdown
What keeps you up at night about this product?

a) **Biggest product risks you see:**
   - Technology risk (Can we build it?)
   - Adoption risk (Will users actually use it?)
   - Competition risk (Will someone else build it better?)
   - Complexity risk (Is this too ambitious?)
   - Other: [specify]

b) **What could kill this product?**
   - [Top concern]

c) **What assumptions must be true for success?**
   - [Critical assumption 1]
   - [Critical assumption 2]
```

---

### Phase 2: Vision Generation

**INPUTS (from previous phases):**
- Input Analysis from Phase 0
- User Answers from Phase 1

**No re-reading of full documents.** All context comes from Phase 0 summary.

**Step 1: Apply User Decisions**

Map user answers to vision sections:

| Decision | Impact on Vision |
|----------|------------------|
| Problem validation | Problem statement, market opportunity |
| Timeline & ambition | Vision statement, strategic objectives |
| Strategic positioning | Competitive differentiation, portfolio fit |
| Technology approach | Product architecture, principles |
| Revenue model | Business model section |
| Risks | Risks & mitigation section |
| Constraints | Scope, timeline, governance |

**Step 2: Generate Sections (Sequential)**

For each section, sequentially:
1. Reference user input and answers
2. Generate section content using template
3. Cross-reference with previous sections
4. Ensure consistency and coherence

**Why Sequential:**
- Context preserved across sections
- Consistency maintained
- No contradictions between sections
- Quality verified in real-time

---

### Phase 3: Validation (Blocking)

**Purpose:** Quality gate - must pass ALL checks before output.

**Critical Checks (Block if Fail):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Section Coverage** | All 10 required sections present | Add missing sections |
| **Consistency** | No contradictions between sections | Resolve conflicts |
| **Completeness** | No TBD, placeholder, or empty content | Fill in gaps |
| **Specificity** | Metrics quantified, names specific | Add concrete details |
| **No Business Content** | No revenue model, TAM/SAM, go-to-market | Remove business content |

**Quality Checks (Warning → Block if >3):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Differentiators** | Product/tech advantage stated (not business) | Reframe as product-focused |
| **Risks** | At least 8 product risks identified | Add more risks |
| **Principles** | 7 product principles defined | Add principles |
| **Users** | At least 3 user personas | Add personas |
| **Focus Hierarchy** | 60% product, 30% problem, 10% strategy | Rebalance content |

**Validation Output:**
- ✅ All checks pass → Proceed to Phase 4
- ❌ Any critical check fails → Return to Phase 2

---

### Phase 4: Output & Tracking

**Step 1: Write Vision File**

Create: `PRODUCTS/{product}/Product-Vision.md`

Or if product folder doesn't exist:
- Create `PRODUCTS/{product}/` folder
- Write vision document as first file

**Step 2: Update PROGRESS.md**

Add session entry:
- Session timestamp
- Product: {product name}
- Vision document created
- Key decisions made
- Open questions for PRD phase

**Step 3: Output Pipeline Hooks**

Include in Vision document for downstream consumption:
- Product code (for EXPERT-21)
- Strategic objectives summary
- Key constraints identified
- Format: `<!-- PRD_READY: {product-code} -->`

---

## Vision Document Template Reference

> **Template Location:** `FRAMEWORKS/templates/vision-document-template.md`
>
> The full template with all section details is maintained externally. Read the template file during Phase 2 (Generation) for the complete structure.

### Required Sections (10 Sections + Risks)

1. **Executive Summary** - Vision, problem, solution, differentiators, goal
2. **Mission Statement** - Mission, core purpose (user focused)
3. **Vision Statement** - Expanded vision with 4 components
4. **Product Objectives** - 4-6 objectives with product-focused KRs
5. **User Value Propositions** - 3+ user types with benefits and frustrations
6. **Product Architecture** - Overview, modules, AI capabilities
7. **Product Principles** - 7 principles in "X Over Y" format
8. **Product Quality Metrics** - UX, product performance, technology
9. **Target Users** - 3-5 user personas with context
10. **Inspiration Sources** - What to learn from others (NOT competitive analysis)
11. **Risks & Mitigation** - 8-12 product-focused risks

### What NOT to Include
- Revenue models / TAM / unit economics
- Go-to-market strategy
- Business KPIs (CAC, LTV, market share)
- Competitive market analysis for positioning

### Output Format
```markdown
<!-- PRD_READY: {PRODUCT-CODE} -->
```

---

## Output Structure

### File: `PRODUCTS/{product}/Product-Vision.md`

**Typical Length:** 600-1000 lines (streamlined from 13 to 10 sections)
**Sections:** 10 required sections + Risks
**Focus:** Product concept (60%), Problem/Solution (30%), Strategic intent (10%)

---

## Quality Checklist

### Section Completeness Check (10 Sections)
- [ ] 1. Executive Summary (vision, problem, solution, differentiators, goal)
- [ ] 2. Mission Statement (mission, core purpose - user focused)
- [ ] 3. Vision Statement (expanded vision, 4 components)
- [ ] 4. Product Objectives (4-6 objectives with product-focused KRs)
- [ ] 5. User Value Propositions (3+ user types with benefits and frustrations)
- [ ] 6. Product Architecture (overview, modules, AI capabilities)
- [ ] 7. Product Principles (7 principles in "X Over Y" format)
- [ ] 8. Product Quality Metrics (UX, product performance, technology)
- [ ] 9. Target Users (3-5 user personas with context)
- [ ] 10. Inspiration Sources (what to learn from others - NOT competitive analysis)
- [ ] Risks & Mitigation (8-12 product-focused risks)

### Quality Standards Check
- [ ] All metrics are quantified (numbers, percentages, targets)
- [ ] All differentiators are product/technology focused (not business focused)
- [ ] Inspiration Sources focuses on learning (not market positioning)
- [ ] Risks have specific mitigation strategies
- [ ] Principles follow "X Over Y" format with application
- [ ] No placeholder text (TBD, [fill in], etc.)
- [ ] Consistent product name throughout
- [ ] NO business metrics (revenue, CAC, LTV, market share)
- [ ] NO go-to-market or revenue model content

### Consistency Check
- [ ] Vision statement aligns with product objectives
- [ ] Value propositions address user frustrations
- [ ] Architecture supports stated differentiators
- [ ] Risks address product assumptions
- [ ] Metrics measure product quality (not business success)

---

## Integration with Other Skills

### EXPERT-21 (PRD Generator)
- Output: Vision Document
- Handoff: `<!-- PRD_READY: {PRODUCT-CODE} -->`
- PRD inherits: Vision, objectives, personas, constraints

### EXPERT-10 (Product Manager)
- Alignment: Strategic objectives, MoSCoW readiness
- Lifecycle: Vision is Stage 1 (Vision stage)
- Review: PRD structure compatible

### EXPERT-03 (Software Architect)
- Validation: Technical feasibility of architecture
- Input: Technology approach, constraints
- Review: Architecture section accuracy

---

## Anti-Patterns

### DO NOT

1. **Generate without questions**
   - Always ask the 9 clarification questions
   - User input ensures alignment and captures nuance

2. **Use generic content**
   - Every section must be specific to this product
   - No copy-paste from templates without customization

3. **Skip validation**
   - All 13 sections must be complete
   - Blocking validation prevents incomplete documents

4. **Include implementation details**
   - Vision defines WHAT and WHY
   - HOW belongs in PRD and Epics

5. **Ignore constraints**
   - Document stated constraints in governance section
   - Out-of-scope items explicitly listed

6. **Make unsupported claims**
   - Market sizes need sources or "estimated"
   - Competitive analysis based on real categories

---

## Example: Vision Questions (Tailored)

### Q1. Problem & Market (Tailored to "AI Tutoring Platform")

```markdown
Based on your input, the core problem appears to be:
"Students struggle to get personalized tutoring at affordable prices,
while traditional tutoring doesn't scale and is limited by geography."

Target market appears to be:
"K-12 and college students globally, particularly in underserved regions."

Questions:
a) Is this problem statement accurate? What would you refine?
b) How severe is this problem?
   - 65% of students report needing more personalized help
   - Average tutoring costs $50-100/hour
   - Rural/emerging market students have no access
c) What evidence do you have?
   - Personal experience with tutoring challenges
   - Market research on EdTech adoption
   - Interviews with students/parents
d) Market size estimate?
   - Global EdTech market: $254B by 2028
   - Online tutoring segment: $12B
   - AI tutoring specifically: emerging, ~$2B
```

---

## Activation Checklist

When this skill is activated:

**Phase 0: Research**
1. [ ] **Check for brainstorm.md** with `<!-- VISION_READY: {PRODUCT-CODE} -->` marker
2. [ ] **Set mode:** "With Brainstorm" or "Without Brainstorm" (Legacy)
3. [ ] Parse input (brainstorm.md OR user input depending on mode)
4. [ ] Identify product type, users, technology approach
5. [ ] Gather context from existing documents
6. [ ] Generate Input Analysis Summary (~300 words)

**Phase 1: Analysis**

*If With Brainstorm Mode:*
7. [ ] Present Brainstorm Summary (extracted from brainstorm.md)
8. [ ] Ask **4 reduced questions** (vision expansion, positioning, architecture, metrics)
9. [ ] **WAIT for user responses**

*If Without Brainstorm (Legacy) Mode:*
7. [ ] Present Input Analysis to user
8. [ ] Ask **7 tailored clarification questions** (NO business questions)
9. [ ] **WAIT for user responses**
10. [ ] (Optional) Ask follow-up questions if needed

**Phase 2: Generation**
9. [ ] Apply user decisions to vision structure
10. [ ] Generate 10 sections sequentially
11. [ ] Cross-reference for consistency
12. [ ] Verify NO business content included

**Phase 3: Validation (Blocking)**
13. [ ] Verify all 10 sections complete
14. [ ] Check no contradictions
15. [ ] Check no placeholder content
16. [ ] Check NO business content (revenue, TAM, go-to-market)
17. [ ] If fails → return to Phase 2 and fix

**Phase 4: Output**
18. [ ] Write to PRODUCTS/{product}/Product-Vision.md
19. [ ] Update PROGRESS.md
20. [ ] Include pipeline hooks for EXPERT-21
21. [ ] Present completion summary

---

*Skill EXPERT-20 v2.1 | Xyric Solutions | 2025-12-22*
*4-Phase Product-Focused Vision Generator | 10 Sections | No Business Content | Product Concept PRIMARY*
*Supports EXPERT-26 Brainstorm Integration: Two Entry Modes (With/Without Brainstorm)*
