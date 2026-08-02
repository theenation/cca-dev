# CCA Astro + Payload Migration — Progress Notes

## Goal
Replicate the frontend of the WordPress site backed up in `cca-wrp/` (live at
https://cca.edu.np, Elementor + WooCommerce + many plugins, no DB dump available)
as a new Astro frontend (`apps/web`) backed by Payload CMS (`apps/cms`), so
content editors can manage everything from the CMS admin instead of WordPress.

Source of truth for design/content: scraped live HTML from cca.edu.np (saved to
`/tmp/cca_pages/*.html`, not committed) + Playwright screenshots + real images
recovered from the `cca-wrp/uploads/` WordPress media library backup.

## What's been done

### 1. Research / scraping
- Fetched live pages from https://cca.edu.np (home, about, we-offer + all 6
  course subpages, contact, student-section, our-team, testimonial, events,
  blogs, newsfeed, accreditation-and-membership, placement-opportunities,
  enroll-course).
- Installed Playwright Chromium (`apps/cms/node_modules/.pnpm/@playwright+test`)
  and took full-page screenshots to study layout/design precisely (dark navy
  header bar, indigo/navy primary #333485, secondary #1B2132, accent green
  #00A651, Poppins headings + Mulish body — colors pulled from Elementor's
  compiled kit CSS in `cca-wrp/uploads/elementor/css/post-102.css`).
- Recovered real images (not placeholders) from `cca-wrp/uploads/`: logo,
  reception/office photos, conference/classroom photo, ISO/accreditation
  badges, team member headshots (matched to names shown on site: Govinda Raj
  Panta, Manish Sharma, Diwas Silwal, lecturers, admin staff), and placement
  partner logos (Learning Park, SDR Associates, Shangri-la Development Bank,
  SPSA x2, Boost, Delphi Associates, Dynamic Serve — found properly-cropped
  square versions under `cca-wrp/uploads/2025/04/`, NOT the 2024/04 ones which
  turned out to be scanned MoU documents, not logos).
- All copied images live in `apps/web/public/images/` (flat) and
  `apps/web/public/images/{team,partners}/`.

### 2. Payload CMS (`apps/cms`) — new collections & globals
Added to `src/collections/`: `Courses.ts`, `Posts.ts` (blog/article/event/
newsfeed via a `type` select field), `Testimonials.ts`, `TeamMembers.ts`
(`group`: board/management/faculty), `PlacementPartners.ts`.
Added to `src/globals/`: `SiteSettings.ts` (logo, contact, socials, e-learning
links), `HomePage.ts`, `AboutPage.ts`.
All wired into `src/payload.config.ts` (collections + globals arrays), and
added `cors` config so the Astro dev/build origin can call the REST API.
Ran `payload generate:types` successfully — schema is valid.

**Seed script**: `apps/cms/src/seed/index.ts` — uploads real images from
`apps/web/public/images/` into Payload's Media collection and populates every
collection/global with real scraped content (mirrors the Astro fallback data,
see below). Run with `pnpm seed` (added to `apps/cms/package.json`, uses
`tsx/esm` — do NOT use `payload run`, it silently produced no useful output
during testing; `node --import=tsx/esm src/seed/index.ts` works reliably).
Course/post rich text is built via two local helpers in the seed file:
- `textBlock(paragraphs: string[])` — plain Lexical paragraphs.
- `markdownToLexical(markdown)` — converts a tiny markdown subset (`## `
  headings, `- ` bullets, blank-line paragraphs) into proper Lexical heading/
  list/paragraph nodes. **Use this for any course/post body content that has
  markdown-style formatting** — plain `textBlock` on raw markdown strings will
  literally render `## ` in the output (this bug was hit and fixed once, watch
  for it if adding more seed content).

To re-seed from scratch: `cd apps/cms && rm -f cms.db* && export
DATABASE_URL="file:./cms.db" PAYLOAD_SECRET=<value from .env> && node
--experimental (no) just: NODE_OPTIONS="--no-deprecation --import=tsx/esm" node
src/seed/index.ts`. Media uploads require `apps/web/public/images` to exist
with all the files referenced in the seed script.

### 3. Astro frontend (`apps/web`)
- Added Tailwind v4 via `@tailwindcss/vite` (NOT `@astrojs/tailwind`, which
  doesn't support Astro 7 yet). Config in `astro.config.mjs`. Theme tokens
  (colors, fonts) defined in `src/styles/global.css` via `@theme` block:
  `--color-primary`, `--color-secondary`, `--color-accent`, `--color-ink`,
  `--color-muted`, `--color-cloud`, `--color-line`, plus Poppins/Mulish font
  vars. `.btn-primary/-accent/-outline` component classes — **do NOT** use
  `@apply` referencing another custom class in Tailwind v4 (e.g. `.btn-accent
  { @apply btn ... }`) — it fails the build ("Cannot apply unknown utility
  class"). Each button variant class must spell out the full utility list.
- `src/lib/cms.ts` — thin REST client for Payload
  (`getSiteSettings/getHomePage/getAboutPage/getCourses/getCourseBySlug/
  getTestimonials/getTeamMembers/getPlacementPartners/getPosts/getPostBySlug`),
  each with a 5s timeout and automatic fallback to bundled seed data in
  `src/data/fallback.ts` if the CMS is unreachable — the site always builds
  even with the CMS offline. `mediaUrl()` helper decides whether to prefix a
  media URL with `PAYLOAD_URL`: local fallback images start with `/images/`
  and stay relative; anything else (Payload upload paths like
  `/api/media/file/xyz.jpg`) gets the CMS origin prefixed.
- `src/data/fallback.ts` — hand-written fallback content mirroring every
  collection/global shape, sourced from the scraped site (real course
  descriptions, testimonials, blog/event/newsfeed excerpts, team members,
  placement partners, accreditation list). This is also effectively the
  reference content that was ported into the seed script.
- `src/lib/content.ts` — `renderContent()` renders either a Payload Lexical
  richText JSON object OR a plain markdown-ish string (fallback data uses
  markdown strings with `##`/`-`/`**bold**`) to HTML. Used on course detail
  and post detail pages via `set:html`.
- `PAYLOAD_URL` env var (`.env` / `.env.example`) — defaults to
  `http://localhost:3000` if unset, read via `import.meta.env.PAYLOAD_URL`.

**Components** (`src/components/`): `Icon.astro` (hand-rolled inline SVG icon
set, no external icon package), `Header.astro` (sticky header, top contact
bar, dropdown nav — desktop hover dropdowns + mobile `<details>` accordion,
course dropdown items pulled live from `getCourses()`), `Footer.astro`,
`PageHero.astro` (generic hero banner used by most inner pages), `ZigZag.astro`
(decorative squiggle icon used throughout the original site),
`SectionHeading.astro`, `CourseCard.astro`, `PostCard.astro`,
`TestimonialCard.astro`, `TeamCard.astro`.

**Layout**: `src/layouts/Layout.astro` — loads Google Fonts (Poppins +
Mulish), wraps Header/Footer, floating WhatsApp button (from
`settings.whatsapp`).

**Pages** (all in `src/pages/`, all fetch via `src/lib/cms.ts`):
- `index.astro` — full homepage: hero, 4 highlight cards, About section w/
  stats, featured courses, categories + "book a seat" form (UI only, no submit
  handler yet), achievement/video section, blog preview (3), testimonials
  preview (3), events preview (3), CTA banner ("Unbounded Education, Infinite
  Opportunities!" — has a dark overlay over the background photo for
  contrast, don't remove it), newsfeed preview (3), placement partners grid.
- `about.astro` — intro, mission/vision, "20+ years" tour banner, chairman
  message, board of directors grid (links to `/our-team` for full team).
- `we-offer/index.astro` — courses grouped by category (undergraduate/
  diploma/graduate).
- `we-offer/[slug].astro` — dynamic course detail page (`getStaticPaths` over
  `getCourses()`), renders `course.content` via `renderContent()`, sidebar
  with duration/levels/students/pass%, "more courses" list, related courses
  grid at bottom.
- `contact.astro` — contact info cards + form UI + embedded Google Maps
  iframe (static Thapagaun/New Baneshwar query, no API key needed).
- `our-team.astro` — board/management/faculty sections with anchor ids.
- `testimonial.astro` — students vs alumni sections.
- `events/`, `blogs/`, `newsfeed/`, `articles/` — each has `index.astro`
  (listing) + `[slug].astro` (detail, uses shared `getPosts(type)` +
  `renderContent()`). **Important gotcha**: in `getStaticPaths()`, do NOT
  reference an outer `const` (e.g. `const POST_TYPE = 'event'` declared above
  the function) from inside the function body — Astro's static-path
  extraction bundles `getStaticPaths` in isolation and the outer const comes
  back `undefined` at build time ("POST_TYPE is not defined"). Inline the
  literal directly inside `getStaticPaths()` instead (already fixed in all
  four `[slug].astro` files — see the `BASE_PATH` constant pattern used
  there, which IS fine to reference outside since it's only used in the
  template, not inside `getStaticPaths`).
- `student-section.astro`, `accreditation-and-membership.astro`,
  `placement-opportunities.astro`, `enroll-course.astro` — mostly-static pages
  with anchors matching the original nav (`#rank-holders`, `#cbe-rank`,
  `#complain`, etc.), accreditation content currently pulled from
  `fallback.accreditations` (no dedicated CMS collection for this yet — see
  Next Steps).

Removed the default Astro starter cruft (`Welcome.astro`, default
`index.astro`/`Layout.astro` content).

### 4. Verified working end-to-end
- `apps/cms`: `next dev` boots, sqlite db (`cms.db`) auto-migrates, REST API
  responds at `/api/<collection>` and `/api/globals/<slug>`, admin panel loads
  at `/admin`.
- Ran the seed script successfully — all collections/globals populated with
  real content + real uploaded images (served at `/api/media/file/<name>`).
- `apps/web`: `astro build` succeeds (29 static pages) both with CMS
  online (pulls live data, build times show real network fetches) and with
  CMS offline (falls back to bundled data, still builds fine).
- Playwright screenshot comparisons against the live WordPress site confirm
  close visual parity for home, about, we-offer, course detail, contact,
  our-team, accreditation pages — colors, fonts, layout, real photos, real
  course/team/placement-partner data all check out.

## Known issues / rough edges to fix next
1. **CourseCard thumbnails for CBE/Diploma/Cert-IFR/BSc-Hons reuse generic
   photos** (`reception.jpeg`, `conference.jpg`, `hero-bg.jpeg`) since no
   unique real photos for those specific programs were found in the WP
   uploads backup — acceptable placeholder but worth revisiting if better
   imagery becomes available.
2. **`getStaticPaths` outer-const gotcha** (see above) — if adding more
   dynamic route types, remember to inline literals inside the function.
3. `apps/web/package.json` has no `@astrojs/check`/typescript strict checking
   wired up yet (`astro check` prompted to install `@astrojs/check`, was
   skipped for time). Consider adding for CI type-safety.
4. No automated tests added for the new Astro pages or CMS collections
   (`apps/cms/tests/` has the original Payload starter tests only).
5. Dev servers were being run via background `nohup`/`disown` during
   sessions for screenshotting — remember to kill stray `next dev` /
   `astro dev` / `astro preview` processes before starting fresh ones to
   avoid port conflicts (hit this a few times: 4321 in use → Astro silently
   switched to 4322). `pkill -f "next dev"` sometimes returns a nonzero exit
   code that aborts a `&&`-chained command early — run the `pkill` and the
   following command as separate Bash calls, not chained.
6. `gov-approval.jpg` (accreditation page image) is ~950KB, uncompressed —
   fine for now but worth optimizing if page weight becomes a concern.
7. Only `membership1`, `ACCA-APPROVED-LEARNING-PARTNER`, `ISO_logo`,
   `CBE-Licence_2026`, `approved`, and `Organized-by` were mapped to
   accreditation items; `membership2.jpg` and `membership3.jpg` (an ISO
   "Certificate of Registration" scan) exist in the WP uploads backup but
   are unused — the live site shows `membership3` as a second image next to
   the ISO logo in a 3-column row, which our replica simplifies to a single
   image per item for layout consistency with the other 5 items.

## Session 2 — verification pass + accreditation page rebuild
Picked up a prior session's largely-complete implementation (everything in
"What's been done" above) and verified it end-to-end rather than assuming it
worked:

- **Booted both dev servers from scratch, ran the seed script, and did a full
  `astro build`** (both against a live CMS and with the CMS offline, to
  exercise the fallback path). Everything passed with no changes needed.
- **Found and fixed a real idempotency bug in the seed script**: `uploadImage()`
  only deduped uploads within a single run (in-memory `Map`), not across
  re-seeds — every `pnpm seed` re-uploaded every image, and Payload's
  filename-collision suffixing (`logo-2.png`, `logo-3.png`, ...) meant the
  `media` collection grew unbounded (69 → 92 docs observed after one extra
  run; the on-disk `apps/cms/media/` dir — gitignored — had accumulated 138
  files from prior sessions). Fixed by adding a hidden `sourceKey` field to
  `Media` (`apps/cms/src/collections/Media.ts`) storing the original
  `relPath`, and having `uploadImage()` look up by that stable key instead of
  by filename before creating. Verified idempotent: reseeding twice on a
  clean db now holds media count constant (23 → 23, then 23+6 → 23+6 after
  the accreditation-image change below).
- **Verified PROGRESS.md's own "Known issues" list was stale** — a prior
  session had already resolved items that were still listed as TODO:
  Contact/AccreditationPage/StudentSectionPage globals exist and are wired
  (`apps/web/src/pages/{contact,accreditation-and-membership,student-section}.astro`
  all call the corresponding `get*Page()` in `lib/cms.ts`), and all 4 lead
  forms (contact, book-a-seat, enroll-course, student complaint) post to a
  real `Enquiries` collection via `apps/web/src/lib/forms.client.ts` — has a
  honeypot field, correct `type` per form, tested end-to-end with a live
  POST that created and was verified in the sqlite db.
- **Found and fixed a real, high-impact visual bug**: `apps/web/src/styles/
  global.css` sets `h1,h2,h3,h4,h5,h6 { color: var(--color-secondary) }` in
  `@layer base`. Inherited `color` (e.g. `text-white` set on a dark-background
  ancestor `<section>`) always loses to *any* rule that targets the element
  directly, even a low-specificity element selector — so every heading on a
  dark background across the site (`index.astro` hero, `PageHero.astro` used
  by ~15 inner pages, homepage highlight cards, homepage CTA banner) was
  rendering nearly-invisible dark-navy-on-dark-navy text instead of white.
  This was only visible zoomed in (looked like faint text at normal size) —
  caught during a Playwright mobile-viewport screenshot pass. Fixed by adding
  explicit `text-white` to the 4 affected headings rather than fighting the
  base-layer cascade.
- **Rebuilt the Accreditation & Membership page for real parity with
  cca.edu.np** (user flagged the existing version — generic colored-circle
  SVG icons with one-line descriptions — didn't match the live site).
  Fetched the live page's HTML + its page-specific compiled Elementor CSS
  (`post-800.css`) to find the actual certificate photos, which are set via
  CSS `background-image` rather than `<img>` tags (the visible `<img>` tags
  on the page are just 4 unrelated footer badges + 2 decorative images) —
  `membership1.jpg`, `ACCA-APPROVED-LEARNING-PARTNER.jpg`, `ISO_logo.png`,
  `CBE-Licence_2026.jpg`, `approved.jpg`, `Organized-by.jpg`, all present in
  `cca-wrp/uploads/`. Also extracted the real (much longer, multi-paragraph)
  item descriptions and confirmed via computed-style inspection that each
  heading is two-tone: a `#1B2132` prefix + a `#00A651` highlighted `<span>`
  — both already our existing `--color-secondary`/`--color-accent` tokens.
  Changes:
  - `apps/cms/src/globals/AccreditationPage.ts` — `items[]` now has `title`
    (prefix) + `highlight` (accent-colored span) instead of one `title`
    string, `description` supports multi-paragraph text (blank line = new
    `<p>`, rendered via the existing `renderContent()` markdown path), and
    `image` is a real `upload` relationship to `Media` instead of a
    hand-picked icon name.
  - Copied the 6 real certificate photos into
    `apps/web/public/images/accreditation/`.
  - `apps/web/src/data/fallback.ts` and `apps/cms/src/seed/index.ts` —
    updated with the real titles/highlights/full descriptions/images.
  - `apps/web/src/pages/accreditation-and-membership.astro` — rewritten as
    an alternating (zigzag) image/text layout matching the live site: real
    certificate image in a white card on one side, `ZigZag` squiggle +
    two-tone `<h2>` + full rendered description on the other, sides
    alternating per item via a `md:[&>*:first-child]:order-2` Tailwind
    arbitrary-variant toggle on odd indices.
  - Verified visually via Playwright screenshots at both desktop (1280px)
    and mobile (390px) viewports against the rebuilt page — close structural
    and content parity with the live site now.
- Regenerated Payload types (`pnpm generate:types`) after each schema change.
  Note: changing a field's *type* (not just adding fields) on an existing
  sqlite db triggers an interactive drizzle-kit "create vs rename column"
  prompt in `next dev` that hangs forever under a backgrounded/non-TTY
  process — if that happens, don't try to answer it; just stop the server,
  delete `cms.db*`, and let it re-migrate clean on next start (this is safe
  in dev; there's no production data yet). Purely additive field changes
  (new field, nothing removed/renamed) do not trigger this prompt.
- **Fixed 3 more homepage-specific parity gaps** the user flagged directly
  (hero video missing + "CSS for components is not the same"), found by
  fetching and screenshotting the live homepage:
  1. The live hero background is a looping/autoplaying **YouTube video**
     (`youtu.be/ly_5MwKRux4`, muted, `controls=0`, loops via `playlist=`
     trick), not a static image. Added `heroVideoId` (text field, YouTube
     video ID) to `apps/cms/src/globals/HomePage.ts`, `fallback.ts`, and the
     seed script. `index.astro`'s hero now renders a cover-fit YouTube
     iframe (the classic oversized-iframe-centered-via-transform trick) when
     `heroVideoId` is set, falling back to the static `heroImage` otherwise
     — so the CMS-offline build path still works.
  2. The 4 "highlight" cards under the hero were solid full-bleed
     primary/accent color blocks in a separate section; the live site shows
     them as a single **floating white card row that overlaps the bottom
     edge of the hero** (icon in a soft tinted circle + title + description,
     divided by thin lines, `rounded-2xl shadow-xl`, pulled up via
     `-mt-14`). Rewrote the highlights section in `index.astro` to match.
  3. The "Get your Courses! Book Your Seat Now" form was a separate
     full-width section below the 3 category cards; the live site places it
     **beside** the categories in the same row (categories `lg:col-span-2`
     in a 2-col grid, form `lg:col-span-1`). Restructured into a single
     `lg:grid-cols-3` row in `index.astro`.
  All three verified visually via Playwright screenshots against both the
  live site and the rebuilt local dev server at 1280px viewport.
- Still not attempted (lower priority, more involved custom-graphic work,
  not yet flagged by the user as broken): the live "Our Achievement" section
  has animated JS stat counters (didn't confirm final values — counter read
  "0" in an un-scrolled screenshot, likely counts up on scroll-into-view)
  and the "Unbounded Education, Infinite Opportunities!" CTA section on the
  live site uses a two-photo overlapping collage with caption badges
  ("Highest Student Enrolled", "Producer of Nepal and World Rank Holders")
  instead of our single full-bleed darkened background photo — both would
  need dedicated design work to replicate precisely, not just a CSS tweak.

## Session 2 continued — student-section page rebuild
User flagged `/student-section` next. It had 3 essentially-empty sections
("World Rank Holder", "Nepal Rank Holder", "CCA Scholarship Holders" all
rendered heading-only, no content) plus a `rankHoldersText` paragraph that
doesn't exist on the live page, and both the fee-structure and brochure
download buttons pointed at the *same* PDF (`Fee-Structure-CCA.pdf` reused
for both — copy-paste bug).

Investigated by fetching the live page's raw HTML: the "World/Nepal Rank
Holder" sections are photo galleries of self-contained achievement graphics
(each image has the student's name/rank/paper baked into the graphic itself
by CCA's designer — e.g. `world-topper.jpg`, `Nepal-Rank-001.jpg` — so no
separate name/rank text fields are needed or available). Found 7 world-rank
and 11 Nepal-rank images, plus 4 CBE subject icon badges (`Asset-90/80/70/
60.png` → FA/BT/MA/LW), all present in `cca-wrp/uploads/`. The "CCA
Scholarship Holders" section genuinely has an empty Elementor gallery widget
on the live site itself (no images) — left that section heading-only to
match reality rather than fabricate holder photos. The scholarship-fund
description paragraph (starting "It is a fund created by CCA...") actually
sits under the live site's "CCA Fee Structure" heading, not "Scholarship
Holders" — moved it there. Found real, current Fee Structure and Brochure
PDFs (`CCA-Fee-Structure-FIA.pdf`, `Brochures-2026.pdf`) in the WP backup to
replace the copy-paste bug.

Changes: `apps/cms/src/globals/StudentSectionPage.ts` (`worldRankPhotos`/
`nepalRankPhotos` upload arrays, `cbeSubjects[].icon` upload field,
`scholarshipText`, `feeStructureText`, fixed `brochureUrl` default),
`fallback.ts` + `seed/index.ts` updated to match, real images copied to
`apps/web/public/images/student-section/{world-rank,nepal-rank,cbe-icons}/`
and real PDFs to `apps/web/public/uploads/`. `student-section.astro`
rewritten to render photo grids instead of empty sections. Verified via
`pnpm build` + full-page screenshot — closely matches the live page now.

## Session 2 continued — about page rebuild
User flagged `/about` next. Fetched the live page's raw HTML and diffed
against our implementation. The body copy (intro/mission/vision/chairman
text) was already accurate from a prior session — only images, stats, and
one whole missing section needed fixing:
- **Intro stats were wrong/incomplete**: we showed 2 stats (Passed
  Percentage 91%, Happy Students 98%) but the live page has 3 (Practical
  Knowledge, Passed Percentage, Happy Students) with different real values.
  The live page's counters render as visible "0%" pre-animation (Elementor
  scroll-triggered count-up), so the real target values aren't in the
  rendered text — found them in the counter widget's `data-value` attributes
  in the raw HTML: **92 / 89 / 90**. Bumped `AboutPage.ts`'s `introStats`
  `maxRows` from 2 to 3 and corrected the values everywhere.
- **Wrong/mismatched photos**: the intro-section photo, the College Tour
  background, and the Chairman Message photo were all generic reused stock
  photos (`reception.jpeg`, `conference.jpg`, and the *team-page* headshot of
  Govinda Raj Panta wearing sunglasses — visibly a different photo/pose from
  the real chairman-message image). Found the real ones in the raw HTML —
  `viber_image_2025-03-18_14-00-00-010.jpg` (actual reception desk),
  `courses-bg.jpeg` (real classroom/lecture photo), and
  `20230912170614.ch_.jpeg` (the actual "ch_" = chairman photo, a candid
  shot with a laptop) — all present in `cca-wrp/uploads/`. Copied to
  `apps/web/public/images/{about-intro.jpg,college-tour.jpeg,chairman.jpeg}`.
- **"College Tour" video section was completely missing** — we only showed
  a static image with a "20+ Years of Experience" badge; the live page also
  has a click-to-play "Intro College Video" YouTube popup (video ID
  `sqP0VAbmeDg`, found via the `elementskit-video` widget's embed link) with
  its own heading and description text. There was already an *unused*
  `introVideoUrl` field sitting in the schema from a prior session — renamed/
  repurposed it as `tourVideoId` (+ added `tourLabel`, `tourVideoTitle`,
  `tourVideoText`) and built a real click-to-play control in `about.astro`:
  clicking the play button swaps a thumbnail `<button>` for a live YouTube
  `<iframe>` (autoplay) inside the same rounded/aspect-ratio container,
  verified working via a Playwright click-through screenshot.
- Mid-session, discovered the user had their own `pnpm dev`/turbo instance
  running in another terminal (same repo, unrelated `apps/docs` template app
  included) — paused and asked before touching any dev servers or resetting
  `cms.db`, since schema-changing edits mid-session on a shared filesystem
  could disrupt their session. They confirmed it was closed before I
  proceeded. **Always ask before killing dev servers / resetting the db if
  there's any sign another session might be using them** (processes with a
  shared start timestamp you didn't create, unfamiliar apps like `apps/docs`
  running, etc.).
- Verified via reseed idempotency check, `pnpm build`, and Playwright
  screenshots (including actually clicking the video play button and
  confirming a real YouTube iframe loads).

## How to run everything
```bash
# Terminal 1 — CMS (Payload admin + REST API on :3000)
cd apps/cms
pnpm install   # if not already
pnpm dev       # next dev, sqlite db at ./cms.db (gitignored)
pnpm seed      # populate with real scraped content (idempotent — upserts by slug/name)
# admin UI: http://localhost:3000/admin (create first user on initial visit)

# Terminal 2 — Astro frontend (:4321)
cd apps/web
pnpm install
cp .env.example .env   # PAYLOAD_URL=http://localhost:3000
pnpm dev       # astro dev, or `pnpm build && pnpm preview` for static output
```

## File map of everything added/changed this session
```
apps/cms/src/collections/Courses.ts            (new)
apps/cms/src/collections/Posts.ts              (new)
apps/cms/src/collections/Testimonials.ts       (new)
apps/cms/src/collections/TeamMembers.ts        (new)
apps/cms/src/collections/PlacementPartners.ts  (new)
apps/cms/src/globals/SiteSettings.ts           (new)
apps/cms/src/globals/HomePage.ts               (new)
apps/cms/src/globals/AboutPage.ts              (new)
apps/cms/src/payload.config.ts                 (edited — registered above + cors)
apps/cms/src/seed/index.ts                     (new — seed script)
apps/cms/package.json                          (edited — added `seed` script)

apps/web/astro.config.mjs                      (edited — tailwindcss vite plugin)
apps/web/.env.example, .env                    (new — PAYLOAD_URL)
apps/web/src/styles/global.css                 (new — Tailwind v4 theme)
apps/web/src/lib/cms.ts                        (new — Payload REST client + fallback)
apps/web/src/lib/content.ts                    (new — Lexical/markdown -> HTML renderer)
apps/web/src/data/fallback.ts                  (new — bundled seed/fallback content)
apps/web/src/components/*.astro                (new — Icon, Header, Footer, PageHero,
                                                 ZigZag, SectionHeading, CourseCard,
                                                 PostCard, TestimonialCard, TeamCard)
apps/web/src/layouts/Layout.astro              (rewritten)
apps/web/src/pages/index.astro                 (rewritten — full homepage)
apps/web/src/pages/about.astro                 (new)
apps/web/src/pages/contact.astro               (new)
apps/web/src/pages/we-offer/index.astro        (new)
apps/web/src/pages/we-offer/[slug].astro       (new)
apps/web/src/pages/our-team.astro              (new)
apps/web/src/pages/testimonial.astro           (new)
apps/web/src/pages/events/index.astro          (new)
apps/web/src/pages/events/[slug].astro         (new)
apps/web/src/pages/blogs/index.astro           (new)
apps/web/src/pages/blogs/[slug].astro          (new)
apps/web/src/pages/newsfeed/index.astro        (new)
apps/web/src/pages/newsfeed/[slug].astro       (new)
apps/web/src/pages/articles/index.astro        (new)
apps/web/src/pages/articles/[slug].astro       (new)
apps/web/src/pages/student-section.astro       (new)
apps/web/src/pages/accreditation-and-membership.astro (new)
apps/web/src/pages/placement-opportunities.astro (new)
apps/web/src/pages/enroll-course.astro         (new)
apps/web/public/images/**                      (new — real images recovered from
                                                 cca-wrp/uploads/, see script history
                                                 for exact source paths)
```

## Suggested next steps (in priority order)
1. Fix the accreditation page icon rendering glitch.
2. Wire up the various forms to a real backend (new Payload `Enquiries`
   collection + a small Astro API route or client-side POST to Payload REST).
3. Add CMS-editable content for Contact/Student-Section/Accreditation pages
   if the client wants those editable too (currently static/fallback-only).
4. Mobile responsiveness pass with real device-width screenshots.
5. Add basic SEO (per-page meta descriptions are mostly present already via
   `Layout` `description` prop, but double check all pages pass one).
6. Consider adding `@astrojs/check` + `astro check` to CI.

## Session 2 continued — Astro dev-toolbar audit fixes (a11y + image perf), site-wide
User reported two categories of warnings from Astro's dev toolbar Audit panel
across pages: (1) "Headings and anchors must have an accessible name" and
(2) "This image could be replaced with the Image component to improve
performance" — and asked for both fixed on every page, not just examples.

**Accessibility** — audited every `<a>` and heading in `apps/web/src` with a
script (checks for text content, `aria-label`/`aria-labelledby`, or an `img`
with `alt`) and fixed the 2 real violations found:
- `index.astro`'s achievement-section video play button was an icon-only
  `<a>` with no text/aria-label — added `aria-label="Watch achievement
  video"` (currently doesn't render either way since fallback
  `achievementVideoUrl` is empty — fixed for whenever it's populated).
- `PostCard.astro`'s thumbnail `<a>` wraps an `<img>` conditionally (`{img &&
  ...}`) — when a post has no featured image the link was completely empty.
  Added `aria-label={post.title}` as an unconditional fallback.
- Everything else already had proper accessible names (social icons and the
  WhatsApp button already had `aria-label`; all headings had real text).

**Performance (Image component)** — converted every raw `<img>` in
`apps/web/src` (16 files: `Header`, `Footer`, `PageHero`, `CourseCard`,
`PostCard`, `TeamCard`, and 10 pages) to use `astro:assets`. This wasn't a
drop-in swap because images here come from two different sources with
different requirements:
- **Remote CMS-hosted images** (`http://localhost:3000/api/media/file/*`,
  the normal case when the CMS is online) — `<Image>` can fully optimize
  these (real re-encode to webp + resize), but requires 1) the CMS origin
  allow-listed via `image.remotePatterns` in `astro.config.mjs` (added,
  reads the hostname out of `PAYLOAD_URL` at config time so it tracks
  dev/prod automatically) and 2) `sharp` installed in `apps/web` itself (it
  was only a dependency of `apps/cms` before — added it here too, `pnpm add
  sharp`), and 3) either explicit `width`/`height` or the `inferSize` prop
  (does a lightweight remote fetch to read real dimensions — confirmed this
  only works for genuinely remote http(s) urls, not local `/public` paths).
- **Local fallback images** (`/images/*.jpg` under `apps/web/public`, used
  when the CMS is offline or for fixed decorative assets like the logo/
  footer badges) — Vite's asset pipeline doesn't process `public/` files at
  all, so `<Image>` can't infer their size and errors without explicit
  `width`/`height`. Rather than hardcoding dimensions for ~20 different
  local images (or the much bigger refactor of moving `public/images` into
  `src/assets` and converting every fallback path string into an ES import,
  which would break the "fallback data mirrors CMS data shape" abstraction
  `mediaUrl()` relies on), built `apps/web/src/components/SmartImage.astro`:
  a thin wrapper that branches on `/^https?:\/\//` — remote sources get
  `inferSize`, local sources get real dimensions read directly off disk via
  `sharp(filePath).metadata()` (cheap, and correct without any manual
  bookkeeping). Every `<img>` conversion in this pass became `<SmartImage
  src={...} alt={...} class={...} />` (plus `loading="eager"` on the ~4
  above-the-fold/LCP images: header logo, hero backgrounds).
- Verified with a pilot test first (one local + one remote image) before
  converting site-wide, since getting the Astro image-service error modes
  wrong midway through 16 files would've been costly to unwind.
- Result, confirmed via full `pnpm build`: all 54 distinct images across the
  site now get real optimization (converted to webp, resized) — some large
  wins, e.g. `gov-approval.jpg` 927kB→112kB, `best-acca-college-award.jpg`
  511kB→160kB, hero-bg 242kB→74kB, conference.jpg 495kB→373kB, plus every
  local passthrough image now correctly gets `width`/`height` attributes
  (prevents CLS) and `loading="lazy"`/`decoding="async"` it didn't have
  before.
- **False-positive gotcha while verifying**: a Playwright script that checks
  `img.complete`/`naturalWidth` immediately (or even after a full-page
  scroll) right after `waitForLoadState('networkidle')` reported several
  images as "broken" — footer accreditation badges, placement-partner
  logos. All were false positives: `curl`-ing the exact URLs directly
  returned 200, and a slower, more deliberate scroll-with-pauses script (or
  just scoping the check to one element with `scrollIntoViewIfNeeded` +
  a real wait) showed `complete: true` with correct `naturalWidth`/
  `naturalHeight` for all of them. Root cause is almost certainly the
  now-native `loading="lazy"` on every image (added by `<Image>` by
  default) racing the check. **Don't trust a same-tick post-networkidle
  broken-image check on a page using native lazy-loading — give lazy images
  real time (or scope per-element) before concluding something's broken.**
- **Found and left alone (pre-existing, out of scope for this ask)**: the
  "Checkout Our Blog/Events/Newsfeed" post cards on the homepage render an
  empty gray gradient placeholder instead of a thumbnail — not a bug from
  this session, `post.featuredImage` is simply never populated for any blog/
  event/newsfeed entry in `fallback.ts` (the field exists on the type but no
  seed data sets it). Worth a real fix later (find/assign real thumbnail
  images per post) but is a content-completeness gap, not an image
  component/accessibility bug.

## Session 2 continued — source images pre-converted to webp
User asked for a standalone Python script to bulk-convert all `.jpg`/`.jpeg`
source files under the site's image folder to `.webp` (backing up originals
first), on top of the `<Image>`/`SmartImage` build-time optimization already
in place — i.e. ship smaller source files too, not just rely on re-encoding
at build time.

- New script: `scripts/convert_to_webp.py` (repo root). Standalone, reusable
  — takes `--src`/`--backup`/`--quality`/`--dry-run`, not hardcoded to this
  one run. Walks a directory recursively, copies each `.jpg`/`.jpeg` into a
  backup dir (preserving relative structure) via `shutil.copy2`, converts to
  `.webp` with Pillow (`quality=82`, `method=6`), then deletes the original
  — skips a file with a warning instead of crashing if a same-named `.webp`
  already exists or the image is corrupt. Requires Pillow (`pip install
  Pillow`); this sandbox had no system pip, so it was run from a throwaway
  venv (`python3 -m venv`, not committed) rather than installing anything
  system-wide.
- Ran it with `--dry-run` first to confirm the exact file list and target
  names before touching anything, then for real against
  `apps/web/public/images` (the default `--src`). Converted all 47 `.jpg`/
  `.jpeg` files, 47% smaller in aggregate (7.4MB → 3.9MB) even before
  Astro's own build-time re-encoding runs on top. Originals are at
  `apps/web/public/images-jpeg-backup/` (added to `apps/web/.gitignore` —
  it's a local safety net, not meant to ship or be committed).
- **The conversion alone would have broken the site** — every reference to
  these files by their old `.jpg`/`.jpeg` name (in `fallback.ts`, the CMS
  seed script, and a handful of `.astro` files/components) needed updating
  to `.webp` too. Found every reference with `grep -rn "\.jpe?g"` across
  `apps/web/src` and `apps/cms/src`, then did a targeted `sed -E
  "s/\.jpe?g(['\`\"])/.webp\1/g"` per file (matches only when the extension
  is immediately followed by a closing quote/backtick, so it doesn't touch
  unrelated things like the illustrative `/media/xyz.jpg` example in a
  `cms.ts` comment, which ends in `)` not a quote).
- Since the CMS seed script's `uploadImage()` dedupes by a `sourceKey` field
  that's literally the old relative path string, changing every path to
  `.webp` meant old sourceKeys no longer matched anything — reseeding
  without a reset would've created 47 duplicate orphaned media docs
  alongside the new ones. Reset `cms.db` + `apps/cms/media/` and reseeded
  clean (same pattern as every schema/data change this session — see the
  earlier note about this in Session 2).
- Verified: idempotent reseed (media count held at 54 across two runs),
  `pnpm build` succeeds and Astro's own image pipeline re-processes the
  already-webp sources without issue (still gets a `/_astro/*.webp` output,
  just starting from a smaller source), and a Playwright check on `/about`
  confirmed zero broken `<img>` elements.

## Session 2 continued — third dev-toolbar audit category: eager-load above-the-fold images
User reported the Astro Audit's "This IMG tag is above the fold and could be
eagerly-loaded" warning for the first 4 images in Student Section's "World
Rank Holder" grid (`SmartImage` defaults to `loading="lazy"` via `astro:
assets`' own default, which is right for below-the-fold images but wrong for
ones visible on first paint — forcing the browser to discover and start
fetching them later than it could).

Fixed the reported instance (`worldRankPhotos.map` in `student-section.
astro`: index `< 4` gets `loading="eager"`, rest stay lazy — matches the
`lg:grid-cols-4` first row), then proactively swept every other page for the
same shape of bug, since the previous two audit categories in this session
were also "fix on every page, not just where reported": any page structured
as `PageHero → SectionHeading → image grid` with nothing substantial between
them puts that grid's first row in the initial viewport. Found and fixed the
same pattern in:
- `accreditation-and-membership.astro` — first zigzag item's image (`i ===
  0` only; each subsequent item is a full section-height row further down).
- `our-team.astro` — first 3 board-director photos (`lg:grid-cols-3`).
- `we-offer/index.astro` — first 3 undergraduate course thumbnails.
- `placement-opportunities.astro` — first 5 partner logos (`lg:grid-cols-5`).
- `blogs/events/newsfeed/articles/index.astro` (all 4 identical in
  structure) — first 3 post thumbnails each (`md:grid-cols-3`).

`TeamCard`, `CourseCard`, and `PostCard` (the shared components rendering
these images) didn't have any way for a caller to request eager loading, so
added an optional `loading?: 'lazy' | 'eager'` prop to each that passes
straight through to the underlying `SmartImage`, defaulting to `undefined`
(→ `SmartImage`'s/`Image`'s own default, i.e. lazy) when a caller doesn't
pass it — so every *other* usage of these components (e.g. `TeamCard` in
`about.astro`'s board section, which sits below Intro/Mission/Vision/Tour/
Chairman and is genuinely below the fold) is completely unaffected and stays
lazy, which is correct — forcing eager loading on below-the-fold images
would hurt performance, not help it, by competing for bandwidth with what's
actually visible on first paint.

Verified via `pnpm build` (checked the built HTML directly: first 4
world-rank images have `loading="eager"`, 5th+ have `loading="lazy"`; same
eager/lazy split confirmed in the built HTML for every other page listed
above) and a live check against the dev server for student-section.

## Session 2 continued — wired up free-tier deployment (both apps live)
User wants both apps actually deployed somewhere free, with the CMS admin
live/editable (not just the static frontend with fallback data). Researched
current (Aug 2026) options rather than assuming — Payload Cloud stopped
taking new signups after the Figma acquisition, so that's off the table.

**Chosen stack, all free tier**: Vercel (both apps, 2 separate projects
pointing at the same repo with different Root Directory settings) + Turso
(remote libSQL, swaps in for the local sqlite file with an env-var change
only — `@payloadcms/db-sqlite` has first-class Turso support, confirmed via
Payload's own guide) + Vercel Blob (upload storage, since Vercel's
serverless functions have no persistent filesystem for `apps/cms/media/` to
live on).

Code changes (all backward-compatible / env-gated, so local dev is
unaffected — verified by re-running dev server + seed + idempotency check
after each):
- `payload.config.ts` — `sqliteAdapter`'s `client` now also reads
  `DATABASE_AUTH_TOKEN` (only meaningful for a remote `libsql://...` URL;
  ignored for the local `file:./cms.db` URL used in dev).
- Added `@payloadcms/storage-vercel-blob` **pinned to 3.86.0** (matching our
  installed `payload`/`@payloadcms/*` version — the latest on npm is
  3.87.0 and pulling that in produces peer-dependency warnings against our
  3.86.0 core). Wired into `plugins: []` conditionally: only included when
  `BLOB_READ_WRITE_TOKEN` is set, so it's a no-op locally and Payload keeps
  using its default local-disk storage in dev.
- Rewrote the stale `.env.example` (still had leftover MongoDB placeholders
  from the original create-payload-app scaffold, never updated) to document
  every real var: `DATABASE_URL`/`DATABASE_AUTH_TOKEN` (dev vs. Turso
  examples), `PAYLOAD_SECRET`, `WEB_URL` (CORS), `BLOB_READ_WRITE_TOKEN`.

**Found and fixed 4 pre-existing type errors that were silently blocking
`next build`** (i.e. blocking any real deployment) — never caught before
because `pnpm dev`'s `tsx`-run seed script and Next's dev server don't
type-check as strictly as a production `next build` does; nobody had run
`pnpm build` for `apps/cms` until now. All in `src/seed/index.ts`:
1. `uploadImage()`'s `media` Map and return type were `string`, but
   SQLite/Payload media IDs are `number` — every `.id as string` cast was
   silently wrong. Changed the Map and return type to `number` throughout.
2. `textBlock()`'s and `markdownToLexical()`'s returned Lexical JSON had
   `direction: 'ltr'` inferred as plain `string` (TS widens object-literal
   string properties by default), but Payload's richText type requires the
   literal union `'ltr' | 'rtl'`. Fixed with `as const` — for `textBlock`,
   on the whole returned object (safe here, doesn't hit any array-mutability
   issue in practice); for `markdownToLexical`, narrower (`'ltr' as const`
   inline) since its `children` array is genuinely built via `.push()` and
   needs to stay mutable.
3. `markdownToLexical`'s `children` array was typed as bare
   `Record<string, unknown>[]`, which structurally lacks the `type`/
   `version` keys Payload's Lexical node type requires as *known* properties
   (an index signature doesn't count) — retyped as
   `{ type: string; version: number; [key: string]: unknown }[]`.
4. `testimonialSeeds`' `group: 'student'` values were widened to `string`
   across the array (same object-literal-widening issue as #2) but the
   field is a `select` with literal options — added `as const` to each.
   (Also noticed while here: there are no `group: 'alumni'` testimonials in
   the seed at all, only 3 students — a pre-existing content gap, not
   touched, since `testimonial.astro` already has a dedicated
   alumni-vs-student layout that's just never populated on the alumni side.)

Verified: `pnpm build` in `apps/cms` now completes cleanly end-to-end (type
check + static generation, all API/admin routes correctly detected as `ƒ`
dynamic/serverless — required for Vercel), dev server still boots clean,
and a full reseed still passes the idempotent-media-count check (54, stable)
after the `string`→`number` ID type change.

**What's left for the user to actually do** (needs their own accounts —
I can't create these on their behalf): sign up for Turso, create a database,
get the URL + auth token; create two Vercel projects from the repo (one
rooted at `apps/cms`, one at `apps/web`); attach Vercel Blob storage to the
CMS project; set the env vars documented in the new `.env.example` on each
Vercel project; set `apps/web`'s `PAYLOAD_URL`/`PUBLIC_PAYLOAD_URL` to the
deployed CMS's Vercel URL. Full steps given directly to the user in-chat,
not duplicated here since they're one-time setup, not something future
sessions need to re-derive from this file.
