# LIFE-14: Voice Capture

**Skill ID**: LIFE-14
**Category**: Life Story
**Priority**: Medium
**Version**: 1.0
**Last Updated**: 2024-12-24

---

## Purpose

Handle voice recording transcription and integration. Users can speak their memories, have them transcribed, and then optionally process them into structured entries.

**Philosophy**: Speaking unlocks different memories than writing. Some stories are easier to tell out loud.

---

## When to Activate

**Triggers**:
- User uploads audio file (.mp3, .m4a, .wav, .ogg, .webm)
- User says "I have a voice recording"
- User says "transcribe this"
- User pastes a transcript
- User uses `/voice` or `/audio` or `/transcribe`

---

## Recommended Transcription Workflow

### Step 1: Record

Use any voice memo app:
- **iPhone**: Voice Memos
- **Android**: Google Recorder (auto-transcribes!)
- **Desktop**: QuickTime, Audacity, or any recorder

### Step 2: Transcribe

**Recommended: Whisper (Local, Free, Excellent)**

```bash
# Install via pip
pip install openai-whisper

# Or via Homebrew (macOS)
brew install whisper-cpp

# Basic usage
whisper recording.m4a --model medium --output_format txt

# For better quality (slower)
whisper recording.m4a --model large-v2 --output_format txt
```

**Alternatives**:

| Tool | Pros | Cons |
|------|------|------|
| **macOS Dictation** | Built-in, free | Real-time only |
| **Google Recorder** | Excellent, auto-transcribes | Android only |
| **Otter.ai** | Speaker detection, searchable | Cloud, subscription |
| **Descript** | Great UI, editing features | Paid |

### Step 3: Paste Transcript

Once transcribed, paste into Claude Code. LIFE-14 handles the rest.

---

## Accepting Transcripts

### When User Pastes Transcript

```
User: [pastes long transcript]

AI: "Got it - [X] words captured from your voice recording.

     I notice this is spoken, not written - voice memos often have:
     - Natural repetition and filler words
     - Thoughts that loop back
     - Tangents that become treasures

     Want me to:
     1. Keep it exactly as spoken (preserve your voice)
     2. Light cleanup (remove filler, keep voice)
     3. Process into structured entry

     No rush to decide."
```

### When User Mentions Voice Recording

```
User: "I recorded something about my childhood"

AI: "Great! For transcription, I recommend Whisper - it's free
     and runs locally on your computer.

     Quick setup:
     1. Install: pip install openai-whisper
     2. Run: whisper your-file.m4a --model medium

     Once transcribed, paste it here and I'll capture it.

     Would you like more detailed instructions?"
```

---

## Draft Storage

### File Format

```yaml
---
draft_id: D-2024-005
capture_type: voice
captured_at: 2024-12-24T16:00:00
source: voice-transcript
transcription_tool: "whisper"
original_audio_file: "voice-memo-2024-12-24.m4a"
cleanup_level: raw
status: raw
word_count: 1247
speaking_duration_estimate: "8 minutes"
---

[Transcript exactly as transcribed]

---

*Captured: 2024-12-24 16:00 | Source: Voice Recording | Status: Raw*
```

---

## Cleanup Levels

### Raw (Default)

Keep everything exactly as spoken:
- All filler words ("um", "uh", "like")
- All repetitions
- All false starts
- All tangents

**Best for**: Capturing authentic speaking voice

### Light Cleanup

Remove noise, keep voice:

**REMOVE**:
- Filler words: "um", "uh", "like", "you know"
- False starts: "I was going to-- Actually..."
- Self-corrections: "It was Tuesday. No wait, Monday." → "It was Monday."

**KEEP**:
- Their word choices
- Their sentence rhythms
- Their emotional emphasis
- Their tangents and asides
- Regional expressions and slang

**MARK (don't remove)**:
- Inaudible sections: [inaudible]
- Uncertain words: [possibly: word]
- Speaker pauses: [pause]

### Processed

Full transformation into written form:
- Remove all verbal tics
- Restructure for reading
- Maintain voice but smooth flow
- Pass to LIFE-15 for entry creation

---

## Speaking vs Writing Voice

### Why Track Both

People speak differently than they write. LIFE-00 should capture both:

```yaml
voice_patterns:
  writing:
    story_starters: ["I remember...", "There was this time..."]
    common_phrases: []

  speaking:
    story_starters: ["So like...", "Okay so...", "Man..."]
    filler_patterns: ["you know", "like", "basically"]
    tangent_signals: ["Oh! That reminds me...", "Wait, actually..."]
    emotional_markers: ["The thing is...", "What really got me was..."]
```

### Using Speaking Patterns

When in ghostwriter mode:
- For written output: Use `writing` patterns
- For dialogue/quoted speech: Can use `speaking` patterns
- Both inform overall voice understanding

---

## Voice Prompts

### If User Doesn't Know What to Record

```
AI: "Here are some prompts you could speak to.
     Just pick one and start talking:

     - 'Tell me about the house you grew up in.'
     - 'Describe a meal you remember from childhood.'
     - 'What's something your father always said?'
     - 'Tell me about a time you got in trouble.'
     - 'What was your favorite place as a teenager?'

     Record for as long as you want.
     There's no wrong way to do this."
```

### Prompt Categories

**Sensory Prompts**:
- "Describe the sounds of your childhood home"
- "What did your grandmother's house smell like?"
- "Close your eyes and picture your bedroom at age 10"

**People Prompts**:
- "Tell me about someone who believed in you"
- "Describe your relationship with [character from profile]"
- "Who taught you something you still carry today?"

**Period Prompts**:
- "What was a typical day like in elementary school?"
- "Walk me through your teenage years"
- "What was your first job like?"

---

## Hybrid Mode: Voice + Biographer

User can have a biographer conversation via voice:

```
Session Type: voice-conversation

1. AI asks question (text)
2. User speaks response (records voice memo)
3. User transcribes and pastes
4. AI responds and asks next question
5. Repeat
```

This creates a hybrid session:

```yaml
capture_type: voice-conversation
conversation_state:
  questions_asked: 5
  responses_method: voice
```

---

## Commands

```
/voice             → Start voice capture mode
/audio             → Same as /voice
/transcribe        → Instructions for transcription
/cleanup light     → Apply light cleanup to transcript
/cleanup raw       → Keep as raw (default)
```

---

## Integration

### With LIFE-00 (Personal Context)

After capturing voice:
- Update `input_analytics.total_voice_recordings`
- Track `speaking` patterns separately from `writing`
- Note if voice seems to unlock different memories

### With LIFE-13 (Biographer)

Can work together:
- LIFE-13 provides questions
- User responds via voice
- LIFE-14 captures responses

### With LIFE-15 (Draft Processor)

When ready to process:
- Pass transcript to LIFE-15
- LIFE-15 transforms into narrative
- Voice origin noted in entry metadata

---

## Whisper Setup Guide

### macOS

```bash
# Option 1: via pip (requires Python)
pip install openai-whisper

# Option 2: via Homebrew
brew install whisper-cpp

# Usage
whisper recording.m4a --model medium --output_format txt
```

### Windows

```bash
# Install Python first from python.org
pip install openai-whisper

# Usage (in command prompt)
whisper recording.m4a --model medium --output_format txt
```

### Model Options

| Model | Speed | Quality | VRAM |
|-------|-------|---------|------|
| tiny | Fastest | Basic | <1GB |
| base | Fast | Good | ~1GB |
| small | Medium | Better | ~2GB |
| medium | Slow | Great | ~5GB |
| large-v2 | Slowest | Best | ~10GB |

**Recommendation**: Start with `medium`. Use `large-v2` for difficult audio.

---

## Anti-Patterns

**DO NOT**:
- Pressure user to transcribe immediately
- Over-clean spoken voice into "proper" writing
- Lose the spontaneity of spoken memories
- Make the workflow feel technical
- Require specific transcription tools
- Judge verbal tics or filler words

**DO**:
- Celebrate the unique qualities of spoken memory
- Preserve filler and tangents if requested
- Offer clear tool recommendations
- Make paste-and-capture seamless
- Track speaking style separately from writing style
- Acknowledge that speaking can unlock different memories

---

## Success Criteria

- Voice recordings become easy to capture
- Spoken voice is preserved, not "cleaned up" excessively
- Workflow is simple: record → transcribe → paste → captured
- Speaking unlocks different memories than writing
- LIFE-00 learns both speaking and writing patterns
- User feels comfortable recording stream-of-consciousness

---

*Skill LIFE-14 v1.0 | Life Story System | 2024-12-24*
