# LIFE-40: Dreams Lens

**Skill ID**: LIFE-40
**Category**: Domain Lens
**Priority**: Standard
**Version**: 1.0
**Last Updated**: 2024-12-27

---

## Purpose

Detect dream-related content in entries and journals, then contribute domain-specific questions that help explore the dream's meaning, emotional content, and connections to waking life.

---

## When to Activate

**Triggered by**: LIFE-01 (Entry Processor) during domain detection phase

**Detection signals** (case-insensitive):

Keywords:
- dream, dreamt, dreaming, dreamed
- nightmare, night terror
- sleep, sleeping, slept, woke up, waking
- vision (in sleep context)

Phrases:
- "last night I..."
- "I had a dream"
- "weird dream"
- "kept dreaming"

---

## Processing Workflow

### Phase 1: Confirm Detection

Verify dream content is substantial:
- Not just a passing mention ("like a dream come true")
- Actual dream/sleep experience being described
- Enough content to warrant exploration

If false positive, do not add domain tag.

### Phase 2: Analyze Dream Content

Identify what's present in the dream description:
- **People**: Who appeared? Known or unknown?
- **Places**: Where did it occur? Familiar or strange?
- **Events**: What happened? Narrative or abstract?
- **Emotions**: What feelings were present?
- **Sensory details**: Visual, auditory, physical sensations
- **Symbols**: Any recurring or notable imagery

### Phase 3: Select Questions

From the question bank, select 2-3 most relevant questions based on what's in the content.

**Question Bank:**

| Category | Questions |
|----------|-----------|
| Emotional | What emotions did you feel during the dream? |
| Emotional | How did you feel when you woke up? |
| Emotional | Did the dream leave any lingering feelings? |
| Connection | Does this connect to anything in your waking life right now? |
| Connection | Is there a situation you've been processing? |
| Connection | Did the dream feel like it was working something out? |
| Pattern | Have you had similar dreams before? |
| Pattern | Are there recurring elements (people, places, situations)? |
| Pattern | Do you notice patterns in when these dreams occur? |
| Sensory | What stood out most vividly? |
| Sensory | What did the environment look/feel like? |
| People | Was anyone you know in the dream? How did they appear? |
| People | Were there strangers who felt significant? |
| Meaning | What do you think your mind was processing? |
| Meaning | If the dream were a message, what might it be saying? |

**Selection criteria:**
- If people mentioned → include People question
- If strong emotions → include Emotional question
- If vivid imagery → include Sensory question
- If seems connected to current events → include Connection question
- Always include at least one Meaning question

### Phase 4: Return Questions

Return selected questions to LIFE-01 for merging into "Questions to Explore".

Format:
```yaml
lens: dreams
questions:
  - "What emotions did you feel during the dream?"
  - "Does this connect to anything in your waking life right now?"
  - "What do you think your mind was processing?"
```

---

## Output Integration

Questions are added to entry under "Questions to Explore" with domain context:

```markdown
### Questions to Explore

**From your dream:**
- What emotions did you feel during the dream?
- Does this connect to anything in your waking life right now?
- What do you think your mind was processing?
```

---

## Entry Metadata

When this lens matches, add to entry frontmatter:

```yaml
domains:
  - dreams
```

---

## Examples

### Example 1: Simple Dream

**Input:**
> "Had a weird dream last night where I was back in my old school but all the hallways were underwater."

**Analysis:**
- Location: old school (familiar place, transformed)
- Imagery: underwater (notable symbol)
- Mood: weird (unusual, possibly unsettling)

**Selected Questions:**
1. "What stood out most vividly about being underwater?"
2. "Does this connect to anything happening in your life right now?"
3. "What do you think your mind was processing?"

### Example 2: Dream with People

**Input:**
> "I dreamt about my grandfather last night. He was sitting in his old chair, not saying anything, just smiling. Woke up feeling really emotional."

**Analysis:**
- Person: grandfather (significant relationship)
- Emotion: strong emotional response on waking
- Imagery: specific scene (chair, smile)

**Selected Questions:**
1. "How did you feel when you woke up?"
2. "Was there something about how he appeared that felt different from real life?"
3. "Have you been thinking about him lately?"

### Example 3: False Positive (Skip)

**Input:**
> "Landing that client was like a dream come true. Best day this quarter."

**Analysis:**
- "Dream" used metaphorically, not describing actual dream
- No sleep/dream content present

**Action:** Do not activate lens, do not add domain tag.

---

## Anti-Patterns

**Do NOT:**
- Add all questions from the bank (select 2-3 max)
- Interpret the dream for the user
- Suggest what symbols "mean"
- Make the user feel their dream needs analysis
- Treat every mention of "dream" as literal

**DO:**
- Select contextually relevant questions
- Invite exploration without pressure
- Trust the user to find their own meaning
- Respect if they just wanted to record it

---

## Philosophy

Dreams are personal territories. This lens doesn't interpret—it invites the user to explore if they want to. Some dreams are just dreams. Some carry meaning. The user decides.

---

*Skill LIFE-40 v1.0 | Domain Lens System | 2024-12-27*
