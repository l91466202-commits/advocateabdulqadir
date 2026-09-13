import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import ladyJustice from "../assets/lady-justice-hero.jpg";

const TYPEWRITER_COPY =
  "Glad you stopped in. Good taste tends to find us. Now, what are we building?";

const navLinks = ["Labs", "Studio", "Openings", "Shop"];
const actionLabels = [
  "Pitch us an idea",
  "Come work here",
  "Send a brief hello",
  "See how we operate",
];

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      let index = 0;
      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length && intervalId) {
          window.clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done: displayed.length === text.length };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mainframe — Independent Creative Agency" },
      {
        name: "description",
        content:
          "Mainframe is an independent creative agency shaping bold ideas, identities, and digital experiences.",
      },
      { property: "og:title", content: "Mainframe — Independent Creative Agency" },
      {
        property: "og:description",
        content:
          "Mainframe is an independent creative agency shaping bold ideas, identities, and digital experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3 shrink-0"
      fill="none"
      viewBox="0 0 12 12"
    >
      <rect x="1.25" y="3.25" width="7.5" height="7.5" rx="1" stroke="currentColor" />
      <path d="M3.25 3.25v-1a1 1 0 0 1 1-1h6.5v6.5a1 1 0 0 1-1 1h-1" stroke="currentColor" />
    </svg>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const artworkRef = useRef<HTMLDivElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetFrameRef = useRef(60);
  const animationFrameRef = useRef<number | null>(null);
  const { displayed, done } = useTypewriter(TYPEWRITER_COPY);

  useEffect(() => {
    const timer = window.setTimeout(() => setActionsVisible(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const totalFrames = 120;
    const sensitivity = 0.8;

    const updateArtwork = () => {
      const progress = targetFrameRef.current / totalFrames;
      artworkRef.current?.style.setProperty("--scrub-x", `${(progress - 0.5) * 16}px`);
      artworkRef.current?.style.setProperty("--scrub-rotate", `${(progress - 0.5) * 1.7}deg`);
      animationFrameRef.current = null;
    };

    const onMouseMove = (event: MouseEvent) => {
      const previousX = prevXRef.current ?? event.clientX;
      const delta = event.clientX - previousX;
      prevXRef.current = event.clientX;
      targetFrameRef.current = Math.min(
        totalFrames,
        Math.max(0, targetFrameRef.current + (delta / window.innerWidth) * sensitivity * totalFrames),
      );
      const verticalOffset = ((event.clientY / window.innerHeight) - 0.5) * 7;
      artworkRef.current?.style.setProperty("--pointer-y", `${verticalOffset}px`);
      if (animationFrameRef.current === null) {
        animationFrameRef.current = window.requestAnimationFrame(updateArtwork);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@mainframe.co");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:hello@mainframe.co";
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div ref={artworkRef} className="hero-artwork" aria-hidden="true">
        <div className="hero-float">
          <img
            src={ladyJustice}
            alt=""
            width={1920}
            height={1280}
            className="h-full w-full object-cover [object-position:70%_center]"
          />
        </div>
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-hero-shade" aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <a href="#main" className="flex items-center gap-3 text-foreground" aria-label="Mainframe home">
          <span className="font-heading text-[21px] tracking-tight sm:text-[26px]">Mainframe®</span>
          <span className="select-none text-[25px] leading-none tracking-tight sm:text-[30px]" aria-hidden="true">
            ✳︎
          </span>
        </a>

        <nav className="hidden items-center text-[23px] md:flex" aria-label="Main navigation">
          {navLinks.map((link, index) => (
            <span key={link}>
              <a href={`#${link.toLowerCase()}`} className="transition-opacity hover:opacity-60">
                {link}
              </a>
              {index < navLinks.length - 1 ? ", " : ""}
            </span>
          ))}
        </nav>

        <a
          href="mailto:hello@mainframe.co"
          className="hidden text-[23px] underline underline-offset-2 transition-opacity hover:opacity-60 md:block"
        >
          Get in touch
        </a>

        <button
          type="button"
          className="relative z-20 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`h-0.5 w-6 bg-foreground transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-foreground transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-foreground transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[9] flex flex-col justify-center gap-8 bg-menu px-8 backdrop-blur-md transition-opacity duration-300 md:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={closeMenu}
            className="text-[32px] font-medium transition-opacity hover:opacity-60"
          >
            {link}
          </a>
        ))}
        <a
          href="mailto:hello@mainframe.co"
          onClick={closeMenu}
          className="text-[32px] font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          Get in touch
        </a>
      </div>

      <section
        id="main"
        className="relative z-[2] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0"
      >
        <h1 className="sr-only">Mainframe</h1>
        <div className="relative z-10 max-w-xl">
          <p className="mb-5 select-none text-fluid-body leading-[1.3] font-normal blur-[4px] sm:mb-6" aria-hidden="true">
            Hey there, meet A.R.I.A,
            <br />
            Mainframe&apos;s Adaptive Response Interface Agent
          </p>

          <p className="mb-5 min-h-[54px] text-fluid-body leading-[1.35] font-normal sm:mb-6" aria-live="polite">
            {displayed}
            {!done && <span className="typewriter-cursor" aria-hidden="true" />}
          </p>

          <div
            className={`flex flex-wrap gap-y-1 transition-[opacity,transform] duration-400 ease-out ${actionsVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          >
            {actionLabels.map((label) => (
              <button key={label} type="button" className="action-pill action-pill-solid">
                {label}
              </button>
            ))}
            <button type="button" onClick={copyEmail} className="action-pill action-pill-outline gap-2 sm:gap-3">
              <span>
                Reach us: <span className="underline underline-offset-1">hello@mainframe.co</span>
              </span>
              <CopyIcon />
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? "Email copied" : ""}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}