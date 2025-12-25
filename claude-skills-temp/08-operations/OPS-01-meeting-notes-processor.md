# OPS-01: Meeting Notes Processor

**Skill ID**: OPS-01
**Category**: Operations
**Priority**: 🟢 Medium
**Version**: 1.0
**Last Updated**: 2025-11-30

---

## Purpose

Transforms raw meeting notes or transcripts into structured, actionable summaries. Extracts key decisions, action items, and insights to ensure nothing falls through the cracks.

---

## When to Activate

**Triggers**:
- "Process these meeting notes"
- "Summarize this meeting"
- "Extract action items from this transcript"
- "Create meeting summary for [meeting name]"
- After any significant meeting
- When sharing meeting outcomes with stakeholders

---

## Meeting Summary Framework

### The DOAP Method

| Element | Purpose | Format |
|---------|---------|--------|
| **D**ecisions | What was decided? | Clear statements |
| **O**utcomes | What was achieved? | Key conclusions |
| **A**ctions | What needs to happen next? | Tasks with owners and dates |
| **P**arking Lot | What needs future attention? | Deferred items |

---

## Meeting Notes Template

```markdown
# Meeting Notes: [Meeting Title]

**Date:** [Date]
**Time:** [Start] - [End]
**Type:** [Standup/Planning/Review/Strategy/Client/etc.]
**Attendees:** [Names]
**Facilitator:** [Name]
**Note Taker:** [Name]

---

## Quick Summary
[2-3 sentence executive summary of the meeting]

---

## Decisions Made

| # | Decision | Rationale | Owner |
|---|----------|-----------|-------|
| 1 | [Decision] | [Why] | [Who owns] |
| 2 | [Decision] | [Why] | [Who owns] |

---

## Action Items

| # | Action | Owner | Due Date | Priority |
|---|--------|-------|----------|----------|
| 1 | [Task] | [Name] | [Date] | High/Med/Low |
| 2 | [Task] | [Name] | [Date] | High/Med/Low |

---

## Discussion Summary

### Topic 1: [Topic Name]
**Key Points:**
- [Point 1]
- [Point 2]

**Outcome:** [What was concluded]

### Topic 2: [Topic Name]
**Key Points:**
- [Point 1]
- [Point 2]

**Outcome:** [What was concluded]

---

## Parking Lot
(Items for future discussion)

1. [Item 1] - Reason deferred: [Why]
2. [Item 2] - Reason deferred: [Why]

---

## Key Metrics/Updates Shared
(If applicable)

| Metric | Value | Change | Notes |
|--------|-------|--------|-------|
| [Metric] | [Value] | [+/-X%] | [Context] |

---

## Next Steps

**Immediate (This Week):**
1. [Action 1]
2. [Action 2]

**Coming Up:**
1. [Future item 1]
2. [Future item 2]

---

## Next Meeting

**Date:** [Next meeting date]
**Focus:** [Main topic for next meeting]
**Prep Needed:** [Any preparation required]

---

## Appendix
(Supporting materials, links, references)

- [Link/Resource 1]
- [Link/Resource 2]
```

---

## Processing Raw Notes

### Input → Output Transformation

**Input (Raw):**
```
ok so we talked about the yhealth stuff and decided we should
probably focus on the design first before salman starts coding. 
hamza mentioned something about the 64% completion. we also need
to figure out the client stuff. sarah will look into that by 
friday maybe. oh and we should probably update the investors 
next week but not sure when exactly.
```

**Output (Processed):**
```markdown
# Meeting Notes: Team Sync

**Date:** [Date]
**Attendees:** Hamza, Munther, Salman

---

## Quick Summary
Team aligned on yHealth prioritization, with design completion 
at 64% before development starts. Client work assigned to Sarah. 
Investor update planned for next week.

---

## Decisions Made

| # | Decision | Rationale | Owner |
|---|----------|-----------|-------|
| 1 | Complete yHealth design before development | Need 100% design before coding starts | Hamza |
| 2 | Prioritize client engagement | Revenue-generating work | Sarah |

---

## Action Items

| # | Action | Owner | Due Date | Priority |
|---|--------|-------|----------|----------|
| 1 | Complete yHealth design to 100% | Hamza/Design | [TBD] | High |
| 2 | Follow up on client engagement | Sarah | Friday | High |
| 3 | Schedule investor update | Hamza | Next week | Medium |

---

## Key Updates

- yHealth design: 64% complete
- Development holding until design finalized

---

## Parking Lot

1. Investor update timing - Need to confirm date
```

---

## Meeting Type Templates

### Standup/Daily Sync

```markdown
# Daily Standup - [Date]

**Attendees:** [Names]
**Duration:** [X] minutes

## Updates by Person

### [Name 1]
**Yesterday:** [What they did]
**Today:** [What they'll do]
**Blockers:** [Any blockers]

### [Name 2]
**Yesterday:** [What they did]
**Today:** [What they'll do]
**Blockers:** [Any blockers]

## Blockers to Resolve
| Blocker | Owner | Resolution | ETA |
|---------|-------|------------|-----|
| [Issue] | [Name] | [Action] | [When] |
```

### Sprint Planning

```markdown
# Sprint Planning - Sprint [#]

**Date:** [Date]
**Sprint Duration:** [Start] to [End]
**Capacity:** [X] story points

## Sprint Goal
[One sentence describing sprint objective]

## Committed Items

| Item | Points | Owner | Notes |
|------|--------|-------|-------|
| [Item] | [X] | [Name] | [Notes] |

**Total Committed:** [X] points

## Not Included (Backlog)
- [Item 1] - Reason: [Why]
- [Item 2] - Reason: [Why]

## Risks
1. [Risk 1] - Mitigation: [Plan]
```

### Client Meeting

```markdown
# Client Meeting: [Client Name]

**Date:** [Date]
**Attendees:** 
- Client: [Names]
- Xyric: [Names]

## Agenda Covered
1. [Topic 1]
2. [Topic 2]

## Client Feedback
| Topic | Feedback | Our Response |
|-------|----------|--------------|
| [Topic] | [What they said] | [Our position] |

## Decisions/Agreements
1. [Agreement 1]
2. [Agreement 2]

## Action Items
| Action | Owner | Due |
|--------|-------|-----|
| [Action] | [Xyric/Client] | [Date] |

## Follow-up Required
- [Item 1]
- [Item 2]
```

### Strategy/Planning Meeting

```markdown
# Strategy Session: [Topic]

**Date:** [Date]
**Duration:** [X] hours
**Attendees:** [Names]

## Objective
[What we aimed to achieve]

## Context/Background
[Relevant context for the discussion]

## Options Discussed

### Option A: [Name]
**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

### Option B: [Name]
**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

## Decision
[What was decided and why]

## Implementation Plan
1. [Step 1] - [Owner] - [Date]
2. [Step 2] - [Owner] - [Date]

## Success Metrics
- [Metric 1]: [Target]
- [Metric 2]: [Target]
```

### Retrospective

```markdown
# Retrospective: [Sprint/Project/Period]

**Date:** [Date]
**Attendees:** [Names]
**Facilitator:** [Name]

## What Went Well ✅
1. [Item 1]
2. [Item 2]
3. [Item 3]

## What Could Be Improved 🔧
1. [Item 1]
2. [Item 2]
3. [Item 3]

## What We'll Try Next 🎯
| Action | Owner | Measure of Success |
|--------|-------|-------------------|
| [Action] | [Name] | [How we know it worked] |

## Team Morale
[General sentiment, any concerns]

## Shoutouts 🌟
- [Recognition for team members]
```

---

## Action Item Best Practices

### Good Action Items
```
✅ Specific: "Draft Q4 investor update email"
✅ Assigned: Clear owner
✅ Dated: Specific due date
✅ Measurable: Know when it's done

Example:
"Sarah to send client proposal draft to Hamza for review by Friday 5pm"
```

### Bad Action Items
```
❌ Vague: "Look into the thing"
❌ Unassigned: "Someone should..."
❌ No date: "Soon" or "ASAP"
❌ Too big: "Fix all the bugs"

Anti-example:
"We should probably figure out the client stuff sometime"
```

---

## Integration with Other Skills

### With DOC-01 (Documentation Validator)
- Meeting notes follow naming conventions
- Stored in correct location

### With OPS-02 (Task Prioritizer)
- Action items feed into prioritization
- Meeting outcomes inform priorities

### With CORE-01 (Placeholder Guardian)
- Timeline commitments in meetings need verification
- No invented deadlines

---

## Anti-Patterns

❌ **Don't** skip documenting decisions
❌ **Don't** leave action items without owners
❌ **Don't** forget to set due dates
❌ **Don't** write novels (be concise)
❌ **Don't** delay processing notes
❌ **Don't** skip follow-up on action items

---

## Best Practices

✅ **Do** process notes within 24 hours
✅ **Do** share with attendees for confirmation
✅ **Do** track action items to completion
✅ **Do** keep notes concise but complete
✅ **Do** use consistent format
✅ **Do** store in accessible location
✅ **Do** reference previous meeting notes

---

## Success Criteria

✅ All decisions documented clearly
✅ All action items have owners and dates
✅ Notes shared within 24 hours
✅ Format is consistent and scannable
✅ Action items tracked to completion
✅ Team finds notes useful

---

*Skill OPS-01 v1.0 | Xyric Solutions | 2025-11-30*









