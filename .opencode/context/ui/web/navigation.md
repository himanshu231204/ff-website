<!-- Context: ui/navigation | Priority: critical | Version: 1.1 | Updated: 2026-04-13 -->

# Web UI Context

**Purpose**: Web-based UI patterns, animations, styling standards, and React component design

**Last Updated**: 2026-04-13

---

## Quick Navigation

### Concepts (What it is)

| File | Description | Priority |
|------|-------------|----------|
| [concepts/react-patterns.md](concepts/react-patterns.md) | Modern React patterns, hooks, component design | high |
| [concepts/ui-styling-standards.md](concepts/ui-styling-standards.md) | CSS frameworks, Tailwind patterns, styling best practices | high |
| [concepts/design-systems.md](concepts/design-systems.md) | Design system principles and component libraries | medium |

### Guides (How to do)

| File | Description | Priority |
|------|-------------|----------|
| [guides/animation-basics.md](guides/animation-basics.md) | Animation fundamentals, timing, easing | high |
| [guides/animation-advanced.md](guides/animation-advanced.md) | Recipes, best practices, accessibility | medium |

### Examples (Working code)

| File | Description | Priority |
|------|-------------|----------|
| [examples/animation-components.md](examples/animation-components.md) | Button, card, modal, dropdown animations | high |
| [examples/animation-loading.md](examples/animation-loading.md) | Skeleton, spinner, progress animations | medium |
| [examples/animation-chat.md](examples/animation-chat.md) | Chat UI and message animations | medium |
| [examples/animation-forms.md](examples/animation-forms.md) | Form input and validation animations | medium |

### Subcategories

| Subcategory | Description | Path |
|-------------|-------------|------|
| **design/** | Advanced design patterns (scrollytelling, effects) | [design/navigation.md](design/navigation.md) |

---

## Loading Strategy

### For general web UI work:
1. Load `concepts/ui-styling-standards.md` (CSS frameworks, Tailwind)
2. Load `concepts/react-patterns.md` (component patterns)
3. Reference `guides/animation-basics.md` (if animations needed)

### For animation work:
1. Load `guides/animation-basics.md` (fundamentals, timing, easing)
2. Load `examples/animation-components.md` (UI component animations)
3. Reference `examples/animation-chat.md` for chat UI patterns
4. Reference `guides/animation-advanced.md` for recipes and accessibility

### For scroll animations:
1. Navigate to `design/` subcategory
2. Load scroll-linked animation guides

---

## Structure

```
ui/web/
├── navigation.md
├── concepts/           # What it is
│   ├── react-patterns.md
│   ├── ui-styling-standards.md
│   └── design-systems.md
├── examples/          # Working code
│   ├── animation-components.md
│   ├── animation-loading.md
│   ├── animation-chat.md
│   └── animation-forms.md
├── guides/           # How to do
│   ├── animation-basics.md
│   └── animation-advanced.md
├── lookup/          # Quick reference (future)
└── errors/         # Common issues (future)
```

---

## Related Categories

- `ui/terminal/` - Terminal UI patterns
- `development/` - General development patterns
- `product/` - Product design and UX strategy

---

## Statistics
- Concepts: 3
- Guides: 2
- Examples: 4
- **Total files**: 9