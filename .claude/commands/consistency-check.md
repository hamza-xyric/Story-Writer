---
description: Alias for /health - Full data health report
---

# /consistency-check

**Note:** This command is now an alias for `/health`. Use `/health` for the unified Data Health Report.

Runs LIFE-35 (Data Health Report) which orchestrates:
- **LIFE-30**: 18 structural integrity rules
- **LIFE-04**: Narrative consistency (contradictions, timeline)

## Commands

```
/health              → Full report (LIFE-30 + LIFE-04)
/health quick        → Structural only (LIFE-30, faster)
/health narrative    → Narrative only (LIFE-04)
/consistency-check   → This alias, same as /health
```

## Reference
- Full orchestrator: `claude-skills/14-lifestory/LIFE-35-data-health-report.md`
- Structural rules: `claude-skills/14-lifestory/LIFE-30-data-consistency-checker.md`
- Narrative rules: `claude-skills/14-lifestory/LIFE-04-consistency-guardian.md`

## 18 Integrity Rules

**Category A: Bidirectional Sync (Rules 1-8) - CRITICAL**
1. Entry ↔ Character sync
2. Entry ↔ Location sync
3. Entry ↔ Chapter sync
4. Chapter ↔ Book sync
5. Character ↔ Character relations
6. Draft ↔ Entry sync
7. Word count cascade
8. Section entry subset

**Category B: Question Bank (Rules 9-12) - WARNING**
9. Duplicate question detection
10. Similar question clustering
11. Answered question detection
12. Question coverage

**Category C: Relationships (Rules 13-16) - INFO**
13. Entry ↔ Entry connections
14. Lead → Entry resolution
15. Journal → Entry triggers
16. Missing profile detection

**Category D: Narrative (Rules 17-18) - WARNING**
17. Timeline consistency
18. Character trait consistency

## Output Format

```
# Data Consistency Report
Generated: 2024-12-25 12:00:00

## Summary
- Entries checked: 2
- Chapters checked: 2
- Books checked: 1
- Issues found: 3
- Warnings: 1

---

## Critical Issues (Must Fix)

### Word Count Mismatches
- Chapter C-001-03-01: stored 289 words, calculated 548 words
- Book B-001: stored 636 words, calculated 807 words

---

## Warnings

### Orphaned Entries
- E-2024-003: "Childhood Memory" - not assigned to any chapter

---

## All Clear

### Entry Word Counts
- E-2024-001: 259 words (verified)
- E-2024-002: 548 words (verified)

### Chapter Links
- C-001-03-01: 1 entry (all valid)

---

## Recommended Action

Run `/sync-counts` to fix word count mismatches automatically.
```

## After Running

If issues found:
- Word count mismatches: Run `/sync-counts` to fix automatically
- Broken links: Manually update listed files
- Orphaned entries: Assign to chapters with `/book move-entry`

## Related Commands
- `/sync-counts` - Fix word count mismatches (LIFE-31)
- `/book` - View and manage book structure
