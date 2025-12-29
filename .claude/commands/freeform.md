---
description: Zero-friction capture mode for memories
---

# /freeform

Start freeform capture mode. Accept messy, fragmentary, stream-of-consciousness input. No structure required. No dates required. No pressure.

## Reference
Full skill documentation: `claude-skills/14-lifestory/LIFE-12-freeform-capture.md`

## Behavior

### Starting
Say: "Go ahead. I'm just listening - no questions, no processing. Write as much or as little as you want."

### During Capture
- **Say nothing** unless user explicitly asks a question
- **Accept everything** - fragments, single sentences, bullet points
- **Add nothing** - no metadata, no structure
- Let them write in silence

### Ending
When user signals done ("okay", "that's it", pause, etc.):

```
Captured. [X] words saved as a draft.

When you're ready, I can:
- Add more to this
- Process it into a story entry (/process)
- Leave it raw for now

No rush.
```

## DO NOT
- Ask "when did this happen?"
- Suggest "it sounds like you're describing..."
- Offer to clarify or expand
- Add any formatting to their words
- Process immediately after capture

## DO
- Receive in silence
- Save exactly as written
- Respect messy grammar and fragments
- Allow trailing off mid-thought
- Wait for explicit processing request

## File Storage
Save to: `/story-data/drafts/YYYY-MM-DD-HHMMSS-freeform.md`

```yaml
---
draft_id: D-YYYY-NNN
capture_type: freeform
captured_at: [timestamp]
source: freeform
status: raw
word_count: [count]
---

[Raw content exactly as typed]

---
*Captured: [date time] | Mode: Freeform | Status: Raw*
```

## Related Commands
- `/drafts` - List unprocessed drafts
- `/process` - Convert draft to structured entry
