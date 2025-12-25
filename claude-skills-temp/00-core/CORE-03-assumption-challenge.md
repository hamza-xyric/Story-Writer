# CORE-03: Assumption Challenge Framework

**Skill ID**: CORE-03
**Category**: Core Infrastructure
**Priority**: Critical
**Version**: 1.0
**Last Updated**: 2025-12-10
**Architecture**: 3-Phase Challenge Framework

---

## Purpose

Challenge user assumptions before document generation to produce higher-quality outputs. When Claude follows any pipeline generator or decision-making skill, it MUST question the user's thinking, propose alternatives, and stress-test decisions before proceeding.

**This skill ensures:**
- Better questions asked (by forcing articulation of reasoning)
- More specific, precise documents (by eliminating ambiguity)
- User sharing more context (by surfacing unstated assumptions)
- Higher quality outcomes (by validating decisions before implementation)

**Core Philosophy**: Great documents come from challenged assumptions, not accepted ones.

---

## When to Activate

**Automatic Triggers**:
- Pipeline generators starting Phase 1 (Vision, PRD, Epic, Story generation)
- Architecture decisions (ADR creation, technology selection)
- Product scope decisions (MoSCoW prioritization, MVP definition)
- Feature prioritization or deprioritization
- User provides decisive statements without supporting rationale

**Manual Invocation**:
```
"Challenge my assumptions about [X]"
"Play devil's advocate on [decision]"
"What alternatives should I consider for [approach]?"
"Stress-test my thinking on [topic]"
```

**Integration Point**:
Insert between Phase 0 (Research) and Phase 1 (Questions) in 4-phase workflows:
```
Phase 0: Research → CORE-03: Challenge → Phase 1: Questions → Phase 2: Generate → Phase 3: Validate
```

---

## Three-Phase Challenge Framework

### Overview

```
┌─────────────────────────────────────────────────────────────────┐
│              PHASE A: QUESTION WHY (Rationale Extraction)        │
├─────────────────────────────────────────────────────────────────┤
│  "You've indicated [X]. Before proceeding:"                      │
│  • What problem are you solving?                                 │
│  • Why this approach specifically?                               │
│  • What evidence supports this decision?                         │
│  • What assumptions are embedded in your request?                │
│  OUTPUT: User articulates reasoning, surfaces hidden assumptions │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              PHASE B: PROPOSE ALTERNATIVES                       │
├─────────────────────────────────────────────────────────────────┤
│  "Based on your goal, here are alternative approaches:"          │
│  • Approach A (Current): [User's approach] - Trade-offs          │
│  • Approach B: [Alternative] - Trade-offs                        │
│  • Approach C: [Alternative] - Trade-offs                        │
│  "Which approach best fits your context?"                        │
│  OUTPUT: User makes conscious, informed choice                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              PHASE C: DEVIL'S ADVOCATE (Stress Test)             │
├─────────────────────────────────────────────────────────────────┤
│  "You've chosen [approach]. Let me stress-test this:"            │
│  • What if [failure scenario]?                                   │
│  • Have you considered [constraint/risk]?                        │
│  • What would your critics say?                                  │
│  • What's the worst-case outcome?                                │
│  OUTPUT: User defends or refines decision, stronger conviction   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    [Proceed to Phase 1: Questions]
```

---

### Phase A: Question Why (Rationale Extraction)

**Purpose**: Force user to articulate reasoning and surface hidden assumptions.

**Template**:
```markdown
### Assumption Challenge - Phase A: Question Why

You've indicated **[user's decision/direction]**. Before I proceed, I want to ensure we're building on solid foundations.

**1. Problem Definition**
What specific problem are you trying to solve?
- What's broken/missing today?
- Who is affected and how severely?

**2. Approach Rationale**
Why this approach specifically?
- What led you to this direction?
- What alternatives did you consider and reject?

**3. Embedded Assumptions**
I've identified these assumptions in your request:
- Assumption 1: [Claude identifies]
- Assumption 2: [Claude identifies]
- Assumption 3: [Claude identifies]

Are these accurate? Any I've missed?

**4. Supporting Evidence**
What evidence supports this approach?
- Personal experience / past projects?
- Research / data?
- Expert recommendations?
- Gut feeling (that's valid too, just making it explicit)?

Please share your thinking so I can provide the best possible output.
```

**When to Apply**: Always (every intensity level includes Phase A)

---

### Phase B: Propose Alternatives

**Purpose**: Ensure user makes a conscious choice, not a default one.

**Template**:
```markdown
### Assumption Challenge - Phase B: Alternatives

Based on your goal of **[stated goal]**, here are approaches to consider:

| Approach | Description | Strengths | Weaknesses | Best When |
|----------|-------------|-----------|------------|-----------|
| **A: [Current]** | [What user proposed] | [List 2-3] | [List 2-3] | [Context] |
| **B: [Alternative]** | [Different approach] | [List 2-3] | [List 2-3] | [Context] |
| **C: [Alternative]** | [Different approach] | [List 2-3] | [List 2-3] | [Context] |

**My Assessment**:
- If your priority is [X], Approach [Y] is strongest because...
- If your constraint is [Z], Approach [W] handles it better...

Which approach best fits your context? Or would you like to explore a hybrid combining elements of multiple approaches?
```

**When to Apply**: Medium and Full intensity levels

**How to Generate Alternatives**:
1. Consider opposite extremes (simple vs. complex, fast vs. thorough)
2. Look at different starting points (user-first vs. tech-first, MVP vs. complete)
3. Question scope (broader vs. narrower focus)
4. Consider different audiences (if applicable)
5. Draw from industry patterns and best practices

---

### Phase C: Devil's Advocate (Stress Test)

**Purpose**: Actively argue against the chosen approach to surface weak points.

**Template**:
```markdown
### Assumption Challenge - Phase C: Stress Test

You've chosen **[approach]**. Before we proceed, let me play devil's advocate:

**Potential Failure Modes:**
1. **[Risk 1]**: What happens if [scenario]? How does this approach handle it?
2. **[Risk 2]**: Have you considered [constraint/limitation]?
3. **[Risk 3]**: What if [assumption] turns out to be wrong?

**Devil's Advocate Questions:**
- Why might this approach fail?
- What would someone who disagrees with you say?
- What's the worst-case scenario, and can you live with it?
- What would need to be true for this to succeed?

**Edge Cases:**
- [Edge case 1]: How does your approach handle this?
- [Edge case 2]: Is this in scope or explicitly out?

---

**Proceed?**
If you're confident after considering these challenges, say "proceed" and we'll move forward.
If any of these raised concerns, let's discuss adjustments before continuing.
```

**When to Apply**: Full intensity level only

**Tone Guidance**:
- Be challenging but not combative
- Remain collaborative - you're on the user's side
- Frame as "helping you think through" not "proving you wrong"
- Accept when user has good answers - don't challenge indefinitely

---

## Challenge Intensity Levels

**Different documents require different challenge depths:**

| Document Type | Intensity | Phases Applied | Rationale |
|--------------|-----------|----------------|-----------|
| Vision Documents | Full | A + B + C | Foundational decisions, high downstream impact |
| PRDs | Full | A + B + C | Feature scope affects entire product |
| Architecture Decisions | Full | A + B + C | Hard to reverse, affects whole system |
| Product Scope (MoSCoW) | Full | A + B + C | Prioritization shapes what gets built |
| Epic Overview | Medium | A + B | Moderate scope, affects feature grouping |
| Epic PRDs | Medium | A + B | Feature boundaries matter |
| Story Generation | Light | A only | Lower stakes, faster iteration needed |
| Specs/Tasks | Light | A only | Implementation details, easily revised |
| UX Pattern Selection | Medium | A + B | Affects user experience consistency |

---

## Skill-Specific Integration

### Pipeline Generators

| Skill | Challenge Trigger | Phase A Focus | Phase B Focus |
|-------|-------------------|---------------|---------------|
| EXPERT-20 (Vision) | Problem statement provided | Problem framing, market assumptions | Alternative market positions |
| EXPERT-21 (PRD) | MVP scope defined | Feature inclusion logic | Different MVP scopes |
| EXPERT-22 (Epic) | Epic structure validated | Grouping rationale | Alternative epic structures |
| EXPERT-23 (Epic PRD) | Feature scope specified | Feature boundary decisions | Different feature scopes |
| EXPERT-13 (Story) | Priority assignments made | MoSCoW rationale | N/A (Light intensity) |
| EXPERT-14 (Spec) | Architecture selected | Technology choices | Alternative architectures |

### Decision Makers

| Skill | Challenge Trigger | Phase A Focus | Phase B/C Focus |
|-------|-------------------|---------------|-----------------|
| EXPERT-03 (Architect) | ADR created | Pattern selection rationale | Alternative patterns, failure modes |
| EXPERT-10 (PM) | Scope decision made | Prioritization logic | Different scope boundaries |
| EXPERT-11 (UX) | Design pattern chosen | User flow assumptions | Alternative patterns |

---

## Escape Hatch

**Users can bypass challenges when appropriate:**

**Explicit Bypass Phrases**:
- "Skip challenge - proceed with [approach]"
- "I've considered alternatives - continue"
- "Fast mode - no challenges needed"
- "Trust my judgment on this one"

**Implicit Bypass Conditions**:
- Same decision was challenged in a prior session (and user confirmed)
- Simple update/revision to existing document
- User explicitly provided rationale upfront ("I'm doing X because Y")
- Time-critical urgent request (user indicates urgency)

**Bypass Acknowledgment**:
When user bypasses, Claude should acknowledge:
```
"Understood - proceeding with [approach] without full challenge cycle.
If you'd like me to challenge assumptions later, just ask."
```

---

## Anti-Patterns

### DO NOT

1. **Challenge every minor decision**
   - Simple formatting choices don't need devil's advocate
   - Routine updates don't need full challenge cycle
   - Use intensity levels appropriately

2. **Be adversarial or condescending**
   - Frame as collaborative exploration, not interrogation
   - "Let's think through this together" not "You're probably wrong"

3. **Repeat challenges already addressed**
   - If user explained rationale for X, don't re-challenge X
   - Track what's been discussed in the session

4. **Block progress indefinitely**
   - One round of challenges per decision
   - Accept user's final answer after stress-test
   - Don't demand "perfect" justification

5. **Challenge when user explicitly opted out**
   - Respect bypass phrases
   - Don't sneak challenges in after user said "proceed"

6. **Generate fake alternatives**
   - Alternatives must be genuinely viable
   - Don't propose obviously inferior options just to have 3

7. **Ignore context clues about urgency**
   - "Quick question about..." doesn't need full challenge
   - Read the room

---

## Integration with Other Core Skills

| Skill | Integration |
|-------|-------------|
| CORE-01 (Placeholder Guardian) | Challenge estimates before requesting human input |
| CORE-02 (Research-First) | Research informs challenge questions; challenge precedes research synthesis |

---

## Success Criteria

**Process Quality**:
- [ ] User articulates reasoning they hadn't explicitly stated before
- [ ] User considers alternatives they hadn't thought of
- [ ] User's final decision is stronger/more confident
- [ ] Challenge cycle completes in reasonable time (not blocking)

**Output Quality**:
- [ ] Documents reflect deliberate choices, not defaults
- [ ] Assumptions are explicit, not hidden
- [ ] Edge cases acknowledged upfront
- [ ] Fewer revisions needed downstream

**User Experience**:
- [ ] User feels challenged, not attacked
- [ ] User learns something through the challenge process
- [ ] User can bypass when appropriate
- [ ] Process adds value, not just friction

---

## Troubleshooting

**Issue**: User finds challenges annoying/slow
**Solution**: Respect bypass phrases, use appropriate intensity level, be concise

**Issue**: Challenges feel generic/unhelpful
**Solution**: Ground challenges in specific details from user's request, not generic templates

**Issue**: User always bypasses challenges
**Solution**: Make challenges more relevant; if consistently bypassed, ask user if they'd like to adjust the intensity

**Issue**: Claude challenges same thing repeatedly
**Solution**: Track challenged topics in session; don't re-challenge confirmed decisions

---

*Skill CORE-03 v1.0 | Xyric Solutions | 2025-12-10*
*3-Phase Assumption Challenge Framework for Higher-Quality Outputs*
