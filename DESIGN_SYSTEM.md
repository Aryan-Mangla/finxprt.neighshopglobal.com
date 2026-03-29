# FinExpert – Modern Fintech Design Style

## Brand foundations
- **Primary (Navy Blue)**: `#1A3C6E`
- **Accent (Orange)**: `#E8500A`
- **Background (Light Blue)**: `#EEF3FA`
- **Surface / Cards**: `#FFFFFF` with soft shadow
- **Radius**: **12px** (default for cards/inputs/buttons)
- **Font**: **Inter**

## Design tokens (source of truth)
Tokens live in `src/index.css` under `:root`.

- **Colors**
  - `--navy`, `--orange`, `--bg`
  - Text: `--textH` (headings), `--text` (body), `--textMuted`
  - Surfaces: `--card`, `--border`
- **Radius**
  - `--radius` (12px), `--radius-card`, `--radius-btn`, `--radius-control`
- **Depth**
  - `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-soft`
- **Motion**
  - `--ease-out`, `--ease-soft`, `--dur-1`, `--dur-2`

## Component styling rules
- **Cards**: white background, `border: 1px solid var(--border)`, `border-radius: var(--radius-card)`, `box-shadow: var(--shadow-sm)`
- **Primary CTA**: orange background, white text, slightly elevated shadow
- **Secondary**: white surface + orange text, thin border (keeps a premium “clean” look)
- **Spacing**: use the existing scale `--s-1` … `--s-8` for consistent rhythm

## Accessibility + trust cues (fintech)
- Maintain **high contrast** for text on navy surfaces (already used in the hero/topbar).
- Focus states use an orange-tinted ring (`outline`) for clarity.
- Reduced-motion is respected via `prefers-reduced-motion`.

