# LIFE-22: Prose Polisher

**Skill ID**: LIFE-22
**Category**: Life Story - Book Generation
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-25

---

## Purpose

Refine drafted chapters to publication quality while maintaining strict voice fidelity. This skill takes LIFE-21's output and polishes it, fixing vocabulary deviations, smoothing transitions, and enhancing sensory details—all while ensuring the prose sounds authentically like Hamza.

---

## When to Activate

**Manual Invocation**:
```
/polish-chapter [chapter-id]     → Polish a drafted chapter
/polish-chapter --check          → Check fidelity without modifying
/polish-chapter --vocabulary     → Focus on vocabulary corrections only
/polish-chapter --transitions    → Focus on transition smoothing only
```

**Automatic Triggers**:
- After LIFE-21 completes initial draft
- When ghostwriter score is below 0.90
- Before export to PDF/EPUB

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-00 | Voice profile for constraint validation |
| LIFE-21 | Receives drafts for polishing |
| LIFE-23 | Hands off polished chapters for export |

---

## Polishing Workflow

### Step 1: Analyze Current Draft

```
1. Load chapter draft from /story-data/chapters/
2. Load voice profile from LIFE-00
3. Calculate current ghostwriter score
4. Identify specific issues:
   - Vocabulary deviations
   - Sentence length outliers
   - Transition weaknesses
   - Sensory imbalance
   - People reference inconsistencies
```

### Step 2: Create Polishing Plan

```
For each issue found:
  - Categorize (vocabulary, rhythm, transition, sensory, reference)
  - Locate in text (paragraph, sentence)
  - Propose fix with rationale
  - Mark confidence level
```

### Step 3: Apply Fixes

**Priority Order**:
1. **Vocabulary corrections** - Replace non-confirmed words
2. **People references** - Ensure correct forms (Dad, not father)
3. **Sentence rhythm** - Adjust overly long/short sentences
4. **Transitions** - Smooth abrupt connections
5. **Sensory enhancement** - Add missing sensory types

### Step 4: Validate & Score

```
1. Recalculate ghostwriter score
2. Compare before/after metrics
3. Flag any remaining issues
4. Generate polishing report
```

---

## Polishing Techniques

### Vocabulary Corrections

When a word isn't in confirmed vocabulary:

```
WRONG: "The camaraderie we shared was palpable."
       ↓ "camaraderie" and "palpable" not in vocabulary

RIGHT: "The connection we had was real, something you could feel."
       ↓ Uses "connection", "real", "feel" - confirmed patterns
```

**Process**:
1. Identify non-confirmed word
2. Look up in vocabulary patterns for alternatives
3. Preserve original meaning
4. Maintain sentence rhythm

### Sentence Rhythm

Target: Match Hamza's average sentence length (from profile)

```
TOO LONG (if profile avg is 13 words):
"The Steam message came through one afternoon when I was sitting at my desk
 not really doing anything important, just browsing through old friends lists."
 (26 words)

BETTER:
"The Steam message came through one afternoon. I was at my desk, browsing old
 friends lists. Not doing anything important."
 (3 sentences, avg 7 words - needs more variation)

BALANCED:
"A Steam message popped up one afternoon. I was at my desk, browsing through
 old friends lists without really thinking about it. The name didn't register
 at first."
 (3 sentences, avg 11 words - closer to profile)
```

### Transition Smoothing

Replace mechanical transitions with natural ones:

```
MECHANICAL: "Moving on to another memory, I recall..."
NATURAL: "That feeling comes back whenever..."

MECHANICAL: "Additionally, there was also the time when..."
NATURAL: "There was another night, late, when..."

MECHANICAL: "In conclusion, these memories show..."
NATURAL: "Looking at it now, I realize..."
```

### Sensory Balance

If profile shows visual preference but draft lacks visuals:

```
BEFORE: "We played together every night."

AFTER: "We played together every night, my room dark except for the monitor
        glow, the loading screen I'd seen a thousand times."
```

Add sensory details matching his preferences:
- **Visual**: scenes, colors, expressions, settings
- **Auditory**: voices, sounds, music, silence
- **Memory/Feel**: emotions, atmosphere, "feeling of"

---

## Command Details

### `/polish-chapter [chapter-id]`

Full polishing workflow:

```
## Polishing Chapter: The League Years

### Current State
- Status: drafting
- Word count: 847
- Current ghostwriter score: 0.87

### Issues Found

**Vocabulary (4 issues)**
1. Line 12: "camaraderie" → suggest "connection" or "bond"
2. Line 23: "palpable" → suggest "real" or "you could feel it"
3. Line 34: "subsequently" → suggest "after that" or "then"
4. Line 45: "commenced" → suggest "started" or "began"

**Rhythm (2 issues)**
1. Lines 15-16: Run-on sentence (34 words) → split
2. Line 38: Fragment feels abrupt → expand slightly

**Transitions (1 issue)**
1. Line 28: "Moving to the next point" → needs natural flow

**Sensory (1 issue)**
1. Overall: Low auditory references (profile shows 20% target)

### Applying Fixes...

[Progress indicator]

### Results
- New ghostwriter score: 0.94 (+0.07)
- Vocabulary: 4/4 corrected
- Rhythm: 2/2 smoothed
- Transitions: 1/1 improved
- Sensory: Added 3 auditory references

### Output
Polished draft saved to: story-data/chapters/03-digital-worlds/01-the-league-years.md
Status updated: drafting → review

Ready for final review? Read with `/read-chapter C-001-03-01`
```

### `/polish-chapter --check`

Analysis only, no changes:

```
## Fidelity Check: The League Years

**Ghostwriter Score: 0.87**

### Breakdown
| Factor | Score | Notes |
|--------|-------|-------|
| Vocabulary | 0.82 | 4 words outside patterns |
| Rhythm | 0.89 | 2 sentences need adjustment |
| Opening | 0.95 | Matches "sensory moment" style |
| References | 1.00 | No people mentioned |
| Sensory | 0.78 | Needs more auditory |

### Recommendations
1. Address vocabulary deviations (highest impact)
2. Add auditory sensory details
3. Split run-on sentence at line 15

Run `/polish-chapter C-001-03-01` to apply fixes.
```

---

## Vocabulary Whitelist Strategy

When replacing words, prioritize:

1. **Exact matches** from confirmed vocabulary
2. **Synonyms** he has used in other entries
3. **Simpler alternatives** that match his register
4. **Descriptive phrases** if no single word works

**Never use**:
- Words flagged as "avoid" in profile
- Academic/formal register (unless profile shows it)
- Clichés or idioms not in his patterns

---

## Status Progression

```
outline → drafting → review → revised → complete
          ↑          ↑        ↑
       LIFE-21   LIFE-22   LIFE-22
                (first)   (second pass if needed)
```

After polishing:
- Score ≥ 0.95 → status: revised (ready for final check)
- Score 0.90-0.94 → status: review (may need another pass)
- Score < 0.90 → status: drafting (needs more work)

---

## Output Format

Polished chapter includes polishing metadata:

```yaml
---
chapter_id: C-001-03-01
status: review
# ...
---

# The League Years

## Prose Draft

*Generated: 2024-12-25*
*Polished: 2024-12-25*
*Ghostwriter Score: 0.94*

---

[Polished prose here...]

---

### Polishing Notes
- Pass 1: 4 vocabulary, 2 rhythm, 1 transition, 3 sensory additions
- Score improvement: 0.87 → 0.94
- Remaining flags: None
```

---

## Anti-Patterns

**Do NOT**:
- Over-polish into generic "good writing"
- Remove quirks that are part of his voice
- Standardize sentence length too rigidly
- Add sensory details that feel forced
- Change meaning when fixing vocabulary

**DO**:
- Preserve his natural writing quirks
- Allow variation in sentence length
- Add sensory details that match context
- Keep original meaning when replacing words
- Flag uncertain changes for user review

---

## Success Criteria

- Ghostwriter score reaches 0.95+
- No vocabulary deviations remain
- Transitions feel natural
- Sensory balance matches profile
- Original voice and meaning preserved
- Reader cannot tell it was AI-polished

---

*Skill LIFE-22 v1.0 | Life Story System - Book Generation | 2024-12-25*
