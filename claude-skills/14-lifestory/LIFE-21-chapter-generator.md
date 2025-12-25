# LIFE-21: Chapter Generator

**Skill ID**: LIFE-21
**Category**: Life Story - Book Generation
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-25

---

## Purpose

Generate flowing prose from structured entries, transforming raw memories into polished narrative chapters. This skill uses LIFE-00's ghostwriter mode to ensure all generated text sounds like Hamza, not generic AI.

---

## When to Activate

**Manual Invocation**:
```
/generate-chapter [chapter-id]    → Generate prose for a chapter
/generate-chapter --preview       → Show what would be generated without writing
```

**Automatic Triggers**:
- When a chapter has entries but no prose content
- After user approves chapter outline
- When user requests draft generation

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-00 | **CRITICAL** - Must activate ghostwriter constraints |
| LIFE-20 | Get chapter structure and entry list |
| LIFE-22 | Hand off to polisher after initial draft |
| LIFE-01 | Access entry content and metadata |
| LIFE-31 | Sync word counts after prose generation (silent) |
| LIFE-32 | Validate chapter data before save |

---

## Core Workflow

### Step 1: Load Context

Before generating any prose:

```
1. Load hamza-profile.md from /story-data/context/
2. Extract voice constraints:
   - Confirmed vocabulary patterns
   - Sentence length preferences
   - Opening/closing styles
   - People reference patterns (e.g., "Dad" not "father")
   - Sensory preferences
3. Load chapter definition from LIFE-20
4. Load all entries assigned to chapter
5. Identify characters and locations mentioned
```

### Step 2: Analyze Narrative Structure

```
1. Order entries chronologically or thematically (per chapter.narrative_arc)
2. Identify key moments from entries
3. Map emotional trajectory across entries
4. Find natural transition points
5. Note sensory details to preserve
```

### Step 3: Generate Prose

**Ghostwriter Constraints** (MANDATORY):

```
BEFORE generating ANY prose:
- Load vocabulary whitelist from voice profile
- Set sentence length target from profile
- Apply opening/closing style patterns
- Use confirmed people references ONLY
- Weight sensory preferences in descriptions

DURING generation:
- Check each sentence against vocabulary constraints
- Maintain rhythm from profile samples
- Preserve direct quotes from entries exactly
- Add transitions that match his style
- Never use words flagged as "avoid" in profile
```

**Generation Process**:

```
For each section in chapter:
  1. Write opening hook (match his opening style)
  2. Weave entry content into narrative flow
  3. Add sensory details (his preferred senses)
  4. Create transitions between memories
  5. Write section closing (match his style)

Final:
  - Write chapter closing
  - Calculate ghostwriter fidelity score
```

### Step 4: Validate Output

```
1. Check vocabulary against whitelist
2. Calculate average sentence length (compare to profile)
3. Verify people references use correct forms
4. Count sensory references by type
5. Generate ghostwriter fidelity score (target: 0.90+)
```

### Step 5: Data Integrity (Automatic)

After prose is generated and saved:

```
1. Calculate total word count of generated prose
2. Update chapter.current_word_count to include:
   - Sum of entry word counts
   - Plus generated prose word count (if chapter has own prose)
3. LIFE-31: Sync to book (silent)
   - Recalculate book.current_word_count from all chapters
4. No user output unless errors occur
```

This ensures the book's word count reflects generated prose automatically.

---

## Ghostwriter Fidelity Score

The system calculates how well generated prose matches Hamza's voice:

| Factor | Weight | Measurement |
|--------|--------|-------------|
| Vocabulary match | 30% | % of words in confirmed patterns |
| Sentence rhythm | 25% | Deviation from avg sentence length |
| Opening style | 15% | Pattern match to his openers |
| People references | 15% | Correct forms used |
| Sensory balance | 15% | Matches his sensory preferences |

**Score Interpretation**:
- 0.95+ : Excellent - sounds exactly like him
- 0.90-0.94 : Good - minor adjustments needed
- 0.80-0.89 : Moderate - needs polishing (LIFE-22)
- Below 0.80 : Poor - regenerate with tighter constraints

---

## Output Format

Generated prose is saved to the chapter file:

```yaml
---
chapter_id: C-001-03-01
status: drafting  # Updated from 'outline'
# ... other frontmatter
---

# The League Years

## Chapter Summary
[Existing summary preserved]

## Key Scenes
[Existing scenes preserved]

## Prose Draft

*Generated: 2024-12-25*
*Ghostwriter Score: 0.92*

---

[Generated prose here...]

---

### Generation Notes
- Vocabulary deviations: 3 words replaced
- Sentence length avg: 14 words (profile: 13)
- Sensory references: visual (5), auditory (3), memory (4)
```

---

## Command Details

### `/generate-chapter [chapter-id]`

Full generation workflow:

```
## Generating Chapter: The League Years

### Loading Context
- Voice profile: ✓ (23 patterns loaded)
- Chapter definition: ✓ (C-001-03-01)
- Entries: 1 (289 words source material)
- Characters: 0 linked
- Locations: 0 linked

### Analyzing Structure
- Narrative type: reflective
- Emotional arc: nostalgia → connection → bittersweet
- Key moments identified: 3
- Transition points: 2

### Generating Prose

[Progress indicator as sections are written]

### Validation
- Vocabulary match: 94%
- Sentence rhythm: 0.91 correlation
- Opening style: ✓ matched "reflective question"
- People references: N/A (none in chapter)
- Sensory balance: visual-heavy (matches profile)

**Ghostwriter Score: 0.92** ✓

### Output
Draft saved to: story-data/chapters/03-digital-worlds/01-the-league-years.md
Status updated: outline → drafting

Ready for polishing? Use `/polish-chapter C-001-03-01`
```

### `/generate-chapter --preview`

Shows plan without writing:

```
## Preview: Chapter Generation Plan

**Chapter**: The League Years (C-001-03-01)

### Source Material
- Entry E-2024-002: "The TF/Shaco Days" (289 words)

### Planned Structure
1. Opening hook: "A Steam message from someone I couldn't recognize..."
2. Section: The Partnership (from entry narrative)
3. Section: What Made Us Great (from entry details)
4. Closing: Connection to present

### Voice Constraints Active
- Vocabulary: 23 confirmed patterns
- Avg sentence: 13 words
- Opening style: "reflective question" or "sensory moment"
- Sensory focus: visual, memory

### Estimated Output
- Word count: ~800-1200 words
- Ghostwriter target: 0.90+

[Generate] [Cancel]
```

---

## Transition Patterns

Use these patterns to connect entries within a chapter:

**Time Transitions**:
```
- "That was before..." / "Later, when..."
- "Looking back now..." / "At the time..."
- "Years earlier..." / "By then..."
```

**Emotional Transitions**:
```
- "What I didn't know then..."
- "The feeling never quite..."
- "Something shifted after..."
```

**Memory Transitions**:
```
- "I can still see..." / "I can still hear..."
- "The memory comes back..."
- "When I think of [person/place]..."
```

Match transition style to Hamza's observed patterns from voice profile.

---

## Anti-Patterns

**Do NOT**:
- Generate prose without loading voice profile first
- Use vocabulary not in confirmed patterns
- Apply generic AI writing style
- Skip ghostwriter score calculation
- Modify direct quotes from entries
- Add invented details not in source entries

**DO**:
- Always load LIFE-00 context before generation
- Preserve exact wording from entries where possible
- Flag any vocabulary deviations for review
- Calculate and report fidelity score
- Ask for clarification on ambiguous content
- Offer revision if score is below 0.90

---

## Integration Example

```
User: /generate-chapter C-001-03-01

AI: Loading voice profile and chapter context...

Found 1 entry for "The League Years":
- E-2024-002: The TF/Shaco Days (289 words)

This entry is brief. The generated chapter will:
- Expand the narrative with sensory details (matching your preferences)
- Create an opening hook from the Steam message moment
- Develop the TF/Shaco partnership theme
- Add a reflective closing about the forgotten friendship

Estimated output: ~800 words
Voice constraints: Active (23 patterns loaded)

[Generate Now] [Preview First] [Add More Entries First]
```

---

## Success Criteria

- Generated prose achieves 0.90+ ghostwriter score
- Original entry content is preserved and enhanced
- Transitions feel natural, not mechanical
- Reader cannot distinguish AI from Hamza's writing
- Chapter status progresses: outline → drafting
- User feels the prose captures their voice

---

*Skill LIFE-21 v1.0 | Life Story System - Book Generation | 2024-12-25*
