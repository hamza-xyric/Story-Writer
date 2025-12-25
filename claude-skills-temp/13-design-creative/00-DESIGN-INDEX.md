# Design & Creative - Master Index

**Version**: 2.0
**Created**: 2025-12-07
**Updated**: 2025-12-10
**Purpose**: Visual design, theming, creative generation, and frontend aesthetics
**Total Skills**: 4
**Source**: [Anthropic's official Claude Skills repository](https://github.com/anthropics/claude-code/tree/main/docs/skills)

---

## Overview

These are Anthropic's recommended design practices, providing specialized skills for different creative outputs. Each skill has a distinct purpose - use the right tool for the job.

---

## When to Use Each Skill

| I need to... | Use This Skill | Output |
|-------------|----------------|--------|
| Create a poster, illustration, or visual art | **DESIGN-01** Canvas Design | .pdf, .png |
| Apply consistent styling to slides/docs/artifacts | **DESIGN-02** Theme Factory | Styled artifact |
| Create generative/algorithmic art | **DESIGN-03** Algorithmic Art | Interactive HTML |
| Build a distinctive web UI (page, component, app) | **DESIGN-04** Frontend Design | HTML/CSS/JS, React |
| Plan UX flows, conduct research, do Figma handoff | **EXPERT-11** UX/UI Designer | Design specs |
| Implement React/TypeScript frontend code | **EXPERT-01** Senior Frontend | Production code |

### Skill Selection Decision Tree

```
Creating something visual?
├── Static art/poster/illustration → DESIGN-01 (Canvas Design)
├── Interactive/generative art → DESIGN-03 (Algorithmic Art)
├── Web interface/UI → DESIGN-04 (Frontend Design)
│   └── Need UX process/research/Figma? → Also use EXPERT-11
└── Styling existing artifact → DESIGN-02 (Theme Factory)
```

---

## Quick Reference

| Skill | ID | Type | Output Format |
|-------|-----|------|---------------|
| **Canvas Design** | DESIGN-01 | Static Art | .pdf, .png files |
| **Theme Factory** | DESIGN-02 | Theming | Styled artifacts |
| **Algorithmic Art** | DESIGN-03 | Generative | Interactive HTML |
| **Frontend Design** | DESIGN-04 | Web UI | HTML/CSS/JS, React, Vue |

---

## Skill Details

### DESIGN-01: Canvas Design
- **Path**: `DESIGN-01-canvas-design/SKILL.md`
- **Purpose**: Create museum-quality visual art through design philosophy
- **Process**: 1) Create design philosophy, 2) Express it visually on canvas
- **Resources**: 17 system fonts in `canvas-fonts/`
- **Best For**: Posters, illustrations, visual assets, diagrams
- **Key Principle**: "Meticulous craftsmanship" - work should look expertly labored over

### DESIGN-02: Theme Factory
- **Path**: `DESIGN-02-theme-factory/SKILL.md`
- **Purpose**: Apply consistent professional styling to any artifact
- **Resources**: 10 pre-made themes in `themes/`, showcase in `theme-showcase.pdf`
- **Best For**: Styling slides, documents, reports, landing pages
- **Key Principle**: Show themes first, let user choose, then apply consistently

### DESIGN-03: Algorithmic Art
- **Path**: `DESIGN-03-algorithmic-art/SKILL.md`
- **Purpose**: Create generative art with seeded randomness and parameter exploration
- **Process**: 1) Create algorithmic philosophy, 2) Express it in p5.js code
- **Resources**: Templates in `templates/`
- **Best For**: Generative art, flow fields, particle systems, interactive experiences
- **Key Principle**: Same seed = identical output; beauty in the process, not final frame

### DESIGN-04: Frontend Design
- **Path**: `DESIGN-04-frontend-design/SKILL.md`
- **Purpose**: Create distinctive, production-grade web interfaces
- **Output**: Working HTML/CSS/JS, React, Vue, or other framework code
- **Best For**: Web pages, apps, dashboards, components, landing pages
- **Key Principles**:
  - Avoid generic "AI slop" aesthetics
  - Choose distinctive typography (NOT Inter, Roboto, Arial)
  - Bold aesthetic direction with intentional design choices
  - Production-grade, functional code

---

## Integration with Expert Agents

### DESIGN-04 + EXPERT-11: Complementary Roles

| Aspect | DESIGN-04 (Frontend Design) | EXPERT-11 (UX/UI Designer) |
|--------|---------------------------|---------------------------|
| **Focus** | Visual aesthetics, creative direction | UX process, user research |
| **Output** | Production code | Design specs, Figma prototypes |
| **Typography** | Distinctive, unique choices | Context-dependent |
| **Process** | Creative exploration | Systematic UX methodology |
| **Accessibility** | Considered | Expert-level WCAG AA |

### Recommended Workflow

1. **EXPERT-11** defines UX requirements, user flows, accessibility specs
2. **DESIGN-04** provides creative aesthetic direction and production code
3. **EXPERT-01** implements and refines the frontend

### Brand Context

| Work Type | Brand Approach | Design Skill |
|-----------|---------------|--------------|
| **Xyric Solutions (Consultancy)** | Use Xyric brand tokens | EXPERT-11 brand guidelines |
| **Xyric Products (DR AI, yHealth)** | Creative freedom | DESIGN-04 aesthetics |
| **Client Work** | Client's brand | Apply client guidelines |

---

## Related Skills

- `10-expert-agents/EXPERT-11-ux-ui-designer.md` - UX process, Figma, accessibility
- `10-expert-agents/EXPERT-01-senior-frontend.md` - React/TypeScript implementation
- `02-marketing/MKT-03-brand-guidelines/` - Xyric Solutions brand (consultancy only)
- `03-content-creation/` - Visual content for social media

---

## Source & License

These skills are from [Anthropic's official Claude Skills repository](https://github.com/anthropics/claude-code/tree/main/docs/skills). Each skill folder contains a `LICENSE.txt` file with Apache 2.0 license terms.
