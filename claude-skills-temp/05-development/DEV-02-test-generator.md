# DEV-02: Test Generator

**Skill ID**: DEV-02
**Category**: Development
**Priority**: 🔴 Critical
**Version**: 2.1
**Last Updated**: 2025-12-09

---

## Purpose

Generate comprehensive test suites following Xyric standards. Focus on behavior verification, not implementation details.

---

## When to Activate

**Triggers**:
- "Write tests for this code"
- "Generate unit tests for [function/class]"
- Before deploying new features
- After code changes to existing functionality

---

## Xyric Testing Standards

### Coverage Targets
| Metric | Target |
|--------|--------|
| Statement | ≥ 80% |
| Branch | ≥ 75% |
| Function | ≥ 80% |
| Line | ≥ 80% |

### Priority Order
1. **Critical**: Business logic, payments, auth
2. **High**: User-facing features, data transformations
3. **Medium**: API endpoints, integrations
4. **Low**: Simple getters, config wrappers

---

## Test Structure

Use standard `describe`/`test` blocks with Arrange-Act-Assert:

```
describe('[Module/Function Name]', () => {
  describe('Happy Path', () => { ... });
  describe('Edge Cases', () => { ... });
  describe('Error Handling', () => { ... });
});
```

### Test Categories to Cover
- **Happy path**: Normal inputs, expected outputs
- **Edge cases**: Empty, null, boundary values
- **Error cases**: Invalid inputs, missing params
- **Async**: Timeouts, cancellation, failures

---

## Xyric Rules

1. **Test behavior, not implementation** - tests should survive refactoring
2. **One assertion per test** - when practical, keeps failures clear
3. **Descriptive names**: `should [behavior] when [condition]`
4. **No shared state** - each test is independent
5. **Mock external dependencies** - database, APIs, filesystem
6. **Reproduce bugs with tests** - before fixing, write a failing test

---

## Integration

| Skill | Integration |
|-------|-------------|
| DEV-01 | Review test quality in PRs |
| DEV-03 | Write tests to reproduce bugs |
| EXPERT-04 | Follows QA Engineer standards |

---

## Anti-Patterns

- Testing implementation details (breaks on refactor)
- Tests that always pass (useless)
- Random data without seeding (flaky)
- Tests depending on each other (fragile)

---

*Skill DEV-02 v2.1 | Xyric Solutions | 2025-12-09*
