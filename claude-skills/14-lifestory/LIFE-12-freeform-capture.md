# LIFE-12: Freeform Capture

**Skill ID**: LIFE-12
**Category**: Life Story
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-24

---

## Purpose

Accept messy, fragmentary, stream-of-consciousness input. No structure required. No dates required. No pressure to complete thoughts. Just capture.

**Philosophy**: The blank page should feel like a trusted notebook, not a form.

---

## When to Activate

**Triggers**:
- User says "I just want to write" or "let me dump some thoughts"
- User says "don't process this yet" or "raw mode"
- User starts typing without any structure signals
- User uses `/freeform` or `/capture` or `/dump`
- User says "just save this"

**Mode Signals**:
- Single paragraph or less: Quick capture
- Multiple paragraphs: Extended session
- Bullet points or fragments: Note-taking mode
- Time markers scattered: Timeline fragments

---

## Core Behavior

### What This Skill Does

1. **Accept everything** - fragments, single sentences, bullet points
2. **Ask nothing** - no clarifying questions during capture
3. **Add nothing** - no metadata, no structure, just save
4. **Timestamp only** - record when captured, nothing else
5. **Bundle later** - allow multiple captures to combine into one session

### What This Skill Does NOT Do

- Extract metadata
- Ask for dates or context
- Suggest characters or themes
- Trigger deepening questions
- Create structured entries
- Process or organize content

---

## User Interaction

### Starting Freeform Mode

```
User: "I just want to write something down"

AI: "Go ahead. I'm just listening - no questions, no processing.
     Write as much or as little as you want."
```

### During Freeform

AI says nothing unless:
- User explicitly asks a question
- User says "that's it" or signals end
- User asks to continue later

**Silence is the default**. Let them write.

### Ending Freeform

```
User: "okay that's all" or "done" or [long pause]

AI: "Captured. [X] words saved as a draft.

     When you're ready, I can:
     - Add more to this
     - Process it into a story entry
     - Leave it raw for now

     No rush."
```

---

## Draft Storage

### File Location

```
/story-data/drafts/YYYY-MM-DD-HHMMSS-freeform.md
```

### Draft Format

```yaml
---
draft_id: D-YYYY-NNN
capture_type: freeform
captured_at: 2024-12-24T14:30:00
session_id: null
source: freeform
status: raw
word_count: 247
---

[Raw content exactly as typed, no modifications]

---

*Captured: 2024-12-24 14:30 | Mode: Freeform | Status: Raw*
```

### Session Bundling

Multiple freeform captures in one sitting get bundled:

```yaml
---
draft_id: D-2024-002
capture_type: freeform-session
captured_at: 2024-12-24T14:30:00
session_id: S-2024-001
fragments:
  - timestamp: "14:30:00"
    word_count: 42
  - timestamp: "14:35:00"
    word_count: 156
  - timestamp: "14:41:00"
    word_count: 89
source: freeform
status: raw
total_word_count: 287
---

## Fragment 1 (14:30)

[First capture]

---

## Fragment 2 (14:35)

[Second capture]

---

## Fragment 3 (14:41)

[Third capture]

---

*Session: 2024-12-24 14:30-14:45 | Fragments: 3 | Status: Raw*
```

---

## Exit to Processing

When user is ready to process:

```
User: "okay, let's process what I wrote"

AI: "I'll pass this to LIFE-15 to turn it into a structured entry.

     [Invokes LIFE-15 Draft Processor]"
```

If multiple drafts exist:

```
AI: "You have 3 unprocessed drafts:

     1. Dec 24, 2:30pm - 247 words (childhood memory)
     2. Dec 24, 4:15pm - 89 words (fragment about Dad)
     3. Dec 25, 10:00am - 512 words (school years)

     Which would you like to process? Or should I combine any?"
```

---

## Commands

```
/freeform          → Start freeform capture mode
/dump              → Same as /freeform
/capture           → Same as /freeform
/drafts            → List unprocessed drafts
/process [id]      → Send draft to LIFE-15
/delete-draft [id] → Remove a draft
```

---

## Integration

### With LIFE-00 (Personal Context)

After capture:
- Update `input_analytics.total_freeform_captures`
- Update `avg_freeform_length`
- Note if freeform seems to be preferred mode

### With LIFE-15 (Draft Processor)

When ready to process:
- Pass draft file path to LIFE-15
- LIFE-15 extracts structure
- LIFE-15 sends to LIFE-01

### With Session Tracking

- Group captures within ~30 minutes as one session
- Track session_id for bundling
- Note time of day patterns

---

## Anti-Patterns

**DO NOT**:
- Ask "when did this happen?" during capture
- Suggest "it sounds like you're describing..."
- Offer to clarify or expand
- Add any formatting to their words
- Bundle unrelated captures automatically
- Process immediately after capture

**DO**:
- Receive in silence
- Save exactly as written
- Respect messy grammar and fragments
- Allow trailing off mid-thought
- Preserve line breaks and formatting
- Wait for explicit processing request

---

## Examples

### Quick Capture

```
User: /freeform

AI: "Go ahead. I'm just listening."

User: "The kitchen. Yellow walls. Mom singing while cooking.
       The smell of cardamom."

AI: "Captured. 12 words saved."
```

### Extended Session

```
User: "I just need to write for a bit"

AI: "Go ahead. I'm just listening - no questions, no processing."

User: "There was this one summer at my grandmother's house. I must have
been 8 or 9. The ceiling fans were always on, making this rhythmic
sound. I'd lie on the cool floor tiles and just... exist.

My cousin Farid would come over almost every day. We'd play cricket in
the courtyard until it got too hot, then hide inside eating ice cream.

I don't remember what we talked about. Just that feeling of endless
days. No school. No responsibilities. Just being a kid."

AI: "Captured. 89 words saved as a draft.

     When you're ready, I can:
     - Add more to this
     - Process it into a story entry
     - Leave it raw for now

     No rush."
```

### Fragment Collection

```
User: /freeform
AI: "Go ahead."

User: "Dad's workshop. The smell of sawdust."
AI: "Captured."

[10 minutes later]

User: /freeform
AI: "Adding to your session."

User: "He'd let me hold the flashlight while he worked. I felt so
important."
AI: "Added. 2 fragments in this session."

[5 minutes later]

User: "done"
AI: "Session captured. 2 fragments, 28 words total.

     These will stay as drafts until you're ready to process them."
```

---

## Success Criteria

- User feels zero friction when capturing
- Nothing is lost, even fragments
- No processing pressure
- Easy transition to structured entry when ready
- Raw voice preserved perfectly
- Session bundling works intuitively

---

*Skill LIFE-12 v1.0 | Life Story System | 2024-12-24*
