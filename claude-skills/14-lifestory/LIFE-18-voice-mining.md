# LIFE-18: Voice Mining

**Skill ID**: LIFE-18
**Category**: Life Story
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-27

---

## Purpose

Learn Hamza's speaking patterns from conversation transcripts. Distinct from writing patterns, speaking reveals authentic voice, sarcasm style, humor, and conversational rhythms. This skill builds the speaking profile that enables better ghostwriting and prevents misinterpretation of sarcasm.

**Philosophy**: How you speak to others reveals who you are in ways that writing alone cannot capture.

---

## When to Activate

**Triggers**:
- User runs `/transcript voice` after ingestion
- User runs `/transcript all` (voice is part of full analysis)
- User asks to analyze speaking patterns
- Transcript has been ingested via LIFE-17

**Dependencies**:
- Requires LIFE-17 to have ingested a transcript first
- Uses `hamza_turns` extracted by LIFE-17

---

## Core Behavior

### What This Skill Does

1. **Load Hamza's speaking turns** from ingested transcript
2. **Analyze speaking patterns**:
   - Story starters ("So like...", "Okay so...", "Man...")
   - Filler patterns ("um", "you know", "like", "basically")
   - Tangent signals ("Oh! That reminds me...", "Wait, actually...")
   - Emotional markers ("The thing is...", "What really got me was...")
3. **Detect potential sarcasm/exaggeration**:
   - Flag hyperbole ("literally", "worst ever", "I died")
   - Note laughter cues, "I'm joking" markers
   - Track impossibilities and exaggerated statements
4. **Ask clarification** for flagged sarcasm
5. **Update voice profile** with speaking patterns
6. **Build sarcasm vocabulary** over time

### What This Skill Does NOT Do

- Create entries or drafts
- Extract stories (that's LIFE-19)
- Identify gaps (that's LIFE-20)
- Modify the transcript
- Clean up filler words (that's for extraction, not mining)

---

## User Interaction

### Running Voice Mining

```
User: /transcript voice

AI: "Analyzing speaking patterns from T-2024-001...

     SPEAKING PATTERNS FOUND:

     Story Starters:
     - 'So basically...' (used 3x)
     - 'Okay so...' (used 2x)
     - 'Man, that reminds me...' (used 1x)

     Filler Patterns:
     - 'like' (used 12x, high frequency)
     - 'you know' (used 8x)
     - 'basically' (used 5x)

     Tangent Signals:
     - 'Oh wait, that reminds me...'
     - 'Actually, speaking of that...'

     Emotional Markers:
     - 'The thing is...' (precedes strong opinions)
     - 'What really got me was...' (precedes emotional content)

     ⚠ SARCASM FLAGS (please verify):

     1. 'I literally died when she said that'
        → Exaggeration/sarcasm? [Y/n]

     2. 'Best meeting ever, honestly'
        → Sarcasm (given context)? [Y/n]

     3. 'Obviously I knew that the whole time'
        → Ironic/deadpan? [Y/n]"
```

### Sarcasm Verification

```
User: Y, Y, n (the third one was genuine)

AI: "Updated sarcasm vocabulary:

     ✓ 'literally' + extreme event → exaggeration [emerging]
     ✓ 'best X ever' in work context → sarcasm [emerging]
     ✗ 'obviously I knew' → kept as genuine (this time)

     These patterns will help me correctly interpret future transcripts.

     Voice profile updated with speaking patterns."
```

---

## Speaking Pattern Analysis

### Categories Tracked

```yaml
voice_patterns:
  speaking:
    # How stories start in speech
    story_starters:
      - phrase: "So like..."
        frequency: 3
        confidence: emerging
      - phrase: "Okay so..."
        frequency: 2
        confidence: emerging

    # Verbal tics (NOT removed, just tracked)
    filler_patterns:
      - phrase: "like"
        frequency: 12
        position: mid-sentence
      - phrase: "you know"
        frequency: 8
        position: sentence-end

    # Signals that a tangent is coming
    tangent_signals:
      - phrase: "Oh! That reminds me..."
      - phrase: "Wait, actually..."
      - phrase: "Speaking of which..."

    # Precede emotional content
    emotional_markers:
      - phrase: "The thing is..."
        signals: strong_opinion
      - phrase: "What really got me was..."
        signals: emotional_content
      - phrase: "I just felt..."
        signals: vulnerability

    # Humor/sarcasm detection
    humor_markers:
      - phrase: "[laughs]"
      - phrase: "I'm joking"
      - phrase: "...not"

    # Learned sarcasm patterns
    sarcasm_vocabulary:
      - pattern: "literally + extreme"
        meaning: exaggeration
        confidence: emerging
        examples:
          - "I literally died"
          - "I literally couldn't even"
      - pattern: "best X ever"
        meaning: sarcasm_in_work_context
        confidence: emerging
        examples:
          - "Best meeting ever"
          - "Best Monday ever"
```

### Confidence Levels

```
[emerging]   → 1-2 observations (track, don't use for interpretation)
[growing]    → 3-4 observations (use cautiously)
[confirmed]  → 5+ observations (use confidently for interpretation)
```

---

## Sarcasm Detection

### Detection Signals

1. **Hyperbole markers**:
   - "literally" + extreme outcome
   - "worst/best X ever"
   - "always", "never" in exaggerated contexts

2. **Impossibilities**:
   - "I died"
   - "My head exploded"
   - "I screamed" (when clearly not literal)

3. **Contrast patterns**:
   - Statement followed by "...not"
   - Overly positive in negative context
   - Deadpan delivery signals

4. **Explicit cues**:
   - "[laughs]" in transcript
   - "I'm joking", "just kidding"
   - "...not really"

### Learning Loop

```
1. DETECTION
   └─ Flag statements matching sarcasm signals

2. VERIFICATION
   └─ Ask Hamza: "Was this sarcasm/exaggeration?"

3. LEARNING
   └─ If yes: Add to sarcasm_vocabulary with context
   └─ If no: Note as genuine for this type of statement

4. APPLICATION
   └─ Future transcripts check vocabulary before flagging
   └─ Confirmed patterns auto-interpreted
   └─ Emerging patterns still flagged for verification
```

---

## Voice Profile Updates

After analysis, update `/story-data/context/hamza-profile.md`:

```yaml
# Added/updated by LIFE-18

voice_patterns:
  speaking:
    story_starters:
      - "So like..." [emerging]
      - "Okay so..." [emerging]
    filler_patterns:
      - "like" [confirmed - high frequency]
      - "you know" [growing]
    tangent_signals:
      - "Oh! That reminds me..." [emerging]
    emotional_markers:
      - "The thing is..." [emerging]
    humor_markers: []
    sarcasm_vocabulary:
      - pattern: "literally + extreme"
        meaning: "exaggeration"
        confidence: emerging

# Analytics
voice_analytics:
  transcripts_analyzed: 1
  sarcasm_patterns_learned: 2
  speaking_vs_writing_divergence: "moderate"
```

---

## Integration

### With LIFE-17 (Transcript Ingestion)

- Receives `transcript_id` and `hamza_turns` from LIFE-17
- Reads full transcript for context when needed

### With LIFE-19 (Story Extraction)

- LIFE-19 consults `sarcasm_vocabulary` when extracting stories
- Prevents sarcasm from being taken literally in drafts

### With LIFE-20 (Gap Analysis)

- LIFE-20 consults `sarcasm_vocabulary` when generating questions
- Prevents questions like "tell me about that amazing meeting" for sarcastic statements

### With LIFE-00 (Personal Context)

- Updates speaking patterns in voice profile
- Maintains separation between speaking and writing patterns
- Tracks confidence levels for patterns

---

## Commands

```
/transcript voice      → Run voice mining on last ingested transcript
/transcript voice [id] → Run on specific transcript
/sarcasm               → View current sarcasm vocabulary
/sarcasm add           → Manually add a sarcasm pattern
/speaking              → View current speaking patterns
```

---

## Anti-Patterns

**DO NOT**:
- Assume sarcasm without verification (for emerging patterns)
- Mix speaking patterns with writing patterns
- Remove filler words (just track them)
- Create entries from transcript content
- Flag every potentially sarcastic statement (be selective)

**DO**:
- Ask for verification on ambiguous sarcasm
- Track patterns separately from writing
- Build confidence through multiple observations
- Learn context-dependent sarcasm (work vs. friends)
- Share sarcasm data with LIFE-19/20

---

## Examples

### First Transcript Analysis

```
User: /transcript voice

AI: "Analyzing T-2024-001...

     This is your first transcript, so I'm establishing baseline
     speaking patterns.

     PATTERNS DETECTED:
     - High use of 'like' as filler (15 occurrences)
     - Story starter: 'So basically...' (used 4x)
     - Tangent signal: 'Oh wait, that reminds me'

     ⚠ SARCASM CHECK:

     'That was the best standup ever, really productive'
     Context: Discussing a meeting that ran long.
     → Sarcasm? [Y/n]"

User: Y, definitely sarcasm

AI: "Got it. Adding to sarcasm vocabulary:
     - 'best X ever' + work context → likely sarcasm

     Voice profile updated. I'll be better at catching this next time."
```

### Returning User (Patterns Growing)

```
User: /transcript voice

AI: "Analyzing T-2024-003...

     PATTERNS CONFIRMED (from multiple transcripts):
     ✓ 'So like...' as story starter [confirmed]
     ✓ 'like' filler [confirmed - very high frequency]

     NEW PATTERNS DETECTED:
     - 'Dude...' as emphasis marker
     - 'Honestly' before strong opinions

     SARCASM AUTO-DETECTED (based on learned patterns):
     - 'I literally can't even' → marked as exaggeration
     - 'Best Tuesday ever' → marked as sarcasm

     ⚠ NEW SARCASM TO VERIFY:
     'Oh, I'm SURE that'll work perfectly'
     → Sarcasm? [Y/n]"
```

---

## Success Criteria

- Speaking patterns distinct from writing patterns
- Sarcasm vocabulary grows with each transcript
- Verified patterns shared with LIFE-19/20
- False positives decrease over time
- User feels understood when patterns are detected correctly

---

*Skill LIFE-18 v1.0 | Life Story System | 2024-12-27*
