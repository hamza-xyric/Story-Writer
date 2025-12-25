# OPS-02: Daily Report Generator

**Skill ID**: OPS-02
**Category**: Operations
**Priority**: High
**Version**: 1.0
**Last Updated**: 2025-12-25

---

## Purpose

Generates end-of-day progress reports summarizing commits, work queue status, and blockers. Outputs both terminal-friendly plain text and a visual HTML dashboard.

---

## When to Activate

**Triggers**:
- `/daily-report` slash command
- `/eod` command
- "Generate daily report"
- "What did we accomplish today?"
- "End of day summary"

---

## Data Sources

| Source | Purpose | Command/Path |
|--------|---------|--------------|
| Git Commits | Today's activity | `git log --since="00:00"` |
| team.yaml | Author normalization | `PROJECTS/team.yaml` |
| PROGRESS.md | Blockers, decisions | `PRODUCTS/*/PROGRESS.md` |
| NEXT-STEPS.md | Work queue status | `PRODUCTS/*/NEXT-STEPS.md` |

---

## Workflow

### Step 1: Read Team Data

Read `PROJECTS/team.yaml` to get:
- Team member names and IDs
- `git_aliases` for author normalization
- Project assignments

### Step 2: Gather Git Commits

Run git command to get today's commits:

```bash
git log --since="00:00" --format="%H|%an|%ae|%s|%ai" --all
```

Parse into structured data:
- Commit hash (short)
- Author name
- Author email
- Commit message
- Timestamp

### Step 3: Normalize Authors

For each commit author:
1. Check if name or email matches any `git_aliases` in team.yaml
2. If match found, use the team member's official name
3. If no match, try email username matching
4. Fallback: use git author as-is with "(external)" tag

### Step 4: Parse Commit Messages

Extract commit type from conventional commit format:
- `feat:` → Feature
- `fix:` → Bug fix
- `docs:` → Documentation
- `refactor:` → Refactoring
- `test:` → Testing
- `chore:` → Maintenance
- Other → General

### Step 5: Group Commits

Create two groupings:
1. **By Project**: Infer from commit path or message scope
2. **By Team Member**: Using normalized author names

### Step 6: Read PROGRESS.md Files

Find and read all PROGRESS.md files:
```
PRODUCTS/*/PROGRESS.md
CLIENTS/*/PROGRESS.md
COMPANY/PROGRESS.md
```

Extract:
- Session logs dated today (decisions made)
- Milestones in progress
- Any blockers mentioned

### Step 7: Read NEXT-STEPS.md Files

Find and read all NEXT-STEPS.md files:
```
PRODUCTS/*/NEXT-STEPS.md
```

Extract:
- Items with status `in_progress`
- Items with status `blocked` (with reasons)
- Top queued items (for tomorrow's priorities)

### Step 8: Generate Executive Summary

Write an AI narrative (2-3 sentences) that:
- Summarizes the day's main focus
- Notes any significant accomplishments
- Flags concerns if any (no commits, many blockers)

### Step 9: Output Plain Text Report

Display the report following the template structure:
- At a Glance metrics
- Executive Summary
- Activity by Project
- Activity by Team Member
- Work Queue Status
- Key Decisions
- Tomorrow's Priorities

### Step 10: Generate HTML Dashboard

Using the HTML template (`FRAMEWORKS/templates/report-html-template.html`):
1. Replace placeholders with actual data
2. Calculate bar chart heights (normalize to max 100px)
3. Generate team member cards
4. Add blocked items alerts if any
5. Save to `reports/daily/YYYY-MM-DD.html`

### Step 11: Confirm Output

Print:
```
Report saved to: reports/daily/YYYY-MM-DD.html
Open in browser to view visual dashboard.
```

---

## Output Format

### Terminal Output Structure

```
=== XYRIC DAILY REPORT ===
Date: 2025-12-25 (Wednesday)
Generated: 2025-12-25 18:00 PKT

---

## At a Glance

| Metric | Value |
|--------|-------|
| Commits Today | 12 |
| Active Contributors | 3 |
| Projects Touched | 2 |
| Items In Progress | 2 |
| Items Blocked | 1 |

---

## Executive Summary

Today's work focused on yHealth authentication and propertyAI documentation.
The team delivered 12 commits across 2 projects, with Hamza leading development
efforts. One item remains blocked awaiting AWS credits.

---

## Activity by Project

### yhealth-platform (8 commits)

| Author | Commit | Message |
|--------|--------|---------|
| Hamza Muqeem | a1b2c3d | feat(auth): add password reset flow |
| Salman Sadiq | e4f5g6h | fix(ui): correct button alignment |
...

### propertyAI (4 commits)

| Author | Commit | Message |
|--------|--------|---------|
| Hamza Muqeem | i7j8k9l | docs: update API documentation |
...

---

## Activity by Team Member

### Hamza Muqeem (10 commits)

**Focus Areas:** yhealth-platform, propertyAI

| Type | Count |
|------|-------|
| feat | 4 |
| fix | 3 |
| docs | 3 |

### Salman Sadiq (2 commits)

**Focus Areas:** yhealth-platform

| Type | Count |
|------|-------|
| fix | 2 |

---

## Work Queue Status

### Currently In Progress

| ID | Task | Project | Assignee |
|----|------|---------|----------|
| NS-001 | E01 Story Review | yhealth | Hamza |
| NS-005 | Core App UI | yhealth | Salman |

### Blocked Items (1)

| ID | Task | Project | Blocker Reason |
|----|------|---------|----------------|
| NS-007 | Cloud Setup | buildops | Awaiting AWS credits |

---

## Key Decisions Today

| Decision | Project | Context |
|----------|---------|---------|
| Use n8n for orchestration | propertyAI | Session 2025-12-25 |

---

## Tomorrow's Priorities

1. Complete NS-001 (E01 Story Review) - high priority, blocks NS-002
2. Unblock NS-007 (AWS credits needed)
3. Continue NS-005 (Core App UI development)

---

=== Report saved to: reports/daily/2025-12-25.html ===
```

---

## HTML Dashboard Features

| Component | Data Source |
|-----------|-------------|
| Metrics Cards | Commit count, contributors, projects, blockers |
| Team Cards | Team members with commit counts and avatars |
| Progress Bars | Project milestone completion (from PROGRESS.md) |
| Commit Table | Full commit list with type badges |
| Blocked Alert | Red alert box for blocked items |
| Priorities | Tomorrow's focus items |

---

## Git Author Normalization Logic

```
Input: "hamza-xyric" or "hamza@xyric.ai"

1. Check git_aliases in team.yaml
   → Found in hamza-muqeem.git_aliases
   → Return "Hamza Muqeem"

2. If not found, extract email username
   → "hamza" from "hamza@xyric.ai"
   → Compare to team.yaml emails
   → Match "hamza@xyric.io" → "Hamza Muqeem"

3. If still not found, try name contains
   → "Hamza" contains first name of "Hamza Muqeem"
   → Return "Hamza Muqeem"

4. Fallback
   → Return "hamza-xyric (external)"
```

---

## Integration with Other Skills

| Skill | Integration |
|-------|-------------|
| DEV-07 | Parses commit messages generated by commit skill |
| OPS-03 | Weekly PPP aggregates daily reports |
| /progress | Reads PROGRESS.md updates |
| /nextsteps | Reads NEXT-STEPS.md queue status |

---

## Error Handling

| Scenario | Action |
|----------|--------|
| No commits today | Show "No commits today" in Activity section |
| No PROGRESS.md found | Skip "Key Decisions" section |
| No NEXT-STEPS.md found | Skip "Work Queue" section |
| Git command fails | Report error and continue with available data |
| HTML template not found | Use inline HTML generation |

---

## Best Practices

**Do:**
- Generate reports at end of work day
- Review AI summary for accuracy
- Share HTML dashboard with team
- Track patterns over time

**Don't:**
- Run during active development (incomplete day)
- Edit generated reports (regenerate instead)
- Commit reports to git (they're in .gitignore)

---

## Related Files

| File | Purpose |
|------|---------|
| `FRAMEWORKS/templates/daily-report-template.md` | Plain text template |
| `FRAMEWORKS/templates/report-html-template.html` | HTML dashboard template |
| `PROJECTS/team.yaml` | Team member registry |
| `reports/daily/` | Output directory |

---

*Skill OPS-02 v1.0 | Xyric Solutions | 2025-12-25*
