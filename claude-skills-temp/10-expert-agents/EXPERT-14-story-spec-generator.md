# EXPERT-14: Story Spec Generator

**Skill ID**: EXPERT-14
**Category**: Expert Agents
**Priority**: Critical
**Version**: 2.0
**Last Updated**: 2025-12-09
**Architecture**: 4-Phase Workflow with Blocking Validation
**Type**: Individual (One Story at a Time)
**ADR**: Flags Architecture Decisions for Review

---

## Purpose

Transform a User Story from EXPERT-13 into a detailed Technical Specification that provides everything needed for task breakdown. This skill bridges product requirements and engineering implementation.

**Core Philosophy**: Technical specifications translate user-facing stories into engineering-ready designs. They define APIs, data models, UI components, and integration patterns without dictating implementation details.

---

## When to Activate

### Trigger Phrases
- "Create tech spec for story [ID]"
- "Generate technical specification for [story]"
- "Story spec for [story ID]"
- "Technical design for [story]"
- "Spec out story [ID]"
- "Engineering spec from story"

### Related Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-13** (Story Generator) | Story → Tech Spec (upstream) |
| **EXPERT-15** (Task Generator) | Tech Spec → Tasks (downstream) |
| **EXPERT-03** (Software Architect) | Architecture patterns, ADR creation |
| **BI-02** (Business Insights) | Question framework alignment |
| **EXPERT-01/02/05** (Engineers) | Implementation guidance |

---

## Required Context Sources

Before generating a technical specification, gather context from available sources:

| Priority | Source | Path Pattern | Extract |
|----------|--------|--------------|---------|
| Critical | Story File | `PRODUCTS/{product}/stories/Epic-XX-Stories.md` | Target story |
| High | Epic PRD | `PRODUCTS/{product}/prd-epics/PRD-Epic-XX-*.md` | Feature context |
| High | Design System | `PRODUCTS/{product}/design/*.md` | UI patterns |
| Medium | Master PRD | `PRODUCTS/{product}/Product-Requirements-Document.md` | Technical requirements |
| Medium | PROGRESS.md | `PRODUCTS/{product}/PROGRESS.md` | Architecture decisions |
| Low | Existing Specs | `PRODUCTS/{product}/specs/*.md` | Patterns |

**Key Principle:** User Story from EXPERT-13 is the PRIMARY input. Tech Spec defines HOW to implement without changing WHAT.

---

## The Xyric Way: Tech Spec Philosophy

### Core Principles

1. **Spec Defines HOW, Not WHAT**
   - Story defines user-facing behavior
   - Spec defines technical approach
   - Don't change story requirements

2. **API-First Design**
   - Define contracts before implementation
   - Request/response schemas explicit
   - Error codes documented

3. **Data Model Clarity**
   - Entities and relationships defined
   - Schema changes documented
   - Migration path considered

4. **UI Component Breakdown**
   - Component hierarchy defined
   - State management approach
   - Event flows documented

5. **Testability Built-In**
   - Test strategy per layer
   - Test data requirements
   - Coverage expectations

6. **Security by Design**
   - Auth/authz requirements
   - Data protection approach
   - Input validation rules

7. **Performance Considered**
   - Response time targets
   - Resource limits
   - Optimization opportunities

---

## Architecture Alignment

### Pattern Selection (Invoke EXPERT-03)

When generating tech specs, identify applicable architecture patterns:

| Pattern Category | Examples | When to Apply |
|------------------|----------|---------------|
| **Data Patterns** | Repository, CQRS, Event Sourcing | Data-heavy stories |
| **API Patterns** | REST, GraphQL, BFF | API design decisions |
| **UI Patterns** | Container/Presenter, Compound Components | Complex UI |
| **Integration Patterns** | Saga, Circuit Breaker, Retry | External integrations |

### ADR Flagging (Architecture Decision Records)

**When to Flag for ADR:**
- New architectural pattern introduced
- Deviation from established patterns
- Cross-cutting concerns (auth, logging, caching)
- Technology choices with long-term implications

**ADR Flag Format:**
```markdown
**⚠️ ADR Required:** [Decision Topic]
- **Impact:** High | Medium | Low
- **Scope:** Story | Epic | Product
- **Invoke:** EXPERT-03 for ADR creation
```

### Design System Reference

Link to design system for UI stories:
- Component patterns to reuse
- Design tokens (colors, spacing, typography)
- Interaction patterns
- Accessibility standards

---

## Four-Phase Interactive Workflow

### Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 0: RESEARCH (Automated)                 │
├─────────────────────────────────────────────────────────────────┤
│  1. Locate story in stories/Epic-XX-Stories.md                   │
│  2. Read Epic PRD for feature context                            │
│  3. Read design system for UI patterns                           │
│  4. Identify technical questions and decisions                   │
│  OUTPUT: Story Technical Context (~300 words)                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: ANALYSIS & QUESTIONS                 │
├─────────────────────────────────────────────────────────────────┤
│  5. Present story and technical context to user                  │
│  6. Identify architectural decisions needed                      │
│  7. Ask 5 tailored technical questions                           │
│  8. ═══════════════ WAIT FOR USER INPUT ════════════════════════│
│  9. (Optional) Ask follow-up questions if needed                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2: GENERATION (Sequential)              │
├─────────────────────────────────────────────────────────────────┤
│  10. Apply user decisions to technical approach                  │
│  11. Identify architecture patterns (invoke EXPERT-03)           │
│  12. Flag ADR decisions (if significant)                        │
│  13. Generate API contracts                                      │
│  14. Define data models                                          │
│  15. Specify UI components (ref design system)                   │
│  16. Document integration points                                 │
│  OUTPUT: Complete Technical Specification with ADR Flags         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: VALIDATION (Blocking)                │
├─────────────────────────────────────────────────────────────────┤
│  17. STORY COVERAGE: All acceptance criteria addressed           │
│  18. SECTION CHECK: All required sections present               │
│  19. ARCHITECTURE: Patterns identified, ADRs flagged            │
│  20. DESIGN SYSTEM: UI components reference design docs         │
│  21. COMPLETENESS: No TBD or placeholder content                │
│  22. CONSISTENCY: API/Data/UI aligned                           │
│  IF ANY CHECK FAILS → Return to Phase 2, fix, re-validate      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4: OUTPUT & TRACKING                    │
├─────────────────────────────────────────────────────────────────┤
│  19. Write to specs/Story-[ID]-Spec.md                          │
│  20. Update PROGRESS.md with session details                     │
│  21. Output pipeline hooks for EXPERT-15 (Task Generator)       │
└─────────────────────────────────────────────────────────────────┘
```

---

### Assumption Challenge Integration

**Invoke CORE-03** between Phase 0 (Research) and Phase 1 (Questions).

| Challenge Phase | Applied | Trigger |
|-----------------|---------|---------|
| A: Question Why | Yes | User selects architecture approach or technology |
| B: Alternatives | Yes | API design, data model choices |
| C: Stress Test | No | (Medium intensity - skip Phase C) |

**Challenge Intensity:** Medium (A + B only)

**What to Challenge:**
- Architecture patterns: "Why this pattern for this story?"
- Technology choices: "What drives this technology selection?"
- API design: "Are there simpler alternatives to this API approach?"
- Data model: "Does this data model support future requirements?"

**Workflow Update:**
```
Phase 0: Research → CORE-03: Challenge (Medium) → Phase 1: Questions → Phase 2: Generate → Phase 3: Validate
```

**Skip Challenge When:**
- User explicitly requests bypass ("skip challenge")
- Following established patterns from prior specs
- Decisions already documented in ADRs

**Reference:** See `claude-skills/00-core/CORE-03-assumption-challenge.md` for full framework.

---

### Phase 0: Research & Context Gathering

**Purpose:** Extract story details and gather technical context.

**Step 1: Identify Target Story**

User specifies which story to spec:
- Story ID: S[Epic].[Feature].[Seq] (e.g., S01.01.01)
- Story title: [From Stories document]

**Step 2: Extract from Stories Document**

Find the target story and extract:
- Story title and description
- User story format (As a... I want... so that...)
- Acceptance criteria
- Dependencies
- Priority and size

**Step 3: Extract from Epic PRD**

For the parent feature:
- Feature description
- Success metrics
- Error scenarios
- Integration points

**Step 4: Gather Technical Context**

Read design system and existing specs:
- UI component patterns
- API conventions
- Data model patterns
- State management approach

**Step 5: Create Story Technical Context**

```markdown
## Story Technical Context: [Story ID]

### Story Summary
**ID:** S[XX.YY.ZZ]
**Title:** [Title]
**Epic/Feature:** E[XX]/F[X.Y]
**Priority:** P[X]
**Size:** [S/M/L/XL]

### User Story
As a [persona], I want to [action] so that [benefit].

### Acceptance Criteria (from Story)
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

### Technical Context
**Related Feature:** F[X.Y] - [Feature Name]
**Error Scenarios:** [From Epic PRD]
**Integration Points:** [From Epic PRD]

### Existing Patterns
**UI Components:** [From design system]
**API Style:** [REST/GraphQL/tRPC]
**Data Store:** [Database type]
**State Management:** [Redux/Zustand/Context/etc.]

### Technical Decisions Needed
- [Decision 1]: [Options]
- [Decision 2]: [Options]
- [Decision 3]: [Options]
```

---

### Phase 1: Questions & User Input

**INPUT:** Story Technical Context from Phase 0

**Step 1: Present Context to User**

Show the Story Technical Context. User sees:
- Story summary and acceptance criteria
- Technical context from existing docs
- Decisions that need input

**Step 2: Tailored Questions**

**Critical**: Questions must reference specific story content.

#### Question Framework (BI-02 Aligned)

The question framework follows BI-02 hypothesis-driven patterns:
- **Hypothesis Questions**: Validate technical assumptions
- **Constraint Discovery**: Identify technical limitations
- **Integration Validation**: Verify integration assumptions

#### Questions (5 Categories)

**ARCHITECTURE (2 Questions) - Pattern Selection**

**Q1. API Design**
```markdown
This story requires API endpoints for:
[List inferred operations based on story]

Questions:
a) API Style preference:
   - REST (resource-based)
   - GraphQL (flexible queries)
   - tRPC (TypeScript-native)
   - Other: [specify]

b) Authentication approach:
   - JWT tokens
   - Session-based
   - API keys
   - OAuth 2.0
   - Combination: [specify]

c) Endpoint structure for this story:
   - [Proposed endpoint 1]: [Purpose]
   - [Proposed endpoint 2]: [Purpose]
   Does this structure look right?

d) Rate limiting needs:
   - No rate limiting
   - Standard rate limiting
   - Aggressive rate limiting (sensitive operation)
```

**Q2. Data Model**
```markdown
This story likely involves these entities:
[List inferred entities based on story]

Questions:
a) Does this story create new database entities?
   - Yes: [List new entities]
   - No: Uses existing entities only

b) Schema changes needed?
   - New tables: [List]
   - New columns on existing tables: [List]
   - No schema changes

c) Data relationships:
   - [Entity A] → [Entity B]: [Relationship type]
   Does this match your mental model?

d) Data retention considerations:
   - Soft delete vs. hard delete
   - Audit logging requirements
   - GDPR/data privacy needs
```

**UI/UX (2 Questions)**

**Q3. UI Components**
```markdown
Based on the story, these UI elements are needed:
[List inferred UI elements]

Questions:
a) Component breakdown:
   - [Component 1]: [Purpose]
   - [Component 2]: [Purpose]
   - [Component 3]: [Purpose]
   Does this component structure make sense?

b) State management:
   - Local component state only
   - Global state (Redux/Zustand/Context)
   - Server state (React Query/SWR)
   - Combination: [specify]

c) Existing components to reuse:
   - [List from design system if available]

d) New components needed:
   - [List any new components]
```

**Q4. User Flows & States**
```markdown
The story involves these user states:
[List inferred states: loading, error, success, empty, etc.]

Questions:
a) Loading states:
   - Skeleton loaders
   - Spinners
   - Progressive loading
   - Optimistic updates

b) Error display:
   - Inline errors
   - Toast notifications
   - Modal dialogs
   - Banner alerts

c) Empty states:
   - Helpful guidance
   - Call to action
   - Illustration/graphic

d) Success feedback:
   - Toast confirmation
   - Visual indicator
   - Redirect behavior
```

**TECHNICAL (1 Question)**

**Q5. Testing & Performance**
```markdown
Questions:
a) Testing priority for this story:
   - Unit tests: [High/Medium/Low]
   - Integration tests: [High/Medium/Low]
   - E2E tests: [High/Medium/Low]

b) Test data requirements:
   - Mock data sufficient
   - Seed data needed
   - Production-like data needed

c) Performance targets:
   - API response time: [Xms target]
   - UI render time: [Xms target]
   - Any specific performance concerns?

d) Special technical considerations:
   - Offline support needed?
   - Real-time updates needed?
   - File upload/download?
   - Third-party integrations?
```

---

### Phase 2: Tech Spec Generation

**INPUTS (from previous phases):**
- Story Technical Context from Phase 0
- User Answers from Phase 1

**Step 1: Apply User Decisions**

Map user answers to spec sections:

| Decision | Impact on Spec |
|----------|----------------|
| API style | API contracts section |
| Auth approach | Security section |
| Data model | Data models section |
| Components | UI components section |
| Testing priority | Testing strategy section |

**Step 2: Generate Sections (Sequential)**

Generate each section, sequentially:
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

**Why Sequential:**
- API → Data → UI dependency
- Consistency maintained
- Cross-references accurate

---

### Phase 3: Validation (Blocking)

**Purpose:** Quality gate - must pass ALL checks before output.

**Critical Checks (Block if Fail):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **Story Coverage** | Every acceptance criterion addressed | Map criteria to spec |
| **Section Coverage** | All required sections present | Add missing sections |
| **Architecture Alignment** | Patterns identified, ADRs flagged | Invoke EXPERT-03 |
| **Design System Reference** | UI components linked to design docs | Add references |
| **Completeness** | No TBD or placeholder content | Fill in gaps |
| **Consistency** | API/Data/UI aligned | Resolve conflicts |

**Quality Checks (Warning → Block if >3):**

| Check | Criteria | Action if Fail |
|-------|----------|----------------|
| **API Completeness** | All endpoints have schemas | Add schemas |
| **Data Clarity** | All entities have fields | Define fields |
| **ADR Documentation** | Significant decisions flagged | Add ADR flag |
| **Test Coverage** | Test strategy defined | Add strategy |
| **Security** | Auth/authz documented | Add security |

**Validation Output:**
- ✅ All checks pass → Proceed to Phase 4
- ❌ Any critical check fails → Return to Phase 2

---

### Phase 4: Output & Tracking

**Step 1: Write Tech Spec File**

Create: `PRODUCTS/{product}/specs/Story-[ID]-Spec.md`

File naming convention:
- `Story-S01.01.01-Spec.md`
- `Story-S02.03.02-Spec.md`

Or folder structure:
- `specs/epic-01/Story-S01.01.01-Spec.md`

**Step 2: Update PROGRESS.md**

Add session entry:
- Session timestamp
- Story: [Story ID] - [Title]
- Tech spec created
- Ready for task breakdown

**Step 3: Output Pipeline Hooks**

Include hook for EXPERT-15:
- Story ID and spec location
- Format: `<!-- TASKS_READY: S[XX.YY.ZZ] -->`

---

## Technical Specification Template

```markdown
# Technical Specification: [Story ID]
**[Story Title]**

---

## DOCUMENT INFORMATION

| Attribute | Value |
|-----------|-------|
| **Story ID** | S[XX.YY.ZZ] |
| **Story Title** | [Title] |
| **Epic/Feature** | E[XX] / F[X.Y] |
| **Version** | 1.0 |
| **Status** | Draft / Review / Approved |
| **Author** | [Name] |
| **Last Updated** | [Date] |

---

## 1. STORY REFERENCE

### User Story
**As a** [persona],
**I want to** [action],
**so that** [benefit].

### Acceptance Criteria
| ID | Criterion | Addressed In |
|----|-----------|--------------|
| AC1 | [Criterion 1] | API: `/endpoint`, UI: Component |
| AC2 | [Criterion 2] | Data: Entity, API: `/endpoint` |
| AC3 | [Criterion 3] | UI: Component, State: Store |
| ... | ... | ... |

### Dependencies
- **Stories:** S[XX.YY.ZZ] (must complete first)
- **Features:** F[X.Y]
- **External:** [APIs, services]

---

## 2. TECHNICAL OVERVIEW

### Architecture Approach
[2-3 paragraphs describing the technical approach for this story]

### Architecture Alignment (EXPERT-03)

| Aspect | Pattern | Rationale |
|--------|---------|-----------|
| Data Access | [Repository/Active Record/etc.] | [Why] |
| API Style | [REST/GraphQL/tRPC] | [Why] |
| UI Architecture | [Container-Presenter/Compound/etc.] | [Why] |
| State Management | [Local/Global/Server] | [Why] |

### Key Decisions

| Decision | Choice | Rationale | ADR Required? |
|----------|--------|-----------|---------------|
| [Decision 1] | [Choice] | [Why] | ⚠️ Yes / No |
| [Decision 2] | [Choice] | [Why] | No |
| [Decision 3] | [Choice] | [Why] | No |

### ADR Flags (If Any)

```markdown
**⚠️ ADR Required:** [Decision Topic]
- **Impact:** High | Medium | Low
- **Scope:** Story | Epic | Product
- **Invoke:** EXPERT-03 for ADR creation
- **Context:** [Brief explanation of why this needs formal documentation]
```

### Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                           [Story Name]                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
│  │   Frontend  │───▶│     API     │───▶│   Database  │          │
│  │  Component  │    │   Endpoint  │    │    Table    │          │
│  └─────────────┘    └─────────────┘    └─────────────┘          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. API CONTRACTS

### Endpoint: `[METHOD] /api/v1/[resource]`

**Purpose:** [What this endpoint does]

**Authentication:** Required / Optional / None
**Authorization:** [Role/permission required]

#### Request

```typescript
// Request Headers
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}

// Request Body (for POST/PUT/PATCH)
interface [RequestName]Request {
  field1: string;       // Description
  field2: number;       // Description
  field3?: boolean;     // Optional - Description
}
```

#### Response

```typescript
// Success Response (200/201)
interface [RequestName]Response {
  success: boolean;
  data: {
    id: string;
    field1: string;
    field2: number;
    createdAt: string;  // ISO 8601
  };
}

// Error Response (4xx/5xx)
interface ErrorResponse {
  success: false;
  error: {
    code: string;       // e.g., "VALIDATION_ERROR"
    message: string;    // User-friendly message
    details?: object;   // Additional context
  };
}
```

#### Error Codes

| HTTP Status | Error Code | Description | User Message |
|-------------|------------|-------------|--------------|
| 400 | VALIDATION_ERROR | Invalid input | "Please check your input" |
| 401 | UNAUTHORIZED | Missing/invalid token | "Please sign in" |
| 403 | FORBIDDEN | Insufficient permissions | "You don't have access" |
| 404 | NOT_FOUND | Resource not found | "[Resource] not found" |
| 429 | RATE_LIMITED | Too many requests | "Please wait and try again" |
| 500 | INTERNAL_ERROR | Server error | "Something went wrong" |

---

### Endpoint: `[METHOD] /api/v1/[resource]/:id`

[Continue for each endpoint...]

---

## 4. DATA MODELS

### Entity: [EntityName]

```typescript
interface [EntityName] {
  // Primary Key
  id: string;                    // UUID v4

  // Core Fields
  field1: string;                // Description, constraints
  field2: number;                // Description, constraints
  field3: EntityStatus;          // Enum: ACTIVE | INACTIVE | PENDING

  // Relationships
  relatedEntityId: string;       // FK to RelatedEntity
  relatedEntity?: RelatedEntity; // Populated on join

  // Audit Fields
  createdAt: Date;               // Auto-set on create
  updatedAt: Date;               // Auto-set on update
  createdBy: string;             // FK to User
  updatedBy: string;             // FK to User
}

enum EntityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}
```

### Database Schema

```sql
CREATE TABLE [entity_name] (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field1 VARCHAR(255) NOT NULL,
  field2 INTEGER NOT NULL DEFAULT 0,
  field3 VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  related_entity_id UUID REFERENCES related_entity(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_[entity]_field1 ON [entity_name](field1);
CREATE INDEX idx_[entity]_related ON [entity_name](related_entity_id);
```

### Entity Relationships

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    User      │──────▶│   [Entity]   │──────▶│   Related    │
│              │ 1:N   │              │  N:1  │   Entity     │
└──────────────┘       └──────────────┘       └──────────────┘
```

### Migration Plan

| Step | Action | Rollback |
|------|--------|----------|
| 1 | Create table [entity] | Drop table |
| 2 | Add index idx_field1 | Drop index |
| 3 | Seed initial data | Delete seeded data |

---

## 5. UI COMPONENTS

### Component Hierarchy

```
[PageComponent]
├── [HeaderComponent]
│   ├── [TitleComponent]
│   └── [ActionsComponent]
├── [ContentComponent]
│   ├── [ListComponent]
│   │   └── [ItemComponent] (repeated)
│   └── [EmptyStateComponent]
└── [FooterComponent]
    └── [PaginationComponent]
```

### Component: [ComponentName]

**Purpose:** [What this component does]

**Props:**

```typescript
interface [ComponentName]Props {
  // Required props
  data: DataType;
  onAction: (id: string) => void;

  // Optional props
  isLoading?: boolean;
  errorMessage?: string;
  variant?: 'default' | 'compact' | 'expanded';
}
```

**State:**

```typescript
// Local state
const [isOpen, setIsOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState<Item | null>(null);

// Server state (React Query / SWR)
const { data, isLoading, error } = useQuery(['key'], fetchFn);
```

**Events:**

| Event | Trigger | Handler |
|-------|---------|---------|
| onClick | User clicks [element] | handleClick |
| onSubmit | Form submission | handleSubmit |
| onChange | Input value changes | handleChange |

**States:**

| State | Condition | Display |
|-------|-----------|---------|
| Loading | isLoading=true | Skeleton/Spinner |
| Error | error exists | Error message |
| Empty | data.length=0 | Empty state CTA |
| Success | data exists | Data display |

---

### Component: [Component2Name]

[Continue for each component...]

---

## 6. INTEGRATION POINTS

### Internal Integrations

| Integration | Type | Description |
|-------------|------|-------------|
| Auth Service | API | Token validation, user context |
| Notification Service | Event | Trigger notifications on [action] |
| Analytics Service | Event | Track user actions |

### External Integrations

| Integration | Type | Description | Failure Handling |
|-------------|------|-------------|------------------|
| [Third Party API] | REST | [Purpose] | [Fallback behavior] |
| [Payment Provider] | Webhook | [Purpose] | [Retry policy] |

### Event Flows

```
User Action → Component → API → Service → Database
                                    ↓
                              Event Bus
                                    ↓
                         Notification Service
                                    ↓
                              Push / Email
```

---

## 7. SECURITY REQUIREMENTS

### Authentication

| Requirement | Implementation |
|-------------|----------------|
| Auth method | JWT / Session / API Key |
| Token storage | httpOnly cookie / localStorage |
| Token refresh | [Strategy] |
| Session timeout | [Duration] |

### Authorization

| Action | Required Role | Required Permission |
|--------|---------------|---------------------|
| View | Any authenticated | read:[resource] |
| Create | [Role] | create:[resource] |
| Update | Owner or Admin | update:[resource] |
| Delete | Admin only | delete:[resource] |

### Data Protection

| Data Type | Protection | Storage |
|-----------|------------|---------|
| PII | Encrypted at rest | Database |
| Passwords | bcrypt hash | Database |
| Tokens | Signed JWT | Cookie |
| Sensitive fields | Masked in logs | Logs |

### Input Validation

| Field | Validation Rules |
|-------|------------------|
| email | Email format, max 255 chars |
| password | Min 8 chars, complexity requirements |
| [field] | [Rules] |

---

## 8. TESTING STRATEGY

### Unit Tests

| Component/Function | Test Cases | Priority |
|--------------------|------------|----------|
| [ComponentName] | Renders correctly, handles click | High |
| [ServiceFunction] | Returns correct data, handles errors | High |
| [UtilityFunction] | Edge cases, null handling | Medium |

**Coverage Target:** [X]% line coverage

### Integration Tests

| Integration | Test Cases | Priority |
|-------------|------------|----------|
| API → Database | CRUD operations | High |
| Component → API | Data fetching, error handling | High |
| Auth flow | Login, logout, token refresh | High |

### E2E Tests

| User Flow | Steps | Priority |
|-----------|-------|----------|
| [Flow 1] | 1. [Step], 2. [Step], 3. [Assert] | High |
| [Flow 2] | 1. [Step], 2. [Step], 3. [Assert] | Medium |

### Test Data Requirements

| Data Type | Source | Refresh Frequency |
|-----------|--------|-------------------|
| Mock data | Fixtures | Per test |
| Seed data | Script | Per test suite |
| Snapshot data | Production sample | Monthly |

---

## 9. PERFORMANCE REQUIREMENTS

### Response Time Targets

| Operation | Target | Measurement |
|-----------|--------|-------------|
| API response | < [X]ms | p95 latency |
| Page load | < [X]s | LCP |
| Interaction | < [X]ms | FID |
| Data fetch | < [X]ms | Query time |

### Resource Limits

| Resource | Limit | Monitoring |
|----------|-------|------------|
| Memory | [X]MB | APM |
| CPU | [X]% | APM |
| Database connections | [X] | Connection pool |
| API rate | [X] req/min | Rate limiter |

### Optimization Strategies

| Area | Strategy | Implementation |
|------|----------|----------------|
| API | Response caching | Cache headers, Redis |
| Database | Query optimization | Indexes, pagination |
| Frontend | Code splitting | Dynamic imports |
| Images | Lazy loading | Intersection Observer |

---

## 10. OPEN TECHNICAL DECISIONS

### Decision: [Decision Topic]

**Context:** [Why this decision is needed]

**Options:**

| Option | Pros | Cons |
|--------|------|------|
| Option A | [Pros] | [Cons] |
| Option B | [Pros] | [Cons] |
| Option C | [Pros] | [Cons] |

**Recommendation:** [Option X] because [rationale]

**Decision Needed By:** [Date/Milestone]

---

### Decision: [Decision Topic 2]

[Continue for each open decision...]

---

## ACCEPTANCE CRITERIA MAPPING

| Criterion | API | Data | UI | Test |
|-----------|-----|------|----|----- |
| AC1: [Criterion] | `/endpoint` | Entity | Component | Unit + E2E |
| AC2: [Criterion] | `/endpoint` | - | Component | Unit |
| AC3: [Criterion] | - | Entity | - | Integration |
| ... | ... | ... | ... | ... |

**Coverage:** 100% of acceptance criteria addressed

---

## DOCUMENT GOVERNANCE

### Related Documents

| Document | Location | Status |
|----------|----------|--------|
| Story | `stories/Epic-XX-Stories.md` | Approved |
| Epic PRD | `prd-epics/PRD-Epic-XX-*.md` | Approved |
| Tasks | `tasks/Story-[ID]-Tasks.md` | [Status] |

### Review Checklist

- [ ] Technical approach reviewed by architect
- [ ] Security review completed
- [ ] API contracts reviewed
- [ ] Test strategy approved
- [ ] Performance targets agreed

---

**Tech Spec Created:** [Date]
**Next Review:** [Date]
**Spec Owner:** [Name/Role]

---

*Technical Specification v1.0 | Story [ID] | [Product Name] | [Date]*

<!-- TASKS_READY: S[XX.YY.ZZ] -->
```

---

## Output Structure

### File: `PRODUCTS/{product}/specs/Story-[ID]-Spec.md`

**Typical Length:** 400-700 lines per story
**Content:** Full technical specification
**Quality Bar:** All acceptance criteria addressed

---

## Quality Checklist

### Section Completeness
- [ ] Story Reference (user story, criteria, dependencies)
- [ ] Technical Overview (approach, decisions, diagram)
- [ ] API Contracts (endpoints, schemas, errors)
- [ ] Data Models (entities, schema, relationships)
- [ ] UI Components (hierarchy, props, state, events)
- [ ] Integration Points (internal, external, events)
- [ ] Security Requirements (auth, authz, data protection)
- [ ] Testing Strategy (unit, integration, e2e)
- [ ] Performance Requirements (targets, limits, optimization)
- [ ] Open Technical Decisions (options, recommendations)

### Coverage Checks
- [ ] Every acceptance criterion addressed
- [ ] All APIs have request/response schemas
- [ ] All entities have field definitions
- [ ] All components have props/state defined
- [ ] Test strategy covers all layers

### Quality Standards
- [ ] No TBD or placeholder content
- [ ] Response time targets are numbers
- [ ] Error codes are specific
- [ ] Security requirements are actionable
- [ ] Test cases are specific

---

## Integration with Other Skills

### Upstream Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-13** (Story Generator) | Input: User Story with acceptance criteria, dependencies, priority |

### Skill Invocations (During Spec Generation)

| Phase | Skill | Purpose |
|-------|-------|---------|
| **Questions** | BI-02 (Business Insights) | Hypothesis-driven question framework |
| **Generation** | EXPERT-03 (Software Architect) | Architecture patterns, ADR creation |

### Downstream Skills

| Skill | Integration |
|-------|-------------|
| **EXPERT-15** (Task Generator) | Output: Tech Spec for TDD task breakdown |
| | Handoff: `<!-- TASKS_READY: S[XX.YY.ZZ] -->` |
| | Tasks generated from Tech Spec sections |

### Skill Invocation Pattern

```
EXPERT-14 generates tech spec
    │
    ├── Questions Phase
    │   └── Apply BI-02 question framework
    │
    ├── Generation Phase
    │   ├── Identify architecture patterns
    │   ├── Invoke EXPERT-03 for ADR decisions
    │   └── Reference design system for UI
    │
    └── Output Phase
        └── Handoff to EXPERT-15 for task breakdown
```

---

## Anti-Patterns

### DO NOT

1. **Generate without story**
   - Always read story first
   - Spec must address story acceptance criteria

2. **Change story requirements**
   - Spec defines HOW, not WHAT
   - Don't modify acceptance criteria

3. **Skip security section**
   - Every spec needs security considerations
   - Even internal APIs need auth

4. **Leave decisions unresolved**
   - Capture open decisions with recommendations
   - Provide enough context for decision-making

5. **Forget testing strategy**
   - Every spec needs test approach
   - Coverage expectations defined

6. **Ignore performance**
   - Response time targets required
   - Resource limits considered

---

## Activation Checklist

When this skill is activated:

**Phase 0: Research**
1. [ ] Identify target story (S[XX.YY.ZZ])
2. [ ] Read story from Stories document
3. [ ] Read Epic PRD for feature context
4. [ ] Read design system for patterns
5. [ ] Generate Story Technical Context (~300 words)

**Phase 1: Analysis**
6. [ ] Present context to user
7. [ ] Ask 5 tailored technical questions
8. [ ] **WAIT for user responses**
9. [ ] (Optional) Ask follow-up questions if needed

**Phase 2: Generation**
10. [ ] Apply user decisions
11. [ ] Generate all 10 sections sequentially
12. [ ] Ensure acceptance criteria addressed
13. [ ] Build criteria mapping

**Phase 3: Validation (Blocking)**
14. [ ] Verify all acceptance criteria mapped
15. [ ] Verify all sections present
16. [ ] Verify no placeholder content
17. [ ] If fails → return to Phase 2 and fix

**Phase 4: Output**
18. [ ] Write to specs/Story-[ID]-Spec.md
19. [ ] Update PROGRESS.md
20. [ ] Include pipeline hooks for EXPERT-15
21. [ ] Present completion summary

---

*Skill EXPERT-14 v2.0 | Xyric Solutions | 2025-12-09*
*4-Phase Story → Technical Specification with blocking validation*
*Architecture Alignment: EXPERT-03 | Questions: BI-02 | ADR Flagging Integrated*
