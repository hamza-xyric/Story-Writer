# RESEARCH-02: GitHub Repository Research

**Skill ID**: RESEARCH-02
**Category**: Research & Analysis
**Priority**: 🟡 High
**Version**: 1.0
**Last Updated**: 2025-12-21

---

## Purpose

Research and curate GitHub repositories for any app or product idea. Produces structured markdown files with repository assessments, technology breakdowns, and actionable recommendations for starting new projects.

---

## When to Activate

**Triggers**:
- `/github-research <app-idea>`
- "Find GitHub repos for [app type]"
- "Research open source [app type] projects"
- "What repos can I use to build [app type]?"
- Before starting a new app/product development
- When evaluating open source starting points

---

## Research Workflow

### Phase 1: Query Formulation
Define search strategy based on the app idea:
- Primary search terms (app type + clone/template/starter)
- Technology-specific queries (React Native, Flutter, Next.js variants)
- Feature-specific queries (authentication, payments, maps)

### Phase 2: Execute Search
Use multiple search approaches:
1. **GitHub Search**: `<app-type> clone` (sort by stars, recent updates)
2. **GitHub Code Search**: specific patterns or integrations
3. **Web Search**: "best <app-type> open source GitHub 2025"
4. **Developer blogs/tutorials**: often link to quality repos

### Phase 3: Repository Analysis
Assess each promising repository using **STARS-D Framework**:

| Dimension | Focus | Key Questions |
|-----------|-------|---------------|
| **S**tack | Technology | What tech stack? Dependencies? Matches preferences? |
| **T**imeliness | Activity | Last commit? Active maintenance? Issues addressed? |
| **A**rchitecture | Quality | Clean code? Good patterns? Test coverage? |
| **R**each | Community | Stars? Forks? Contributors? Issues activity? |
| **S**cope | Coverage | What features included? What's missing? Production-ready? |
| **D**ocumentation | Quality | README complete? Setup instructions? API docs? Tutorials? |

### Phase 4: Curate & Recommend
- Group by technology stack/platform
- Rank within each category
- Provide use-case-based recommendations
- Note synergies (combining features from multiple repos)

---

## STARS-D Assessment Details

### Stack Assessment
```
- Primary language/framework
- Key dependencies (state management, UI libraries)
- Database/backend technology
- Third-party integrations (maps, payments, auth)
- Build tooling (bundlers, dev environment)
```

### Timeliness Indicators
| Indicator | Good | Warning |
|-----------|------|---------|
| Last commit | < 3 months | > 12 months |
| Open issues response | < 1 week | > 3 months |
| Dependency updates | Current | Outdated |

### Architecture Signals
- Folder structure organization
- Separation of concerns
- Testing presence (unit, integration, e2e)
- TypeScript usage (if applicable)
- Environment configuration

### Reach Metrics
- Stars (popularity indicator)
- Forks (community adoption)
- Contributors (maintenance capacity)
- Issues/PRs (community engagement)

### Scope Evaluation
Document what the repo includes:
```
CORE FEATURES:
- [ ] Authentication (email, OAuth)
- [ ] User profiles
- [ ] Core app functionality
- [ ] Payments integration
- [ ] Real-time features
- [ ] Admin panel

PRODUCTION READINESS:
- [ ] Environment configuration
- [ ] Deployment documentation
- [ ] Error handling
- [ ] Security considerations
```

### Documentation Quality Rating
| Rating | Criteria |
|--------|----------|
| ⭐⭐⭐⭐⭐ | Complete README, setup guide, API docs, tutorials, examples |
| ⭐⭐⭐⭐ | Good README, clear setup, some API documentation |
| ⭐⭐⭐ | Basic README, setup instructions present |
| ⭐⭐ | Minimal README, may require code reading |
| ⭐ | No documentation, code only |

---

## Output Template

Save research output to: `NOTES/{app-name}-repositories-research.md`

```markdown
# [App Type] - Repository Research

**Research Date:** [Date]
**Reference Article:** [if applicable]

---

## Executive Summary

Found **[X]+ repositories** on GitHub related to [app type] applications. Below is a curated list of the most promising open-source projects.

---

## Top Recommended Repositories

### 1. [Platform/Stack Category] (e.g., React Native / TypeScript)

#### [username/repo-name]
- **Tech Stack:** [Framework], [Database], [Key Libraries]
- **GitHub:** [URL]
- **Status:** [Active/Maintained/In Progress/Archived]
- **Last Updated:** [Month Year]
- **Stars/Forks:** [X] stars / [Y] forks
- **Features:**
  - [Feature 1]
  - [Feature 2]
  - [Feature 3]
- **Scope Coverage:** [What it includes, what's missing]
- **Documentation:** [⭐ rating] - [brief notes]
- **Best for:** [Specific use case]

---

### 2. [Next Platform/Stack Category]
[Continue pattern...]

---

## Key Developers/Projects

1. **[Developer/Org Name]** (@handle)
   - [What they're known for]
   - [Notable repos]

---

## Technology Stack Breakdown

### Frontend Technologies
- **[Tech 1]** (Most popular) - [notes]
- **[Tech 2]** (Alternative) - [notes]

### Backend Technologies
- **[Tech 1]** - Most common
- **[Tech 2]** - Alternative

### Key Integrations
- **[Integration 1]** - [purpose]
- **[Integration 2]** - [purpose]

---

## Recommendations Based on Use Case

### For [Use Case 1] (e.g., Learning/Tutorial)
- **[repo-name]** - [Why recommended]

### For [Use Case 2] (e.g., Production-Ready)
- **[repo-name]** - [Why recommended]

### For [Use Case 3] (e.g., Specific Platform)
- **[repo-name]** - [Why recommended]

---

## Search Methodology

1. [Search approach 1]
2. [Search approach 2]
3. [Search approach 3]

---

## Notes

- [Important consideration 1]
- [Important consideration 2]
- Check license compatibility before commercial use
- API keys required: [list any required]

---

## Additional Resources

- [Resource 1]: [URL]
- [Resource 2]: [URL]
- **Total Repositories Found:** [X]+ on GitHub
- **Last Updated:** [Date]

---

## Next Steps

1. Review top 3-5 repositories matching your tech stack
2. Clone and test locally to evaluate code quality
3. Check for active maintenance and community support
4. Review license agreements
5. Identify customization needs
```

---

## Integration

| Skill | Integration |
|-------|-------------|
| CORE-02 | Research-first workflow provides methodology foundation |
| RESEARCH-01 | Competitive analysis patterns inform repository comparison |
| DEV-01 | Code review framework can assess repository code quality |

---

## Anti-Patterns

- Recommending only the most-starred repos (stars ≠ quality)
- Ignoring recently updated repos with fewer stars
- Not checking license compatibility
- Assuming active = production-ready
- Overlooking repos with excellent docs but fewer features
- Single-source recommendations without alternatives

---

## Success Criteria

- [ ] Multiple search approaches used (GitHub, web, blogs)
- [ ] Repositories assessed using STARS-D framework
- [ ] Grouped by platform/technology stack
- [ ] Use-case-based recommendations provided
- [ ] Documentation quality explicitly noted
- [ ] Scope coverage clearly described
- [ ] Output file saved to NOTES/ folder
- [ ] Next steps actionable

---

*Skill RESEARCH-02 v1.0 | Xyric Solutions | 2025-12-21*
