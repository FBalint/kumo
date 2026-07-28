---
"@cloudflare/kumo": minor
---

Align form control sizes with the refreshed Button scale. Affects `Input`,
`InputArea`, `Select`, `Combobox`, `Autocomplete`, and `InputGroup`.

**Height changes:**

| Size   | Before | After            |
| ------ | ------ | ---------------- |
| `sm`   | 26px   | 26px (unchanged) |
| `base` | 36px   | 32px             |
| `lg`   | 40px   | 36px             |

**Font size:** `sm` form controls now use `text-sm` (12px) instead of
`text-xs` (11px), matching Button's `sm`. `base` and `lg` remain at
`text-base` (13px) — form inputs stay at body-text legibility across
their larger sizes rather than scaling their type up with height. Button
follows the same policy at `lg` (also `text-base`, 13px), so a
button-plus-input row keeps its type on one line; `lg` here signals a
larger touch target and prominence, not larger type.

**Deprecated:** `size="xs"` on all form controls. Use `size="sm"` instead.
The `xs` variant still renders and looks the same as before, but emits a
`console.warn` in development and will be removed in a future major
version.

**Trigger icons** (`Select` caret, `Combobox` caret + clear X) no longer
carry per-size hardcoded pixel values. They now inherit their size from
the containing control's text size — see the `icons-em-relative-sizing`
changeset for the pattern. Net effect: at `base` size a caret renders
around 13px (matching the label) instead of the previous 16px, which
read heavy against 13px labels.

Select's Figma styling metadata is updated accordingly
(`height: 36 → 32`, `fontSize: 16 → 13`).
