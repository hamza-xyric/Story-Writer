# LIFE-04: Consistency Guardian

**Skill ID**: LIFE-04
**Category**: Life Story
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-24

---

## Purpose

Check for contradictions, timeline impossibilities, and factual inconsistencies across Hamza's story entries. Flag issues gently for clarification rather than correction - memory is subjective, and some "inconsistencies" may reveal deeper truths.

---

## When to Activate

**Automatic Triggers**:
- After LIFE-01 processes a new entry
- When character profiles are updated
- When timeline is modified
- Periodic consistency sweeps

**Manual Invocation**:
```
"Check this entry for consistency"
"Are there any contradictions in my stories?"
"Validate my timeline"
"/consistency-check"
```

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-01 | Check new entries against existing corpus |
| LIFE-02 | Validate character information |
| LIFE-03 | Verify timeline coherence |
| LIFE-05 | Turn inconsistencies into exploration prompts |

---

## Philosophy

### Memory is Not History
- Human memory is reconstructive, not recorded
- The same event can be remembered differently at different times
- Emotional truth may differ from factual truth
- Inconsistencies often reveal what matters most

### Gentle Flagging
- Never accuse of "lying" or being "wrong"
- Frame as curiosity, not correction
- Offer the chance to explore the discrepancy
- Accept "both are true" as valid

### Types of Inconsistencies

| Type | Severity | Approach |
|------|----------|----------|
| Timeline impossible | High | Must resolve |
| Character contradiction | Medium | Clarify |
| Detail variation | Low | Note, don't force |
| Emotional shift | None | Expected and valid |

---

## Consistency Categories

### 1. Timeline Consistency

**Check For**:
```
Impossible sequences:
- Event B before Event A, but A caused B
- Character present before birth or after death
- "I was 10 in 1995" but birth year is 1990

Conflicting dates:
- "I started college in 2003" vs "My first semester was Fall 2004"
- "We moved when I was 7" (two different years mentioned)

Duration conflicts:
- "I worked there for 5 years" but start/end dates show 3 years
- "That summer" referenced in different years
```

**Resolution Approach**:
```
"In entry E-2024-015, you mentioned starting college in 2003,
but in E-2024-022, you describe arriving at college in Fall 2004.
Which feels more accurate? Or is there a story behind both dates?"
```

### 2. Character Consistency

**Check For**:
```
Biographical conflicts:
- Different birth/death years mentioned
- Conflicting relationships ("uncle" vs "family friend")
- Name spelling variations that might be different people

Presence conflicts:
- Character at event but also described as elsewhere
- Character alive in story after mentioned death
- Character too young/old for described role

Trait conflicts:
- "My quiet father" vs "Dad was always loud"
- Significant personality changes without explanation
```

**Resolution Approach**:
```
"In 'Summer at Grandma's', you describe your father as reserved and quiet,
but in 'The Birthday Party', he's the life of the party. Was he different
in different settings, or did he change over time? This could be a
fascinating aspect of his character to explore."
```

### 3. Location Consistency

**Check For**:
```
Geographic impossibilities:
- Two places at once
- Travel time that doesn't make sense
- Location described differently (different floor, different city)

Residential timeline:
- Living in different places at same time
- Moving dates that conflict
```

### 4. Fact Consistency

**Check For**:
```
Numbers:
- "5 siblings" vs "my 3 brothers and sister" (= 4)
- Age calculations that don't match birth year
- Amounts of money, durations, quantities

Names:
- Same person with different names (might be typo or alias)
- Same name for different people (disambiguation needed)

Events:
- Same event described with different details
- Event sequence that contradicts itself
```

---

## Detection Algorithm

### Step 1: Index Key Facts
For each entry, extract:
```yaml
facts:
  - type: timeline
    claim: "Started college"
    value: "2003"
    entry: "E-2024-015"
    confidence: high  # explicit date

  - type: character
    claim: "Father's personality"
    value: "quiet, reserved"
    entry: "E-2024-012"
    context: "at home"

  - type: location
    claim: "Living in"
    value: "Karachi"
    period: "childhood"
    entry: "E-2024-008"
```

### Step 2: Cross-Reference
Compare new entry facts against indexed facts:
```
For each fact in new_entry:
  Find related facts in index
  Check for:
    - Direct contradiction
    - Timeline conflict
    - Ambiguous overlap
  Score conflict severity
```

### Step 3: Classify Issues
```
CRITICAL: Timeline impossible, must resolve
  → "Your grandfather appears in a 2015 story but passed away in 2010"

CLARIFY: Contradiction worth understanding
  → "Two different first-day-of-school stories in different years"

NOTE: Minor variation, log but don't interrupt
  → "Age mentioned as 'around 10' in one place, '11 or 12' in another"

EXPLORE: Interesting discrepancy, potential story
  → "Your description of the house changes - did it change, or did your perception?"
```

### Step 4: Present Findings
Only surface issues that matter:
- Always surface CRITICAL
- Surface CLARIFY after entry is saved
- Log NOTE silently
- Suggest EXPLORE during deepening sessions

---

## Consistency Log Format

Store issues in `/metadata/consistency-log.md`:

```markdown
# Consistency Log

## Open Issues

### CRITICAL: Timeline Conflict
**Detected**: 2024-12-24
**Entries**: E-2024-015, E-2024-022
**Issue**: College start date
**Details**:
- E-2024-015 states "started college in 2003"
- E-2024-022 describes "arriving Fall 2004"
**Status**: Awaiting clarification
**Resolution**: [To be filled]

---

### CLARIFY: Character Trait Variation
**Detected**: 2024-12-24
**Entries**: E-2024-012, E-2024-018
**Issue**: Father's personality description
**Details**:
- E-2024-012: "quiet, reserved" (context: at home)
- E-2024-018: "loud, animated" (context: at parties)
**Status**: Noted
**Resolution**: Context-dependent behavior - both valid

---

## Resolved Issues

### [Resolved] CLARIFY: Sibling count
**Detected**: 2024-12-20
**Resolved**: 2024-12-22
**Resolution**: User clarified 4 biological siblings + 1 step-sibling

---

## Noted Variations (No Action Needed)
- Age approximations vary by 1-2 years in childhood memories
- House description varies (confirmed: renovations occurred)
```

---

## Integration Patterns

### With LIFE-01 (Entry Processor)
```
After entry saved:
1. Extract facts from new entry
2. Cross-reference with index
3. If CRITICAL found → Immediate alert
4. If CLARIFY found → Add to AI Notes
5. If NOTE found → Log silently
```

### With LIFE-02 (Character Manager)
```
When updating character profile:
1. Check new info against existing profile
2. Flag biographical conflicts
3. Note trait variations with context
```

### With LIFE-03 (Timeline Builder)
```
When adding to timeline:
1. Verify date doesn't conflict
2. Check character presence is possible
3. Validate sequence logic
```

### With LIFE-05 (Emotion Excavator)
```
Turn interesting inconsistencies into prompts:
"You remember this event two ways. Both feel true to you.
What does each version capture that the other doesn't?"
```

---

## Presentation Guidelines

### Tone
- Curious, not accusatory
- "I noticed..." not "You said..."
- "Could you help me understand..." not "This is wrong..."

### Framing
```
Good: "I found something interesting that might be worth exploring..."
Good: "There's a detail that appears differently in two stories..."
Good: "Can you help me understand the timeline here?"

Avoid: "There's an error in your story..."
Avoid: "You contradicted yourself..."
Avoid: "This doesn't make sense..."
```

### When to Surface
- CRITICAL: Immediately, but gently
- CLARIFY: After entry saved, in AI Notes
- NOTE: Never directly, only in logs
- EXPLORE: During dedicated deepening sessions

---

## Examples

### Example 1: Timeline Issue

**Entry 1** (E-2024-015):
> "I started college in Fall 2003. I remember because it was right after the blackout."

**Entry 2** (E-2024-022):
> "My freshman year began in 2004. I was 18."

**Detection**:
```yaml
conflict:
  type: timeline
  severity: CLARIFY
  entries: [E-2024-015, E-2024-022]
  claim: "College start year"
  values: ["2003", "2004"]
```

**Presentation**:
```
I noticed the college start date appears as both 2003 and 2004 in
different entries. The 2003 entry mentions the blackout (August 2003),
and the 2004 entry mentions being 18.

Could be:
- The blackout was before college, and you started in 2004
- You started in Fall 2003 at age 17
- One of the dates is a typo

No pressure to resolve now - I've noted it for when you want to clarify.
```

### Example 2: Character Variation

**Entry 1**: "My mother was always supportive of my creative pursuits."
**Entry 2**: "Mom never understood why I wanted to be an artist."

**Detection**:
```yaml
variation:
  type: character_trait
  severity: EXPLORE
  character: mother
  trait: "attitude toward creativity"
  values: ["supportive", "didn't understand"]
```

**Presentation**:
```
Your mother appears in two different lights regarding your creative path -
in one story supportive, in another uncertain. This isn't a contradiction
to fix - it might be one of the most interesting things about your
relationship with her.

If you'd like to explore: How did her feelings about your creative
work change over time? Or was she both at once?
```

### Example 3: Factual Discrepancy

**Entry 1**: "We lived on the third floor."
**Entry 2**: "I remember running up five flights of stairs to our apartment."

**Detection**:
```yaml
variation:
  type: fact
  severity: NOTE
  subject: "apartment floor"
  values: ["3rd floor", "5 flights"]
```

**Action**: Log silently. Could be ground floor not counted, or memory variation.
Not worth interrupting the user.

---

## Known Limitations

**Accept as Valid**:
- Emotional memories that vary (feelings change over time)
- Approximate ages (within 2-3 years for childhood)
- Sensory details that differ (memory is reconstructive)
- Stories told differently at different times (perspective shifts)

**Don't Flag**:
- "I was around 10" vs "I was 11"
- Weather/season variations unless plot-relevant
- Exact quotes that differ slightly
- Feelings that seem contradictory (complexity is human)

---

## Anti-Patterns

**Do NOT**:
- Treat memory like court testimony
- Require resolution of every discrepancy
- Make the user feel unreliable
- Prioritize factual accuracy over emotional truth
- Interrupt the writing flow with minor issues

**DO**:
- Trust that most variations are natural
- Surface only what genuinely matters
- Frame issues as opportunities for exploration
- Accept "I don't remember" as resolution
- Celebrate the complexity of human memory

---

## Success Criteria

- Critical timeline issues are caught
- User never feels accused or doubted
- Inconsistencies become story opportunities
- Log is maintained for reference
- Factual accuracy improves over time naturally
- Writing flow is not disrupted by minor issues

---

*Skill LIFE-04 v1.0 | Life Story System | 2024-12-24*
