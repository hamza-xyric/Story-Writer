---
description: List unprocessed drafts
---

# /drafts

List all unprocessed drafts waiting to become entries.

## Reference
Full skill documentation: `claude-skills/14-lifestory/LIFE-12-freeform-capture.md`

## Behavior

Read `/story-data/drafts/` directory and display:

```
You have [X] unprocessed drafts:

1. D-2024-001 | Dec 24, 2:30pm | 247 words | freeform
   Preview: "The kitchen. Yellow walls. Mom singing..."

2. D-2024-002 | Dec 24, 4:15pm | 89 words | freeform
   Preview: "Dad's workshop. The smell of sawdust..."

3. D-2024-003 | Dec 25, 10:00am | 512 words | conversation
   Preview: "We talked about grandmother's kitchen..."

What would you like to do?
- /process [id] - Turn draft into entry
- /combine [id1] [id2] - Merge related drafts
- /delete-draft [id] - Remove a draft
- Or just pick a number to process it
```

## If No Drafts
```
No unprocessed drafts. Your capture methods:
- /freeform - Dump thoughts freely
- /biographer - Guided Q&A exploration
- /journal - Daily reflections
- /voice - Voice recording workflow
```

## File Location
Drafts stored in: `/story-data/drafts/`
Processed drafts archived to: `/story-data/drafts/processed/`

## Related Commands
- `/process` - Convert draft to entry
- `/freeform` - Create new freeform draft
- `/biographer` - Start guided conversation
