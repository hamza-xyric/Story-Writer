# OPS-03: Weekly PPP Generator

**Skill ID**: OPS-03
**Category**: Operations
**Priority**: High
**Version**: 1.0
**Last Updated**: 2025-12-25

---

## Purpose

Generates weekly Progress, Problems, Plans (PPP) reports summarizing the week's accomplishments, challenges, and upcoming priorities. Outputs both terminal-friendly plain text and a visual HTML dashboard with activity charts.

---

## When to Activate

**Triggers**:
- `/weekly-ppp` slash command
- `/ppp` command
- "Generate weekly PPP"
- "Weekly progress report"
- "What did we accomplish this week?"
- End of week (Friday)

---

## Data Sources

| Source | Purpose | Command/Path |
|--------|---------|--------------|
| Git Commits | Week's activity | `git log --since="7 days ago"` |
| team.yaml | Author normalization | `PROJECTS/team.yaml` |
| PROGRESS.md | Milestones, decisions | `PRODUCTS/*/PROGRESS.md` |
| NEXT-STEPS.md | Queue status, blockers | `PRODUCTS/*/NEXT-STEPS.md` |
| Previous PPP | Week-over-week comparison | `reports/weekly/*.md` |

---

## Workflow

### Step 1: Determine Week Range

Calculate the reporting week:
- **Default**: Last 7 days from today
- **If Friday**: Monday-Friday of current week
- **If Monday**: Previous Monday-Friday

Output format: "Dec 16-20, 2025 (2025-W51)"

### Step 2: Read Team Data

Read `PROJECTS/team.yaml` to get:
- Team member names, IDs, emails
- `git_aliases` for author normalization
- Project assignments per member

### Step 3: Gather Git Commits

Run git command to get week's commits:

```bash
git log --since="7 days ago" --format="%H|%an|%ae|%s|%ai" --all
```

For daily breakdown:
```bash
git log --since="7 days ago" --format="%ad|%H" --date=format:"%a"
```

### Step 4: Normalize Authors

Apply same normalization as OPS-02:
1. Check `git_aliases` in team.yaml
2. Match email username
3. Try name contains
4. Fallback to "(external)"

### Step 5: Aggregate by Day

Create daily commit counts for activity chart:
- Monday: X commits
- Tuesday: X commits
- Wednesday: X commits
- Thursday: X commits
- Friday: X commits

### Step 6: Read PROGRESS.md Files

Find and read all PROGRESS.md files:
```
PRODUCTS/*/PROGRESS.md
CLIENTS/*/PROGRESS.md
COMPANY/PROGRESS.md
```

Extract:
- Milestones completed this week (check completed dates)
- Milestones in progress
- Key decisions from session logs this week
- Any blockers mentioned

### Step 7: Read NEXT-STEPS.md Files

Find and read all NEXT-STEPS.md files:
```
PRODUCTS/*/NEXT-STEPS.md
```

Extract:
- Items completed this week (from archive section)
- Items currently in_progress
- Items blocked (with reasons and duration)
- Top queued items (for next week's plans)

### Step 8: Calculate Metrics

Compute summary metrics:
- Total commits
- Unique contributors
- Projects touched
- Milestones completed
- Work items completed
- Items blocked
- Items in progress

### Step 9: Generate PROGRESS Section

Write narrative and tables covering:
- Accomplishments by project
- Accomplishments by team member
- Milestones completed
- Notable commits

### Step 10: Generate PROBLEMS Section

Identify and document:
- Currently blocked items (with duration)
- Items resolved this week
- Risk radar (AI-identified concerns)

Risk patterns to detect:
- Items in progress > 7 days
- Projects with no commits
- Growing blocker count
- Unaddressed dependencies

### Step 11: Generate PLANS Section

Create next week's focus:
- Priority queue (top 5-7 items)
- Team assignments (based on project ownership)
- Dependencies to resolve
- Milestones to target

### Step 12: Write Executive Summary

Write an AI narrative paragraph (4-5 sentences) that:
- Summarizes the week's overall theme
- Highlights key accomplishments
- Acknowledges main challenges
- Sets up next week's outlook

### Step 13: Output Plain Text Report

Display the PPP following the template structure:
- Week at a Glance
- Executive Summary
- PROGRESS (by project, by member)
- PROBLEMS (blocked, resolved, risks)
- PLANS (queue, assignments, dependencies)

### Step 14: Generate HTML Dashboard

Using the HTML template:
1. Replace placeholders with actual data
2. Generate activity bar chart (Mon-Fri)
3. Calculate progress bar percentages
4. Create team member cards with stats
5. Add blocked items alerts
6. Save to `reports/weekly/YYYY-Www.html`

### Step 15: Confirm Output

Print:
```
Weekly PPP saved to: reports/weekly/2025-W52.html
Open in browser to view visual dashboard.
```

---

## Output Format

### Terminal Output Structure

```
=== XYRIC WEEKLY PPP ===
Week: Dec 16-20, 2025 (2025-W51)
Generated: 2025-12-20 18:00 PKT

---

## Week at a Glance

| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| Total Commits | 45 | 38 | +18% |
| Contributors | 4 | 3 | +1 |
| Milestones Completed | 2 | 1 | +1 |
| Items Completed | 8 | 5 | +60% |
| Items Blocked | 2 | 1 | +1 |

---

## Executive Summary

This week marked significant progress on yHealth Platform with 45 commits
across 4 contributors. Key accomplishments include completing E07 Wellbeing
Pillar stories and setting up the development environment. The team faces
two blockers related to cloud infrastructure, but momentum remains strong.
Next week's focus will be completing E01 story review and unblocking cloud setup.

---

## PROGRESS (What We Accomplished)

### By Project

#### yhealth-platform
**Commits:** 32 | **Contributors:** Hamza, Salman, Munther

**Key Accomplishments:**
- Completed E07 Wellbeing Pillar stories (18 stories)
- Set up development environment with hot reload
- Migrated PROGRESS.md to Tier 2 format

**Milestones Completed:**
- M-004: Development Environment Setup (Dec 18)

**Notable Commits:**
- feat(auth): implement JWT refresh token flow
- feat(wellness): add mood tracking component

#### propertyAI
**Commits:** 13 | **Contributors:** Hamza, Zeeshan

**Key Accomplishments:**
- Released V7.0 with monitoring and caching
- Implemented progress streaming for long operations

**Milestones Completed:**
- M-004: Monitoring, Caching & Progress (Dec 17)

---

### By Team Member

| Member | Commits | Projects | Focus Area |
|--------|---------|----------|------------|
| Hamza Muqeem | 28 | yhealth, propertyAI | Architecture, auth |
| Salman Sadiq | 8 | yhealth | UI development |
| Munther Basyuni | 5 | yhealth | Code review |
| Zeeshan Basharat | 4 | propertyAI | Data analytics |

**Hamza Muqeem** led development efforts with 28 commits, focusing on
authentication architecture for yHealth and monitoring for propertyAI.

---

### Completed Work Items

| ID | Task | Project | Completed |
|----|------|---------|-----------|
| NS-003 | E07 Story Breakdown | yhealth | Dec 17 |
| NS-004 | V7.0 Release | propertyAI | Dec 18 |

---

## PROBLEMS (Challenges & Blockers)

### Currently Blocked (2)

#### [NS-007] Cloud Provider Setup
- **Project:** buildops
- **Blocked by:** Awaiting AWS credits approval
- **Days blocked:** 5
- **Impact:** Blocks deployment pipeline setup
- **Resolution path:** Escalate to finance for credit approval

#### [NS-002] Roles & Responsibilities Doc
- **Project:** COMPANY
- **Blocked by:** Waiting on NS-001 (Org Structure)
- **Days blocked:** 3
- **Impact:** Delays governance documentation
- **Resolution path:** Complete NS-001 first

---

### Resolved This Week

| Item | Was Blocked By | Resolution |
|------|----------------|------------|
| NS-005 | Design incomplete | Design completed Dec 16 |

---

### Risk Radar

| Risk | Indicator | Recommendation |
|------|-----------|----------------|
| E01 stalled | In progress 14+ days | Review scope, consider splitting |
| No COMPANY commits | 0 commits this week | Schedule governance session |
| Cloud blocker growing | 5 days blocked | Escalate AWS credits |

---

## PLANS (Next Week's Focus)

### Priority Queue

| Priority | ID | Task | Project | Assignee |
|----------|-----|------|---------|----------|
| P0 | NS-001 | Complete E01 Story Review | yhealth | Hamza |
| P0 | NS-007 | Cloud Provider Setup | buildops | Munther |
| P1 | NS-002 | E08 Story Breakdown | yhealth | Hamza |
| P1 | NS-005 | Core App UI | yhealth | Salman |
| P2 | NS-008 | Batch Upload Feature | propertyAI | Zeeshan |

---

### Team Focus

| Member | Primary Focus | Key Items |
|--------|---------------|-----------|
| Hamza | yhealth stories | NS-001, NS-002 |
| Salman | yhealth development | NS-005 |
| Munther | infrastructure | NS-007 |
| Zeeshan | propertyAI features | NS-008 |

---

### Dependencies to Resolve

| Blocker | Owner | Needed By | Impact |
|---------|-------|-----------|--------|
| AWS credits | Finance | Dec 22 | Unblocks NS-007, deployment |
| E01 completion | Hamza | Dec 23 | Unblocks NS-002 |

---

### Milestones to Target

| Project | Milestone | Target | Status |
|---------|-----------|--------|--------|
| yhealth | M-005: E01 Complete | Dec 23 | 60% |
| buildops | M-001: Cloud Setup | Dec 27 | Blocked |

---

## Appendix: Full Commit Log

<details>
<summary>All 45 commits this week</summary>

| Date | Author | Project | Message |
|------|--------|---------|---------|
| Dec 20 | Hamza | yhealth | feat(auth): add password reset |
| Dec 20 | Salman | yhealth | fix(ui): button alignment |
...

</details>

---

=== Report saved to: reports/weekly/2025-W51.html ===
```

---

## HTML Dashboard Features

| Component | Data Source |
|-----------|-------------|
| Metrics Cards | Week totals with week-over-week comparison |
| Activity Chart | Bar chart showing commits per day (Mon-Fri) |
| Team Cards | Members with weekly stats and focus areas |
| Progress Bars | Project/milestone completion percentages |
| Blocked Alert | Red alert for blocked items with durations |
| Plans Table | Next week's priority queue |

### Activity Chart Calculation

```
max_commits = max(mon, tue, wed, thu, fri)
bar_height = (day_commits / max_commits) * 100px
```

---

## Week-over-Week Comparison

If previous week's report exists (`reports/weekly/YYYY-Www-1.md`):
1. Parse previous metrics
2. Calculate deltas
3. Show change indicators (+X, -X, =)

---

## Risk Detection Rules

| Risk Pattern | Detection Logic | Threshold |
|--------------|-----------------|-----------|
| Stalled Item | in_progress > X days | 7 days |
| Silent Project | 0 commits this week | 1 week |
| Growing Blockers | blocked_count > last_week | +1 |
| Unassigned Priority | P0 item with no assignee | Any |
| Long Queue | queued items > X | 10 items |

---

## Integration with Other Skills

| Skill | Integration |
|-------|-------------|
| OPS-02 | Daily reports feed into weekly aggregation |
| DEV-07 | Parses commit messages |
| /progress | Reads PROGRESS.md for milestones |
| /nextsteps | Reads queue status |
| /audit | Risk patterns overlap with audit checks |

---

## Error Handling

| Scenario | Action |
|----------|--------|
| No commits this week | Show warning, continue with queue data |
| No PROGRESS.md found | Skip milestone sections |
| No NEXT-STEPS.md found | Skip work queue sections |
| No previous week data | Skip comparison columns |
| Partial data | Generate report with available data |

---

## Best Practices

**Do:**
- Generate Friday EOD or Monday morning
- Review AI summary for accuracy
- Share with team via email
- Use HTML dashboard in meetings

**Don't:**
- Run mid-week (incomplete data)
- Edit generated reports (regenerate instead)
- Commit reports to git

---

## Related Files

| File | Purpose |
|------|---------|
| `FRAMEWORKS/templates/weekly-ppp-template.md` | Plain text template |
| `FRAMEWORKS/templates/report-html-template.html` | HTML dashboard template |
| `PROJECTS/team.yaml` | Team member registry |
| `reports/weekly/` | Output directory |

---

*Skill OPS-03 v1.0 | Xyric Solutions | 2025-12-25*
