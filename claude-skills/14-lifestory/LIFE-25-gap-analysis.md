# LIFE-25: Gap Analysis

**Skill ID**: LIFE-25
**Category**: Life Story
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-27

---

## Purpose

Identify people, places, events, and life details mentioned in transcripts that aren't yet documented. Build a "leads database" of potential stories and topics to explore, and automatically suggest these during biographer sessions.

**Philosophy**: You mention people and places constantly in conversation. Each mention is a potential doorway to a story.

---

## When to Activate

**Triggers**:
- User runs `/transcript gaps` after ingestion
- User runs `/transcript all` (gaps is part of full analysis)
- User asks to find undocumented mentions
- Transcript has been ingested via LIFE-17

**Dependencies**:
- Requires LIFE-17 to have ingested a transcript first
- Cross-references LIFE-02 (Character Registry)
- Cross-references LIFE-11 (Location Registry)
- Cross-references existing entries
- Consults LIFE-18's sarcasm_vocabulary

---

## Core Behavior

### What This Skill Does

1. **Extract named entities** from Hamza's speaking turns:
   - People (names, relationships, nicknames)
   - Places (cities, buildings, neighborhoods, specific locations)
   - Time periods referenced
   - Events and occasions
2. **Cross-reference** with existing data:
   - Character registry (LIFE-02)
   - Location registry (LIFE-11)
   - Existing entries
3. **Identify gaps**:
   - New people not in registry
   - New places not in registry
   - Events referenced but not documented
   - Time periods with sparse coverage
   - Existing entries that could be expanded
4. **Generate leads** and add to leads database
5. **Create potential biographer questions**
6. **Offer actions** (add to registry, queue question, expand entry)

### What This Skill Does NOT Do

- Update voice profile (that's LIFE-18)
- Extract full stories (that's LIFE-19)
- Create entries directly
- Assume every mention is significant (ask first)

---

## User Interaction

### Running Gap Analysis

```
User: /transcript gaps

AI: "Analyzing T-2024-001 for gaps...

     GAP ANALYSIS RESULTS:

     ═══════════════════════════════════════════════════════
     NEW PEOPLE (not in character registry)
     ═══════════════════════════════════════════════════════

     1. 'Uncle Rashid'
        Context: 'Uncle Rashid taught me chess when I was like 8'
        Relationship: Uncle (paternal or maternal unclear)
        Potential story: Chess lessons, childhood visits
        → Add to character registry? [Y/n]

     2. 'Sarah'
        Context: Colleague, multiple mentions (5x)
        Relationship: Work colleague, seems friendly
        Note: Not a story lead, just a conversation partner
        → Add to character registry? [Y/n/skip]

     ═══════════════════════════════════════════════════════
     NEW PLACES
     ═══════════════════════════════════════════════════════

     3. 'The coffee shop on 5th'
        Context: Mentioned twice, seems significant
        'That coffee shop on 5th where we used to study'
        Potential story: College study spot, routine
        → Add to location registry? [Y/n]

     4. 'Karachi flat'
        Context: 'The Karachi flat, you know, where we lived before'
        Already have 'Karachi' but this is specific residence
        Potential story: Early childhood home
        → Add as sub-location? [Y/n]

     ═══════════════════════════════════════════════════════
     ENTRIES THAT COULD BE EXPANDED
     ═══════════════════════════════════════════════════════

     5. E-2024-002 mentions grandmother briefly
        But here you shared: 'She used to make these amazing
        parathas every morning, I can still smell them'
        → Add this detail to the entry? [Y/n]

     ═══════════════════════════════════════════════════════
     POTENTIAL BIOGRAPHER QUESTIONS
     ═══════════════════════════════════════════════════════

     Based on gaps, these questions could unlock stories:

     - 'You mentioned Uncle Rashid taught you chess.
        What was he like?'
     - 'Tell me about the coffee shop on 5th.
        Why was it your study spot?'
     - 'The Karachi flat - what do you remember about
        living there?'

     → Queue these for next /biographer session? [Y/n]"
```

### Adding to Leads Database

```
User: Y for all, but skip Sarah (not a story lead)

AI: "Updated:

     ✓ Uncle Rashid → Added to leads database
       Status: unexplored
       Will suggest in next /biographer

     ✗ Sarah → Skipped (not a story lead)

     ✓ Coffee shop on 5th → Added to leads database
       Also added to location registry as 'college-study-spot'

     ✓ Karachi flat → Added to leads database
       Also added as sub-location under 'Karachi'

     ✓ Grandmother detail → Queued for E-2024-002 expansion
       Will suggest next time you revisit that entry

     ✓ 3 biographer questions → Queued

     Leads database updated: 4 new unexplored leads"
```

---

## Entity Extraction

### People Detection

- **Names**: "Uncle Rashid", "my friend Derek", "Sarah"
- **Relationships**: "my grandmother", "my college roommate"
- **Nicknames**: "Nani" (grandmother), "Bhai" (brother)
- **Titles**: "Professor Khan", "Coach Williams"

### Place Detection

- **Cities**: "Karachi", "San Francisco", "back in Boston"
- **Specific locations**: "the coffee shop on 5th", "our old flat"
- **Relative locations**: "where we used to live", "that park near school"
- **Significant places**: Any location mentioned multiple times or with emotion

### Time Period Detection

- **Specific**: "when I was 8", "in college", "last summer"
- **Relative**: "before we moved", "after graduation"
- **Decade/era**: "the 90s", "growing up"

### Event Detection

- **Named events**: "Eid", "graduation", "the wedding"
- **Implied events**: "when we moved", "after the accident"
- **Recurring**: "every summer", "Sunday dinners"

---

## Leads Database

### Structure

Located at `/story-data/context/leads.md`:

```yaml
---
leads:
  - id: L-2024-001
    type: person
    name: "Uncle Rashid"
    context: "Taught Hamza chess, mentioned in T-2024-001"
    quote: "Uncle Rashid taught me chess when I was like 8"
    potential_story: "Chess lessons with uncle"
    source_transcript: T-2024-001
    discovered_at: 2024-12-27
    status: unexplored
    notes: ""

  - id: L-2024-002
    type: place
    name: "Coffee shop on 5th"
    context: "College study spot, mentioned twice"
    quote: "That coffee shop on 5th where we used to study"
    potential_story: "College study routines"
    source_transcript: T-2024-001
    discovered_at: 2024-12-27
    status: unexplored
    notes: ""

  - id: L-2024-003
    type: expansion
    entry_id: E-2024-002
    detail: "Grandmother's parathas, smell memory"
    quote: "She used to make these amazing parathas every morning"
    source_transcript: T-2024-001
    discovered_at: 2024-12-27
    status: unexplored
    notes: ""

last_updated: 2024-12-27
total_leads: 3
unexplored_count: 3
---
```

### Lead Status Values

- `unexplored` - New lead, not yet discussed
- `questioned` - Explored in biographer session
- `captured` - Story extracted and saved as entry
- `dismissed` - User decided not worth pursuing

---

## Biographer Integration

When user starts `/biographer`, LIFE-13 checks leads database:

```
User: /biographer

AI: "Before we start, I noticed some unexplored leads
     from your transcripts:

     FROM TRANSCRIPTS:
     - Uncle Rashid (taught you chess) [T-2024-001]
     - The coffee shop on 5th [T-2024-001]
     - Your grandmother's parathas [could expand E-2024-002]

     Would you like to explore one of these,
     or start fresh with something else?"
```

### Lead Status Updates

```
During biographer session about Uncle Rashid:

1. Status: unexplored → questioned
   └─ Lead was discussed

2. If story emerges:
   Status: questioned → captured
   └─ Link to resulting entry: E-2024-015

3. If user dismisses:
   Status: questioned → dismissed
   └─ Note: "Not much of a story, just casual mention"
```

---

## Cross-Reference Logic

### Checking Character Registry (LIFE-02)

```
Mention: "Uncle Rashid"
Registry check: No match for "Rashid" or "Uncle Rashid"
Result: NEW PERSON → Add to leads
```

```
Mention: "my grandmother"
Registry check: Found "grandmother-maternal" (Nani)
Result: KNOWN PERSON → Check if new details
```

### Checking Location Registry (LIFE-11)

```
Mention: "the Karachi flat"
Registry check: Found "Karachi" but not specific flat
Result: NEW SUB-LOCATION → Suggest adding
```

### Checking Existing Entries

```
Mention: "grandmother's parathas, the smell"
Entry check: E-2024-002 mentions grandmother briefly
Result: EXPANSION OPPORTUNITY → Suggest adding detail
```

---

## Integration

### With LIFE-17 (Transcript Ingestion)

- Receives `transcript_id` and `hamza_turns` from LIFE-17
- Reads full transcript for context when needed

### With LIFE-18 (Voice Mining)

- Consults `sarcasm_vocabulary` when interpreting mentions
- Avoids creating leads from sarcastic statements
  - "Best boss ever" (sarcasm) → Don't lead with "tell me about your great boss"

### With LIFE-02 (Character Registry)

- Cross-references to find new people
- Can add new people directly to registry with user approval

### With LIFE-11 (Location Registry)

- Cross-references to find new places
- Can add new locations directly to registry with user approval

### With LIFE-13 (Biographer)

- Leads are automatically suggested at session start
- Lead status updated during/after sessions

### With Existing Entries

- Cross-references to find expansion opportunities
- Links leads to specific entries that could grow

---

## Commands

```
/transcript gaps       → Run gap analysis on last transcript
/transcript gaps [id]  → Run on specific transcript
/leads                 → View all leads
/leads unexplored      → View only unexplored leads
/leads [id]            → View specific lead
/leads dismiss [id]    → Mark lead as dismissed
```

---

## Anti-Patterns

**DO NOT**:
- Create leads from every name mentioned
- Assume conversation partners are story leads (often not)
- Generate questions from sarcastic mentions
- Add people/places to registries without asking
- Create entries directly (leads feed biographer)

**DO**:
- Focus on mentions with story potential
- Note context and quotes for each lead
- Ask before adding to registries
- Update lead status as they're explored
- Cross-reference before flagging as new

---

## Examples

### Rich Transcript

```
User: /transcript gaps

AI: "Found significant gaps in T-2024-005:

     NEW PEOPLE:
     - 'Professor Martinez' - physics teacher, seems significant
       'Professor Martinez is the reason I got into engineering'
     - 'Jenny from the lab' - college friend
       Mentioned with fondness, multiple stories

     NEW PLACES:
     - 'The physics building basement'
       'We basically lived in the physics building basement'

     TIME PERIODS SPARSE:
     - Early college years (freshman/sophomore)
       This transcript references this period heavily but
       you only have 1 entry from that time

     POTENTIAL EXPANSIONS:
     - E-2024-003 mentions 'getting into engineering' briefly
       This transcript has much more detail on that journey

     4 new leads added. Queue biographer questions? [Y/n]"
```

### Minimal Gaps

```
User: /transcript gaps

AI: "Analyzed T-2024-006. Few new gaps:

     Most people and places mentioned are already documented.

     MINOR FINDS:
     - 'The airport incident' - mentioned but no entry exists
       Not enough context to create full lead
       → Flag for follow-up? [Y/n]

     No major gaps. Your transcripts are aligning well
     with your documented life story."
```

---

## Success Criteria

- New people and places correctly identified
- Sarcasm doesn't generate misleading leads
- Leads integrate smoothly with biographer
- Character/location registries stay current
- Entry expansion opportunities caught
- Lead status tracked through lifecycle

---

*Skill LIFE-25 v1.0 | Life Story System | 2024-12-27*
