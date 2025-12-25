# LIFE-11: Location Manager

**Skill ID**: LIFE-11
**Category**: Life Story
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-24

---

## Purpose

Build and maintain profiles of places in Hamza's life story. Track homes, schools, cities, workplaces, and significant locations. Like characters, places have history, change over time, and hold emotional weight. Enable vivid setting descriptions and identify unexplored location stories.

**Key Features**:
- **Location Profiles**: Rich descriptions of places that matter
- **Progressions**: Track how places changed over time
- **Relations**: Link locations to characters and other locations
- **AI Context Control**: Determine what AI sees for each location

---

## When to Activate

**Automatic Triggers**:
- LIFE-01 processes an entry with new locations
- User mentions a place not in the location database
- User asks about a specific place
- Consistency check reveals location information

**Manual Invocation**:
```
"Create a profile for [place]"
"Tell me about [location]"
"What places have I written about?"
"Where did I live during [period]?"
"/location [name]"
```

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-01 | Receives location mentions from entry processing |
| LIFE-02 | Links locations to characters (who lived/worked where) |
| LIFE-04 | Flags location inconsistencies |
| LIFE-05 | Suggests location-based deepening questions |
| LIFE-09 | Links locations across entries |

---

## Location Profile Structure

### Full Profile Template

```markdown
---
location_id: "[unique-id]"
name: "[Full Name or Known Name]"
aliases:
  - "[Nickname 1]"
  - "[How Hamza refers to it]"
type: home | school | workplace | city | country | neighborhood | landmark | other
address: "[Address or general location]"
city: "[City name]"
country: "[Country name]"
coordinates: "[Optional: lat, long]"

period_active:
  - start: "[Year or life period]"
    end: "[Year or life period or 'present']"
    role: "[What this place was: childhood home, school, workplace]"

# Progressions - Track how this place changed over time
progressions:
  - period: "[life period]"
    description: "[How the place was during this period]"
    physical_state: "[Condition, appearance]"
    emotional_association: "[How it felt to be there]"

# Relations - Link to characters and other locations
relations:
  - target_type: character | location
    target_id: "[character or location id]"
    relationship: "[lived there, worked there, nearby, etc.]"
    period: "[when]"
    notes: "[Optional context]"

# Physical Description
physical_description: "[What it looked like]"
sensory_details:
  sight: "[Visual details]"
  sound: "[What you heard there]"
  smell: "[Distinctive smells]"
  texture: "[What things felt like]"

# AI Context Control
ai_visibility: always | when_detected | never
ai_priority: high | medium | low

# Tracking
first_mentioned_in: "[entry_id]"
entries_featured: ["[entry_id_1]", "[entry_id_2]"]
mention_count: [N]
last_updated: [YYYY-MM-DD]
---

# [Location Name]

## What This Place Was

[Narrative description of this place and its role in Hamza's life]

## Physical Description

[Detailed physical description - helps with vivid setting]
[Layout, architecture, distinctive features]

## Sensory Memories

### Sights
[Visual memories - colors, lighting, what you saw from windows]

### Sounds
[What you heard - traffic, birds, voices, music]

### Smells
[Distinctive smells - cooking, flowers, industry, weather]

### Textures
[What things felt like - floors, furniture, walls]

## Key Moments Here

[Significant events that happened at this location]

## How It Changed

[How this place evolved over time - renovations, decay, neighborhood changes]

## Emotional Resonance

[What this place meant to you, how it made you feel]

## Who Was Here

[Characters associated with this location]

## Unresolved Questions

[Things worth exploring about this location]

---

## Entry Appearances
<!-- Auto-populated by system -->
| Entry | Period | Role |
|-------|--------|------|
| [entry_id] | [time] | [setting/mentioned] |

---

*Profile created: [date] | Last updated: [date]*
```

---

## Location ID Convention

### Naming Pattern
```
Homes: home-[descriptor] (home-childhood, home-first-apartment, home-current)
Schools: school-[level]-[name] (school-elementary-lincoln, school-university-ucla)
Workplaces: work-[company]-[role] (work-google-engineer, work-startup-founder)
Cities: city-[name] (city-karachi, city-new-york, city-london)
Countries: country-[name] (country-pakistan, country-usa)
Neighborhoods: neighborhood-[name] (neighborhood-clifton, neighborhood-queens)
Landmarks: landmark-[name] (landmark-eiffel-tower, landmark-grandmas-garden)
Other: place-[descriptor] (place-hospital-birth, place-wedding-venue)
```

### Examples
```
home-childhood           → House where Hamza grew up
home-first-apartment     → First solo apartment
school-high-riverdale    → Riverdale High School
work-first-job           → First workplace
city-karachi             → Karachi, Pakistan
neighborhood-clifton     → Clifton neighborhood
landmark-pier            → The pier from fishing memories
```

---

## Location Types

| Type | Description | Examples |
|------|-------------|----------|
| **home** | Residences | Childhood home, apartments, current house |
| **school** | Educational institutions | Elementary school, university, training center |
| **workplace** | Professional locations | Offices, factories, remote work spaces |
| **city** | Cities and towns | Places lived or visited significantly |
| **country** | Countries | Nations lived in or visited |
| **neighborhood** | Distinct areas | Neighborhoods, districts, quarters |
| **landmark** | Specific notable places | Parks, restaurants, significant spots |
| **other** | Everything else | Hospitals, venues, transit stations |

---

## Core Functions

### 1. Create New Location Profile

When a new location is mentioned:

```
Step 1: Extract from context
- Name or descriptor
- Type (home, school, workplace, etc.)
- Time period of association
- Any physical or sensory details
- Characters associated

Step 2: Generate location_id
- Follow naming convention
- Check for duplicates

Step 3: Create stub profile
- Minimum viable information
- Mark gaps for future filling

Step 4: Link to entry
- Add to first_mentioned_in
- Add to entries_featured list

Step 5: Link to characters
- Add relations to characters who were there
```

**Stub Profile Example**:
```markdown
---
location_id: "home-childhood"
name: "House on Elm Street"
aliases: ["our old house", "the house"]
type: home
address: "[TO BE FILLED]"
city: "Karachi"
country: "Pakistan"
period_active:
  - start: "childhood"
    end: "[UNKNOWN]"
    role: "childhood home"
progressions: []
relations: []
physical_description: "[TO BE FILLED]"
ai_visibility: when_detected
ai_priority: medium
first_mentioned_in: "E-2024-003"
entries_featured: ["E-2024-003"]
mention_count: 1
last_updated: 2024-12-24
---

# House on Elm Street

## What This Place Was
Hamza's childhood home. First mentioned in story about [context].

## Profile Status: STUB
This profile needs more information. Questions to explore:
- What did the house look like from outside?
- What room did Hamza sleep in?
- What did it smell like inside?
- Who else lived there?

---

*Profile created: 2024-12-24 | Status: Stub*
```

### 2. Update Existing Location Profile

When a location appears in a new entry:

```
Step 1: Locate existing profile
Step 2: Add entry to entries_featured
Step 3: Increment mention_count
Step 4: Extract new information
- New physical details?
- Sensory memories added?
- Time period extended?
- New character associations?
Step 5: Update profile sections
Step 6: Update last_updated date
```

### 3. Merge Duplicate Locations

When the same place is mentioned differently:

```
Example: "my childhood home" and "the old house" and "123 Elm Street"

Step 1: Identify potential duplicates
- Same type + same period + same city = likely same place
- User confirmation if uncertain

Step 2: Merge profiles
- Keep all aliases
- Combine entries_featured
- Aggregate information
- Resolve conflicts by asking user

Step 3: Update all entries
- Standardize location_id reference
```

---

## Progressions: How Places Change

Places change over time - renovations, decay, neighborhood evolution, your own perception shifting.

### Progression Structure

```yaml
progressions:
  - period: "childhood (1985-1995)"
    description: "Small two-story house, always full of family"
    physical_state: "Well-maintained, garden overgrown"
    emotional_association: "Safe, crowded, warm"

  - period: "teenage years (1995-2000)"
    description: "Added a third floor, felt more spacious"
    physical_state: "Renovated, modern kitchen added"
    emotional_association: "Growing independence, my own room finally"

  - period: "last visit (2020)"
    description: "Parents still there, house feels smaller"
    physical_state: "Showing age, garden now beautiful"
    emotional_association: "Nostalgia, bittersweet, things change"
```

### When to Create Progressions

- When the same place appears in different life periods
- When physical changes are mentioned (renovations, decay)
- When emotional associations shift
- When asked "how has [place] changed?"

---

## Relations: Linking Locations

### To Characters

```yaml
relations:
  - target_type: character
    target_id: "father"
    relationship: "lived here"
    period: "1980-present"
    notes: "Still lives here"

  - target_type: character
    target_id: "grandmother-paternal"
    relationship: "visited frequently"
    period: "1985-2010"
    notes: "Came every Sunday"
```

### To Other Locations

```yaml
relations:
  - target_type: location
    target_id: "school-elementary"
    relationship: "nearby"
    period: "1985-1995"
    notes: "Walking distance, passed the park on the way"

  - target_type: location
    target_id: "city-karachi"
    relationship: "within"
    period: "1985-2000"
    notes: "Clifton neighborhood"
```

---

## Profile Enrichment Questions

When a location profile is sparse, suggest questions:

### For Homes

- "What did the front of the house look like?"
- "Walk me through the rooms - what was where?"
- "What did it smell like when you walked in?"
- "What sounds do you remember from there?"
- "What was your favorite spot in the house?"
- "What happened in the kitchen?"

### For Schools

- "What did the building look like?"
- "Where did you spend most of your time?"
- "What did the hallways sound like?"
- "Was there a place you avoided?"
- "What was your classroom like?"

### For Workplaces

- "Describe your desk or work area"
- "What did the office smell like?"
- "What was the view from your spot?"
- "Where did people gather?"
- "What was the commute like?"

### For Cities/Neighborhoods

- "What did the streets look like?"
- "What sounds defined this place?"
- "What was the weather like?"
- "Where did you go most often?"
- "What made it feel like home (or not)?"

### For All Locations

- "If you closed your eyes, what would you hear there?"
- "What would you smell?"
- "What was the light like?"
- "What season do you associate with this place?"
- "What happened here that you'll never forget?"

---

## Location Analysis

### Frequency Report
```
Top 10 Most Mentioned Locations:
1. home-childhood (28 mentions across 25 entries)
2. city-karachi (22 mentions across 18 entries)
3. school-elementary (15 mentions across 12 entries)
...

Locations Mentioned Only Once:
- hospital-birth (E-2024-001)
- airport-departure (E-2024-015)
```

### Geographic Coverage
```
Countries:
├── Pakistan: 45 entries
│   ├── Karachi: 38 entries
│   │   ├── Clifton: 25 entries
│   │   └── Downtown: 8 entries
│   └── Lahore: 7 entries
└── USA: 18 entries
    └── New York: 18 entries

Underexplored:
- No stories from London (lived there 2010-2012)
- Few details about college campus
```

### Location Gaps
```
Locations Needing Development:
- home-childhood: 28 mentions, missing sensory details
- school-high: 12 mentions, no physical description
- work-first-job: 8 mentions, no layout details

Suggested Actions:
- "What did your childhood home smell like?"
- "Describe the hallways of your high school"
- "What was your desk like at your first job?"
```

---

## Storage Structure

```
/story-data/locations/
├── homes/
│   ├── home-childhood.md
│   ├── home-first-apartment.md
│   └── home-current.md
├── schools/
│   ├── school-elementary.md
│   ├── school-high.md
│   └── school-university.md
├── workplaces/
│   ├── work-first-job.md
│   └── work-current.md
├── cities/
│   ├── city-karachi.md
│   └── city-new-york.md
├── neighborhoods/
├── landmarks/
│   └── landmark-pier.md
└── other/
    └── _TEMPLATE.md
```

---

## Integration with Other Skills

### With LIFE-01 (Entry Processor)
```
Entry processed → Extract locations →
For each location:
  If exists: Update profile, add entry
  If new: Create stub profile
```

### With LIFE-02 (Character Manager)
```
Link characters to locations:
- Who lived at this home?
- Who worked at this office?
- Who do you associate with this city?
```

### With LIFE-04 (Consistency Guardian)
```
Check for:
- Being in two places at once
- Location details that contradict
- Timeline impossibilities
- Living somewhere before it existed
```

### With LIFE-05 (Emotion Excavator)
```
For underdeveloped locations, generate:
- "What did [place] look like in the morning?"
- "What sounds do you remember from [place]?"
- "How did it feel to be at [place]?"
```

---

## Output Examples

### Location Summary
```
## Location: Childhood Home

**Mentions**: 28 entries
**Period**: 1985-2000 (lived), 2000-present (visited)
**Type**: home
**City**: Karachi, Pakistan

**Recent Appearances**:
- E-2024-025: "The Last Christmas" (setting)
- E-2024-018: "When the Power Went Out" (setting)
- E-2024-012: "Sunday Mornings" (setting)

**Profile Completeness**: 70%
Missing: smell details, exact layout, sounds

**Suggested Exploration**:
"Walk me through the house - what was behind each door?"
```

### New Location Alert
```
## New Location Detected

**Entry**: E-2024-028 "First Day"
**Location**: "The gray office building on 5th"

**Extracted Information**:
- Type: workplace
- Period: 2015
- Details: Gray building, 12th floor

**Action Needed**:
- Create stub profile as: work-company-2015
- Or link to existing location?

[Create Profile] [Link to Existing] [Skip - Minor Location]
```

---

## Anti-Patterns

**Do NOT**:
- Create separate profiles for obvious duplicates
- Invent location details not mentioned
- Delete locations even if minor
- Assume locations (ask if unclear)
- Over-categorize (keep it simple)

**DO**:
- Ask when location identity is ambiguous
- Track even minor locations (they may recur)
- Note uncertainty explicitly
- Preserve Hamza's naming conventions
- Link locations to relevant characters

---

## Success Criteria

- Every mentioned place has a profile
- Profiles grow richer over time with sensory details
- Locations are linked to relevant characters
- No duplicate locations exist
- Location information is consistent across entries
- Underdeveloped profiles are flagged for exploration
- Geographic coverage gaps are identified

---

*Skill LIFE-11 v1.0 | Life Story System | 2024-12-24*
