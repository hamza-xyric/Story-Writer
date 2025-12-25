# LIFE-15: Draft Processor

**Skill ID**: LIFE-15
**Category**: Life Story
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-24

---

## Purpose

Convert raw drafts from any input mode (freeform, conversation, voice) into structured entries ready for LIFE-01. This is the bridge between capture and storage.

**Philosophy**: Capture is about freedom. Processing is about preservation. This skill transforms without losing voice.

---

## When to Activate

**Triggers**:
- User says "process this draft"
- User says "turn this into an entry"
- User reviews a draft and says "ready"
- User uses `/process` or `/process [draft-id]`
- User says "structure this"

**Input Sources**:
- LIFE-12 (Freeform) drafts
- LIFE-13 (Biographer) conversation logs
- LIFE-14 (Voice) transcripts
- LIFE-16 (Journal) promoted content
- Any file in `/story-data/drafts/`

---

## Processing Modes

### Mode 1: Single Draft → Single Entry

Most common. One draft becomes one entry.

```
Draft: [freeform capture about grandmother's kitchen]
       ↓
Entry: "Grandmother's Kitchen" (E-2024-025)
```

### Mode 2: Multiple Fragments → Single Entry

Session fragments combined into coherent entry.

```
Draft: [3 freeform fragments from one session]
       ↓
Entry: "Childhood Summers" (E-2024-026)
```

### Mode 3: Conversation → Entry

Biographer Q&A becomes narrative.

```
Draft: [12 Q&A exchanges about first job]
       ↓
Entry: "My First Real Job" (E-2024-027)
       + AI Notes preserve key questions that unlocked memories
```

### Mode 4: Long Draft → Multiple Entries

Extended writing that covers multiple topics/periods.

```
Draft: [3000 words covering childhood through college]
       ↓
Entry 1: "The Move to Karachi" (E-2024-028)
Entry 2: "First Day of School" (E-2024-029)
Entry 3: "Meeting Ali" (E-2024-030)
```

### Mode 5: Journal Promotion → Draft → Entry

Extract book-worthy moments from daily journals.

```
Journal: "Reminded me of those late nights in college..."
       ↓ /promote
Draft: D-2024-031 (journal excerpt)
       ↓ /process
Entry: "College Debugging Sessions" (E-2024-031)
       + Journal marked with promoted_to: D-2024-031
```

---

## Processing Workflow

### Step 1: Analyze Draft

```
Read draft and identify:
- Distinct stories/memories (1 or multiple?)
- Time periods mentioned
- Characters mentioned
- Locations mentioned
- Emotional themes
- Logical break points (if splitting needed)
```

### Step 2: User Confirmation

```
AI: "I see [X] potential story/stories in this draft:

     1. [Title suggestion] - [time period] - [word count]
     2. [Title suggestion] - [time period] - [word count]

     Does this look right? Want to:
     - Process as suggested
     - Combine into one entry
     - Split differently
     - Add more context first"
```

### Step 3: Compile Narrative

For conversations or fragments:
- Weave Q&A into flowing narrative
- Remove AI questions from main text
- Preserve user's voice and word choices
- Note original questions in AI Notes

### Step 4: Pass to LIFE-01

Send compiled content to LIFE-01 Entry Processor with:
- Source metadata (which input mode)
- Pre-identified characters (names, not IDs)
- Pre-identified locations
- Suggested time period
- Original draft reference

### Step 5: Archive Draft

Move processed draft to `/story-data/drafts/processed/`:

```yaml
---
draft_id: D-2024-005
status: processed
processed_at: 2024-12-24T17:00:00
resulting_entries: ["E-2024-025", "E-2024-026"]
---
```

---

## Conversation → Narrative Transformation

### Before (Conversation Log)

```
**AI**: When you picture your grandmother, where is she?

**Hamza**: She's always in her kitchen. That tiny kitchen in the flat in Karachi.

**AI**: Tell me about that kitchen.

**Hamza**: It was impossibly small. Like, two people couldn't stand side by side.
But she made magic in there. The chai was always perfect.

**AI**: What made her chai special?

**Hamza**: I don't know exactly. Some family recipe. She'd add cardamom and
something else I could never identify. The smell would fill the whole flat.
```

### After (Narrative Entry)

```markdown
# Grandmother's Kitchen

She's always in her kitchen when I picture her. That tiny kitchen in the
flat in Karachi - impossibly small, like two people couldn't stand side by
side. But she made magic in there.

The chai was always perfect. Some family recipe she never fully shared.
She'd add cardamom and something else I could never identify. The smell
would fill the whole flat.

---

## AI Notes

### Origin
This entry emerged from a biographer session on 2024-12-24.
Source draft: D-2024-003

### Questions That Unlocked This Memory
- "When you picture your grandmother, where is she?"
- "Tell me about that kitchen."
- "What made her chai special?"

### Directions to Explore
- What was the recipe? Who might know it?
- What else happened in that kitchen?
- Who else visited grandmother's flat?
```

---

## Fragment Combination

### Before (Multiple Fragments)

**Fragment 1:**
```
The fishing trips with my grandfather. Early mornings.
Waking up before dawn. The smell of the car.
```

**Fragment 2:**
```
He never talked much but those mornings felt like talking.
Silence was comfortable.
```

**Fragment 3:**
```
The last fishing trip - I didn't know it was the last one.
We caught nothing. It didn't matter.
```

### After (Combined Entry)

```markdown
# Fishing with Grandfather

The fishing trips with my grandfather. Early mornings, waking up before
dawn. The smell of the car.

He never talked much but those mornings felt like talking. Silence was
comfortable.

The last fishing trip - I didn't know it was the last one. We caught
nothing. It didn't matter.

---

## AI Notes

### Origin
Combined from 3 freeform fragments captured 2024-12-24.
Source drafts: D-2024-007, D-2024-008, D-2024-009

### Questions to Explore
- What did the car smell like specifically?
- Where was this fishing spot?
- When did you realize it was the last trip?
- What happened to grandfather?
```

---

## Voice Transcript Processing

### Light Processing

```
Original transcript:
"So like, my dad, he had this workshop, right? And um, it was in the
garage and it always smelled like sawdust. You know? And I would just,
like, sit there for hours watching him work."

Processed:
My dad had this workshop in the garage. It always smelled like sawdust.
I would sit there for hours watching him work.
```

### Preserve Spoken Quality

AI Notes should track:
```yaml
### Origin
Voice recording captured 2024-12-24.
Transcribed via Whisper.
Light cleanup applied (filler words removed).
Original speaking style preserved in structure.
```

---

## Entry Origin Metadata

Add to each processed entry:

```yaml
origin:
  type: freeform | conversation | voice | direct
  draft_id: "D-2024-005"
  capture_date: "2024-12-24"
  processing_date: "2024-12-24"
  fragments_combined: 0      # Number of fragments if combined
  questions_asked: 7         # For conversation origin
  cleanup_level: light       # For voice: raw | light | processed
```

---

## Commands

```
/process              → Process most recent draft
/process [id]         → Process specific draft
/drafts               → List all unprocessed drafts
/combine [id1] [id2]  → Combine drafts before processing
/split                → Split long draft into multiple entries
/promote              → Review journals for book-worthy moments
/promote [date]       → Promote specific journal (e.g., /promote 2024-12-25)
```

---

## Integration

### With LIFE-12 (Freeform)

Receives:
- Raw freeform captures
- Session bundles (multiple fragments)

Returns:
- Structured narrative

### With LIFE-13 (Biographer)

Receives:
- Conversation logs with Q&A
- Conversation metadata

Returns:
- Flowing narrative with questions in AI Notes

### With LIFE-14 (Voice)

Receives:
- Transcripts with cleanup level
- Speaking metadata

Returns:
- Written narrative preserving spoken voice

### With LIFE-16 (Journal)

Receives (via /promote):
- Journal excerpts selected as book-worthy
- Memory triggers detected in journal
- Journal metadata

Process:
1. Create draft from selected journal content
2. Mark journal with `promoted_to: D-YYYY-NNN`
3. Process draft as normal (or leave for later)

Origin tracking:
```yaml
origin:
  type: journal
  journal_id: "J-2024-001"
  journal_date: "2024-12-25"
  promoted_at: "2024-12-26"
  original_context: "Daily journal about coffee with friend"
```

### With LIFE-01 (Entry Processor)

Sends:
- Compiled narrative content
- Pre-identified metadata
- Origin information

LIFE-01 then:
- Assigns entry_id
- Matches characters to profiles
- Extracts final metadata
- Saves to /story-data/entries/

---

## Anti-Patterns

**DO NOT**:
- Auto-process without user confirmation
- Lose original draft after processing (always archive)
- Rewrite voice beyond recognition
- Force multiple stories into one entry
- Add details not in the original
- Remove meaningful repetition or emphasis

**DO**:
- Preserve original draft always
- Ask before making structural decisions
- Keep user's voice intact
- Suggest splits for long content
- Note origin and processing history
- Transform Q&A into narrative gracefully

---

## Success Criteria

- All drafts can become entries when ready
- Processing feels like assistance, not takeover
- Original voice preserved through transformation
- Conversation → narrative feels natural
- Fragments combine coherently
- Entry origin is always traceable
- No content is ever lost

---

*Skill LIFE-15 v1.1 | Life Story System | 2024-12-25*
*v1.1: Added journal promotion (Mode 5, /promote command)*
