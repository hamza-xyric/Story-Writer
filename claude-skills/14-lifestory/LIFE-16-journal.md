# LIFE-16: Journal Capture

**Skill ID**: LIFE-16
**Category**: Life Story
**Priority**: High
**Version**: 1.0
**Last Updated**: 2024-12-25

---

## Purpose

Capture present-focused daily reflections that may trigger memories, questions, and story seeds. Unlike freeform (past memories) or biographer (guided exploration), journaling captures *today* - which naturally connects to *yesterday*.

**Philosophy**: Capture without judging. Every day lived might pull on older stories.

---

## Key Insight: Weightage

**Not every journal entry is book-worthy.** And that's fine.

| Journal Content | Weightage | Outcome |
|-----------------|-----------|---------|
| Just venting | Low | Valid to capture, probably not book material |
| Seed of a story | Medium | Add to question bank, explore later |
| Clear memory trigger | High | Suggest biographer session |
| Book-worthy moment | High | Promote to draft → entry |

The system captures everything without pressure, then allows **promotion** of meaningful moments.

---

## When to Activate

**Triggers**:
- User says "let me journal" or "about today"
- User says "what's on my mind" or "daily check-in"
- User uses `/journal` or `/today`
- User starts writing about current day events

---

## Core Behavior

### What This Skill Does

1. **Accept present-focused content** - Today's events, thoughts, feelings
2. **Minimal metadata during capture** - Just date and optional mood
3. **Scan for memory triggers** - Names, places, emotions that connect to past
4. **Actively suggest exploration** - "Want to explore that memory now?"
5. **Add questions to bank** - For later exploration if user declines
6. **Enable promotion later** - Extract book-worthy moments via `/promote`

### What This Skill Does NOT Do

- Enforce daily habit
- Create streak pressure
- Judge what's "important"
- Automatically process into entries
- Require structured input

---

## User Interaction

### Starting Journal Mode

```
User: /journal

AI: "What's on your mind today?"
```

Or with mood:

```
User: /journal feeling tired but reflective

AI: "Got it - tired but reflective. Go ahead, I'm listening."
```

### During Journal

AI is mostly silent. Receives the content.

If user pauses or seems done:

```
AI: "Anything else, or is that it for today?"
```

### Ending Journal

```
User: [signals done - "that's it", pause, etc.]

AI: "Captured. 234 words.

     I noticed you mentioned [college nights / your grandmother / etc.].
     Would you like to explore that memory now? (/biographer)
     Or I can add it to your question bank for later."
```

If no memory triggers detected:

```
AI: "Captured. 156 words saved.

     When you're ready, you can:
     - Add more with /journal
     - Review past journals in the app
     - Promote moments to entries with /promote"
```

---

## Minimal Capture Format

### During Capture

Only essential metadata:

```yaml
---
journal_id: J-YYYY-NNN
journal_date: 2024-12-25
mood: reflective              # Optional, single tag
captured_at: 2024-12-25T20:30:00
word_count: 234
---

[Freeform content about the day]

---

*Journal: 2024-12-25 | Mood: reflective*
```

### After AI Analysis (appended automatically)

```markdown
---

## AI Notes

- Memory triggers: college, late nights, debugging
- Suggested: /biographer "college debugging sessions"
- Added to question bank: "What were those college nights like?"
- Connections: friends/trinkhalm (similar late-night vibes)
```

### After Review (enriched when revisiting)

Additional fields can be added later:

```yaml
energy_level: 3                # 1-5 scale
notable_events: ["coffee with friend", "work deadline"]
triggered_memories: ["college nights"]
book_worthy: seed              # false | seed | maybe | yes
promoted_to: "D-2024-015"      # If content extracted to draft
```

---

## Memory Bridge (Active)

After journal capture, AI **actively** looks for memory triggers:

### Detection Patterns

1. **Names mentioned**
   - Check against character profiles
   - "You mentioned Sarah - there's no character profile for her yet. Is she someone important?"

2. **Places mentioned**
   - Check against location profiles
   - "The coffee shop you mentioned - is this a place with memories attached?"

3. **Time references to past**
   - "reminded me of...", "back when...", "like that time..."
   - Directly suggest exploration

4. **Strong emotions**
   - Connect to similar emotional entries
   - "This feeling you're describing - it reminds me of what you wrote about [entry]"

### Active Suggestion Format

```
AI: "Captured. I noticed you mentioned 'those late nights in college.'

     Would you like to explore that memory now? I could ask you about it.
     (/biographer college nights)

     Or I can add 'What were those college nights like?' to your question bank
     for another time."
```

User can:
- Accept: Start biographer session immediately
- Defer: Add to question bank
- Dismiss: Neither, just move on

---

## File Storage

### Directory

```
/story-data/journals/
├── _TEMPLATE.md
├── _README.md
├── 2024-12-25.md
├── 2024-12-26.md
└── ...
```

### File Naming

```
YYYY-MM-DD.md                  # One journal per day
YYYY-MM-DD-2.md               # If multiple sessions same day
```

---

## Promotion Flow

Journals don't automatically become entries. Use `/promote` to extract book-worthy moments.

### Command

```
User: /promote

AI: "Looking at your recent journals...

     Here are moments that might be worth exploring as entries:

     1. Dec 25: 'Reminded me of those late nights in college...'
        → Seed for memory exploration

     2. Dec 24: 'Dad called today. First time in months.'
        → Could become an entry about your relationship

     3. Dec 23: [Just daily stuff, no story seeds detected]

     Which would you like to promote to a draft? Or 'none' to skip."
```

### Promotion Process

1. User selects journal content to promote
2. Selected content becomes a **draft** (like freeform capture)
3. Draft goes through normal LIFE-15 → LIFE-01 pipeline
4. Journal marked with `promoted_to: D-YYYY-NNN`

---

## Commands

```
/journal           → Start journal capture for today
/today             → Same as /journal
/journal [mood]    → Start with mood tag (e.g., /journal tired)
/promote           → Review journals for book-worthy moments
/journals          → List recent journal entries
```

---

## Integration

### With LIFE-00 (Personal Context)

After journal:
- Update `input_analytics.total_journals`
- Track `journal_voice_patterns` (may differ from memory voice)
- Note mood correlations with richer writing

Add to profile:
```yaml
journal_analytics:
  total_journals: 0
  avg_journal_length: 0
  mood_frequency: {}
  memory_triggers_found: 0
  promotions: 0
```

### With Question Bank

Memory triggers add questions:
```markdown
## From Journal: 2024-12-25

- [ ] What were those college nights like? (from: J-2024-001)
- [ ] Tell me about Sarah - who is she? (from: J-2024-001)
```

### With LIFE-15 (Draft Processor)

When promoting:
- `/promote` creates draft from journal excerpt
- Draft includes `origin.type: journal`
- Draft includes `origin.journal_id: J-YYYY-NNN`
- LIFE-15 processes as normal

### With storyai-app

New `/journals` view:
- Calendar display (month view)
- Mood indicators per day
- Click day → read journal
- Filter by mood, book_worthy status
- Show which journals spawned entries

---

## No Daily Habit Enforcement

**Critical**: This skill does NOT:

- Send reminders to journal
- Track streaks
- Make user feel guilty for skipping days
- Depend on consistent input
- Judge frequency

Journaling becomes a habit naturally, not through system pressure.

---

## Anti-Patterns

**DO NOT**:
- Ask questions during journal capture (unlike biographer)
- Suggest structure or formatting
- Require mood or any metadata
- Push for "deeper" content
- Make it feel like homework
- Create pressure around consistency

**DO**:
- Receive in near-silence (like freeform)
- Actively detect memory triggers after capture
- Suggest exploration, accept "no" gracefully
- Allow minimal capture, enrich later
- Respect that some days have nothing book-worthy
- Treat every journal as valid regardless of content

---

## Example Sessions

### Quick Journal

```
User: /journal

AI: "What's on your mind today?"

User: "Long day at work. Didn't get much done. Thinking about
      that trip we're planning for next month."

AI: "Captured. 18 words.

     No memory triggers detected. Just a quiet day logged.

     /journal again when you have more, or browse past journals in the app."
```

### Journal with Memory Trigger

```
User: /journal feeling nostalgic

AI: "Nostalgic. Go ahead."

User: "Had coffee with an old friend today. Reminded me of those late
      nights in college when we'd stay up debugging code together.
      Haven't thought about those days in years. Mark used to bring
      those terrible energy drinks. We thought we were invincible."

AI: "Captured. 47 words.

     I noticed you mentioned Mark and those college nights.
     Would you like to explore that memory now?

     I could ask you about those debugging sessions, or about Mark.
     (/biographer college nights)

     Or I can add these to your question bank for later."

User: "Add to question bank"

AI: "Added:
     - 'What were those college debugging nights like?'
     - 'Tell me about Mark'

     They'll be waiting when you're ready to explore."
```

### Promotion Flow

```
User: /promote

AI: "Reviewing your journals from the past week...

     Moments with story potential:

     1. Dec 25: 'Late nights in college, debugging with Mark'
        Type: Memory seed
        Action: Explore via biographer → entry

     2. Dec 24: 'Dad called. First time in months. He sounded old.'
        Type: Present moment with emotional weight
        Action: Could become a reflection entry

     3. Dec 22: Work frustrations (no story seed detected)

     Which would you like to work with? Enter number, or 'skip' to leave for later."

User: "1"

AI: "Creating a draft from that memory seed...

     I'll save this as a draft: 'College debugging nights with Mark'

     Would you like to:
     1. Explore it now with /biographer
     2. Process it directly into an entry
     3. Leave it as a draft for later

     What feels right?"
```

---

## Success Criteria

- Zero friction to start journaling
- Present-focused capture feels natural
- Memory triggers are detected and surfaced
- User feels no pressure about frequency
- Promotion flow extracts book-worthy moments cleanly
- Journals feel like personal space, not public performance
- App calendar view shows journaling patterns over time

---

*Skill LIFE-16 v1.0 | Life Story System | 2024-12-25*
