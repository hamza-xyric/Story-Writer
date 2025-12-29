---
description: Extract book-worthy moments from journals
---

# /promote

Review journals for book-worthy moments and promote them to drafts for processing into entries.

## Reference
Full skill documentation: `claude-skills/14-lifestory/LIFE-16-journal.md`

## Usage
- `/promote` - Review recent journals
- `/promote 2024-12-25` - Promote from specific journal

## Behavior

```
Reviewing your journals from the past week...

Moments with story potential:

1. Dec 25: "Reminded me of those late nights in college..."
   Type: Memory seed
   Action: Explore via /biographer or process directly

2. Dec 24: "Dad called today. First time in months. He sounded old."
   Type: Present moment with emotional weight
   Action: Could become a reflection entry

3. Dec 23: [Work frustrations - no story seed detected]

Which would you like to promote? Enter number, or 'skip' to leave for later.
```

## When User Selects

```
Creating a draft from that memory seed...

Saved as draft: D-2024-015 "College nights with Mark"

Would you like to:
1. Explore it now with /biographer
2. Process it directly into an entry (/process)
3. Leave it as a draft for later

What feels right?
```

## Promotion Process

1. User selects journal content
2. Create draft from selected excerpt
3. Mark journal with `promoted_to: D-YYYY-NNN`
4. Draft goes through normal `/process` pipeline when ready

## Weightage Criteria

| Signal | Book-worthy? |
|--------|--------------|
| Just venting about today | No |
| Names of important people | Seed |
| Time references to past | Seed |
| Strong emotional moments | Maybe/Yes |
| Clear memory trigger | Yes |

## Related Commands
- `/journals` - List recent journal entries
- `/process` - Convert promoted draft to entry
- `/biographer` - Explore memory in depth
