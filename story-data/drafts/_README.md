# Drafts Folder

This folder contains raw captures that haven't been processed into structured entries yet.

## What Goes Here

- **Freeform captures** - Stream of consciousness writing, fragments, notes
- **Conversation logs** - Q&A sessions with the biographer
- **Voice transcripts** - Transcribed voice recordings

## Folder Structure

```
/drafts/
├── _TEMPLATE.md           # Template for new drafts
├── _README.md             # This file
├── [date-time-type].md    # Raw drafts
└── processed/             # Archived drafts after processing
```

## File Naming

Files are named: `YYYY-MM-DD-HHMMSS-[type].md`

Examples:
- `2024-12-24-143000-freeform.md`
- `2024-12-24-150000-conversation.md`
- `2024-12-24-160000-voice.md`

## Draft Status

- `raw` - Just captured, no processing
- `in_progress` - Conversation or session still active
- `processed` - Converted to entry, moved to /processed/

## Processing Drafts

When ready to turn a draft into an entry:

1. Say "process this draft" or `/process [draft-id]`
2. LIFE-15 will analyze and suggest structure
3. Confirm or adjust the suggested entries
4. LIFE-01 creates the final structured entries
5. Draft is archived in /processed/

## Why Keep Raw Drafts?

- Preserve original voice before any processing
- Enable combining fragments later
- Track what questions unlocked memories
- Reference original capture if needed

---

*Drafts folder created: 2024-12-24*
