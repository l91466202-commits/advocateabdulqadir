# Mainframe Landing

Build a full-screen hero landing page for a creative agency called "Mainframe" using React, TypeScript, Vite, and Tailwind CSS. Here is every detail:



---



FONTS



Load two fonts in `index.html` via these stylesheet links:

- Heading: `https://db.onlinewebfonts.com/c/5ac3fe7c6abd2f62067f266d89671492?family=HelveticaNowDisplay-Medium`

- Body: `https://db.onlinewebfonts.com/c/1aa3377e489837a26d019bba501e779d?family=HelveticaNowDisplayW01-Rg`



In `index.css`, define CSS variables:



:root {

  --font-heading: 'HelveticaNowDisplay-Medium', 'Helvetica Neue', Arial, sans-serif;

  --font-body: 'HelveticaNowDisplayW01-Rg', 'Helvetica Neue', Arial, sans-serif;

}

body {

  font-family: var(--font-body);

}



The entire page uses `var(--font-body)` except the logo text which uses `var(--font-heading)`.



---



3D HERO — LADY JUSTICE (mouse-scrub controlled)



- A full-screen canvas or img element is `position: fixed; inset: 0; z-index: 0; object-fit: cover; object-position: 70% center;`.

- The visual is a 3D rendered Lady Justice statue — blindfolded female figure in flowing robes, holding the Scales of Justice in one raised hand and a sword pointing downward in the other hand. Style: hyper-realistic 3D render, soft cinematic lighting, marble or bronze material, subtle gold accents on the scales and sword, dramatic shadow, studio backdrop with dark gradient (near-black to deep charcoal). The figure should feel monumental, elegant, and iconic. No cartoon style, no flat vector — full 3D depth with realistic reflections and depth-of-field.

- Preferred implementation: use Spline to embed an interactive 3D Lady Justice scene, OR use a high-resolution 3D-rendered image sequence that scrubs through frames.

- The visual scrubs forward/backward based on horizontal mouse movement. Use a `mousemove` event listener on `window`. Track `prevX`, compute `delta = currentX - prevX`, convert to a frame/time offset: `(delta / window.innerWidth) * SENSITIVITY * totalFrames` where `SENSITIVITY = 0.8`. Clamp between 0 and totalFrames. Use an `onSeeked` handler to queue the next seek if target has moved, preventing seek-flooding.

- If using Spline: rotate the Lady Justice model slightly on the Y-axis based on mouse X position, and translate it slightly on the X-axis based on mouse Y position. Add subtle floating animation (2-3 px up/down loop) to make it feel alive.

- Fallback: If WebGL or Spline fails to load, show a static high-resolution 3D Lady Justice PNG with the same gradient backdrop.



---



NAVBAR (fixed, z-index: 10)



- Fixed to top, full width. Padding: `px-5 sm:px-8 py-4 sm:py-5`. Flex row, `justify-between`, `items-center`.

- Logo (left): Flex row with `gap-3`. Text "Mainframe(R)" (use the registered trademark symbol) at `text-[21px] sm:text-[26px]`, `tracking-tight`, white, using `var(--font-heading)`. Beside it, a decorative asterisk character `✳︎` at `text-[25px] sm:text-[30px]`, white, `select-none`, `letter-spacing: -0.02em`.

- Desktop nav links (center, hidden below md): Flex row, `text-[23px]`, white. Links: "Labs", "Studio", "Openings", "Shop" separated by commas rendered as `, `. Each link has `hover:opacity-60 transition-opacity`.

- Desktop CTA (right, hidden below md): An anchor "Get in touch" at `text-[23px]`, white, `underline underline-offset-2`, `hover:opacity-60 transition-opacity`.

- Mobile hamburger (visible below md): A button with 3 horizontal bars (each `w-6 h-[2px] bg-white`), spaced with `gap-[5px]`. On toggle, the top bar rotates 45deg and translates down 7px, middle bar fades to opacity 0, bottom bar rotates -45deg and translates up 7px. All transitions are `duration-300`.

- Mobile overlay (z-index: 9): `fixed inset-0 bg-black/90 backdrop-blur-md`, flex column, vertically centered, left-aligned with `px-8 gap-8`. Same links at `text-[32px] font-medium`, plus "Get in touch" underlined. Fades in/out with `opacity` and `pointerEvents` toggled. Hidden on md+.



---



HERO SECTION (z-index: 1)



- Full `h-screen`, flex column. On mobile: `justify-end pb-12`. On `md:`: `justify-center pb-0`. Horizontal padding: `px-5 sm:px-8 md:px-10`. `overflow-hidden`.

- Content container: `max-w-xl`, `relative z-10`.



1. Blurred intro label:

- `pointer-events-none`, `select-none`, `mb-5 sm:mb-6`.

- Font size: `clamp(18px, 4vw, 26px)`, `line-height: 1.3`, `font-weight: 400`, `color: #fff`, `filter: blur(4px)`.

- Two lines of text:

  - Line 1: "Hey there, meet A.R.I.A,"

  - Line 2: "Mainframe's Adaptive Response Interface Agent"

- Separated by a `<br>`.



2. Typewriter text:

- Text: `"Glad you stopped in. Good taste tends to find us. Now, what are we building?"`

- Custom `useTypewriter` hook: takes `text`, `speed` (default 38ms per character), `startDelay` (default 600ms). After the delay, an interval reveals one character at a time. Returns `{ displayed, done }`.

- Rendered in a `<p>` tag, white, `mb-5 sm:mb-6`, font size `clamp(18px, 4vw, 26px)`, `line-height: 1.35`, `font-weight: 400`, `min-height: 54px`.

- While typing, show a blinking cursor: `inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px]` with CSS animation `blink 1s step-end infinite` (`opacity: 1 at 0%/100%, 0 at 50%`). Cursor disappears when `done` is true.



3. Action pill buttons:

- Appear with a fade-in + slide-up animation (`opacity 0->1`, `translateY(8px)->0`, `transition: opacity 0.4s ease, transform 0.4s ease`). They become visible 400ms after page load, independent of the typewriter animation (do NOT wait for typing to finish).

- Container: `flex flex-wrap gap-y-1`.

- 4 white pill buttons: Labels: "Pitch us an idea", "Come work here", "Send a brief hello", "See how we operate". Each is `inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] white-space: nowrap`. Hover: `bg-black text-white`, `transition-colors duration-200`.

- 1 outline pill button: Text "Reach us: hello@mainframe.co" (email is underlined with `underline-offset-1`), followed by a small 12x12 copy icon (inline SVG of two overlapping rectangles). Styled: `text-white bg-transparent border border-white rounded-full`, same sizing as above, with `gap-2 sm:gap-3` between text and icon. Hover: `bg-white text-black`. On click, copies "hello@mainframe.co" to clipboard via `navigator.clipboard.writeText()`.



---



DEPENDENCIES



Only React, ReactDOM, Tailwind CSS, and Vite. No other UI libraries. Lucide-react is available but not used in this component. For the 3D Lady Justice, use `@splinetool/react-spline` and `@splinetool/runtime` if embedding a Spline scene, OR a simple img sequence for frame-scrubbing.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://advocateabdulqadir.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eca4509b-61d7-4459-9273-b18ebf93479f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
