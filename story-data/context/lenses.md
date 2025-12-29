# Domain Lenses

Central configuration for domain-specific lenses that enhance journal and entry processing.

**Last Updated**: 2024-12-27

---

## Overview

Lenses are specialized perspectives that automatically detect domain-specific content and contribute relevant questions during capture and processing. When an entry contains multiple domains, all applicable lenses contribute questions.

---

## Active Lenses

| Lens | Skill ID | Status |
|------|----------|--------|
| Dreams | LIFE-40 | Active |
| Trading | LIFE-41 | Active |
| Problems | LIFE-42 | Active |

---

## Lens: Dreams

**Skill**: LIFE-40
**Purpose**: Explore dream content for meaning, patterns, and emotional processing

### Detection Signals

Keywords (case-insensitive):
- dream, dreamt, dreaming, dreamed
- nightmare, night terror
- sleep, sleeping, slept, woke up, waking
- vision (in sleep context)

Phrases:
- "last night I..."
- "I had a dream"
- "weird dream"
- "kept dreaming"

### Question Bank

**Emotional exploration:**
- What emotions did you feel during the dream?
- How did you feel when you woke up?
- Did the dream leave any lingering feelings?

**Connection to waking life:**
- Does this connect to anything happening in your waking life right now?
- Is there a situation you've been thinking about that might relate?
- Did the dream feel like it was processing something?

**Pattern recognition:**
- Have you had similar dreams before?
- Are there recurring elements (people, places, situations)?
- Do you notice any patterns in when these dreams occur?

**Sensory details:**
- What stood out most vividly?
- What did the environment look/feel like?
- Were there any unusual details that stuck with you?

**People and relationships:**
- Was anyone you know in the dream?
- How did they appear or behave differently than in real life?
- Were there strangers who felt significant?

**Meaning exploration:**
- What do you think your mind was processing?
- If the dream were a message, what might it be saying?
- Does any part of it feel symbolic to you?

---

## Lens: Trading

**Skill**: LIFE-41
**Purpose**: Explore trading experiences for emotional patterns, decision-making, and lessons

### Detection Signals

Keywords (case-insensitive):
- trade, trading, traded, trader
- market, markets
- position, positions
- profit, loss, P&L, PnL
- entry, exit, stop loss, stop-loss, take profit
- chart, charts, candle, candles
- stock, stocks, ticker
- options, calls, puts
- futures, forex, crypto
- long, short, buy, sell
- win, loss, green, red

Phrases:
- "took a trade"
- "entered a position"
- "got stopped out"
- "hit my target"
- "blew up"
- "made money" / "lost money"

### Question Bank

**Pre-trade state:**
- What was your emotional state before entering?
- Were you following your plan or reacting to the market?
- Was this a planned trade or impulsive?

**During the trade:**
- How did you feel while in the position?
- Did you stick to your rules or adjust on the fly?
- What was going through your mind?

**Post-trade reflection:**
- How did you feel after the outcome?
- What would you do differently?
- What lesson can you take from this?

**Pattern awareness:**
- Is this similar to trades you've made before?
- Do you notice any emotional patterns in your trading?
- Are there conditions where you trade better or worse?

**Rules and discipline:**
- Did you follow your trading rules?
- If not, what made you deviate?
- How can you reinforce discipline next time?

**Bigger picture:**
- How does this trade fit into your overall journey?
- What does this experience teach you about yourself?
- Is trading serving your larger goals?

---

## Lens: Problems

**Skill**: LIFE-42
**Purpose**: Process challenges, obstacles, and difficult situations constructively

### Detection Signals

Keywords (case-insensitive):
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

### Question Bank

**Understanding the problem:**
- What's the core issue at its simplest?
- When did this become a problem?
- What makes this particularly challenging right now?

**Progress so far:**
- What have you tried so far?
- What worked, even partially?
- What definitely didn't work?

**Blockers:**
- What's blocking you?
- Is it a knowledge gap, resource constraint, or something else?
- Are there dependencies you're waiting on?

**Support and resources:**
- Who could help with this?
- What resources might you be missing?
- Is there someone who's solved similar problems?

**Resolution vision:**
- What would "solved" look like?
- Is there a partial solution that would be good enough?
- What's the minimum viable resolution?

**Prioritization:**
- Is this urgent or important (or both)?
- What happens if you don't solve this?
- Should this be your focus right now?

**Patterns:**
- Have you faced similar problems before?
- What worked in those situations?
- Is there a pattern in the kinds of problems you face?

**Reframing:**
- Is there another way to look at this situation?
- Could this problem be an opportunity in disguise?
- What might you learn from this challenge?

---

## Adding New Lenses

To add a new lens:

1. Create skill file: `claude-skills/14-lifestory/LIFE-XX-[name]-lens.md`
2. Add lens definition to this file
3. Update LIFE-01 to include new lens in domain detection
4. Update README.md skill reference

### Lens Template

```markdown
## Lens: [Name]

**Skill**: LIFE-XX
**Purpose**: [One sentence description]

### Detection Signals

Keywords (case-insensitive):
- [word1], [word2]
- [word3], [word4]

Phrases:
- "[phrase1]"
- "[phrase2]"

### Question Bank

**[Category 1]:**
- [Question]
- [Question]

**[Category 2]:**
- [Question]
- [Question]
```

---

## How Lenses Work

### Detection Flow

```
Entry/Journal content received
         ↓
LIFE-01 scans for detection signals
         ↓
Matching domains identified: [dreams, trading, problems]
         ↓
Entry metadata updated: domains: [dreams, trading]
         ↓
For each domain, select 2-3 relevant questions from bank
         ↓
Questions merged into "Questions to Explore"
```

### Multi-Domain Handling

When multiple lenses match:
- All matched domains added to `domains: []` in metadata
- Each lens contributes 2-3 questions (not full bank)
- Questions are contextually selected based on content
- Questions grouped by domain in output

### Question Selection

Don't dump all questions. Select based on:
- Relevance to specific content mentioned
- What the user hasn't explored yet
- Balance between different question categories
- 2-3 questions per domain maximum

---

## Philosophy

- **Enhance, don't interrogate**: Questions should invite exploration, not feel like homework
- **Contextual relevance**: Select questions that relate to what was actually shared
- **Cross-pollination**: Sometimes dreams relate to trading; let connections emerge
- **Growth over time**: As more entries accumulate, patterns become visible
- **User agency**: Questions are invitations, not requirements

---

*Domain Lens System v1.0 | Life Story System | 2024-12-27*
