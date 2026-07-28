---
"@cloudflare/kumo": minor
---

**Icons now scale with the surrounding text.** Hardcoded pixel sizes on
icons across ~20 components were replaced with em-relative sizes (or
dropped entirely so icons inherit Phosphor's `1em` default). Following
Apple's SF Symbols pattern — a UI icon is a glyph in the text's context,
and should shrink and grow with the text it sits alongside.

**Rationale:**

Under the old scale we used hardcoded pixel sizes (`size={12}`, `h-4 w-4`)
per component + per size variant, which meant every time the type scale
shifted, dozens of icon sizes across the library had to be re-audited by
hand. Worse, hardcoded sizes broke `--font-scale` (see the
`font-scale-multiplier` changeset): scaling body text up without touching
icons produced surfaces where icons floated at fixed pixel sizes while
their labels grew around them.

Em-based sizing solves both problems:

- Icons inside a `text-sm` (12px) label render at 12px automatically; the
  same icon inside a `text-base` (13px) label renders at 13px.
- When `--font-scale` shifts the whole type scale, icons come along for
  the ride without any per-component intervention.
- Component-internal decisions collapse from "what pixel size at what
  variant" to "what ratio to the surrounding text" — expressed in one
  place, valid at every scale.

**Sizing conventions established:**

| Ratio                   | Use for                                                      |
| ----------------------- | ------------------------------------------------------------ |
| **Bare (`1em`)**        | Caret / chevron icons in form controls, buttons, pagination  |
| **`0.85em`**            | Inline glyphs inside chips, badges, checkboxes (X, check)    |
| **`1.15em`**            | Leading icons in dropdown items, menu items                  |
| **`1.25em`**            | Sidebar menu icons, larger inline actions                    |
| **`var(--text-lg)`**    | One-offs where the icon size must survive nested type scopes |

**Affected components** (icon sizing internals only — no API changes):

`Autocomplete`, `Button` (`RefreshButton`, loader glyph),
`Checkbox` (indicator glyph), `Collapsible` (caret), `Combobox` (caret,
clear X, chip X), `CommandPalette` (leading icons, back-arrow),
`DatePicker` (nav carets, globe), `DateRangePicker` (nav carets),
`Dropdown` (leading icons, submenu caret, check indicator, external-link
glyph), `Empty` (illustration icon), `InputGroup.Addon`,
`InputGroup.Button`, `Menubar` (leading icons via `IconContext`),
`Pagination` (nav carets), `Select` (caret), `SensitiveInput` (eye
toggle), `Sidebar` (menu-button icons, submenu chevron), `Toast` (close
X, variant icon).

**Visual regression:** icons on nearly every component will shift by 1–3px
per size variant to align with the refreshed type scale. This is
intentional — the previous hardcoded values were tuned for the 14px body
baseline and read heavy against 13px labels.
