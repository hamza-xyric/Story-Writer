# CORE-06: Prompt Crafter

**Skill ID**: CORE-06
**Category**: Core Infrastructure
**Priority**: Critical
**Version**: 1.0
**Last Updated**: 2025-12-12

---

## Purpose

Transforms rough brainstorming thoughts into high-quality, well-structured prompts through an interactive refinement process. Works hand-in-hand with the user to extract their unique ideas, apply proven prompt structures, and produce prompts that yield better AI outputs. Integrates Xyric methodologies for professional, actionable results.

---

## When to Activate

**Triggers**:
- "Help me write a better prompt for..."
- "I have an idea but need to structure it better"
- "Can you help me refine this prompt?"
- "I want to brainstorm with you and create a prompt"
- "Turn this rough idea into a good prompt"
- User presents a vague or unstructured request

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| CORE-02 | Research-First workflow for complex prompts |
| CORE-03 | Challenge assumptions in prompt requirements |
| EXPERT-20/21/22 | Vision/PRD/Epic generation prompt patterns |
| MKT-02 | Brand voice integration for content prompts |

---

## The Prompt Crafter Philosophy

### Core Principle

> **"The best AI output comes from structure (how to organize) + perspective (your unique ideas). Both must be present."**

### Why Most Prompts Fail

| Problem | Example | Root Cause |
|---------|---------|------------|
| **No context** | "Write me a presentation" | AI doesn't know your experience or standards |
| **No definition of quality** | "Make it good" | AI was trained by people with differing opinions |
| **No perspective** | "Write about AI trends" | Output will be generic, not yours |
| **Too vague** | "Help me with marketing" | AI has no constraints to work within |
| **Dumping everything** | 2000-word prompt | No structure, AI gets lost |

### The Two Pillars

Every effective prompt needs both:

```
EFFECTIVE PROMPT
├── STRUCTURE (The Framework)
│   ├── What format should the output take?
│   ├── What sections/components are needed?
│   ├── What quality standards apply?
│   └── What constraints exist?
│
└── PERSPECTIVE (The Uniqueness)
    ├── What is YOUR experience/viewpoint?
    ├── What makes this different from generic?
    ├── What specific context matters?
    └── What outcome do YOU need?
```

---

## Interactive Refinement Workflow

### Phase 1: Understand the Goal

When user presents a rough idea:

1. **Acknowledge the seed idea**
2. **Identify the output type** (content, code, analysis, strategy, etc.)
3. **Ask clarifying questions** about the goal

**Questions to ask**:
- "What's the end use of this output?"
- "Who will consume this?"
- "What would 'great' look like for you?"

---

### Phase 2: Extract Structure Requirements

Help user define the framework:

| Question | Purpose |
|----------|---------|
| "What format do you need?" | Document, code, list, script, etc. |
| "Are there sections this needs?" | Structure the output |
| "What's the ideal length/depth?" | Scope the response |
| "Any existing standards to follow?" | Xyric templates, company style, etc. |

**For Xyric-aligned outputs**, automatically suggest:
- Vision Document template for product ideas
- PRD structure for feature requests
- Epic/Story format for development work
- Brand Voice (MKT-02) for content

---

### Phase 3: Extract Perspective (The 5 Questions)

This is the critical differentiation step. Ask 5 targeted questions to extract the user's unique perspective:

**The 5 Extraction Questions**:

1. **The Why Question**
   > "Why does this matter to you specifically? What's at stake?"

2. **The Experience Question**
   > "What have you seen/learned that informs this? Any patterns or insights?"

3. **The Audience Question**
   > "Who needs this and what do they already know/not know?"

4. **The Differentiation Question**
   > "What would make this stand out from generic AI output?"

5. **The Success Question**
   > "If this works perfectly, what happens? What decision or action follows?"

**Question Guidelines**:
- Ask one at a time (don't overwhelm)
- Listen for themes and insights
- Probe deeper when answers reveal interesting angles
- Skip questions that don't apply to the task

---

### Phase 4: Synthesize the Prompt

Combine structure + perspective into a refined prompt:

**Prompt Assembly Pattern**:

```markdown
## Context
[User's unique perspective and background]

## Task
[Clear, specific task statement]

## Requirements
[Structure, format, constraints]

## Quality Criteria
[What makes this "good" for this user]

## Output Format
[Exact format needed]
```

---

### Phase 5: Validate & Iterate

Before finalizing:

1. **Read back the assembled prompt** to user
2. **Confirm it captures their intent**
3. **Offer to adjust** specific sections
4. **Test if needed** - run the prompt and refine based on output

---

## Xyric Methodology Integration

### Research-First Principle

For prompts that require external knowledge:
- Flag when research should precede generation
- Suggest web search or document review first
- Ensure prompt doesn't ask AI to invent facts

### Quality Gates

Apply Xyric standards to prompt outputs:

| Output Type | Quality Standard |
|-------------|-----------------|
| Code prompts | Include TDD requirements, CLEAR review criteria |
| Documentation | Reference Xyric doc templates |
| Content | Apply MKT-02 brand voice |
| Strategy | Require evidence, not assumptions |
| Client-facing | Partner voice, not vendor voice |

### The Xyric Way Embedded

Prompts generated should naturally include:
- **Placeholder Guardian** - Never ask AI to invent numbers/dates
- **Foundation + Build** - Use existing patterns, customize on top
- **AI-Native with Quality Gates** - AI generates, humans validate

---

## Prompt Patterns Library

### Pattern 1: Expert Persona

```markdown
You are a [specific expert role] with deep experience in [domain].

Context: [situation]
Task: [specific task]
Constraints: [limitations]

Think step by step about [specific consideration] before responding.
```

**When to use**: Technical tasks, specialized knowledge

---

### Pattern 2: Few-Shot Examples

```markdown
I need [output type]. Here are examples of what good looks like:

Example 1:
[Input] → [Output]

Example 2:
[Input] → [Output]

Now create one for: [user's actual input]
```

**When to use**: When quality is hard to describe but easy to show

---

### Pattern 3: Chain of Thought

```markdown
[Task description]

Before providing your answer:
1. Identify the key considerations
2. List possible approaches
3. Evaluate trade-offs
4. Select the best approach
5. Then provide your detailed response
```

**When to use**: Complex reasoning, multi-factor decisions

---

### Pattern 4: Constraint-First

```markdown
Create [output] that:
- MUST: [non-negotiable requirements]
- SHOULD: [preferred but flexible]
- MUST NOT: [explicit anti-patterns]

Context: [background]
```

**When to use**: When clarity on boundaries matters most

---

### Pattern 5: Iterative Refinement

```markdown
Create a [first draft] of [output].

After your first version, review it against these criteria:
- [criterion 1]
- [criterion 2]

Then provide an improved second version.
```

**When to use**: When quality requires self-reflection

---

## Anti-Patterns: What NOT to Do

### The Vague Prompt
```
❌ "Help me with marketing"
✅ "Create 3 LinkedIn posts about [topic] for [audience] that establish [specific positioning]"
```

### The Novel Prompt
```
❌ [2000 words of context dumped at once]
✅ [Structured sections with clear purpose for each]
```

### The Assumption Prompt
```
❌ "Write about why AI is the future" (assumes the conclusion)
✅ "Analyze the current state of enterprise AI adoption and identify key trends"
```

### The Generic Prompt
```
❌ "Write a blog post about data analytics"
✅ "Write a blog post for mid-market CFOs about why BI projects fail,
   drawing on the 'Questions Before Dashboards' methodology"
```

### The Lazy Delegation
```
❌ "Make it good"
✅ "Ensure the output has [specific qualities], avoids [specific anti-patterns],
   and would be appropriate for [specific audience]"
```

---

## Output: The Refined Prompt

After the interactive process, deliver:

```markdown
## Your Refined Prompt

[The assembled, ready-to-use prompt]

---

## Why This Works

- **Context**: [How we captured your perspective]
- **Structure**: [The framework applied]
- **Quality Criteria**: [How "good" is defined]

## Suggested Modifications

- To make it [more/less specific]: [change]
- To adjust for [different audience]: [change]
- To add [capability]: [change]
```

---

## Quick Mode (Skip Questions)

For users who want to skip the interactive process:

**Minimum Required Inputs**:
1. What output do you need?
2. Who is it for?
3. What makes it good?

**Then generate** using best-fit pattern from library.

---

## Success Metrics

### Prompt Quality Indicators
- [ ] Clear task definition (AI knows what to do)
- [ ] Explicit quality criteria (AI knows what "good" means)
- [ ] User's perspective embedded (output won't be generic)
- [ ] Appropriate constraints (bounded scope)
- [ ] Right pattern applied (matches task type)

### Outcome Indicators
- Output requires minimal revision
- User doesn't need to re-prompt multiple times
- Result is distinctly "theirs" not generic AI
- Action/decision follows from output

---

## Examples

### Example 1: Rough Idea → Refined Prompt

**User says**: "I need help writing something about our data services"

**After interactive refinement**:

```markdown
You are a B2B content strategist writing for Xyric Solutions.

Create a LinkedIn thought leadership post about the "Questions Before
Dashboards" methodology. Target audience: Mid-market CFOs and data
leaders who have invested in BI tools but aren't seeing ROI.

Key messages to include:
- Most dashboards go unused because they answer the wrong questions
- The fix is methodology, not more technology
- Start with "What decision will you make differently?" not "What data do we have?"

Voice: Insightful + Practical + Confident. Company voice ("we" not "I").
Length: 800-1200 characters
Structure: Hook → Problem → Insight → Implication

Do NOT:
- Use engagement bait ("Drop a heart if you agree!")
- Claim to be "premium" or "leading"
- Use buzzwords without substance
- Sound desperate for business
```

---

### Example 2: Code Request → Refined Prompt

**User says**: "I need to build an API endpoint"

**After interactive refinement**:

```markdown
You are a Senior Backend Engineer following Google engineering practices
and Xyric development standards.

Task: Create a REST API endpoint for [specific resource]

Requirements:
- MUST: Follow RESTful conventions
- MUST: Include input validation
- MUST: Return appropriate HTTP status codes
- MUST: Include error handling
- SHOULD: Be idiomatic for [framework]
- MUST NOT: Include hardcoded secrets

Context:
- This is part of [larger system]
- Consumers are [frontend/other service]
- Expected load: [scale]

Output:
1. The endpoint code
2. Corresponding unit tests (TDD style)
3. Brief explanation of design decisions

Review the code against CLEAR criteria (Correctness, Logic, Efficiency,
Architecture, Readability) before finalizing.
```

---

## Maintenance

### When to Update This Skill
- New prompt patterns discovered
- Xyric methodology changes
- User feedback on refinement process
- New output types needed

### Pattern Library Growth
Add new patterns when:
- A pattern works well 3+ times
- It solves a distinct use case
- It can be generalized

---

*Skill CORE-06 v1.0 | Xyric Solutions | 2025-12-12 | Transform Rough Ideas into Powerful Prompts*
