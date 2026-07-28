---
"@cloudflare/kumo": minor
---

Expose `--font-scale` as a hookable multiplier on every font-size token.

**Why:** we want to give products a way to let users bump up type size
without breaking layout. Neither browser zoom nor rem-based font scaling
solves this today:

- **Browser zoom** scales everything — including the viewport and pixel
  values in CSS — so raising font size also enlarges paddings, gaps,
  container widths, and cursor targets. The layout you designed at 100%
  is not the layout the user sees at 125%.
- **Native browser font-size preferences** would work if the library
  reserved `rem` strictly for font-size. It doesn't — and neither does
  Tailwind's default theme, which uses `rem` for paddings, margins, and
  gaps as well. So changing the browser's base font-size would rescale
  spacing along with type, producing the same "zoomed layout" effect.

`--font-scale` sidesteps both by living inside font-size tokens only.
Every font-size token is now emitted as `calc(<px> * var(--font-scale, 1))`.
Consumers override the variable at any scope; spacing tokens are
untouched, so the layout grid stays put while type scales inside it.

**Mechanics:**

- Default multiplier (`1`) lives in the `var()` fallback, so no `:root`
  rule is emitted — consumers can override `--font-scale` at any scope
  without fighting `:root` specificity.
- Line-heights stay as raw ratios and multiply against the already-scaled
  font-size at use time, so they grow naturally.
- No named presets ship with the library. Density modes are an
  application-level UX concern; consumers who want a "compact" or
  "comfortable" mode declare their own selectors (e.g.
  `[data-density="compact"] { --font-scale: 0.875; }`) in their own
  stylesheet.
- Recommended multipliers are terminating decimals so every scaled size
  is also a terminating decimal — `0.875` (7/8) and `1.125` (9/8) work
  cleanly; `12/13` and `14/13` produce infinite decimals like `13.9997px`
  that read as floating-point noise in DevTools.

**Future work (not in this PR):** for `--font-scale` to fully deliver
"scale type without scaling layout", the library needs to move to
`rem`-for-font-size + `px`-for-spacing as a hard convention. Tailwind
default utilities still emit `rem` for spacing, so a follow-up will
either swap the spacing scale to `px` or ship a Tailwind preset that
does. Icon sizing is already `em`-relative (see the `icons-em-relative-sizing`
changeset) so icons come along for the ride automatically.

No visual regression at the default multiplier.
