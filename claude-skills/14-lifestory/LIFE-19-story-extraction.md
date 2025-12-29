# LIFE-19: Story Extraction

**Skill ID**: LIFE-19
**Category**: Life Story
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-27

---

## Purpose

Find and extract stories Hamza told during conversations. Unlike intentional capture modes (freeform, biographer), these are stories that emerged naturally while talking to others - often more authentic and unguarded.

**Philosophy**: The best stories often come out when you're not trying to tell them. Conversations with friends unlock memories that structured sessions might not.

---

## When to Activate

**Triggers**:
- User runs `/transcript stories` after ingestion
- User runs `/transcript all` (stories is part of full analysis)
- User asks to find stories in a transcript
- Transcript has been ingested via LIFE-17

**Dependencies**:
- Requires LIFE-17 to have ingested a transcript first
- Consults LIFE-18's sarcasm_vocabulary for interpretation

---

## Core Behavior

### What This Skill Does

1. **Scan Hamza's speaking turns** for narrative patterns:
   - Extended speaking (multiple turns on same topic)
   - Past-tense narration ("So there was this time...")
   - Story markers ("I remember when...", "This one time...")
   - Emotional crescendos
2. **Identify distinct stories** told during conversation
3. **Present findings** with context about who he was talking to
4. **Check sarcasm** using LIFE-18's vocabulary
5. **Apply light polish** to selected stories:
   - Remove filler words (um, uh, you know)
   - Remove false starts and repetitions
   - Keep word choices, rhythm, emotional emphasis
6. **Create drafts** for selected stories (feeds into /process pipeline)

### What This Skill Does NOT Do

- Update voice profile (that's LIFE-18)
- Identify non-story gaps (that's LIFE-20)
- Create final entries directly (goes to draft → process pipeline)
- Heavy rewriting (just light polish)

---

## User Interaction

### Running Story Extraction

```
User: /transcript stories

AI: "Scanning T-2024-001 for stories...

     STORIES FOUND:

     1. 'The coffee machine incident' (~200 words)
        Told to: Sarah
        Context: Explaining why you avoid the break room
        Markers: Extended narration, past tense, emotional ending
        Time period: Recent (last month)

     2. 'College roommate's cooking disaster' (~350 words)
        Told to: Mike
        Context: Tangent from discussing meal prep
        Markers: 'This one time...', detailed narration, laughing
        Time period: College years

     3. 'Dad teaching you to drive' (~150 words)
        Told to: Sarah
        Context: Brief mention, could be expanded
        Markers: 'I remember when...', sensory details
        Time period: Teenage years

     Which would you like to extract as drafts?
     - [1,2,3] → Extract all
     - [1,3] → Extract specific ones
     - [0] → None, just save the analysis"
```

### Sarcasm Check

```
AI: "Before extracting, I noticed some statements that might be sarcasm:

     In 'College roommate' story:
     - 'Best pasta I ever had, honestly'
       → Based on your patterns, this seems sarcastic. Confirm? [Y/n]

     In 'Coffee machine' story:
     - 'I literally died'
       → Marking as exaggeration (learned pattern)"

User: Y

AI: "Got it. I'll note that in the draft as ironic, not literal praise.

     Creating drafts for stories 1 and 2..."
```

---

## Story Detection

### Narrative Markers

1. **Story starters**:
   - "So there was this time..."
   - "I remember when..."
   - "This one time..."
   - "Back when I was..."
   - "Actually, that reminds me..."

2. **Temporal signals**:
   - Past tense narration
   - Time anchors ("when I was in college", "last month")
   - Sequence words ("then", "after that", "suddenly")

3. **Structural patterns**:
   - Extended speaking (3+ turns on same topic)
   - Rising action → climax → resolution
   - Emotional crescendo
   - Punchline or reflection at end

4. **Sensory/detail richness**:
   - Specific names, places, details
   - Dialogue recalled ("and she said...")
   - Sensory descriptions

### Non-Story Content (Ignore)

- Work updates and logistics
- Planning discussions
- Brief factual exchanges
- Current-moment reactions

---

## Light Polish Cleanup

When extracting stories, apply light cleanup to improve readability while preserving voice:

### Remove

- Filler words: um, uh, like (as filler), you know
- False starts: "I was— I mean, I went..."
- Repetitive phrases: "it was really, really, like really..."
- Other speaker's interjections: "Sarah: Uh huh"

### Keep

- Word choices and vocabulary
- Sentence rhythm and flow
- Emotional emphasis and intensity
- Natural speech patterns (not all "like"s are fillers)
- Tangents that add to the story
- Humor and exaggeration (noted as such)

### Example Transformation

**Original transcript:**

```
Hamza: So like, okay, this one time in college, my roommate—
       you know Derek, right?—anyway, Derek decided he was
       gonna cook. Like, actually cook. Um, and I was like,
       okay, this should be interesting.
Sarah: Oh no.
Hamza: Right? So he, uh, he puts on pasta, and then he just...
       leaves. Like, goes to his room to play games. For like
       an hour.
Sarah: The pasta was cooking for an hour?
Hamza: The kitchen was literally on fire. I'm not even joking.
       Best pasta I ever had, honestly.
```

**After light polish:**

```
So this one time in college, my roommate Derek—you know Derek,
right?—anyway, Derek decided he was gonna actually cook. And I
was like, okay, this should be interesting.

So he puts on pasta, and then he just... leaves. Goes to his room
to play games. For an hour.

The kitchen was literally on fire. I'm not even joking.
Best pasta I ever had, honestly. [sarcasm noted]
```

---

## Draft Creation

### File Location

```
/story-data/drafts/YYYY-MM-DD-HHMMSS-transcript-extract.md
```

### Draft Format

```yaml
---
draft_id: D-2024-017
capture_type: transcript-extract
captured_at: 2024-12-27T15:30:00
source: transcript
transcript_id: T-2024-001
story_title: "College Roommate's Cooking Disaster"
context: "Told to Mike during team meeting tangent"
shared_with:
  - Mike
  - Sarah (listening)
cleanup_level: light
sarcasm_verified: true
sarcasm_notes:
  - "'Best pasta I ever had' - ironic"
word_count: 285
estimated_time_period: "college years"
status: raw
---

## Extracted Story: College Roommate's Cooking Disaster

So this one time in college, my roommate Derek—you know Derek,
right?—anyway, Derek decided he was gonna actually cook. And I
was like, okay, this should be interesting.

So he puts on pasta, and then he just... leaves. Goes to his room
to play games. For an hour.

The kitchen was literally on fire. I'm not even joking.
Best pasta I ever had, honestly. [sarcasm - ironic praise]

---

## Extraction Notes

- **Source**: Transcript T-2024-001 (Team meeting 2024-12-27)
- **Told to**: Mike (with Sarah listening)
- **Trigger**: Discussion about meal prep
- **Cleanup applied**: Light polish (fillers removed, voice preserved)
- **Sarcasm verified**: Yes - "best pasta" is ironic

---

*Extracted: 2024-12-27 15:30 | From: T-2024-001 | Status: Ready for /process*
```

---

## Integration

### With LIFE-17 (Transcript Ingestion)

- Receives `transcript_id` and `hamza_turns` from LIFE-17
- Reads full transcript for context when needed

### With LIFE-18 (Voice Mining)

- Consults `sarcasm_vocabulary` before extracting
- Flags statements that match sarcasm patterns
- Verified sarcasm noted in drafts

### With LIFE-15 (Draft Processor)

- Drafts created by LIFE-19 go to `/story-data/drafts/`
- User processes them with `/process` → LIFE-15
- LIFE-15 converts to final entries

### With LIFE-00 (Personal Context)

- Update `input_analytics.stories_from_transcripts`
- Track which conversation contexts yield best stories

---

## Commands

```
/transcript stories      → Extract stories from last ingested transcript
/transcript stories [id] → Extract from specific transcript
```

---

## Anti-Patterns

**DO NOT**:
- Extract every long speaking turn as a story
- Heavily rewrite to sound "better"
- Remove emotional content or tangents
- Create final entries directly (use draft pipeline)
- Ignore sarcasm (consult LIFE-18)
- Combine unrelated fragments into one story

**DO**:
- Present findings for user selection
- Apply only light polish
- Note context (who was listening, what triggered it)
- Verify sarcasm before finalizing
- Keep tangents that add to the story
- Track estimated time periods

---

## Examples

### Multiple Stories Found

```
User: /transcript stories

AI: "Found 4 potential stories in T-2024-003:

     1. 'First day at the new job' (~450 words)
        Long, detailed narration with emotional arc
        → Strong candidate

     2. 'The parking ticket incident' (~120 words)
        Brief but complete story with punchline
        → Good candidate

     3. 'Dad's advice about money' (~80 words)
        Fragment, mentioned in passing
        → Could expand in biographer session

     4. 'Childhood summers' (~200 words)
        Multiple memories bundled together
        → Could split into separate entries

     Extract which? [1,2,3,4] or specific numbers:"
```

### Story with Sarcasm

```
User: Extract 2

AI: "Extracting 'The parking ticket incident'...

     ⚠ Sarcasm check:
     - 'Great way to start the morning, really'
       → Sarcasm based on your patterns? [Y/n]

User: Y

AI: "Noted as sarcasm in the draft.

     Draft created: D-2024-018
     'The parking ticket incident' (~120 words)
     Status: Ready for /process

     Would you like to process it now, or extract more stories first?"
```

---

## Success Criteria

- Stories identified match actual narrative content
- Light polish preserves authentic voice
- Sarcasm correctly interpreted
- Context (who, what triggered) preserved
- Drafts ready for standard processing pipeline
- User feels stories are faithfully captured

---

*Skill LIFE-19 v1.0 | Life Story System | 2024-12-27*
