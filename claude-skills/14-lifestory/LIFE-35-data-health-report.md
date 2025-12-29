# LIFE-35: Data Health Report

**Skill ID**: LIFE-35
**Category**: Life Story / Data Integrity
**Priority**: Critical
**Version**: 1.0
**Last Updated**: 2024-12-29

---

## Purpose

Unified orchestrator that combines LIFE-30 (structural integrity) and LIFE-04 (narrative consistency) into a single comprehensive Data Health Report. This is the primary entry point for all data health checks.

**Architecture**:
- **LIFE-30**: Structural integrity (18 rules) - data sync, questions, relationships
- **LIFE-04**: Narrative consistency - story contradictions, timeline issues
- **LIFE-35**: Orchestrates both, deduplicates, prioritizes, and presents unified report

---

## When to Activate

**Manual Invocation**:
```
/health              → Full data health report (LIFE-30 + LIFE-04)
/health quick        → Structural only (LIFE-30 only)
/health narrative    → Narrative only (LIFE-04 only)
/data-health         → Alias for /health
/consistency-check   → Alias for /health (backward compatible)
```

**Automatic (Session-End Protocol)**:
Before ending ANY session where data was modified, `/health` MUST run.

**Related Skills**:
| Skill | Integration |
|-------|-------------|
| LIFE-30 | Provides structural integrity data (18 rules) |
| LIFE-04 | Provides narrative consistency data |
| LIFE-31 | Called to fix sync issues after report |

---

## Workflow

```
/health command
       ↓
┌─────────────────────────────────────┐
│ LIFE-35 Orchestrator                │
│                                     │
│ 1. Run LIFE-30 (all 18 rules)      │
│    - Category A: Bidirectional sync │
│    - Category B: Question bank      │
│    - Category C: Relationships      │
│    - Category D: Narrative (partial)│
│                                     │
│ 2. Run LIFE-04 (narrative)         │
│    - Timeline contradictions        │
│    - Story conflicts                │
│    - Character consistency          │
│                                     │
│ 3. Deduplicate findings            │
│    - Rules 17-18 may overlap        │
│      with LIFE-04 findings          │
│    - Remove duplicates, keep most   │
│      detailed version               │
│                                     │
│ 4. Prioritize issues               │
│    - Critical: Rules 1-8 failures   │
│    - High: Narrative contradictions │
│    - Medium: Missing profiles       │
│    - Low: Question bank cleanup     │
│                                     │
│ 5. Generate unified report         │
└─────────────────────────────────────┘
       ↓
   Data Health Report
```

---

## Command Variants

### `/health` - Full Report

Runs both LIFE-30 and LIFE-04:

```
1. Execute LIFE-30 (18 rules)
2. Execute LIFE-04 (narrative check)
3. Merge and deduplicate findings
4. Generate unified report with all categories
```

### `/health quick` - Structural Only

Runs only LIFE-30 (faster, for quick checks):

```
1. Execute LIFE-30 (18 rules)
2. Skip LIFE-04
3. Generate report with structural findings only
4. Note: "Run /health for full narrative check"
```

### `/health narrative` - Narrative Only

Runs only LIFE-04 (focused on story consistency):

```
1. Skip LIFE-30
2. Execute LIFE-04 (narrative check)
3. Generate narrative-focused report
4. Note: "Run /health for full structural check"
```

---

## Output Format

```markdown
# Data Health Report
Generated: 2024-12-29 12:00:00

## Executive Summary

| Category | Status | Issues | Actions Needed |
|----------|--------|--------|----------------|
| Structural Sync (1-8) | ✓ | 0 | None |
| Question Bank (9-12) | ⚠️ | 2 | Review questions |
| Relationships (13-16) | ⚠️ | 4 | Create profiles |
| Narrative (LIFE-04) | ✓ | 0 | None |

**Overall Status**: ATTENTION NEEDED
**Critical Issues**: 0
**Total Issues**: 6

---

## Priority Actions

### High Priority (Fix Now)
1. ✗ No critical issues found

### Medium Priority (Address Soon)
2. ⚠️ Create 7 missing character profiles (Rule 16)
3. ⚠️ Run /promote on journals (Rule 15: 6 untriggered)
4. ⚠️ Explore 6 unexplored leads (Rule 14)

### Low Priority (When Convenient)
5. ℹ️ Review 2 potentially answered questions (Rule 11)
6. ℹ️ Consider merging 1 similar question cluster (Rule 10)

---

## Detailed Findings

### Category A: Structural Sync ✓
All 8 rules passed. Data integrity confirmed.

### Category B: Question Bank
- Rule 9 (Duplicates): ✓ None found
- Rule 10 (Similar): ⚠️ 1 cluster identified
- Rule 11 (Answered): ⚠️ 2 questions potentially answered
- Rule 12 (Coverage): ✓ All entries have questions

### Category C: Relationships
- Rule 13 (Entry Links): ✓ No missing connections
- Rule 14 (Leads): ⚠️ 6/6 unexplored
- Rule 15 (Triggers): ⚠️ 0/6 converted
- Rule 16 (Profiles): ⚠️ 7 characters, 2 locations missing

### Category D: Narrative (LIFE-04)
- Timeline: ✓ No contradictions
- Characters: ✓ Consistent descriptions
- Stories: ✓ No conflicts detected

---

## Metrics Dashboard

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Entries | 2 | 10+ | 🔴 20% |
| Word Count | 911 | 80,000 | 🔴 1% |
| Characters Profiled | 1 | 8+ | 🔴 13% |
| Locations Profiled | 0 | 5+ | 🔴 0% |
| Lead Resolution | 0% | 50%+ | 🔴 0% |
| Trigger Conversion | 0% | 30%+ | 🔴 0% |
| Question Coverage | 100% | 100% | 🟢 100% |

---

## Session Compliance

✓ Rules 1-8 passed - session may end
⚠️ 6 non-blocking issues for future attention

---

*Data Health Report generated by LIFE-35 v1.0*
*Sources: LIFE-30 v3.0 (18 rules), LIFE-04 (narrative)*
```

---

## Deduplication Logic

When LIFE-30 Rules 17-18 and LIFE-04 find the same issue:

```
1. Compare issue subjects (entry_id, character_id)
2. If same subject found in both:
   - Keep the more detailed description
   - Note source as "LIFE-30 + LIFE-04"
3. Merge severity levels:
   - Take the higher severity
   - Critical > High > Medium > Low
```

**Example**:
```
LIFE-30 Rule 17: "E-2024-002 timeline unclear"
LIFE-04: "E-2024-002 says 'late 2000s' but mentions Season 3 (2013)"
→ Keep LIFE-04 version (more detailed)
→ Note: "Source: LIFE-04 (confirmed by Rule 17)"
```

---

## Priority Scoring

Issues are scored by impact:

| Rule Category | Base Score | Multiplier |
|---------------|------------|------------|
| Rules 1-8 (Structural) | 100 | Critical |
| LIFE-04 Contradictions | 80 | High |
| Rule 16 (Missing Profiles) | 60 | Medium |
| Rules 14-15 (Lead/Trigger) | 40 | Medium |
| Rules 9-12 (Questions) | 20 | Low |

**Final Priority**:
1. Sort by score descending
2. Group by priority level
3. Present in priority order

---

## Integration with Session-End Protocol

When session is ending:

```
1. LIFE-35 automatically runs /health
2. Check if Rules 1-8 all pass
   - If YES: "Data integrity verified. Session may end."
   - If NO: "Critical issues found. Fix before ending session."
3. List non-blocking issues for next session
4. Save report to /metadata/health-reports/YYYY-MM-DD.md (optional)
```

---

## Success Criteria

A healthy data state shows:
- [ ] All 18 LIFE-30 rules checked
- [ ] LIFE-04 narrative check complete
- [ ] No duplicate findings in report
- [ ] Issues prioritized correctly
- [ ] Clear action items for each issue
- [ ] Session-end compliance determined

---

## Anti-Patterns

**Do NOT**:
- Run LIFE-30 and LIFE-04 independently for session-end checks
- Show duplicate findings from overlapping rules
- Block session end for non-critical issues (Rules 9-18)
- Skip the priority sorting

**DO**:
- Use LIFE-35 as the single entry point for all health checks
- Deduplicate findings before presenting
- Clearly separate critical vs non-critical issues
- Provide specific, actionable fix instructions

---

*Skill LIFE-35 v1.0 | Life Story System | 2024-12-29*
*Created to unify LIFE-30 and LIFE-04 into comprehensive data health system*
