# ICA "Night Assembly" — front end

Dark, editorial look: off-black `#0B0B0C`, faint structural grid lines, ICA violet `#9F5BFF`,
extended display type (Archivo 125% width) with Instrument Serif italic accents and JetBrains Mono labels.

Kept deliberately light: no WebGL, no custom cursor, no smooth-scroll library, no film grain, no sound.
Native scrolling and the system cursor keep the site fast on low-end phones.

## Motion (GSAP + ScrollTrigger, `lib/experience/`)
| Hook | Effect |
|---|---|
| `data-kinetic` | Manifesto words fill from outline to solid as you scroll (violet for `<em>` words) |
| `data-mask-text` | Giant "KARIBU" with a photo drifting inside the letters |
| `data-reveal-words` | Headings rise in word by word |
| `data-gallery` | Photo row slides sideways while the section scrolls (desktop); swipe row on phones |
| `data-stack` | Message cards fan out on scroll |
| `data-countdown` | Live countdown to the next Sunday service |
| `data-scroll-progress` | Scroll percentage in the footer |

Everything else is CSS (hero image fade mask, slow zoom, hover reveals, marquee).
`prefers-reduced-motion` turns all of it off and shows the final state.
