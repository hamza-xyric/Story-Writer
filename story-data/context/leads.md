---
# Leads Database
# Potential stories/topics identified from transcripts and other sources
#
# Status values:
#   unexplored  - New lead, not yet discussed
#   questioned  - Explored in biographer session
#   captured    - Story extracted and saved as entry
#   dismissed   - Not worth pursuing (user decided)
#
# Type values:
#   person     - Someone mentioned but not in character registry
#   place      - Location mentioned but not documented
#   event      - Specific event or occasion referenced
#   expansion  - Existing entry could be expanded with new details
#   theme      - Recurring theme or topic worth exploring

leads:
  - id: L-2025-001
    type: person
    name: "Salman"
    context: "Xyric employee, developer working on projects"
    quote: "Same thing with Salman and Zishan. I feel like no one is super efficient because everyone is still learning."
    potential_story: "Building the Xyric team, onboarding new developers"
    source_transcript: T-2025-001
    discovered_at: 2025-12-27
    status: unexplored
    notes: "Part of the current Xyric team being built"

  - id: L-2025-002
    type: person
    name: "Zishan"
    context: "Xyric employee, part of development team"
    quote: "Same thing with Salman and Zishan"
    potential_story: "Team building at Xyric"
    source_transcript: T-2025-001
    discovered_at: 2025-12-27
    status: unexplored
    notes: "Developer on the Xyric team"

  - id: L-2025-003
    type: place
    name: "Gitex"
    context: "AI conference where Hamza evaluated companies"
    quote: "I went to Jitex. No one knows s***. Everyone in Jitex was just selling dreams... only Huawei embarrassed me."
    potential_story: "Gitex experience - evaluating AI companies, being impressed by Huawei"
    source_transcript: T-2025-001
    discovered_at: 2025-12-27
    status: unexplored
    notes: "Could be expanded into full story about AI industry perspective"

  - id: L-2025-004
    type: theme
    name: "Breaking the 'Slavery Mindset'"
    context: "Major philosophical theme in Hamza's worldview"
    quote: "You're still in the matrix, but you can see outside the matrix. Inshallah soon enough you'll be outside the matrix as well."
    potential_story: "Personal journey from employee thinking to ownership thinking"
    source_transcript: T-2025-001
    discovered_at: 2025-12-27
    status: unexplored
    notes: "Core philosophy - could be a major entry about worldview"

  - id: L-2025-005
    type: theme
    name: "Teaching/Mentoring Role"
    context: "Hamza spends significant time coaching Munther"
    quote: "I want you to learn by yourself while I help you. I don't want to tell you."
    potential_story: "Who taught you the things you're now teaching others?"
    source_transcript: T-2025-001
    discovered_at: 2025-12-27
    status: unexplored
    notes: "Biographer question: 'Do you see yourself as a teacher?'"

  - id: L-2025-006
    type: theme
    name: "Speed and Impatience"
    context: "Self-described working style"
    quote: "I like to work really fast, like really really fast. If I want something, it can be done, I'm going to do it."
    potential_story: "Has impatience been a strength or gotten you in trouble?"
    source_transcript: T-2025-001
    discovered_at: 2025-12-27
    status: unexplored
    notes: "Character trait worth exploring"

# Example lead:
#  - id: L-2024-001
#    type: person
#    name: "Uncle Rashid"
#    context: "Taught Hamza chess, mentioned in T-2024-001"
#    potential_story: "Chess lessons with uncle"
#    source_transcript: T-2024-001
#    discovered_at: 2024-12-27
#    status: unexplored
#    notes: ""

last_updated: 2025-12-27
total_leads: 6
unexplored_count: 6
---

# Leads Database

This file tracks potential stories, topics, and gaps discovered through transcript analysis and other sources.

## How Leads Work

1. **Discovery**: LIFE-20 (Gap Analysis) identifies mentions of people, places, or events not yet documented
2. **Storage**: Leads are saved here with context about where they came from
3. **Suggestion**: When you start `/biographer`, unexplored leads are offered as conversation starters
4. **Resolution**: As leads are explored, their status updates:
   - `unexplored` → `questioned` (discussed in biographer session)
   - `questioned` → `captured` (story emerged and was saved)
   - OR `questioned` → `dismissed` (not worth pursuing)

## Current Leads

### People (2)
- **L-2025-001: Salman** - Xyric developer, team building story potential
- **L-2025-002: Zishan** - Xyric developer, team building story potential

### Places (1)
- **L-2025-003: Gitex** - AI conference experience, Huawei story

### Themes (3)
- **L-2025-004: "Slavery Mindset"** - Core philosophy about ownership vs employment
- **L-2025-005: Teaching/Mentoring** - Who taught you what you teach others?
- **L-2025-006: Speed/Impatience** - Self-described trait worth exploring

*6 leads from T-2025-001 (Driexor call) - all unexplored*

---

*Leads Database v1.0 | Life Story System | 2024-12-27*
