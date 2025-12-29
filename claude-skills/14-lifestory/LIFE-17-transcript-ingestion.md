# LIFE-17: Transcript Ingestion

**Skill ID**: LIFE-17
**Category**: Life Story
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-27

---

## Purpose

Parse, store, and index conversation transcripts from meetings, calls, and multi-party conversations. This is the foundation skill that other transcript analysis skills (LIFE-18, 19, 20) build upon.

**Philosophy**: Candid conversations reveal authentic voice, stories told to others, and life details mentioned in passing. Capture everything first, analyze later.

---

## When to Activate

**Triggers**:
- User pastes a transcript with speaker labels
- User says "here's a transcript" or "I have a recording transcript"
- User uses `/transcript` command
- Content appears to be multi-party conversation format

**Mode Signals**:
- Speaker labels (e.g., "Hamza:", "Sarah:", "[Speaker 1]")
- Turn-taking patterns
- Timestamps in transcript
- Mention of tools like Otter.ai, Zoom, Teams

---

## Core Behavior

### What This Skill Does

1. **Accept transcript** with pre-labeled speakers (Otter.ai, Zoom, Teams, etc.)
2. **Parse structure** - Identify speakers, timestamps, turn-taking
3. **Extract Hamza's turns** - Separate his speaking parts from others
4. **Store full transcript** permanently in `/story-data/transcripts/`
5. **Create index metadata** - Searchable reference for other skills
6. **Offer analysis options** - Present LIFE-18/19/20 as next steps

### What This Skill Does NOT Do

- Analyze voice patterns (that's LIFE-18)
- Extract stories (that's LIFE-19)
- Identify gaps (that's LIFE-20)
- Modify or clean up the transcript
- Create entries or drafts directly

---

## User Interaction

### Starting Transcript Mode

```
User: /transcript
      [pastes transcript content]

AI: "Transcript received. Let me parse this...

     Parsed:
     - Duration: ~45 minutes (estimated from content)
     - Participants: Hamza, Sarah, Mike
     - Your speaking: 1,247 words (28% of conversation)
     - Source format: Otter.ai

     Stored as: T-2024-001

     What would you like me to do?
     - /transcript voice → Analyze your speaking patterns
     - /transcript stories → Find stories you told
     - /transcript gaps → Identify people/places/topics to explore
     - /transcript all → Run all three analyses"
```

### Quick Mode

```
User: /transcript all
      [pastes transcript]

AI: "Transcript ingested and all analyses queued.
     [Passes to LIFE-18, 19, 20]"
```

---

## Transcript Storage

### File Location

```
/story-data/transcripts/YYYY-MM-DD-HHMMSS-transcript.md
```

### Storage Format

```yaml
---
transcript_id: T-2024-001
source_file: "team-meeting-2024-12-27.txt"
captured_at: 2024-12-27T14:30:00
source_tool: "otter.ai"
duration_estimate: "45 minutes"
participants:
  - name: "Hamza"
    role: "self"
    word_count: 1247
    turn_count: 34
  - name: "Sarah"
    role: "colleague"
    word_count: 1890
    turn_count: 42
  - name: "Mike"
    role: "colleague"
    word_count: 1395
    turn_count: 38
hamza_word_count: 1247
total_word_count: 4532
status: ingested
analysis_runs: []
---

# Transcript: Team Meeting 2024-12-27

## Participants
- Hamza (self)
- Sarah (colleague)
- Mike (colleague)

---

## Full Transcript

[00:00:15]
Sarah: Let's get started with the weekly sync...

[00:00:32]
Hamza: Yeah, so I've been working on the API integration...

[... full transcript preserved exactly as provided ...]

---

*Ingested: 2024-12-27 14:30 | Source: otter.ai | Status: Ingested*
```

### Hamza-Only Extract

For analysis skills, also generate a Hamza-only view:

```yaml
# Stored in transcript metadata, not separate file
hamza_turns:
  - timestamp: "00:00:32"
    content: "Yeah, so I've been working on the API integration..."
    word_count: 45
    context_before: "Sarah: Let's get started with the weekly sync..."
    context_after: "Sarah: How's that going?"
  - timestamp: "00:01:15"
    content: "It's going well actually. So there was this issue..."
    word_count: 89
    context_before: "Sarah: How's that going?"
    context_after: "Mike: What kind of issue?"
```

---

## Parsing Logic

### Speaker Identification

Supported formats:
```
Hamza: [content]
[Hamza]: [content]
Hamza (00:01:32): [content]
[00:01:32] Hamza: [content]
Speaker 1: [content]  → Ask user to identify
```

### Timestamp Handling

Supported formats:
```
[00:01:32]
(00:01:32)
00:01:32 -
1:32
```

### Self-Identification

If "Hamza" not found in speaker labels:
```
AI: "I see speakers: Speaker 1, Speaker 2, Sarah, Mike
     Which one is you?"

User: "Speaker 1"

AI: "Got it. Mapping Speaker 1 → Hamza"
```

---

## Commands

```
/transcript              → Paste and ingest a new transcript
/transcript all          → Ingest and run all three analyses
/transcript voice        → Run LIFE-18 Voice Mining
/transcript stories      → Run LIFE-19 Story Extraction
/transcript gaps         → Run LIFE-20 Gap Analysis
/transcripts             → List all stored transcripts
/transcript [id]         → View a specific transcript
/transcript delete [id]  → Remove a transcript
```

---

## Integration

### With LIFE-18 (Voice Mining)

After ingestion, if user requests voice analysis:
- Pass `transcript_id` and `hamza_turns` to LIFE-18
- LIFE-18 analyzes speaking patterns
- LIFE-18 updates voice profile

### With LIFE-19 (Story Extraction)

After ingestion, if user requests story extraction:
- Pass `transcript_id` and `hamza_turns` to LIFE-19
- LIFE-19 identifies narrative segments
- LIFE-19 creates drafts for selected stories

### With LIFE-20 (Gap Analysis)

After ingestion, if user requests gap analysis:
- Pass `transcript_id` and `hamza_turns` to LIFE-20
- LIFE-20 extracts entities and cross-references
- LIFE-20 updates leads database

### With LIFE-00 (Personal Context)

After ingestion:
- Update `input_analytics.total_transcripts`
- Track transcript sources used

---

## Anti-Patterns

**DO NOT**:
- Analyze content during ingestion (just store)
- Create entries or drafts from transcripts directly
- Modify the original transcript text
- Delete transcripts after analysis
- Assume speaker identity without confirmation

**DO**:
- Preserve full context for future reference
- Track metadata for searchability
- Offer clear next-step options
- Handle various transcript formats gracefully
- Ask for clarification when speaker labels are ambiguous

---

## Examples

### Standard Ingestion

```
User: /transcript

      Sarah: Hey, let's discuss the project timeline.
      Hamza: Yeah, so I was thinking about that. Actually,
             reminds me of this project I did back in college...
      Sarah: Oh really? What happened?
      Hamza: So there was this professor who was really strict...

AI: "Transcript received.

     Parsed:
     - Participants: Hamza, Sarah
     - Your speaking: 52 words (65% of conversation)
     - Duration: ~2 minutes (estimated)

     Stored as: T-2024-002

     What would you like me to do?
     - /transcript voice → Analyze speaking patterns
     - /transcript stories → Find stories you told
     - /transcript gaps → Identify topics to explore
     - /transcript all → Run all three"
```

### Quick Full Analysis

```
User: /transcript all
      [pastes long transcript]

AI: "Transcript ingested as T-2024-003.
     Running all analyses...

     [Results from LIFE-18, 19, 20 presented]"
```

### Ambiguous Speaker Labels

```
User: /transcript

      Speaker 1: How's the API work going?
      Speaker 2: Pretty good. Had a funny bug yesterday though.

AI: "Transcript received but I need help with speakers.

     I see: Speaker 1, Speaker 2
     Which one is you?"

User: "Speaker 2"

AI: "Got it. Mapping Speaker 2 → Hamza

     Parsed:
     - Participants: Hamza, Speaker 1
     - Your speaking: 11 words

     Stored as: T-2024-004"
```

---

## Success Criteria

- Transcripts parsed correctly from various formats
- All original content preserved without modification
- Speaker identification accurate or clarified
- Metadata enables effective searching
- Clear handoff to analysis skills
- Storage organized and accessible

---

*Skill LIFE-17 v1.0 | Life Story System | 2024-12-27*
