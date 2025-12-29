---
description: Unified Data Health Report (LIFE-35)
---

# /health

Run a comprehensive data health check combining structural integrity (LIFE-30) and narrative consistency (LIFE-04) into a unified report.

## Commands

```
/health              → Full report (LIFE-30 + LIFE-04)
/health quick        → Structural only (faster, 18 rules)
/health narrative    → Narrative only (story contradictions)
/consistency-check   → Alias for /health
```

## Reference

- Orchestrator: `claude-skills/14-lifestory/LIFE-35-data-health-report.md`
- Structural: `claude-skills/14-lifestory/LIFE-30-data-consistency-checker.md`
- Narrative: `claude-skills/14-lifestory/LIFE-04-consistency-guardian.md`
- Standards: `story-data/context/data-standards.md`

## 18 Integrity Rules

| Category | Rules | Severity | Focus |
|----------|-------|----------|-------|
| A: Bidirectional Sync | 1-8 | Critical | Data structure integrity |
| B: Question Bank | 9-12 | Warning | Exploration question health |
| C: Relationships | 13-16 | Info | Entry/profile connections |
| D: Narrative | 17-18 | Warning | Story consistency |

**Rules 1-8 MUST pass before session can end.**

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
1. ✗ [Any critical Rule 1-8 failures]

### Medium Priority (Address Soon)
2. ⚠️ [Rule 9-18 issues]

### Low Priority (When Convenient)
3. ℹ️ [Informational items]

---

## Session Compliance

✓ Rules 1-8 passed - session may end
⚠️ 6 non-blocking issues for future attention
```

## Session-End Protocol

Before ending ANY session where story data was modified:

1. Run `/health`
2. Rules 1-8 (Critical) **MUST** pass
3. Rules 9-18 are noted for future attention
4. State "Data integrity verified" in closing

**MANDATORY** - session not complete until verified.

## After Running

If critical issues (Rules 1-8) found:
- Fix immediately before session ends
- Run `/sync-counts` for word count mismatches
- Manually fix broken links

If warning issues (Rules 9-18) found:
- Note for future attention
- Session may still end
- Address in next session

## Related Commands

- `/sync-counts` - Fix word count mismatches (LIFE-31)
- `/book` - View and manage book structure
