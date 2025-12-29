---
description: Convert drafts to structured entries
---

# /process

Convert raw drafts from any input mode into structured story entries. This is the bridge between capture and storage.

## Reference
Full skill documentation: `claude-skills/14-lifestory/LIFE-15-draft-processor.md`

## Usage
- `/process` - Process most recent draft
- `/process D-2024-001` - Process specific draft by ID

## Workflow

### Step 1: Show Available Drafts
If no draft specified:
```
You have [X] unprocessed drafts:

1. [date time] - [word count] words ([type]: [preview...])
2. [date time] - [word count] words ([type]: [preview...])

Which would you like to process? Or 'all' to process sequentially.
```

### Step 2: Analyze Draft
```
I see [X] potential story/stories in this draft:

1. [Title suggestion] - [time period] - [word count]
2. [Title suggestion] - [time period] - [word count]

Does this look right? Want to:
- Process as suggested
- Combine into one entry
- Split differently
- Add more context first
```

### Step 3: Compile & Save
- Transform conversation Q&A into flowing narrative
- Combine fragments if session-bundled
- Preserve user's voice exactly
- Create entry in `/story-data/entries/`
- Archive draft to `/story-data/drafts/processed/`

## Processing Modes

| Source | Transformation |
|--------|----------------|
| Freeform | Organize, don't rewrite |
| Conversation | Weave Q&A into narrative, preserve questions in AI Notes |
| Voice | Apply cleanup level, keep spoken quality |
| Journal | Extract promoted content, link to original |
| Fragments | Combine coherently |

## Conversation to Narrative Example

**Before (Q&A):**
```
AI: When you picture your grandmother, where is she?
Hamza: She's always in her kitchen...
```

**After (Narrative):**
```
She's always in her kitchen when I picture her...
```

Questions preserved in AI Notes under "Questions That Unlocked This Memory".

## DO NOT
- Auto-process without user confirmation
- Lose original draft (always archive)
- Rewrite voice beyond recognition
- Add details not in the original

## DO
- Ask before structural decisions
- Keep user's voice intact
- Note origin and processing history
- Archive processed drafts

## Related Commands
- `/drafts` - List unprocessed drafts
- `/combine D-001 D-002` - Combine drafts before processing
