# LIFE-02: Character Profile Manager

**Skill ID**: LIFE-02
**Category**: Life Story
**Priority**: High
**Version**: 1.1
**Last Updated**: 2024-12-24

---

## Purpose

Build and maintain profiles of people in Hamza's life story. Track relationships, appearances across entries, physical descriptions, voice patterns, and character arcs. Enable consistent characterization and identify unexplored relationship stories.

**Key Features (v1.1)**:
- **Progressions**: Track how people change over different life periods
- **Relations**: Link characters together (family trees, friend groups, work teams)
- **AI Context Control**: Determine what AI sees for each character

---

## When to Activate

**Automatic Triggers**:
- LIFE-01 processes an entry with new characters
- User mentions someone not in the character database
- User asks about a specific person
- Consistency check reveals character information

**Manual Invocation**:
```
"Create a profile for [name]"
"Tell me about [character]"
"Who appears most in my stories?"
"Update [character]'s profile"
"/character [name]"
```

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-01 | Receives character mentions from entry processing |
| LIFE-04 | Flags character inconsistencies |
| LIFE-05 | Suggests character-based deepening questions |
| LIFE-09 | Links characters across entries |

---

## Character Profile Structure

### Full Profile Template

```markdown
---
character_id: "[unique-id]"
name: "[Full Name or Known Name]"
aliases:
  - "[Nickname 1]"
  - "[How Hamza refers to them]"
relationship: "[Specific relationship]"
relationship_category: family | friend | mentor | colleague | romantic | other
birth_year: [YYYY or null]
death_year: [YYYY or null]
period_active:
  - start: "[Year or life period]"
    end: "[Year or life period or 'present']"
traits:
  - "[Trait 1]"
  - "[Trait 2]"
physical_description: "[Brief description]"
voice_characteristics: "[How they speak]"
defining_mannerisms: "[Habits, gestures, expressions]"

# NEW v1.1: Progressions - Track how this person changed over time
progressions:
  - period: "[life period, e.g., 'childhood', '1990-1995', 'college years']"
    description: "[How they were during this period]"
    traits: ["[trait1]", "[trait2]"]
    relationship_quality: "[How the relationship felt: close, distant, strained, etc.]"

# NEW v1.1: Relations - Explicit links to other characters
relations:
  - target_id: "[other-character-id]"
    relationship: "[how they relate: spouse, sibling, parent, child, friend, etc.]"
    direction: "[from this character's perspective]"
    period: "[when this relationship existed]"
    notes: "[Optional context]"

# NEW v1.1: AI Context Control
ai_visibility: always | when_detected | never
ai_priority: high | medium | low

# Existing fields
connections:
  - character_id: "[other-character-id]"
    relationship: "[how related]"
    period: "[when]"
first_mentioned_in: "[entry_id]"
entries_featured: ["[entry_id_1]", "[entry_id_2]"]
mention_count: [N]
last_updated: [YYYY-MM-DD]
---

# [Name]

## Who They Are
[Narrative description of this person and their role in Hamza's life]

## Physical Appearance
[Detailed physical description - helps with vivid writing]

## Voice and Mannerisms
[How they spoke, distinctive habits, expressions they used]
[Include actual phrases or sayings if remembered]

## Key Relationship Moments
[Pivotal moments in the relationship with Hamza]

## Character Arc
[How the relationship or person changed over time]

## Their Impact
[How they shaped Hamza, lessons learned, influence]

## Unresolved Questions
[Things worth exploring in future entries]

---

## Entry Appearances
<!-- Auto-populated by system -->
| Entry | Period | Role |
|-------|--------|------|
| [entry_id] | [time] | [protagonist/supporting/mentioned] |

---

*Profile created: [date] | Last updated: [date]*
```

---

## Character ID Convention

### Naming Pattern
```
Family: father, mother, brother-elder, sister-younger, grandmother-paternal
Friends: childhood-best-friend, college-roommate-ali, [name]-friend
Mentors: teacher-grade5-math, boss-first-job, [name]-mentor
Colleagues: coworker-[name], manager-[company]
Romantic: partner-[name], [name]-romantic
Other: neighbor-[descriptor], doctor-[specialty], [role]-[name]
```

### Examples
```
father                    → Hamza's father
uncle-rashid              → Uncle named Rashid
childhood-best-friend     → Unnamed childhood friend
teacher-ms-khan           → Teacher named Ms. Khan
first-boss               → First professional boss
cousin-ali               → Cousin named Ali
```

---

## Core Functions

### 1. Create New Profile

When a new character is mentioned:

```
Step 1: Extract from context
- Name or descriptor
- Relationship to Hamza
- Time period of interaction
- Any physical or personality details

Step 2: Generate character_id
- Follow naming convention
- Check for duplicates

Step 3: Create stub profile
- Minimum viable information
- Mark gaps for future filling

Step 4: Link to entry
- Add to first_mentioned_in
- Add to entries_featured list
```

**Stub Profile Example**:
```markdown
---
character_id: "uncle-rashid"
name: "Uncle Rashid"
aliases: []
relationship: "paternal uncle"
relationship_category: family
birth_year: null
death_year: null
period_active:
  - start: "childhood"
    end: "[UNKNOWN]"
traits: []
physical_description: "[TO BE FILLED]"
first_mentioned_in: "E-2024-003"
entries_featured: ["E-2024-003"]
mention_count: 1
last_updated: 2024-12-24
---

# Uncle Rashid

## Who They Are
Hamza's paternal uncle. First mentioned in story about [context].

## Profile Status: STUB
This profile needs more information. Questions to explore:
- What does Uncle Rashid look like?
- What is he known for in the family?
- When did Hamza spend time with him?

---

*Profile created: 2024-12-24 | Status: Stub*
```

### 2. Update Existing Profile

When a character appears in a new entry:

```
Step 1: Locate existing profile
Step 2: Add entry to entries_featured
Step 3: Increment mention_count
Step 4: Extract new information
- New traits mentioned?
- Physical details added?
- Time period extended?
- New relationships revealed?
Step 5: Update profile sections
Step 6: Update last_updated date
```

### 3. Merge Duplicate Characters

When the same person is mentioned differently:

```
Example: "my father" and "Dad" and "Abbu"

Step 1: Identify potential duplicates
- Same relationship + same period = likely same person
- User confirmation if uncertain

Step 2: Merge profiles
- Keep all aliases
- Combine entries_featured
- Aggregate information
- Resolve conflicts by asking user

Step 3: Update all entries
- Standardize character_id reference
```

### 4. Character Relationship Mapping

Track connections between characters:

```yaml
connections:
  - character_id: "mother"
    relationship: "spouse"
    period: "1980-present"
  - character_id: "uncle-rashid"
    relationship: "brother"
    period: "birth-present"
  - character_id: "grandmother-paternal"
    relationship: "mother"
    period: "1950-2010"
```

---

## Progressions: Tracking Change Over Time (v1.1)

People change. A father in childhood is different from a father in adulthood. Progressions capture how characters evolved across Hamza's life.

### Why Progressions Matter

- **Same person, different eras**: Your relationship with someone at age 8 vs age 28
- **Character development**: How someone grew, softened, hardened over time
- **Context for AI**: When writing about 1995, AI knows which "version" of the person fits
- **Rich character arcs**: See the full journey of a relationship

### Progression Structure

```yaml
progressions:
  - period: "childhood (1985-1995)"
    description: "Distant, working long hours at the factory. Rarely home before 8pm."
    traits: ["absent", "provider", "strict", "tired"]
    relationship_quality: "distant but respected"

  - period: "teenage years (1995-2003)"
    description: "Started connecting more. Taught me to drive. Had our first real conversations."
    traits: ["present", "mentor", "opening up"]
    relationship_quality: "growing closer"

  - period: "college (2003-2007)"
    description: "Proud but worried. Weekly phone calls. First time he said 'I believe in you.'"
    traits: ["supportive", "anxious", "proud"]
    relationship_quality: "supportive from distance"

  - period: "adulthood (2007-present)"
    description: "Best friends now. Video calls twice a week. He asks for my advice."
    traits: ["friend", "advisor", "vulnerable", "proud"]
    relationship_quality: "close, mutual respect"
```

### When to Create Progressions

- When the same person appears in different life periods
- When you notice trait contradictions (LIFE-04 may flag these)
- When asked "how did your relationship with X change?"
- When writing reveals different "versions" of someone

### Progression Questions to Ask

- "How was [name] different when you were a child vs now?"
- "Was there a turning point in your relationship with [name]?"
- "What changed about [name] over the years?"
- "When did [name] start to [trait]?"

---

## Relations: Linking Characters Together (v1.1)

Characters don't exist in isolation. Father has a spouse (mother), siblings (uncles), parents (grandparents). Relations make these connections explicit.

### Why Relations Matter

- **Family trees**: Understand who's connected to whom
- **AI context**: When discussing father, AI knows about his family
- **Story connections**: Find entries where related people appear together
- **Gap identification**: "You've written about your father's brother, but never his sister"

### Relations Structure

```yaml
relations:
  # From Father's profile
  - target_id: "mother"
    relationship: "spouse"
    direction: "married to"
    period: "1980-present"
    notes: "Arranged marriage, grew into love"

  - target_id: "uncle-rashid"
    relationship: "sibling"
    direction: "brother"
    period: "birth-present"
    notes: "Younger brother, close growing up"

  - target_id: "grandmother-paternal"
    relationship: "parent"
    direction: "son of"
    period: "1955-2010"
    notes: "Her favorite, always defended him"

  - target_id: "hamza"
    relationship: "child"
    direction: "father of"
    period: "1985-present"
    notes: "First son"
```

### Relation Types

| Type | Examples |
|------|----------|
| **Family** | spouse, parent, child, sibling, grandparent, grandchild, aunt/uncle, cousin |
| **Friends** | best-friend, childhood-friend, college-friend, neighbor |
| **Professional** | boss, mentor, colleague, employee, teacher, student |
| **Romantic** | partner, ex-partner, spouse, first-love |
| **Other** | landlord, doctor, coach, rival |

### Bidirectional Relations

When you add a relation, consider adding the reverse:

```yaml
# In Father's profile
relations:
  - target_id: "mother"
    relationship: "spouse"

# In Mother's profile (should also have)
relations:
  - target_id: "father"
    relationship: "spouse"
```

### Relation Groups

Group related characters for context:

```yaml
# In childhood-best-friend's profile
relations:
  - target_id: "friend-ahmed"
    relationship: "friend"
    notes: "Part of the same friend group"
  - target_id: "friend-omar"
    relationship: "friend"
    notes: "Part of the same friend group"

# This creates a "friend group" that AI can understand
```

---

## AI Context Control (v1.1)

Control what information AI sees when writing stories.

### AI Visibility

```yaml
ai_visibility: always | when_detected | never
```

| Setting | Behavior |
|---------|----------|
| `always` | Always include this character's context when writing |
| `when_detected` | Include only when character is mentioned (default) |
| `never` | Never include - private notes, not for AI |

### AI Priority

```yaml
ai_priority: high | medium | low
```

When context window is limited:
- `high`: Always included first (core family, main characters)
- `medium`: Included when relevant (friends, mentors)
- `low`: Included only when specifically mentioned (minor characters)

### Example Usage

```yaml
# Father - always relevant
ai_visibility: always
ai_priority: high

# College roommate - only when discussing college
ai_visibility: when_detected
ai_priority: medium

# Private notes about difficult person - keep from AI
ai_visibility: never
ai_priority: low
```

---

## Profile Enrichment Questions

When a profile is sparse, suggest questions:

### For Family Members
- "What did [name] look like? Any distinctive features?"
- "What was [name]'s voice like? Any phrases they always said?"
- "What role did [name] play in family gatherings?"
- "What's your earliest memory of [name]?"
- "How did your relationship with [name] change over time?"

### For Friends
- "How did you meet [name]?"
- "What did you do together most often?"
- "What made [name] a good friend?"
- "Is there a moment that defined your friendship?"
- "Are you still in touch? If not, how did the friendship end?"

### For Mentors/Authority Figures
- "What did [name] teach you?"
- "Was there a moment they really believed in you?"
- "What did they expect from you?"
- "How did they influence decisions you've made?"

### For All Characters
- "If [name] walked into a room, how would you know it was them?"
- "What would [name] say about [relevant topic from entry]?"
- "What did you never get to say to [name]?"

---

## Character Analysis

### Frequency Report
```
Top 10 Most Mentioned Characters:
1. Father (34 mentions across 28 entries)
2. Mother (31 mentions across 25 entries)
3. Best Friend X (18 mentions across 12 entries)
...

Characters Mentioned Only Once:
- taxi-driver-wedding (E-2024-015)
- stranger-on-train (E-2024-022)
```

### Relationship Density
```
Periods with Most Character Activity:
1. Childhood (1985-1995): 12 unique characters
2. College Years (2003-2007): 8 unique characters
3. First Job (2008-2010): 6 unique characters

Underexplored Periods:
- High School (1995-2003): Only 3 characters profiled
```

### Character Gaps
```
Characters Needing Development:
- grandmother-maternal: 5 mentions, no physical description
- first-boss: 3 mentions, no voice/mannerisms
- childhood-best-friend: 7 mentions, still unnamed

Suggested Actions:
- "Tell me more about your maternal grandmother"
- "What was your first boss like in person?"
- "What was your childhood best friend's name?"
```

---

## Storage Structure

```
/story-data/characters/
├── family/
│   ├── father.md
│   ├── mother.md
│   ├── grandmother-paternal.md
│   └── uncle-rashid.md
├── friends/
│   ├── childhood-best-friend.md
│   └── college-roommate-ali.md
├── mentors/
│   ├── teacher-ms-khan.md
│   └── first-boss.md
├── colleagues/
├── romantic/
└── other/
    └── neighbor-uncle.md
```

---

## Integration with Other Skills

### With LIFE-01 (Entry Processor)
```
Entry processed → Extract characters →
For each character:
  If exists: Update profile, add entry
  If new: Create stub profile
```

### With LIFE-04 (Consistency Guardian)
```
Check for:
- Conflicting birth/death years
- Relationship contradictions
- Timeline impossibilities
- Character present in wrong period
```

### With LIFE-05 (Emotion Excavator)
```
For underdeveloped characters, generate:
- "Tell me more about [name]'s personality"
- "What did your relationship with [name] feel like?"
```

### With LIFE-09 (Story Connector)
```
Find entries that feature:
- Same character in different periods
- Interacting characters (e.g., father and grandfather)
- Character relationships that evolved
```

---

## Output Examples

### Character Summary
```
## Character: Father

**Mentions**: 34 entries
**Period**: 1985-present
**Status**: Active, well-developed profile

**Recent Appearances**:
- E-2024-025: "Learning to Drive" (protagonist)
- E-2024-018: "The Argument" (protagonist)
- E-2024-012: "Family Dinner" (supporting)

**Profile Completeness**: 85%
Missing: voice characteristics, some physical details

**Suggested Exploration**:
"What did your father's hands look like? What did they do?"
```

### New Character Alert
```
## New Character Detected

**Entry**: E-2024-028 "The Interview"
**Character**: "The interviewer with the blue tie"

**Extracted Information**:
- Role: Interviewer at tech company
- Period: 2015
- Traits: Direct, intimidating

**Action Needed**:
- Create stub profile as: interviewer-2015-tech
- Or link to existing character?

[Create Profile] [Link to Existing] [Skip - Minor Character]
```

---

## Anti-Patterns

**Do NOT**:
- Create separate profiles for obvious duplicates
- Invent character details not mentioned
- Delete characters even if minor
- Assume relationships (ask if unclear)
- Over-categorize (keep it simple)

**DO**:
- Ask when character identity is ambiguous
- Track even minor characters (they may recur)
- Note uncertainty explicitly
- Preserve Hamza's naming conventions
- Link family relationships bidirectionally

---

## Success Criteria

- Every mentioned person has a profile
- Profiles grow richer over time
- Relationships are mapped correctly
- No duplicate characters exist
- Character information is consistent across entries
- Underdeveloped profiles are flagged for exploration
- **v1.1**: Progressions capture how people changed over time
- **v1.1**: Relations link characters together correctly
- **v1.1**: AI context control is respected

---

## Changelog

### v1.1 (2024-12-24)
- Added **Progressions** system to track character changes over time
- Added **Relations** system to link characters together
- Added **AI Context Control** (visibility and priority settings)
- Updated profile template with new fields

### v1.0 (2024-12-24)
- Initial release with core character tracking

---

*Skill LIFE-02 v1.1 | Life Story System | 2024-12-24*
