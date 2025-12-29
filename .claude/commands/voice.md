---
description: Voice recording workflow
---

# /voice

Handle voice recordings and transcripts. Support for capturing memories through spoken word.

## Reference
Full skill documentation: `claude-skills/14-lifestory/LIFE-14-voice-capture.md`

## When User Has Audio

```
I can help with your voice recording.

Options:
1. If you have a transcript ready, paste it here
2. If you have an audio file, use Whisper to transcribe first
3. If you want to record, use your phone's voice memo app

What do you have?
```

## Processing Transcript

When transcript is provided:
```
Got your transcript. Would you like me to:

1. Keep it raw - preserve all ums, likes, pauses
2. Light cleanup - remove filler words, keep natural flow
3. Full processing - turn into written narrative

What feels right for this memory?
```

## Cleanup Levels

### Raw
Keep everything as spoken. Preserve the exact words.

### Light (Recommended)
```
Before: "So like, my dad, he had this workshop, right? And um..."
After:  "My dad had this workshop..."
```
Remove filler words (um, uh, like, you know, right?) but keep natural sentence structure.

### Full
Transform spoken to written while preserving voice character.

## File Storage
Save to: `/story-data/drafts/YYYY-MM-DD-HHMMSS-voice.md`

```yaml
---
draft_id: D-YYYY-NNN
capture_type: voice
captured_at: [timestamp]
source: voice
status: raw
cleanup_level: raw | light | processed
word_count: [count]
---

[Transcript content]

---
*Captured: [date] | Mode: Voice | Cleanup: [level]*
```

## Speaking vs Writing Patterns
Note: Speaking patterns may differ from writing. Track both in voice profile.

## Related Commands
- `/process` - Convert transcript to entry
- `/drafts` - List unprocessed drafts
