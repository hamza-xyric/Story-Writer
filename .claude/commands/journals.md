---
description: List recent journal entries
---

# /journals

List recent journal entries with mood indicators and memory triggers.

## Reference
Full skill documentation: `claude-skills/14-lifestory/LIFE-16-journal.md`

## Behavior

Read `/story-data/journals/` directory and display:

```
Recent journals:

Dec 27 | tired, reflective | 498 words
  Triggers: Rabia, Bilal, Owais mentioned
  Book-worthy: seed

Dec 25 | nostalgic | 234 words
  Triggers: college nights, Mark
  Book-worthy: yes (promoted to D-2024-015)

Dec 24 | neutral | 156 words
  Triggers: none
  Book-worthy: false

What would you like to do?
- Read a specific journal (enter date)
- /promote - Review for book-worthy moments
- /journal - Add today's entry
```

## Display Format

For each journal show:
- Date
- Mood (if captured)
- Word count
- Memory triggers detected
- Book-worthy status (false | seed | maybe | yes)
- Promotion status (if promoted to draft)

## If No Journals
```
No journals yet. Start capturing daily reflections:

/journal - What's on your mind today?

Journals capture the present, which often pulls on the past.
No pressure, no streaks, just capture when it feels right.
```

## File Location
Journals stored in: `/story-data/journals/YYYY-MM-DD.md`

## Related Commands
- `/journal` - Create new journal entry
- `/promote` - Extract book-worthy moments
- `/today` - Alias for /journal
