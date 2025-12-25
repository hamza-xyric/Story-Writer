# DEV-07: Commit Message Generator

**Skill ID**: DEV-07
**Category**: Development
**Priority**: 🟡 High
**Version**: 1.0
**Last Updated**: 2025-12-24

---

## Purpose

Generate clear, structured commit messages with AI-powered summaries. Follows conventional commits format and integrates with Xyric's story/task tracking.

---

## When to Activate

**Triggers**:
- `/commit` slash command
- "Generate a commit message"
- "What should I commit as?"
- "Summarize my changes for commit"
- Before staging significant changes

---

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types (Required)

| Type | Use When |
|------|----------|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `refactor` | Code restructuring (no behavior change) |
| `docs` | Documentation only |
| `style` | Formatting, whitespace (no logic change) |
| `test` | Adding or updating tests |
| `chore` | Build, config, dependencies |
| `perf` | Performance improvements |

### Scope (Optional)

Area of codebase affected. Examples: `auth`, `api`, `ui`, `db`, `config`

### Subject Line Rules

- Imperative mood ("add" not "added" or "adds")
- No period at end
- Max 50 characters
- Lowercase start

### Body (Required for non-trivial changes)

- Explain WHAT changed and WHY
- Wrap at 72 characters
- Use bullet points for multiple changes
- Focus on business impact, not just code changes

### Footer (When applicable)

- `Refs: S01-05` - Story reference
- `Refs: NS-001` - Task reference
- `Fixes: #123` - Issue reference
- `BREAKING CHANGE:` - For breaking changes

---

## Workflow

### Step 1: Analyze Changes

```bash
git diff --staged
git status
```

Understand:
- What files changed
- What functionality was added/modified/removed
- What the user's intent was

### Step 2: Determine Type

Match changes to the most appropriate type:
- New endpoint? → `feat`
- Fixed null pointer? → `fix`
- Moved code around? → `refactor`
- Updated README? → `docs`

### Step 3: Identify Scope

Look at the primary area affected:
- `src/components/` → `ui`
- `src/api/` → `api`
- `tests/` → `test`
- Cross-cutting → omit scope

### Step 4: Write Subject

Summarize in imperative form:
- "add password reset flow"
- "fix null check in user service"
- "refactor auth middleware"

### Step 5: Write Body

For changes beyond trivial:
- Explain the motivation
- Describe what changed at a high level
- Note any important decisions

### Step 6: Add References

Link to stories/tasks if applicable:
- Check for story ID in branch name
- Ask user if not obvious

---

## Output Template

```
<type>(<scope>): <subject>

<2-4 sentence summary of what changed and why>

<bullet points for multiple changes, if needed>

Refs: <story-id or task-id if applicable>
```

---

## Examples

### Feature Addition

```
feat(auth): add password reset flow

Implemented complete password reset functionality with email
verification, secure token generation (1-hour expiry), and
rate limiting to prevent abuse.

- Added /api/auth/forgot-password endpoint
- Created PasswordReset email template
- Added rate limiter (3 requests per hour)

Refs: S01-05
```

### Bug Fix

```
fix(api): handle null user in session check

Session middleware was crashing when accessing protected routes
with an expired token. Now gracefully redirects to login.

Refs: NS-042
```

### Refactor

```
refactor(db): extract query builders to separate module

Moved inline SQL query construction to dedicated QueryBuilder
class to improve testability and reduce duplication across
repository files.
```

### Simple Change

```
docs: update API authentication section
```

---

## Xyric Rules

1. **Never invent details** - Only describe what actually changed
2. **Business language** - "Enable users to reset passwords" not "Add POST endpoint"
3. **Be specific** - "Fix null check in UserService.getProfile()" not "Fix bug"
4. **Keep subject concise** - Details go in body, not subject
5. **Link to tracking** - Always reference stories/tasks when applicable

---

## Integration

| Skill | Integration |
|-------|-------------|
| DEV-01 | After code review, generate commit for approved changes |
| EXPERT-13 | Reference story IDs from generated stories |
| GitHub Workflow | Message format optimized for Slack notifications |

---

## Anti-Patterns

- Vague subjects: "Update code", "Fix stuff", "WIP"
- Past tense: "Added feature" instead of "add feature"
- Including file lists in subject (use body instead)
- Omitting scope when changes are clearly scoped
- Giant commits with multiple unrelated changes
- Skipping body for significant changes

---

*Skill DEV-07 v1.0 | Xyric Solutions | 2025-12-24*
