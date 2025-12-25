# EXPERT-27: Technical Architecture Generator

**Skill ID**: EXPERT-27
**Category**: Expert Agents
**Priority**: Critical
**Version**: 1.0
**Last Updated**: 2025-12-24
**Architecture**: 4-Phase Workflow with Blocking Validation
**Focus**: System Architecture (PRIMARY), Technology Decisions (SECONDARY), Integration Design (TERTIARY)
**Upstream**: EXPERT-21 (PRD Generator) -> Product-Requirements-Document.md input
**Downstream**: EXPERT-22 (Epic Generator)

---

## Purpose

Transform a Product Requirements Document (PRD) into a comprehensive Technical Architecture Document that defines how the system will be built. This skill bridges the gap between "what we're building" (PRD) and "how we'll organize the work" (Epics) by establishing the technical foundation, technology choices, and architectural patterns.

**Core Philosophy**: Architecture decisions made early propagate through the entire development lifecycle. A well-crafted Technical Architecture ensures epics are properly scoped, stories have clear technical boundaries, and engineers can work in parallel without coordination overhead.

**Why This Skill Exists**:
- PRD defines WHAT to build, not HOW to build it
- Without architecture, epics may have hidden technical dependencies
- Technology decisions affect feature prioritization and complexity
- ADRs prevent repeated technical debates during development
- Integration patterns determine API contracts between epics

---

## When to Activate

### Trigger Phrases
- "Create technical architecture for [product]"
- "Generate architecture from PRD"
- "Technical architecture for [product name]"
- "Design system architecture from requirements"
- "Architecture document for [product]"
- "PRD to Architecture for [product]"
- "Define technical stack for [product]"

### Related Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-21** (PRD Generator) | PRD -> Architecture transformation (upstream) |
| **EXPERT-22** (Epic Generator) | Architecture -> Epics transformation (downstream) |
| **EXPERT-03** (Software Architect) | Consultative support, ADR creation, pattern validation |
| **EXPERT-02** (Senior Backend) | Backend architecture validation, API design |
| **EXPERT-01** (Senior Frontend) | Frontend architecture validation |
| **EXPERT-10** (Product Manager) | Feasibility alignment, constraint validation |

---

## Required Context Sources

Before generating Technical Architecture, gather context from available sources:

| Priority | Source | Path Pattern | Extract |
|----------|--------|--------------|---------|
| Critical | PRD Document | `PRODUCTS/{product}/Product-Requirements-Document.md` | Features, epics, personas, constraints |
| Critical | Vision Document | `PRODUCTS/{product}/*Vision*.md` | Strategic direction, product principles |
| High | Existing Architecture | `PRODUCTS/{product}/Technical-Architecture.md` | Prior decisions (if updating) |
| High | Design Docs | `PRODUCTS/{product}/design/*.md` | UI patterns, design system |
| Medium | Context Files | `PRODUCTS/{product}/context/` | Constraints, personas |
| Medium | Existing Architectures | `PRODUCTS/**/Technical-Architecture.md` | Template patterns |
| Low | PROGRESS.md | `PRODUCTS/{product}/PROGRESS.md` | Session context |

**Key Principle:** PRD is the PRIMARY input. Architecture translates features into technical components, defining HOW each feature will be implemented without changing WHAT is being built.

---

## Template & Context Loading

### Template Reference
Read the architecture template at: `FRAMEWORKS/templates/technical-architecture-template.md`

This template defines the required sections, structure, and format for Technical Architecture documents. Always reference this template during Phase 2 (Generation).

### Product Context
Load product-specific context from: `PRODUCTS/{product}/context/`

| File | Usage | Required |
|------|-------|----------|
| `constraints.md` | Technical constraints, compliance | Recommended |
| `product-identity.md` | Product nature, target platforms | Optional |

### Missing Context Handling
If required context files are missing:
1. Notify user: "Context file `{filename}` not found for {product}"
2. Offer to proceed by asking clarifying questions
3. Document assumptions made in the architecture

---

## The Xyric Way: Technical Architecture Philosophy

### Core Principles

1. **Modular Monolith First**
   - Start unified, extract only with evidence
   - Document extraction criteria for each module
   - No premature microservices

2. **Research-First Patterns**
   - Research existing solutions before designing
   - Reference architectures from AWS/Azure/GCP
   - Document what exists, what fits, what's missing

3. **ADR-Driven Decisions**
   - Every significant decision has an ADR
   - Alternatives evaluated with pros/cons
   - Rationale documented for future reference

4. **Practical Over Perfect**
   - Design for current scale + buffer
   - No over-engineering for hypotheticals
   - Complexity must be earned, not assumed

5. **Epic-Aligned Components**
   - Architecture components map to PRD epics
   - Module boundaries enable parallel development
   - Clear ownership per epic

6. **Technology Best-Fit**
   - No technology dogma
   - Choose based on requirements, not popularity
   - Team expertise is a valid factor

---

## Four-Phase Interactive Workflow

### Overview

```
+------------------------------------------------------------------+
|                    PHASE 0: RESEARCH (Automated)                  |
+------------------------------------------------------------------+
|  1. Locate and read PRD Document                                  |
|  2. Extract epics, features, personas, constraints                |
|  3. Read Vision Document for strategic context                    |
|  4. Research existing patterns for similar systems                |
|  5. Identify technical decision points                            |
|  OUTPUT: PRD Analysis Summary (~500 words)                        |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                    PHASE 1: ANALYSIS & QUESTIONS                  |
+------------------------------------------------------------------+
|  6. Present PRD Analysis summary to user                          |
|  7. Show extracted epics, features, technical requirements        |
|  8. Ask 6 tailored architecture questions                         |
|  9. =================== WAIT FOR USER INPUT ====================  |
|  10. (Optional) Ask follow-up questions if needed                 |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                    PHASE 2: GENERATION (Sequential)               |
+------------------------------------------------------------------+
|  11. Apply user decisions to architecture generation              |
|  12. Invoke EXPERT-03 for ADR creation (significant decisions)    |
|  13. FOR EACH SECTION (sequentially):                             |
|      |-- Generate section content using template                  |
|      |-- Cross-reference with PRD epics                           |
|      |-- Ensure component/epic alignment                          |
|      +-- Add to running document                                  |
|  OUTPUT: Complete Architecture + Epic Mapping Matrix              |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                    PHASE 3: VALIDATION (Blocking)                 |
+------------------------------------------------------------------+
|  14. EPIC COVERAGE: All PRD epics have component mapping          |
|  15. ADR CHECK: Major decisions documented                        |
|  16. SECTION CHECK: All 12 required sections present              |
|  17. CONSISTENCY CHECK: No conflicts with PRD constraints         |
|  IF ANY CHECK FAILS -> Return to Phase 2, fix, re-validate        |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                    PHASE 4: OUTPUT & TRACKING                     |
+------------------------------------------------------------------+
|  18. Write to PRODUCTS/{product}/Technical-Architecture.md        |
|  19. Write ADRs to PRODUCTS/{product}/adrs/ folder                |
|  20. Update PROGRESS.md with session details                      |
|  21. Output pipeline hooks for EXPERT-22 (Epic Generator)         |
+------------------------------------------------------------------+
```

---

### Phase 0: Research & Context Gathering

**Purpose:** Extract all relevant information from PRD and establish technical context.

**Step 1: Locate PRD Document**

Look for PRD Document in these locations:
- `PRODUCTS/{product}/Product-Requirements-Document.md`
- `PRODUCTS/{product}/PRD.md`

**Step 2: Extract from PRD Document**

| Section | What to Extract |
|---------|-----------------|
| Executive Summary | Product description, scope, constraints |
| Epic Overview | Epic structure, dependencies, features |
| Success Metrics | Performance targets, scale requirements |
| Personas | User types, access patterns |
| Accessibility | Compliance requirements |
| AI Safety | AI capabilities, boundaries |
| Data Management | Data types, privacy requirements |
| Special Requirements | Security, compliance, integrations |

**Step 3: Extract from Vision Document**

| Section | What to Extract |
|---------|-----------------|
| Product Architecture | High-level components, AI capabilities |
| Product Principles | Guiding principles for architecture |
| Quality Metrics | Performance targets, reliability goals |

**Step 4: Research Existing Patterns**

Research reference architectures for:
- Similar product types (e.g., health apps, AI platforms)
- Technology patterns (e.g., real-time, event-driven)
- Scale requirements (e.g., user volume, data volume)

**Step 5: Create PRD Analysis Summary**

```markdown
## PRD Analysis: [Product Name]

### Product Context
**Product:** [Name and brief description]
**Type:** [Web App / Mobile App / Platform / API / etc.]
**Target Scale:** [Users, requests, data volume]
**Target Platforms:** [Web, iOS, Android, Desktop]

### Epic Structure Extracted
| Epic | Name | Key Features | Technical Implications |
|------|------|--------------|------------------------|
| E01 | [Name] | [Features] | [Implications] |
| E02 | [Name] | [Features] | [Implications] |

### Technical Requirements
**From PRD:**
- Performance: [Targets from success metrics]
- Security: [Requirements from special requirements]
- Compliance: [GDPR, HIPAA, etc.]
- Accessibility: [WCAG level]

**From Vision:**
- AI Capabilities: [List from Product Architecture]
- Integrations: [Required integrations]
- Principles: [Relevant product principles]

### Constraints Identified
- Budget: [If mentioned]
- Timeline: [MVP timeline]
- Team: [Size, expertise if known]
- Technology: [Any mandated technologies]

### Decision Points Requiring Input
- [Decision 1]: [Options identified]
- [Decision 2]: [Options identified]
- [Decision 3]: [Options identified]
```

---

### Phase 1: Questions & User Input

**INPUT:** PRD Analysis from Phase 0

**Step 1: Present Analysis to User**

Show the PRD Analysis summary. User sees:
- What was extracted from PRD
- Epic structure identified
- Technical requirements found
- Decision points needing input

**Step 2: Tailored Questions**

**Critical**: Questions must reference specific PRD content, not be generic.

#### Question Framework (6 Questions)

**ARCHITECTURE FOUNDATION (2 Questions)**

**Q1. Architecture Pattern**
```markdown
Based on the PRD, the product has [X] epics with these characteristics:
- [Epic 1]: [Technical nature]
- [Epic 2]: [Technical nature]

Following the Xyric "Modular Monolith First" principle, I recommend:

**Recommended Approach:**
[Modular Monolith / Consider Microservices based on evidence]

**Rationale:**
- Team size: [Inferred or ask]
- Scale requirements: [From PRD]
- Independent scaling needs: [Analysis]

Questions:
a) Confirm team size (affects architecture decision)
b) Any epics requiring independent deployment cadence?
c) Any epics requiring different technology runtimes?
d) Expected scale at launch vs 2-year projection?
```

**Q2. Technology Stack**
```markdown
Based on the requirements, I've identified these technology decision points:

**Frontend:**
- Platform: [From PRD: Web/iOS/Android]
- Framework candidates: [Based on requirements]

**Backend:**
- Language candidates: [Based on team/requirements]
- Framework candidates: [Based on requirements]

**Database:**
- Data patterns: [From PRD: relational, document, time-series]
- Candidates: [Based on patterns]

**AI/ML (if applicable):**
- Requirements: [From PRD AI sections]
- Candidates: [Based on requirements]

Questions:
a) Any technology constraints or preferences?
b) Team's current expertise?
c) Any existing infrastructure to integrate with?
d) Build vs Buy preference for auth, payments, notifications?
```

**INTEGRATION & DATA (2 Questions)**

**Q3. Integration Architecture**
```markdown
The PRD identifies these integration points:
- [Integration 1]: [From PRD]
- [Integration 2]: [From PRD]

Questions:
a) Priority for each integration (Critical/Important/Nice-to-have)?
b) API style preferences (REST/GraphQL/gRPC)?
c) Real-time requirements (WebSocket/SSE)?
d) Third-party API dependencies and fallback strategies?
```

**Q4. Data Architecture**
```markdown
Based on the PRD, data requirements include:
- User data: [From personas and data management]
- Feature data: [From epic features]
- AI training data: [From AI sections if applicable]

Questions:
a) Data residency requirements (geographic)?
b) Retention policies by data type?
c) Analytics requirements (real-time dashboards, historical)?
d) Data export requirements (GDPR, user portability)?
```

**OPERATIONS & SECURITY (2 Questions)**

**Q5. Security & Compliance**
```markdown
The PRD identifies these security requirements:
- Compliance: [From PRD: GDPR, HIPAA, etc.]
- Authentication: [From account management section]
- Data classification: [From data management]

Questions:
a) Authentication strategy (Social/Email/SSO/MFA)?
b) Authorization model (RBAC/ABAC)?
c) Security certifications required (SOC 2, ISO 27001)?
d) API security (rate limiting, key management)?
```

**Q6. Infrastructure & Operations**
```markdown
Based on scale requirements from PRD:
- User scale: [From PRD targets]
- Performance targets: [From success metrics]

Questions:
a) Cloud provider preference (AWS/GCP/Azure/agnostic)?
b) Deployment model (managed services vs self-managed)?
c) CI/CD requirements (existing pipelines)?
d) Monitoring & Observability (existing tools)?
```

---

### Phase 2: Architecture Generation

**INPUTS:**
- PRD Analysis from Phase 0
- User Answers from Phase 1

**Step 1: Apply User Decisions**

Map user answers to architecture sections:

| Decision | Impact on Architecture |
|----------|------------------------|
| Architecture pattern | System Overview, Component Structure |
| Technology stack | Technology Decisions, ADRs |
| Integration style | API Design, Integration Points |
| Data architecture | Data Architecture, Database Design |
| Security approach | Security Architecture, ADRs |
| Infrastructure | Infrastructure Requirements |

**Step 2: Invoke EXPERT-03 for ADRs**

For each significant decision, create ADR:
- Architecture pattern (Modular Monolith vs Microservices)
- Primary database selection
- Frontend framework selection
- Backend framework selection
- Authentication approach
- Any other technology-specific decisions

**Step 3: Generate Sections (Sequential)**

For each section, sequentially:
1. Reference PRD Analysis and user answers
2. Generate section content using template
3. Cross-reference with PRD epics
4. Ensure component/epic alignment

**Section Generation Order:**
1. Executive Summary (system overview)
2. System Architecture Overview
3. Technology Stack Selection
4. Component Architecture
5. API Design Patterns
6. Data Architecture
7. Security Architecture
8. Infrastructure Requirements
9. Integration Points
10. Architecture Decision Records (ADRs)
11. Epic-Component Mapping
12. Technical Constraints & Trade-offs

---

### Phase 3: Validation (Blocking)

**Purpose:** Quality gate - must pass ALL checks before output.

**Critical Checks (Block if Fail):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Epic Coverage** | Every PRD epic has component mapping | Add missing mappings |
| **ADR Coverage** | Major decisions have ADRs | Create missing ADRs |
| **Section Coverage** | All 12 required sections present | Add missing sections |
| **PRD Alignment** | No conflicts with PRD constraints | Resolve conflicts |
| **Completeness** | No TBD or placeholder content | Fill in gaps |

**Quality Checks (Warning if Fail):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Technology Rationale** | Each tech choice has justification | Add rationale |
| **API Contracts** | Key APIs defined | Add API definitions |
| **Data Models** | Core entities documented | Add data models |
| **Security Coverage** | Auth/authz defined | Add security details |

**Epic-Component Mapping Matrix:**

```markdown
| PRD Epic | Components | APIs | Data Models | ADRs |
|----------|------------|------|-------------|------|
| E01 | [Components] | [APIs] | [Models] | [ADRs] |
| E02 | [Components] | [APIs] | [Models] | [ADRs] |
| **Coverage** | 100% | | | |
```

---

### Phase 4: Output & Tracking

**Step 1: Write Architecture File**

Create: `PRODUCTS/{product}/Technical-Architecture.md`

**Step 2: Write ADRs**

Create folder: `PRODUCTS/{product}/adrs/`
Create files: `ADR-001-[decision-name].md`, `ADR-002-[decision-name].md`, etc.

**Step 3: Update PROGRESS.md**

Add session entry:
- Session timestamp
- Product: {product name}
- Technical Architecture created
- ADRs created: [list]
- Key decisions made
- Open questions for Epic phase

**Step 4: Output Pipeline Hooks**

Include in Architecture for downstream consumption:
- Component list for EXPERT-22
- Epic-component mapping
- Technical constraints per epic
- Handoff marker: `<!-- EPIC_READY_WITH_ARCHITECTURE: {PRODUCT-CODE} -->`

---

## Output Structure

### Files Created

| File | Location | Purpose |
|------|----------|---------|
| Technical Architecture | `PRODUCTS/{product}/Technical-Architecture.md` | Main architecture document |
| ADRs | `PRODUCTS/{product}/adrs/ADR-XXX-*.md` | Individual decision records |

### Typical Length
- Technical Architecture: 600-1000 lines
- ADRs: 50-100 lines each

---

## Quality Checklist

### Section Completeness Check
- [ ] Executive Summary (system overview, key decisions)
- [ ] System Architecture Overview (components, layers, diagram)
- [ ] Technology Stack Selection (frontend, backend, database, infra)
- [ ] Component Architecture (module structure, boundaries)
- [ ] API Design Patterns (style, contracts, versioning)
- [ ] Data Architecture (models, storage, caching)
- [ ] Security Architecture (auth, authz, compliance)
- [ ] Infrastructure Requirements (cloud, deployment, scaling)
- [ ] Integration Points (external APIs, third-party services)
- [ ] Architecture Decision Records (ADR index + details)
- [ ] Epic-Component Mapping (PRD alignment)
- [ ] Technical Constraints & Trade-offs

### PRD Alignment Check
- [ ] Every PRD epic has component mapping
- [ ] Every PRD constraint addressed
- [ ] Every PRD integration point covered
- [ ] Security requirements from PRD implemented
- [ ] Performance targets from PRD achievable

### Quality Standards Check
- [ ] All technology choices have rationale
- [ ] All ADRs have alternatives evaluated
- [ ] No placeholder text (TBD, [fill in], etc.)
- [ ] Diagrams included for key architectures
- [ ] Modular Monolith First principle applied or justified

---

## Integration with Other Skills

### Upstream: EXPERT-21 (PRD Generator)
- Input: Product-Requirements-Document.md
- Inherits: Epics, features, constraints, integrations
- Handoff marker received: `<!-- ARCHITECTURE_READY: {PRODUCT-CODE} -->`

### Downstream: EXPERT-22 (Epic Generator)
- Output: Technical Architecture with component mapping
- Handoff marker sent: `<!-- EPIC_READY_WITH_ARCHITECTURE: {PRODUCT-CODE} -->`
- Epic Generator uses: Component assignments, tech constraints per epic

### Consultative: EXPERT-03 (Software Architect)
- Invoked for: ADR creation, pattern validation
- Alignment: ADR format, Modular Monolith First principle
- Review: Architecture decisions validated

### Supporting: EXPERT-01, EXPERT-02
- Frontend (EXPERT-01): Validates frontend architecture decisions
- Backend (EXPERT-02): Validates backend architecture decisions

---

## Anti-Patterns

### DO NOT

1. **Generate without PRD**
   - Always read PRD first
   - Architecture must implement PRD requirements

2. **Default to Microservices**
   - Modular Monolith First is the Xyric way
   - Microservices need evidence justification

3. **Skip ADRs**
   - Every significant decision needs documentation
   - Future engineers need context

4. **Over-engineer for Scale**
   - Design for current needs + buffer
   - Document when to scale, don't pre-scale

5. **Technology by Popularity**
   - Choose based on requirements
   - Team expertise matters

6. **Leave Epic Gaps**
   - Every PRD epic needs component mapping
   - Validation blocks on incomplete coverage

---

## Activation Checklist

When this skill is activated:

**Phase 0: Research**
1. [ ] Locate PRD Document for product
2. [ ] Extract epics, features, constraints, integrations
3. [ ] Read Vision Document for strategic context
4. [ ] Research existing patterns for similar systems
5. [ ] Generate PRD Analysis Summary (~500 words)

**Phase 1: Analysis**
6. [ ] Present PRD Analysis to user
7. [ ] Ask 6 tailored architecture questions
8. [ ] **WAIT for user responses**
9. [ ] (Optional) Ask follow-up questions if needed

**Phase 2: Generation**
10. [ ] Apply user decisions to architecture structure
11. [ ] Invoke EXPERT-03 for ADR creation
12. [ ] Generate 12 sections sequentially
13. [ ] Build Epic-Component Mapping Matrix

**Phase 3: Validation (Blocking)**
14. [ ] Verify all 12 sections complete
15. [ ] Verify 100% PRD epic coverage
16. [ ] Verify all major decisions have ADRs
17. [ ] If fails -> return to Phase 2 and fix

**Phase 4: Output**
18. [ ] Write to PRODUCTS/{product}/Technical-Architecture.md
19. [ ] Write ADRs to PRODUCTS/{product}/adrs/
20. [ ] Update PROGRESS.md
21. [ ] Include pipeline hooks for EXPERT-22
22. [ ] Present completion summary

---

*Skill EXPERT-27 v1.0 | Xyric Solutions | 2025-12-24*
*4-Phase PRD -> Architecture Transformation | Modular Monolith First | ADR-Driven | EXPERT-03 Integration*
