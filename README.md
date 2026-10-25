# Kriti Bohra — Portfolio

Single-page static site. No build step, no framework.

## Preview locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Publish (pick one, all free)
- **Netlify Drop:** go to app.netlify.com/drop and drag this folder in.
- **Vercel:** `vercel` from this folder, or import it as a project.
- **GitHub Pages:** push the folder to a repo, then Settings → Pages → Deploy from branch.
Then point a custom domain (e.g. kritibohra.design) at it.

## Updating content
| What | Where |
|---|---|
| Hero text, sections, experience | `index.html` |
| Colors (paper, ink, vermilion accent, lilac/butter/mint), type | top of `assets/styles.css` (`:root`) |
| AI agents / Built-with-code items | `LAB_ITEMS` at the top of `assets/main.js` |
| Ask Kriti questions and answers | `ASK` at the top of `assets/main.js` |
| Hero sticky notes (text, colour, tilt, side, height) | the `.stickies` list in the hero of `index.html` (`data-side` l/r, `data-ny` = height in % of the photo, `--r` = tilt) |
| Hero layers panel, right-panel "properties", Prototype flows | `LAYERS`, `PROPS` and `PROTO` in `assets/main.js` (Dev Mode code is generated from `PROPS`) |
| Collaborator cursors and their comments | `CURSORS` in `assets/main.js` |
| Hero photo (uncropped) | `assets/img/kriti-full.webp` |
| Experience journey stops | the `#journey` list in `index.html` (path redraws itself) |
| Resume / case study PDFs | `assets/docs/` (keep the same file names) |
| Case-study slides shown in the viewer | `assets/img/stellar-slide-01..10.webp` |

**Share dialog:** the Share button in the hero opens it. Its links use the page's own address, so they become real once the site is published. Edit the share message in `share()` in `assets/main.js`.

**Full screen:** the ▶ button (or the F key) puts the whole site in full screen. It still scrolls; Esc exits. The button is hidden on browsers without full-screen support (iPhone Safari).

**Sticky notes:** click one to get the FigJam-style toolbar (color, square/wide, S/M/L, font, bold, author, reactions, duplicate, delete). Double-click to edit text; ⌘D duplicate, ⌘B bold, ⌫ delete, ⌘Z undo a delete, arrow keys nudge. Colours and fonts are `STK_COLORS` / `FONTS` in `assets/main.js`.

**Visitor edits:** stickies, comments and stamps a visitor adds (and stickies they drag) last only for that visit; reloading the page brings back the original canvas. Comments have a “Send to Kriti” button that opens an email to you.

**Adding a code project:** add an item with `type: "code"` to `LAB_ITEMS`. The "Built with code" tab appears automatically once one exists.

**Adding your portfolio domain:** update the `og:image` URL to an absolute URL (https://yourdomain/assets/img/og-image.jpg) so link previews work on LinkedIn and Slack.

**Adding a new case study:** copy the `<article class="case">` block in the Work section, and add a matching `<dialog>` viewer (or link to a separate page).
