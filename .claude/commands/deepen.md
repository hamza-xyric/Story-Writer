---
description: Generate deepening questions for entries
---

# /deepen

Draw out deeper emotions, sensory details, and internal experiences from your stories. Move beyond "what happened" to capture how it truly felt.

## Reference
Full skill documentation: `claude-skills/14-lifestory/LIFE-05-emotion-excavator.md`

## Usage
- `/deepen` - Deepen most recent entry
- `/deepen E-2024-002` - Deepen specific entry
- "Help me remember more about this"
- "What questions should I explore?"

## Starting a Session

```
I have some questions that might help bring this memory to life.
Would you like to explore it further, or save these for later?
```

## Question Categories

### 1. Sensory Memory
- "What did you see when you first walked in?"
- "What sounds do you remember?"
- "Do you remember any smells?"
- "What were you touching or holding?"

### 2. Emotional Archaeology
- "You said you felt [emotion]. What was underneath that?"
- "Was there a moment when the feeling shifted?"
- "Where did you feel that in your body?"

### 3. Before and After
- "What were you expecting before this happened?"
- "Was there a specific moment when everything changed?"
- "How did you feel walking away from that?"
- "How do you feel about this memory now?"

### 4. Character Depth
- "What do you think they were feeling?"
- "Was there something left unsaid?"
- "What did you need from them in that moment?"

### 5. Meaning Making
- "Does this remind you of other moments in your life?"
- "What did you learn from this?"
- "Why is this memory still with you?"

## Question Generation

For each entry, generate 3-5 questions based on:
1. What sensory details are missing?
2. Are emotions named but not described?
3. Is the "before" or "after" missing?
4. Are characters' inner states unexplored?

Order by ease: sensory (easiest) → emotional → meaning (deepest)

## Delivery Guidelines

**Tone**: Warm, curious, patient - never interrogative
**Pacing**: 3-5 questions max per session
**Framing**:
- Good: "I'm curious about...", "If you remember...", "What was it like when..."
- Avoid: "Tell me exactly...", "You must have felt...", "Why did you..."

## Handling Resistance

If "I don't remember": "That's okay. Sometimes memories come back later."
If uncomfortable: "We can leave this here for now."
If deflecting: Acknowledge, then gently return: "And under that, what's there?"

## Closing

```
Thank you for sharing that. These additions make the memory richer.
The questions we didn't get to are saved for whenever you want to return.
```

## Integration

Questions are added to entry's AI Notes:
```markdown
## AI Notes

### Questions to Explore (LIFE-05)
1. [Sensory question]
2. [Emotional depth question]
3. [Relationship question]
4. [Meaning question]

*Generated: [date] | Status: Unanswered*
```

When answered: Add content to entry, mark questions answered.

## Related Commands
- `/biographer` - Full guided exploration session
- `/process` - Convert expanded entry
