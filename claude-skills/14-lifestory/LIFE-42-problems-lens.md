# LIFE-42: Problems Lens

**Skill ID**: LIFE-42
**Category**: Domain Lens
**Priority**: Standard
**Version**: 1.0
**Last Updated**: 2024-12-27

---

## Purpose

Detect problem-solving or challenge-related content in entries and journals, then contribute domain-specific questions that help process difficulties constructively—understanding the problem, exploring solutions, and finding meaning in the struggle.

---

## When to Activate

**Triggered by**: LIFE-01 (Entry Processor) during domain detection phase

**Detection signals** (case-insensitive):

Keywords:
- problem, problems
- issue, issues
- struggling, struggle
- stuck, blocked
- frustrated, frustration, frustrating
- trying to solve, figure out, work out
- challenge, challenges, challenging
- difficulty, difficult
- obstacle, obstacles
- can't seem to, unable to
- stressed, stress, stressing
- worried, worry, worrying
- overwhelmed

Phrases:
- "I don't know how to..."
- "I can't figure out..."
- "having trouble with..."
- "dealing with..."
- "up against..."
- "facing a..."
- "don't know what to do about..."

---

## Processing Workflow

### Phase 1: Confirm Detection

Verify problem content is substantial:
- Not just a minor inconvenience
- Actual challenge being processed
- Enough context to warrant exploration

If trivial or passing mention, do not add domain tag.

### Phase 2: Analyze Problem Content

Identify what's present in the description:
- **Problem type**: Technical, interpersonal, internal, external
- **Emotional state**: Frustrated, worried, overwhelmed, stuck
- **Progress**: What's been tried, what hasn't
- **Stakes**: How important/urgent is this
- **Resources**: What support exists or is missing
- **Resolution vision**: Is there a clear goal?

### Phase 3: Select Questions

From the question bank, select 2-3 most relevant questions based on content.

**Question Bank:**

| Category | Questions |
|----------|-----------|
| Understanding | What's the core issue at its simplest? |
| Understanding | When did this become a problem? |
| Understanding | What makes this particularly challenging right now? |
| Progress | What have you tried so far? |
| Progress | What worked, even partially? |
| Progress | What definitely didn't work? |
| Blockers | What's blocking you? |
| Blockers | Is it a knowledge gap, resource constraint, or something else? |
| Blockers | Are there dependencies you're waiting on? |
| Support | Who could help with this? |
| Support | What resources might you be missing? |
| Support | Is there someone who's solved similar problems? |
| Resolution | What would "solved" look like? |
| Resolution | Is there a partial solution that would be good enough? |
| Resolution | What's the minimum viable resolution? |
| Priority | Is this urgent or important (or both)? |
| Priority | What happens if you don't solve this? |
| Priority | Should this be your focus right now? |
| Patterns | Have you faced similar problems before? |
| Patterns | What worked in those situations? |
| Patterns | Is there a pattern in the kinds of problems you face? |
| Reframing | Is there another way to look at this situation? |
| Reframing | Could this problem be an opportunity in disguise? |
| Reframing | What might you learn from this challenge? |

**Selection criteria:**
- If feeling stuck → include Understanding or Blocker question
- If frustrated/overwhelmed → include Reframing question
- If mentioned attempts → include Progress question
- If unclear goals → include Resolution question
- If recurring issue → include Patterns question

### Phase 4: Return Questions

Return selected questions to LIFE-01 for merging into "Questions to Explore".

Format:
```yaml
lens: problems
questions:
  - "What's blocking you right now?"
  - "What would 'solved' look like?"
  - "Who could help with this?"
```

---

## Output Integration

Questions are added to entry under "Questions to Explore" with domain context:

```markdown
### Questions to Explore

**About this challenge:**
- What's blocking you right now?
- What would "solved" look like?
- Who could help with this?
```

---

## Entry Metadata

When this lens matches, add to entry frontmatter:

```yaml
domains:
  - problems
```

---

## Examples

### Example 1: Stuck on a Project

**Input:**
> "Can't figure out how to structure this new feature. Been staring at it for two days. Every approach I try hits a wall."

**Analysis:**
- Problem type: Technical
- Emotional state: Stuck, frustrated
- Progress: Multiple attempts, no success
- Duration: Two days (building frustration)

**Selected Questions:**
1. "What specifically hits a wall with each approach?"
2. "Is there someone who's solved similar architecture problems?"
3. "What would a 'good enough' solution look like?"

### Example 2: Interpersonal Difficulty

**Input:**
> "Having trouble with my manager. She keeps changing priorities and I don't know how to push back without seeming difficult."

**Analysis:**
- Problem type: Interpersonal/work
- Emotional state: Uncertain, conflicted
- Constraint: Political sensitivity

**Selected Questions:**
1. "What would the ideal relationship with your manager look like?"
2. "Have you faced similar situations before? What worked?"
3. "Is there another way to frame 'pushing back'?"

### Example 3: Overwhelm

**Input:**
> "Everything is piling up. Work deadline Friday, need to deal with the apartment situation, and I haven't even looked at taxes. Don't know where to start."

**Analysis:**
- Problem type: Multiple/overwhelm
- Emotional state: Overwhelmed
- Need: Prioritization help

**Selected Questions:**
1. "Which of these is most urgent vs most important?"
2. "What happens if you let one of these slide?"
3. "What's the smallest step you could take right now?"

### Example 4: False Positive (Skip)

**Input:**
> "The problem with pizza in this city is that there's too much good pizza."

**Analysis:**
- Not a real problem/challenge
- Humorous/casual mention

**Action:** Do not activate lens, do not add domain tag.

---

## Anti-Patterns

**Do NOT:**
- Add all questions from the bank (select 2-3 max)
- Try to solve the problem for them
- Minimize the difficulty they're facing
- Push them to "just do it" or be more positive
- Make them feel worse about being stuck

**DO:**
- Validate that problems are genuinely hard
- Help them see the problem more clearly
- Invite exploration of resources and patterns
- Trust they can find their own solutions
- Respect if they just need to vent

---

## Philosophy

Problems are part of life, not failures of planning. Sometimes people need solutions, sometimes they need clarity, sometimes they just need to process. This lens creates space for all three. The goal isn't to fix—it's to explore.

---

*Skill LIFE-42 v1.0 | Domain Lens System | 2024-12-27*
