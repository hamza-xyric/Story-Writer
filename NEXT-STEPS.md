# Life Story System - Next Steps

**Last Updated**: 2024-12-24
**Current Phase**: Personalization Complete, Viewer Next

---

## Vision Recap

A personal memoir system where you can:
- Capture memories through freeform writing, conversation, or voice
- Have AI learn your voice and act as your ghostwriter
- View your story through multiple lenses (timeline, characters, themes)
- Eventually compile into a printable book

---

## What's Done

### Personalization & Input (Complete)

- [x] Voice profile schema (vocabulary, narrative, sensory patterns)
- [x] Voice capture pipeline (runs after every entry)
- [x] Ghostwriter mode (generates prose in your voice)
- [x] Sensitivity detection and handling
- [x] Session memory and continuity
- [x] Freeform capture (`/freeform`)
- [x] Biographer conversation (`/biographer`)
- [x] Voice capture workflow (`/voice`)
- [x] Draft processor (`/process`)

---

## What's Next

### Phase 3: Interactive Viewer

**Purpose**: Visualize and explore your story in multiple ways

**Tech Stack**:
- Vite + React + TypeScript
- Tailwind CSS
- D3.js for visualizations
- Fuse.js for search

**Core Views**:

| View | Description |
|------|-------------|
| Entry Browser | Corkboard (cards) + Outliner (table) + Reader |
| Character Profiles | Who they are, their arc, stories involving them |
| Timeline | Zoomable (decades → years → months) |
| Theme Explorer | How themes weave through your story |
| Relationship Maps | Family trees, friend groups, connections |

**Directory**: `/viewer/`

---

### Phase 4: Book Generation

**Skills to Build**:

| ID | Name | Purpose |
|----|------|---------|
| LIFE-20 | Book Architect | Organize entries into chapter structure |
| LIFE-21 | Chapter Generator | Weave entries into cohesive narratives |
| LIFE-22 | Prose Polisher | Refine for publication quality |
| LIFE-23 | Export Manager | Generate PDF, EPUB, HTML |

**Output Formats**:
- PDF (print-ready book)
- EPUB (e-readers)
- HTML (web viewing)
- Audiobook (future)

---

### Phase 5: Additional Features

**Inspired by research**:
- Weekly prompts (like Storyworth)
- Photo-based memory prompts (like Remento)
- Multiple output formats (like Life Memoirs AI)
- Voice model training for better personalization

---

## Immediate Next Action

**Start writing** to begin training the voice profile, OR **build the viewer** to visualize as you write.

### To Start Writing

Just say:
```
/freeform
```
And share a memory. No pressure, no structure needed.

### To Build Viewer

Initialize:
```bash
cd "/Users/hamza/Story Writer"
npm create vite@latest viewer -- --template react-ts
cd viewer
npm install tailwindcss d3 fuse.js gray-matter
```

---

## Success Criteria

The system is successful when:

- [ ] Memories can be captured effortlessly (any mode)
- [ ] AI generates prose that sounds like Hamza
- [ ] Stories can be viewed by timeline, character, theme
- [ ] Relationships between people/places are visualized
- [ ] A book can be generated from entries
- [ ] The whole life is recorded

---

## Research Sources

Tools that inspired this system:
- [Life Story AI](https://life-story.ai/) - Conversational biographer
- [Storyworth](https://welcome.storyworth.com/storyteller) - Weekly prompts
- [Remento](https://www.remento.co/) - Photo-based prompts
- [Life Memoirs AI](https://www.lifememoirs.ai/) - Multi-format output
- [StoriedLife](https://www.storiedlife.ai/) - AI memoir creation

---

*Next Steps v2.0 | 2024-12-24*
