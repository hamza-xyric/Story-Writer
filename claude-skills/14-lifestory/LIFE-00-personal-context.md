# LIFE-00: Personal Context & Voice Manager

**Skill ID**: LIFE-00
**Category**: Life Story
**Priority**: Critical
**Version**: 2.0
**Last Updated**: 2024-12-24

---

## Purpose

Store and evolve Hamza's personal context, writing voice, and patterns over time. This skill manages the growing profile that enables AI to:

1. **Sound like Hamza** - Generate prose in his authentic voice
2. **Ask questions his way** - Match his conversational energy
3. **Remember across sessions** - Maintain continuity month to month
4. **Handle sensitivity** - Detect and respect difficult topics
5. **Adapt over time** - Improve personalization with each session

**This is the foundation of the ghostwriter system** - the more Hamza writes, the more AI learns to write like him.

---

## Profile Location

```
/story-data/context/hamza-profile.md
```

---

## When to Activate

**Automatic Activation**:
- At the START of every session (read full context)
- After EVERY entry is processed (voice analysis)
- At the END of every session (session summary)
- When generating prose in ghostwriter mode

**Manual Invocation**:
```
"What's my writing style?"
"How do I usually write?"
"What patterns have you noticed?"
"Show me my voice profile"
"Update my preferences to..."
```

---

## Voice Capture Pipeline

### Triggered After Every Entry

When LIFE-01 processes an entry, immediately run:

```
Entry Processed
      |
      v
+--------------------+
| 1. LEXICAL SCAN    |
| - Count word freq  |
| - Identify unusual |
| - Track emotional  |
+--------------------+
      |
      v
+--------------------+
| 2. SENTENCE SCAN   |
| - Measure length   |
| - Detect fragments |
| - Map complexity   |
+--------------------+
      |
      v
+--------------------+
| 3. NARRATIVE SCAN  |
| - Capture opening  |
| - Capture closing  |
| - Note transitions |
+--------------------+
      |
      v
+--------------------+
| 4. SENSORY SCAN    |
| - Visual refs      |
| - Auditory refs    |
| - Smell/touch/taste|
+--------------------+
      |
      v
+--------------------+
| 5. PATTERN MATCH   |
| - Compare to       |
|   existing profile |
| - Detect new       |
| - Confirm emerging |
+--------------------+
      |
      v
+--------------------+
| 6. PROFILE UPDATE  |
| - Add new emerging |
| - Promote growing  |
| - Confirm stable   |
+--------------------+
```

### Pattern Confidence Levels

```
[TO BE LEARNED]  → No data yet
[emerging]       → Seen 1-2 times (track but don't use)
[growing]        → Seen 3-4 times (start using cautiously)
[confirmed]      → Seen 5+ times (use confidently)
```

Only `[confirmed]` patterns are used in ghostwriter mode.

---

## Voice Analysis Details

### 1. Lexical Scan

**Track vocabulary patterns**:

```yaml
vocabulary_patterns:
  high_frequency_words:
    - word: "remember"
      count: 15
      confidence: confirmed
    - word: "feeling"
      count: 8
      confidence: growing

  signature_phrases:
    - phrase: "the thing is"
      count: 6
      confidence: confirmed
    - phrase: "I guess"
      count: 3
      confidence: growing

  emotional_vocabulary:
    joy: ["relief", "lightness", "finally"]
    sadness: ["heavy", "hollow", "sinking"]
    anger: ["frustrated", "furious"]
    nostalgia: ["miss", "used to", "back then"]
```

**How to detect**:
- Compare word frequency to English baseline
- Words appearing 2x+ more than average = signature
- Note which words appear in emotional contexts

### 2. Sentence Scan

**Track structural patterns**:

```yaml
sentence_patterns:
  average_length: 14.2        # words per sentence
  length_variance: "high"     # consistent | moderate | high
  complexity: "mixed"         # simple | compound | complex | mixed
  fragment_usage: "occasional" # never | rare | occasional | frequent
```

**How to detect**:
- Split content into sentences
- Count words per sentence
- Calculate average and variance
- Identify fragments (incomplete sentences used for effect)

### 3. Narrative Scan

**Track story structure patterns**:

```yaml
narrative_patterns:
  typical_opening: "I remember..."    # Most common story start
  typical_closing: "[reflective]"     # How stories end
  transition_style: "time-based"      # "Meanwhile...", "A year later..."
  detail_density: "rich"              # sparse | moderate | rich
  temporal_flow: "mostly-chronological"
```

**How to detect**:
- Extract first sentence of each entry
- Extract last sentence of each entry
- Look for transition phrases
- Count descriptive adjectives per paragraph

### 4. Sensory Scan

**Track which senses are invoked**:

```yaml
sensory_tendencies:
  visual: "high"        # 45% of sensory references
  auditory: "moderate"  # 25%
  olfactory: "low"      # 10%
  tactile: "high"       # 18%
  gustatory: "low"      # 2%
```

**How to detect**:
- Scan for sight words: "saw", "looked", "bright", colors
- Scan for sound words: "heard", "loud", "quiet", sounds
- Scan for smell words: "smelled", "aroma", "stench"
- Scan for touch words: "felt", "rough", "smooth", textures
- Scan for taste words: "tasted", "sweet", "bitter"

---

## Sensitivity Detection

### Explicit Marking

User can directly mark topics:
```
"This is sensitive"
"/sensitive [topic]"
"Don't push on this"
```

### Behavioral Detection

Watch for these signals during conversations:

| Signal | Meaning |
|--------|---------|
| Shortened responses | May be uncomfortable |
| Humor deflection | Using humor to avoid depth |
| Topic changes | Avoiding the subject |
| "I don't know" repeatedly | May be resistance, not ignorance |
| Pauses before answering | Processing difficulty |

### Sensitivity Levels

```yaml
sensitive_topics:
  - topic: "grandfather's death"
    level: protected        # NEVER bring up
    approach: "only if he initiates"
    detected_via: "behavioral"
    last_touched: "2024-12-20"

  - topic: "career change"
    level: high             # Follow his lead only
    approach: "gentle if he brings it up"

  - topic: "school struggles"
    level: medium           # Can explore carefully
    approach: "ask permission before deepening"
```

**Level Definitions**:
- `protected`: Never initiate. Only follow if he brings it up.
- `high`: Don't initiate. If he mentions, be gentle.
- `medium`: Can ask, but offer exit. "We can leave this here."
- `low`: Normal topic, no special handling.

---

## Session Continuity

### Session Memory

Track each session for continuity:

```yaml
session_history:
  - session_id: "S-2024-001"
    date: "2024-12-24"
    duration_estimate: "45 min"
    entries_created: ["E-2024-001", "E-2024-002"]
    topics_covered: ["childhood", "father"]
    emotional_depth: "medium"
    deferred_questions:
      - "What happened after the fishing trip?"
      - "Tell me more about grandmother's kitchen"
    new_patterns_observed:
      - "Uses 'I remember' as opener"
    notes: "First session. Opened up about early childhood."
```

### Session Opening

At the start of each session:

```
Read profile
Check last session summary
Reference naturally:

"Last time we explored [topic]. How are you feeling about that now?
Or if something else is on your mind, I'm here for that too."
```

### Deferred Questions

Track questions the user didn't want to answer yet:

```yaml
deferred_questions:
  - question: "What happened right after grandmother passed?"
    deferred_on: "2024-12-20"
    topic: "grandmother's death"
    times_offered: 1

  - question: "How did that conversation with your father end?"
    deferred_on: "2024-12-22"
    topic: "conflict with father"
    times_offered: 2
```

**Gentle Return Protocol**:
After 3+ sessions, gently offer:
```
"A few sessions ago, you mentioned [topic] but we didn't go deep.
If you're ever ready to explore that, I'm curious. No pressure."
```

---

## Ghostwriter Mode

### Activation

When generating prose (drafts, chapters, polished content):

```
GHOSTWRITER MODE ACTIVATED

Writing as Hamza. Not about him. AS him.
```

### Voice Constraints (Hard Rules)

When in ghostwriter mode, ENFORCE these constraints:

```
VOCABULARY:
- Only use words from vocabulary_patterns.high_frequency_words
- Only use phrases from vocabulary_patterns.signature_phrases
- For emotions, use his emotional_vocabulary terms
- NEVER use words from vocabulary_patterns.avoided_words
- Maximum 15% deviation from established vocabulary

SENTENCES:
- Average length must stay within 1 standard deviation of his average
- Match his complexity pattern
- Include fragments if he uses them

NARRATIVE:
- Opening must match one of his documented patterns
- Transitions must match his style
- Detail density must match his level

SENSORY:
- Prioritize his dominant senses
- Rarely use his weak senses

PEOPLE:
- Use EXACTLY his people_references (Dad not father, etc.)
```

### Ghostwriter Checklist

After generating any prose, verify:

```
[ ] No words appear that Hamza never uses
[ ] Sentence length matches his pattern (+/- 1 std dev)
[ ] Emotional words are from his vocabulary
[ ] Sensory details match his preferences
[ ] People are referred to using his terms
[ ] Opening matches his style
[ ] Overall voice feels like his
```

### Ghostwriter System Prompt Injection

Before any prose generation, inject:

```
You are writing as Hamza. Not about him. AS him.

VOICE CHARACTERISTICS:
- Sentence length: [average_length] words, [variance] variance
- Opens stories with: [typical_opening patterns]
- Emotional vocabulary: [list his terms]
- Sensory focus: [his dominant senses]

VOCABULARY RULES:
- Use frequently: [high_frequency_words]
- Signature phrases: [signature_phrases]
- AVOID: [avoided_words]

PEOPLE REFERENCES:
[list from people_references]

CRITICAL:
- Never use words not in his vocabulary
- Never add sophistication beyond his style
- When in doubt, simpler is better
- Preserve his voice, don't improve it
```

---

## Adaptive Behaviors

### Based on Input Mode

If `input_preferences.preferred_mode` is known:

```
freeform → Emphasize "just capture" mode, less structure
conversation → Lead with questions, follow his energy
voice → Note speaking patterns differ from writing
mixed → Adapt to current session
```

### Based on Conversation Patterns

If `conversation_patterns.opens_up_after` is known:

```
"immediately" → Can ask deep questions early
"2-3 questions" → Warm up with lighter questions first
"takes time" → Be patient, don't push
```

### Based on Best Question Types

If `conversation_patterns.best_question_types` is known:

```
["sensory"] → Ask "What did it smell like? Sound like?"
["what happened next"] → Focus on narrative sequence
["feelings"] → Ask about emotional experience
["why"] → Explore motivations and meaning
```

---

## Core Functions

### 1. Initialize Profile

For new users, create minimal profile:

```yaml
---
name: "Hamza"
writing_style:
  pov: "first-person"
  tense: "past"
preferences:
  deepening_style: "one question at a time"
profile_created: "[today]"
profile_version: "2.0"
---
```

### 2. Read Context (Session Start)

```
1. Load hamza-profile.md
2. Parse YAML frontmatter
3. Load into working memory
4. Check last session for continuity
5. Note any deferred questions
6. Prepare adaptive behaviors
```

### 3. Analyze Entry (After LIFE-01)

```
1. Run voice capture pipeline:
   - Lexical scan
   - Sentence scan
   - Narrative scan
   - Sensory scan
2. Compare to existing patterns
3. Update pattern confidences
4. Promote patterns that reached new levels
```

### 4. Update Session (Session End)

```
1. Summarize topics covered
2. Note emotional depth reached
3. Record any deferred questions
4. Add to session_history
5. Update analytics counters
6. Save profile
```

### 5. Generate Voice Report (On Request)

```markdown
## Your Voice Profile

### Writing Style
[Summary based on confirmed patterns]

### Vocabulary Signature
You use these words more than average: [list]
Your phrases: [signature_phrases]

### Narrative Pattern
You typically start stories with: [openings]
You tend to: [temporal_flow, detail_density]

### Sensory Preferences
You naturally describe: [dominant senses]

### People in Your Story
[people_references with mention counts]

### Profile Stats
- Sessions: [total]
- Entries: [total]
- Profile building since: [date]
```

---

## Integration Points

### With LIFE-01 (Entry Processor)

```
After LIFE-01 saves entry:
→ LIFE-00 runs voice analysis
→ Updates vocabulary patterns
→ Updates sentence patterns
→ Checks for new themes
```

### With LIFE-05 (Emotion Excavator)

```
Before generating deepening questions:
→ Load preferences.deepening_style
→ Check sensitive_topics
→ Load conversation_patterns.best_question_types
→ Adapt question style
```

### With LIFE-12/13/14 (Input Skills)

```
Track which input mode is used:
→ Update input_analytics
→ Learn preferred_mode over time
→ Adapt prompts to mode
```

### With Book Generation (LIFE-20+)

```
Before generating any prose:
→ Activate ghostwriter mode
→ Inject voice constraints
→ Verify output matches voice
```

---

## Anti-Patterns

**DO NOT**:
- Update profile after single observations (wait for patterns)
- Use [emerging] patterns in ghostwriter mode
- Push on topics marked as sensitive
- Assume preferences without evidence
- Generate prose that doesn't match his voice
- Forget previous sessions

**DO**:
- Let patterns emerge naturally over many sessions
- Respect stated preferences immediately
- Track sensitivity through behavioral signals
- Build continuity across sessions
- Preserve his authentic voice in all output
- Grow the profile session by session

---

## Success Criteria

- Voice profile grows richer over time
- AI-generated prose sounds like Hamza
- Questions match his energy and style
- Sensitive topics are handled appropriately
- Sessions feel connected, not isolated
- User feels truly understood

---

*Skill LIFE-00 v2.0 | Life Story System | 2024-12-24*
