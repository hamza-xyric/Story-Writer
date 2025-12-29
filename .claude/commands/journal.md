---
description: Daily reflection capture (present-focused)
---

# /journal

Capture present-focused daily reflections. Unlike freeform (past memories) or biographer (guided exploration), journaling captures *today* - which naturally connects to *yesterday*.

## Reference
Full skill documentation: `claude-skills/14-lifestory/LIFE-16-journal.md`

## Opening
```
What's on your mind today?
```

Or if mood provided (`/journal feeling tired`):
```
Got it - tired. Go ahead, I'm listening.
```

## During Capture
- Mostly silent (like freeform)
- Receive the content
- If user pauses: "Anything else, or is that it for today?"

## After Capture

### If memory triggers detected:
```
Captured. [X] words.

I noticed you mentioned [college nights / your grandmother / etc.].
Would you like to explore that memory now? (/biographer)
Or I can add it to your question bank for later.
```

### If no triggers:
```
Captured. [X] words saved.

When you're ready, you can:
- Add more with /journal
- Review past journals with /journals
- Promote moments to entries with /promote
```

## Memory Triggers to Detect
- Names mentioned (check against character profiles)
- Places mentioned (check against locations)
- Time references to past ("reminded me of...", "back when...")
- Strong emotions connecting to previous entries

## Weightage (not everything is book-worthy)
| Content | Outcome |
|---------|---------|
| Just venting | Valid, probably not book material |
| Seed of a story | Add to question bank |
| Clear memory trigger | Suggest /biographer |
| Book-worthy moment | Suggest /promote |

## DO NOT
- Ask questions during capture
- Enforce daily habit / track streaks
- Make user feel guilty for skipping days
- Require mood or metadata
- Push for "deeper" content

## DO
- Receive in near-silence
- Actively detect memory triggers AFTER capture
- Suggest exploration, accept "no" gracefully
- Treat every journal as valid regardless of content

## File Storage
Save to: `/story-data/journals/YYYY-MM-DD.md`

```yaml
---
journal_id: J-YYYY-NNN
journal_date: 2024-12-25
mood: reflective          # Optional
captured_at: [timestamp]
word_count: [count]
---

[Freeform content about the day]

---
*Journal: [date] | Mood: [mood]*
```

## Related Commands
- `/today` - Alias for /journal
- `/journals` - List recent journal entries
- `/promote` - Extract book-worthy moments
