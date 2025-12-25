# Journals Directory

This directory contains daily journal entries - present-focused reflections that may trigger memories.

## Philosophy

**Journals are not entries.** They're the soil from which stories grow.

- Capture today without judging
- Not every journal is book-worthy (and that's fine)
- Memory triggers get added to question bank
- Book-worthy moments can be **promoted** to drafts

## File Naming

```
YYYY-MM-DD.md         # One journal per day
YYYY-MM-DD-2.md       # Multiple sessions same day
```

## Minimal Capture

During capture, only these fields are required:
- `journal_date`
- `captured_at`
- Content

Everything else is optional or added later.

## Enrichment

After capture or during review, these can be added:
- `mood` - How you were feeling
- `energy_level` - 1-5 scale
- `notable_events` - Quick tags for the day
- `triggered_memories` - Past memories that surfaced
- `book_worthy` - Assessment of story potential

## Promotion Flow

When journal content is worth exploring as an entry:

1. Use `/promote` command
2. Select content to extract
3. Content becomes a draft
4. Draft → Entry via normal pipeline
5. Journal marked with `promoted_to: D-YYYY-NNN`

## Commands

```
/journal         Start a new journal entry
/today           Same as /journal
/promote         Review journals for promotion
/journals        List recent journals
```

## Relationship to Entries

```
Journal (present) → Memory Trigger → Question Bank
                              ↓
                        /biographer
                              ↓
                    Draft (past memory)
                              ↓
                          Entry
```

Journals capture the present. The present connects to the past. The past becomes the book.

---

*Journals Directory | Life Story System | 2024-12-25*
