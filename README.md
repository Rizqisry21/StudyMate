# StudyMate

A responsive study-partner discovery demo built with React, TypeScript, Vinext, and accessible Shadcn/Radix primitives.

## Product

- Landing page with interactive product previews
- Browser-local demo registration, login, password recovery, and five-step onboarding
- Deterministic compatibility scoring across subjects, topics, availability, methods, modes, levels, and university/major
- Search, filters, favorites, partner profiles, study requests, and simulated request acceptance
- Connections, local conversations, emoji, and shared session cards
- Session creation/editing/deletion, dashboard summaries, and month/week/day calendar
- Profile editing, photos, study preferences, and availability

All people are fictional demo profiles. Authentication and password recovery are demonstrations, not production security. Account data, messages, requests, and sessions remain in this browser’s storage. No email is sent and no real person is contacted. Do not reuse a real password.

## Development

Use the project’s pnpm lockfile. Scripts: `dev`, `build`, and `start`. This checkout uses the Sites managed execution profile.

## Validation

- TypeScript compilation
- Local browser: landing and dashboard on desktop; landing/dashboard/mobile navigation/filter controls at 390px; tablet landing at 768px
- Partner search and no-results state; subject filter narrowed to the expected student
- Profile → request sent → simulated acceptance → connected partner → text message
- Create and edit session → calendar details → dashboard; persisted after reload
- All five onboarding screens completed in a temporary test harness, removed before publication
- SHA-256 fallback checked against native Node hashing using five vectors
- Full browser credential-entry testing was not performed; use the local demo registration flow to review it
- Optional WebMCP integrations are feature-detected; the available browser did not expose modelContext, so runtime WebMCP verification was unavailable

## Architecture

`app/data.ts` owns typed models, demo records, and replaceable matching logic. `app/page.tsx` owns navigation and browser-local state. `app/ui.tsx` supplies shared components, `app/forms.tsx` handles account/onboarding forms, and `app/workspace.tsx` contains the connected application views. `app/crypto.ts` supports demo credential comparison in HTTPS and non-secure local previews. Backend authorization and real multi-user delivery must be added before using this with real accounts.

### Scroll walkthrough refinement

The landing page uses native scrolling, CSS sticky scenes, and one requestAnimationFrame-driven observer for reversible hero, profile-to-match, and discovery-to-calendar sequences. The Sarah profile and shared session remain the same DOM surfaces across the relevant stages. Compact cards interpolate their dimensions; the remaining choreography primarily changes transforms and opacity. Inactive layers are inert and hidden from the accessibility tree.

Responsive checks were performed in Chrome at desktop width and in 390, 768, and 820 px frames. Manual checks covered slow/fast scrolling in both directions, chapter controls, mobile navigation, signup/login destinations, demo entry, and the linear reduced-motion layout. The reduced-motion preference and the footer control use the same fallback; viewports shorter than 600 px also use it. The temporary responsive QA route was removed before publication. The illustrative walkthrough does not create requests or sessions in the local demo.

## Cinematic landing (The Empty Seat)

The landing opens on user-supplied Nano Banana library photography in `public/scenes/`. No generated video is claimed or required: the shared camera stage, a single matching interface, and the return to the library are tied directly to scroll progress. The scene change happens under an opaque interface so the changed laptop position does not produce an exposed dissolve. All transitions reverse with scroll.

`cinematic-opening.tsx` and `cinematic.css` provide the new opening, while `scroll-story.ts` coordinates it with the existing product walkthrough. Mobile uses a tighter editorial image crop, one-column matching stages and a shorter scroll track. System reduced-motion, the footer toggle and short viewports use linear reading mode with both photos. Hidden interactive story layers are inert. Existing local demo functionality is preserved.

Validated in the browser at desktop, 390px mobile and 820px tablet: opening down/up, preferences, Sarah match, connection, return to the shared library, downstream story, mobile registration CTA and reduced-motion mode. No production user data is sent by the illustrative matching sequence.
